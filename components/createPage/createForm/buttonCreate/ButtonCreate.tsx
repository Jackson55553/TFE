'use client';
import React, { useEffect, useState } from 'react';
import styles from '../../../../styles/sass/_createForm.module.scss';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import LoadingCircle from '../../../UI/loadingCircle/LoadingCircle';
import ToggleBtn from '../../../UI/toggleBtn/ToggleBtn';
import { getTfePrice } from '../../../../scripts/solanaAPI/getTfePrice';

const ButtonCreate = ({
    loading,
    isTokenAccount,
    isTokenPaying,
    setisTokenPaying,
}: {
    loading: boolean;
    isTokenAccount: boolean;
    isTokenPaying: boolean;
    setisTokenPaying: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const { publicKey } = useWallet();
    const { connection } = useConnection();
    const [tfePrice, setTfePrice] = useState(0);

    useEffect(() => {
        if (isTokenPaying) {
            getTfePrice(0.04).then((price) => setTfePrice(price));
        }
    }, [isTokenPaying]);

    return (
        <div className={styles.createButtonContainer}>
            <button type="submit" className={styles.createButton} disabled={loading}>
                {!loading ? 'CREATE' : <LoadingCircle />}
            </button>
            {!publicKey ? (
                <p className={styles.noWalletP}>{'Connect wallet'}</p>
            ) : isTokenPaying ? (
                <p
                    className={styles.walletP}
                >{`The lowest service fee on the entire network is ${tfePrice} TFE (~0.04 Sol)`}</p>
            ) : (
                <p className={styles.walletP}>{'The lowest service fee on the entire network is 0.09 SOL'}</p>
            )}
            {connection &&
            connection.rpcEndpoint === process.env.NEXT_PUBLIC_MAINNET_ENDPOINT &&
            isTokenAccount &&
            publicKey ? (
                <div className={styles.changePayingContainer}>
                    <p>{'Pay Sol'}</p>
                    <ToggleBtn toggled={isTokenPaying} setToggled={setisTokenPaying} />
                    <p>{'Pay TFE'}</p>
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

export default ButtonCreate;
