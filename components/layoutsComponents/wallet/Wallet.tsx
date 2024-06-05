'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { Coin98WalletAdapter, LedgerWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl, Connection } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';

export const Wallet = ({ children }: { children: React.ReactNode }) => {
    const network = WalletAdapterNetwork.Devnet;
    // You can also provide a custom RPC endpoint.
    const endpoint = 'https://solana-devnet.g.alchemy.com/v2/2SxgvOfByFJ_tmfESBQeRG9X08sFjLCl';
    // const endpoint = 'https://solana-mainnet.g.alchemy.com/v2/h9dexARnvf2uItS55M85d2REUBsTaWZN';
    // const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const wallets = useMemo(
        () => [new SolflareWalletAdapter(), new LedgerWalletAdapter(), new Coin98WalletAdapter()],
        [network],
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};
