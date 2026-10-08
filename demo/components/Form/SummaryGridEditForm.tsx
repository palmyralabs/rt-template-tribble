import { useParams } from "react-router-dom";
import { EditForm } from "../../../src/main";
import ProjectFormlet from "./ProjectFormlet";
import { useDemoConfig, StoreScope } from "../../config/DemoConfigContext";

const SummaryGridEditForm = () => {
    const params: any = useParams();
    const { getProjectEndPoint, grids } = useDemoConfig();

    return (
        <StoreScope baseUrl={grids.project.baseUrl}>
            <EditForm pageName="grid" id={params.id} options={{ endPoint: getProjectEndPoint() }}
                title="Edit Project">
                <ProjectFormlet />
            </EditForm>
        </StoreScope>
    );
};

export default SummaryGridEditForm;
