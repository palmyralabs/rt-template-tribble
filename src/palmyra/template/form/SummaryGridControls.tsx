import { ColumnChooserButton, ExportDataButton, FilterButton, QuickSearch } from "@palmyralabs/rt-forms-mantine";
import { ITemplateGridControlConfig, SummaryGridPluginOptions } from "../Types";
import { Button } from "@mantine/core";

const countActiveFilters = (filters?: Record<string, any>) =>
    filters ? Object.values(filters).filter((v) => v !== undefined && v !== null && v !== '').length : 0;

const isAddVisible = (pluginOptions: ITemplateGridControlConfig) =>
    pluginOptions.addVisible !== false
    && (!pluginOptions.aclCode || !pluginOptions.aclCheck || pluginOptions.aclCheck(pluginOptions.aclCode));

const SummaryGridControls = (props: SummaryGridPluginOptions) => {
    const { getPluginOptions, ...o } = props;
    const pluginOptions = (getPluginOptions ? getPluginOptions() : {}) as ITemplateGridControlConfig;

    const columnChooser = pluginOptions.columnChooser || {};
    const showColumnChooser = columnChooser.visible !== false
        && Array.isArray(o.columns) && o.columns.length > 0;

    const exportOption = pluginOptions.exportFormats || o.exportOptions || { csv: 'CSV' };
    const addVisible = isAddVisible(pluginOptions);
    const handleAdd = pluginOptions.onNewClick || (() => props.newRecord());
    const activeFilters = countActiveFilters(pluginOptions.filters);

    return (<>
        {pluginOptions.filterField}
        {o.quickSearch && <QuickSearch width="200" queryRef={o.queryRef}
            columns={o.columns} {...pluginOptions.quickSearch} />}
        <FilterButton {...o} />
        {activeFilters > 0 && pluginOptions.onClearFilters &&
            <Button variant="subtle" className="py-reset-button" onClick={pluginOptions.onClearFilters}>
                Clear filters ({activeFilters})
            </Button>}
        {showColumnChooser && <ColumnChooserButton columns={o.columns}
            tableRef={(o as any).tableRef}
            title={columnChooser.title} ungroupedLabel={columnChooser.ungroupedLabel}
            width={columnChooser.width} />}
        <ExportDataButton exportOption={exportOption}
            visible={pluginOptions.export?.visible} disabled={pluginOptions.export?.disabled}
            queryRef={o.queryRef} {...pluginOptions.export} />
        {pluginOptions.customBtn}
        {addVisible && <Button onClick={handleAdd}
            {...pluginOptions.add} className="py-action-button">
            {pluginOptions.addText || 'Add'}
        </Button>}
    </>);
}

export { SummaryGridControls }
