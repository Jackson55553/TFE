'use client';
import React, { useEffect, useState } from 'react';
import styles from '../../../../styles/sass/_burn.module.scss';
import BurnMainTitle from '../../../../components/UI/mainTitles/BurnMainTitle/BurnMainTitle';
import BurnForm from '../../../../components/burnPage/burnForm/BurnForm';
import LoadingCircle from '../../../../components/UI/loadingCircle/LoadingCircle';
import ValidBurnContent from '../../../../components/burnPage/validContent/ValidBurnContent';

export default function TokenBurnPage() {
    const [loading, setLoading] = useState(false);
    const [loadingTx, setLoadingTx] = useState(false);
    const [valide, setValide] = useState(false);
    const [burnAmount, setBurnAmount] = useState(1);
    const [tokenAddress, setTokenAddress] = useState('');
    const [tokenAccount, setTokenAccount] = useState('');
    const [tokenBalance, setTokenBalance] = useState(0);

    const setDefault = () => {
        setTokenAddress('');
        setValide(false);
        setBurnAmount(1);
        setTokenAddress('');
    };

    // useEffect(() => {
    //     console.log(tokenAccount);
    //     console.log(valide);
    // }, [tokenAccount, valide]);

    return (
        <div className={styles.burnPage}>
            <div className={styles.burnContainer}>
                <BurnMainTitle title={'Burn Token'} isModal={true} />
                <BurnForm
                    setLoading={setLoading}
                    tokenAddress={tokenAddress}
                    setTokenAddress={setTokenAddress}
                    setValide={setValide}
                    setTokenAccount={setTokenAccount}
                    setTokenBalance={setTokenBalance}
                />
                {loading ? <LoadingCircle style={{ height: '50px', width: '50px' }} /> : ''}
                {valide && tokenAccount.length ? (
                    <ValidBurnContent
                        burnAmount={burnAmount}
                        tokenAddress={tokenAddress}
                        loadingTx={loadingTx}
                        loading={loading}
                        tokenAccount={tokenAccount}
                        tokenBalance={tokenBalance}
                        setBurnAmount={setBurnAmount}
                        setLoadingTx={setLoadingTx}
                        setDefault={setDefault}
                    />
                ) : (
                    ''
                )}
            </div>
        </div>
    );
}
