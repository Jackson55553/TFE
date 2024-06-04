import * as web3 from '@solana/web3.js';
import { errorToast } from '../ts/myToasts';

export const isTokenAddress = (
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    address: string,
    e,
    publicKey: web3.PublicKey | null,
) => {
    setLoading(true);
    try {
        if (!publicKey) {
            throw new Error('Connect wallet');
        }
        const mint = new web3.PublicKey(address);
        setLoading(false);
        e.target.attributes.focused.nodeValue = 'false';
        return true;
    } catch (error: Error) {
        setLoading(false);
        e.target.attributes.focused.nodeValue = 'true';
        return false;
    }
};
