import * as web3 from '@solana/web3.js';
import * as token from '@solana/spl-token';
import { Metaplex } from '@metaplex-foundation/js';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import { errorToast } from '../ts/myToasts';
import { Authorities } from '../../types/Authorities';
export const getAuthorityInfo = async (
    connection: web3.Connection,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    address: string,
    e,
    publicKey: web3.PublicKey | null,
) => {
    const res = {} as Authorities;
    //TODO: check is users token
    try {
        if (!publicKey) {
            throw new Error('Connect wallet');
        }
        const mint = new web3.PublicKey(address);
        const metaplex = Metaplex.make(connection);
        //metadata address
        const metadataPda = metaplex.nfts().pdas().metadata({ mint: mint });
        //get mint info
        const gettedMint = await token.getMint(connection, mint);
        //return true if not null
        if (gettedMint.freezeAuthority?.toBase58() === publicKey.toBase58()) {
            res['freeze'] = true;
        } else {
            res['freeze'] = false;
        }
        //return true if not null
        if (gettedMint.mintAuthority?.toBase58() === publicKey.toBase58()) {
            res['mint'] = true;
        } else {
            res['mint'] = false;
        }
        //get metadata info
        const isUpdate = await Metadata.fromAccountAddress(connection, metadataPda)
            .then((data) => {
                //return true if not null and mutable
                if (data.updateAuthority.toBase58() === publicKey.toBase58() && data.isMutable) {
                    return true;
                } else {
                    return false;
                }
            })
            .catch((e) => errorToast(e.message));
        res['update'] = isUpdate;
        setLoading(false);
        return res;
    } catch (error: Error) {
        setLoading(false);
        return null;
    }
};
