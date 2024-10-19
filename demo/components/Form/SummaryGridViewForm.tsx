
import { useParams } from "react-router-dom";
import { ViewForm } from "../../../src/main";
import { IEndPoint } from "@palmyralabs/palmyra-wire";
import { TextField } from "../../form";


const SummaryGridViewForm = () => {
    const params: any = useParams();
    const endPoint: IEndPoint = {
        get: 'district/{id}.json',
        query: 'district/SummaryData.json', put: 'district/{id}.json',
        post: 'district/new.json'
    }

    return (<>
        <ViewForm id={params.id} options={{ endPoint: endPoint }} pageName="grid"  title="View Form">
            <TextField attribute="name" label="District" />
        </ViewForm>
    </>)

}

export default SummaryGridViewForm;