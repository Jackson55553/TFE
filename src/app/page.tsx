import React from 'react';
import styles from '../../styles/sass/_home.module.scss';
import MainCards from '../../components/mainCards/MainCards';
import WelcomeHome from '../../components/welcomeHome/WelcomeHome';
import Reminder from '../../components/reminder/Reminder';
import DisclaimerLink from '../../components/disclaimerLink/DisclaimerLink';
import CountsOfService from '../../components/countsOfService/CountsOfService';

export default function HomePage() {
    return (
        <div className={styles.homePage}>
            <WelcomeHome />
            <CountsOfService />
            <MainCards />
            <Reminder />
            <div className={styles.disclaimer}>
                <DisclaimerLink />
            </div>
        </div>
    );
}
