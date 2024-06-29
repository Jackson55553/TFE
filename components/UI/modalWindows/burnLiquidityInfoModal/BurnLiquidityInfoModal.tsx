import React from 'react';
import styles from '../../../../styles/sass/_tokenInfoModal.module.scss';

const BurnLiquidityInfoModal = ({ closeModal, modalIsOpen }: { closeModal: () => void; modalIsOpen: boolean }) => {
    const onWrapperClick: React.MouseEventHandler<HTMLDivElement> = (event: any) => {
        if (event.target.classList.contains(`${styles.modalWrapper}`)) closeModal();
    };
    return (
        <div className={modalIsOpen ? styles.displayModal : styles.hiddenModal}>
            <div className={styles.modalWrapper} onClick={onWrapperClick}>
                <div className={styles.modalContent}>
                    <h2>Burn Liquidity</h2>
                    <p>Easily Burn your Liquidity Token without Coding. Less than 5 minutes, No Code & Cheap.</p>
                    <h2>How to use Burn Liquidity</h2>
                    <ul>
                        <li>Connect your Solana wallet.</li>
                        <li>Find token account address in any solana network browser or in your wallet.</li>
                        <li>
                            Write amount to burn. ( Amount must be grether than 0 and less than your token balance )
                        </li>
                        <li>Click the burn button, accept the transaction and wait until your token will burn.</li>
                    </ul>
                    <h2>Cost of burning the liquidity</h2>
                    {/* TODO: WRITE FULL PRICE FOR TOKEN CREATION */}
                    <p>The cost of burn the liquidity is 0.05 SOL.</p>
                    <h2>Burning process</h2>
                    <p>
                        The Burning process will start and will take some seconds. After that you will receive the
                        notification with transaction signature.
                    </p>
                    <button onClick={closeModal}>CLOSE</button>
                </div>
            </div>
        </div>
    );
};

export default React.memo(BurnLiquidityInfoModal);
