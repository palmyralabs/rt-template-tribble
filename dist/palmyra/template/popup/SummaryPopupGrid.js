import { jsxs as C, jsx as m } from "react/jsx-runtime";
import { useRef as u, useEffect as D } from "react";
import { topic as i } from "@palmyralabs/ts-utils";
import { PalmyraGrid as v } from "@palmyralabs/rt-forms-mantine";
import { SummaryDialogForm as y } from "./SummaryDialogForm.js";
import { SummaryDrawerForm as N } from "./SummaryDrawerForm.js";
import { PopupGridControls as R } from "./PopupGridControls.js";
import '../../../assets/Layout.css';/* empty css                     */
import { getTitle as S } from "../util/TitleUtil.js";
function q(e) {
  const l = e.pageName + "/viewPage", s = e.pageName + "/newPage", f = e.pageName + "/refresh", d = e.popup || "drawer", a = u(null), r = e.gridRef || u(null);
  D(() => {
    var t = i.subscribe(l, (c, n) => {
      o(n);
    }), b = i.subscribe(f, (c) => {
      r.current && r.current.refresh();
    }), F = i.subscribe(s, (c, n) => {
      o(n);
    });
    return () => {
      i.unsubscribe(t), i.unsubscribe(F), i.unsubscribe(b);
    };
  }, []);
  const g = (t) => {
    o(t);
  }, o = (t) => {
    a.current && a.current.setData(t);
  }, P = e.DataGridControls || R, w = d == "drawer" ? N : y, h = e.disableRowClick ? () => {
  } : g;
  return /* @__PURE__ */ C("div", { className: "py-grid-container", children: [
    /* @__PURE__ */ m(
      v,
      {
        title: S(e.title, "grid"),
        columns: e.columns,
        DataGridControlProps: { setFormData: o },
        pagination: e.pagination,
        onDataChange: e.onDataChange,
        lsKey: e.lsKey,
        DataGridControls: P,
        onRowClick: h,
        defaultParams: e.defaultParams,
        endPoint: e.options.endPoint,
        endPointOptions: e.options.endPointOptions,
        pageSize: e.pageSize,
        ...e.options,
        getPluginOptions: e.getPluginOptions,
        onFetchFailure: e.onFetchFailure,
        initParams: e.filter ? { filter: e.filter } : void 0,
        ref: r,
        customizer: e.customizer,
        quickSearch: e.quickSearch,
        showFooter: e.showFooter
      }
    ),
    /* @__PURE__ */ m(w, { ...e, gridRef: r, ref: a })
  ] });
}
export {
  q as SummaryPopupGrid
};
