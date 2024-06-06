import React, { useState } from 'react';
import styles from '../../../styles/sass/_infoCard.module.scss';
import { CiWarning } from 'react-icons/ci';
import { IoClose } from 'react-icons/io5';

const InfoCard = ({ message }: { message: string }) => {
    const [isOpen, setIsOpen] = useState(true);

    const onclick = () => {
        setIsOpen(false);
    };

    return (
        <div className={`${styles.card} ${!isOpen ? styles.hidden : ''}`}>
            <div className={styles.cardContainer}>
                <div className={styles.cardIcon}>
                    <CiWarning />
                </div>
                <p className={styles.cardMessage}>{message}</p>
                <button className={styles.cardIconClose} onClick={onclick}>
                    <IoClose />
                </button>
            </div>
        </div>
    );
};

export default React.memo(InfoCard);
