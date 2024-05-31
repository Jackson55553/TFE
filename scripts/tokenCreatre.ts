import * as web3 from '@solana/web3.js';
import * as token from '@solana/spl-token';
import fs from 'fs';
import bs58 from 'bs58';

const connect = new web3.Connection('https://api.devnet.solana.com', 'confirmed');

// Take keypair from file
export function getKeypair() {
    const sk = fs.readFileSync('./TFEogD9PjbPpkMiAPMiDkRvFc8bzsba8aEJPkwthDov.json');

    const arr = sk
        .toString('utf-8')
        .substring(1, sk.length - 1)
        .split(',')
        .map((el) => +el);

    const u8arr = Uint8Array.from(arr);

    const keypair = web3.Keypair.fromSecretKey(u8arr);
    return keypair;
}

export async function createAccount() {
    const connection = new web3.Connection('https://api.devnet.solana.com', 'confirmed');
    const myPublicKey = await getKeypair();

    const mintKeypair = await web3.Keypair.generate();

    const lamports = await token.getMinimumBalanceForRentExemptMint(connection);

    const programId = token.TOKEN_PROGRAM_ID;

    const tokenDecimals = 9;

    const createNewTokenTransaction = new web3.Transaction().add(
        web3.SystemProgram.createAccount({
            fromPubkey: myPublicKey.publicKey,
            newAccountPubkey: mintKeypair.publicKey,
            space: token.MINT_SIZE,
            lamports: lamports,
            programId: token.TOKEN_PROGRAM_ID,
        }),
        token.createInitializeMint2Instruction(
            mintKeypair.publicKey,
            tokenDecimals,
            myPublicKey.publicKey,
            myPublicKey.publicKey,
            token.TOKEN_PROGRAM_ID,
        ),
    );

    // const latestBlockhash = await connection.getLatestBlockhash();
    // createNewTokenTransaction.feePayer = myPublicKey;
    // createNewTokenTransaction.recentBlockhash = latestBlockhash.blockhash;

    // return createNewTokenTransaction;

    // send from my wallet
    console.log(createNewTokenTransaction);
    await web3
        .sendAndConfirmTransaction(connection, createNewTokenTransaction, [myPublicKey, mintKeypair], undefined)
        .then((mes) => console.log(mes))
        .catch((e) => console.log(e.message));
}

// createAccount();
