import { Authorities } from '../../../../types/Authorities';
import { Creator } from '../../../../types/Creator';
import { Extensions } from '../../../../types/Extensions';
import { ImageForUri } from '../../../../types/ImageForUri';
import { RequiredValues } from '../../../../types/RequiredValues';

export const defaultRequiredValues: RequiredValues = { name: '', symbol: '', supply: '', decimals: '' };
export const defaultExtensionsValues: Extensions = { website: '', twitter: '', telegram: '', discord: '' };
export const defaultCreatorValues: Creator = { name: 'Token For Ever', site: 'https://tokenforever.io' };
export const defaultAuthoritiesValues: Authorities = { update: false, freeze: false, mint: false };
export const defaultImageForUri: ImageForUri = { file: '', isUrl: false };
export const defaultDescription: string = '';
export const defaultTags: string[] = [];
