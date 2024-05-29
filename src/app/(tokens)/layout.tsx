import React from 'react';
import styles from '../../../styles/sass/_tokens.module.scss';
import TokensHeader from '../../../components/tokensHeader/TokensHeader';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.layout}>
            <TokensHeader />
            {children}
        </div>
    );
}
