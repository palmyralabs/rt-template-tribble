import { jsx as r, jsxs as a } from "react/jsx-runtime";
import { useState as N, useRef as p } from "react";
import { useNavigate as g } from "react-router-dom";
import { toast as o } from "react-toastify";
import { PalmyraNewForm as b } from "@palmyralabs/rt-forms";
import { Button as l } from "@mantine/core";
import { I as v } from "../../../chunks/index.js";
import { F as w } from "../../../chunks/index2.js";
function E(t) {
  const m = g(), [s, d] = N(!1), n = p(), f = t.initialData || {}, h = t.pageName, i = t.errorText, u = () => {
    o.error("Something went wrong Please try again later.. ");
  }, y = () => {
    i ? o.error(i) : o.error("Data Already Exit");
  }, c = () => {
    n.current.saveData().then((e) => {
      if (e)
        return t.successMsg && o.success(t.successMsg), m("../" + h);
    }).catch((e) => {
      e.response && e.response.status === 400 ? y() : e.response && e.response.status === 500 && u();
    });
  };
  return /* @__PURE__ */ r("div", { className: "py-form-container", children: /* @__PURE__ */ a("form", { onKeyDown: (e) => {
    e.ctrlKey && e.key === "s" && (e.preventDefault(), s && c());
  }, children: [
    /* @__PURE__ */ a("div", { className: "py-form-header-container", children: [
      /* @__PURE__ */ r("div", { children: t.title }),
      /* @__PURE__ */ a("div", { className: "py-form-header-button-container", children: [
        /* @__PURE__ */ r(
          l,
          {
            className: "py-cancel-filled-button",
            onClick: () => window.history.back(),
            leftSection: /* @__PURE__ */ r(v, { className: "py-button-icon" }),
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ a(
          l,
          {
            disabled: !s,
            className: s ? "py-filled-button" : "py-disabled-button",
            onClick: c,
            leftSection: /* @__PURE__ */ r(w, { className: "py-button-icon" }),
            children: [
              /* @__PURE__ */ r("u", { children: "S" }),
              "ave"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ r(
      b,
      {
        onValidChange: d,
        ...t.options,
        ref: n,
        initialData: f,
        children: t.children
      }
    )
  ] }) });
}
export {
  E as NewForm
};
