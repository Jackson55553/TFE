import axios from 'axios';

const db = axios.create({ baseURL: 'https://tfedb.space' });

export async function writeToken(
    tokenAddress: string,
    imageUrl: string,
    uriUrl: string,
    owner: string,
    name: string,
    symbol: string,
    description: string,
    rpc: string,
) {
    const network = rpc === process.env.NEXT_PUBLIC_DEVNET_ENDPOINT ? 'devnet' : 'mainnet';
    const token = { tokenAddress, imageUrl, uriUrl, owner, name, symbol, description, network };
    const res = await db.post('/tokens', token);
    return res;
}

export async function writeUser(publicKey: string) {
    const user = { address: publicKey };
    const res = await db.post('/users', user);
    return res;
}
