import React, { FC } from 'react';
import styles from '../../styles/sass/_buttonDefault.module.scss';
import { IDefaultButtonProps } from '../../interfaces/IDefaultButtonProps';

const ButtonDefault = ({ text, type, newClass, action }: IDefaultButtonProps) => {
    return (
        <button className={`${styles.defaultBtn} ${newClass}`} type={type} onClick={action}>
            {text}
        </button>
    );
};

export default ButtonDefault;
