'use client';
import React, { useEffect, useState } from 'react';
import styles from '../../../../styles/sass/_revokePermission.module.scss';
import FindTokenForm from '../../../../components/revokePage/findTokenForm/FindTokenForm';
import { AuthoritiesType } from '../../../../types/AuthoritiesType';
import RevokeCards from '../../../../components/revokePage/revokeCards/RevokeCards';
import RevokeButton from '../../../../components/revokePage/revokeButton/RevokeButton';
import RevokeMainTitle from '../../../../components/UI/mainTitles/RevokeMainTitle/RevokeMainTitle';

export default function RevokePermissionsPage() {
    const [authorities, setAuthorities] = useState({} as AuthoritiesType);
    const [choosenAuthorities, setChoosenAuthorities] = useState({} as AuthoritiesType);
    const [tokenAddress, setTokenAddress] = useState('');
    const [loading, setLoading] = useState(false);

    const setDefaultValues = () => {
        setAuthorities({} as AuthoritiesType);
        setChoosenAuthorities({} as AuthoritiesType);
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
                    loading={loading}
                    setLoading={setLoading}
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
                    loading={loading}
                />
            </div>
        </div>
    );
}
