import { SublinkType } from '../types/SublinksType';

export interface INavLink {
    name: string;
    sublinks?: SublinkType[];
    href: string;
    isActive: boolean;
    isArrow?: boolean;
}
