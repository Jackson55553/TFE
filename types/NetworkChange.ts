export type NetworkChange = {
    network: SolanaNetwork;
};
export enum SolanaNetwork {
    main = process.env.NEXT_PUBLIC_MAINNET_ENDPOINT,
    dev = process.env.NEXT_PUBLIC_DEVNET_ENDPOINT,
}
