import React, { FC, useCallback, useState } from 'react';
import styles from '../styles/formContainer.module.css';
import { createMintAndAccountTokenTransaction } from './createMintAndAccountToken';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { SignPropsType } from '../types/SignPropsType';

const FormContainer = ({ setLoaded, setSign }: SignPropsType) => {
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [decimals, setDecimals] = useState('');
    const [supply, setSupply] = useState('');
    const defaultInput = '';

    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const onclickCreate = useCallback(async () => {
        if (!publicKey) throw new WalletNotConnectedError();

        const { transaction, minContextSlot, blockhash, lastValidBlockHeight } =
            await createMintAndAccountTokenTransaction(publicKey, connection);
        console.log(transaction);

        try {
            const signature = await sendTransaction(transaction, connection, {
                minContextSlot,
            });
            await connection
                .confirmTransaction({ blockhash, lastValidBlockHeight, signature })
                .then(() => {
                    setSign(signature);
                    setLoaded(true);
                })
                .catch((e) => {
                    console.log(e);
                });
        } catch (error) {
            console.log(error);
        }
    }, [publicKey, sendTransaction, connection]);

    return (
        <form
            className={styles.formContainer}
            onSubmit={(e) => {
                e.preventDefault();
                onclickCreate();
                console.log(e.target);
            }}
        >
            <div className={styles.inputContainer}>
                <label className={styles.label} htmlFor="">
                    name
                </label>
                <input
                    className={styles.input}
                    type="text"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <label className={styles.label} htmlFor="">
                    symbol
                </label>
                <input
                    className={styles.input}
                    type="text"
                    value={symbol}
                    onChange={(e) => {
                        setSymbol(e.target.value);
                    }}
                />
                <label className={styles.label} htmlFor="">
                    decimals
                </label>
                <input
                    className={styles.input}
                    type="number"
                    value={decimals}
                    max={9}
                    maxLength={1}
                    min={0}
                    required
                    onChange={(e) => {
                        setDecimals(e.target.value);
                    }}
                />
                <label className={styles.label} htmlFor="">
                    supply
                </label>
                <input
                    className={styles.input}
                    type="number"
                    value={supply}
                    max={14999999999999}
                    min={0}
                    required
                    onChange={(e) => {
                        setSupply(e.target.value);
                    }}
                />
            </div>
        </form>
    );
};

export default FormContainer;
