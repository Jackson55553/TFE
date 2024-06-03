'use client';
import React from 'react';
import styles from '../../../../styles/sass/_tokens.module.scss';
import CreateForm from '../../../../components/createForm/CreateForm';
import SimpleMainTitle from '../../../../components/simpleMainTitle/SimpleMainTitle';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function TokenCreationPage() {
    return (
        <div className={styles.tokensPage}>
            <div className={styles.walletButton}>
                <WalletMultiButton />
            </div>
            <SimpleMainTitle title={'Token Create'} isModal={true} />
            <CreateForm />
        </div>
    );
}
