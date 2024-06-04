'use client';
import React, { useEffect, useState } from 'react';
import styles from '../../../../styles/sass/_revokePermission.module.scss';
import FindTokenForm from '../../../../components/revokePage/findTokenForm/FindTokenForm';
import { Authorities } from '../../../../types/Authorities';
import RevokeCards from '../../../../components/revokePage/revokeCards/RevokeCards';
import RevokeButton from '../../../../components/revokePage/revokeButton/RevokeButton';
import RevokeMainTitle from '../../../../components/UI/mainTitles/RevokeMainTitle/RevokeMainTitle';

export default function RevokePermissionsPage() {
    const [authorities, setAuthorities] = useState({} as Authorities);
    const [choosenAuthorities, setChoosenAuthorities] = useState({} as Authorities);
    const [tokenAddress, setTokenAddress] = useState('');

    // useEffect(() => {
    //     console.log('authorities');
    //     console.log(authorities);
    //     console.log('choosenAuthorities');
    //     console.log(choosenAuthorities);
    //     console.log('tokenAddress');
    //     console.log(tokenAddress);
    // }, [authorities, choosenAuthorities, tokenAddress]);

    const setDefaultValues = () => {
        setAuthorities({} as Authorities);
        setChoosenAuthorities({} as Authorities);
        setTokenAddress('');
    };

    return (
        <div className={styles.revokePermissionsPage}>
            <div className={styles.revokeContainer}>
                <RevokeMainTitle title={'Revoke permissions'} isModal={true} />
                <FindTokenForm
                    setAuthorities={setAuthorities}
                    setTokenAddress={setTokenAddress}
                    tokenAddress={tokenAddress}
                />
                <RevokeCards
                    authorities={authorities}
                    choosenAuthorities={choosenAuthorities}
                    setChoosenAuthorities={setChoosenAuthorities}
                />
                <RevokeButton
                    authorities={authorities}
                    choosenAuthorities={choosenAuthorities}
                    tokenAddress={tokenAddress}
                    setDefaultValues={setDefaultValues}
                />
            </div>
        </div>
    );
}
