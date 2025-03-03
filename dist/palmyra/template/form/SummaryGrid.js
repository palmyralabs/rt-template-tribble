import { jsx as n } from "react/jsx-runtime";
import { useRef as u } from "react";
import { SummaryGridControls as s } from "./SummaryGridControls.js";
import { useNavigate as f } from "react-router-dom";
import { StringFormat as C } from "@palmyralabs/ts-utils";
import '../../../assets/Layout.css';/* empty css                     */
import { PalmyraGrid as P } from "@palmyralabs/rt-forms-mantine";
import { getTitle as k } from "../util/TitleUtil.js";
function z(i) {
  const t = f(), o = i.idKey || "id", e = i.gridRef || u(null), a = (m) => {
    const l = { id: m[o] }, g = i.clickTo || "view";
    t(C(g + "/{id}", l));
  }, r = () => {
    t("new");
  }, c = i.DataGridControls || s, d = i.disableRowClick ? () => {
  } : a;
  return /* @__PURE__ */ n("div", { className: "py-grid-container", children: /* @__PURE__ */ n(
    P,
    {
      title: k(i.title, "grid"),
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
      quickSearch: i.quickSearch
    }
  ) });
}
export {
  z as SummaryGrid
};
