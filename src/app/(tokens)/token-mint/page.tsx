'use client';
import React, { useState } from 'react';
import styles from '../../../../styles/sass/_mint.module.scss';
import MintMainTitle from '../../../../components/UI/mainTitles/MintMainTitle/MintMainTitle';
import { useWallet } from '@solana/wallet-adapter-react';
import LoadingCircle from '../../../../components/UI/loadingCircle/LoadingCircle';
import MintForm from '../../../../components/mintPage/mintForm/MintForm';
import 'react-toastify/dist/ReactToastify.css';
import ValidetContent from '../../../../components/mintPage/validetContent/ValidetContent';

export default function TokenMintPage() {
    const { publicKey } = useWallet();
    const [loading, setLoading] = useState(false);
    const [tokenAddress, setTokenAddress] = useState('');
    const [valide, setValide] = useState(false);
    const [mintAmount, setMintAmount] = useState(1);

    return (
        <div className={styles.mintPage}>
            <div className={styles.mintContainer}>
                <MintMainTitle title={'Mint Token'} isModal={true} />
                <MintForm
                    setLoading={setLoading}
                    tokenAddress={tokenAddress}
                    setTokenAddress={setTokenAddress}
                    valide={valide}
                    setValide={setValide}
                    mintAmount={mintAmount}
                    setMintAmount={setMintAmount}
                />
                {loading ? <LoadingCircle style={{ height: '50px', width: '50px' }} /> : ''}
            </div>
            {valide ? <ValidetContent mintAmount={mintAmount} setMintAmount={setMintAmount} /> : ''}
        </div>
    );
}
