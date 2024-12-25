import { jsxs as c, jsx as o } from "react/jsx-runtime";
import { useContext as s } from "react";
import { StoreFactoryContext as l, PalmyraNewForm as f } from "@palmyralabs/rt-forms";
function y(t) {
  const e = s(l), { handleKeyPress: n, setValid: r, formRef: i } = t, a = t.initialData || {}, m = t.FORMLET;
  return /* @__PURE__ */ c("form", { onKeyDown: n, children: [
    t.customDataSection,
    /* @__PURE__ */ o(
      f,
      {
        onValidChange: r,
        ref: i,
        storeFactory: e,
        ...t.options,
        initialData: a,
        children: /* @__PURE__ */ o(m, {})
      }
    )
  ] });
}
export {
  y as NewForm
};
