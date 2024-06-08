'use client';
import React, { useEffect, useState } from 'react';
import styles from '../../../styles/sass/_supplyCounter.module.scss';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { getSupply } from '../../../scripts/solanaAPI/getSupply';

const SupplyCounter = ({ burnAmount, tokenAddress }: { burnAmount: number; tokenAddress: string }) => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const [circulatingSupply, setCirulatingSupply] = useState(0);
    const [postBurningSupply, setPostBurningSupply] = useState(0);

    useEffect(() => {
        getSupply(connection, tokenAddress, publicKey).then((supply) => {
            setCirulatingSupply(Number(supply));
            setPostBurningSupply(Number(supply) - Number(burnAmount));
        });
    }, []);

    useEffect(() => {
        if (Number(circulatingSupply) - Number(burnAmount) > 0) {
            setPostBurningSupply(Number(circulatingSupply) - Number(burnAmount));
        } else {
            setPostBurningSupply(0);
        }
    }, [burnAmount]);

    return (
        <div className={styles.supplyCounterContainer}>
            <div className={styles.supplyCounter}>
                <p className={styles.supplyCounterTitle}>{'Current supply: '}</p>
                <p className={styles.supplyCounterAmount}>{circulatingSupply}</p>
            </div>
            <div className={styles.supplyCounter}>
                <p className={styles.supplyCounterTitle}>{'Estimated post-burning supply: '}</p>
                <p className={styles.supplyCounterAmount}>{postBurningSupply}</p>
            </div>
        </div>
    );
};

export default SupplyCounter;
