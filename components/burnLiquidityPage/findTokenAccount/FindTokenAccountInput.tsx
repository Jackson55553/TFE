import React, { useEffect, useState } from 'react';
import styles from '../../../styles/sass/_mintForm.module.scss';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { errorToast } from '../../../scripts/ts/myToasts';
import { isAccountAddress } from '../../../scripts/solanaAPI/validateTokenAccount';
import { getAccountBalanceFromAccount } from '../../../scripts/solanaAPI/getBalance';

const FindTokenAccountInput = ({
    setLoading,
    setTokenAddress,
    tokenAccount,
    setValide,
    setTokenAccount,
    setTokenBalance,
}: {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setTokenAddress: React.Dispatch<React.SetStateAction<string>>;
    setValide: React.Dispatch<React.SetStateAction<boolean>>;
    tokenAccount: string;
    setTokenAccount: React.Dispatch<React.SetStateAction<string>>;
    setTokenBalance: React.Dispatch<React.SetStateAction<number>>;
}) => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const [focused, setFocused] = useState(false);
    const [inputTimeout, setInputTimeout] = useState<NodeJS.Timeout>();

    useEffect(() => {
        // setTokenAccount('');
        setTokenAddress('');
    }, [connection]);

    const onchage: React.ChangeEventHandler<HTMLInputElement> | undefined = (e) => {
        if (inputTimeout) {
            clearTimeout(inputTimeout);
        }
        e.preventDefault();
        setTokenAccount(e.target.value);
        const timeoutID = setTimeout(async () => {
            const validate = await isAccountAddress(
                setLoading,
                e.target.value,
                e,
                publicKey,
                connection,
                setTokenAddress,
            );
            if (!validate) {
                setValide(validate);
                setLoading(false);
                return;
            }
            if (validate) {
                getAccountBalanceFromAccount(connection, e.target.value, publicKey)
                    .then((balance) => {
                        if (balance) {
                            setTokenBalance(balance);
                            setValide(validate);
                            setLoading(false);
                        } else {
                            setTokenBalance(0);
                            setValide(false);
                            setLoading(false);
                            throw new Error('Token balance is 0');
                        }
                    })
                    .catch((e) => {
                        errorToast(e.message);
                        setValide(false);
                        setLoading(false);
                    });
            }
        }, 500);
        setInputTimeout(timeoutID);
    };

    const handleFocused: React.FocusEventHandler<HTMLInputElement> | undefined = (e) => {
        if (!e.target.value) {
            setFocused(true);
        }
    };

    return (
        <>
            <input
                type="text"
                name={'findTokenAccount'}
                placeholder={'Enter token address'}
                pattern={`[a-zA-Z0-9]{2,}`}
                className={`${styles.findTokenInput} ${styles.focusTransition}`}
                onBlur={handleFocused}
                focused={focused.toString()}
                required
                value={tokenAccount}
                onChange={onchage}
            />
        </>
    );
};

export default FindTokenAccountInput;
