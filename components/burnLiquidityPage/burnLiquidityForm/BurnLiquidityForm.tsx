'use client';
import React from 'react';
import styles from '../../../styles/sass/_mintForm.module.scss';
import FindTokenAccountInput from '../findTokenAccount/FindTokenAccountInput';
import { useWallet } from '@solana/wallet-adapter-react';

const BurnLiquidityForm = ({
    setLoading,
    setTokenAddress,
    tokenAccount,
    setValide,
    setTokenAccount,
    setTokenBalance,
}: {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setTokenAddress: React.Dispatch<React.SetStateAction<string>>;
    setValide: React.Dispatch<React.SetStateAction<boolean>>;
    tokenAccount: string;
    setTokenAccount: React.Dispatch<React.SetStateAction<string>>;
    setTokenBalance: React.Dispatch<React.SetStateAction<number>>;
}) => {
    const { publicKey } = useWallet();
    return (
        <>
            <label data-title={'Example: So11111111111111111111111111111111111111112'}>{'Token account address'}</label>
            <form onSubmit={(e) => e.preventDefault()} className={styles.mintForm} noValidate>
                <FindTokenAccountInput
                    setLoading={setLoading}
                    tokenAccount={tokenAccount}
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

export default React.memo(BurnLiquidityForm);
