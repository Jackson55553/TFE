import React, { useEffect, useState } from 'react';
import styles from '../../../styles/sass/_createForm.module.scss';
import { CreatorValues } from '../../../types/CreatorValues';
import ToggleBtn from '../../UI/toggleBtn/ToggleBtn';
import { inputsCreator } from '../inputs/inputs';
import { MyInputType } from '../../../types/MyInputType';
import MyInput from '../myInput/MyInput';

const CreatorInputs = ({
    valuesCreator,
    setValuesCreator,
}: {
    valuesCreator: CreatorValues;
    setValuesCreator: React.Dispatch<React.SetStateAction<CreatorValues>>;
}) => {
    const [toggledCreator, setToggledCreator] = useState(false);

    useEffect(() => {
        defaultCreator();
    }, [toggledCreator]);

    const defaultCreator = () => {
        if (!toggledCreator) {
            setValuesCreator({ ...valuesCreator, name: 'Token For Ever', site: 'https://tokenforever.io' });
        }
    };

    const onChange = (e) => {
        setValuesCreator({ ...valuesCreator, [e.target.name]: e.target.value });
    };
    return (
        <>
            <div className={styles.extensionsLabelContainer}>
                <label data-title="Additional fees: 0.4 SOL">(Optional) Creator Info</label>
                <ToggleBtn toggled={toggledCreator} setToggled={setToggledCreator} />
            </div>
            {toggledCreator ? (
                <div className={styles.extensionsContainer}>
                    {inputsCreator.map((input: MyInputType) => (
                        <MyInput key={input.id} input={input} value={valuesCreator[input.name]} onChange={onChange} />
                    ))}
                </div>
            ) : (
                ''
            )}
        </>
    );
};

export default CreatorInputs;
