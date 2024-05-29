import React from 'react';
import styles from '../../../styles/sass/_switchBtn.module.scss';

const SwitchBtn = ({
    toggled,
    setToggled,
}: {
    toggled: boolean;
    setToggled: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    return (
        <button
            className={`${styles.toggleBtn} ${toggled ? styles.toggled : ''}`}
            onClick={(e) => {
                e.preventDefault();
                setToggled(!toggled);
            }}
        >
            <div className={styles.thumb}></div>
        </button>
    );
};

export default SwitchBtn;
