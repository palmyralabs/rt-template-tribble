import { jsx as n } from "react/jsx-runtime";
import { useRef as u } from "react";
import { SummaryGridControls as f } from "./SummaryGridControls.js";
import { useNavigate as s } from "react-router-dom";
import { StringFormat as P } from "@palmyralabs/ts-utils";
import '../../../assets/Layout.css';/* empty css                     */
import { PalmyraGrid as h } from "@palmyralabs/rt-forms-mantine";
import { getTitle as C } from "../util/TitleUtil.js";
function D(i) {
  const t = s(), e = i.idKey || "id", o = i.gridRef || u(null), a = (d) => {
    const m = { id: d[e] }, g = i.clickTo || "view";
    t(P(g + "/{id}", m));
  }, r = () => {
    t("new");
  }, l = i.DataGridControls || f, c = i.disableRowClick ? () => {
  } : a;
  return /* @__PURE__ */ n("div", { className: "py-grid-container", children: /* @__PURE__ */ n(
    h,
    {
      title: C(i.title, "grid"),
      lsKey: i.lsKey,
      columns: i.columns,
      pagination: i.pagination,
      pageSize: i.pageSize,
      getPluginOptions: i.getPluginOptions,
      defaultParams: i.defaultParams,
      DataGridControls: l,
      DataGridControlProps: { newRecord: r },
      endPoint: i.options.endPoint,
      endPointOptions: i.options.endPointOptions,
      onRowClick: c,
      ...i.options,
      onDataChange: i.onDataChange,
      onFetchFailure: i.onFetchFailure,
      initParams: i.filter ? { filter: i.filter } : void 0,
      ref: o,
      customizer: i.customizer,
      quickSearch: i.quickSearch,
      showFooter: i.showFooter
    }
  ) });
}
export {
  D as SummaryGrid
};
