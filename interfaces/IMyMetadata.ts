import { Url } from 'url';
import { Extensions } from '../types/Extensions';
import { Creator } from '../types/Creator';

export interface MyMetadata {
    name: string;
    symbol: string;
    image: Url | string;
    description: string;
    extensions?: Extensions;
    tags?: string[];
    creator?: Creator;
}
