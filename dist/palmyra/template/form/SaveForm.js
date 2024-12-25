import { jsx as o, jsxs as a } from "react/jsx-runtime";
import { useState as y, useRef as p } from "react";
import { useNavigate as v } from "react-router-dom";
import { toast as N } from "react-toastify";
import { PalmyraEditForm as b } from "@palmyralabs/rt-forms";
import { Button as c } from "@mantine/core";
import { F as g } from "../../../chunks/index2.js";
import { I as D } from "../../../chunks/index.js";
import { getTitle as S } from "../util/TitleUtil.js";
function E(e) {
  const l = v(), [r, m] = y(!1), i = p(), d = e.id, f = e.pageName, h = (t) => (e.onDataRefresh && e.onDataRefresh(t), t), u = () => {
    N.error("Something went wrong Please try again later.. ");
  }, s = () => {
    i.current.saveData().then((n) => {
      l("../" + f);
    }).catch((n) => {
      n.response && n.response.status === 500 && u();
    });
  };
  return /* @__PURE__ */ o("div", { className: "py-form-container", children: /* @__PURE__ */ a("form", { onKeyDown: (t) => {
    t.ctrlKey && t.key === "s" && (t.preventDefault(), r && s());
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
            disabled: !r,
            className: r ? "py-filled-button" : "py-disabled-button",
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
