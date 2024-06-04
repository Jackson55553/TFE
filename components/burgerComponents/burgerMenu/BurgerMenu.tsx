'use client';
import React, { FC } from 'react';
import styles from '../../../styles/sass/_burgerMenu.module.scss';
import ButtonDefault from '../../UI/defaultButton/DefaultButton';
import { IoClose } from 'react-icons/io5';
import MainIcon from '../../../svg/mainIcon';
import NavBurgerMenu from '../navBurgerMenu/NavBurgerMenu';

const BurgerMenu = ({ isOpen, openClose }: { isOpen: boolean; openClose: () => void }) => {
    const onWrapperClick = (e) => {
        if (e.target.classList.contains(styles.burgerMenuWrapper)) {
            openClose();
        }
    };
    return (
        <div
            className={`${styles.burgerMenuWrapper} ${isOpen ? styles.visibleMenuWrapper : styles.hiddenMenuWrapper}`}
            onClick={onWrapperClick}
        >
            <div className={`${styles.burgerMenu} ${isOpen ? styles.visibleMenu : styles.hiddenMenu}`}>
                <ButtonDefault text={<IoClose />} type={'button'} newClass={styles.burgerCloseBtn} action={openClose} />
                <div className={styles.burgerIcon}>
                    <MainIcon />
                </div>
                <NavBurgerMenu openClose={openClose} />
            </div>
        </div>
    );
};

export default BurgerMenu;
