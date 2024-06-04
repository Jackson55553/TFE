import React from 'react';
import Roadmap from '../../../components/aboutPage/roadmap/Roadmap';
import styles from '../../../styles/sass/_about.module.scss';
import Tokenomics from '../../../components/aboutPage/tokenomics/Tokenomics';
import AboutText from '../../../components/aboutPage/aboutText/AboutText';

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
