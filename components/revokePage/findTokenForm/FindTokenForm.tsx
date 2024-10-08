'use client';
import React from 'react';
import styles from '../../../styles/sass/_revokePermission.module.scss';
import LoadingCircle from '../../UI/loadingCircle/LoadingCircle';
import FindTokenInput from './findTokenInput/FindTokenInput';
import { useWallet } from '@solana/wallet-adapter-react';
import { AuthoritiesType } from '../../../types/AuthoritiesType';

const FindTokenForm = ({
    setAuthorities,
    setTokenAddress,
    tokenAddress,
    loading,
    setLoading,
}: {
    setAuthorities: React.Dispatch<React.SetStateAction<AuthoritiesType>>;
    setTokenAddress: React.Dispatch<React.SetStateAction<string>>;
    tokenAddress: string;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;
}) => {
    const { publicKey } = useWallet();
    return (
        <div className={styles.revokeFormContainer}>
            <label data-title={'Example: So11111111111111111111111111111111111111112'}>{'Token address'}</label>
            <form onSubmit={(e) => e.preventDefault()} className={styles.revokeForm} noValidate>
                <FindTokenInput
                    setLoading={setLoading}
                    setAuthorities={setAuthorities}
                    setTokenAddress={setTokenAddress}
                    tokenAddress={tokenAddress}
                />
                <span className={styles.errorMessage}>
                    {publicKey ? 'Token address incorrected' : 'Connect wallet'}
                </span>
            </form>
            {loading ? <LoadingCircle style={{ height: '50px', width: '50px' }} /> : ''}
        </div>
    );
};

export default React.memo(FindTokenForm);
