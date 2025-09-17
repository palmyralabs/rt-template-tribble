import { jsxs as D, jsx as m } from "react/jsx-runtime";
import { useRef as u, useEffect as v } from "react";
import { topic as i } from "@palmyralabs/ts-utils";
import { PalmyraGrid as y } from "@palmyralabs/rt-forms-mantine";
import { SummaryDialogForm as N } from "./SummaryDialogForm.js";
import { SummaryDrawerForm as R } from "./SummaryDrawerForm.js";
import { PopupGridControls as S } from "./PopupGridControls.js";
import '../../../assets/Layout.css';/* empty css                     */
import { getTitle as k } from "../util/TitleUtil.js";
function j(e) {
  const s = e.pageName + "/viewPage", l = e.pageName + "/newPage", d = e.pageName + "/refresh", f = e.popup || "drawer", n = u(null), r = e.gridRef || u(null);
  v(() => {
    var t = i.subscribe(s, (c, o) => {
      a(o);
    }), h = i.subscribe(d, (c) => {
      r.current && r.current.refresh();
    }), C = i.subscribe(l, (c, o) => {
      a(o);
    });
    return () => {
      i.unsubscribe(t), i.unsubscribe(C), i.unsubscribe(h);
    };
  }, []);
  const g = (t) => {
    a(t);
  }, a = (t) => {
    n.current && n.current.setData(t);
  }, P = e.DataGridControls || S, b = f == "drawer" ? R : N, w = e.disableRowClick ? () => {
  } : g;
  return /* @__PURE__ */ D("div", { className: "py-grid-container", children: [
    /* @__PURE__ */ m(
      y,
      {
        title: k(e.title, "grid"),
        columns: e.columns,
        DataGridControlProps: { setFormData: a },
        pagination: e.pagination,
        onDataChange: e.onDataChange,
        lsKey: e.lsKey,
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
