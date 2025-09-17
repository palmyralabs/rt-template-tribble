import { jsxs as n, Fragment as s, jsx as e } from "react/jsx-runtime";
import { QuickSearch as c, FilterButton as u, ExportDataButton as a } from "@palmyralabs/rt-forms-mantine";
import { Button as l } from "@mantine/core";
const x = (r) => {
  const { getPluginOptions: i, ...t } = r, o = i ? i() : {};
  return /* @__PURE__ */ n(s, { children: [
    t.quickSearch && /* @__PURE__ */ e(
      c,
      {
        width: "200",
        queryRef: t.queryRef,
        columns: t.columns,
        ...o.quickSearch
      }
    ),
    /* @__PURE__ */ e(u, { ...t }),
    /* @__PURE__ */ e(
      a,
      {
        exportOption: { csv: "CSV" },
        visible: o.export?.visible,
        disabled: o.export?.disabled,
        queryRef: t.queryRef,
        ...o.export
      }
    ),
    /* @__PURE__ */ e(
      l,
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
  x as PopupGridControls
};
