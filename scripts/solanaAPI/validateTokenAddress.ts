import * as web3 from '@solana/web3.js';
import { errorToast } from '../ts/myToasts';
import * as token from '@solana/spl-token';

export const isTokenAddress = async (
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
        const gettedMint = await token.getMint(connection, mint).catch((e) => {
            throw new Error('Token address incorrect');
        });
        setLoading(false);
        e.target.attributes.focused.nodeValue = 'false';
        return true;
    } catch (error: Error) {
        errorToast(error.message);
        setLoading(false);
        e.target.attributes.focused.nodeValue = 'true';
        return false;
    }
};

export const isTokenMintAddress = async (
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    address: string,
    e,
    publicKey: web3.PublicKey | null,
    connection: web3.Connection,
) => {
    setLoading(true);
    try {
        if (!publicKey) {
            errorToast('Connect wallet');
            throw new Error('Connect wallet');
        }
        const mint = new web3.PublicKey(address);
        const gettedMint = await token.getMint(connection, mint);
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
