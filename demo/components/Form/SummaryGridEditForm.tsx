import { useParams } from "react-router-dom";
import { EditForm } from "../../../src/main";

import { IEndPoint } from "@palmyralabs/palmyra-wire";
import { TextField } from "../../form";


const SummaryGridEditForm = () => {
    const params: any = useParams();

    const endPoint: IEndPoint = {
        get: 'district/{id}.json',
        query: 'district/SummaryData.json', put: 'district/{id}.json',
        post: 'district/new.json'
    }


    return (<>
        <EditForm pageName="SummaryGridEditForm" id={params.id} options={{ endPoint: endPoint }}
             title="Edit Form">
            <TextField attribute="name" label="District" />
        </EditForm>
    </>)

}

export default SummaryGridEditForm;