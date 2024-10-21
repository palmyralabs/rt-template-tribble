import { jsx as t, jsxs as a } from "react/jsx-runtime";
import { useState as g, useRef as w } from "react";
import { useNavigate as N } from "react-router-dom";
import { toast as s } from "react-toastify";
import { PalmyraNewForm as v } from "@palmyralabs/rt-forms";
import { Button as l } from "@mantine/core";
function P(r) {
  const d = N(), [n, m] = g(!1), o = w(), f = r.initialData || {}, h = r.pageName, i = r.errorText, u = () => {
    s.error("Something went wrong Please try again later.. ");
  }, y = () => {
    i ? s.error(i) : s.error("Data Already Exit");
  }, c = () => {
    o.current.saveData().then((e) => {
      if (e)
        return r.successMsg && s.success(r.successMsg), d("../" + h);
    }).catch((e) => {
      e.response && e.response.status === 400 ? y() : e.response && e.response.status === 500 && u();
    });
  };
  return /* @__PURE__ */ t("div", { className: "py-form-container", children: /* @__PURE__ */ a("form", { onKeyDown: (e) => {
    e.ctrlKey && e.key === "s" && (e.preventDefault(), n && c());
  }, children: [
    /* @__PURE__ */ a("div", { className: "py-form-header-container", children: [
      /* @__PURE__ */ t("div", { children: r.title }),
      /* @__PURE__ */ a("div", { className: "py-form-header-button-container", children: [
        /* @__PURE__ */ t(
          l,
          {
            className: "py-cancel-filled-button",
            onClick: () => window.history.back(),
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ a(
          l,
          {
            disabled: !n,
            className: n ? "py-filled-button" : "py-disabled-button",
            onClick: c,
            children: [
              /* @__PURE__ */ t("u", { style: { width: "5px" }, children: "S" }),
              "ave"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ t(
      v,
      {
        onValidChange: m,
        ...r.options,
        ref: o,
        initialData: f,
        children: r.children
      }
    )
  ] }) });
}
export {
  P as NewForm
};
