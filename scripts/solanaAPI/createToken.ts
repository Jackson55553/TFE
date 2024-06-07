import * as web3 from '@solana/web3.js';
import * as token from '@solana/spl-token';
import {
    createCreateMetadataAccountV3Instruction,
    createUpdateMetadataAccountV2Instruction,
} from '@metaplex-foundation/mpl-token-metadata';
import { RequiredValuesType } from '../../types/RequiredValuesType';
import { getCreatePaymentInstruction } from './getPaymentInstruction';
import { getAuthorityInstructions } from './getAuthorityInstruction';
import { AuthoritiesType } from '../../types/AuthoritiesType';

const programId = token.TOKEN_PROGRAM_ID;
const TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

export const createToken = async (
    publicKey: web3.PublicKey,
    connection: web3.Connection,
    values: RequiredValuesType,
    uri: string,
    isdefaultCreator: boolean,
    authorities: AuthoritiesType,
) => {
    const amount = +values.supply * Math.pow(10, +values.decimals);

    const mintKeypair = web3.Keypair.generate();
    const accountKeypair = web3.Keypair.generate();

    const lamportsInit = await token.getMinimumBalanceForRentExemptMint(connection);
    const lamportsAcc = await connection.getMinimumBalanceForRentExemption(token.ACCOUNT_SIZE);
    const isMutable = !authorities.update;

    const metadataData = {
        name: values.name,
        symbol: values.symbol,
        uri: uri,
        sellerFeeBasisPoints: 0,
        creators: null,
        collection: null,
        uses: null,
    };

    const metadataPDAAndBump = web3.PublicKey.findProgramAddressSync(
        [Buffer.from('metadata'), TOKEN_METADATA_PROGRAM_ID.toBuffer(), mintKeypair.publicKey.toBuffer()],
        TOKEN_METADATA_PROGRAM_ID,
    );
    const metadataPDA = metadataPDAAndBump[0];

    const transaction = new web3.Transaction().add(
        web3.SystemProgram.createAccount({
            fromPubkey: publicKey,
            newAccountPubkey: mintKeypair.publicKey,
            space: token.MINT_SIZE,
            lamports: lamportsInit,
            programId,
        }),
        token.createInitializeMint2Instruction(
            mintKeypair.publicKey,
            +values.decimals,
            publicKey,
            publicKey,
            programId,
        ),
        web3.SystemProgram.createAccount({
            fromPubkey: publicKey,
            newAccountPubkey: accountKeypair.publicKey,
            space: token.ACCOUNT_SIZE,
            lamports: lamportsAcc,
            programId,
        }),
        token.createInitializeAccountInstruction(accountKeypair.publicKey, mintKeypair.publicKey, publicKey, programId),
        createCreateMetadataAccountV3Instruction(
            {
                metadata: metadataPDA,
                mint: mintKeypair.publicKey,
                mintAuthority: publicKey,
                payer: publicKey,
                updateAuthority: publicKey,
            },
            {
                createMetadataAccountArgsV3: {
                    collectionDetails: null,
                    data: metadataData,
                    isMutable: isMutable,
                },
            },
        ),
        token.createMintToInstruction(mintKeypair.publicKey, accountKeypair.publicKey, publicKey, amount),
    );

    const authorityIxs = getAuthorityInstructions(publicKey, mintKeypair.publicKey, authorities);
    if (authorityIxs.length) {
        transaction.add(...authorityIxs);
    }

    transaction.add(getCreatePaymentInstruction(publicKey, isdefaultCreator));

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
