import { jsx as o } from "react/jsx-runtime";
import { useRef as s } from "react";
import { SummaryGridControls as u } from "./SummaryGridControls.js";
import { useNavigate as f } from "react-router-dom";
import { StringFormat as C } from "@palmyralabs/ts-utils";
import '../../../assets/Layout.css';/* empty css                     */
import { PalmyraGrid as P } from "@palmyralabs/rt-forms-mantine";
import { getTitle as w } from "../util/TitleUtil.js";
function z(i) {
  const t = f(), n = i.idKey || "id", e = i.gridRef || s(null), a = (m) => {
    const l = { id: m[n] }, g = i.clickTo || "view";
    t(C(g + "/{id}", l));
  }, r = () => {
    t("new");
  }, c = i.DataGridControls || u, d = i.disableRowClick ? () => {
  } : a;
  return /* @__PURE__ */ o("div", { className: "py-grid-container", children: /* @__PURE__ */ o(
    P,
    {
      title: w(i.title, "grid"),
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
      onRowClick: d,
      ...i.options,
      onDataChange: i.onDataChange,
      ref: e,
      customizer: i.customizer,
      quickSearch: i.quickSearch,
      showFooter: i.showFooter
    }
  ) });
}
export {
  z as SummaryGrid
};
