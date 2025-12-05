import { jsx as o, jsxs as a } from "react/jsx-runtime";
import { useState as y, useRef as p } from "react";
import { useNavigate as v } from "react-router-dom";
import { toast as N } from "react-toastify";
import { PalmyraEditForm as b } from "@palmyralabs/rt-forms";
import { Button as c } from "@mantine/core";
import { F as g } from "../../../chunks/index3.js";
import { I as D } from "../../../chunks/index.js";
import { getTitle as S } from "../util/TitleUtil.js";
function E(e) {
  const l = v(), [n, m] = y(!1), i = p(null), d = e.id, f = e.pageName, h = (t) => (e.onDataRefresh && e.onDataRefresh(t), t), u = () => {
    N.error("Something went wrong Please try again later.. ");
  }, s = () => {
    i.current.saveData().then((r) => {
      l("../" + f);
    }).catch((r) => {
      r.response && r.response.status === 500 && u();
    });
  };
  return /* @__PURE__ */ o("div", { className: "py-form-container", children: /* @__PURE__ */ a("form", { onKeyDown: (t) => {
    t.ctrlKey && t.key === "s" && (t.preventDefault(), n && s());
  }, children: [
    /* @__PURE__ */ a("div", { className: "py-form-header-container", children: [
      /* @__PURE__ */ o("div", { children: S(e.title, "edit") }),
      /* @__PURE__ */ a("div", { className: "py-form-header-button-container", children: [
        /* @__PURE__ */ o(
          c,
          {
            className: "py-cancel-filled-button",
            onClick: () => window.history.back(),
            leftSection: /* @__PURE__ */ o(D, { className: "py-button-icon" }),
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ a(
          c,
          {
            disabled: !n,
            className: n ? "py-filled-button" : "py-disabled-button",
            onClick: s,
            leftSection: /* @__PURE__ */ o(g, { className: "py-button-icon" }),
            children: [
              /* @__PURE__ */ o("u", { children: "S" }),
              "ave"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ o(
      b,
      {
        mode: "save",
        id: d,
        ...e.options,
        onQueryData: h,
        onValidChange: m,
        ref: i,
        children: e.children
      }
    )
  ] }) });
}
export {
  E as SaveForm
};
