import React from 'react';
import styles from '../../../styles/sass/_footer.module.scss';
import { PiTelegramLogo } from 'react-icons/pi';
// import { FaDiscord } from 'react-icons/fa';
// import { FaXTwitter } from 'react-icons/fa6';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className={styles.footerContainer}>
            <div className={styles.footer}>
                <p>Token For Ever © | 2024 | </p>
                <ul className={styles.linkCategory}>
                    <Link href={'https://t.me/tokenforever'} target="_blank">
                        <PiTelegramLogo />
                        <p>Telegram</p>
                    </Link>
                    {/* <Link href={'/'} target="_blank">
                        <FaXTwitter />
                        <p>Twitter</p>
                    </Link>
                    <Link href={'/'} target="_blank">
                        <FaDiscord />
                        <p>Discord</p>
                    </Link> */}
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
