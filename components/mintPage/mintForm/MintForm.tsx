'use client';
import React from 'react';
import styles from '../../../styles/sass/_mintForm.module.scss';
import FindTokenMintInput from '../findTokenMint/FindTokenMintInput';
import { useWallet } from '@solana/wallet-adapter-react';

const MintForm = ({
    setLoading,
    setTokenAddress,
    tokenAddress,
    setValide,
}: {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setTokenAddress: React.Dispatch<React.SetStateAction<string>>;
    setValide: React.Dispatch<React.SetStateAction<boolean>>;
    tokenAddress: string;
}) => {
    const { publicKey } = useWallet();
    return (
        <>
            <label data-title={'Example: So11111111111111111111111111111111111111112'}>{'Token address'}</label>
            <form onSubmit={(e) => e.preventDefault()} className={styles.mintForm} noValidate>
                <FindTokenMintInput
                    setLoading={setLoading}
                    tokenAddress={tokenAddress}
                    setTokenAddress={setTokenAddress}
                    setValide={setValide}
                />
                <span className={styles.errorMessage}>
                    {publicKey ? 'Token address incorrected' : 'Connect wallet'}
                </span>
            </form>
        </>
    );
};

export default React.memo(MintForm);
