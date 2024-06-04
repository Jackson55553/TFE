import React from 'react';
import styles from '../../../../styles/sass/_createForm.module.scss';
import { useWallet } from '@solana/wallet-adapter-react';
import LoadingCircle from '../../../UI/loadingCircle/LoadingCircle';

const ButtonCreate = ({ loading }: { loading: boolean }) => {
    const { publicKey } = useWallet();

    return (
        <div className={styles.createButtonContainer}>
            <button type="submit" className={styles.createButton} disabled={loading}>
                {!loading ? 'CREATE' : <LoadingCircle />}
            </button>
            {!publicKey ? (
                <p className={styles.noWalletP}>{'Connect wallet'}</p>
            ) : (
                <p className={styles.walletP}>{'The lowest service fee on the entire network is 0.09 SOL'}</p>
            )}
        </div>
    );
};

export default ButtonCreate;
