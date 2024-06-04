import { INavLink } from '../interfaces/INavLinks';

export const navLinks: INavLink[] = [
    {
        name: 'TOKENS',
        sublinks: [
            { name: 'CREATE TOKEN', href: '/token-creation', isActive: true },
            { name: 'REVOKE PERMISSIONS', href: '/revoke-permissions', isActive: true },
            { name: 'BURN TOKEN', href: '/token-burn', isActive: true },
            { name: 'MINT TOKEN', href: '/token-mint', isActive: true },
            { name: 'VANITY TOKEN', href: '/vanity-token-creation', isActive: false },
        ],
        href: '/token-creation',
        isActive: true,
        isArrow: true,
    },
    {
        name: 'WALLETS',
        sublinks: [
            { name: 'BATCH WALLETS', href: '/wallet-generation', isActive: false },
            { name: 'BATCH TRANSFER', href: '/wallet-transfer', isActive: false },
            { name: 'VANITY WALLET CREATION', href: '/vanity-wallet-generation', isActive: false },
        ],
        href: '/wallet-generation',
        isActive: false,
        isArrow: true,
    },
    {
        name: 'LIQUIDITY',
        sublinks: [],
        href: '/liquidity',
        isActive: false,
        isArrow: true,
    },
    { name: 'ABOUT', href: '/about', isActive: true, isArrow: false },
];
