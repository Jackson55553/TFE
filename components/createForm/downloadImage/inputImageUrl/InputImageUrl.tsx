import React, { useEffect, useState } from 'react';
import MyInput from '../../myInput/MyInput';
import { imageInput } from '../../inputs/inputs';
import axios from 'axios';
import { allowsFile } from '../../../../scripts/ts/getFilePreview';
import defaultPreview from '../../../../svg/preview.svg';

const InputImageUrl = ({
    setImagePreview,
    setUsedImageUrl,
}: {
    setImagePreview: React.Dispatch<any>;
    setUsedImageUrl: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [imageUrl, setImageUrl] = useState('');

    const onChange = async (e: React.ChangeEventHandler<HTMLInputElement>) => {
        e.preventDefault();
        setImageUrl(e.target.value);
        isImageUrl(e.target.value, e);
    };

    // useEffect(() => {
    //     if (imageUrl === '') {
    //         return
    //     }

    // },[imageUrl])

    const isImageUrl = async (imageUrl: string, e) => {
        try {
            const res = await axios.get(imageUrl);
            if (res && allowsFile.includes(res.headers.getContentType())) {
                e.target.attributes.focused.value = 'false';
                setImagePreview(imageUrl);
                setUsedImageUrl(true);
            } else {
                e.target.attributes.focused.value = 'true';
                setImagePreview(defaultPreview);
                setUsedImageUrl(false);
            }
        } catch (error) {
            e.target.attributes.focused.value = 'true';
            setImagePreview(defaultPreview);
            setUsedImageUrl(false);
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
