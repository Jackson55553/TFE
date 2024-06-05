import React, { useState } from 'react';
import { errorToast } from '../../../scripts/ts/myToasts';
import styles from '../../../styles/sass/_mintForm.module.scss';
;

const MintAmountInput = ({
    mintAmount,
    setMintAmount,
}: {
    setMintAmount: React.Dispatch<React.SetStateAction<number>>;
    mintAmount: number;
}) => {
    const [focused, setFocused] = useState(false);

    const showError = (message: string) => {
        errorToast(message);
    };

    const onchage = (e) => {
        setMintAmount(e.target.value);
        if (e.target.value > 0 && e.target.value < 184467440737095 && Number.isInteger(Number(e.target.value))) {
            e.target.attributes.focused.nodeValue = false;
        }
        if (e.target.value <= 0 || e.target.value > 184467440737095 || !Number.isInteger(Number(e.target.value))) {
            e.target.attributes.focused.nodeValue = true;
        }
    };

    const handleFocused = (e) => {
        console.log('focused');
        if (!e.target.value) {
            setFocused(true);
        }
        if (e.target.value <= 0 || e.target.value > 184467440737095 || !Number.isInteger(Number(e.target.value))) {
            setMintAmount(1);
        }
    };
    return (
        <div className={styles.amountContainer}>
            <label data-title={'Example: 100000000000'}>{'Token amount'}</label>
            <input
                type="number"
                name={'findTokenAccount'}
                placeholder={'Enter token amount'}
                pattern={`[0-9]{1,}`}
                className={`${styles.mintAmountInput} ${styles.focusTransition}`}
                onBlur={handleFocused}
                max={184467440737095}
                min={1}
                step={1}
                required
                focused={focused.toString()}
                value={mintAmount}
                onChange={onchage}
            />
            <span className={styles.errorMessage}>
                {mintAmount < 184467440737095 && mintAmount > 0 && Number.isInteger(mintAmount)
                    ? ''
                    : 'Amount incorrected'}
            </span>
        </div>
    );
};

export default MintAmountInput;
