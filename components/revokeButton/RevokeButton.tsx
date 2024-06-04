import React, { useCallback, useState } from 'react';
import styles from '../../styles/sass/_revokePermission.module.scss';
import { Authorities } from '../../types/Authorities';
import LoadingCircle from '../UI/loadingCircle/LoadingCircle';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { getRevokeTransaction } from '../../scripts/solanaAPI/revokeTransaction';

const RevokeButton = ({
    authorities,
    choosenAuthorities,
    tokenAddress,
}: {
    authorities: Authorities;
    choosenAuthorities: Authorities;
    tokenAddress: string;
}) => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const sendTx = useCallback(async () => {
        const transaction = await getRevokeTransaction(publicKey, connection, authorities);
    }, [connection, publicKey, sendTransaction, authorities]);

    const [loading, setLoading] = useState(false);

    const onclick = async (e) => {
        e.preventDefault();
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
