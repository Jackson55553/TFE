'use client';
import React from 'react';
import styles from '../../../styles/sass/_roadmap.module.scss';
import { stages } from './stages/stagesContent';
import RoadmapCard from './roadmapCard/RoadmapCard';
import RoadmapArrow from './roadmapArrow/RoadmapArrow';

const Roadmap = () => {
    return (
        <>
            <h2 className={styles.roadmapTitle}>ROADMAP</h2>
            <div className={styles.roadmapContainer}>
                {stages.map((stage, i, arr) => (
                    <div key={stage.id}>
                        <RoadmapCard stage={stage} />
                        {arr.length - 1 !== i ? <RoadmapArrow /> : <></>}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Roadmap;
