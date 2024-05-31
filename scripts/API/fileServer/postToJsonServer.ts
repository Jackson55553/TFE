import { MyMetadata } from '../../../types/MyMetadata';
import axios from 'axios';
import { errorToast } from '../../ts/myToasts';

const fileServer = axios.create({ baseURL: 'http://localhost:3006' });

export const postImageToServer = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
        const res = await fileServer.post('/image', formData);
        return res.data;
    } catch (error) {
        errorToast("Internal server error. Can't write file");
    }
};
export const postImageAndMetaToServer = async (file: File, meta: object) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('body', JSON.stringify(meta));
    try {
        const res = await fileServer.post('/fulluri', formData);
        return res.data;
    } catch (error) {
        errorToast("Internal server error. Can't write file or uri");
    }
};
export const postMetaToServer = async (metadata: MyMetadata) => {
    try {
        const res = await fileServer.post('/uri', metadata);
        return res.data;
    } catch (error) {
        errorToast("Internal server error. Can't write uri");
    }
};
