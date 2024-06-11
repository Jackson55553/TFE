import axios from 'axios';
import { errorToast } from '../../ts/myToasts';

const fileServer = axios.create({ baseURL: 'https://tfefiles.space' });
export const deleteFromServer = async (uri: string) => {
    try {
        const res = await fileServer.delete('', { data: { uri: uri } });
    } catch (error) {
        errorToast("Internal server error. Can't delete uri");
    }
};
