'use client';
import React, { useCallback, useState } from 'react';
import styles from '../../../styles/sass/_createForm.module.scss';
import DownloadImage from './downloadImage/DownloadImage';
import RequiredInputs from './requiredInputs/RequiredInputs';
import DescriprionTextArea from './descriptionTextArea/DescriprionTextArea';
import ExtensionsInputs from './extensionsInputs/ExtensionsInputs';
import CreatorInputs from './creatorInputs/CreatorInputs';
import PermissionsMain from './permissionsMain/PermissionsMain';
import Tags from './tags/Tags';
import { validateForm } from '../../../scripts/ts/validateForm';
import ButtonCreate from './buttonCreate/ButtonCreate';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { errorToast, successToastNoAuto, warningToast } from '../../../scripts/ts/myToasts';
import { createMetadataWithFile, createMetadataWithUrl } from '../../../scripts/ts/createMetadata';
import { postMetaToServer } from '../../../scripts/API/fileServer/postToJsonServer';
import { createToken } from '../../../scripts/solanaAPI/createToken';
import * as web3 from '@solana/web3.js';
import ToastLink from '../../UI/Links/ToastLink';
import { setDefault } from '../../../scripts/ts/clearInputs';
import {
    defaultRequiredValues,
    defaultExtensionsValues,
    defaultCreatorValues,
    defaultDescription,
    defaultAuthoritiesValues,
    defaultTags,
    defaultImageForUri,
} from './defaultValues/defaultValues';
import { deleteFromServer } from '../../../scripts/API/fileServer/deleteFromJsonServer';
import { writeToken, writeUser } from '../../../scripts/API/DB/postToDataBase';
import { MyMetadataType } from '../../../types/MyMetadataType';
import { validateDefaultCreator } from '../../../scripts/ts/validationDefaultCreator';

const CreateForm = () => {
    // const getProvider = () => {
    //     if ('phantom' in window) {
    //         const provider = window.phantom?.solana;

    //         if (provider?.isPhantom) {
    //             return provider;
    //         }
    //     }
    // };
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [loadingBtn, setLoadingBtn] = useState(false);

    const [valuesRequired, setValuesRequired] = useState(defaultRequiredValues);
    const [description, setDescription] = useState(defaultDescription);
    const [valuesExtensions, setValuesExtensions] = useState(defaultExtensionsValues);
    const [valuesCreator, setValuesCreator] = useState(defaultCreatorValues);
    const [authorities, setAuthorities] = useState(defaultAuthoritiesValues);
    const [tags, setTags] = useState(defaultTags);
    const [imageForUri, setImageForUri] = useState(defaultImageForUri);
    const [imageUrl, setImageUrl] = useState('');

    const sendTx = useCallback(
        async (publicKey: web3.PublicKey, uriMetadata: string, metadata: MyMetadataType, isdefaultCreator: boolean) => {
            // const provider = getProvider();
            const transaction = await createToken(
                publicKey,
                connection,
                valuesRequired,
                uriMetadata,
                isdefaultCreator,
                authorities,
            );
            const timeout = setTimeout(() => {
                warningToast('Too much time has passed. The transaction may fail.');
            }, 60000);
            const signature = await sendTransaction(transaction.transaction, connection, {
                minContextSlot: transaction.minContextSlot,
            })
                // const signature = provider
                //     .signAndSendTransaction(transaction.transaction)
                .then((data) => {
                    clearTimeout(timeout);
                    return data;
                })
                .catch((e) => {
                    clearTimeout(timeout);
                    if (e.message === 'User rejected the request.') {
                        errorToast('User rejected the request.');
                        deleteFromServer(uriMetadata);
                        return false;
                    } else {
                        errorToast('Transaction failed');
                        deleteFromServer(uriMetadata);
                        return false;
                    }
                });
            if (!signature) {
                setLoadingBtn(false);
                return;
            }
            if (typeof signature !== 'string') {
                setLoadingBtn(false);
                deleteFromServer(uriMetadata);
                return;
            }
            connection
                .confirmTransaction(
                    {
                        blockhash: transaction.blockhash,
                        lastValidBlockHeight: transaction.lastValidBlockHeight,
                        signature: signature,
                    },
                    'finalized',
                )
                .then(() => {
                    const endpoint =
                        connection.rpcEndpoint === process.env.NEXT_PUBLIC_DEVNET_ENDPOINT ? 'devnet' : 'mainnet-beta';
                    successToastNoAuto(<ToastLink signature={signature} endpoint={endpoint} />);
                    setLoadingBtn(false);
                    setDefault(
                        setValuesRequired,
                        setValuesExtensions,
                        setValuesCreator,
                        setDescription,
                        setAuthorities,
                        setTags,
                        setImageForUri,
                        setImageUrl,
                    );
                    writeToken(
                        transaction.mintKeypair.publicKey.toBase58(),
                        metadata.image,
                        uriMetadata,
                        publicKey.toBase58(),
                        metadata.name,
                        metadata.symbol,
                        metadata.description,
                    );
                    writeUser(publicKey.toBase58());
                })
                .catch(() => {
                    setLoadingBtn(false);
                    deleteFromServer(uriMetadata);
                });
        },
        [connection, publicKey, sendTransaction, valuesRequired, authorities],
    );

    const handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined = async (e) => {
        e.preventDefault();
        setLoadingBtn(true);
        if (!publicKey) {
            errorToast('Connect Wallet');
            setLoadingBtn(false);
            return;
        }
        const isValidForm = validateForm(valuesRequired, imageForUri);
        if (isValidForm.isValid) {
            if (imageForUri.isUrl) {
                const metadata = createMetadataWithUrl(
                    valuesRequired.name,
                    valuesRequired.symbol,
                    imageForUri.file,
                    description,
                    valuesExtensions,
                    tags,
                    valuesCreator,
                );
                const uriMetadata = await postMetaToServer(metadata);
                const isdefaultCreator = validateDefaultCreator(valuesCreator);
                sendTx(publicKey, uriMetadata, metadata, isdefaultCreator);
            }
            if (!imageForUri.isUrl) {
                const metadata = await createMetadataWithFile(
                    valuesRequired.name,
                    valuesRequired.symbol,
                    imageForUri.file,
                    description,
                    valuesExtensions,
                    tags,
                    valuesCreator,
                );
                if (Object.keys(metadata).length !== 0) {
                    const uriMetadata = await postMetaToServer(metadata);
                    const isdefaultCreator = validateDefaultCreator(valuesCreator);
                    sendTx(publicKey, uriMetadata, metadata, isdefaultCreator);
                }
            }
        } else {
            errorToast(isValidForm.message);
            setLoadingBtn(false);
        }
    };

    return (
        <div className={styles.formContainer}>
            <form noValidate onSubmit={handleSubmit}>
                <RequiredInputs valuesRequired={valuesRequired} setValuesRequired={setValuesRequired} />
                <DescriprionTextArea description={description} setDescription={setDescription} />
                <ExtensionsInputs valuesExtensions={valuesExtensions} setValuesExtensions={setValuesExtensions} />
                <CreatorInputs valuesCreator={valuesCreator} setValuesCreator={setValuesCreator} />
                <Tags tags={tags} setTags={setTags} />
                <DownloadImage
                    imageForUri={imageForUri}
                    setImageForUri={setImageForUri}
                    setImageUrl={setImageUrl}
                    imageUrl={imageUrl}
                />
                <PermissionsMain setAuthorities={setAuthorities} authorities={authorities} />
                <ButtonCreate loading={loadingBtn} />
            </form>
        </div>
    );
};

export default CreateForm;
