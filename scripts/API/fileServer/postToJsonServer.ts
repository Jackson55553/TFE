import { MyMetadataType } from '../../../types/MyMetadataType';
import axios from 'axios';
import { errorToast, successToast } from '../../ts/myToasts';

const fileServer = axios.create({ baseURL: 'http://localhost:3006' });

export const postImageToServer = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
        const res = await fileServer.post('/image', formData);
        successToast('Image successfully saved');
        return res.data;
    } catch (error) {
        errorToast("Internal server error. Can't save image");
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
        errorToast("Internal server error. Can't save file or uri");
    }
};
export const postMetaToServer = async (metadata: MyMetadataType) => {
    try {
        const res = await fileServer.post('/uri', metadata);
        successToast('Metadata successfully saved');
        return res.data;
    } catch (error) {
        errorToast("Internal server error. Can't save uri");
    }
};
