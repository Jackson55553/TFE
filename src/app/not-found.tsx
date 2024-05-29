'use client';
import Link from 'next/link';
import React from 'react';
import styles from '../../styles/sass/_not-found.module.scss';
import { usePathname } from 'next/navigation';

export default function NotFound() {
    const pathname = usePathname();
    return (
        <div className={styles.container}>
            <h1>Ooops... Something wrong!</h1>
            <h2>404 Not Found: {pathname}</h2>
            <p>Could not find requested resource</p>
            <p>
                <Link href="/">Return to home page</Link>
            </p>
        </div>
    );
}
