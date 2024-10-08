'use client';
import React from 'react';
import styles from '../../../styles/sass/_navBurgerMenu.module.scss';
import NavLinkBurger from './navLink/NavLinkBurger';
import { navLinks } from '../../../texts/navLinksContent';

const NavBurgerMenu = ({ openClose }: { openClose: () => void }) => {
    return (
        <div className={styles.navBurgerMenu}>
            {navLinks.map((link) => (
                <NavLinkBurger key={`burgerLink ${link.href}`} openClose={openClose} link={link} />
            ))}
        </div>
    );
};

export default NavBurgerMenu;

//${!link.isArrow ? styles.navBurgerNoArrowLink : ''}
