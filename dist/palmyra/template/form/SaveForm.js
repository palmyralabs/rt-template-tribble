import { jsx as a, jsxs as o } from "react/jsx-runtime";
import { useState as y, useRef as p } from "react";
import { useNavigate as v } from "react-router-dom";
import { toast as N } from "react-toastify";
import { PalmyraEditForm as b } from "@palmyralabs/rt-forms";
import { Button as c } from "@mantine/core";
import { F as g } from "../../../chunks/index2.js";
import { I as D } from "../../../chunks/index.js";
function V(e) {
  const l = v(), [n, m] = y(!1), s = p(), d = e.id, f = e.pageName, h = (t) => (e.onDataRefresh && e.onDataRefresh(t), t), u = () => {
    N.error("Something went wrong Please try again later.. ");
  }, i = () => {
    s.current.saveData().then((r) => {
      l("../" + f);
    }).catch((r) => {
      r.response && r.response.status === 500 && u();
    });
  };
  return /* @__PURE__ */ a("div", { className: "py-form-container", children: /* @__PURE__ */ o("form", { onKeyDown: (t) => {
    t.ctrlKey && t.key === "s" && (t.preventDefault(), n && i());
  }, children: [
    /* @__PURE__ */ o("div", { className: "py-form-header-container", children: [
      /* @__PURE__ */ a("div", { children: e.title }),
      /* @__PURE__ */ o("div", { className: "py-form-header-button-container", children: [
        /* @__PURE__ */ a(
          c,
          {
            className: "py-cancel-filled-button",
            onClick: () => window.history.back(),
            leftSection: /* @__PURE__ */ a(D, { className: "py-button-icon" }),
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ o(
          c,
          {
            disabled: !n,
            className: n ? "py-filled-button" : "py-disabled-button",
            onClick: i,
            leftSection: /* @__PURE__ */ a(g, { className: "py-button-icon" }),
            children: [
              /* @__PURE__ */ a("u", { children: "S" }),
              "ave"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ a(
      b,
      {
        mode: "save",
        id: d,
        ...e.options,
        onQueryData: h,
        onValidChange: m,
        ref: s,
        children: e.children
      }
    )
  ] }) });
}
export {
  V as SaveForm
};
