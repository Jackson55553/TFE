import React, { useEffect, useState } from 'react';
import styles from '../../../../styles/sass/_tags.module.scss';

const TagButton = ({
    tag,
    tags,
    setTags,
}: {
    tag: { name: string };
    tags: string[];
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        if (!tags.length) {
            setClicked(false);
        }
    }, [tags]);

    const addRemoveTag = (e) => {
        !clicked ? addTag(e) : removeTag(e);
    };

    const addTag = (e) => {
        if (tags.includes(e.target.innerHTML)) {
            return;
        } else {
            console.log('added ' + e.target.innerHTML);
            setTags((prev) => [...prev, e.target.innerHTML]);
        }
    };
    const removeTag = (e) => {
        setTags((prev) => prev.filter((tag) => tag !== e.target.innerHTML));
    };

    const onclick = (e) => {
        e.preventDefault();
        setClicked(!clicked);
        addRemoveTag(e);
    };
    return (
        <button className={` ${clicked ? styles.clickedTagButton : styles.tagButton}`} onClick={onclick}>
            {tag.name}
        </button>
    );
};

export default TagButton;
