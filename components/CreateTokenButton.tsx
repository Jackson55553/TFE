import React, { FC } from 'react';
import styles from '../styles/createButton.module.css';

export const CreateTokenButton: FC = (setLoaded, setSign) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <button type="submit" className={styles.createButton} onSubmit={(e) => e.preventDefault()}>
                CREATE TOKEN
            </button>
        </div>
    );
};

export default CreateTokenButton;
