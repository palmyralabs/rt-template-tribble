import { useState } from "react";
import {
    Modal, TextInput, Button, Group, Stack, ActionIcon, Tooltip, Divider, Text
} from "@mantine/core";
import { FiSettings } from "react-icons/fi";
import { useDemoConfig, DemoConfig, GridKey, GRID_META } from "../../config/DemoConfigContext";

const SettingsPanel = () => {
    const { baseUrl, grids, projectForm, lookups, setConfig, resetConfig } = useDemoConfig();
    const [opened, setOpened] = useState(false);
    const [draft, setDraft] = useState<DemoConfig>({ baseUrl, grids, projectForm, lookups });

    const openPanel = () => {
        setDraft({ baseUrl, grids, projectForm, lookups });
        setOpened(true);
    };

    const apply = () => {
        setConfig(draft);
        setOpened(false);
    };

    const reset = () => {
        resetConfig();
        setOpened(false);
    };

    const updBaseUrl = (value: string) => setDraft((prev) => ({ ...prev, baseUrl: value }));

    const updGrid = (key: GridKey, field: "baseUrl" | "endpoint", value: string) =>
        setDraft((prev) => ({
            ...prev,
            grids: { ...prev.grids, [key]: { ...prev.grids[key], [field]: value } }
        }));

    const updProjectForm = (field: keyof DemoConfig["projectForm"], value: string) =>
        setDraft((prev) => ({ ...prev, projectForm: { ...prev.projectForm, [field]: value } }));

    const updLookup = (field: keyof DemoConfig["lookups"], value: string) =>
        setDraft((prev) => ({ ...prev, lookups: { ...prev.lookups, [field]: value } }));

    return (
        <>
            <Tooltip label="API & endpoint settings">
                <ActionIcon variant="subtle" color="gray" size="lg" onClick={openPanel} aria-label="Settings">
                    <FiSettings size={18} />
                </ActionIcon>
            </Tooltip>
            <Modal opened={opened} onClose={() => setOpened(false)} title="API & Endpoint Settings"
                size="lg" centered>
                <Stack gap="sm">
                    <TextInput label="Global Base URL"
                        description="Used by any grid that has no base URL override"
                        value={draft.baseUrl}
                        onChange={(e) => updBaseUrl(e.currentTarget.value)} />

                    <Divider label="Grids — per-grid base URL override + endpoint" labelPosition="left" mt="xs" />
                    {GRID_META.map((g) => (
                        <div key={g.key}>
                            <Text size="sm" fw={500} mb={4}>{g.label}</Text>
                            <Group grow align="flex-start" gap="xs">
                                <TextInput label="Base URL override" placeholder="inherits global"
                                    value={draft.grids[g.key].baseUrl}
                                    onChange={(e) => updGrid(g.key, "baseUrl", e.currentTarget.value)} />
                                <TextInput label="Query endpoint"
                                    value={draft.grids[g.key].endpoint}
                                    onChange={(e) => updGrid(g.key, "endpoint", e.currentTarget.value)} />
                            </Group>
                        </div>
                    ))}

                    <Divider label="Project Form" labelPosition="left" mt="xs" />
                    <TextInput label="Get ({id})" value={draft.projectForm.get}
                        onChange={(e) => updProjectForm("get", e.currentTarget.value)} />
                    <TextInput label="Create (POST)" value={draft.projectForm.post}
                        onChange={(e) => updProjectForm("post", e.currentTarget.value)} />
                    <TextInput label="Update (PUT {id})" value={draft.projectForm.put}
                        onChange={(e) => updProjectForm("put", e.currentTarget.value)} />

                    <Divider label="Lookups" labelPosition="left" mt="xs" />
                    <TextInput label="Section Lookup" value={draft.lookups.section}
                        onChange={(e) => updLookup("section", e.currentTarget.value)} />

                    <Group justify="space-between" mt="md">
                        <Button variant="default" onClick={reset}>Reset to defaults</Button>
                        <Group>
                            <Button variant="subtle" color="gray" onClick={() => setOpened(false)}>Cancel</Button>
                            <Button onClick={apply}>Apply</Button>
                        </Group>
                    </Group>
                </Stack>
            </Modal>
        </>
    );
};

export default SettingsPanel;
