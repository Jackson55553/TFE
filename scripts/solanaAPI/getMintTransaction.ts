import * as web3 from '@solana/web3.js';
import * as token from '@solana/spl-token';
import { errorToast } from '../ts/myToasts';
import { getMintPaymentInstruction } from './getPaymentInstruction';

export const getMintTransaction = async (
    tokenAddress: string,
    publicKey: web3.PublicKey,
    connection: web3.Connection,
    mintAmount: number,
) => {
    if (!publicKey) {
        errorToast('Connect wallet');
        return;
    }
    if (!connection) {
        errorToast('Connection failed');
        return;
    }
    const mint = new web3.PublicKey(tokenAddress);

    const decimals = await token
        .getMint(connection, mint)
        .then((data) => {
            return data.decimals;
        })
        .catch((e) => {
            errorToast("Can't find mint account");
            throw new Error("Can't find mint account");
        });

    const amount = mintAmount * Math.pow(10, +decimals);

    const tokenAcc = await connection
        .getTokenAccountsByOwner(publicKey, { mint: mint })
        .then((data) => {
            return data.value[0].pubkey;
        })
        .catch((e) => {
            errorToast('Associated Account not found');
            throw new Error('Associated Account not found');
        });

    const transaction = new web3.Transaction();
    transaction.add(
        token.createMintToInstruction(mint, tokenAcc, publicKey, amount),
        getMintPaymentInstruction(publicKey, connection.rpcEndpoint),
    );
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
};
