
import { FC, useEffect, useRef } from "react";
import { ISummaryGridInput } from "../Types";
import { topic } from "@palmyralabs/ts-utils";
import { PalmyraGrid } from "@palmyralabs/rt-forms-mantine";
import { IDialogForm, SummaryDialogForm } from "./SummaryDialogForm";
import { SummaryDrawerForm } from "./SummaryDrawerForm";
import { PopupGridControls } from "./PopupGridControls";
import '../../template/Layout.css';

interface IPopupGridInput extends ISummaryGridInput {
    EditFormlet: FC,
    NewFormlet: FC,
    gridRef?: any,
    width?: any
    height?: string,
    minWidth?: string,
    popup?: 'dialog' | 'drawer'
}

function SummaryPopupGrid(props: IPopupGridInput) {
    const viewTopic = props.pageName + "/viewPage";
    const newTopic = props.pageName + "/newPage";
    const refreshTopic = props.pageName + "/refresh";
    const title: any = props.title;
    const popup = props.popup || 'drawer';

    const dialogFormRef: any = useRef<IDialogForm>();
    const gridRef: any = props.gridRef || useRef(null);

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
        <PalmyraGrid title={title} columns={props.columns} DataGridControlProps={{ setFormData: setData }}
            DataGridControls={DataGridControls} onRowClick={rowClick} defaultParams={props.defaultParams}
            endPoint={props.options.endPoint} endPointOptions={props.options.endPointOptions}
            pageSize={props.pageSize} {...props.options} getPluginOptions={props.getPluginOptions}
            ref={gridRef} customizer={props.customizer} quickSearch={props.quickSearch} />
        <PopupForm {...props} gridRef={gridRef} ref={dialogFormRef} />
    </div>
    );
}

export { SummaryPopupGrid };