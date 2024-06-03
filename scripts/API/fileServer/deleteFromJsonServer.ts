import axios from 'axios';
import { errorToast } from '../../ts/myToasts';

const fileServer = axios.create({ baseURL: 'http://localhost:3006' });
export const deleteFromServer = async (uri: string) => {
    try {
        const res = await fileServer.delete('', { data: { uri: uri } });
    } catch (error) {
        errorToast("Internal server error. Can't delete uri");
    }
};
