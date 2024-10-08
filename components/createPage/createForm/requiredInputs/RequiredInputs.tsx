import React from 'react';
import styles from '../../../../styles/sass/_createForm.module.scss';
import MyInput from '../myInput/MyInput';
import { MyInputType } from '../../../../types/MyInputType';
import { inputsRequired } from '../inputs/inputs';
import { Required, RequiredValuesType } from '../../../../types/RequiredValuesType';

const RequiredInputs = ({
    valuesRequired,
    setValuesRequired,
}: {
    valuesRequired: RequiredValuesType;
    setValuesRequired: React.Dispatch<React.SetStateAction<RequiredValuesType>>;
}) => {
    const onChange: React.ChangeEventHandler<HTMLInputElement> | undefined = (e) => {
        setValuesRequired({ ...valuesRequired, [e.target.name]: e.target.value });
    };
    return (
        <div className={styles.requiredInfo}>
            {inputsRequired.map((input: MyInputType) => (
                <MyInput
                    key={input.id}
                    input={input}
                    value={valuesRequired[input.name as keyof typeof Required]}
                    onChange={onChange}
                />
            ))}
        </div>
    );
};

export default RequiredInputs;
