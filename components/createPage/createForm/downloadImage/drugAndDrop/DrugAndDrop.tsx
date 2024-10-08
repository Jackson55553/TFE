import Image from 'next/image';
import React, { useState } from 'react';
import styles from '../../../../../styles/sass/_downloadImage.module.scss';
import { allowsFile, getFilePreview } from '../../../../../scripts/ts/getFilePreview';
import defaultPreview from '../../../../../svg/preview.svg';
import { IoClose } from 'react-icons/io5';
import { ImageForUriType } from '../../../../../types/ImageForUriType';

const DrugAndDrop = ({
    setImageFile,
    imagePreview,
    setImagePreview,
    setUsedImageFile,
    setImageForUri,
    usedImageUrl,
}: {
    setImageFile: React.Dispatch<React.SetStateAction<File>>;
    setImagePreview: React.Dispatch<any>;
    imagePreview: any;
    setUsedImageFile: React.Dispatch<React.SetStateAction<boolean>>;
    setImageForUri: React.Dispatch<React.SetStateAction<ImageForUriType>>;
    usedImageUrl: boolean;
}) => {
    const [drag, setDrag] = useState(false);

    const dragStartHandler = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDrag(true);
    };
    const dragLeaveHandler = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDrag(false);
    };

    const dropHandler: React.DragEventHandler<HTMLDivElement> | undefined = async (e: any) => {
        e.preventDefault();
        const file = [...e.dataTransfer.files][0];
        setDrag(false);
        if (file && allowsFile.includes(file.type)) {
            getFilePreview(file, setImagePreview);
            setImageFile(file);
            setImageForUri({ file: file, isUrl: false });
            setUsedImageFile(true);
        } else {
            setImagePreview(defaultPreview);
            setUsedImageFile(false);
            setImageForUri({ file: '', isUrl: false });
        }
    };

    const clearClick: React.MouseEventHandler<HTMLButtonElement> | undefined = (e) => {
        e.preventDefault();
        setUsedImageFile(false);
        setImagePreview(defaultPreview);
        setImageFile({} as File);
        setImageForUri({ file: '', isUrl: false });
    };

    return (
        <div
            className={`${styles.drugImg}`}
            onDragStart={(e) => {
                dragStartHandler(e);
            }}
            onDragLeave={(e) => {
                dragLeaveHandler(e);
            }}
            onDragOver={(e) => {
                dragStartHandler(e);
            }}
            onDrop={(e) => {
                dropHandler(e);
            }}
        >
            <Image
                src={!imagePreview ? defaultPreview : imagePreview}
                style={{
                    borderRadius: '50px',
                    textAlign: 'center',
                    background: 'black',
                    border: 'solid 1px aqua',
                }}
                width={100}
                height={100}
                alt="image"
            ></Image>
            {!drag ? (
                <p className={imagePreview !== defaultPreview ? styles.noneBlock : ''}>DRAG PICTURE HERE</p>
            ) : (
                <p className={imagePreview !== defaultPreview ? styles.noneBlock : ''}>DROP FOR DOWNLOAD</p>
            )}
            {imagePreview !== defaultPreview && !usedImageUrl ? (
                <button className={styles.clearButton} onClick={clearClick}>
                    <IoClose />
                </button>
            ) : (
                <></>
            )}
        </div>
    );
};

export default DrugAndDrop;
