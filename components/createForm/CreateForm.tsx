'use client';
import React, { useState } from 'react';
import styles from '../../styles/sass/_createForm.module.scss';
import DownloadImage from './downloadImage/DownloadImage';
import RequiredInputs from './requiredInputs/RequiredInputs';
import DescriprionTextArea from './descriptionTextArea/DescriprionTextArea';
import ExtensionsInputs from './extensionsInputs/ExtensionsInputs';
import CreatorInputs from './creatorInputs/CreatorInputs';
import { ImageForUri } from '../../types/ImageForUri';
import { ExtensionsValues } from '../../types/ExtensionsValues';
import { RequiredValues } from '../../types/RequiredValues';
import PermissionsMain from './permissionsMain/PermissionsMain';
import { Authorities } from '../../types/Authorities';
import Tags from './tags/Tags';
import { validateForm } from '../../scripts/ts/validateForm';
import ButtonCreate from './buttonCreate/ButtonCreate';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import 'react-toastify/dist/ReactToastify.css';
import { errorToast, successToast, successToastNoAuto } from '../../scripts/ts/myToasts';
import { createMetadataWithFile, createMetadataWithUrl } from '../../scripts/ts/createMetadata';
import { postMetaToServer } from '../../scripts/API/fileServer/postToJsonServer';
import { createToken } from '../../scripts/solanaAPI/createToken';
import Link from 'next/link';
import * as web3 from '@solana/web3.js';

const CreateForm = () => {
    const connection = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const [loadingBtn, setLoadingBtn] = useState(false);

    const [valuesRequired, setValuesRequired] = useState({
        name: '1',
        symbol: '2',
        supply: '3',
        decimals: '4',
    } as RequiredValues);

    const [valuesExtensions, setValuesExtensions] = useState({
        website: '',
        twitter: '',
        telegram: '',
        discord: '',
    } as ExtensionsValues);

    const [valuesCreator, setValuesCreator] = useState({
        name: 'Token For Ever',
        site: 'https://tokenforever.io',
    });

    const [description, setDescription] = useState('');
    const [authorities, setAuthorities] = useState({
        update: false,
        freeze: false,
        mint: false,
    } as Authorities);
    const [tags, setTags] = useState<string[]>([]);

    const [imageForUri, setImageForUri] = useState({
        file: '',
        isUrl: false,
    } as ImageForUri);

    const send = async () => {};

    const handleSubmit = async (e) => {
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
                const uriMetadata = postMetaToServer(metadata);

                uriMetadata
                    .then((data) => {
                        console.log(data);
                        setLoadingBtn(false);
                    })
                    .catch((mes) => {
                        errorToast(mes);
                        setLoadingBtn(false);
                    });
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
                const uriMetadata = await postMetaToServer(metadata);

                const transaction = await createToken(publicKey, connection.connection, valuesRequired, uriMetadata);

                console.log(transaction.transaction);
                const signature = await sendTransaction(transaction.transaction, connection.connection, {
                    minContextSlot: transaction.minContextSlot,
                }).catch((e) => console.log(e));
                await connection.connection
                    .confirmTransaction({
                        blockhash: transaction.blockhash,
                        lastValidBlockHeight: transaction.lastValidBlockHeight,
                        signature,
                    })
                    .then((sign) => {
                        successToastNoAuto(`${sign}`);
                        setLoadingBtn(false);
                    })
                    .catch((e) => {
                        errorToast(e.message);
                        setLoadingBtn(false);
                    });
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
                <DownloadImage setImageForUri={setImageForUri} />
                <PermissionsMain setAuthorities={setAuthorities} authorities={authorities} />
                <ButtonCreate loading={loadingBtn} />
            </form>
        </div>
    );
};

export default CreateForm;
