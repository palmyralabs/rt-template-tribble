import { jsxs as n, Fragment as c, jsx as o } from "react/jsx-runtime";
import { QuickSearch as s, FilterButton as u, ExportDataButton as l } from "@palmyralabs/rt-forms-mantine";
import { Button as a } from "@mantine/core";
const x = (r) => {
  const { getPluginOptions: i, ...t } = r, e = i ? i() : {};
  return /* @__PURE__ */ n(c, { children: [
    t.quickSearch && /* @__PURE__ */ o(
      s,
      {
        width: "200",
        queryRef: t.queryRef,
        columns: t.columns,
        ...e.quickSearch
      }
    ),
    /* @__PURE__ */ o(u, { ...t }),
    /* @__PURE__ */ o(
      l,
      {
        exportOption: { csv: "CSV" },
        visible: e.export?.visible,
        disabled: e.export?.disabled,
        queryRef: t.queryRef,
        ...e.export
      }
    ),
    /* @__PURE__ */ o(
      a,
      {
        onClick: () => r.newRecord(),
        ...e.add,
        className: "py-action-button",
        children: "Add"
      }
    )
  ] });
};
export {
  x as SummaryGridControls
};
