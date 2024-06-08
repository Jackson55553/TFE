import React, { useEffect, useState } from 'react';
import styles from '../../../../styles/sass/_permissions.module.scss';
import { permissions } from './permissionCard/permissionsContent/permissionsContent';
import PermissionCard from './permissionCard/PermissionCard';
import { AuthoritiesType } from '../../../../types/AuthoritiesType';
import { Permission } from '../../../../interfaces/IPermission';

const PermissionsMain = ({
    authorities,
    setAuthorities,
}: {
    setAuthorities: React.Dispatch<React.SetStateAction<AuthoritiesType>>;
    authorities: AuthoritiesType;
}) => {
    const [toggleUpdate, setToggleUpdate] = useState(false);
    const [toggleFreeze, setToggleFreeze] = useState(false);
    const [toggleMint, setToggleMint] = useState(false);

    const toggles = {
        update: { toggled: toggleUpdate, setToggled: setToggleUpdate },
        freeze: { toggled: toggleFreeze, setToggled: setToggleFreeze },
        mint: { toggled: toggleMint, setToggled: setToggleMint },
    };

    useEffect(() => {
        setAuthorities({ ...authorities, update: toggleUpdate, freeze: toggleFreeze, mint: toggleMint });
    }, [toggleUpdate, toggleFreeze, toggleMint]);

    useEffect(() => {
        if (authorities.freeze === false && authorities.mint === false && authorities.update === false) {
            setToggleUpdate(false);
            setToggleFreeze(false);
            setToggleMint(false);
        }
    }, [authorities]);

    permissions.forEach((permission) => {
        permission.toggled = toggles[permission.id as keyof typeof Permission].toggled;
        permission.setToggled = toggles[permission.id as keyof typeof Permission].setToggled;
    });

    return (
        <div className={styles.permissionsContainer}>
            {permissions.map((permission) => (
                <PermissionCard key={`card${permission.title}`} permission={permission} />
            ))}
        </div>
    );
};

export default React.memo(PermissionsMain);
