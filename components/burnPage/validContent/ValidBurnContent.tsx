import React from 'react';
import InfoCard from '../../UI/infoCard/InfoCard';
import { infoCardBurn } from '../../../texts/cardTexts/cardTexts';
import styles from '../../../styles/sass/_mint.module.scss';
import BurnAmountInput from '../inputBurnAmount/BurnAmountInput';
import BurnSupplyCounter from '../supplyCounter/BurnSupplyCounter';
import BurnButton from '../burnButton/BurnButton';
import TokenInfoCards from '../../UI/tokenInfoCards/TokenInfoCards';

const ValidBurnContent = ({
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
            <BurnAmountInput burnAmount={burnAmount} setBurnAmount={setBurnAmount} tokenBalance={tokenBalance} />
            <BurnSupplyCounter burnAmount={burnAmount} tokenAddress={tokenAddress} />
            <TokenInfoCards tokenAddress={tokenAddress} />
            <BurnButton
                burnAmount={burnAmount}
                tokenAddress={tokenAddress}
                loadingTx={loadingTx}
                setLoadingTx={setLoadingTx}
                loading={loading}
                setDefault={setDefault}
                tokenAccount={tokenAccount}
                tokenBalance={tokenBalance}
            />
            <InfoCard message={infoCardBurn} />
        </div>
    );
};

export default ValidBurnContent;
// ValidBurnContent
