'use client';
import Link from 'next/link';
import React from 'react';
import styles from '../../styles/sass/_navHeader.module.scss';
import { navLinks } from '../../texts/navLinksContent';
import { usePathname } from 'next/navigation';

const NavHeader = () => {
    const pathname = usePathname();
    return (
        <div className={styles.navCotainer}>
            {navLinks.map((link) => (
                <Link
                    key={link.href}
                    className={`${styles.navLink} ${link.isActive ? styles.activeLink : styles.disabledLink} ${link.href === pathname ? styles.onFocusLink : ''}`}
                    onClick={(e) => (!link.isActive ? e.preventDefault() : null)}
                    href={link.href}
                >
                    {link.name}
                </Link>
            ))}
        </div>
    );
};

export default NavHeader;
