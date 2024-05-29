'use client';
import React, { useState } from 'react';
import styles from '../../styles/sass/_createForm.module.scss';
import DownloadImage from './downloadImage/DownloadImage';
import RequiredInputs from './requiredInputs/RequiredInputs';
import DescriprionTextArea from './descriptionTextArea/DescriprionTextArea';
import ExtensionsInputs from './extensionsInputs/ExtensionsInputs';
import CreatorInputs from './creatorInputs/CreatorInputs';
import { ImageForUri } from '../../types/ImageForUri';
import { ExtensionsValues } from '../../types/ExtensionsValues';
import { RequiredValues } from '../../types/RequiredValues';

const CreateForm = () => {
    const [valuesRequired, setValuesRequired] = useState({
        name: '',
        symbol: '',
        supply: '',
        decimals: '',
    } as RequiredValues);

    const [valuesExtensions, setValuesExtensions] = useState({
        website: '',
        twitter: '',
        telegram: '',
        discord: '',
    } as ExtensionsValues);

    const [valuesCreator, setValuesCreator] = useState({
        name: 'Token For Ever',
        site: 'https://tokenforever.io',
    });

    const [description, setDescription] = useState('');

    const [imageForUri, setImageForUri] = useState({
        file: '',
        isUrl: false,
    } as ImageForUri);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(valuesRequired);
        console.log(valuesExtensions);
        console.log(valuesCreator);
        console.log(description);
        console.log(imageForUri);
    };

    return (
        <div className={styles.formContainer}>
            <form noValidate onSubmit={handleSubmit}>
                <RequiredInputs valuesRequired={valuesRequired} setValuesRequired={setValuesRequired} />
                <DescriprionTextArea description={description} setDescription={setDescription} />
                <ExtensionsInputs valuesExtensions={valuesExtensions} setValuesExtensions={setValuesExtensions} />
                <CreatorInputs valuesCreator={valuesCreator} setValuesCreator={setValuesCreator} />
                <DownloadImage setImageForUri={setImageForUri} />
                <button type="submit" style={{ height: '50px' }}></button>
            </form>
        </div>
    );
};

export default CreateForm;
