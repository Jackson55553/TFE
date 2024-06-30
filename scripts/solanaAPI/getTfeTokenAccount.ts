import * as web3 from '@solana/web3.js';
import * as token from '@solana/spl-token';

export const isTfeAccount = async (connection: web3.Connection, publicKey: web3.PublicKey | null) => {
    if (!publicKey) {
        return false;
    }
    const mint = new web3.PublicKey(process.env.NEXT_PUBLIC_TFE_MINT);
    const acc = await connection.getTokenAccountsByOwner(publicKey, { mint: mint });
    if (acc.value[0]) {
        return true;
    }
    return false;
};
