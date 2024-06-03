import * as web3 from '@solana/web3.js';
import * as token from '@solana/spl-token';
import { getKeypair } from './tokenCreatre';
import {
    Connection,
    Keypair,
    SystemProgram,
    Transaction,
    clusterApiUrl,
    sendAndConfirmTransaction,
} from '@solana/web3.js';
import {
    ExtensionType,
    TOKEN_2022_PROGRAM_ID,
    createInitializeMintInstruction,
    getMintLen,
    createInitializeMetadataPointerInstruction,
    getMint,
    getMetadataPointerState,
    getTokenMetadata,
    TYPE_SIZE,
    LENGTH_SIZE,
} from '@solana/spl-token';
import {
    createInitializeInstruction,
    createUpdateFieldInstruction,
    createRemoveKeyInstruction,
    pack,
    TokenMetadata,
} from '@solana/spl-token-metadata';
import { createCreateMetadataAccountV3Instruction } from '@metaplex-foundation/mpl-token-metadata';

const payer = getKeypair();
const connection = new web3.Connection('https://api.devnet.solana.com', 'confirmed');

const createMintAndAccountTokenTransaction = async () => {
    const TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

    const mintKeypair = await web3.Keypair.generate();
    console.log('mint keypair created');
    console.log(mintKeypair.publicKey.toBase58());

    const accountKeypair = await web3.Keypair.generate();
    console.log('accountKeypair created');
    console.log(accountKeypair.publicKey.toBase58());

    const metadataPK = await web3.Keypair.generate();
    console.log('metadataPK created');
    console.log(metadataPK.publicKey.toBase58());

    const lamportsInit = await token.getMinimumBalanceForRentExemptMint(connection);
    console.log('lamportsInit');
    // console.log(lamportsInit);

    const lamportsAcc = await connection.getMinimumBalanceForRentExemption(token.ACCOUNT_SIZE);
    console.log('lamportsAcc');
    // console.log(lamportsAcc);

    const programId = token.TOKEN_PROGRAM_ID;
    const tokenDecimals = 9;

    // const metaData: TokenMetadata = {
    //     updateAuthority: payer.publicKey,
    //     mint: mintKeypair.publicKey,
    //     name: "OPOS",
    //     symbol: "OPOS",
    //     uri: "https://raw.githubusercontent.com/Jackson55553/testsol/main/test3.json",
    //     additionalMetadata: [["description", "Only Possible On Solana"]],
    // };

    const metadataData = {
        name: 'My token',
        symbol: 'FIRST',
        uri: 'https://raw.githubusercontent.com/Jackson55553/testsol/main/test5.json',
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
    // const metadataExtension = TYPE_SIZE + LENGTH_SIZE;
    // const metadataLen = pack(metaData).length;
    // const mintLen = getMintLen([ExtensionType.MetadataPointer]);
    // const lamportsMeta = await connection.getMinimumBalanceForRentExemption(
    //     mintLen + metadataExtension + metadataLen
    // );

    const transaction = new web3.Transaction().add(
        web3.SystemProgram.createAccount({
            fromPubkey: payer.publicKey,
            newAccountPubkey: mintKeypair.publicKey,
            space: token.MINT_SIZE,
            lamports: lamportsInit,
            programId,
        }),
        token.createInitializeMint2Instruction(
            mintKeypair.publicKey,
            tokenDecimals,
            payer.publicKey,
            payer.publicKey,
            programId,
        ),
        web3.SystemProgram.createAccount({
            fromPubkey: payer.publicKey,
            newAccountPubkey: accountKeypair.publicKey,
            space: token.ACCOUNT_SIZE,
            lamports: lamportsAcc,
            programId,
        }),
        token.createInitializeAccountInstruction(
            accountKeypair.publicKey,
            mintKeypair.publicKey,
            payer.publicKey,
            programId,
        ),
        createCreateMetadataAccountV3Instruction(
            {
                metadata: metadataPDA,
                mint: mintKeypair.publicKey,
                mintAuthority: payer.publicKey,
                payer: payer.publicKey,
                updateAuthority: payer.publicKey,
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
            payer.publicKey,
            1000000 * web3.LAMPORTS_PER_SOL,
        ),
        // web3.SystemProgram.createAccount({
        //     fromPubkey: payer.publicKey, // Account that will transfer lamports to created account
        //     newAccountPubkey: metadataPK.publicKey, // Address of the account to create
        //     space: mintLen, // Amount of bytes to allocate to the created account
        //     lamports: lamportsMeta, // Amount of lamports transferred to created account
        //     programId: programId, // Program assigned as owner of created account
        // })
    );

    const {
        context: { slot: minContextSlot },
        value: { blockhash, lastValidBlockHeight },
    } = await connection.getLatestBlockhashAndContext();

    transaction.recentBlockhash = blockhash;
    transaction.minNonceContextSlot = minContextSlot;
    transaction.feePayer = payer.publicKey;
    transaction.partialSign(...[mintKeypair, accountKeypair]);

    const signature = await web3.sendAndConfirmTransaction(connection, transaction, [
        payer,
        mintKeypair,
        accountKeypair,
    ]);
    console.log(signature);
};
createMintAndAccountTokenTransaction();
