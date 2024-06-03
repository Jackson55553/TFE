import React, { useState } from 'react';
import styles from '../../../styles/sass/_createForm.module.scss';
import { MyInputType } from '../../../types/MyInputType';

const MyInput = ({ input, value, onChange }: { input: MyInputType; value: string; onChange: (e: any) => void }) => {
    const [focused, setFocused] = useState(false);
    const handleFocused = (e) => {
        if (e.target.id === 'inputImage' && !e.target.value) {
            setFocused(true);
        }
        if (e.target.id !== 'inputImage') {
            setFocused(true);
        }
    };
    return (
        <div className={styles.requiredElement}>
            {input.label?.length ? <label data-title={input.dataTitle}>{input.label}</label> : ''}
            <input
                name={input.name}
                type={input.type}
                id={input.id}
                placeholder={input.placeholder}
                className={input.className}
                maxLength={input.maxLength}
                min={input.min}
                max={input.max}
                step={input.step}
                pattern={input.pattern}
                value={value}
                onChange={onChange}
                required={input.required}
                onBlur={handleFocused}
                focused={focused.toString()}
            />
            {input.errorMessage ? <span className={styles.errorMessage}>{input.errorMessage}</span> : ''}
        </div>
    );
};

export default MyInput;
