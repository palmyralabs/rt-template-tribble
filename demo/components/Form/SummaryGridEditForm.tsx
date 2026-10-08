import { useParams } from "react-router-dom";
import { Button } from "@mantine/core";
import { FiDownload } from "react-icons/fi";
import { EditForm } from "../../../src/main";
import ProjectFormlet from "./ProjectFormlet";
import { useDemoConfig, StoreScope } from "../../config/DemoConfigContext";

const SummaryGridEditForm = () => {
    const params: any = useParams();
    const { getProjectEndPoint, grids } = useDemoConfig();

    return (
        <StoreScope baseUrl={grids.project.baseUrl}>
            <EditForm pageName="grid" id={params.id} options={{ endPoint: getProjectEndPoint() }}
                title="Edit Project" successMsg="Project updated"
                customRequestData={{ source: 'demo' }}
                customBtn={<Button variant="light" size="compact-sm"
                    leftSection={<FiDownload size={14} />} onClick={() => { }}>Export</Button>}
                onSaveSuccess={(d) => console.log('saved', d)}>
                <ProjectFormlet />
            </EditForm>
        </StoreScope>
    );
};

export default SummaryGridEditForm;
