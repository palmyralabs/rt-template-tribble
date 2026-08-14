import { jsxs as C, jsx as m } from "react/jsx-runtime";
import { useRef as u, useEffect as D } from "react";
import { topic as t } from "@palmyralabs/ts-utils";
import { PalmyraGrid as v } from "@palmyralabs/rt-forms-mantine";
import { SummaryDialogForm as y } from "./SummaryDialogForm.js";
import { SummaryDrawerForm as N } from "./SummaryDrawerForm.js";
import { PopupGridControls as R } from "./PopupGridControls.js";
import '../../../assets/Layout.css';/* empty css                     */
import { getTitle as S } from "../util/TitleUtil.js";
function q(e) {
  const s = e.pageName + "/viewPage", l = e.pageName + "/newPage", d = e.pageName + "/refresh", f = e.popup || "drawer", a = u(null), o = e.gridRef || u(null);
  D(() => {
    var i = t.subscribe(s, (c, n) => {
      r(n);
    }), b = t.subscribe(d, (c) => {
      o.current && o.current.refresh();
    }), F = t.subscribe(l, (c, n) => {
      r(n);
    });
    return () => {
      t.unsubscribe(i), t.unsubscribe(F), t.unsubscribe(b);
    };
  }, []);
  const g = (i) => {
    r(i);
  }, r = (i) => {
    a.current && a.current.setData(i);
  }, P = e.DataGridControls || R, w = f == "drawer" ? N : y, h = e.disableRowClick ? () => {
  } : g;
  return /* @__PURE__ */ C("div", { className: "py-grid-container", children: [
    /* @__PURE__ */ m(
      v,
      {
        title: S(e.title, "grid"),
        columns: e.columns,
        DataGridControlProps: { setFormData: r },
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
        ref: o,
        customizer: e.customizer,
        quickSearch: e.quickSearch,
        showFooter: e.showFooter
      }
    ),
    /* @__PURE__ */ m(w, { ...e, gridRef: o, ref: a })
  ] });
}
export {
  q as SummaryPopupGrid
};
