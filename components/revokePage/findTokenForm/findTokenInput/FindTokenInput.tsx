import React, { useEffect, useState } from 'react';
import styles from '../../../../styles/sass/_revokePermission.module.scss';
import { FaSearch } from 'react-icons/fa';
import { isTokenAddress } from '../../../../scripts/solanaAPI/validateTokenAddress';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { getAuthorityInfo } from '../../../../scripts/solanaAPI/getAuthorityInfo';
import { errorToast } from '../../../../scripts/ts/myToasts';
import { AuthoritiesType } from '../../../../types/AuthoritiesType';

const FindTokenInput = ({
    setLoading,
    setAuthorities,
    setTokenAddress,
    tokenAddress,
}: {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setAuthorities: React.Dispatch<React.SetStateAction<AuthoritiesType>>;
    setTokenAddress: React.Dispatch<React.SetStateAction<string>>;
    tokenAddress: string;
}) => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const [focused, setFocused] = useState(false);
    const [inputTimeout, setInputTimeout] = useState<NodeJS.Timeout>();
    const [valide, setValide] = useState(false);

    const showError = (message: string) => {
        errorToast(message);
        setAuthorities({} as AuthoritiesType);
        setLoading(false);
    };

    useEffect(() => {
        setTokenAddress('');
    }, [connection]);

    const onchage = async (e) => {
        if (inputTimeout) {
            clearTimeout(inputTimeout);
        }
        e.preventDefault();
        setTokenAddress(e.target.value);
        const timeoutID = setTimeout(async () => {
            const validate = await isTokenAddress(setLoading, e.target.value, e, publicKey, connection);
            setValide(validate);
            if (!validate) {
                setAuthorities({} as AuthoritiesType);
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
        const authorityInfo: AuthoritiesType = await getAuthorityInfo(connection, setLoading, tokenAddress, publicKey);

        if (!authorityInfo) {
            showError('Address incorrect');
            return;
        }
        if (!authorityInfo.freeze && !authorityInfo.mint && !authorityInfo.update) {
            showError('All already revoked');
            return;
        }
        setAuthorities(authorityInfo);
        setLoading(false);
    };

    return (
        <>
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
            <button className={styles.buttonFindToken} onClick={onclick}>
                <FaSearch className={styles.searchIcon} />
            </button>
        </>
    );
};

export default React.memo(FindTokenInput);
