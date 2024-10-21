import { jsx as a, jsxs as r } from "react/jsx-runtime";
import { useState as y, useRef as v } from "react";
import { useNavigate as g } from "react-router-dom";
import { toast as p } from "react-toastify";
import { PalmyraEditForm as N } from "@palmyralabs/rt-forms";
import { Button as c } from "@mantine/core";
function K(e) {
  const l = g(), [n, d] = y(!1), i = v(), m = e.id, f = e.pageName, h = (t) => (e.onDataRefresh && e.onDataRefresh(t), t), u = () => {
    p.error("Something went wrong Please try again later.. ");
  }, s = () => {
    i.current.saveData().then((o) => {
      l("../" + f);
    }).catch((o) => {
      o.response && o.response.status === 500 && u();
    });
  };
  return /* @__PURE__ */ a("div", { className: "py-form-container", children: /* @__PURE__ */ r("form", { onKeyDown: (t) => {
    t.ctrlKey && t.key === "s" && (t.preventDefault(), n && s());
  }, children: [
    /* @__PURE__ */ r("div", { className: "py-form-header-container", children: [
      /* @__PURE__ */ a("div", { children: e.title }),
      /* @__PURE__ */ r("div", { className: "py-form-header-button-container", children: [
        /* @__PURE__ */ a(
          c,
          {
            className: "py-cancel-filled-button",
            onClick: () => window.history.back(),
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ r(
          c,
          {
            disabled: !n,
            className: n ? "py-filled-button" : "py-disabled-button",
            onClick: s,
            children: [
              /* @__PURE__ */ a("u", { style: { width: "5px" }, children: "S" }),
              "ave"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ a(
      N,
      {
        mode: "save",
        id: m,
        ...e.options,
        onQueryData: h,
        onValidChange: d,
        ref: i,
        children: e.children
      }
    )
  ] }) });
}
export {
  K as SaveForm
};
