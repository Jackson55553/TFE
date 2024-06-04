import { MyInputType } from '../../../../types/MyInputType';
import styles from '../../../styles/sass/_revokePermission.module.scss';

export const findTokenInput: MyInputType = {
    id: 'revokeFindTokenInput',
    name: 'findToken',
    type: 'search',
    placeholder: 'Enter token address',
    pattern: `[a-zA-Z0-9]{2,}`,
    required: true,
    dataTitle: 'Example: So11111111111111111111111111111111111111112',
    label: 'Token address',
    errorMessage: 'Token addressis incorrected.',
    className: `${styles.findTokenInput} ${styles.focusTransition} ${styles.urlImageInput}`,
};
