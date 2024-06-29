import * as web3 from '@solana/web3.js';
import * as token from '@solana/spl-token';
import { Metaplex } from '@metaplex-foundation/js';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';

export const getAccountBalanceFromAcc = async (connection: web3.Connection, accountAddress: string) => {
    try {
        const acc = new web3.PublicKey(accountAddress);
        if (!accountAddress) {
            throw new Error('Connect wallet');
        }
        const balance = await connection.getTokenAccountBalance(acc);
        return balance.value.uiAmount;
    } catch (error) {
        return 0;
    }
};

export const getAccountBalanceFromMint = async (
    connection: web3.Connection,
    mintAddress: string,
    publicKey: web3.PublicKey | null,
) => {
    try {
        if (!publicKey) {
            throw new Error('Connect wallet');
        }
        const mint = new web3.PublicKey(mintAddress);
        if (!mint) {
            throw new Error('Connect wallet');
        }
        const acc = await connection.getTokenAccountsByOwner(publicKey, { mint: mint });
        const balance = await connection.getTokenAccountBalance(acc.value[0].pubkey);
        return balance.value.uiAmount;
    } catch (error) {
        console.log(e.message);
        return 0;
    }
};
