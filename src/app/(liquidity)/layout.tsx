import React from 'react';
import styles from '../../../styles/sass/_liquidityLayout.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import LiquidityHeader from '../../../components/layoutsComponents/liquidityHeader/LiquidityHeader';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className={styles.layout}>
                <LiquidityHeader />
                {children}
            </div>
            <ToastContainer theme="dark" stacked />
        </>
    );
}
