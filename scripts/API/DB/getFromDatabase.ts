import axios from 'axios';

const db = axios.create({ baseURL: 'http://tfedb.space' });

export const getCountOfTokens = async () => {
    try {
        const res = await db.get('tokens');
        return res.data;
    } catch (error) {}
};
export const getCountOfUsers = async () => {
    try {
        const res = await db.get('users');
        return res.data;
    } catch (error) {}
};
