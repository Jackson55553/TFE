import { Url } from 'url';
import { ExtensionsType } from '../types/ExtensionsType';
import { CreatorType } from '../types/CreatorType';

export interface MyMetadata {
    name: string;
    symbol: string;
    image: Url | string;
    description: string;
    extensions?: ExtensionsType;
    tags?: string[];
    creator?: CreatorType;
}
