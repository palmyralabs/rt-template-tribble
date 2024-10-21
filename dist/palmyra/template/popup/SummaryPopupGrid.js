import { jsxs as D, jsx as m } from "react/jsx-runtime";
import { useRef as s, useEffect as v } from "react";
import { topic as r } from "@palmyralabs/ts-utils";
import { PalmyraGrid as N } from "@palmyralabs/rt-forms-mantine";
import { SummaryDialogForm as R } from "./SummaryDialogForm.js";
import { SummaryDrawerForm as S } from "./SummaryDrawerForm.js";
import { PopupGridControls as k } from "./PopupGridControls.js";
import '../../../assets/Layout.css';/* empty css                     */
function _(e) {
  const u = e.pageName + "/viewPage", l = e.pageName + "/newPage", d = e.pageName + "/refresh", f = e.title, g = e.popup || "drawer", n = s(), i = e.gridRef || s(null);
  v(() => {
    var t = r.subscribe(u, (c, a) => {
      o(a);
    }), p = r.subscribe(d, (c) => {
      i.current && i.current.refresh();
    }), C = r.subscribe(l, (c, a) => {
      o(a);
    });
    return () => {
      r.unsubscribe(t), r.unsubscribe(C), r.unsubscribe(p);
    };
  }, []);
  const P = (t) => {
    o(t);
  }, o = (t) => {
    n.current && n.current.setData(t);
  }, b = e.DataGridControls || k, w = g == "drawer" ? S : R, h = e.disableRowClick ? () => {
  } : P;
  return /* @__PURE__ */ D("div", { className: "py-grid-container", children: [
    /* @__PURE__ */ m(
      N,
      {
        title: f,
        columns: e.columns,
        DataGridControlProps: { setFormData: o },
        DataGridControls: b,
        onRowClick: h,
        defaultParams: e.defaultParams,
        endPoint: e.options.endPoint,
        endPointOptions: e.options.endPointOptions,
        pageSize: e.pageSize,
        ...e.options,
        getPluginOptions: e.getPluginOptions,
        ref: i,
        customizer: e.customizer,
        quickSearch: e.quickSearch
      }
    ),
    /* @__PURE__ */ m(w, { ...e, gridRef: i, ref: n })
  ] });
}
export {
  _ as SummaryPopupGrid
};
