import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { getKeypair } from './tokenCreatre';
import {
    createSignerFromKeypair,
    generateSigner,
    keypairIdentity,
    percentAmount,
    signerIdentity,
    some,
} from '@metaplex-foundation/umi';
import { createFungible } from '@metaplex-foundation/mpl-token-metadata';

// Use the RPC endpoint of your choice.
const umi = createUmi('https://solana-devnet.g.alchemy.com/v2/2SxgvOfByFJ_tmfESBQeRG9X08sFjLCl').use(
    mplTokenMetadata(),
);

const myKeypair = umi.eddsa.createKeypairFromSecretKey(getKeypair().secretKey);
// console.log(myKeypair);
const myKeypairSigner = createSignerFromKeypair(umi, myKeypair);
// console.log(myKeypairSigner);
umi.use(signerIdentity(myKeypairSigner));
const test = async () => {
    const mint = generateSigner(umi);
    console.log(mint.publicKey);
    const sign = await createFungible(umi, {
        mint,
        name: 'test',
        uri: 'https://raw.githubusercontent.com/Jackson55553/testsol/main/test4.json',
        sellerFeeBasisPoints: percentAmount(0),
        decimals: some(9), // for 0 decimals use some(0)
    }).sendAndConfirm(umi);
    console.log('sign');
    console.log(sign);
    const trans = await umi.rpc.getTransaction(sign.signature);
    console.log('trans');
    console.log(trans);
};

test();

// const myMetadata: TokenMetadata = {
//     mint: mintKeypair.publicKey,
//     name: "some re",
//     symbol: "soer",
//     uri: "https://raw.githubusercontent.com/Jackson55553/testsol/main/testsol2.json",
//     additionalMetadata: [["description", "Only Possible On Solana"]],
// };
