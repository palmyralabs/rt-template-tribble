
import { FC, ReactNode, useEffect, useRef } from "react";
import { ISummaryGridInput } from "../Types";
import { topic } from "@palmyralabs/ts-utils";
import { useGridColumnCustomizer } from "@palmyralabs/rt-forms";
import { PalmyraGrid } from "@palmyralabs/rt-forms-mantine";
import { IDialogForm, SummaryDialogForm } from "./SummaryDialogForm";
import { SummaryDrawerForm } from "./SummaryDrawerForm";
import { PopupGridControls } from "./PopupGridControls";
import { useGridSelection } from "../form/useGridSelection";
import '../../template/Layout.css';
import { getTitle } from "../util/TitleUtil";

interface IPopupGridInput extends ISummaryGridInput {
    EditFormlet: FC,
    NewFormlet: FC,
    gridRef?: any,
    size?: string | number,
    width?: any
    height?: string,
    minWidth?: string,
    enableSaveVariants?: boolean
    customDataSection?: {
        new?: any
        edit?: any
    }
    popup?: 'dialog' | 'drawer',
    onSaveSuccess?: (data: any) => void;
    onSaveFailure?: (e: any) => void;
    selectable?: 'single' | 'multi' | boolean,
    onSelectionChange?: (rows: any[]) => void,
    selectionBarContent?: (rows: any[], clear: () => void) => ReactNode
}

function SummaryPopupGrid(props: IPopupGridInput) {
    const viewTopic = props.pageName + "/viewPage";
    const newTopic = props.pageName + "/newPage";
    const refreshTopic = props.pageName + "/refresh";
    const popup = props.popup || 'drawer';

    const dialogFormRef: any = useRef<IDialogForm>(null);
    const gridRef: any = props.gridRef || useRef(null);
    const idKey = props.idKey || 'id';
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

    const handleDataChange = (newData: any[], oldData?: any[]) => {
        dataRef.current = newData || [];
        if (props.onDataChange) props.onDataChange(newData, oldData);
    };

    useEffect(() => {
        var viewPageHandle = topic.subscribe(viewTopic, (_topicName, data) => {
            setData(data);
        });

        var refreshHandle = topic.subscribe(refreshTopic, (_topicName) => {
            if (gridRef.current)
                gridRef.current.refresh();
        });

        var newPageHandle = topic.subscribe(newTopic, (_topicName, data) => {
            setData(data);
        });
        return () => {
            topic.unsubscribe(viewPageHandle);
            topic.unsubscribe(newPageHandle);
            topic.unsubscribe(refreshHandle);
        }

    }, []);

    const handleRowClick = (rowData) => {
        setData(rowData);
    }

    const setData = (d: any) => {
        if (dialogFormRef.current)
            dialogFormRef.current.setData(d);
    }

    const DataGridControls = props.DataGridControls || PopupGridControls

    const PopupForm = (popup == 'drawer') ? SummaryDrawerForm : SummaryDialogForm
    const rowClick = !props.disableRowClick ? handleRowClick : () => { }

    return (<div className="py-grid-container">
        {selection.enabled && props.selectionBarContent && selection.selectedRows.length > 0 &&
            <div className="py-grid-selection-bar">
                {props.selectionBarContent(selection.selectedRows, selection.clear)}
            </div>}
        <PalmyraGrid title={getTitle(props.title, 'grid')} columns={props.columns} DataGridControlProps={{ setFormData: setData, exportOptions: props.exportOptions }}
            pagination={props.pagination} onDataChange={handleDataChange} lsKey={props.lsKey}
            DataGridControls={DataGridControls} onRowClick={rowClick} defaultParams={props.defaultParams}
            endPoint={props.options.endPoint} endPointOptions={props.options.endPointOptions}
            pageSize={props.pageSize} {...props.options} getPluginOptions={props.getPluginOptions}
            onFetchFailure={props.onFetchFailure}
            initParams={props.filter ? { filter: props.filter } : undefined}
            ref={gridRef} customizer={gridCustomizer} quickSearch={props.quickSearch} showFooter={props.showFooter} />
        <PopupForm {...props} gridRef={gridRef} ref={dialogFormRef} />
    </div>
    );
}

export { SummaryPopupGrid };