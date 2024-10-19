import { ExportDataButton, FilterButton, IDataGridDefaultControlConfig, QuickSearch } from "@palmyralabs/rt-forms-mantine";

import { PopupGridPluginOptions } from "../Types";
import { Button } from "@mantine/core";

const PopupGridControls = (props: PopupGridPluginOptions) => {
    const { getPluginOptions, ...o } = props;
    const pluginOptions: IDataGridDefaultControlConfig = getPluginOptions ? getPluginOptions() : {};

    return (<>
        {o.quickSearch && <QuickSearch width="200" queryRef={o.queryRef}
            columns={o.columns} {...pluginOptions.quickSearch} />}
        <FilterButton {...o} />
        <ExportDataButton exportOption={{ csv: 'CSV' }}
            visible={pluginOptions.export?.visible} disabled={pluginOptions.export?.disabled}
            queryRef={o.queryRef} {...pluginOptions.export} />
        <Button className="py-action-button" onClick={() => props.setFormData({})}
            {...pluginOptions.add}>Add</Button>
    </>);
}

export { PopupGridControls }