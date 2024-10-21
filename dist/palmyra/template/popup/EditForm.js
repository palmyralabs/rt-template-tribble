import { jsx as r } from "react/jsx-runtime";
import { useContext as d } from "react";
import { StoreFactoryContext as c, PalmyraEditForm as l } from "@palmyralabs/rt-forms";
function y(o) {
  const e = d(c), t = o.id, { handleKeyPress: n, setValid: i, formRef: m } = o, a = o.FORMLET;
  return /* @__PURE__ */ r("form", { onKeyDown: n, children: /* @__PURE__ */ r(
    l,
    {
      onValidChange: i,
      ref: m,
      storeFactory: e,
      ...o.options,
      id: t,
      onQueryFailure: o.onQueryFailure,
      children: /* @__PURE__ */ r(a, {})
    }
  ) });
}
export {
  y as EditForm
};
