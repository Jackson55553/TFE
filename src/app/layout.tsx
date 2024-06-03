import styles from '../../styles/sass/_global.module.scss';
import { Wallet } from '../../components/wallet/Wallet';
import React from 'react';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        template: '%s | Token For Ever',
        default: 'Token For Ever', // a default is required when creating a template
    },
    description: 'Generated by Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html className={styles.html} lang="en">
            <body className={styles.root}>
                <Wallet>
                    <Header />
                    {children}
                    <Footer />
                </Wallet>
            </body>
        </html>
    );
}
