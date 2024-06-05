import React from 'react';
import MintAmountInput from '../inputMintAmount/MintAmountInput';

const ValidetContent = ({
    mintAmount,
    setMintAmount,
}: {
    setMintAmount: React.Dispatch<React.SetStateAction<number>>;
    mintAmount: number;
}) => {
    return (
        <>
            <MintAmountInput mintAmount={mintAmount} setMintAmount={setMintAmount} />
        </>
    );
};

export default ValidetContent;
