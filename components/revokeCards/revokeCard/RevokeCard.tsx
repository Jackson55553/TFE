import React from 'react';
import styles from '../../../styles/sass/_revokeCards.module.scss';
import { IPermission } from '../../../interfaces/IPermission';
import ToggleBtn from '../../UI/toggleBtn/ToggleBtn';

const RevokeCard = ({ disabled, permission }: { permission: IPermission; disabled: boolean }) => {
    return (
        <div className={styles.revokeCard}>
            <div className={styles.revokeTitleContainer}>
                <h2>{permission.title}</h2>
                <ToggleBtn toggled={permission.toggled} setToggled={permission.setToggled} disabled={disabled} />
            </div>
            {disabled ? <span className={styles.revokedSpan}>{'Not approved'}</span> : ''}
            <p className={styles.revokeDescription}>{permission.description}</p>
        </div>
    );
};
export default RevokeCard;
