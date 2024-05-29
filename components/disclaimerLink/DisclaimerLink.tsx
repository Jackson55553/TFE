import Link from 'next/link';
import React from 'react';
import styles from '../../styles/sass/_disclaimer.module.scss';

const DisclaimerLink = () => {
    return (
        <>
            <p className={styles.linkDisclaimer}>
                Be sure to check out
                <Link href={'/disclaimer'} target="_blank">
                    {' Terms of use of the service'}
                </Link>
            </p>
        </>
    );
};

export default DisclaimerLink;
