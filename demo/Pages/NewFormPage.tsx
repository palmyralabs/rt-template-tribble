import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../src/main";
import SummaryGridNewForm from "../components/Form/SummaryGridNewForm";

const NewFormPage = () => {
    const navigate = useNavigate();

    return (
        <div style={{ padding: "18px 22px 0" }}>
            <PageHeader
                breadcrumbs={[{ label: "Projects", onClick: () => navigate("/grid") }, { label: "New" }]}
                title="New Project"
                subTitle="Create a new project record"
            />
            <SummaryGridNewForm />
        </div>
    );
};

export default NewFormPage;
