import * as web3 from '@solana/web3.js';
import * as token from '@solana/spl-token';
import axios from 'axios';

export const getTfePrice = async (amount: number) => {
    const dexData = await axios.get(
        'https://api.dexscreener.com/latest/dex/pairs/solana/7q2vUQSNMydVMj3sWVvAmfoH8t7AU4dAK7D47gQjkuXb',
    );
    const price = Math.floor(amount / Number(dexData.data.pair.priceNative));
    return price;
};
