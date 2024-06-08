import * as web3 from '@solana/web3.js';
import * as token from '@solana/spl-token';

const programId = token.TOKEN_PROGRAM_ID;

export const getCreateMintInstructions = async (
    connection: web3.Connection,
    publicKey: web3.PublicKey,
    mintKeypair: web3.Keypair,
    tokenDecimals: number,
    accountKeypair: web3.Keypair,
) => {
    const lamportsInit = await token.getMinimumBalanceForRentExemptMint(connection);

    const lamportsAcc = await connection.getMinimumBalanceForRentExemption(token.ACCOUNT_SIZE);

    const createMint = web3.SystemProgram.createAccount({
        fromPubkey: publicKey,
        newAccountPubkey: mintKeypair.publicKey,
        space: token.MINT_SIZE,
        lamports: lamportsInit,
        programId,
    });

    const initMint = token.createInitializeMint2Instruction(
        mintKeypair.publicKey,
        tokenDecimals,
        publicKey,
        publicKey,
        programId,
    );

    const createAsoocAcc = web3.SystemProgram.createAccount({
        fromPubkey: publicKey,
        newAccountPubkey: accountKeypair.publicKey,
        space: token.ACCOUNT_SIZE,
        lamports: lamportsAcc,
        programId,
    });

    const initAssocAcc = token.createInitializeAccountInstruction(
        accountKeypair.publicKey,
        mintKeypair.publicKey,
        publicKey,
        programId,
    );

    const myMintTo = token.createMintToInstruction(
        mintKeypair.publicKey,
        accountKeypair.publicKey,
        publicKey,
        1000000 * web3.LAMPORTS_PER_SOL,
    );

    return { myMintTo, createMint, initMint, createAsoocAcc, initAssocAcc };
};
