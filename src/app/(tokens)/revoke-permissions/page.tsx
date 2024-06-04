'use client';
import React, { useEffect, useState } from 'react';
import styles from '../../../../styles/sass/_revokePermission.module.scss';
import SimpleMainTitle from '../../../../components/simpleMainTitle/SimpleMainTitle';
import FindTokenForm from '../../../../components/findTokenForm/FindTokenForm';
import { Authorities } from '../../../../types/Authorities';
import RevokeCards from '../../../../components/revokeCards/RevokeCards';
import RevokeButton from '../../../../components/revokeButton/RevokeButton';

export default function RevokePermissionsPage() {
    const [authorities, setAuthorities] = useState({} as Authorities);
    const [choosenAuthorities, setChoosenAuthorities] = useState({} as Authorities);
    const [tokenAddress, setTokenAddress] = useState('');

    useEffect(() => {
        // console.log(authorities);
        // console.log(choosenAuthorities);
    }, [authorities, choosenAuthorities]);

    return (
        <div className={styles.revokePermissionsPage}>
            <div className={styles.revokeContainer}>
                <SimpleMainTitle title={'Revoke permissions'} isModal={false} />
                <FindTokenForm setAuthorities={setAuthorities} setTokenAddress={setTokenAddress} tokenAddress={tokenAddress}/>
                <RevokeCards
                    authorities={authorities}
                    choosenAuthorities={choosenAuthorities}
                    setChoosenAuthorities={setChoosenAuthorities}
                />
                <RevokeButton authorities={authorities} choosenAuthorities={choosenAuthorities} tokenAddress={tokenAddress}/>
            </div>
        </div>
    );
}
