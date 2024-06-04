import * as web3 from '@solana/web3.js';
import * as token from '@solana/spl-token';
import { Metaplex } from '@metaplex-foundation/js';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
export const isTokenAddress = async (
    connection: web3.Connection,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    address: string,
) => {
    setLoading(true);
    try {
        const mint = new web3.PublicKey(address);
        const metaplex = Metaplex.make(connection);
        const metadataPda = metaplex.nfts().pdas().metadata({ mint: mint });
        console.log(metadataPda);
        const gettedMint = await token.getMint(connection, mint);
        console.log(gettedMint.freezeAuthority);
        console.log(gettedMint.mintAuthority);
        Metadata.fromAccountAddress(connection, metadataPda)
            .then((data) => console.log(data))
            .catch((e) => console.log(e));
        setLoading(false);
    } catch (error) {
        setLoading(false);
        console.log(error);
    }
};
