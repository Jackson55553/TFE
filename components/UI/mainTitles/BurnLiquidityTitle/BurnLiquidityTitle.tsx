'use client';
import React, { useState } from 'react';
import styles from '../../../../styles/sass/_simpleMainTitle.module.scss';
import { IoInformationCircle } from 'react-icons/io5';
import BurnLiquidityInfoModal from '../../modalWindows/burnLiquidityInfoModal/BurnLiquidityInfoModal';

const BurnLiquidityTitle = ({ title, isModal }: { title: string; isModal?: boolean }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <h2 className={styles.mainTitleContainer}>
            {title}
            {isModal && <IoInformationCircle onClick={openModal} />}
            {isModal && <BurnLiquidityInfoModal closeModal={closeModal} modalIsOpen={modalIsOpen} />}
        </h2>
    );
};

export default React.memo(BurnLiquidityTitle);
