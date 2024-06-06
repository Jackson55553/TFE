'use client';
import React, { useState } from 'react';
import styles from '../../../styles/sass/_mintForm.module.scss';
import FindTokenAccountInput from '../findTokenAccount/FindTokenAccountInput';
import { useWallet } from '@solana/wallet-adapter-react';

const BurnForm = ({
    setLoading,
    setTokenAddress,
    tokenAddress,
    setValide,
    setTokenAccount,
    setTokenBalance,
}: {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setTokenAddress: React.Dispatch<React.SetStateAction<string>>;
    setValide: React.Dispatch<React.SetStateAction<boolean>>;
    tokenAddress: string;
    setTokenAccount: React.Dispatch<React.SetStateAction<string>>;
    setTokenBalance: React.Dispatch<React.SetStateAction<number>>;
}) => {
    const { publicKey } = useWallet();
    return (
        <>
            <label data-title={'Example: So11111111111111111111111111111111111111112'}>{'Token address'}</label>
            <form onSubmit={(e) => e.preventDefault()} className={styles.mintForm} noValidate>
                <FindTokenAccountInput
                    setLoading={setLoading}
                    tokenAddress={tokenAddress}
                    setTokenAddress={setTokenAddress}
                    setValide={setValide}
                    setTokenAccount={setTokenAccount}
                    setTokenBalance={setTokenBalance}
                />
                <span className={styles.errorMessage}>{publicKey ? 'Token account not found' : 'Connect wallet'}</span>
            </form>
        </>
    );
};

export default React.memo(BurnForm);
