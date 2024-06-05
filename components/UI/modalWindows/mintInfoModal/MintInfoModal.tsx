import React from 'react';
import styles from '../../../../styles/sass/_tokenInfoModal.module.scss';

const MintInfoModal = ({ closeModal, modalIsOpen }: { closeModal: () => void; modalIsOpen: boolean }) => {
    const onWrapperClick = (event) => {
        if (event.target.classList.contains(`${styles.modalWrapper}`)) closeModal();
    };
    return (
        <div className={modalIsOpen ? styles.displayModal : styles.hiddenModal}>
            <div className={styles.modalWrapper} onClick={onWrapperClick}>
                <div className={styles.modalContent}>
                    <h2>Mint Solana Token</h2>
                    <p>Easily Mint your own Solana SPL Token without Coding. Less than 5 minutes, No Code & Cheap.</p>
                    <h2>How to use Mint Token</h2>
                    <ul>
                        <li>Connect your Solana wallet.</li>
                        <li>Write the address of your token.</li>
                        <li>Click the search button for find your associated account.</li>
                        <li>Write amount to mint.</li>
                        <li>Click the mint button, accept the transaction and wait until your token will mint.</li>
                    </ul>
                    <h2>Cost of mint the permissions</h2>
                    <p>The cost of minting is 0.05 SOL.</p>
                    <h2>Minting process</h2>
                    <p>
                        The minting process will start and will take some seconds. After that you will receive the
                        notification with transaction signature.
                    </p>
                    <button onClick={closeModal}>CLOSE</button>
                </div>
            </div>
        </div>
    );
};

export default MintInfoModal;
// MintInfoModal
