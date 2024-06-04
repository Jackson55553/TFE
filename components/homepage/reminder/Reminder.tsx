import React from 'react';
import styles from '../../../styles/sass/_reminder.module.scss';
import { MdOutlinePrivacyTip } from 'react-icons/md';
import ReminderCards from '../reminderCard/ReminderCards';

const mainReminder = {
    title: 'Reminder',
    descrpiption:
        'Your safety is our top priority. When using TFE service for encryption operations, we remind you to check the website information and transaction information multiple times to prevent unnecessary risks.',
};

const Reminder = () => {
    return (
        <div className={styles.reminderContainer}>
            <div className={styles.reminderMain}>
                <div className={styles.reminder}>
                    <p className={styles.reminderTitle}>{mainReminder.title}</p>
                    <p className={styles.reminderDescription}>{mainReminder.descrpiption}</p>
                </div>
                <MdOutlinePrivacyTip className={styles.reminderMainIcon} size={'200px'} />
            </div>
            <div className={styles.reminderCards}>
                <ReminderCards />
            </div>
        </div>
    );
};

export default Reminder;
