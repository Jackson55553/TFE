import React from 'react';
import MintAmountInput from '../inputMintAmount/MintAmountInput';
import SupplyCounter from '../supplyCounter/SupplyCounter';
import InfoCard from '../../UI/infoCard/InfoCard';
import { infoCardMint } from '../../../texts/cardTexts/cardTexts';
import MintButton from '../mintButton/MintButton';
import styles from '../../../styles/sass/_mint.module.scss';

const ValidMintContent = ({
    mintAmount,
    setMintAmount,
    tokenAddress,
    setLoadingTx,
    loadingTx,
    loading,
    setDefault,
}: {
    setMintAmount: React.Dispatch<React.SetStateAction<number>>;
    mintAmount: number;
    tokenAddress: string;
    setLoadingTx: React.Dispatch<React.SetStateAction<boolean>>;
    loadingTx: boolean;
    loading: boolean;
    setDefault: () => void;
}) => {
    return (
        <div className={styles.validContainer}>
            <MintAmountInput mintAmount={mintAmount} setMintAmount={setMintAmount} />
            <SupplyCounter mintAmount={mintAmount} tokenAddress={tokenAddress} />
            <MintButton
                mintAmount={mintAmount}
                tokenAddress={tokenAddress}
                loadingTx={loadingTx}
                setLoadingTx={setLoadingTx}
                loading={loading}
                setDefault={setDefault}
            />
            <InfoCard message={infoCardMint} />
        </div>
    );
};

export default ValidMintContent;
