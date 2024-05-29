'use client';
import React from 'react';
import styles from '../../styles/sass/_tokens.module.scss';
import { navLinks } from '../../texts/navLinksContent';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const TokensHeader = () => {
    const pathname = usePathname();
    console.log(pathname);
    return (
        <div className={styles.tokensHeader}>
            {navLinks[0].sublinks.map((link) => (
                <Link
                    key={`tokens${link.href}`}
                    href={link.href}
                    className={`${styles.tokensHeaderLink} ${link.isActive ? styles.activeLink : styles.disabledLink} ${pathname === link.href ? styles.onFocusLink : ''}`}
                    onClick={(e) => (link.isActive ? null : e.preventDefault())}
                >
                    {link.name}
                </Link>
            ))}
        </div>
    );
};

export default TokensHeader;
