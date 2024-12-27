import { jsxs as C, jsx as m } from "react/jsx-runtime";
import { useRef as s, useEffect as D } from "react";
import { topic as i } from "@palmyralabs/ts-utils";
import { PalmyraGrid as v } from "@palmyralabs/rt-forms-mantine";
import { SummaryDialogForm as N } from "./SummaryDialogForm.js";
import { SummaryDrawerForm as R } from "./SummaryDrawerForm.js";
import { PopupGridControls as S } from "./PopupGridControls.js";
import '../../../assets/Layout.css';/* empty css                     */
import { getTitle as k } from "../util/TitleUtil.js";
function j(e) {
  const u = e.pageName + "/viewPage", l = e.pageName + "/newPage", d = e.pageName + "/refresh", f = e.popup || "drawer", n = s(), r = e.gridRef || s(null);
  D(() => {
    var t = i.subscribe(u, (c, a) => {
      o(a);
    }), p = i.subscribe(d, (c) => {
      r.current && r.current.refresh();
    }), h = i.subscribe(l, (c, a) => {
      o(a);
    });
    return () => {
      i.unsubscribe(t), i.unsubscribe(h), i.unsubscribe(p);
    };
  }, []);
  const g = (t) => {
    o(t);
  }, o = (t) => {
    n.current && n.current.setData(t);
  }, P = e.DataGridControls || S, b = f == "drawer" ? R : N, w = e.disableRowClick ? () => {
  } : g;
  return /* @__PURE__ */ C("div", { className: "py-grid-container", children: [
    /* @__PURE__ */ m(
      v,
      {
        title: k(e.title, "grid"),
        columns: e.columns,
        DataGridControlProps: { setFormData: o },
        pagination: e.pagination,
        DataGridControls: P,
        onRowClick: w,
        defaultParams: e.defaultParams,
        endPoint: e.options.endPoint,
        endPointOptions: e.options.endPointOptions,
        pageSize: e.pageSize,
        ...e.options,
        getPluginOptions: e.getPluginOptions,
        ref: r,
        customizer: e.customizer,
        quickSearch: e.quickSearch
      }
    ),
    /* @__PURE__ */ m(b, { ...e, gridRef: r, ref: n })
  ] });
}
export {
  j as SummaryPopupGrid
};
