import { jsx as t } from "react/jsx-runtime";
import { useContext as c } from "react";
import { StoreFactoryContext as l, PalmyraNewForm as f } from "@palmyralabs/rt-forms";
function y(o) {
  const e = c(l), { handleKeyPress: n, setValid: r, formRef: i } = o, a = o.initialData || {}, m = o.FORMLET;
  return /* @__PURE__ */ t("form", { onKeyDown: n, children: /* @__PURE__ */ t(
    f,
    {
      onValidChange: r,
      ref: i,
      storeFactory: e,
      ...o.options,
      initialData: a,
      children: /* @__PURE__ */ t(m, {})
    }
  ) });
}
export {
  y as NewForm
};
