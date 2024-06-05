import * as web3 from '@solana/web3.js';
import * as token from '@solana/spl-token';
import { errorToast } from '../ts/myToasts';
import { Metaplex } from '@metaplex-foundation/js';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';

export const isTokenAccountAddress = async (
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    address: string,
    e,
    publicKey: web3.PublicKey | null,
    connection: web3.Connection,
) => {
    setLoading(true);
    try {
        if (!publicKey) {
            throw new Error('Connect wallet');
        }
        const mint = new web3.PublicKey(address);
        const gettedMint = await token.getMint(connection, mint);
        console.log(gettedMint);
        if (!gettedMint.mintAuthority || gettedMint.mintAuthority?.toBase58() !== publicKey.toBase58()) {
            errorToast('Not approved for mint');
            throw new Error('Not approved for mint');
        }
        setLoading(false);
        e.target.attributes.focused.nodeValue = 'false';
        return true;
    } catch (error: Error) {
        setLoading(false);
        e.target.attributes.focused.nodeValue = 'true';
        return false;
    }
};
