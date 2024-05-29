import React from 'react';
import MainIcon from '../../../svg/mainIcon';
import styles from '../../../styles/sass/_loading.module.scss';
export default function Loading() {
    return (
        <div className={styles.loadingContainer}>
            <MainIcon />
        </div>
    );
}
