import React from 'react';
import { BsChevronCompactDown } from 'react-icons/bs';
import { useInView } from 'react-intersection-observer';
import styles from '../../../../styles/sass/_roadmap.module.scss';
const RoadmapArrow = () => {
    const { ref, inView } = useInView({
        threshold: 0.5,
        triggerOnce: true,
        delay: 500,
    });
    return (
        <div ref={ref} className={`${styles.roadmapArrowContainer} `}>
            <BsChevronCompactDown
                className={`${styles.roadmapArrow} ${inView ? styles.arrowVisible : styles.arrowHidden}`}
            />
        </div>
    );
};

export default RoadmapArrow;
