import { FC } from 'react';
import { IOptions } from '../Types';
interface IDialogGridFormInput {
    options: IOptions;
    EditFormlet: FC;
    NewFormlet: FC;
    gridRef: any;
    title?: any;
    idKey?: string;
    dialogHeight?: string;
    dialogWidth?: string;
    dialogMinWidth?: string;
    enableSaveVariants?: boolean;
    onSaveSuccess?: (data: any) => void;
    onSaveFailure?: (e: any) => void;
    customDataSection?: {
        new?: any;
        edit?: any;
    };
}
interface IDrawerForm {
    setData: (d: any) => void;
}
declare const SummaryDrawerForm: import('react').ForwardRefExoticComponent<IDialogGridFormInput & import('react').RefAttributes<IDrawerForm>>;
export { SummaryDrawerForm };
