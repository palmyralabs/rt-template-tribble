import { useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "../../src/main";
import SummaryGridEditForm from "../components/Form/SummaryGridEditForm";

const EditFormPage = () => {
    const navigate = useNavigate();
    const params: any = useParams();

    return (
        <div style={{ padding: "18px 22px 0" }}>
            <PageHeader
                breadcrumbs={[{ label: "Projects", onClick: () => navigate("/grid") }, { label: "Edit" }]}
                title={`Edit Project #${params.id ?? ""}`}
                subTitle="Update project details"
            />
            <SummaryGridEditForm />
        </div>
    );
};

export default EditFormPage;
