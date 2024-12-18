import { jsx as r } from "react/jsx-runtime";
import { AsyncTreeMenu as n, SimpleIconProvider as t } from "@palmyralabs/rt-forms";
import '../../../assets/DynamicMenu.css';const v = (e) => {
  const { treeStore: o, iconProvider: i } = e;
  return /* @__PURE__ */ r("div", { style: { width: "100%" }, children: /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(n, { store: o, iconProvider: i || t }) }) });
};
export {
  v as default
};
