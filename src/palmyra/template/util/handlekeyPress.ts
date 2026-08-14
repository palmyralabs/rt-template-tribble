import React from 'react';

export interface KeyModifiers {
    ctrl?: boolean;
    alt?: boolean;
    shift?: boolean;
    meta?: boolean;
}

export const handlekeyPress = (
    callback: () => void,
    key: string,
    modifiers: KeyModifiers = { ctrl: true }
) => {
    return (event: React.KeyboardEvent<HTMLDivElement> | KeyboardEvent) => {
        const ctrlOk  = !!modifiers.ctrl  === !!event.ctrlKey;
        const altOk   = !!modifiers.alt   === !!event.altKey;
        const shiftOk = !!modifiers.shift === !!event.shiftKey;
        const metaOk  = !!modifiers.meta  === !!event.metaKey;
        if (ctrlOk && altOk && shiftOk && metaOk
            && event.key.toLowerCase() === key.toLowerCase()) {
            event.preventDefault();
            callback();
        }
    };
};
