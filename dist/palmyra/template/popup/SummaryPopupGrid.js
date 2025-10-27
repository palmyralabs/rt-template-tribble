import { jsxs as D, jsx as m } from "react/jsx-runtime";
import { useRef as s, useEffect as v } from "react";
import { topic as t } from "@palmyralabs/ts-utils";
import { PalmyraGrid as y } from "@palmyralabs/rt-forms-mantine";
import { SummaryDialogForm as F } from "./SummaryDialogForm.js";
import { SummaryDrawerForm as N } from "./SummaryDrawerForm.js";
import { PopupGridControls as R } from "./PopupGridControls.js";
import '../../../assets/Layout.css';/* empty css                     */
import { getTitle as S } from "../util/TitleUtil.js";
function j(e) {
  const u = e.pageName + "/viewPage", l = e.pageName + "/newPage", d = e.pageName + "/refresh", f = e.popup || "drawer", a = s(null), o = e.gridRef || s(null);
  v(() => {
    var i = t.subscribe(u, (c, n) => {
      r(n);
    }), h = t.subscribe(d, (c) => {
      o.current && o.current.refresh();
    }), C = t.subscribe(l, (c, n) => {
      r(n);
    });
    return () => {
      t.unsubscribe(i), t.unsubscribe(C), t.unsubscribe(h);
    };
  }, []);
  const g = (i) => {
    r(i);
  }, r = (i) => {
    a.current && a.current.setData(i);
  }, P = e.DataGridControls || R, w = f == "drawer" ? N : F, b = e.disableRowClick ? () => {
  } : g;
  return /* @__PURE__ */ D("div", { className: "py-grid-container", children: [
    /* @__PURE__ */ m(
      y,
      {
        title: S(e.title, "grid"),
        columns: e.columns,
        DataGridControlProps: { setFormData: r },
        pagination: e.pagination,
        onDataChange: e.onDataChange,
        lsKey: e.lsKey,
        DataGridControls: P,
        onRowClick: b,
        defaultParams: e.defaultParams,
        endPoint: e.options.endPoint,
        endPointOptions: e.options.endPointOptions,
        pageSize: e.pageSize,
        ...e.options,
        getPluginOptions: e.getPluginOptions,
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
  j as SummaryPopupGrid
};
