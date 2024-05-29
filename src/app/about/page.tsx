import React from 'react';
import Roadmap from '../../../components/roadmap/Roadmap';
import styles from '../../../styles/sass/_about.module.scss';
import Tokenomics from '../../../components/tokenomics/Tokenomics';
import AboutText from '../../../components/aboutText/AboutText';

const AboutPage = () => {
    return (
        <div style={{ color: 'aqua' }} className={styles.aboutPage}>
            <AboutText />
            <Roadmap />
            <Tokenomics />
        </div>
    );
};

export default AboutPage;
