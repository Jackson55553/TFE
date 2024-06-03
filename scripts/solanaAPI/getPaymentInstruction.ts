import * as web3 from '@solana/web3.js';
import process from 'process';

export const getPaymentInstruction = (publicKey: web3.PublicKey, isDefault: boolean) => {
    const amount = isDefault ? 0.09 : 0.49;
    const myPubKey = new web3.PublicKey(process.env.NEXT_PUBLIC_MY_PUBKEY);
    return web3.SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: myPubKey,
        lamports: amount * web3.LAMPORTS_PER_SOL,
    });
};
