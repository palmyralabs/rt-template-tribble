import { NewForm } from "../../../src/main";
import { TextField } from "../../form";


const SummaryGridNewForm = () => {

    return (<>
        <NewForm options={{ endPoint: '/masterdata/district' }} pageName="" title="New Form">
            <TextField attribute="name" label="District" />
        </NewForm>
    </>)

}

export default SummaryGridNewForm;