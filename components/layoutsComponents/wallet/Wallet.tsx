'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    Coin98WalletAdapter,
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import { SolanaNetwork } from '../../../types/NetworkChange';
import NetworkChangeButton from '../../UI/networkChangeButton/NetworkChangeButton';
import { infoToast } from '../../../scripts/ts/myToasts';

export const Wallet = ({ children }: { children: React.ReactNode }) => {
    const [endpoint, setEndpoint] = useState(SolanaNetwork.main);
    const [network, setNetwork] = useState(WalletAdapterNetwork.Mainnet);
    // You can also provide a custom RPC endpoint.
    // const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    useEffect(() => {
        infoToast(`Changed to ${network}`);
    }, [network]);

    const wallets = useMemo(
        () => [
            new SolflareWalletAdapter(),
            new LedgerWalletAdapter(),
            new Coin98WalletAdapter(),
            new PhantomWalletAdapter(),
        ],
        [network],
    );

    return (
        <>
            <ConnectionProvider endpoint={endpoint.toString()}>
                <WalletProvider wallets={wallets} autoConnect>
                    <WalletModalProvider>{children}</WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
            <NetworkChangeButton
                endpoint={endpoint}
                setEndpoint={setEndpoint}
                network={network}
                setNetwork={setNetwork}
            />
        </>
    );
};
