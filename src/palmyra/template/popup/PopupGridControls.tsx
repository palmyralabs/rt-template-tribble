import { ExportDataButton, FilterButton, QuickSearch } from "@palmyralabs/rt-forms-mantine";

import { ITemplateGridControlConfig, PopupGridPluginOptions } from "../Types";
import { Button } from "@mantine/core";
import { useEffect } from "react";
import { handlekeyPress } from "../util/handlekeyPress";

const countActiveFilters = (filters?: Record<string, any>) =>
    filters ? Object.values(filters).filter((v) => v !== undefined && v !== null && v !== '').length : 0;

const isAddVisible = (pluginOptions: ITemplateGridControlConfig) =>
    pluginOptions.addVisible !== false
    && (!pluginOptions.aclCode || !pluginOptions.aclCheck || pluginOptions.aclCheck(pluginOptions.aclCode));

const PopupGridControls = (props: PopupGridPluginOptions) => {
    const { getPluginOptions, ...o } = props;
    const pluginOptions = (getPluginOptions ? getPluginOptions() : {}) as ITemplateGridControlConfig;

    useEffect(() => {
        const onKey = handlekeyPress(() => props.setFormData({}), 'n', { alt: true });
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [props.setFormData]);

    const exportOption = pluginOptions.exportFormats || o.exportOptions || { csv: 'CSV' };
    const addVisible = isAddVisible(pluginOptions);
    const handleAdd = pluginOptions.onNewClick || (() => props.setFormData({}));
    const activeFilters = countActiveFilters(pluginOptions.filters);

    return (<div>
        {pluginOptions.filterField}
        {o.quickSearch && <QuickSearch width="200" queryRef={o.queryRef}
            columns={o.columns} {...pluginOptions.quickSearch} />}
        <FilterButton {...o} />
        {activeFilters > 0 && pluginOptions.onClearFilters &&
            <Button variant="subtle" className="py-reset-button" onClick={pluginOptions.onClearFilters}>
                Clear filters ({activeFilters})
            </Button>}
        <ExportDataButton exportOption={exportOption}
            visible={pluginOptions.export?.visible} disabled={pluginOptions.export?.disabled}
            queryRef={o.queryRef} {...pluginOptions.export} />
        {pluginOptions.customBtn}
        {addVisible && <Button className="py-action-button" onClick={handleAdd} {...pluginOptions.add}>
            {pluginOptions.addText || 'Add'}
        </Button>}
    </div>);
}

export { PopupGridControls }
