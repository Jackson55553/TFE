import { Sublink } from '../types/Sublinks';

export interface INavLink {
    name: string;
    sublinks?: Sublink[];
    href: string;
    isActive: boolean;
    isArrow?: boolean;
}
