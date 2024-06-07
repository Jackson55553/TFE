import {
    defaultRequiredValues,
    defaultExtensionsValues,
    defaultCreatorValues,
    defaultDescription,
    defaultAuthoritiesValues,
    defaultTags,
    defaultImageForUri,
} from '../../components/createPage/createForm/defaultValues/defaultValues';
import { AuthoritiesType } from '../../types/AuthoritiesType';
import { CreatorType } from '../../types/CreatorType';
import { ExtensionsType } from '../../types/ExtensionsType';
import { ImageForUriType } from '../../types/ImageForUriType';
import { RequiredValuesType } from '../../types/RequiredValuesType';

export const setDefault = (
    setValuesRequired: React.Dispatch<React.SetStateAction<RequiredValuesType>>,
    setValuesExtensions: React.Dispatch<React.SetStateAction<ExtensionsType>>,
    setValuesCreator: React.Dispatch<React.SetStateAction<CreatorType>>,
    setDescription: React.Dispatch<React.SetStateAction<string>>,
    setAuthorities: React.Dispatch<React.SetStateAction<AuthoritiesType>>,
    setTags: React.Dispatch<React.SetStateAction<string[]>>,
    setImageForUri: React.Dispatch<React.SetStateAction<ImageForUriType>>,
    setImageUrl: React.Dispatch<React.SetStateAction<string>>,
) => {
    setValuesRequired(defaultRequiredValues);
    setValuesExtensions(defaultExtensionsValues);
    setValuesCreator(defaultCreatorValues);
    setDescription(defaultDescription);
    setAuthorities(defaultAuthoritiesValues);
    setTags(defaultTags);
    setImageForUri(defaultImageForUri);
    setImageUrl('');
};
