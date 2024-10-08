import React, { useState } from 'react';
import MyInput from '../../myInput/MyInput';
import { imageInput } from '../../inputs/inputs';
import axios from 'axios';
import { allowsFile } from '../../../../../scripts/ts/getFilePreview';
import defaultPreview from '../../../../../svg/preview.svg';
import { ImageForUriType } from '../../../../../types/ImageForUriType';
import LoadingCircle from '../../../../UI/loadingCircle/LoadingCircle';

const InputImageUrl = ({
    setImagePreview,
    setUsedImageUrl,
    setImageForUri,
    setImageUrl,
    imageUrl,
}: {
    setImagePreview: React.Dispatch<any>;
    setUsedImageUrl: React.Dispatch<React.SetStateAction<boolean>>;
    setImageForUri: React.Dispatch<React.SetStateAction<ImageForUriType>>;
    setImageUrl: React.Dispatch<React.SetStateAction<string>>;
    imageUrl: string;
}) => {
    const [loading, setLoading] = useState(false);
    const [inputTimeout, setInputTimeout] = useState<NodeJS.Timeout>();

    const onChange: React.ChangeEventHandler<HTMLInputElement> | undefined = (e) => {
        if (inputTimeout) {
            clearTimeout(inputTimeout);
        }
        e.preventDefault();
        setImageUrl(e.target.value);
        const timeoutID = setTimeout(() => isImageUrl(e.target.value, e), 500);
        setInputTimeout(timeoutID);
    };

    const isImageUrl = async (imageUrl: string, e) => {
        setLoading(true);
        try {
            const res = await axios.get(imageUrl);
            if (res && allowsFile.includes(res.headers.getContentType())) {
                e.target.attributes.focused.value = 'false';
                setImagePreview(imageUrl);
                setImageForUri({ file: imageUrl, isUrl: true });
                setUsedImageUrl(true);
            } else {
                e.target.attributes.focused.value = 'true';
                setImagePreview(defaultPreview);
                setUsedImageUrl(false);
                setImageForUri({ file: '', isUrl: false });
            }
            setLoading(false);
        } catch (error) {
            e.target.attributes.focused.value = 'true';
            setImagePreview(defaultPreview);
            setUsedImageUrl(false);
            setImageForUri({ file: '', isUrl: false });
            setLoading(false);
        }
    };

    return (
        <>
            <div>
                <MyInput input={imageInput} value={imageUrl} onChange={onChange} />;
                {loading ? <LoadingCircle style={{ height: '20px', width: '20px' }} /> : ''}
            </div>
        </>
    );
};

export default InputImageUrl;
