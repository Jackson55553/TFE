'use client';
import React, { useEffect, useState } from 'react';
import styles from '../../../../styles/sass/_burnLiquidity.module.scss';
import BurnLiquidityTitle from '../../../../components/UI/mainTitles/BurnLiquidityTitle/BurnLiquidityTitle';
import LoadingCircle from '../../../../components/UI/loadingCircle/LoadingCircle';
import BurnLiquidityForm from '../../../../components/burnLiquidityPage/burnLiquidityForm/BurnLiquidityForm';
import ValidContent from '../../../../components/burnLiquidityPage/validContent/ValidContent';

const BurnLiquidityPage = () => {
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
        setTokenAccount('');
    };

    return (
        <div className={styles.liquidityBurnPage}>
            <div className={styles.liquidityBurnContainer}>
                <BurnLiquidityTitle title={'Burn Liquidity'} isModal={true} />
                <BurnLiquidityForm
                    setLoading={setLoading}
                    tokenAccount={tokenAccount}
                    setTokenAddress={setTokenAddress}
                    setValide={setValide}
                    setTokenAccount={setTokenAccount}
                    setTokenBalance={setTokenBalance}
                />
                {loading ? <LoadingCircle style={{ height: '50px', width: '50px' }} /> : ''}
                {valide && tokenAccount && tokenAddress ? (
                    <ValidContent
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
};

export default BurnLiquidityPage;
