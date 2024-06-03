import * as web3 from '@solana/web3.js';
import * as token from '@solana/spl-token';
import { getKeypair } from './tokenCreatre';
import { createMintAndAccountTokenTransaction } from './createMintAndAccountToken';
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

const connection = new web3.Connection('https://api.devnet.solana.com', 'confirmed');

const payer = getKeypair();

const createToken = async () => {
    const { transaction, mintKeypair } = await createMintAndAccountTokenTransaction(payer.publicKey, connection);

    console.log('completed and signed transaction');
    // console.log(transaction);

    const signature = await web3.sendAndConfirmTransaction(connection, transaction, [payer, mintKeypair]);

    console.log(`Transaction signature is ${signature}`);
    return mintKeypair;
};

const createMeta = async () => {
    const mintKeypair = await web3.Keypair.generate();
    console.log('mint keypair created');
    console.log(mintKeypair.publicKey.toBase58());

    const myMetadata: TokenMetadata = {
        mint: mintKeypair.publicKey,
        name: 'some re',
        symbol: 'soer',
        uri: 'https://raw.githubusercontent.com/Jackson55553/testsol/main/testsol2.json',
        additionalMetadata: [['description', 'Only Possible On Solana']],
    };

    // Size of MetadataExtension 2 bytes for type, 2 bytes for length
    const metadataExtension = TYPE_SIZE + LENGTH_SIZE;
    // Size of metadata
    const metadataLen = pack(myMetadata).length;

    // Size of Mint Account with extension
    const mintLen = getMintLen([ExtensionType.MetadataPointer]);

    // Minimum lamports required for Mint Account
    const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataExtension + metadataLen);
    // Instruction to invoke System Program to create new account
    const createAccountInstruction = SystemProgram.createAccount({
        fromPubkey: payer.publicKey, // Account that will transfer lamports to created account
        newAccountPubkey: mintKeypair.publicKey, // Address of the account to create
        space: mintLen, // Amount of bytes to allocate to the created account
        lamports, // Amount of lamports transferred to created account
        programId: TOKEN_2022_PROGRAM_ID, // Program assigned as owner of created account
    });

    // Instruction to initialize the MetadataPointer Extension
    const initializeMetadataPointerInstruction = createInitializeMetadataPointerInstruction(
        mintKeypair.publicKey, // Mint Account address
        payer.publicKey, // Authority that can set the metadata address
        mintKeypair.publicKey, // Account address that holds the metadata
        token.TOKEN_2022_PROGRAM_ID,
    );

    // Instruction to initialize Mint Account data
    const initializeMintInstruction = createInitializeMintInstruction(
        mintKeypair.publicKey, // Mint Account Address
        9, // Decimals of Mint
        payer.publicKey, // Designated Mint Authority
        null, // Optional Freeze Authority
        TOKEN_2022_PROGRAM_ID, // Token Extension Program ID
    );

    // Instruction to initialize Metadata Account data
    const initializeMetadataInstruction = createInitializeInstruction({
        programId: token.TOKEN_2022_PROGRAM_ID, // Token Extension Program as Metadata Program
        metadata: mintKeypair.publicKey, // Account address that holds the metadata
        updateAuthority: payer.publicKey, // Authority that can update the metadata
        mint: mintKeypair.publicKey, // Mint Account address
        mintAuthority: payer.publicKey, // Designated Mint Authority
        name: myMetadata.name,
        symbol: myMetadata.symbol,
        uri: myMetadata.uri,
    });

    // Instruction to update metadata, adding custom field
    const updateFieldInstruction = createUpdateFieldInstruction({
        programId: TOKEN_2022_PROGRAM_ID, // Token Extension Program as Metadata Program
        metadata: mintKeypair.publicKey, // Account address that holds the metadata
        updateAuthority: payer.publicKey, // Authority that can update the metadata
        field: myMetadata.additionalMetadata[0][0], // key
        value: myMetadata.additionalMetadata[0][1], // value
    });

    // Add instructions to new transaction
    const transaction = new Transaction().add(
        createAccountInstruction,
        initializeMetadataPointerInstruction,
        initializeMintInstruction,
        initializeMetadataInstruction,
        updateFieldInstruction,
    );

    // Send transaction
    const transactionSignature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [payer, mintKeypair], // Signers
    );

    console.log('\nCreate Mint Account:', `https://solana.fm/tx/${transactionSignature}?cluster=devnet-solana`);

    // Retrieve mint information
    const mintInfo = await getMint(connection, mintKeypair.publicKey, 'confirmed', TOKEN_2022_PROGRAM_ID);

    // Retrieve and log the metadata pointer state
    const metadataPointer = getMetadataPointerState(mintInfo);
    console.log('\nMetadata Pointer:', JSON.stringify(metadataPointer, null, 2));

    // Retrieve and log the metadata state
    const metadata = await getTokenMetadata(
        connection,
        mintKeypair.publicKey, // Mint Account address
    );
    console.log('\nMetadata:', JSON.stringify(myMetadata, null, 2));
};

const run = async () => {
    // const mintKeypair = await createToken();
    await createMeta();
};
run();
