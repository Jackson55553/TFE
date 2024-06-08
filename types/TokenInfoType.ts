export type TokenInfoType = {
    name: string;
    symbol: string;
    tokenBalance?: number;
    address: string;
};
export enum TokenInfo {
    name = 'name',
    symbol = 'symbol',
    address = 'address',
}
