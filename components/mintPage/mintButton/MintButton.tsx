import React, { useCallback, useState } from 'react';
import styles from '../../../styles/sass/_mint.module.scss';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import LoadingCircle from '../../UI/loadingCircle/LoadingCircle';
import { errorToast, successToastNoAuto } from '../../../scripts/ts/myToasts';
import { Span } from 'next/dist/trace';

const MintButton = ({
    tokenAddress,
    mintAmount,
    setLoadingTx,
    loadingTx,
}: {
    tokenAddress: string;
    mintAmount: number;
    setLoadingTx: React.Dispatch<React.SetStateAction<boolean>>;
    loadingTx: boolean;
}) => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const sendTx = useCallback(async () => {
        if (!publicKey) {
            errorToast('Connect wallet');
            setLoadingTx(false);
            return;
        }
        // const transaction = await getMintTransaction(tokenAddress, publicKey, connection, amount);
        // const signature = await sendTransaction(transaction.transaction, connection, {
        //     minContextSlot: transaction.minContextSlot,
        // }).catch((e) => {
        //     if (e.message === 'User rejected the request.') {
        //         errorToast('User rejected the request.');
        //         setLoadingTx(false);
        //     } else {
        //         errorToast('Transaction failed');
        //         setLoadingTx(false);
        //     }
        // });
        // connection
        //     .confirmTransaction(
        //         {
        //             blockhash: transaction.blockhash,
        //             lastValidBlockHeight: transaction.lastValidBlockHeight,
        //             signature: signature,
        //         },
        //         'finalized',
        //     )
        //     .then(() => {
        //         successToastNoAuto(<ToastLink signature={signature} />);
        //         setDefaultValues();
        //         setLoadingTx(false);
        //     })
        //     .catch((e) => {
        //         // errorToast(e.message);
        //         setLoadingTx(false);
        //     });
    }, [connection, publicKey, sendTransaction, tokenAddress, mintAmount]);

    const onclick = async (e) => {
        e.preventDefault();
        setLoadingTx(true);
        // sendTx();
    };

    return (
        <div className={styles.mintButtonContainer}>
            <button
                className={styles.mintButton}
                onClick={onclick}
                disabled={loadingTx || mintAmount <= 0 || mintAmount > 184467440737095 || !mintAmount || !publicKey}
            >
                {!loadingTx ? 'Mint' : <LoadingCircle />}
            </button>
            {!publicKey ? (
                <span className={styles.errorSpan}>{'Connect wallet'}</span>
            ) : (
                <span className={styles.successSpan}>
                    {'The lowest service fee on the entire network is 0.05 SOL.'}
                </span>
            )}
        </div>
    );
};

export default MintButton;
