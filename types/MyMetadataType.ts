import { CreatorType } from './CreatorType';
import { ExtensionsType } from './ExtensionsType';

export type MyMetadataType = {
    name: string;
    symbol: string;
    image: string;
    description: string;
    extensions: ExtensionsType;
    tags: string[];
    creator: CreatorType;
};
