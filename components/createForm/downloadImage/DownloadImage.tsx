import React, { useState } from 'react';
import styles from '../../../styles/sass/_downloadImage.module.scss';
import defaultPreview from '../../../svg/preview.svg';
import InputImageUrl from './inputImageUrl/InputImageUrl';
import DrugAndDrop from './drugAndDrop/DrugAndDrop';
import ButtonDownload from './buttonDownload/ButtonDownload';
import { ImageForUri } from '../../../types/ImageForUri';

const DownloadImage = ({ setImageForUri }: { setImageForUri: React.Dispatch<React.SetStateAction<ImageForUri>> }) => {
    const [usedImageUrl, setUsedImageUrl] = useState(false);
    const [usedImageFile, setUsedImageFile] = useState(false);
    const [imageFile, setImageFile] = useState({} as File);
    const [imagePreview, setImagePreview] = useState(defaultPreview);

    return (
        <div className={styles.imgContainer}>
            {!usedImageFile ? (
                <InputImageUrl
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
            {/* add Loadfor button */}
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
