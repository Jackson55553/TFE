"use client";

import { useCallback, useEffect, useState } from "react";

import { sendSol } from "../../scripts/sendSol";
import styles from "../../styles/home.module.css";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import * as web3 from "@solana/web3.js";
import * as token from "@solana/spl-token";

import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import Link from "next/link";

export default function App() {
    const [isClient, setIsClient] = useState(false);

    const { connection } = useConnection();

    const { publicKey, sendTransaction, signTransaction } = useWallet();

    const [loaded, setLoaded] = useState(false);

    const [sign, setSign] = useState("");

    useEffect(() => {
        setIsClient(true);
    }, []);

    const onclick = useCallback(async () => {
        if (!publicKey) throw new WalletNotConnectedError();

        // 890880 lamports as of 2022-09-01
        const mintKeypair = await web3.Keypair.generate();

        const lamports = await token.getMinimumBalanceForRentExemptMint(
            connection
        );

        const programId = token.TOKEN_PROGRAM_ID;
        const tokenDecimals = 9;

        const transaction = new web3.Transaction().add(
            web3.SystemProgram.createAccount({
                fromPubkey: publicKey,
                newAccountPubkey: mintKeypair.publicKey,
                space: token.MINT_SIZE,
                lamports: lamports,
                programId: token.TOKEN_PROGRAM_ID,
            }),
            token.createInitializeMint2Instruction(
                mintKeypair.publicKey,
                tokenDecimals,
                publicKey,
                publicKey,
                token.TOKEN_PROGRAM_ID
            )
        );

        const {
            context: { slot: minContextSlot },

            value: { blockhash, lastValidBlockHeight },
        } = await connection.getLatestBlockhashAndContext();

        transaction.recentBlockhash = blockhash;
        transaction.feePayer = publicKey;
        transaction.partialSign(mintKeypair);

        console.log("simple transaction");
        console.log(transaction);

        // const signedTransaction = await signTransaction(transaction);

        // console.log("signed transaction");
        // console.log(signedTransaction);

        const signature = await sendTransaction(transaction, connection, {
            minContextSlot,
        });
        console.log("after send " + signature);

        await connection
            .confirmTransaction({
                blockhash,
                lastValidBlockHeight,
                signature,
            })
            .then(() => {
                setSign(signature);
                setLoaded(true);
            })
            .catch((e) => {
                e.message;
            });
    }, [publicKey, sendTransaction, connection]);

    return (
        <div className={styles.app}>
            {isClient ? <WalletMultiButton /> : ""}
            <button className={styles.btn} onClick={onclick}>
                CREATE TOKEN
            </button>
            <h1>Hello App</h1>{" "}
            <div className={`${styles.modal} ${loaded ? styles.visible : ""}`}>
                <Link
                    className={styles.link}
                    href={`https://explorer.solana.com/tx/${sign}?cluster=devnet`}
                    target="_blank"
                >{`CHECK ON https://explorer.solana.com/tx/${sign}?cluster=devnet`}</Link>
            </div>
        </div>
    );
}
