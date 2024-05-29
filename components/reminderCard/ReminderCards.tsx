import React from 'react';
import styles from '../../styles/sass/_reminder.module.scss';
import { reminderCards } from '../../texts/reminderCardsContent';

const ReminderCards = () => {
    return (
        <>
            {reminderCards.map((card) => (
                <div key={`card${card.title}`} className={styles.reminderCard}>
                    <p className={styles.reminderTitle}>{card.title}</p>
                    <p>{card.description}</p>
                </div>
            ))}
        </>
    );
};

export default ReminderCards;
