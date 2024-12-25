import { jsxs as C, jsx as m } from "react/jsx-runtime";
import { useRef as s, useEffect as D } from "react";
import { topic as r } from "@palmyralabs/ts-utils";
import { PalmyraGrid as v } from "@palmyralabs/rt-forms-mantine";
import { SummaryDialogForm as N } from "./SummaryDialogForm.js";
import { SummaryDrawerForm as R } from "./SummaryDrawerForm.js";
import { PopupGridControls as S } from "./PopupGridControls.js";
import '../../../assets/Layout.css';/* empty css                     */
import { getTitle as k } from "../util/TitleUtil.js";
function j(e) {
  const u = e.pageName + "/viewPage", l = e.pageName + "/newPage", d = e.pageName + "/refresh", f = e.popup || "drawer", n = s(), t = e.gridRef || s(null);
  D(() => {
    var i = r.subscribe(u, (c, a) => {
      o(a);
    }), p = r.subscribe(d, (c) => {
      t.current && t.current.refresh();
    }), h = r.subscribe(l, (c, a) => {
      o(a);
    });
    return () => {
      r.unsubscribe(i), r.unsubscribe(h), r.unsubscribe(p);
    };
  }, []);
  const g = (i) => {
    o(i);
  }, o = (i) => {
    n.current && n.current.setData(i);
  }, P = e.DataGridControls || S, b = f == "drawer" ? R : N, w = e.disableRowClick ? () => {
  } : g;
  return /* @__PURE__ */ C("div", { className: "py-grid-container", children: [
    /* @__PURE__ */ m(
      v,
      {
        title: k(e.title, "grid"),
        columns: e.columns,
        DataGridControlProps: { setFormData: o },
        DataGridControls: P,
        onRowClick: w,
        defaultParams: e.defaultParams,
        endPoint: e.options.endPoint,
        endPointOptions: e.options.endPointOptions,
        pageSize: e.pageSize,
        ...e.options,
        getPluginOptions: e.getPluginOptions,
        ref: t,
        customizer: e.customizer,
        quickSearch: e.quickSearch
      }
    ),
    /* @__PURE__ */ m(b, { ...e, gridRef: t, ref: n })
  ] });
}
export {
  j as SummaryPopupGrid
};
