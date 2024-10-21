import { jsx as a, jsxs as s } from "react/jsx-runtime";
import { useState as g, useRef as v } from "react";
import { useNavigate as N } from "react-router-dom";
import { toast as c } from "react-toastify";
import { PalmyraEditForm as b } from "@palmyralabs/rt-forms";
import { Button as l } from "@mantine/core";
function P(e) {
  const d = N(), [r, m] = g(!1), i = v(), f = e.id, h = e.pageName, u = () => {
    c.error("Something went wrong Please try again later.. ");
  }, o = () => {
    i.current.saveData().then((n) => {
      n && (e.successMsg && c.success(e.successMsg), d("../" + h));
    }).catch((n) => {
      n.response && n.response.status === 500 && u();
    });
  }, y = (t) => (e.onDataRefresh && e.onDataRefresh(t), t);
  return /* @__PURE__ */ a("div", { className: "py-form-container", children: /* @__PURE__ */ s("form", { onKeyDown: (t) => {
    t.ctrlKey && t.key === "s" && (t.preventDefault(), r && o());
  }, children: [
    /* @__PURE__ */ s("div", { className: "py-form-header-container", children: [
      /* @__PURE__ */ a("div", { children: e.title }),
      /* @__PURE__ */ s("div", { className: "py-form-header-button-container", children: [
        /* @__PURE__ */ a(
          l,
          {
            className: "py-cancel-filled-button",
            onClick: () => window.history.back(),
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ s(
          l,
          {
            disabled: !r,
            className: r ? "py-filled-button" : "py-disabled-button",
            onClick: o,
            children: [
              /* @__PURE__ */ a("u", { style: { width: "5px" }, children: "S" }),
              "ave"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ a(
      b,
      {
        mode: "edit",
        id: f,
        ...e.options,
        onQueryData: y,
        onValidChange: m,
        ref: i,
        children: e.children
      }
    )
  ] }) });
}
export {
  P as EditForm
};
