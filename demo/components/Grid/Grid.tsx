import { ColumnDefinition } from "@palmyralabs/rt-forms";
import { SummaryGrid } from "../../../src/main";
import { IEndPoint } from "@palmyralabs/palmyra-wire";


function Grid(props: any) {
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
            attribute: "dob",
            name: "dob",
            label: "Dob",
            searchable: true,
            sortable: true,
            displayPattern:"MM-DD-YYYY",
            type: "date"
        },
        // {
        //     attribute: "population",
        //     name: "Population",
        //     title: "Population",
        //     searchable: true,
        //     sortable: true,
        //     type: "number"
        // }
    ];

    const endPoint: IEndPoint = {
        get: 'district/{id}.json',
        query: 'district/SummaryData.json', put: 'district/{id}.json',
        post: 'district/new.json'
    }

    return (
        <SummaryGrid
            columns={fields}
            pageName={props.pageName}
            title={"Summary Grid"}
            options={{ endPoint }} />
    );
}

export default Grid;