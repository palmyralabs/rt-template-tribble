import { ColumnDefinition } from "@palmyralabs/rt-forms";
import { IEndPoint } from "@palmyralabs/palmyra-wire";
import { SummaryGrid } from "../../../src/main";


function EditGrid(props: any) {
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

    const endPoint: IEndPoint = {
        get: 'district/{id}.json',
        query: 'district/SummaryData.json', put: 'district/{id}.json',
        post: 'district/new.json'
    }

    return (
        <SummaryGrid grid="edit"
            columns={fields}
            pageName={props.pageName}
            title={"Summary Edit Grid"}
            options={{ endPoint }} />
    );
}

export default EditGrid;