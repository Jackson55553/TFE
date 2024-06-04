'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from '../../../styles/sass/_countsOfService.module.scss';
import { getCountOfTokens, getCountOfUsers } from '../../../scripts/API/DB/getFromDatabase';

const CountsOfService = () => {
    const countupTokenRef = useRef(null);
    const countupUsersRef = useRef(null);
    let countUpAnim;
    useEffect(() => {
        getCountOfTokens().then((count) => {
            initCountUp(countupTokenRef, count);
        });
        getCountOfUsers().then((count) => {
            initCountUp(countupUsersRef, count);
        });
    }, []);

    async function initCountUp(ref: React.MutableRefObject<null>, endCount: number) {
        const countUpModule = await import('countup.js');
        countUpAnim = new countUpModule.CountUp(ref.current, endCount);
        if (!countUpAnim.error) {
            countUpAnim.start();
        } else {
            console.error(countUpAnim.error);
        }
    }
    return (
        <div className={styles.countsContainer}>
            <div className={styles.countsOfValueContainer}>
                <p ref={countupTokenRef} className={styles.counts}>
                    0
                </p>
                <p className={styles.countsOfToken}>{`Tokens created`}</p>
            </div>
            <div className={styles.countsOfValueContainer}>
                <p ref={countupUsersRef} className={styles.counts}>
                    0
                </p>
                <p className={styles.countsOfToken}>{`Users of service`}</p>
            </div>
        </div>
    );
};

export default CountsOfService;
