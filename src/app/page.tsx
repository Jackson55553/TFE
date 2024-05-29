import React from 'react';
import styles from '../../styles/sass/_home.module.scss';
import MainCards from '../../components/mainCards/MainCards';
import WelcomeHome from '../../components/welcomeHome/WelcomeHome';
import Reminder from '../../components/reminder/Reminder';
import DisclaimerLink from '../../components/disclaimerLink/DisclaimerLink';

export default function HomePage() {
    return (
        <div className={styles.homePage}>
            <WelcomeHome />
            <MainCards />
            <Reminder />
            <div className={styles.disclaimer}>
                <DisclaimerLink />
            </div>
        </div>
    );
}

/* {isClient ? <WalletMultiButton style={{ marginTop: '20px' }} /> : ''}
<h1>Hello App</h1>
<FormContainer setLoaded={setLoaded} setSign={setSign} />
{loaded ? (
    <div className={styles.signatureContainer}>
        <p>
            Signature:
            <Link href={`https://explorer.solana.com/tx/${sign}?cluster=devnet`} target="_blank">
                {`https://explorer.solana.com/tx/${sign}?cluster=devnet`}
            </Link>
        </p>
        <button
            style={{ position: 'absolute', top: '0', right: '0' }}
            onClick={() => {
                setLoaded(false);
            }}
        >
            <IoMdClose />
        </button>
    </div>
) : null} */
