'use client';
import React, { useCallback, useEffect, useState } from 'react';
import styles from '../../../styles/sass/_supplyCounter.module.scss';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { getSupply } from '../../../scripts/solanaAPI/getSupply';

const SupplyCounter = ({ mintAmount, tokenAddress }: { mintAmount: number; tokenAddress: string }) => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const [circulatingSupply, setCirulatingSupply] = useState(0);
    const [postMintingSupply, setPostMintingSupply] = useState(0);

    useEffect(() => {
        getSupply(connection, tokenAddress, publicKey).then((supply) => {
            setCirulatingSupply(Number(supply));
            setPostMintingSupply(Number(supply) + Number(mintAmount));
        });
    }, []);

    useEffect(() => {
        setPostMintingSupply(Number(circulatingSupply) + Number(mintAmount));
    }, [mintAmount]);

    return (
        <div className={styles.supplyCounterContainer}>
            <div className={styles.supplyCounter}>
                <p className={styles.supplyCounterTitle}>{'Current supply: '}</p>
                <p className={styles.supplyCounterAmount}>{circulatingSupply}</p>
            </div>
            <div className={styles.supplyCounter}>
                <p className={styles.supplyCounterTitle}>{'Estimated post-minting supply: '}</p>
                <p className={styles.supplyCounterAmount}>{postMintingSupply}</p>
            </div>
        </div>
    );
};

export default SupplyCounter;
