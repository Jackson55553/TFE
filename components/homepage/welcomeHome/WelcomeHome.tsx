import React from 'react';
import styles from '../../../styles/sass/_home.module.scss';
const header = {
    title: 'Welcome to Token For Ever!',
    description: `Easy to use service for creating and managing tokens.`,
};
const WelcomeHome = () => {
    return (
        <>
            <h2 className={styles.welcomeHeader}>{header.title}</h2>
            <p className={styles.welcomeDescription}>{header.description}</p>
        </>
    );
};

export default React.memo(WelcomeHome);
