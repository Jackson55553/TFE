'use client';
import React from 'react';
import styles from '../../../styles/sass/_roadmapCard.module.scss';
import { useInView } from 'react-intersection-observer';
import { Stage } from '../../../types/Stage';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const RoadmapCard = ({ stage }: { stage: Stage }) => {
    const { ref, inView } = useInView({
        threshold: 0.9,
        triggerOnce: true,
    });

    return (
        <article ref={ref} className={`${styles.roadmapCardContainer} ${inView ? styles.visible : styles.hidden}`}>
            <p>
                STAGE {stage.id}
                {stage.isFinished ? <AiOutlineCheckCircle className={styles.stageIcon} /> : ''}
            </p>
            <p>{stage.description}</p>
        </article>
    );
};

export default RoadmapCard;
