import * as web3 from '@solana/web3.js';
import * as token from '@solana/spl-token';
export const buildCreateTokenAccountTransaction = async (
    connection: web3.Connection,
    publickey: web3.PublicKey,
    mint: web3.PublicKey,
) => {
    const mintState = await token.getMint(connection, mint);
    console.log(mintState);
    const accountKeypair = await web3.Keypair.generate();
    const space = token.getAccountLenForMint(mintState);
    const lamports = await connection.getMinimumBalanceForRentExemption(space);
    const programId = token.TOKEN_PROGRAM_ID;

    const transaction = new web3.Transaction().add(
        web3.SystemProgram.createAccount({
            fromPubkey: publickey,
            newAccountPubkey: accountKeypair.publicKey,
            space,
            lamports,
            programId,
        }),
        token.createInitializeAccountInstruction(accountKeypair.publicKey, mint, publickey, programId),
    );

    const {
        value: { blockhash },
    } = await connection.getLatestBlockhashAndContext();

    transaction.recentBlockhash = blockhash;
    transaction.feePayer = publickey;
    transaction.partialSign(accountKeypair);

    return transaction;
};
