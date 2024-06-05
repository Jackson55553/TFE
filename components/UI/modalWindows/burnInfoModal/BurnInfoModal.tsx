import React from 'react';
import styles from '../../../../styles/sass/_tokenInfoModal.module.scss';

const BurnInfoModal = ({ closeModal, modalIsOpen }: { closeModal: () => void; modalIsOpen: boolean }) => {
    const onWrapperClick = (event) => {
        if (event.target.classList.contains(`${styles.modalWrapper}`)) closeModal();
    };
    return (
        <div className={modalIsOpen ? styles.displayModal : styles.hiddenModal}>
            <div className={styles.modalWrapper} onClick={onWrapperClick}>
                <div className={styles.modalContent}>
                    <h2>Burn Solana Token</h2>
                    <p>Easily Burn your own Solana SPL Token without Coding. Less than 5 minutes, No Code & Cheap.</p>
                    <h2>How to use Burn Token</h2>
                    <ul>
                        <li>Connect your Solana wallet.</li>
                        <li>Write the address of your token.</li>
                        <li>Click the search button for find your associated account.</li>
                        <li>Write amount to burn.</li>
                        <li>Click the burn button, accept the transaction and wait until your token will burn.</li>
                    </ul>
                    <h2>Cost of burn the permissions</h2>
                    <p>The cost of burning is 0.04 SOL.</p>
                    <h2>Burning process</h2>
                    <p>
                        The burning process will start and will take some seconds. After that you will receive the
                        notification with transaction signature.
                    </p>
                    <button onClick={closeModal}>CLOSE</button>
                </div>
            </div>
        </div>
    );
};

export default BurnInfoModal;
// BurnInfoModal
