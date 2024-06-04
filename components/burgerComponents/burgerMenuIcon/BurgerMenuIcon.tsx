import React, { FC } from 'react';
import styles from '../../../styles/sass/_burgerMenu.module.scss';
import { IoMenuOutline } from 'react-icons/io5';

const BurgerMenuIcon = ({ openClose }: { openClose: () => void }) => {
    return (
        <div className={styles.burgerMenuIcon}>
            <IoMenuOutline onClick={openClose} size={'50px'} className={styles.icon} />
        </div>
    );
};

export default BurgerMenuIcon;
