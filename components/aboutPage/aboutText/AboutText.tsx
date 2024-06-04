import React from 'react';
import { aboutText } from '../../../texts/aboutContent';
import styles from '../../styles/sass/_about.module.scss';
import DisclaimerLink from '../../UI/disclaimerLink/DisclaimerLink';

const AboutText = () => {
    return (
        <div>
            <p className={styles.aboutText}>{aboutText}</p>
            <DisclaimerLink />
        </div>
    );
};

export default AboutText;
