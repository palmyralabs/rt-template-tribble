import { ColumnChooserButton, ExportDataButton, FilterButton, IDataGridDefaultControlConfig, QuickSearch } from "@palmyralabs/rt-forms-mantine";
import { SummaryGridPluginOptions } from "../Types";
import { Button } from "@mantine/core";


const SummaryGridControls = (props: SummaryGridPluginOptions) => {
    const { getPluginOptions, ...o } = props;
    const pluginOptions: IDataGridDefaultControlConfig = getPluginOptions ? getPluginOptions() : {};

    const columnChooser = pluginOptions.columnChooser || {};
    const showColumnChooser = columnChooser.visible !== false
        && Array.isArray(o.columns) && o.columns.length > 0;

    return (<>
        {o.quickSearch && <QuickSearch width="200" queryRef={o.queryRef}
            columns={o.columns} {...pluginOptions.quickSearch} />}
        <FilterButton {...o} />
        {showColumnChooser && <ColumnChooserButton columns={o.columns}
            tableRef={(o as any).tableRef}
            title={columnChooser.title} ungroupedLabel={columnChooser.ungroupedLabel}
            width={columnChooser.width} />}
        <ExportDataButton exportOption={{ csv: 'CSV' }}
            visible={pluginOptions.export?.visible} disabled={pluginOptions.export?.disabled}
            queryRef={o.queryRef} {...pluginOptions.export} />
        <Button onClick={() => props.newRecord()}
            {...pluginOptions.add} className="py-action-button">
            Add
        </Button>
    </>);
}

export { SummaryGridControls }