import React, { useEffect, useState } from 'react';
import styles from '../../../../styles/sass/_downloadImage.module.scss';
import defaultPreview from '../../../../svg/preview.svg';
import InputImageUrl from './inputImageUrl/InputImageUrl';
import DrugAndDrop from './drugAndDrop/DrugAndDrop';
import ButtonDownload from './buttonDownload/ButtonDownload';
import { ImageForUriType } from '../../../../types/ImageForUriType';

const DownloadImage = ({
    imageForUri,
    setImageForUri,
    setImageUrl,
    imageUrl,
}: {
    imageForUri: ImageForUriType;
    setImageForUri: React.Dispatch<React.SetStateAction<ImageForUriType>>;
    setImageUrl: React.Dispatch<React.SetStateAction<string>>;
    imageUrl: string;
}) => {
    const [usedImageUrl, setUsedImageUrl] = useState(false);
    const [usedImageFile, setUsedImageFile] = useState(false);
    const [imageFile, setImageFile] = useState({} as File);
    const [imagePreview, setImagePreview] = useState(defaultPreview);

    useEffect(() => {
        if (imageForUri.file === '' && imageForUri.isUrl === false) {
            setImagePreview(defaultPreview);
            setUsedImageFile(false);
            setUsedImageUrl(false);
        }
    }, [imageForUri]);

    return (
        <div className={styles.imgContainer}>
            {!usedImageFile ? (
                <InputImageUrl
                    setImageUrl={setImageUrl}
                    imageUrl={imageUrl}
                    setUsedImageUrl={setUsedImageUrl}
                    setImagePreview={setImagePreview}
                    setImageForUri={setImageForUri}
                />
            ) : (
                <></>
            )}

            <DrugAndDrop
                setImageFile={setImageFile}
                setImagePreview={setImagePreview}
                setUsedImageFile={setUsedImageFile}
                setImageForUri={setImageForUri}
                imagePreview={imagePreview}
                usedImageUrl={usedImageUrl}
            />

            <ButtonDownload
                usedImageUrl={usedImageUrl}
                setImagePreview={setImagePreview}
                setImageFile={setImageFile}
                setUsedImageFile={setUsedImageFile}
                setImageForUri={setImageForUri}
            />
        </div>
    );
};

export default DownloadImage;
