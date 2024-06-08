import React, { useEffect, useState } from 'react';
import styles from '../../../../styles/sass/_createForm.module.scss';
import { MyInputType } from '../../../../types/MyInputType';
import { inputsExtension } from '../inputs/inputs';
import MyInput from '../myInput/MyInput';
import ToggleBtn from '../../../UI/toggleBtn/ToggleBtn';
import { Extensions, ExtensionsType } from '../../../../types/ExtensionsType';

const ExtensionsInputs = ({
    valuesExtensions,
    setValuesExtensions,
}: {
    valuesExtensions: ExtensionsType;
    setValuesExtensions: React.Dispatch<React.SetStateAction<ExtensionsType>>;
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

    const onChange: React.ChangeEventHandler<HTMLInputElement> | undefined = (e) => {
        setValuesExtensions({ ...valuesExtensions, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className={styles.extensionsLabelContainer}>
                <label data-title="Example: https://example.com">(Optional) Extensions</label>
                <ToggleBtn toggled={toggledExtensions} setToggled={setToggledExtensions} />
            </div>
            {toggledExtensions ? (
                <div className={styles.extensionsContainer}>
                    {inputsExtension.map((input: MyInputType) => (
                        <MyInput
                            key={input.id}
                            input={input}
                            value={valuesExtensions[input.name as keyof typeof Extensions]}
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
