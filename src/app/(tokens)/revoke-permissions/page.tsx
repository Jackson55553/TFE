'use client';
import React from 'react';
import styles from '../../../../styles/sass/_revokePermission.module.scss';
import SimpleMainTitle from '../../../../components/simpleMainTitle/SimpleMainTitle';
import FindTokenForm from '../../../../components/findTokenForm/FindTokenForm';
export default function RevokePermissionsPage() {
    const onchage = (e) => {
        e.preventDefault();
    };

    return (
        <div className={styles.revokePermissionsPage}>
            <div className={styles.revokeContainer}>
                <SimpleMainTitle title={'Revoke permissions'} isModal={false} />
                <FindTokenForm />
            </div>
        </div>
    );
}
