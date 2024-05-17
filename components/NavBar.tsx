"use client";
import Link from "next/link";
import React, { FC } from "react";
import styles from "../styles/navbar.module.css";
import { usePathname } from "next/navigation";

const NavBar: FC = () => {
    const pathname = usePathname();
    console.log(pathname);
    return (
        <div className={styles.navbarContainer}>
            <Link
                className={`${styles.navLink} ${
                    pathname == "/user" ? styles.active : ""
                }`}
                href="/user"
            >
                USER
            </Link>
            <Link
                className={`${styles.navLink} ${
                    pathname === "/wallets" ? styles.active : ""
                }`}
                href="/wallets"
            >
                WALLETS
            </Link>
            <Link
                className={`${styles.navLink} ${
                    pathname === "/mypage" ? styles.active : ""
                }`}
                href="/mypage"
            >
                MY PAGE
            </Link>
        </div>
    );
};

export default NavBar;
