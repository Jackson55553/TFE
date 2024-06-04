import React from 'react';
import styles from '../../../styles/sass/_tokenomics.module.scss';
import { mainTitle, tokenomicsContent } from '../../../texts/tokenomicsContent';
const Tokenomics = () => {
    return (
        <>
            <h2 className={styles.tokenomicTitle}>{mainTitle}</h2>
            <div className={styles.tokenomicContainer}>
                {tokenomicsContent.map((tokenomic) => (
                    <div key={`tokenomic${tokenomic.title}`} className={styles.tokenomicElement}>
                        <p>{tokenomic.title}</p>
                        <p>{tokenomic.description}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Tokenomics;
