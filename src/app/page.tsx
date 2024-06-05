import React from 'react';
import styles from '../../styles/sass/_home.module.scss';
import MainCards from '../../components/homepage/mainCards/MainCards';
import WelcomeHome from '../../components/homepage/welcomeHome/WelcomeHome';
import Reminder from '../../components/homepage/reminder/Reminder';
import DisclaimerLink from '../../components/UI/disclaimerLink/DisclaimerLink';
import CountsOfService from '../../components/homepage/countsOfService/CountsOfService';

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
