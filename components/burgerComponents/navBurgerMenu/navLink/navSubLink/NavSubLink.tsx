import React from 'react';
import styles from '../../../../../styles/sass/_navBurgerMenu.module.scss';
import Link from 'next/link';
import { Sublink } from '../../../../../types/Sublinks';
import { usePathname } from 'next/navigation';

const NavSubLinks = ({
    sublinks,
    openClose,
    subIsOpen,
}: {
    sublinks: Sublink[];
    openClose: () => void;
    subIsOpen: boolean;
}) => {
    const pathname = usePathname();
    return (
        <>
            <div className={`${styles.sublinksContainer} ${subIsOpen ? styles.subOpen : styles.subClose}`}>
                {sublinks?.map((sublink) => (
                    <Link
                        href={sublink.href}
                        key={`sublinkBurger${sublink.name}`}
                        className={`${sublink.isActive ? styles.activeLink : styles.disabledLink} ${pathname === sublink.href ? styles.activePath : ''} ${styles.navBurgerSublink} `}
                        onClick={(e) => {
                            sublink.isActive ? openClose() : e.preventDefault();
                        }}
                    >
                        {sublink.name}
                    </Link>
                ))}
            </div>
        </>
    );
};

export default NavSubLinks;
