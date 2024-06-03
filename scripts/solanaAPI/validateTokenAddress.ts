import * as web3 from '@solana/web3.js';
import * as token from '@solana/spl-token';
import { Metaplex } from '@metaplex-foundation/js';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
export const isTokenAddress = (
    connection: web3.Connection,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    setLoading(true);
    try {
        const address = new web3.PublicKey('A1Lirq6gU3AgjDowg9m9LavBU9o7h3xzVYCdnqkHJ3nQ');
        // const connection = new web3.Connection('https://api.devnet.solana.com');
        const metaplex = Metaplex.make(connection);
        const metadataPda = metaplex.nfts().pdas().metadata({ mint: address });
        console.log(metadataPda);
        Metadata.fromAccountAddress(connection, metadataPda)
            .then((data) => console.log(data.data.name))
            .catch((e) => console.log(e));
    } catch (error) {}
};
