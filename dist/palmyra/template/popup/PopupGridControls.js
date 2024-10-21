import { jsxs as c, Fragment as u, jsx as e } from "react/jsx-runtime";
import { QuickSearch as a, FilterButton as l, ExportDataButton as p } from "@palmyralabs/rt-forms-mantine";
import { Button as d } from "@mantine/core";
const h = (r) => {
  var n, s;
  const { getPluginOptions: i, ...t } = r, o = i ? i() : {};
  return /* @__PURE__ */ c(u, { children: [
    t.quickSearch && /* @__PURE__ */ e(
      a,
      {
        width: "200",
        queryRef: t.queryRef,
        columns: t.columns,
        ...o.quickSearch
      }
    ),
    /* @__PURE__ */ e(l, { ...t }),
    /* @__PURE__ */ e(
      p,
      {
        exportOption: { csv: "CSV" },
        visible: (n = o.export) == null ? void 0 : n.visible,
        disabled: (s = o.export) == null ? void 0 : s.disabled,
        queryRef: t.queryRef,
        ...o.export
      }
    ),
    /* @__PURE__ */ e(
      d,
      {
        className: "py-action-button",
        onClick: () => r.setFormData({}),
        ...o.add,
        children: "Add"
      }
    )
  ] });
};
export {
  h as PopupGridControls
};
