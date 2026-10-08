import { ColumnDefinition } from "@palmyralabs/rt-forms";
import { SummaryGrid } from "../../../src/main";
import { toast } from "react-toastify";
import { useDemoConfig, StoreScope } from "../../config/DemoConfigContext";


function EditGrid(props: any) {
    const { grids } = useDemoConfig();
    const fields: ColumnDefinition[] = [
        {
            attribute: "name",
            name: "District",
            label: "District",
            searchable: true,
            sortable: true,
            type: "string"
        },
        {
            attribute: "population",
            name: "Population",
            label: "Population",
            searchable: true,
            sortable: true,
            type: "number"
        }
    ];

    const endPoint = grids.editGrid.endpoint;

    return (
        <StoreScope baseUrl={grids.editGrid.baseUrl}>
            <SummaryGrid grid="edit"
                columns={fields}
                pageName={props.pageName}
                title={"Summary Edit Grid"}
                onRowClick={(row) => toast.info(`Row clicked: ${row.name ?? row.id ?? ''}`)}
                options={{ endPoint }} />
        </StoreScope>
    );
}

export default EditGrid;