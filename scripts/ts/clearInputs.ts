import {
    defaultRequiredValues,
    defaultExtensionsValues,
    defaultCreatorValues,
    defaultDescription,
    defaultAuthoritiesValues,
    defaultTags,
    defaultImageForUri,
} from '../../components/createPage/createForm/defaultValues/defaultValues';
import { Authorities } from '../../types/Authorities';
import { Creator } from '../../types/Creator';
import { Extensions } from '../../types/Extensions';
import { ImageForUri } from '../../types/ImageForUri';
import { RequiredValues } from '../../types/RequiredValues';

export const setDefault = (
    setValuesRequired: React.Dispatch<React.SetStateAction<RequiredValues>>,
    setValuesExtensions: React.Dispatch<React.SetStateAction<Extensions>>,
    setValuesCreator: React.Dispatch<React.SetStateAction<Creator>>,
    setDescription: React.Dispatch<React.SetStateAction<string>>,
    setAuthorities: React.Dispatch<React.SetStateAction<Authorities>>,
    setTags: React.Dispatch<React.SetStateAction<string[]>>,
    setImageForUri: React.Dispatch<React.SetStateAction<ImageForUri>>,
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
