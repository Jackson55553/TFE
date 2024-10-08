import React from 'react';
import styles from '../../../styles/sass/_tokens.module.scss';
import TokensHeader from '../../../components/layoutsComponents/tokensHeader/TokensHeader';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className={styles.layout}>
                <TokensHeader />
                {children}
            </div>
            <ToastContainer theme="dark" stacked />
        </>
    );
}
