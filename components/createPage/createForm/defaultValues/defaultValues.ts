import { AuthoritiesType } from '../../../../types/AuthoritiesType';
import { CreatorType } from '../../../../types/CreatorType';
import { ExtensionsType } from '../../../../types/ExtensionsType';
import { ImageForUriType } from '../../../../types/ImageForUriType';
import { RequiredValuesType } from '../../../../types/RequiredValuesType';

export const defaultRequiredValues: RequiredValuesType = { name: '', symbol: '', supply: '', decimals: '' };
export const defaultExtensionsValues: ExtensionsType = { website: '', twitter: '', telegram: '', discord: '' };
export const defaultCreatorValues: CreatorType = { name: 'Token For Ever', site: 'https://tokenforever.space' };
export const defaultAuthoritiesValues: AuthoritiesType = { update: false, freeze: false, mint: false };
export const defaultImageForUri: ImageForUriType = { file: '', isUrl: false };
export const defaultDescription: string = '';
export const defaultTags: string[] = [];
