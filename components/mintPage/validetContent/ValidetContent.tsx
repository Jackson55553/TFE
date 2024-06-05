import React from 'react';
import MintAmountInput from '../inputMintAmount/MintAmountInput';
import SupplyCounter from '../supplyCounter/SupplyCounter';
import InfoCard from '../../UI/infoCard/InfoCard';

const ValidetContent = ({
    mintAmount,
    setMintAmount,
    tokenAddress,
}: {
    setMintAmount: React.Dispatch<React.SetStateAction<number>>;
    mintAmount: number;
    tokenAddress: string;
}) => {
    return (
        <>
            <MintAmountInput mintAmount={mintAmount} setMintAmount={setMintAmount} />
            <SupplyCounter mintAmount={mintAmount} tokenAddress={tokenAddress} />
            <InfoCard message="Please note that issuing tokens requires you to retain issuance rights, and once these rights are relinquished, you will not be able to issue more tokens in the future." />
        </>
    );
};

export default ValidetContent;
