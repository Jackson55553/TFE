import React, { useCallback, useState } from 'react';
import styles from '../../styles/sass/_revokePermission.module.scss';
import { Authorities } from '../../types/Authorities';
import LoadingCircle from '../UI/loadingCircle/LoadingCircle';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { getRevokeTransaction } from '../../scripts/solanaAPI/revokeTransaction';
import { errorToast, successToastNoAuto } from '../../scripts/ts/myToasts';
import ToastLink from '../Links/ToastLink';

const RevokeButton = ({
    authorities,
    choosenAuthorities,
    tokenAddress,
    setDefaultValues,
}: {
    authorities: Authorities;
    choosenAuthorities: Authorities;
    tokenAddress: string;
    setDefaultValues: () => void;
}) => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [loading, setLoading] = useState(false);

    const sendTx = useCallback(async () => {
        const transaction = await getRevokeTransaction(tokenAddress, publicKey, connection, choosenAuthorities);
        const signature = await sendTransaction(transaction.transaction, connection, {
            minContextSlot: transaction.minContextSlot,
        }).catch((e) => {
            if (e.message === 'User rejected the request.') {
                errorToast('User rejected the request.');
                setLoading(false);
            } else {
                errorToast('Transaction failed');
                setLoading(false);
            }
        });
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
                setLoading(false);
            })
            .catch((e) => {
                errorToast(e.message);
                setLoading(false);
            });
    }, [connection, publicKey, sendTransaction, choosenAuthorities, tokenAddress]);

    const onclick = async (e) => {
        e.preventDefault();
        setLoading(true);
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
                    loading
                }
            >
                {!loading ? 'Revoke' : <LoadingCircle />}
            </button>
            {!authorities.freeze && !authorities.mint && !authorities.update ? (
                <span className={styles.errorSpan}>{'Find token'}</span>
            ) : !choosenAuthorities.freeze &&
              !choosenAuthorities.mint &&
              !choosenAuthorities.update &&
              authorities.freeze &&
              authorities.mint &&
              authorities.update ? (
                <span className={styles.errorSpan}>{'Choose something'}</span>
            ) : (
                <span className={styles.successSpan}>{'Cost is free'}</span>
            )}
        </div>
    );
};

export default RevokeButton;
