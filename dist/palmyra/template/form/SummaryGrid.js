import { jsx as n } from "react/jsx-runtime";
import { useRef as u } from "react";
import { SummaryGridControls as s } from "./SummaryGridControls.js";
import { useNavigate as f } from "react-router-dom";
import { StringFormat as h } from "@palmyralabs/ts-utils";
import '../../../assets/Layout.css';/* empty css                     */
import { PalmyraGrid as C } from "@palmyralabs/rt-forms-mantine";
import { getTitle as P } from "../util/TitleUtil.js";
function v(i) {
  const t = f(), o = i.idKey || "id", e = i.gridRef || u(null), a = (d) => {
    const m = { id: d[o] }, g = i.clickTo || "view";
    t(h(g + "/{id}", m));
  }, r = () => {
    t("new");
  }, c = i.DataGridControls || s, l = i.disableRowClick ? () => {
  } : a;
  return /* @__PURE__ */ n("div", { className: "py-grid-container", children: /* @__PURE__ */ n(
    C,
    {
      title: P(i.title, "grid"),
      lsKey: i.lsKey,
      columns: i.columns,
      pagination: i.pagination,
      pageSize: i.pageSize,
      getPluginOptions: i.getPluginOptions,
      defaultParams: i.defaultParams,
      DataGridControls: c,
      DataGridControlProps: { newRecord: r },
      endPoint: i.options.endPoint,
      endPointOptions: i.options.endPointOptions,
      onRowClick: l,
      ...i.options,
      onDataChange: i.onDataChange,
      onFetchFailure: i.onFetchFailure,
      ref: e,
      customizer: i.customizer,
      quickSearch: i.quickSearch,
      showFooter: i.showFooter
    }
  ) });
}
export {
  v as SummaryGrid
};
