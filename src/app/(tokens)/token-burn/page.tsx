import React from 'react';
import styles from '../../../../styles/sass/_burn.module.scss';
import BurnMainTitle from '../../../../components/UI/mainTitles/BurnMainTitle/BurnMainTitle';
export default function TokenBurnPage() {
    return (
        <div className={styles.burnPage}>
            <div className={styles.burnContainer}>
                <BurnMainTitle title={'Burn Token'} isModal={true} />
                <label data-title={'Example: So11111111111111111111111111111111111111112'}>{'Token address'}</label>
            </div>
        </div>
    );
}
