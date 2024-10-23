import { useRef } from "react";
import { ISummaryGridInput } from "../Types";
import { SummaryGridControls } from "./SummaryGridControls";
import { useNavigate } from "react-router-dom";
import { StringFormat } from "@palmyralabs/ts-utils";
import '../../template/Layout.css';
import { PalmyraGrid } from "@palmyralabs/rt-forms-mantine";

interface IGridInput extends ISummaryGridInput {
    gridRef?: any,
    clickTo?: 'view' | 'edit'
}

function SummaryGrid(props: IGridInput) {
    const navigate = useNavigate();
    const idKey = props.idKey || 'id';
    const gridRef: any = props.gridRef || useRef(null);

    const handleRowClick = (rowData) => {
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
        <div className="py-grid-container">
            <PalmyraGrid title={props.title} columns={props.columns}
                getPluginOptions={props.getPluginOptions} defaultParams={props.defaultParams}
                DataGridControls={DataGridControls} DataGridControlProps={{ newRecord }}
                endPoint={props.options.endPoint} endPointOptions={props.options.endPointOptions}
                onRowClick={rowClick} pageSize={props.pageSize} {...props.options}
                ref={gridRef} customizer={props.customizer} quickSearch={props.quickSearch} />
        </div>
    );
}
export { SummaryGrid };