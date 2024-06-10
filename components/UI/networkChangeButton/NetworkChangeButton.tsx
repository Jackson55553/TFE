'use client';
import React from 'react';
import styles from '../../../styles/sass/_networkButton.module.scss';
import { SolanaNetwork } from '../../../types/NetworkChange';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { usePathname } from 'next/navigation';

const NetworkChangeButton = ({
    endpoint,
    setEndpoint,
    network,
    setNetwork,
}: {
    endpoint: SolanaNetwork;
    setEndpoint: React.Dispatch<React.SetStateAction<SolanaNetwork>>;
    network: WalletAdapterNetwork;
    setNetwork: React.Dispatch<React.SetStateAction<WalletAdapterNetwork>>;
}) => {
    const pathname = usePathname();
    const onclick: React.MouseEventHandler<HTMLButtonElement> | undefined = (e) => {
        e.preventDefault();
        endpoint === SolanaNetwork.dev ? setEndpoint(SolanaNetwork.main) : setEndpoint(SolanaNetwork.dev);
        network === WalletAdapterNetwork.Devnet
            ? setNetwork(WalletAdapterNetwork.Mainnet)
            : setNetwork(WalletAdapterNetwork.Devnet);
    };
    return (
        <button
            style={pathname === '/' || pathname === '/about' ? { display: 'none' } : { display: 'block' }}
            className={styles.networkButton}
            onClick={onclick}
        >
            {endpoint === SolanaNetwork.dev ? <p>{'D'}</p> : <p>{'M'}</p>}
        </button>
    );
};

export default NetworkChangeButton;
