import { createErrorHandlerFactory, SummaryPopupGrid } from "../../../src/main";
import { ColumnDefinition, FieldGroupContainer } from "@palmyralabs/rt-forms";
import { NumberField, TextField } from "../../form";
import { PopupGridControls } from "../../../src/palmyra/template/popup/PopupGridControls";
import { useDemoConfig, StoreScope } from "../../config/DemoConfigContext";


function DialogGrid(props: any) {
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
            attribute: "code",
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
                <TextField attribute="name" label="District" />
                <NumberField attribute="code" label="Population" />
            </FieldGroupContainer>
        </>)
    }

    // const endPoint: IEndPoint = {
    //     get: 'district/{id}.json',
    //     query: 'district/SummaryData.json', put: 'district/{id}.json',
    //     post: 'district/new.json'
    // }

    const endPoint = grids.dialogGrid.endpoint;
    const d = <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>left</div>
        <div>right</div>
    </div>

    const onSaveFailure = (error: any) => {
        console.error("Save failed:", error);
        // You can add additional logic here to handle the error, such as displaying a notification to the user.
    }

    const onFetchFailure = (err: any) => {
        console.log('[grid GET failed]',
            err.response?.status,          // 400, 401, 404, 500…
            err.response?.data,            // your API's error body
            err.config?.url                // the URL that failed
        );
    }


    return (
        <StoreScope baseUrl={grids.dialogGrid.baseUrl}>
            <div className="py-grid-container">
                <SummaryPopupGrid popup="dialog"
                    NewFormlet={Formlet} EditFormlet={Formlet}
                    columns={fields}
                    pageName={props.pageName} errorText={"jhjh"}
                    onSaveFailure={onSaveFailure}
                    onFetchFailure={onFetchFailure}
                    title={{ grid: "Pops grid", new: "New Pop", edit: "Edit Pop" }}
                    options={{ endPoint }} />
            </div>
        </StoreScope>
    );
}

export default DialogGrid;