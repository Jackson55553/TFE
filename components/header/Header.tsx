'use client';
import React, { FC, useEffect, useState } from 'react';
import MainIcon from '../../svg/mainIcon';
import styles from '../../styles/sass/_header.module.scss';
import NavHeader from '../navHeader/NavHeader';
import BurgerMenuIcon from '../burgerMenuIcon/BurgerMenuIcon';
import BurgerMenu from '../burgerMenu/BurgerMenu';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Header: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);
    const openClose = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <div className={styles.mainIcon}>
                    <MainIcon />
                </div>
                <h1>
                    <span className={styles.abbreviature}>T</span>oken <span className={styles.abbreviature}>F</span>
                    or <span className={styles.abbreviature}>E</span>ver
                </h1>
                <div className={styles.walletButtonContainer}>
                    <div>{isClient && <WalletMultiButton />}</div>
                </div>
                <BurgerMenuIcon openClose={openClose} />
                <BurgerMenu isOpen={isOpen} openClose={openClose} />
            </div>
            <div className={styles.navContainer}>
                <NavHeader />
            </div>
        </header>
    );
};

export default Header;
