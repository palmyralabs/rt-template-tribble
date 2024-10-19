import { ColumnDefinition, FieldGroupContainer } from "@palmyralabs/rt-forms";
import { NumberField, TextField } from "../../form";
import { IEndPoint } from "@palmyralabs/palmyra-wire";
import { SummaryPopupGrid } from "../../../src/main";
import { PopupGridControls } from "../../../src/palmyra/template/popup/PopupGridControls";
import { PopupGridPluginOptions } from "../../../src/palmyra/template/Types";
import { Button } from "@mantine/core";
import { IDataGridDefaultControlConfig } from "@palmyralabs/rt-forms-mantine";


function DrawerGrid(props: any) {

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


    const Formlet = () => {

        return (<>
            <FieldGroupContainer>
                <TextField attribute="name" label="District" required />
                <NumberField attribute="population" label="Population" />
            </FieldGroupContainer>
        </>)
    }

    const endPoint: IEndPoint = {
        get: 'district/{id}.json',
        query: 'district/SummaryData.json', put: 'district/{id}.json',
        post: 'district/new.json'
    }

    const CustomControl = (props: PopupGridPluginOptions) => {
        return (<>
            <PopupGridControls {...props} />
            <Button onClick={() => { }} className="py-action-button">Transfer</Button>
        </>);
    }

    const getPluginOptions = (): IDataGridDefaultControlConfig => {
        return { export: { visible: false } }
    }

    return (<div className="py-grid-container">
        <SummaryPopupGrid NewFormlet={Formlet} EditFormlet={Formlet}
            getPluginOptions={getPluginOptions} DataGridControls={CustomControl}
            columns={fields} quickSearch="name"
            pageName={props.pageName} title={"Summary Popup Grid"}
            options={{ endPoint }} /></div>
    );
}

export default DrawerGrid;