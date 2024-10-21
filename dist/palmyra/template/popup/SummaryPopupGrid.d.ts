import { FC } from 'react';
import { ISummaryGridInput } from '../Types';
interface IPopupGridInput extends ISummaryGridInput {
    EditFormlet: FC;
    NewFormlet: FC;
    gridRef?: any;
    width?: any;
    height?: string;
    minWidth?: string;
    popup?: 'dialog' | 'drawer';
}
declare function SummaryPopupGrid(props: IPopupGridInput): import("react/jsx-runtime").JSX.Element;
export { SummaryPopupGrid };
