import React from 'react';
import styles from '../../../styles/sass/_tags.module.scss';
import { tagsContent, tagsLabel } from './tagsContent/tagsContent';
import TagButton from './tagBtn/TagButton';

const Tags = ({ tags, setTags }: { tags: string[]; setTags: React.Dispatch<React.SetStateAction<string[]>> }) => {
    return (
        <div className={styles.tagsContainer}>
            <label data-title={tagsLabel.dataTitle} className={styles.tagsLabel}>
                {tagsLabel.label}
            </label>
            <div>
                {tagsContent.map((tag) => (
                    <TagButton key={`tag${tag.name}`} tag={tag} tags={tags} setTags={setTags}/>
                ))}
            </div>
        </div>
    );
};

export default Tags;
