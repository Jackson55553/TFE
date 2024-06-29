import * as web3 from '@solana/web3.js';
import * as token from '@solana/spl-token';
import { errorToast } from '../ts/myToasts';
import { Metaplex } from '@metaplex-foundation/js';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';

export const isTokenMintAddress = async (
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    address: string,
    e,
    publicKey: web3.PublicKey | null,
    connection: web3.Connection,
    setTokenAccount: React.Dispatch<React.SetStateAction<string>>,
) => {
    setLoading(true);
    try {
        if (!publicKey) {
            throw new Error('Connect wallet');
        }
        const mint = new web3.PublicKey(address);
        if (!mint) {
            throw new Error('Not found token mint');
        }
        await connection
            .getTokenAccountsByOwner(publicKey, { mint: mint })
            .then((data) => {
                if (!data.value.length) {
                    throw new Error('Not found mint address');
                }
                setTokenAccount(data.value[0].pubkey.toString());
            })
            .catch((e) => {
                setTokenAccount('');
                throw new Error('Not found mint address');
            });
        e.target.attributes.focused.nodeValue = 'false';
        return true;
    } catch (error: Error) {
        errorToast(error.message);
        setLoading(false);
        e.target.attributes.focused.nodeValue = 'true';
        return false;
    }
};

export const isAccountAddress = async (
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    address: string,
    e,
    publicKey: web3.PublicKey | null,
    connection: web3.Connection,
    setTokenAddress: React.Dispatch<React.SetStateAction<string>>,
) => {
    setLoading(true);
    try {
        if (!publicKey) {
            throw new Error('Connect wallet');
        }
        const tokenAcc = new web3.PublicKey(address);
        if (!tokenAcc) {
            throw new Error('Not found token account');
        }
        await token
            .getAccount(connection, tokenAcc)
            .then((data) => {
                if (!data) {
                    throw new Error('Not found token account');
                }
                setTokenAddress(data.mint.toString());
            })
            .catch((e) => {
                setTokenAddress('');
                throw new Error('Not found token account');
            });
        e.target.attributes.focused.nodeValue = 'false';
        return true;
    } catch (error: Error) {
        errorToast(error.message);
        setLoading(false);
        e.target.attributes.focused.nodeValue = 'true';
        return false;
    }
};
