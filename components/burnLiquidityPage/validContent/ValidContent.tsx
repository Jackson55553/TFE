import React from 'react';
import styles from '../../../styles/sass/_mint.module.scss';
import InputBurnLiquidityAmount from '../inputBurnLiquidityAmount/InputBurnLiquidityAmount';
import LiquiditySupplyContainer from '../liquiditySupplyContainer/LiquiditySupplyContainer';
import BurnLiquidityButton from '../burnLiquidityButton/BurnLiquidityButton';
import InfoCard from '../../UI/infoCard/InfoCard';
import { infoCardBurnLiquidity, infoCardBurnLiquiditySecond } from '../../../texts/cardTexts/cardTexts';

const ValidContent = ({
    burnAmount,
    tokenAddress,
    tokenBalance,
    tokenAccount,
    loadingTx,
    loading,
    setBurnAmount,
    setLoadingTx,
    setDefault,
}: {
    burnAmount: number;
    tokenAddress: string;
    loadingTx: boolean;
    loading: boolean;
    tokenAccount: string;
    tokenBalance: number;
    setLoadingTx: React.Dispatch<React.SetStateAction<boolean>>;
    setBurnAmount: React.Dispatch<React.SetStateAction<number>>;
    setDefault: () => void;
}) => {
    return (
        <div className={styles.validContainer}>
            <InputBurnLiquidityAmount
                burnAmount={burnAmount}
                setBurnAmount={setBurnAmount}
                tokenBalance={tokenBalance}
            />
            <LiquiditySupplyContainer burnAmount={burnAmount} tokenAddress={tokenAddress} tokenAccount={tokenAccount} />
            <BurnLiquidityButton
                burnAmount={burnAmount}
                tokenAddress={tokenAddress}
                loadingTx={loadingTx}
                setLoadingTx={setLoadingTx}
                loading={loading}
                setDefault={setDefault}
                tokenAccount={tokenAccount}
                tokenBalance={tokenBalance}
            />
            <InfoCard message={infoCardBurnLiquiditySecond} />
            <InfoCard message={infoCardBurnLiquidity} />
        </div>
    );
};

export default ValidContent;
