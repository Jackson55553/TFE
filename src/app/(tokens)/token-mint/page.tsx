'use client';
import React, { useState } from 'react';
import styles from '../../../../styles/sass/_mint.module.scss';
import MintMainTitle from '../../../../components/UI/mainTitles/MintMainTitle/MintMainTitle';
import LoadingCircle from '../../../../components/UI/loadingCircle/LoadingCircle';
import MintForm from '../../../../components/mintPage/mintForm/MintForm';
import ValidMintContent from '../../../../components/mintPage/validContent/ValidMintContent';

export default function TokenMintPage() {
    const [loading, setLoading] = useState(false);
    const [loadingTx, setLoadingTx] = useState(false);
    const [tokenAddress, setTokenAddress] = useState('');
    const [valide, setValide] = useState(false);
    const [mintAmount, setMintAmount] = useState(1);

    const setDefault = () => {
        setTokenAddress('');
        setValide(false);
        setMintAmount(1);
    };

    return (
        <div className={styles.mintPage}>
            <div className={styles.mintContainer}>
                <MintMainTitle title={'Mint Token'} isModal={true} />
                <MintForm
                    setLoading={setLoading}
                    tokenAddress={tokenAddress}
                    setTokenAddress={setTokenAddress}
                    setValide={setValide}
                />
                {loading ? <LoadingCircle style={{ height: '50px', width: '50px' }} /> : ''}
                {valide ? (
                    <ValidMintContent
                        mintAmount={mintAmount}
                        setMintAmount={setMintAmount}
                        tokenAddress={tokenAddress}
                        loadingTx={loadingTx}
                        setLoadingTx={setLoadingTx}
                        loading={loading}
                        setDefault={setDefault}
                    />
                ) : (
                    ''
                )}
            </div>
        </div>
    );
}
