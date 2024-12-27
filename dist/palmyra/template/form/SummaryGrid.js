import { jsx as n } from "react/jsx-runtime";
import { useRef as s } from "react";
import { SummaryGridControls as u } from "./SummaryGridControls.js";
import { useNavigate as f } from "react-router-dom";
import { StringFormat as P } from "@palmyralabs/ts-utils";
import '../../../assets/Layout.css';/* empty css                     */
import { PalmyraGrid as C } from "@palmyralabs/rt-forms-mantine";
import { getTitle as k } from "../util/TitleUtil.js";
function O(i) {
  const t = f(), o = i.idKey || "id", e = i.gridRef || s(null), a = (m) => {
    const l = { id: m[o] }, g = i.clickTo || "view";
    t(P(g + "/{id}", l));
  }, r = () => {
    t("new");
  }, c = i.DataGridControls || u, d = i.disableRowClick ? () => {
  } : a;
  return /* @__PURE__ */ n("div", { className: "py-grid-container", children: /* @__PURE__ */ n(
    C,
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
      ref: e,
      customizer: i.customizer,
      quickSearch: i.quickSearch
    }
  ) });
}
export {
  O as SummaryGrid
};
