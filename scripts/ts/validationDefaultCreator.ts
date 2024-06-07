import { defaultCreatorValues } from '../../components/createPage/createForm/defaultValues/defaultValues';
import { CreatorType } from '../../types/CreatorType';

export const validateDefaultCreator = (creator: CreatorType) => {
    if (defaultCreatorValues.name === creator.name && defaultCreatorValues.site === creator.site) {
        return true;
    } else {
        return false;
    }
};
