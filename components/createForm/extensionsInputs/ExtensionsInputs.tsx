import React, { useEffect, useState } from 'react';
import styles from '../../../styles/sass/_createForm.module.scss';
import { MyInputType } from '../../../types/MyInputType';
import { inputsExtension } from '../inputs/inputs';
import MyInput from '../myInput/MyInput';
import { ExtensionsValues } from '../../../types/ExtensionsValues';
import SwitchBtn from '../../UI/switchBtn/SwitchBtn';

const ExtensionsInputs = ({
    valuesExtensions,
    setValuesExtensions,
}: {
    valuesExtensions: ExtensionsValues;
    setValuesExtensions: React.Dispatch<React.SetStateAction<ExtensionsValues>>;
}) => {
    const [toggledExtensions, setToggledExtensions] = useState(false);

    useEffect(() => {
        clearExtensions();
    }, [toggledExtensions]);

    const clearExtensions = () => {
        if (!toggledExtensions) {
            setValuesExtensions({ ...valuesExtensions, website: '', telegram: '', twitter: '', discord: '' });
        }
    };

    const onChange = (e) => {
        setValuesExtensions({ ...valuesExtensions, [e.target.name]: e.target.value });
    };

    return (
        <>
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
                            value={valuesExtensions[input.name]}
                            onChange={onChange}
                        />
                    ))}
                </div>
            ) : (
                ''
            )}
        </>
    );
};
export default ExtensionsInputs;
