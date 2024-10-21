import { jsxs as s, Fragment as u, jsx as o } from "react/jsx-runtime";
import { QuickSearch as l, FilterButton as a, ExportDataButton as d } from "@palmyralabs/rt-forms-mantine";
import { Button as m } from "@mantine/core";
const h = (r) => {
  var n, c;
  const { getPluginOptions: i, ...t } = r, e = i ? i() : {};
  return /* @__PURE__ */ s(u, { children: [
    t.quickSearch && /* @__PURE__ */ o(
      l,
      {
        width: "200",
        queryRef: t.queryRef,
        columns: t.columns,
        ...e.quickSearch
      }
    ),
    /* @__PURE__ */ o(a, { ...t }),
    /* @__PURE__ */ o(
      d,
      {
        exportOption: { csv: "CSV" },
        visible: (n = e.export) == null ? void 0 : n.visible,
        disabled: (c = e.export) == null ? void 0 : c.disabled,
        queryRef: t.queryRef,
        ...e.export
      }
    ),
    /* @__PURE__ */ o(
      m,
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
  h as SummaryGridControls
};
