import * as web3 from '@solana/web3.js';
import * as token from '@solana/spl-token';
import {
    createCreateMetadataAccountV3Instruction,
    createUpdateMetadataAccountV2Instruction,
} from '@metaplex-foundation/mpl-token-metadata';

export const createMintAndAccountTokenTransaction = async (publicKey: web3.PublicKey, connection: web3.Connection) => {
    const TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

    const mintKeypair = await web3.Keypair.generate();
    console.log('mint keypair created');
    console.log(mintKeypair.publicKey.toBase58());

    const accountKeypair = await web3.Keypair.generate();
    console.log('accountKeypair created');
    console.log(accountKeypair.publicKey.toBase58());

    const lamportsInit = await token.getMinimumBalanceForRentExemptMint(connection);
    console.log('lamportsInit');
    // console.log(lamportsInit);

    const lamportsAcc = await connection.getMinimumBalanceForRentExemption(token.ACCOUNT_SIZE);
    console.log('lamportsAcc');
    // console.log(lamportsAcc);

    const metadataData = {
        name: 'from con',
        symbol: 'Con',
        uri: 'https://raw.githubusercontent.com/Jackson55553/testsol/main/test10.json',
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

    console.log('metadataPDA');
    console.log(metadataPDA);
    console.log('metadataPDAAndBump');
    console.log(metadataPDAAndBump);

    const programId = token.TOKEN_PROGRAM_ID;
    const tokenDecimals = 9;

    const transaction = new web3.Transaction().add(
        web3.SystemProgram.createAccount({
            fromPubkey: publicKey,
            newAccountPubkey: mintKeypair.publicKey,
            space: token.MINT_SIZE,
            lamports: lamportsInit,
            programId,
        }),
        token.createInitializeMint2Instruction(mintKeypair.publicKey, tokenDecimals, publicKey, publicKey, programId),
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
                    isMutable: true,
                },
            },
        ),
        token.createMintToInstruction(
            mintKeypair.publicKey,
            accountKeypair.publicKey,
            publicKey,
            1000000 * web3.LAMPORTS_PER_SOL,
        ),
    );

    const {
        context: { slot: minContextSlot },
        value: { blockhash, lastValidBlockHeight },
    } = await connection.getLatestBlockhashAndContext();

    transaction.recentBlockhash = blockhash;
    transaction.minNonceContextSlot = minContextSlot;
    transaction.feePayer = publicKey;
    transaction.partialSign(...[mintKeypair, accountKeypair]);
    // transaction.partialSign(...[mintKeypair]);

    return {
        transaction,
        mintKeypair,
        accountKeypair,
        minContextSlot,
        blockhash,
        lastValidBlockHeight,
    };
};
