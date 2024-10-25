import { jsx as a, jsxs as n } from "react/jsx-runtime";
import { useState as g, useRef as N } from "react";
import { useNavigate as b } from "react-router-dom";
import { toast as c } from "react-toastify";
import { PalmyraEditForm as v } from "@palmyralabs/rt-forms";
import { Button as l } from "@mantine/core";
import { F as p } from "../../../chunks/index2.js";
import { I as D } from "../../../chunks/index.js";
function E(e) {
  const m = b(), [s, d] = g(!1), r = N(), f = e.id, h = e.pageName, u = () => {
    c.error("Something went wrong Please try again later.. ");
  }, i = () => {
    r.current.saveData().then((o) => {
      o && (e.successMsg && c.success(e.successMsg), m("../" + h));
    }).catch((o) => {
      o.response && o.response.status === 500 && u();
    });
  }, y = (t) => (e.onDataRefresh && e.onDataRefresh(t), t);
  return /* @__PURE__ */ a("div", { className: "py-form-container", children: /* @__PURE__ */ n("form", { onKeyDown: (t) => {
    t.ctrlKey && t.key === "s" && (t.preventDefault(), s && i());
  }, children: [
    /* @__PURE__ */ n("div", { className: "py-form-header-container", children: [
      /* @__PURE__ */ a("div", { children: e.title }),
      /* @__PURE__ */ n("div", { className: "py-form-header-button-container", children: [
        /* @__PURE__ */ a(
          l,
          {
            className: "py-cancel-filled-button",
            onClick: () => window.history.back(),
            leftSection: /* @__PURE__ */ a(D, { className: "py-button-icon" }),
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ n(
          l,
          {
            disabled: !s,
            className: s ? "py-filled-button" : "py-disabled-button",
            onClick: i,
            leftSection: /* @__PURE__ */ a(p, { className: "py-button-icon" }),
            children: [
              /* @__PURE__ */ a("u", { children: "S" }),
              "ave"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ a(
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
  E as EditForm
};
