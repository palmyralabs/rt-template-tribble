import { jsxs as s, jsx as r } from "react/jsx-runtime";
import { QuickSearch as u, FilterButton as c, ExportDataButton as a } from "@palmyralabs/rt-forms-mantine";
import { Button as d } from "@mantine/core";
import { useEffect as m } from "react";
import { handlekeyPress as l } from "../util/handlekeyPress.js";
const k = (o) => {
  const { getPluginOptions: n, ...e } = o, t = n ? n() : {};
  return m(() => {
    const i = l(() => o.setFormData({}), "n", { alt: !0 });
    return document.addEventListener("keydown", i), () => document.removeEventListener("keydown", i);
  }, [o.setFormData]), /* @__PURE__ */ s("div", { children: [
    e.quickSearch && /* @__PURE__ */ r(
      u,
      {
        width: "200",
        queryRef: e.queryRef,
        columns: e.columns,
        ...t.quickSearch
      }
    ),
    /* @__PURE__ */ r(c, { ...e }),
    /* @__PURE__ */ r(
      a,
      {
        exportOption: { csv: "CSV" },
        visible: t.export?.visible,
        disabled: t.export?.disabled,
        queryRef: e.queryRef,
        ...t.export
      }
    ),
    /* @__PURE__ */ r(
      d,
      {
        className: "py-action-button",
        onClick: () => o.setFormData({}),
        ...t.add,
        children: "Add"
      }
    )
  ] });
};
export {
  k as PopupGridControls
};
