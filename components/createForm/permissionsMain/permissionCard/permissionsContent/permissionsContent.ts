import { IPermission } from '../../../../../interfaces/IPermission';

export const permissions: IPermission[] = [
    {
        id: 'update',
        title: 'Revoke Update (Immutable)',
        description:
            'Renouncing ownership means you will not be able to modify the token metadata. It indeed makes investors feel more secure.',
    },
    {
        id: 'freeze',
        title: 'Revoke Freeze',
        description:
            'Revoking Freeze Authority removes control over specific account actions. SlerfTools supports markets for tokens with this authority retained.',
    },
    {
        id: 'mint',
        title: 'Revoke Mint',
        description:
            'Relinquishing minting rights is essential for investor security and token success, preventing further token supply.',
    },
];
