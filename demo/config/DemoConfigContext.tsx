import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { StoreFactoryContext } from "@palmyralabs/rt-forms";
import { PalmyraStoreFactory, IEndPoint } from "@palmyralabs/palmyra-wire";

interface GridConfig {
    baseUrl: string;
    endpoint: string;
}

type GridKey = "project" | "editGrid" | "drawerGrid" | "dialogGrid";

interface DemoConfig {
    baseUrl: string;
    grids: Record<GridKey, GridConfig>;
    projectForm: {
        get: string;
        post: string;
        put: string;
    };
    lookups: {
        section: string;
    };
}

interface DemoConfigContextValue extends DemoConfig {
    setConfig: (c: DemoConfig) => void;
    resetConfig: () => void;
    getProjectEndPoint: () => IEndPoint;
}

const GRID_META: { key: GridKey; label: string }[] = [
    { key: "project", label: "Project Grid" },
    { key: "editGrid", label: "Edit Grid" },
    { key: "drawerGrid", label: "Drawer Grid" },
    { key: "dialogGrid", label: "Dialog Grid" }
];

const DEFAULT_CONFIG: DemoConfig = {
    baseUrl: "/api/palmyra",
    grids: {
        project: { baseUrl: "", endpoint: "/prj/project/view" },
        editGrid: { baseUrl: "", endpoint: "district/SummaryData.json" },
        drawerGrid: { baseUrl: "", endpoint: "/mstProdCategory" },
        dialogGrid: { baseUrl: "", endpoint: "/admin/acl/group" }
    },
    projectForm: {
        get: "/prj/project/{id}",
        post: "/prj/project",
        put: "/prj/project/{id}"
    },
    lookups: {
        section: "/prj/user/lookup/section"
    }
};

const STORAGE_KEY = "demoConfig";

const mergeGrid = (saved: any, fallback: GridConfig): GridConfig => ({
    baseUrl: saved?.baseUrl ?? fallback.baseUrl,
    endpoint: saved?.endpoint || fallback.endpoint
});

const loadConfig = (): DemoConfig => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const p = JSON.parse(raw);
            return {
                baseUrl: p.baseUrl || DEFAULT_CONFIG.baseUrl,
                grids: {
                    project: mergeGrid(p.grids?.project, DEFAULT_CONFIG.grids.project),
                    editGrid: mergeGrid(p.grids?.editGrid, DEFAULT_CONFIG.grids.editGrid),
                    drawerGrid: mergeGrid(p.grids?.drawerGrid, DEFAULT_CONFIG.grids.drawerGrid),
                    dialogGrid: mergeGrid(p.grids?.dialogGrid, DEFAULT_CONFIG.grids.dialogGrid)
                },
                projectForm: { ...DEFAULT_CONFIG.projectForm, ...(p.projectForm || {}) },
                lookups: { ...DEFAULT_CONFIG.lookups, ...(p.lookups || {}) }
            };
        }
    } catch (e) {
        return DEFAULT_CONFIG;
    }
    return DEFAULT_CONFIG;
};

const persistConfig = (c: DemoConfig) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
    } catch (e) {
        return;
    }
};

const DemoConfigContext = createContext<DemoConfigContextValue>({
    ...DEFAULT_CONFIG,
    setConfig: () => { },
    resetConfig: () => { },
    getProjectEndPoint: () => ({ get: "", query: "", put: "", post: "" })
});

const DemoConfigProvider = ({ children }: { children: ReactNode }) => {
    const [config, setConfigState] = useState<DemoConfig>(loadConfig);

    const storeFactory = useMemo(
        () => new PalmyraStoreFactory({ baseUrl: config.baseUrl }),
        [config.baseUrl]
    );

    const setConfig = (c: DemoConfig) => {
        setConfigState(c);
        persistConfig(c);
    };

    const resetConfig = () => {
        setConfigState(DEFAULT_CONFIG);
        persistConfig(DEFAULT_CONFIG);
    };

    const getProjectEndPoint = (): IEndPoint => ({
        get: config.projectForm.get,
        query: config.grids.project.endpoint,
        put: config.projectForm.put,
        post: config.projectForm.post
    });

    const value: DemoConfigContextValue = {
        ...config,
        setConfig,
        resetConfig,
        getProjectEndPoint
    };

    return (
        <DemoConfigContext.Provider value={value}>
            <StoreFactoryContext.Provider value={storeFactory}>
                <div key={config.baseUrl} style={{ display: "contents" }}>
                    {children}
                </div>
            </StoreFactoryContext.Provider>
        </DemoConfigContext.Provider>
    );
};

const StoreScope = ({ baseUrl, children }: { baseUrl?: string; children: ReactNode }) => {
    const trimmed = (baseUrl || "").trim();
    const override = trimmed.length > 0;
    const factory = useMemo(
        () => (override ? new PalmyraStoreFactory({ baseUrl: trimmed }) : null),
        [override, trimmed]
    );

    if (!factory) {
        return <>{children}</>;
    }

    return (
        <StoreFactoryContext.Provider value={factory}>
            <div key={trimmed} style={{ display: "contents" }}>
                {children}
            </div>
        </StoreFactoryContext.Provider>
    );
};

const useDemoConfig = () => useContext(DemoConfigContext);

export { DemoConfigProvider, StoreScope, useDemoConfig, DEFAULT_CONFIG, GRID_META };
export type { DemoConfig, GridConfig, GridKey };
