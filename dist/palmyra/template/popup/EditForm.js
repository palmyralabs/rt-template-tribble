import { jsxs as c, jsx as t } from "react/jsx-runtime";
import { useContext as d } from "react";
import { StoreFactoryContext as l, PalmyraEditForm as s } from "@palmyralabs/rt-forms";
function F(o) {
  const e = d(l), r = o.id, { handleKeyPress: n, setValid: i, formRef: a } = o, m = o.FORMLET;
  return /* @__PURE__ */ c("form", { onKeyDown: n, children: [
    o.customDataSection,
    /* @__PURE__ */ t(
      s,
      {
        onValidChange: i,
        ref: a,
        storeFactory: e,
        ...o.options,
        id: r,
        onQueryFailure: o.onQueryFailure,
        children: /* @__PURE__ */ t(m, {})
      }
    )
  ] });
}
export {
  F as EditForm
};
