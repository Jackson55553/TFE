import * as web3 from '@solana/web3.js';
import * as token from '@solana/spl-token';

export const getAccountBalance = async (
    connection: web3.Connection,
    addressMint: string,
    publicKey: web3.PublicKey | null,
) => {
    try {
        if (!publicKey) {
            throw new Error('Connect wallet');
        }
        const mint = new web3.PublicKey(addressMint);
        const tokenAccount = (await connection.getTokenAccountsByOwner(publicKey, { mint: mint })).value[0].pubkey;
        const accountInfo = await token.getAccount(connection, tokenAccount);
        const gettedMint = await token.getMint(connection, mint);
        const decimals = gettedMint.decimals;

        const tokenBalance = Number(accountInfo.amount) / Math.pow(10, decimals);
        return tokenBalance;
    } catch (error: Error) {
        return 0;
    }
};
