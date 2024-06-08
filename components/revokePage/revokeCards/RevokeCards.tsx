import React, { useEffect, useState } from 'react';
import styles from '../../../styles/sass/_revokeCards.module.scss';
import { Authorities, AuthoritiesType } from '../../../types/AuthoritiesType';
import { permissions } from '../../createPage/createForm/permissionsMain/permissionCard/permissionsContent/permissionsContent';
import RevokeCard from './revokeCard/RevokeCard';
const RevokeCards = ({
    authorities,
    choosenAuthorities,
    setChoosenAuthorities,
}: {
    authorities: AuthoritiesType;
    choosenAuthorities: AuthoritiesType;
    setChoosenAuthorities: React.Dispatch<React.SetStateAction<AuthoritiesType>>;
}) => {
    const [toggleUpdate, setToggleUpdate] = useState(authorities.update);
    const [toggleFreeze, setToggleFreeze] = useState(authorities.freeze);
    const [toggleMint, setToggleMint] = useState(authorities.mint);

    const toggles = {
        update: { toggled: toggleUpdate, setToggled: setToggleUpdate },
        freeze: { toggled: toggleFreeze, setToggled: setToggleFreeze },
        mint: { toggled: toggleMint, setToggled: setToggleMint },
    };

    useEffect(() => {
        setChoosenAuthorities({ ...choosenAuthorities, update: toggleUpdate, freeze: toggleFreeze, mint: toggleMint });
    }, [toggleUpdate, toggleFreeze, toggleMint]);

    useEffect(() => {
        if (
            (authorities.freeze === false && authorities.mint === false && authorities.update === false) ||
            !Object.keys(authorities).length
        ) {
            setToggleUpdate(false);
            setToggleFreeze(false);
            setToggleMint(false);
        }
    }, [authorities]);

    permissions.forEach((permission) => {
        permission.toggled = toggles[permission.id as keyof typeof Authorities].toggled;
        permission.setToggled = toggles[permission.id as keyof typeof Authorities].setToggled;
    });

    return (
        <div className={styles.permissionsContainer}>
            {permissions.map((permission) => (
                <RevokeCard
                    key={`card${permission.title}`}
                    permission={permission}
                    disabled={!authorities[permission.id as keyof typeof Authorities]}
                />
            ))}
        </div>
    );
};

export default RevokeCards;
