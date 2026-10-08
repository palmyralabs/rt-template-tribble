import { useParams } from "react-router-dom";
import { ViewForm } from "../../../src/main";
import ProjectFormlet from "./ProjectFormlet";
import { useDemoConfig, StoreScope } from "../../config/DemoConfigContext";

const SummaryGridViewForm = () => {
    const params: any = useParams();
    const { getProjectEndPoint, grids } = useDemoConfig();

    return (
        <StoreScope baseUrl={grids.project.baseUrl}>
            <ViewForm id={params.id} options={{ endPoint: getProjectEndPoint() }} pageName="grid"
                title="View Project">
                <ProjectFormlet />
            </ViewForm>
        </StoreScope>
    );
};

export default SummaryGridViewForm;
