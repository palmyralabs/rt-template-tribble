import { ISummaryGridInput } from '../Types';
interface IGridInput extends ISummaryGridInput {
    gridRef?: any;
    grid?: 'view' | 'edit';
}
declare function SummaryGrid(props: IGridInput): import("react/jsx-runtime").JSX.Element;
export { SummaryGrid };
