import { defaultCreatorValues } from '../../components/createForm/defaultValues/defaultValues';
import { Creator } from '../../types/Creator';

export const validateDefaultCreator = (creator: Creator) => {
    if (defaultCreatorValues.name === creator.name && defaultCreatorValues.site === creator.site) {
        return true;
    } else {
        return false;
    }
};
