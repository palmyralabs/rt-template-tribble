import { jsx as o } from "react/jsx-runtime";
import { useRef as u } from "react";
import { SummaryGridControls as f } from "./SummaryGridControls.js";
import { useNavigate as g } from "react-router-dom";
import { StringFormat as P } from "@palmyralabs/ts-utils";
import '../../../assets/Layout.css';/* empty css                     */
import { PalmyraGrid as C } from "@palmyralabs/rt-forms-mantine";
function v(i) {
  const t = g(), n = i.idKey || "id", e = i.gridRef || u(null), r = (m) => {
    const l = { id: m[n] }, s = i.clickTo || "view";
    t(P(s + "/{id}", l));
  }, a = () => {
    t("new");
  }, c = i.DataGridControls || f, d = i.disableRowClick ? () => {
  } : r;
  return /* @__PURE__ */ o("div", { className: "py-grid-container", children: /* @__PURE__ */ o(
    C,
    {
      title: i.title,
      columns: i.columns,
      getPluginOptions: i.getPluginOptions,
      defaultParams: i.defaultParams,
      DataGridControls: c,
      DataGridControlProps: { newRecord: a },
      endPoint: i.options.endPoint,
      endPointOptions: i.options.endPointOptions,
      onRowClick: d,
      pageSize: i.pageSize,
      ...i.options,
      ref: e,
      customizer: i.customizer,
      quickSearch: i.quickSearch
    }
  ) });
}
export {
  v as SummaryGrid
};
