'use client';
import React from 'react';
import styles from '../../../../styles/sass/_tokens.module.scss';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import TokenMainTitle from '../../../../components/UI/mainTitles/TokenMainTitle/TokenMainTitle';
import CreateForm from '../../../../components/createPage/createForm/CreateForm';
import InfoCard from '../../../../components/UI/infoCard/InfoCard';

export default function TokenCreationPage() {
    return (
        <div className={styles.tokensPage}>
            <div className={styles.walletButton}>
                <WalletMultiButton />
            </div>
            <TokenMainTitle title={'Token Create'} isModal={true} />
            <CreateForm />
            <InfoCard message="If you don't see the logo in Solana browsers, try off adblock extensions" />
        </div>
    );
}
