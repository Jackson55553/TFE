import React, { useEffect, useRef, useState } from 'react';
import styles from '../../../styles/sass/_downloadImage.module.scss';
import defaultPreview from '../../../svg/preview.svg';
import InputImageUrl from './inputImageUrl/InputImageUrl';
import DrugAndDrop from './drugAndDrop/DrugAndDrop';
import ButtonDownload from './buttonDownload/ButtonDownload';

const DownloadImage = () => {
    const [usedImageUrl, setUsedImageUrl] = useState(false);
    const [usedImageFile, setUsedImageFile] = useState(false);
    const [imageFile, setImageFile] = useState({} as File);
    const [imagePreview, setImagePreview] = useState(defaultPreview);

    return (
        <div className={styles.imgContainer}>
            {!usedImageFile ? (
                <InputImageUrl setUsedImageUrl={setUsedImageUrl} setImagePreview={setImagePreview} />
            ) : (
                <></>
            )}

            <DrugAndDrop
                setImageFile={setImageFile}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
                setUsedImageFile={setUsedImageFile}
            />
            <ButtonDownload
                usedImageUrl={usedImageUrl}
                setImagePreview={setImagePreview}
                setImageFile={setImageFile}
                setUsedImageFile={setUsedImageFile}
            />

        </div>
    );
};

export default DownloadImage;
