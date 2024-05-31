import { Creator } from './Creator';
import { Extensions } from './Extensions';

export type MyMetadata = {
    name: string;
    symbol: string;
    image: string;
    description: string;
    extensions: Extensions;
    tags: string[];
    creator: Creator;
};
