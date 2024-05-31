import React from 'react';
import styles from '../../../../styles/sass/_permissions.module.scss';
import ToggleBtn from '../../../UI/toggleBtn/ToggleBtn';
import { IPermission } from '../../../../interfaces/IPermission';

const PermissionCard = ({ permission }: { permission: IPermission }) => {
    return (
        <div className={styles.permissionsCard}>
            <div className={styles.permissionsTitleContainer}>
                <h2>{permission.title}</h2>
                <ToggleBtn toggled={permission.toggled} setToggled={permission.setToggled} />
            </div>
            <p className={styles.permissionsDescription}>{permission.description}</p>
        </div>
    );
};

export default PermissionCard;
