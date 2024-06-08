import React from 'react';
import styles from '../../../../styles/sass/_tokenInfoCards.module.scss';
import Link from 'next/link';

const TokenInfoCard = ({ value, property }: { property: string; value: string }) => {
    return (
        <div className={styles.infoCard}>
            <p className={styles.infoCardTitle}>{`Token ${property}`}</p>
            {property === 'address' ? (
                <Link
                    href={`https://explorer.solana.com/address/${value}?cluster=devnet`}
                    target="_blank"
                    className={styles.addressLink}
                >
                    {value}
                </Link>
            ) : (
                <p className={styles.infoCardValue}>{`${value}`}</p>
            )}
        </div>
    );
};

export default TokenInfoCard;
