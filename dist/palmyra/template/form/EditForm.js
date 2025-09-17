import { jsx as o, jsxs as n } from "react/jsx-runtime";
import { useState as g, useRef as N } from "react";
import { useNavigate as b } from "react-router-dom";
import { toast as c } from "react-toastify";
import { PalmyraEditForm as v } from "@palmyralabs/rt-forms";
import { Button as l } from "@mantine/core";
import { F as p } from "../../../chunks/index2.js";
import { I as D } from "../../../chunks/index.js";
import { getTitle as w } from "../util/TitleUtil.js";
function V(e) {
  const m = b(), [s, d] = g(!1), r = N(null), f = e.id, h = e.pageName, u = () => {
    c.error("Something went wrong Please try again later.. ");
  }, i = () => {
    r.current.saveData().then((a) => {
      a && (e.successMsg && c.success(e.successMsg), m("../" + h));
    }).catch((a) => {
      a.response && a.response.status === 500 && u();
    });
  }, y = (t) => (e.onDataRefresh && e.onDataRefresh(t), t);
  return /* @__PURE__ */ o("div", { className: "py-form-container", children: /* @__PURE__ */ n("form", { onKeyDown: (t) => {
    t.ctrlKey && t.key === "s" && (t.preventDefault(), s && i());
  }, children: [
    /* @__PURE__ */ n("div", { className: "py-form-header-container", children: [
      /* @__PURE__ */ o("div", { children: w(e.title, "edit") }),
      /* @__PURE__ */ n("div", { className: "py-form-header-button-container", children: [
        /* @__PURE__ */ o(
          l,
          {
            className: "py-cancel-filled-button",
            onClick: () => window.history.back(),
            leftSection: /* @__PURE__ */ o(D, { className: "py-button-icon" }),
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ n(
          l,
          {
            disabled: !s,
            className: s ? "py-filled-button" : "py-disabled-button",
            onClick: i,
            leftSection: /* @__PURE__ */ o(p, { className: "py-button-icon" }),
            children: [
              /* @__PURE__ */ o("u", { children: "S" }),
              "ave"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ o(
      v,
      {
        mode: "edit",
        id: f,
        ...e.options,
        onQueryData: y,
        onValidChange: d,
        ref: r,
        children: e.children
      }
    )
  ] }) });
}
export {
  V as EditForm
};
