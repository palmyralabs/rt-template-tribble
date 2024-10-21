import { jsx as n } from "react/jsx-runtime";
import { useRef as u } from "react";
import { SummaryGridControls as g } from "./SummaryGridControls.js";
import { useNavigate as f } from "react-router-dom";
import { StringFormat as P } from "@palmyralabs/ts-utils";
import '../../../assets/Layout.css';/* empty css                     */
import { PalmyraGrid as C } from "@palmyralabs/rt-forms-mantine";
function v(i) {
  const t = f(), o = i.idKey || "id", e = i.gridRef || u(null), r = (m) => {
    const l = { id: m[o] }, s = i.grid || "view";
    t(P(s + "/{id}", l));
  }, a = () => {
    t("new");
  }, d = i.DataGridControls || g, c = i.disableRowClick ? () => {
  } : r;
  return /* @__PURE__ */ n("div", { className: "py-grid-container", children: /* @__PURE__ */ n(
    C,
    {
      title: i.title,
      columns: i.columns,
      getPluginOptions: i.getPluginOptions,
      defaultParams: i.defaultParams,
      DataGridControls: d,
      DataGridControlProps: { newRecord: a },
      endPoint: i.options.endPoint,
      endPointOptions: i.options.endPointOptions,
      onRowClick: c,
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
