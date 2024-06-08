import { Url } from 'url';

export type ExtensionsType = {
    website?: Url | string;
    twitter?: Url | string;
    telegram?: Url | string;
    discord?: Url | string;
};
export enum Extensions {
    website = 'website',
    twitter = 'twitter',
    telegram = 'telegram',
    discord = 'discord',
}
