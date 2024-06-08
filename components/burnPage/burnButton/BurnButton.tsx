import React, { useCallback } from 'react';
import styles from '../../../styles/sass/_mint.module.scss';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import LoadingCircle from '../../UI/loadingCircle/LoadingCircle';
import { errorToast, successToastNoAuto } from '../../../scripts/ts/myToasts';
import ToastLink from '../../UI/Links/ToastLink';
import { getBurnTransaction } from '../../../scripts/solanaAPI/getBurnTransaction';

const BurnButton = ({
    tokenAddress,
    tokenAccount,
    burnAmount,
    loadingTx,
    loading,
    setLoadingTx,
    setDefault,
    tokenBalance,
}: {
    tokenAddress: string;
    tokenAccount: string;
    burnAmount: number;
    loadingTx: boolean;
    loading: boolean;
    tokenBalance: number;
    setLoadingTx: React.Dispatch<React.SetStateAction<boolean>>;
    setDefault: () => void;
}) => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const sendTx = useCallback(async () => {
        if (!publicKey) {
            errorToast('Connect wallet');
            setLoadingTx(false);
            return;
        }
        if (!tokenAccount) {
            errorToast('Token account not found');
            setLoadingTx(false);
            return;
        }
        const transaction = await getBurnTransaction(tokenAddress, tokenAccount, publicKey, connection, burnAmount)
            .then((data) => {
                return data;
            })
            .catch((e) => {
                console.log(e);
            });
        if (!transaction?.transaction) {
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
                    const endpoint =
                        connection.rpcEndpoint === process.env.NEXT_PUBLIC_DEVNET_ENDPOINT ? 'devnet' : 'mainnet-beta';
                    successToastNoAuto(<ToastLink signature={signature} endpoint={endpoint} />);
                    setLoadingTx(false);
                    setDefault();
                })
                .catch((e) => {
                    errorToast(e.message);
                    setLoadingTx(false);
                });
        } else {
            errorToast('transaction failed');
            setLoadingTx(false);
        }
    }, [connection, publicKey, sendTransaction, tokenAddress, burnAmount]);

    const onclick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        setLoadingTx(true);
        sendTx();
    };

    return (
        <div className={styles.mintButtonContainer}>
            <button
                className={styles.mintButton}
                onClick={onclick}
                disabled={
                    loading ||
                    loadingTx ||
                    burnAmount <= 0 ||
                    burnAmount > tokenBalance ||
                    !burnAmount ||
                    !publicKey ||
                    !Number.isInteger(Number(burnAmount))
                }
            >
                {!loadingTx ? 'Burn' : <LoadingCircle />}
            </button>
            {!publicKey ? (
                <span className={styles.errorSpan}>{'Connect wallet'}</span>
            ) : (
                <span className={styles.successSpan}>
                    {'The lowest service fee on the entire network is 0.04 SOL.'}
                </span>
            )}
        </div>
    );
};

export default BurnButton;
