import * as web3 from '@solana/web3.js';
import * as token from '@solana/spl-token';
import {
    createCreateMetadataAccountV3Instruction,
    createUpdateMetadataAccountV2Instruction,
} from '@metaplex-foundation/mpl-token-metadata';
import { RequiredValues } from '../../types/RequiredValues';
import { getPaymentInstruction } from './getPaymentInstruction';
import { getAuthorityInstructions } from './getAuthorityInstruction';
import { Authorities } from '../../types/Authorities';

const programId = token.TOKEN_PROGRAM_ID;
const TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

export const getRevokeTransaction = async (
    publicKey: web3.PublicKey,
    connection: web3.Connection,
    authorities: Authorities,
) => {
    const isMutable = !authorities.update;

    const transaction = new web3.Transaction();

    const authorityIxs = getAuthorityInstructions(publicKey, mintKeypair.publicKey, authorities);
    if (authorityIxs.length) {
        transaction.add(...authorityIxs);
    }

    transaction.add(getPaymentInstruction(publicKey, isdefaultCreator));

    const {
        context: { slot: minContextSlot },
        value: { blockhash, lastValidBlockHeight },
    } = await connection.getLatestBlockhashAndContext();

    transaction.recentBlockhash = blockhash;
    transaction.minNonceContextSlot = minContextSlot;
    transaction.lastValidBlockHeight = lastValidBlockHeight;
    transaction.feePayer = publicKey;
    transaction.partialSign(...[mintKeypair, accountKeypair]);

    return {
        transaction,
        mintKeypair,
        accountKeypair,
        minContextSlot,
        blockhash,
        lastValidBlockHeight,
    };
};
