import { ReactNode, useRef } from "react";
import { ISummaryGridInput } from "../Types";
import { SummaryGridControls } from "./SummaryGridControls";
import { useNavigate } from "react-router-dom";
import { StringFormat } from "@palmyralabs/ts-utils";
import { useGridColumnCustomizer } from "@palmyralabs/rt-forms";
import '../../template/Layout.css';
import { PalmyraGrid } from "@palmyralabs/rt-forms-mantine";
import { getTitle } from "../util/TitleUtil";
import { useGridSelection } from "./useGridSelection";

interface IGridInput extends ISummaryGridInput {
    gridRef?: any,
    clickTo?: 'view' | 'edit',
    onRowClick?: (rowData: any) => void,
    navigatePath?: string | ((rowData: any) => string),
    getRowClass?: (rowData: any) => string | undefined,
    selectable?: 'single' | 'multi' | boolean,
    onSelectionChange?: (rows: any[]) => void,
    selectionBarContent?: (rows: any[], clear: () => void) => ReactNode
}

function SummaryGrid(props: IGridInput) {
    const navigate = useNavigate();
    const idKey = props.idKey || 'id';
    const gridRef: any = props.gridRef || useRef(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const dataRef = useRef<any[]>([]);

    const baseCustomizer = useGridColumnCustomizer({});
    const selection = useGridSelection({
        selectable: props.selectable,
        idKey,
        dataRef,
        onSelectionChange: props.onSelectionChange
    });
    const gridCustomizer = selection.enabled
        ? {
            ...(props.customizer || baseCustomizer),
            getTableOptions: selection.getTableOptions,
            preProcessColumns: selection.preProcessColumns
        }
        : props.customizer;

    const applyRowClasses = () => {
        if (!props.getRowClass || !containerRef.current) return;
        const rows = containerRef.current.querySelectorAll('.py-grid-data-row');
        rows.forEach((tr, i) => {
            const el = tr as HTMLElement;
            const prev = el.getAttribute('data-py-rowclass');
            if (prev) prev.split(' ').forEach((c) => c && el.classList.remove(c));
            const cls = props.getRowClass!(dataRef.current[i]);
            if (cls) {
                cls.split(' ').forEach((c) => c && el.classList.add(c));
                el.setAttribute('data-py-rowclass', cls);
            } else {
                el.removeAttribute('data-py-rowclass');
            }
        });
    };

    const handleDataChange = (newData: any[], oldData?: any[]) => {
        dataRef.current = newData || [];
        if (props.onDataChange) props.onDataChange(newData, oldData);
        if (props.getRowClass) requestAnimationFrame(applyRowClasses);
    };

    const handleRowClick = (rowData) => {
        if (props.onRowClick) {
            props.onRowClick(rowData);
            return;
        }
        if (props.navigatePath) {
            const path = typeof props.navigatePath === 'function'
                ? props.navigatePath(rowData) : props.navigatePath;
            navigate(path);
            return;
        }
        const data = { id: rowData[idKey] };
        const grid = props.clickTo || 'view'
        navigate(StringFormat(grid + '/{id}', data));
    }

    const newRecord = () => {
        navigate('new');
    }

    const DataGridControls = props.DataGridControls || SummaryGridControls
    const rowClick = !props.disableRowClick ? handleRowClick : () => { }

    return (
        <div className="py-grid-container" ref={containerRef}>
            {selection.enabled && props.selectionBarContent && selection.selectedRows.length > 0 &&
                <div className="py-grid-selection-bar">
                    {props.selectionBarContent(selection.selectedRows, selection.clear)}
                </div>}
            <PalmyraGrid title={getTitle(props.title, 'grid')} lsKey={props.lsKey}
                columns={props.columns} pagination={props.pagination} pageSize={props.pageSize}
                getPluginOptions={props.getPluginOptions} defaultParams={props.defaultParams}
                DataGridControls={DataGridControls} DataGridControlProps={{ newRecord, exportOptions: props.exportOptions }}
                endPoint={props.options.endPoint} endPointOptions={props.options.endPointOptions}
                onRowClick={rowClick}  {...props.options} onDataChange={handleDataChange}
                onFetchFailure={props.onFetchFailure}
                initParams={props.filter ? { filter: props.filter } : undefined}
                ref={gridRef} customizer={gridCustomizer} quickSearch={props.quickSearch} showFooter={props.showFooter} />
        </div>
    );
}
export { SummaryGrid };