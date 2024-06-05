'use client';
import React from 'react';
import styles from '../../../styles/sass/_mainCards.module.scss';
import { mainCardsContent, header } from '../../../texts/mainCardsContent';
import { FaShieldAlt } from 'react-icons/fa';
import { IoIosPricetags } from 'react-icons/io';
import { LuAppWindow } from 'react-icons/lu';
import { FaServer } from 'react-icons/fa';

const MainCards = () => {
    return (
        <>
            <p className={styles.mainCardsHeader}>{header}</p>
            <div className={styles.mainCards}>
                <article className={styles.mainCardContainer}>
                    <p className={styles.mainCardTitle}>
                        {mainCardsContent[0].title} <FaShieldAlt className={styles.cardIcon} />
                    </p>
                    <p className={styles.mainCardDescription}>{mainCardsContent[0].description}</p>
                </article>
                <article className={styles.mainCardContainer}>
                    <p className={styles.mainCardTitle}>
                        {mainCardsContent[1].title} <IoIosPricetags className={styles.cardIcon} />
                    </p>
                    <p className={styles.mainCardDescription}>{mainCardsContent[1].description}</p>
                </article>
                <article className={styles.mainCardContainer}>
                    <p className={styles.mainCardTitle}>
                        {mainCardsContent[2].title} <LuAppWindow className={styles.cardIcon} />
                    </p>
                    <p className={styles.mainCardDescription}>{mainCardsContent[2].description}</p>
                </article>
                <article className={styles.mainCardContainer}>
                    <p className={styles.mainCardTitle}>
                        {mainCardsContent[3].title} <FaServer className={styles.cardIcon} />
                    </p>
                    <p className={styles.mainCardDescription}>{mainCardsContent[3].description}</p>
                </article>
            </div>
        </>
    );
};
export default MainCards;
