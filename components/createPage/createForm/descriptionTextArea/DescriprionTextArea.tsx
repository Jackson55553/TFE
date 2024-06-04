import React from 'react';
import styles from '../../../../styles/sass/_createForm.module.scss';

const DescriprionTextArea = ({
    description,
    setDescription,
}: {
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const onChange = (e) => {
        setDescription(e.target.value);
    };
    return (
        <>
            <label data-title="Example: Best token in the world">(Optional) Description</label>
            <textarea
                id="description"
                placeholder="Enter description"
                className={`${styles.mainTokenInput}`}
                value={description}
                onChange={onChange}
            />
        </>
    );
};

export default DescriprionTextArea;
