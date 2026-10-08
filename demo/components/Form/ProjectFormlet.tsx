import { FieldGroupContainer } from "@palmyralabs/rt-forms";
import {
    TextField, TextArea, NumberField, Select, ServerLookup, DateTimePicker, Switch
} from "../../form";
import { useDemoConfig } from "../../config/DemoConfigContext";
import "./ProjectForm.css";

const projectStageOptions = {
    DRAFT: "Draft",
    TENDERED: "Tendered",
    AWARDED: "Awarded",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
    CLOSED: "Closed"
};

const ProjectFormlet = () => {
    const { lookups } = useDemoConfig();

    return (
        <div className="pf-form">
            <section className="pf-section">
                <div className="pf-section-title">Project Details</div>
                <FieldGroupContainer>
                    <TextField attribute="projectId" label="Project ID" required />
                    <TextField attribute="projectName" label="Project Name" colspan={2} required />
                    <TextField attribute="fundingAgency" label="Funding Agency" />
                    <ServerLookup attribute="section" label="Section"
                        noOptionsLabel="-- No Section found --"
                        queryOptions={{ endPoint: lookups.section }}
                        lookupOptions={{ idAttribute: "id", labelAttribute: "name" }} />
                    <TextField attribute="divisionName" label="Division" />
                    <Select attribute="projectStage" label="Project Status" options={projectStageOptions} />
                    <TextField attribute="contractor" label="Contractor" />
                    <Switch attribute="isActive" label="Active"
                        options={{ true: "Active", false: "Inactive" }} />
                </FieldGroupContainer>
            </section>

            <section className="pf-section">
                <div className="pf-section-title">Financials</div>
                <FieldGroupContainer>
                    <NumberField attribute="estimatedCost" label="Estimated Cost (₹)"
                        prefix="₹ " thousandSeparator="," thousandsGroupStyle="lakh" />
                    <NumberField attribute="tenderValue" label="Tender Value (₹)"
                        prefix="₹ " thousandSeparator="," thousandsGroupStyle="lakh" />
                    <NumberField attribute="deviation" label="Deviated Amount (₹)"
                        prefix="₹ " thousandSeparator="," thousandsGroupStyle="lakh" />
                    <NumberField attribute="physicalProgress" label="Physical Progress (%)" min={0} max={100} />
                    <NumberField attribute="financialProgress" label="Financial Progress (%)" min={0} max={100} />
                </FieldGroupContainer>
            </section>

            <section className="pf-section">
                <div className="pf-section-title">Timeline</div>
                <FieldGroupContainer>
                    <DateTimePicker attribute="estimatedStartDate" label="Start Date" />
                    <DateTimePicker attribute="estimatedEndDate" label="End Date" />
                    <DateTimePicker attribute="actualEndDate" label="Actual End Date" />
                </FieldGroupContainer>
            </section>

            <section className="pf-section">
                <div className="pf-section-title">Remarks</div>
                <FieldGroupContainer>
                    <TextArea attribute="remarks" label="Remarks" autosize minRows={2} colspan={3} />
                </FieldGroupContainer>
            </section>
        </div>
    );
};

export default ProjectFormlet;
