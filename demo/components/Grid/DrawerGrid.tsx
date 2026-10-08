import { ColumnDefinition, FieldGroupContainer } from "@palmyralabs/rt-forms";
import { NumberField, TextField } from "../../form";
import { SummaryPopupGrid } from "../../../src/main";
import { PopupGridControls } from "../../../src/palmyra/template/popup/PopupGridControls";
import { PopupGridPluginOptions } from "../../../src/palmyra/template/Types";
import { Button } from "@mantine/core";
import { IDataGridDefaultControlConfig } from "@palmyralabs/rt-forms-mantine";
import { toast } from "react-toastify";
import { useDemoConfig, StoreScope } from "../../config/DemoConfigContext";


function DrawerGrid(props: any) {
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
            label: "Code",
            searchable: true,
            sortable: true,
            type: "number"
        }
    ];


    const Formlet = () => {

        return (<>
            <FieldGroupContainer>
                <TextField attribute="name" label="District" required />
                <NumberField attribute="code" label="Population" />
            </FieldGroupContainer>
        </>)
    }

    const endPoint = grids.drawerGrid.endpoint;

    const CustomControl = (props: PopupGridPluginOptions) => {
        return (<>
            <PopupGridControls {...props} />
            <Button onClick={() => { }} className="py-action-button">Transfer</Button>
        </>);
    }

    const getPluginOptions = (): IDataGridDefaultControlConfig => {
        return { export: { visible: false } }
    }

    const onSaveFailure = (data)=>{
        // toast.error(d?.response?.data?.errorMessage);
        console.log(data,'df');
    }

     const onSaveFail = (d)=>{
        toast.error(d?.response?.data?.errorMessage);
        // console.log(data,'df');
    }

    return (
        <StoreScope baseUrl={grids.drawerGrid.baseUrl}>
            <div className="py-grid-container">
                <SummaryPopupGrid NewFormlet={Formlet} EditFormlet={Formlet}
                    getPluginOptions={getPluginOptions} width={'300px'}
                    columns={fields} quickSearch="name" popup="drawer"
                    pageName={props.pageName} title={{
                        grid: "SummaryDrawer Grid", edit: "Edit Drawer Grid",
                        new: 'New Drawer Grid', view: 'View Drawer Grid'
                    }}
                    options={{ endPoint }} />
            </div>
        </StoreScope>
    );
}

export default DrawerGrid;