import { jsx as o, jsxs as c } from "react/jsx-runtime";
import { forwardRef as M, useState as O, useRef as w, useImperativeHandle as j } from "react";
import { useSaveForm as L } from "../hooks/useSaveForm.js";
import { EditForm as V } from "./EditForm.js";
import { NewForm as B } from "./NewForm.js";
import { Drawer as H, Button as y } from "@mantine/core";
import { I as P } from "../../../chunks/index.js";
import { F as Q } from "../../../chunks/index2.js";
import { getTitle as S } from "../util/TitleUtil.js";
const Y = M((e, h) => {
  var f, F;
  const n = e.idKey || "id", [t, i] = O(void 0), v = w(0), s = e.gridRef, D = h || w();
  j(D, () => ({ setData: i }), [s]);
  const r = () => {
    i(void 0);
  }, b = () => {
    i(void 0), a();
  }, a = () => {
    v.current += 1, s.current.refresh();
  }, N = (C) => (r(), !1), R = (C) => {
    console.log(C);
  }, {
    doCancel: p,
    doSaveClose: E,
    handleKeyPress: l,
    setValid: m,
    isValid: d,
    formRef: u
  } = L({ onCancel: r, onComplete: b, onFailure: R, onSave: a }), g = t != null, x = e.EditFormlet, I = e.NewFormlet, T = t != null && t[n] ? S(e.title, "edit") : S(e.title, "new"), k = ((f = e.customDataSection) == null ? void 0 : f.new) || "", K = ((F = e.customDataSection) == null ? void 0 : F.edit) || "";
  return /* @__PURE__ */ o(H, { position: "right", opened: g, onClose: r, title: T, children: /* @__PURE__ */ c("div", { className: "py-drawer-content-container", children: [
    t != null && t[n] ? /* @__PURE__ */ o(
      V,
      {
        setValid: m,
        formRef: u,
        onQueryFailure: N,
        handleKeyPress: l,
        options: e.options,
        customDataSection: K,
        ...e.options,
        id: t == null ? void 0 : t[n],
        FORMLET: x
      }
    ) : /* @__PURE__ */ o(
      B,
      {
        setValid: m,
        formRef: u,
        customDataSection: k,
        handleKeyPress: l,
        options: e.options,
        ...e.options,
        initialData: t,
        FORMLET: I
      }
    ),
    /* @__PURE__ */ c("div", { className: "py-drawer-form-btn-container", children: [
      /* @__PURE__ */ o(
        y,
        {
          className: "py-cancel-filled-button",
          onClick: p,
          tabIndex: -1,
          leftSection: /* @__PURE__ */ o(P, { className: "py-button-icon" }),
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ c(
        y,
        {
          disabled: !d,
          className: d ? "py-filled-button" : "py-disabled-button",
          onClick: E,
          leftSection: /* @__PURE__ */ o(Q, { className: "py-button-icon" }),
          children: [
            /* @__PURE__ */ o("u", { children: "S" }),
            "ave"
          ]
        }
      )
    ] })
  ] }) });
});
export {
  Y as SummaryDrawerForm
};
