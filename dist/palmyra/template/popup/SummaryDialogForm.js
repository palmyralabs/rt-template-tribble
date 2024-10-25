import { jsx as t, Fragment as I, jsxs as l } from "react/jsx-runtime";
import { forwardRef as K, useState as M, useRef as h, useImperativeHandle as k } from "react";
import { useSaveForm as O } from "../hooks/useSaveForm.js";
import { EditForm as T } from "./EditForm.js";
import { NewForm as j } from "./NewForm.js";
import { Modal as L, Button as v } from "@mantine/core";
import { I as V } from "../../../chunks/index.js";
import { F as $ } from "../../../chunks/index2.js";
const G = K((o, b) => {
  const c = o.title, n = o.idKey || "id", [e, i] = M(void 0), p = h(0), s = o.gridRef, N = b || h();
  k(N, () => ({ setData: i }), [s]);
  const a = () => {
    i(void 0);
  }, R = () => {
    i(void 0), d();
  }, d = () => {
    p.current += 1, s.current.refresh();
  }, S = (C) => {
    console.log(C);
  }, w = (C) => (a(), !1), {
    doCancel: m,
    doSaveClose: E,
    handleKeyPress: r,
    setValid: f,
    isValid: u,
    formRef: F
  } = O({ onCancel: a, onComplete: R, onFailure: S, onSave: d }), y = e != null, g = o.EditFormlet, x = o.NewFormlet, D = e != null && e[n] ? `Edit ${c}` : `New ${c}`;
  return /* @__PURE__ */ t(I, { children: y && /* @__PURE__ */ l(
    L,
    {
      opened: y,
      onClose: m,
      onKeyDown: r,
      title: D,
      centered: !0,
      children: [
        e != null && e[n] ? /* @__PURE__ */ t(
          T,
          {
            setValid: f,
            formRef: F,
            onQueryFailure: w,
            handleKeyPress: r,
            options: o.options,
            ...o.options,
            id: e == null ? void 0 : e[n],
            FORMLET: g
          }
        ) : /* @__PURE__ */ t(
          j,
          {
            setValid: f,
            formRef: F,
            handleKeyPress: r,
            options: o.options,
            ...o.options,
            initialData: e,
            FORMLET: x
          }
        ),
        /* @__PURE__ */ l("div", { className: "py-drawer-form-btn-container", children: [
          /* @__PURE__ */ t(
            v,
            {
              className: "py-cancel-filled-button",
              onClick: m,
              tabIndex: -1,
              leftSection: /* @__PURE__ */ t(V, { className: "py-button-icon" }),
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ l(
            v,
            {
              disabled: !u,
              className: u ? "py-filled-button" : "py-disabled-button",
              onClick: E,
              leftSection: /* @__PURE__ */ t($, { className: "py-button-icon" }),
              children: [
                /* @__PURE__ */ t("u", { children: "S" }),
                "ave"
              ]
            }
          )
        ] })
      ]
    }
  ) });
});
export {
  G as SummaryDialogForm
};
