import React from 'react';
import styles from '../../../styles/sass/_wallets.module.scss';
export default function Layout({ children }: { children: React.ReactNode }) {
    return <section className={styles.layout}>{children}</section>;
}
