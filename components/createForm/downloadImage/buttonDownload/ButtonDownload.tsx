import React, { useRef } from 'react';
import styles from '../../../../styles/sass/_downloadImage.module.scss';
import { getFilePreview } from '../../../../scripts/ts/getFilePreview';
import defaultPreview from '../../../../svg/preview.svg';
import { ImageForUri } from '../../../../types/ImageForUri';

const ButtonDownload = ({
    usedImageUrl,
    setImageFile,
    setImagePreview,
    setUsedImageFile,
    setImageForUri,
}: {
    usedImageUrl: boolean;
    setImageFile: React.Dispatch<React.SetStateAction<File>>;
    setImagePreview: React.Dispatch<any>;
    setUsedImageFile: React.Dispatch<React.SetStateAction<boolean>>;
    setImageForUri: React.Dispatch<React.SetStateAction<ImageForUri>>;
}) => {
    const inputRef = useRef({});

    const fileInputHandler = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            getFilePreview(file, setImagePreview);
            setImageForUri({ file: file, isUrl: false });
            setUsedImageFile(true);
        } else {
            setImagePreview(defaultPreview);
            setUsedImageFile(false);
            setImageForUri({ file: '', isUrl: false });
        }
    };

    return (
        <>
            <button
                className={`${usedImageUrl ? styles.noneBlock : ''} ${styles.buttonDownload}`}
                onClick={(e) => {
                    e.preventDefault();
                    inputRef.current.click();
                }}
            >
                DOWNLOAD PICTURE
            </button>
            <input
                ref={inputRef}
                type="file"
                className={styles.fileInput}
                accept="image/*,.png,.jpg,.jpeg,.gif,.svg"
                onChange={fileInputHandler}
            />
        </>
    );
};

export default ButtonDownload;
