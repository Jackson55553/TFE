import React from 'react';
import styles from '../../../../styles/sass/_tokenInfoModal.module.scss';

const RevokeInfoModal = ({ closeModal, modalIsOpen }: { closeModal: () => void; modalIsOpen: boolean }) => {
    const onWrapperClick: React.MouseEventHandler<HTMLDivElement> = (event: any) => {
        if (event.target.classList.contains(`${styles.modalWrapper}`)) closeModal();
    };
    return (
        <div className={modalIsOpen ? styles.displayModal : styles.hiddenModal}>
            <div className={styles.modalWrapper} onClick={onWrapperClick}>
                <div className={styles.modalContent}>
                    <h2>Revoke Solana Token Permissions</h2>
                    <p>Easily Revoke your own Solana SPL Token without Coding. Less than 5 minutes, No Code & Cheap.</p>
                    <h2>How to use Revoke permissions</h2>
                    <ul>
                        <li>Connect your Solana wallet.</li>
                        <li>Write the address of your token.</li>
                        <li>Click the search button for upload your token data.</li>
                        <li>Choose the permissions for revoke.</li>
                        <li>
                            Click the revoke button, accept the transaction and wait until your transaction is ready.
                        </li>
                    </ul>
                    <h2>Cost of revoke the permissions</h2>
                    <p>The cost of revoking is free.</p>
                    <h2>Revoking process</h2>
                    <p>
                        The revoking process will start and will take some seconds. After that you will receive the
                        notification with transaction signature.
                    </p>
                    <button onClick={closeModal}>CLOSE</button>
                </div>
            </div>
        </div>
    );
};

export default React.memo(RevokeInfoModal);
