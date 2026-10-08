import { useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "../../src/main";
import SummaryGridViewForm from "../components/Form/SummaryGridViewForm";

const ViewFormPage = () => {
    const navigate = useNavigate();
    const params: any = useParams();

    return (
        <div style={{ padding: "18px 22px 0" }}>
            <PageHeader
                breadcrumbs={[{ label: "Projects", onClick: () => navigate("/grid") }, { label: "View" }]}
                title={`Project #${params.id ?? ""}`}
                subTitle="Project details"
                statusInfo={{ text: "Pending", label: "Approval Status" }}
                workflowActions={[
                    { id: "submit", name: "submitted", onClick: () => { } },
                    { id: "approve", name: "approved", onClick: () => { } }
                ]}
            />
            <SummaryGridViewForm />
        </div>
    );
};

export default ViewFormPage;
