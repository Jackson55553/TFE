import React, { useState } from 'react';
import styles from '../../../styles/sass/_mintForm.module.scss';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { isTokenMintAddress } from '../../../scripts/solanaAPI/validateTokenAddress';

const FindTokenMintInput = ({
    setLoading,
    setTokenAddress,
    tokenAddress,
    setValide,
}: {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setTokenAddress: React.Dispatch<React.SetStateAction<string>>;
    setValide: React.Dispatch<React.SetStateAction<boolean>>;
    tokenAddress: string;
}) => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const [focused, setFocused] = useState(false);
    const [inputTimeout, setInputTimeout] = useState<NodeJS.Timeout>();

    const onchage: React.ChangeEventHandler<HTMLInputElement> | undefined = (e) => {
        if (inputTimeout) {
            clearTimeout(inputTimeout);
        }
        e.preventDefault();
        setTokenAddress(e.target.value);
        const timeoutID = setTimeout(async () => {
            const validate = await isTokenMintAddress(setLoading, e.target.value, e, publicKey, connection);
            setValide(validate);
        }, 500);
        setInputTimeout(timeoutID);
    };

    const handleFocused = (e) => {
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
                value={tokenAddress}
                onChange={onchage}
            />
        </>
    );
};

export default FindTokenMintInput;
