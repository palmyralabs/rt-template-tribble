import { ColumnDefinition, PalmyraForm } from "@palmyralabs/rt-forms";
import { SummaryGrid, ITemplateGridControlConfig } from "../../../src/main";
import { containsFilter, MantineServerLookup, MantineTextField, useGridPersistedFilter } from "@palmyralabs/rt-forms-mantine";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { Button } from "@mantine/core";
import { FiDownload } from "react-icons/fi";
import { useDemoConfig, StoreScope } from "../../config/DemoConfigContext";


function Grid(props: any) {
    const { grids, lookups } = useDemoConfig();
    const navigate = useNavigate();
    const fields: ColumnDefinition[] = [
        // {
        //     attribute: "name",
        //     name: "District",
        //     label: "District",
        //     searchable: true,
        //     sortable: true,
        //     type: "string"
        // },
        // {
        //     attribute: "dob",
        //     name: "dob",
        //     label: "Dob",
        //     searchable: true,
        //     sortable: true,
        //     displayPattern:"MM-DD-YYYY",
        //     type: "date"
        // },
        // {
        //     attribute: "population",
        //     name: "Population",
        //     title: "Population",
        //     searchable: true,
        //     sortable: true,
        //     type: "number"
        // }



        {
            attribute: "projectId",
            name: "projectId",
            label: "Project ID",
            searchable: true,
            sortable: true,
            width: '90px',
            type: "string"
        },
        {
            attribute: "projectName",
            name: "projectName",
            label: "Project Name",
            quickSearch: true,
            searchable: true,
            sortable: true,
            width: '500px',
            type: "string"
        },
        {
            attribute: "fundingAgency",
            name: "fundingAgency",
            label: "Funding Agency",
            searchable: true,
            sortable: true,
            width: '190px',
            type: "string"
        },
        {
            attribute: "sectionName",
            name: "sectionName",
            label: "Section",
            searchable: true,
            sortable: true,
            width: '130px',
            type: "string"
        },
        {
            attribute: "divisionName",
            name: "divisionName",
            label: "Division",
            searchable: true,
            sortable: true,
            width: '90px',
            type: "string"
        },
        {
            attribute: "projectStage",
            name: "projectStage",
            label: "Project Status",
            searchable: true,
            sortable: true,
            width: '150px',
            type: "string"
        },
        {
            attribute: "contractor",
            name: "contractor",
            label: "Contractor",
            searchable: true,
            sortable: true,
            width: '150px',
            type: "string"
        },
        {
            attribute: "estimatedCost",
            name: "estimatedCost",
            label: "Estimated Cost (₹)",
            searchable: true,
            sortable: true,
            width: '150px',
            type: "number"
        },
        {
            attribute: "tenderValue",
            name: "tenderValue",
            label: "Tender Value (₹)",
            searchable: true,
            sortable: true,
            width: '150px',
            type: "number"
        },
        {
            attribute: "deviation",
            name: "deviation",
            label: "Deviated Amount  (₹)",
            searchable: true,
            sortable: true,
            width: '150px',
            type: "number"
        },
        {
            attribute: "physicalProgress",
            name: "PhysicalProgress",
            label: "Physical Progress (%)",
            searchable: true,
            sortable: true,
            width: '150px',
            type: "number"
        },
        {
            attribute: "financialProgress",
            name: "FinancialProgress",
            label: "Financial Progress (%)",
            searchable: true,
            sortable: true,
            width: '170px',
            type: "number"
        },
        {
            attribute: "estimatedStartDate",
            name: "estimatedStartDate",
            label: "Start Date",
            searchable: true,
            sortable: true,
            width: '150px',
            type: "string"
        },
        {
            attribute: "estimatedEndDate",
            name: "estimatedEndDate",
            label: "End Date",
            searchable: true,
            sortable: true,
            width: '150px',
            type: "string"
        },
        {
            attribute: "actualEndDate",
            name: "actualEndDate",
            label: "Actual End Date",
            searchable: true,
            sortable: true,
            width: '150px',
            type: "string"
        },
    ];

    // const endPoint: IEndPoint = {
    //     get: 'district/{id}.json',
    //     query: 'district/SummaryData.json', put: 'district/{id}.json',
    //     post: 'district/new.json'
    // }

    const endPoint = grids.project.endpoint;

    const gridRef = useRef<any>(null);
    const projectIdRef = useRef<any>(null);
    const sectionRef = useRef<any>(null);

    // The grid restores its own persisted filter on mount; the hook is only used to
    // seed the filter form with the same values.  Pass the key the grid persists under
    // (lsKey, else the endPoint) - props.endPoint is not it.
    const { filter: persistedFilter, formData: initialFormData } = useGridPersistedFilter(endPoint);

    const [filters, setFilters] = useState<Record<string, any>>(() => ({
        projectId: initialFormData.projectId || '',
        section: persistedFilter.section || ''
    }));

    const applyFilter = (attribute: string, value: any) =>
        setFilters((prev) => ({ ...prev, [attribute]: value }));

    // MantineServerLookup calls onChange(searchText) on every keystroke,
    // onChange(label, option) on selection and onChange('', null) on clear.
    const handleSectionChange = (_label: any, option?: any) => {
        if (undefined === option) return;
        applyFilter('section', option ? option.id : '');
    }

    const isMounted = useRef(false);
    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }
        const timer = setTimeout(() => {
            const filter: Record<string, any> = {};
            if (filters.projectId)
                filter.projectId = containsFilter(filters.projectId);
            if (filters.section)
                filter.section = filters.section;
            gridRef.current?.setFilter(filter);
        }, 300);
        return () => clearTimeout(timer);
    }, [filters.projectId, filters.section]);

    const clearFilters = () => {
        projectIdRef.current?.setValue('');
        sectionRef.current?.setValue(null);
        setFilters({ projectId: '', section: '' });
    }

    const FilterField = <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <PalmyraForm formData={initialFormData}>
            <MantineTextField attribute="projectId" placeholder="Project ID"
                label="" validRule={"string"} ref={projectIdRef}
                onChange={(e: any) => applyFilter('projectId', e.target.value)}
                rightSection={filters.projectId
                    ? <MdClose style={{ cursor: 'pointer' }} onClick={() => {
                        projectIdRef.current?.setValue('');
                        applyFilter('projectId', '');
                    }} />
                    : undefined
                }
            />
            <MantineServerLookup attribute="section" noOptionsLabel="-- No Section found --" label="" ref={sectionRef}
                placeholder="Section" onChange={handleSectionChange}
                queryOptions={{ endPoint: lookups.section }}
                lookupOptions={{ idAttribute: 'id', labelAttribute: 'name' }} />
        </PalmyraForm>
    </div>

    const getPluginOptions = (): ITemplateGridControlConfig => ({
        addText: 'Add Project',
        onNewClick: () => navigate('new'),
        aclCode: 'PROJECT.POST',
        aclCheck: () => true,
        filterField: FilterField,
        customBtn: <Button variant="light" size="compact-sm"
            leftSection={<FiDownload size={14} />} onClick={() => { }}>Export PDF</Button>,
        exportFormats: { csv: 'CSV', excel: 'Excel' },
        filters,
        setFilters,
        onClearFilters: clearFilters
    });

    return (
        <StoreScope baseUrl={grids.project.baseUrl}>
            <SummaryGrid
                gridRef={gridRef}
                columns={fields}
                pageName={props.pageName}
                title={"Summary Grid"}
                options={{ endPoint }}
                getPluginOptions={getPluginOptions}
                pageSize={[5, 10, 20]} />
        </StoreScope>);
}

export default Grid;