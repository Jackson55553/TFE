import React from 'react';
import styles from '../../../styles/sass/_supplyContainer.module.scss';

const SupplyCounter = () => {
    return (
        <div className={styles.supplyCounterContainer}>
            <div className={styles.supplyCounter}>
                <p></p>
                <p></p>
            </div>
            <div className={styles.supplyCounter}>
                <p className={styles.supplyCounterTitle}></p>
                <p className={styles.supplyCounterAmount}></p>
            </div>
        </div>
    );
};

export default SupplyCounter;
