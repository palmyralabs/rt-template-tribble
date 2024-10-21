import { default as React } from 'react';
interface IAlertDialogProps {
    title: any;
    content: JSX.Element;
    hidden?: boolean;
    onClose?: () => void;
    mode?: 'normal' | 'info' | 'warning' | 'critical';
    buttonText?: string;
}
interface IDialog {
    hide: () => void;
    show: () => void;
}
declare const AlertDialog: React.ForwardRefExoticComponent<IAlertDialogProps & React.RefAttributes<IDialog>>;
declare const showDialog: (options: Omit<IAlertDialogProps, "hidden">, Dialog?: React.FC) => void;
declare const PyDialogRoot: () => import("react/jsx-runtime").JSX.Element;
export { AlertDialog, PyDialogRoot, showDialog };
