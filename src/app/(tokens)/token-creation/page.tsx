'use client';
import React from 'react';
import styles from '../../../../styles/sass/_tokens.module.scss';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import TokenMainTitle from '../../../../components/UI/mainTitles/TokenMainTitle/TokenMainTitle';
import CreateForm from '../../../../components/createPage/createForm/CreateForm';

export default function TokenCreationPage() {
    return (
        <div className={styles.tokensPage}>
            <div className={styles.walletButton}>
                <WalletMultiButton />
            </div>
            <TokenMainTitle title={'Token Create'} isModal={true} />
            <CreateForm />
        </div>
    );
}
