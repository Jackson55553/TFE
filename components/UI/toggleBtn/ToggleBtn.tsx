import React from 'react';
import styles from '../../../styles/sass/_toggleBtn.module.scss';

const ToggleBtn = ({
    toggled,
    setToggled,
    disabled,
}: {
    disabled?: boolean;
    toggled: boolean;
    setToggled: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    return (
        <button
            className={`${styles.toggleBtn} ${toggled ? styles.toggled : ''} ${disabled ? styles.disabled : ''}`}
            onClick={(e) => {
                e.preventDefault();
                setToggled(!toggled);
            }}
            disabled={disabled}
        >
            <div className={styles.thumb}></div>
        </button>
    );
};

export default ToggleBtn;
