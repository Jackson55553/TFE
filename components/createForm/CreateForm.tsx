'use client';
import React, { useCallback, useEffect, useState } from 'react';
import styles from '../../styles/sass/_createForm.module.scss';

import { inputsCreator, inputsExtension, inputsRequired } from './inputs/inputs';
import MyInput from './myInput/MyInput';
import SwitchBtn from '../UI/switchBtn/SwitchBtn';
import { MyInputType } from '../../types/MyInputType';
import DownloadImage from './downloadImage/DownloadImage';

const CreateForm = () => {
    const [valuesRequired, setValuesRequired] = useState({
        name: '',
        symbol: '',
        supply: '',
        decimals: '',
    });
    const [valuesExtensions, setValuesExtensions] = useState({
        website: '',
        twitter: '',
        telegram: '',
        discord: '',
    });

    const [valuesCreator, setValuesCreator] = useState({
        name: 'Token For Ever',
        site: 'https://tokenforever.io',
    });

    const [toggledExtensions, setToggledExtensions] = useState(false);
    const [toggledCreator, setToggledCreator] = useState(false);

    useEffect(() => {
        clearExtensions();
    }, [toggledExtensions]);

    useEffect(() => {
        defaultCreator();
    }, [toggledCreator]);

    const clearExtensions = () => {
        if (!toggledExtensions) {
            setValuesExtensions({ ...valuesExtensions, website: '', telegram: '', twitter: '', discord: '' });
        }
    };
    const defaultCreator = () => {
        if (!toggledCreator) {
            setValuesCreator({ ...valuesCreator, name: 'Token For Ever', site: 'https://tokenforever.io' });
        }
    };

    const onChange = (e, values, setValues) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(valuesRequired);
        console.log(valuesExtensions);
        console.log(valuesCreator);
    };
    return (
        <div className={styles.formContainer}>
            <form noValidate onSubmit={handleSubmit}>
                <div className={styles.requiredInfo}>
                    {inputsRequired.map((input: MyInputType) => (
                        <MyInput
                            key={input.id}
                            input={input}
                            value={valuesRequired[input.name]}
                            onChange={(e) => {
                                onChange(e, valuesRequired, setValuesRequired);
                            }}
                        />
                    ))}
                </div>
                <label data-title="Example: Best token in the world">(Optional) Description</label>
                <textarea id="description" placeholder="Enter description" className={`${styles.mainTokenInput}`} />
                <div className={styles.extensionsLabelContainer}>
                    <label data-title="Example: https://example.com">(Optional) Extensions</label>
                    <SwitchBtn toggled={toggledExtensions} setToggled={setToggledExtensions} />
                </div>
                {toggledExtensions ? (
                    <div className={styles.extensionsContainer}>
                        {inputsExtension.map((input: MyInputType) => (
                            <MyInput
                                key={input.id}
                                input={input}
                                value={valuesCreator[input.name]}
                                onChange={(e) => onChange(e, valuesExtensions, setValuesExtensions)}
                            />
                        ))}
                    </div>
                ) : (
                    ''
                )}
                <div className={styles.extensionsLabelContainer}>
                    <label data-title="Additional fees: 0.4 SOL">(Optional) Creator Info</label>
                    <SwitchBtn toggled={toggledCreator} setToggled={setToggledCreator} />
                </div>
                {toggledCreator ? (
                    <div className={styles.extensionsContainer}>
                        {inputsCreator.map((input: MyInputType) => (
                            <MyInput
                                key={input.id}
                                input={input}
                                value={valuesCreator[input.name]}
                                onChange={(e) => onChange(e, valuesCreator, setValuesCreator)}
                            />
                        ))}
                    </div>
                ) : (
                    ''
                )}
                <DownloadImage />
                <button type="submit" style={{ height: '50px' }}></button>
            </form>
        </div>
    );
};

export default CreateForm;
