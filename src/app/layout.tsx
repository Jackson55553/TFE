import Script from 'next/script';
import styles from '../../styles/sass/_global.module.scss';
import { Wallet } from '../../components/layoutsComponents/wallet/Wallet';
import React from 'react';
import Footer from '../../components/layoutsComponents/footer/Footer';
import Header from '../../components/layoutsComponents/header/Header';
import { Metadata } from 'next';

export const metadata: Metadata = {
    metadataBase: new URL('https://tokenforever.space'),
    alternates: { canonical: '/' },
    title: {
        template: '%s | Token For Ever',
        default: 'Token For Ever', // a default is required when creating a template
    },
    description: 'Service for generating and managing tokens. No code, easy and low fees!',
    openGraph: {
        images: '/opengraph-image.png',
    },
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
                <Script defer src="https://cloud.umami.is/script.js" data-website-id="da244111-295a-4e4e-8a89-75a741d68269"></Script>
            </body>
        </html>
    );
}
