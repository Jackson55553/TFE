import { Creator } from '../../types/Creator';
import { Extensions } from '../../types/Extensions';
import { MyMetadata } from '../../types/MyMetadata';
import { postImageToServer } from '../API/fileServer/postToJsonServer';
import { errorToast } from './myToasts';

export function createMetadataWithUrl(
    name: string,
    symbol: string,
    image: string,
    description: string,
    extensions: Extensions,
    tags: string[],
    creator: Creator,
): MyMetadata {
    const metadata = {} as MyMetadata;
    metadata.name = name;
    metadata.symbol = symbol;
    metadata.image = image;
    metadata.description = description;
    metadata.extensions = extensions;
    metadata.tags = tags;
    metadata.creator = creator;
    return metadata;
}

export async function createMetadataWithFile(
    name: string,
    symbol: string,
    image: File,
    description: string,
    extensions: Extensions,
    tags: string[],
    creator: Creator,
): Promise<MyMetadata | string> {
    const metadata = {} as MyMetadata;
    try {
        const imageUrl = await postImageToServer(image);
        metadata.name = name;
        metadata.symbol = symbol;
        metadata.image = imageUrl;
        metadata.description = description;
        metadata.extensions = extensions;
        metadata.tags = tags;
        metadata.creator = creator;

        return metadata;
    } catch (error) {
        errorToast("Internal server error. Can't write file");
    }
}
