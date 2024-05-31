import { Dispatch, SetStateAction } from 'react';

export interface IPermission {
    id: string;
    title: string;
    description: string;
    toggled?: boolean;
    setToggled?: Dispatch<SetStateAction<boolean>>;
}
