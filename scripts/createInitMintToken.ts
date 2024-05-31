import * as web3 from '@solana/web3.js';
import * as token from '@solana/spl-token';

export const createMintInitTokenTransaction = async (publicKey: web3.PublicKey, connection: web3.Connection) => {
    const mintKeypair = await web3.Keypair.generate();

    const lamports = await token.getMinimumBalanceForRentExemptMint(connection);

    const programId = token.TOKEN_PROGRAM_ID;
    const tokenDecimals = 9;

    const transaction = new web3.Transaction().add(
        web3.SystemProgram.createAccount({
            fromPubkey: publicKey,
            newAccountPubkey: mintKeypair.publicKey,
            space: token.MINT_SIZE,
            lamports: lamports,
            programId,
        }),
        token.createInitializeMint2Instruction(mintKeypair.publicKey, tokenDecimals, publicKey, publicKey, programId),
    );

    const {
        value: { blockhash },
    } = await connection.getLatestBlockhashAndContext();

    transaction.recentBlockhash = blockhash;
    transaction.feePayer = publicKey;
    transaction.partialSign(mintKeypair);

    return { transaction, mintKeypair };
};

export const getBlockhashInfo = async (connection: web3.Connection) => {
    const {
        context: { slot: minContextSlot },
        value: { blockhash, lastValidBlockHeight },
    } = await connection.getLatestBlockhashAndContext();

    return { minContextSlot, blockhash, lastValidBlockHeight };
};
