import { ReactNode } from 'react';
import { IconType } from 'react-icons';

export interface IDefaultButtonProps {
    text: ReactNode;
    type?: 'submit' | 'reset' | 'button' | undefined;
    newClass?: string;
    action: () => void;
}
