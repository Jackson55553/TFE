import * as web3 from '@solana/web3.js';
import * as token from '@solana/spl-token';
import { Metaplex } from '@metaplex-foundation/js';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import { errorToast } from '../ts/myToasts';
import { AuthoritiesType } from '../../types/AuthoritiesType';
export const getTokenMetadata = async (connection: web3.Connection, address: string) => {
    try {
        const mint = new web3.PublicKey(address);
        //get mint info
        const gettedMint = await token.getMint(connection, mint);

        const metaplex = Metaplex.make(connection);
        //metadata address
        const metadataPda = metaplex.nfts().pdas().metadata({ mint: mint });
        //get metadata info
        const metadata = await Metadata.fromAccountAddress(connection, metadataPda);
        return { mintInfo: gettedMint, metadataInfo: metadata };
    } catch (error: Error) {
        return null;
    }
};
