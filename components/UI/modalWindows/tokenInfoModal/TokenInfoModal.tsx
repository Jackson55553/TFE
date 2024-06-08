import React from 'react';
import styles from '../../../../styles/sass/_tokenInfoModal.module.scss';

const TokenInfoModal = ({ closeModal, modalIsOpen }: { closeModal: () => void; modalIsOpen: boolean }) => {
    const onWrapperClick: React.MouseEventHandler<HTMLDivElement> = (event: any) => {
        if (event.target.classList.contains(`${styles.modalWrapper}`)) closeModal();
    };
    return (
        <div className={modalIsOpen ? styles.displayModal : styles.hiddenModal}>
            <div className={styles.modalWrapper} onClick={onWrapperClick}>
                <div className={styles.modalContent}>
                    <h2>Create Solana Token</h2>
                    <p>
                        Easily Create your own Solana SPL Token without Coding with the metadata you choose. Less than 5
                        minutes, No Code & Cheap.
                    </p>
                    <h2>How to use Token Creator</h2>
                    <ul>
                        <li>Connect your Solana wallet.</li>
                        <li>Write the name you want for your Token.(max. 20 symbols)</li>
                        <li>Write the symbol (max 8 characters).</li>
                        <li>Put the Supply of your Token. (max. 149999999999999)</li>
                        <li>Write the description you want for your SPL Token. (Optional)</li>
                        <li>Provide links to external resources. (Optional)</li>
                        <li>
                            {` You can specify your creator information (default: Token For Ever)\n`}
                            {`Additional fees (0.4 SOL). (Optional)`}
                        </li>
                        <li>Select tags for your token. (Optional)</li>
                        <li>
                            {`Upload the image for your token.\n (Supported image formats: PNG/GIF/JPG and JPEG Recommended size: 1000×1000 pixels).`}
                        </li>
                        <li>Click on create, accept the transaction and wait until your token is ready.</li>
                    </ul>
                    <h2>Cost of creating the Token</h2>
                    {/* TODO: WRITE FULL PRICE FOR TOKEN CREATION */}
                    <p>The cost of creating the Token is 0.09 SOL.</p>
                    <h2>Creation process</h2>
                    <p>
                        The creation process will start and will take some seconds. After that you will receive the
                        total supply of the token in the wallet you specified.
                    </p>
                    <button onClick={closeModal}>CLOSE</button>
                </div>
            </div>
        </div>
    );
};

export default React.memo(TokenInfoModal);
