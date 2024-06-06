'use client';
import React, { useState } from 'react';
import styles from '../../../../styles/sass/_simpleMainTitle.module.scss';
import { IoInformationCircle } from 'react-icons/io5';
import MintInfoModal from '../../modalWindows/mintInfoModal/MintInfoModal';

const MintMainTitle = ({ title, isModal }: { title: string; isModal?: boolean }) => {
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
            {isModal && <MintInfoModal closeModal={closeModal} modalIsOpen={modalIsOpen} />}
        </h2>
    );
};

export default React.memo(MintMainTitle);
// MintMainTitle
