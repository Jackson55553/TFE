'use client';
import React, { useState } from 'react';
import styles from '../../styles/sass/_revokePermission.module.scss';
import { FaSearch } from 'react-icons/fa';
import { isTokenAddress } from '../../scripts/solanaAPI/validateTokenAddress';
import { useConnection } from '@solana/wallet-adapter-react';
import LoadingCircle from '../UI/loadingCircle/LoadingCircle';
const FindTokenForm = () => {
    const { connection } = useConnection();
    const [loading, setLoading] = useState(false);
    const [focused, setFocused] = useState(false);
    const [inputTimeout, setInputTimeout] = useState<NodeJS.Timeout>();
    const [tokenAddress, setTokenAddress] = useState('');

    const onchage = (e) => {
        if (inputTimeout) {
            clearTimeout(inputTimeout);
        }
        e.preventDefault();
        setTokenAddress(e.target.value);
        const timeoutID = setTimeout(() => isTokenAddress(connection, setLoading, e.target.value), 500);
        console.log(timeoutID);
        setInputTimeout(timeoutID);
    };

    const handleFocused = (e) => {
        setFocused(true);
    };
    return (
        <div className={styles.revokeFormContainer}>
            <label data-title={'Example: So11111111111111111111111111111111111111112'}>{'Token address'}</label>
            <form onSubmit={(e) => e.preventDefault()} className={styles.revokeForm} noValidate>
                <input
                    type="text"
                    name={'findToken'}
                    placeholder={'Enter token address'}
                    pattern={`[a-zA-Z0-9]{2,}`}
                    className={`${styles.findTokenInput} ${styles.focusTransition}`}
                    onBlur={handleFocused}
                    focused={focused.toString()}
                    required
                    value={tokenAddress}
                    onChange={onchage}
                />
                <button className={styles.buttonFindToken} type="submit">
                    <FaSearch />
                </button>
                <span className={styles.errorMessage}>{'Token address incorrected'}</span>
            </form>
            {loading ? <LoadingCircle /> : ''}
        </div>
    );
};

export default FindTokenForm;
