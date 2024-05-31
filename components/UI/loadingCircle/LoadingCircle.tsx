import React from 'react';
import styles from '../../../styles/sass/_loadingCircle.module.scss';
import { BiLoaderCircle } from 'react-icons/bi';

const LoadingCircle = ({ style }: { style?: React.CSSProperties | undefined }) => {
    return <BiLoaderCircle style={style} className={styles.loader} />;
};

export default LoadingCircle;
