import { NewForm } from "../../../src/main";
import ProjectFormlet from "./ProjectFormlet";
import { useDemoConfig, StoreScope } from "../../config/DemoConfigContext";

const SummaryGridNewForm = () => {
    const { getProjectEndPoint, grids } = useDemoConfig();

    return (
        <StoreScope baseUrl={grids.project.baseUrl}>
            <NewForm options={{ endPoint: getProjectEndPoint() }} pageName="grid"
                title="New Project" successMsg="Project created successfully">
                <ProjectFormlet />
            </NewForm>
        </StoreScope>
    );
};

export default SummaryGridNewForm;
