import React, { useState } from 'react';
import styles from '../../../styles/sass/_mintForm.module.scss';

import { FaSearch } from 'react-icons/fa';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { errorToast } from '../../../scripts/ts/myToasts';
import { isTokenAccountAddress } from '../../../scripts/solanaAPI/validateTokenAccount';

const FindTokenAccountInput = ({
    setLoading,
    setTokenAddress,
    tokenAddress,
    setValide,
    valide,
}: {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setTokenAddress: React.Dispatch<React.SetStateAction<string>>;
    setValide: React.Dispatch<React.SetStateAction<boolean>>;
    tokenAddress: string;
    valide: boolean;
}) => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const [focused, setFocused] = useState(false);
    const [inputTimeout, setInputTimeout] = useState<NodeJS.Timeout>();

    const showError = (message: string) => {
        errorToast(message);
        setLoading(false);
    };

    const onchage = (e) => {
        if (inputTimeout) {
            clearTimeout(inputTimeout);
        }
        e.preventDefault();
        setTokenAddress(e.target.value);
        const timeoutID = setTimeout(async () => {
            const validate = await isTokenAccountAddress(setLoading, e.target.value, e, publicKey, connection);
            setValide(validate);
            if (!validate) {
                console.log('!valide');
            }
        }, 500);
        setInputTimeout(timeoutID);
    };

    const handleFocused = (e) => {
        if (!e.target.value) {
            setFocused(true);
        }
    };

    const onclick = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!publicKey) {
            showError('Connect wallet');
            return;
        }
        if (!valide) {
            showError('Address incorrect');
            return;
        }
        // const authorityInfo: Authorities = await getAuthorityInfo(connection, setLoading, tokenAddress, e, publicKey);

        // if (!authorityInfo) {
        //     showError('Address incorrect');
        //     return;
        // }
        // if (!authorityInfo.freeze && !authorityInfo.mint && !authorityInfo.update) {
        //     showError('All already revoked');
        //     return;
        // }
        // setAuthorities(authorityInfo);
        setLoading(false);
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
            <button className={styles.buttonFindToken} onClick={onclick}>
                <FaSearch className={styles.searchIcon} />
            </button>
        </>
    );
};

export default FindTokenAccountInput;
