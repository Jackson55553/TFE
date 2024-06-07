import { ExtensionsType } from '../../types/ExtensionsType';
import { CreatorType } from '../../types/CreatorType';
import { MyMetadataType } from '../../types/MyMetadataType';
import { postImageToServer } from '../API/fileServer/postToJsonServer';
import { errorToast } from './myToasts';

export function createMetadataWithUrl(
    name: string,
    symbol: string,
    image: string,
    description: string,
    extensions: ExtensionsType,
    tags: string[],
    creator: CreatorType,
): MyMetadataType {
    const metadata = {} as MyMetadataType;
    metadata.name = name;
    metadata.symbol = symbol;
    metadata.image = image;
    metadata.description = description;
    addExtensions(extensions, metadata);
    metadata.tags = tags;
    metadata.creator = creator;
    return metadata;
}

export async function createMetadataWithFile(
    name: string,
    symbol: string,
    image: File,
    description: string,
    extensions: ExtensionsType,
    tags: string[],
    creator: CreatorType,
): Promise<MyMetadataType> {
    const metadata = {} as MyMetadataType;
    try {
        const imageUrl = await postImageToServer(image);
        metadata.name = name;
        metadata.symbol = symbol;
        metadata.image = imageUrl;
        metadata.description = description;
        addExtensions(extensions, metadata);
        metadata.tags = tags;
        metadata.creator = creator;
        return metadata;
    } catch (error) {
        console.log(error);
        errorToast("Internal server error. Can't save file");
    }
}

const addExtensions = (extensions: ExtensionsType, metadata: MyMetadataType) => {
    if (extensions.website.length) {
        metadata.extensions = { ...metadata.extensions, website: extensions.website };
    }
    if (extensions.twitter.length) {
        metadata.extensions = { ...metadata.extensions, twitter: extensions.twitter };
    }
    if (extensions.telegram.length) {
        metadata.extensions = { ...metadata.extensions, telegram: extensions.telegram };
    }
    if (extensions.discord.length) {
        metadata.extensions = { ...metadata.extensions, discord: extensions.discord };
    }
    if (
        !extensions.discord.length &&
        !extensions.telegram.length &&
        !extensions.twitter.length &&
        !extensions.website.length
    ) {
        metadata.extensions = {};
    }
};
