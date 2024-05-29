import React from 'react';
import styles from '../../../styles/sass/_disclaimer.module.scss';
import { title, disclaimerText } from '../../../texts/disclaimerContent';
import Link from 'next/link';
const DisclaimerPage = () => {
    return (
        <div className={styles.disclaimerPage}>
            <h1>{title}</h1>
            {disclaimerText.map((text, i) => (
                <p key={`discText${i}`}>{text}</p>
            ))}
            <p>
                Return to
                <Link href={'/'} className={styles.linkHome}>
                    {' HOMEPAGE'}
                </Link>
            </p>
        </div>
    );
};

export default DisclaimerPage;
