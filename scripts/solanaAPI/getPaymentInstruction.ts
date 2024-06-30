import * as web3 from '@solana/web3.js';
import * as token from '@solana/spl-token';

import process from 'process';
import { getTfePrice } from './getTfePrice';

export const getCreatePaymentInstruction = async (
    publicKey: web3.PublicKey,
    isDefault: boolean,
    endpoint: string,
    isTokenPaying: boolean,
    connection: web3.Connection,
) => {
    if (!isTokenPaying) {
        const amount = isDefault ? 0.09 : 0.49;
        let myPubKey;
        if (endpoint === process.env.NEXT_PUBLIC_DEVNET_ENDPOINT) {
            myPubKey = new web3.PublicKey(process.env.NEXT_PUBLIC_MY_PUBKEY_DEV);
        } else {
            myPubKey = new web3.PublicKey(process.env.NEXT_PUBLIC_MY_PUBKEY_MAIN);
        }
        return web3.SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: myPubKey,
            lamports: amount * web3.LAMPORTS_PER_SOL,
        });
    } else {
        const mint = new web3.PublicKey(process.env.NEXT_PUBLIC_TFE_MINT);
        const amount = isDefault ? 0.04 : 0.29;
        const myTokenAcc = new web3.PublicKey(process.env.NEXT_PUBLIC_TFE_TOKEN_ACCOUNT);
        const fromTokenAcc = await connection.getTokenAccountsByOwner(publicKey, { mint: mint });
        const fee = await getTfePrice(amount);
        return token.createTransferInstruction(
            fromTokenAcc.value[0].pubkey,
            // mint,
            myTokenAcc,
            publicKey,
            BigInt(fee * web3.LAMPORTS_PER_SOL),
            // 5,
        );
    }
};

export const getMintPaymentInstruction = (publicKey: web3.PublicKey, connection: string) => {
    const amount = 0.05;
    let myPubKey;
    if (connection === process.env.NEXT_PUBLIC_DEVNET_ENDPOINT) {
        myPubKey = new web3.PublicKey(process.env.NEXT_PUBLIC_MY_PUBKEY_DEV);
    } else {
        myPubKey = new web3.PublicKey(process.env.NEXT_PUBLIC_MY_PUBKEY_MAIN);
    }
    return web3.SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: myPubKey,
        lamports: amount * web3.LAMPORTS_PER_SOL,
    });
};

export const getBurnPaymentInstruction = (publicKey: web3.PublicKey, connection: string) => {
    const amount = 0.04;
    let myPubKey;
    if (connection === process.env.NEXT_PUBLIC_DEVNET_ENDPOINT) {
        myPubKey = new web3.PublicKey(process.env.NEXT_PUBLIC_MY_PUBKEY_DEV);
    } else {
        myPubKey = new web3.PublicKey(process.env.NEXT_PUBLIC_MY_PUBKEY_MAIN);
    }
    return web3.SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: myPubKey,
        lamports: amount * web3.LAMPORTS_PER_SOL,
    });
};
