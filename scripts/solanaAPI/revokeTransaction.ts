import * as web3 from '@solana/web3.js';
import { createUpdateMetadataAccountV2Instruction, Metadata } from '@metaplex-foundation/mpl-token-metadata';
import { getAuthorityInstructions } from './getAuthorityInstruction';
import { AuthoritiesType } from '../../types/AuthoritiesType';
import { Metaplex } from '@metaplex-foundation/js';

export const getRevokeTransaction = async (
    tokenAddress: string,
    publicKey: web3.PublicKey,
    connection: web3.Connection,
    authorities: AuthoritiesType,
) => {
    try {
        const mint = new web3.PublicKey(tokenAddress);
        const metaplex = Metaplex.make(connection);
        //metadata address
        const metadataPda = metaplex.nfts().pdas().metadata({ mint: mint });
        const metadataData = await Metadata.fromAccountAddress(connection, metadataPda)
            .then((data) => {
                return data;
            })
            .catch((e) => {
                throw new Error(e.message);
            });
        const dataOnChain = {
            name: metadataData.data.name,
            symbol: metadataData.data.symbol,
            uri: metadataData.data.uri,
            sellerFeeBasisPoints: metadataData.data.sellerFeeBasisPoints,
            creators: metadataData.data.creators,
            collection: metadataData.collection,
            uses: metadataData.uses,
        };
        const isMutable = !authorities.update;
        const transaction = new web3.Transaction();
        if (authorities.update) {
            const updateIx = createUpdateMetadataAccountV2Instruction(
                { metadata: metadataPda, updateAuthority: publicKey },
                {
                    updateMetadataAccountArgsV2: {
                        data: dataOnChain,
                        isMutable: isMutable,
                        primarySaleHappened: false,
                        updateAuthority: publicKey,
                    },
                },
            );
            transaction.add(updateIx);
        }

        const authorityIxs = getAuthorityInstructions(publicKey, mint, authorities);
        if (authorityIxs.length) {
            transaction.add(...authorityIxs);
        }
        const {
            context: { slot: minContextSlot },
            value: { blockhash, lastValidBlockHeight },
        } = await connection.getLatestBlockhashAndContext();

        transaction.recentBlockhash = blockhash;
        transaction.minNonceContextSlot = minContextSlot;
        transaction.lastValidBlockHeight = lastValidBlockHeight;
        transaction.feePayer = publicKey;
        return {
            transaction,
            minContextSlot,
            blockhash,
            lastValidBlockHeight,
        };
    } catch (error) {
        return false;
    }
};
