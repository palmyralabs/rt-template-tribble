import { default as React } from 'react';
export interface KeyModifiers {
    ctrl?: boolean;
    alt?: boolean;
    shift?: boolean;
    meta?: boolean;
}
export declare const handlekeyPress: (callback: () => void, key: string, modifiers?: KeyModifiers) => (event: React.KeyboardEvent<HTMLDivElement> | KeyboardEvent) => void;
