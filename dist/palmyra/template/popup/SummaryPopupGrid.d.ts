import { FC } from 'react';
import { ISummaryGridInput } from '../Types';
interface IPopupGridInput extends ISummaryGridInput {
    EditFormlet: FC;
    NewFormlet: FC;
    gridRef?: any;
    width?: any;
    height?: string;
    minWidth?: string;
    enableSaveVariants?: boolean;
    customDataSection?: {
        new?: any;
        edit?: any;
    };
    popup?: 'dialog' | 'drawer';
    onSaveSuccess?: (data: any) => void;
    onSaveFailure?: (e: any) => void;
}
declare function SummaryPopupGrid(props: IPopupGridInput): import("react/jsx-runtime").JSX.Element;
export { SummaryPopupGrid };
