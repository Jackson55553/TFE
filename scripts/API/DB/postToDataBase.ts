import axios from 'axios';

const db = axios.create({ baseURL: 'https://localhost:5000' });

export async function writeToken(
    tokenAddress: string,
    imageUrl: string,
    uriUrl: string,
    owner: string,
    name: string,
    symbol: string,
    description: string,
) {
    const token = { tokenAddress, imageUrl, uriUrl, owner, name, symbol, description };
    const res = await db.post('/tokens', token);
    return res;
}
