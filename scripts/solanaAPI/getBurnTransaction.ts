import * as web3 from '@solana/web3.js';
import * as token from '@solana/spl-token';
import { errorToast } from '../ts/myToasts';
import { getBurnPaymentInstruction, getMintPaymentInstruction } from './getPaymentInstruction';

export const getBurnTransaction = async (
    tokenAddress: string,
    tokenAccount: string,
    publicKey: web3.PublicKey,
    connection: web3.Connection,
    burnAmount: number,
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
    const tokenAcc = new web3.PublicKey(tokenAccount);
    const decimals = await token
        .getMint(connection, mint)
        .then((data) => {
            return data.decimals;
        })
        .catch((e) => {
            errorToast("Can't find mint account");
            throw new Error("Can't find mint account");
        });

    const amount = burnAmount * Math.pow(10, +decimals);

    const transaction = new web3.Transaction();
    transaction.add(
        token.createBurnInstruction(tokenAcc, mint, publicKey, amount),
        getBurnPaymentInstruction(publicKey, connection.rpcEndpoint),
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
