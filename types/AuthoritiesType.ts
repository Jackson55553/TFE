export type AuthoritiesType = {
    update: boolean;
    freeze: boolean;
    mint: boolean;
};
export enum Authorities {
    update = 'update',
    freeze = 'freeze',
    mint = 'mint',
}
