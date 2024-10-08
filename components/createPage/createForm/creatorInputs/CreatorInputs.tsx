import React, { useEffect, useState } from 'react';
import styles from '../../../../styles/sass/_createForm.module.scss';
import { Creator, CreatorType } from '../../../../types/CreatorType';
import ToggleBtn from '../../../UI/toggleBtn/ToggleBtn';
import { inputsCreator } from '../inputs/inputs';
import { MyInputType } from '../../../../types/MyInputType';
import MyInput from '../myInput/MyInput';

const CreatorInputs = ({
    valuesCreator,
    setValuesCreator,
}: {
    valuesCreator: CreatorType;
    setValuesCreator: React.Dispatch<React.SetStateAction<CreatorType>>;
}) => {
    const [toggledCreator, setToggledCreator] = useState(false);

    useEffect(() => {
        defaultCreator();
    }, [toggledCreator]);

    const defaultCreator = () => {
        if (!toggledCreator) {
            setValuesCreator({ ...valuesCreator, name: 'Token For Ever', site: 'https://tokenforever.space' });
        }
    };

    const onChange: React.ChangeEventHandler<HTMLInputElement> | undefined = (e) => {
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
                        <MyInput
                            key={input.id}
                            input={input}
                            value={valuesCreator[input.name as keyof typeof Creator]}
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

export default CreatorInputs;
