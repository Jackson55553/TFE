import React, { useEffect, useState } from 'react';
import { errorToast } from '../../../scripts/ts/myToasts';
import styles from '../../../styles/sass/_mintForm.module.scss';
const BurnAmountInput = ({
    burnAmount,
    setBurnAmount,
    tokenBalance,
}: {
    setBurnAmount: React.Dispatch<React.SetStateAction<number>>;
    burnAmount: number;
    tokenBalance: number;
}) => {
    const [focused, setFocused] = useState(false);

    useEffect(() => {
        return setBurnAmount(1);
    }, []);

    const onchage = (e) => {
        e.preventDefault();
        setBurnAmount(e.target.value);
        if (e.target.value > tokenBalance) {
            errorToast(`Amount must be less than ${tokenBalance}`);
        }
        if (e.target.value < 0) {
            setBurnAmount(0);
        }
    };

    const handleFocused = (e) => {
        if (!e.target.value) {
            setFocused(true);
        }
        if (e.target.value < 1 || e.target.value > tokenBalance || !Number.isInteger(Number(e.target.value))) {
            setBurnAmount(0);
            e.target.attributes.focused.nodeValue = true;
        }
        if (e.target.value >= 0 && e.target.value <= tokenBalance && Number.isInteger(Number(e.target.value))) {
            e.target.attributes.focused.nodeValue = false;
        }
    };
    return (
        <div className={styles.amountContainer}>
            <label data-title={'Example: 100000'}>{'Token amount'}</label>
            <input
                type="number"
                name={'tokenBurnInput'}
                placeholder={'Enter burn amount'}
                pattern={`[0-9]{1,20}`}
                className={`${styles.mintAmountInput} ${styles.focusTransition}`}
                onBlur={handleFocused}
                max={tokenBalance}
                min={1}
                step={1}
                required
                focused={focused.toString()}
                value={burnAmount}
                onChange={onchage}
            />
            <span className={styles.errorMessage}>
                {burnAmount < tokenBalance && burnAmount >= 0 && Number.isInteger(burnAmount)
                    ? ''
                    : 'Amount incorrected'}
            </span>
        </div>
    );
};

export default BurnAmountInput;
