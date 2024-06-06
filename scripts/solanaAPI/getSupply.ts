import * as web3 from '@solana/web3.js';
import * as token from '@solana/spl-token';

export const getSupply = async (connection: web3.Connection, address: string, publicKey: web3.PublicKey | null) => {
    try {
        if (!publicKey) {
            throw new Error('Connect wallet');
        }
        const mint = new web3.PublicKey(address);

        const gettedMint = await token.getMint(connection, mint);
        const supply = Number(gettedMint.supply) / Math.pow(10, Number(gettedMint.decimals));
        return supply;
    } catch (error: Error) {
        return 0;
    }
};
