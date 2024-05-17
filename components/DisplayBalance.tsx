"use client";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { FC, useEffect, useState } from "react";

import React from "react";

const DisplayBalance: FC = () => {
    const [balance, setBalance] = useState(0);
    const { connection } = useConnection();
    const { publicKey } = useWallet();

    useEffect(() => {
        if (!connection || !publicKey) {
            return;
        }

        connection.onAccountChange(
            publicKey,
            (accInfo) => {
                setBalance(accInfo.lamports / LAMPORTS_PER_SOL);
            },
            "confirmed"
        );

        connection.getAccountInfo(publicKey).then((info) => {
            setBalance(info ? info.lamports / LAMPORTS_PER_SOL : 0);
        });
    }, [connection, publicKey]);
    return <div>balance: {publicKey ? balance : 0}</div>;
};

export default DisplayBalance;
