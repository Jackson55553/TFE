import React, { useState } from 'react';
import MyInput from '../../myInput/MyInput';
import { imageInput } from '../../inputs/inputs';
import axios from 'axios';
import { allowsFile } from '../../../../scripts/ts/getFilePreview';
import defaultPreview from '../../../../svg/preview.svg';
import { ImageForUri } from '../../../../types/ImageForUri';

const InputImageUrl = ({
    setImagePreview,
    setUsedImageUrl,
    setImageForUri,
}: {
    setImagePreview: React.Dispatch<any>;
    setUsedImageUrl: React.Dispatch<React.SetStateAction<boolean>>;
    setImageForUri: React.Dispatch<React.SetStateAction<ImageForUri>>;
}) => {
    const [imageUrl, setImageUrl] = useState('');
    const [inputTimeout, setInputTimeout] = useState<NodeJS.Timeout>();

    const onChange = (e) => {
        if (inputTimeout) {
            clearTimeout(inputTimeout);
        }
        e.preventDefault();
        setImageUrl(e.target.value);
        const timeoutID = setTimeout(() => isImageUrl(e.target.value, e), 200);
        setInputTimeout(timeoutID);
    };

    const isImageUrl = async (imageUrl: string, e) => {
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
        } catch (error) {
            e.target.attributes.focused.value = 'true';
            setImagePreview(defaultPreview);
            setUsedImageUrl(false);
            setImageForUri({ file: '', isUrl: false });
        }
    };

    return (
        <>
            <div>
                <MyInput input={imageInput} value={imageUrl} onChange={onChange} />;
            </div>
        </>
    );
};

export default InputImageUrl;
