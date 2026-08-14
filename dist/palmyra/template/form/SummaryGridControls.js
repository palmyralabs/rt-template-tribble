import { jsxs as s, Fragment as u, jsx as t } from "react/jsx-runtime";
import { QuickSearch as c, FilterButton as a, ColumnChooserButton as m, ExportDataButton as d } from "@palmyralabs/rt-forms-mantine";
import { Button as h } from "@mantine/core";
const C = (n) => {
  const { getPluginOptions: i, ...o } = n, e = i ? i() : {}, r = e.columnChooser || {}, l = r.visible !== !1 && Array.isArray(o.columns) && o.columns.length > 0;
  return /* @__PURE__ */ s(u, { children: [
    o.quickSearch && /* @__PURE__ */ t(
      c,
      {
        width: "200",
        queryRef: o.queryRef,
        columns: o.columns,
        ...e.quickSearch
      }
    ),
    /* @__PURE__ */ t(a, { ...o }),
    l && /* @__PURE__ */ t(
      m,
      {
        columns: o.columns,
        tableRef: o.tableRef,
        title: r.title,
        ungroupedLabel: r.ungroupedLabel,
        width: r.width
      }
    ),
    /* @__PURE__ */ t(
      d,
      {
        exportOption: { csv: "CSV" },
        visible: e.export?.visible,
        disabled: e.export?.disabled,
        queryRef: o.queryRef,
        ...e.export
      }
    ),
    /* @__PURE__ */ t(
      h,
      {
        onClick: () => n.newRecord(),
        ...e.add,
        className: "py-action-button",
        children: "Add"
      }
    )
  ] });
};
export {
  C as SummaryGridControls
};
