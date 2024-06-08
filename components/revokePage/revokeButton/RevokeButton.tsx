import React, { useCallback, useState } from 'react';
import styles from '../../../styles/sass/_revokePermission.module.scss';
import { AuthoritiesType } from '../../../types/AuthoritiesType';
import LoadingCircle from '../../UI/loadingCircle/LoadingCircle';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { getRevokeTransaction } from '../../../scripts/solanaAPI/revokeTransaction';
import { errorToast, successToastNoAuto } from '../../../scripts/ts/myToasts';
import ToastLink from '../../UI/Links/ToastLink';

const RevokeButton = ({
    authorities,
    choosenAuthorities,
    tokenAddress,
    setDefaultValues,
    loading,
}: {
    authorities: AuthoritiesType;
    choosenAuthorities: AuthoritiesType;
    tokenAddress: string;
    setDefaultValues: () => void;
    loading: boolean;
}) => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [loadingTx, setLoadingTx] = useState(false);

    const sendTx = useCallback(async () => {
        if (!publicKey) {
            errorToast('Connect wallet');
            setLoadingTx(false);
            return;
        }
        const transaction = await getRevokeTransaction(tokenAddress, publicKey, connection, choosenAuthorities);
        if (!transaction) {
            errorToast('Transaction failed');
            return;
        }
        const signature = await sendTransaction(transaction.transaction, connection, {
            minContextSlot: transaction.minContextSlot,
        }).catch((e) => {
            if (e.message === 'User rejected the request.') {
                errorToast('User rejected the request.');
                setLoadingTx(false);
            } else {
                errorToast('Transaction failed');
                setLoadingTx(false);
            }
        });

        if (typeof signature === 'string') {
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
                    successToastNoAuto(<ToastLink signature={signature} />);
                    setDefaultValues();
                    setLoadingTx(false);
                })
                .catch((e) => {
                    setLoadingTx(false);
                });
        } else {
            errorToast('Transaction failed');
            setLoadingTx(false);
        }
    }, [connection, publicKey, sendTransaction, choosenAuthorities, tokenAddress]);

    const onclick: React.MouseEventHandler<HTMLButtonElement> | undefined = async (e) => {
        e.preventDefault();
        setLoadingTx(true);
        sendTx();
    };

    return (
        <div className={styles.revokeButtonContainer}>
            <button
                onClick={onclick}
                className={`${styles.revokeButton} `}
                disabled={
                    (!authorities.freeze && !authorities.mint && !authorities.update) ||
                    (!choosenAuthorities.freeze && !choosenAuthorities.mint && !choosenAuthorities.update) ||
                    loadingTx ||
                    loading
                }
            >
                {!loadingTx ? 'Revoke' : <LoadingCircle />}
            </button>
            {!authorities.freeze && !authorities.mint && !authorities.update ? (
                <span className={styles.errorSpan}>{'Find token'}</span>
            ) : !choosenAuthorities.freeze && !choosenAuthorities.mint && !choosenAuthorities.update ? (
                <span className={styles.errorSpan}>{'Choose something'}</span>
            ) : (
                <span className={styles.successSpan}>{'Cost is free'}</span>
            )}
        </div>
    );
};

export default React.memo(RevokeButton);
