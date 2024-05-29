import React, { useState } from 'react';
import styles from '../../../styles/sass/_navBurgerMenu.module.scss';
import { IoIosArrowDown } from 'react-icons/io';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { INavLink } from '../../../interfaces/INavLinks';
import NavSubLinks from './navSubLink/NavSubLink';

const NavLinkBurger = ({ openClose, link }: { openClose: () => void; link: INavLink }) => {
    const pathname = usePathname();
    const [subIsOpen, setSubIsOpen] = useState(false);

    return (
        <div key={`burger${link.name}`} className={`${styles.navBurgerLink} `}>
            <p
                className={`${link.isActive ? styles.activeLink : styles.disabledLink} `}
                onClick={(e) => (link.isActive ? setSubIsOpen(!subIsOpen) : e.preventDefault())}
            >
                {link.isArrow ? (
                    <>
                        <IoIosArrowDown className={subIsOpen ? styles.arrowSubOpen : styles.arrowSubClose} />
                        {link.name}
                    </>
                ) : (
                    <Link
                        href={link.href}
                        className={`${styles.navBurgerNoArrowLink} ${pathname === link.href ? styles.activePath : ''}`}
                        onClick={(e) => {
                            link.isActive ? openClose() : e.preventDefault();
                        }}
                    >
                        {link.name}
                    </Link>
                )}
            </p>
            <>
                {link.sublinks?.length ? (
                    <NavSubLinks sublinks={link.sublinks} openClose={openClose} subIsOpen={subIsOpen} />
                ) : (
                    <></>
                )}
            </>
        </div>
    );
};

export default NavLinkBurger;
