import React from 'react';
import styles from '../../../../styles/sass/_createForm.module.scss';
import MyInput from '../myInput/MyInput';
import { MyInputType } from '../../../../types/MyInputType';
import { inputsRequired } from '../inputs/inputs';
import { RequiredValues } from '../../../../types/RequiredValues';

const RequiredInputs = ({
    valuesRequired,
    setValuesRequired,
}: {
    valuesRequired: RequiredValues;
    setValuesRequired: React.Dispatch<React.SetStateAction<RequiredValues>>;
}) => {
    const onChange = (e) => {
        setValuesRequired({ ...valuesRequired, [e.target.name]: e.target.value });
    };
    return (
        <div className={styles.requiredInfo}>
            {inputsRequired.map((input: MyInputType) => (
                <MyInput key={input.id} input={input} value={valuesRequired[input.name]} onChange={onChange} />
            ))}
        </div>
    );
};

export default RequiredInputs;
