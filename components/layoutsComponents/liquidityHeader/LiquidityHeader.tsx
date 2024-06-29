'use client';
import React from 'react';
import styles from '../../../styles/sass/_tokens.module.scss';
import { navLinks } from '../../../texts/navLinksContent';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const LiquidityHeader = () => {
    const pathname = usePathname();
    return (
        <div className={styles.tokensHeader}>
            {navLinks[2].sublinks.map((link) => (
                <Link
                    key={`liquidity${link.name}`}
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

export default LiquidityHeader;
