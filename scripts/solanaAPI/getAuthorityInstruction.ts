import * as web3 from '@solana/web3.js';
import * as token from '@solana/spl-token';
import { AuthoritiesType } from '../../types/AuthoritiesType';

export const getAuthorityInstructions = (
    publicKey: web3.PublicKey,
    mint: string | web3.PublicKey,
    permissions: AuthoritiesType,
) => {
    const instructions = [];
    if (typeof mint === 'string') {
        mint = new web3.PublicKey(mint);
    }
    if (permissions.freeze) {
        const freezeIx = token.createSetAuthorityInstruction(mint, publicKey, token.AuthorityType.FreezeAccount, null);
        instructions.push(freezeIx);
    }
    if (permissions.mint) {
        const mintIx = token.createSetAuthorityInstruction(mint, publicKey, token.AuthorityType.MintTokens, null);
        instructions.push(mintIx);
    }
    return instructions;
};
