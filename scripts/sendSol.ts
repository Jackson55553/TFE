import { useWallet } from "@solana/wallet-adapter-react";
import { Transaction, LAMPORTS_PER_SOL, SystemProgram } from "@solana/web3.js";

export const sendSol = (
    event: any,
    sendTransaction: Function,
    publickey: any,
    connection: any
) => {
    event.preventDefault();

    const recipient = event.target.value;
    const transaction = new Transaction();

    const sendSolInstruction = SystemProgram.transfer({
        fromPubkey: publickey,
        toPubkey: recipient,
        lamports: LAMPORTS_PER_SOL * 0.1,
    });

    transaction.add(sendSolInstruction);
    sendTransaction(transaction, connection)
        .then((sig: string) => console.log(sig))
        .catch((e: Error) => console.log(e.message));
};
