import { jsx as r, jsxs as o } from "react/jsx-runtime";
import { useState as p, useRef as N } from "react";
import { useNavigate as g } from "react-router-dom";
import { toast as a } from "react-toastify";
import { PalmyraNewForm as w } from "@palmyralabs/rt-forms";
import { Button as l } from "@mantine/core";
import { I as b } from "../../../chunks/index.js";
import { F as v } from "../../../chunks/index3.js";
import { getTitle as D } from "../util/TitleUtil.js";
function V(t) {
  const m = g(), [s, f] = p(!1), n = N(null), d = t.initialData || {}, u = t.pageName, i = t.errorText, h = () => {
    a.error("Something went wrong Please try again later.. ");
  }, y = () => {
    i ? a.error(i) : a.error("Data Already Exit");
  }, c = () => {
    n.current.saveData().then((e) => {
      if (e)
        return t.successMsg && a.success(t.successMsg), m("../" + u);
    }).catch((e) => {
      e.response && e.response.status === 400 ? y() : e.response && e.response.status === 500 && h();
    });
  };
  return /* @__PURE__ */ r("div", { className: "py-form-container", children: /* @__PURE__ */ o("form", { onKeyDown: (e) => {
    e.ctrlKey && e.key === "s" && (e.preventDefault(), s && c());
  }, children: [
    /* @__PURE__ */ o("div", { className: "py-form-header-container", children: [
      /* @__PURE__ */ r("div", { children: D(t.title, "new") }),
      /* @__PURE__ */ o("div", { className: "py-form-header-button-container", children: [
        /* @__PURE__ */ r(
          l,
          {
            className: "py-cancel-filled-button",
            onClick: () => window.history.back(),
            leftSection: /* @__PURE__ */ r(b, { className: "py-button-icon" }),
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ o(
          l,
          {
            disabled: !s,
            className: s ? "py-filled-button" : "py-disabled-button",
            onClick: c,
            leftSection: /* @__PURE__ */ r(v, { className: "py-button-icon" }),
            children: [
              /* @__PURE__ */ r("u", { children: "S" }),
              "ave"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ r(
      w,
      {
        onValidChange: f,
        ...t.options,
        ref: n,
        initialData: d,
        children: t.children
      }
    )
  ] }) });
}
export {
  V as NewForm
};
