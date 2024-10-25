import { jsx as t, Fragment as D, jsxs as i } from "react/jsx-runtime";
import { forwardRef as I, useState as K, useRef as C, useImperativeHandle as M } from "react";
import { useSaveForm as k } from "../hooks/useSaveForm.js";
import { EditForm as O } from "./EditForm.js";
import { NewForm as j } from "./NewForm.js";
import { Modal as L, Button as h } from "@mantine/core";
import { I as T } from "../../../chunks/index.js";
import { F as V } from "../../../chunks/index2.js";
const G = I((e, v) => {
  const b = e.title, l = e.idKey || "id", [o, n] = K(void 0), p = C(0), c = e.gridRef, N = v || C();
  M(N, () => ({ setData: n }), [c]);
  const s = () => {
    n(void 0);
  }, R = () => {
    n(void 0), a();
  }, a = () => {
    p.current += 1, c.current.refresh();
  }, S = (y) => {
    console.log(y);
  }, g = (y) => (s(), !1), {
    doCancel: d,
    doSaveClose: w,
    handleKeyPress: r,
    setValid: m,
    isValid: f,
    formRef: u
  } = k({ onCancel: s, onComplete: R, onFailure: S, onSave: a }), F = o != null, E = e.EditFormlet, x = e.NewFormlet;
  return /* @__PURE__ */ t(D, { children: F && /* @__PURE__ */ i(
    L,
    {
      opened: F,
      onClose: d,
      onKeyDown: r,
      title: b,
      centered: !0,
      children: [
        o != null && o[l] ? /* @__PURE__ */ t(
          O,
          {
            setValid: m,
            formRef: u,
            onQueryFailure: g,
            handleKeyPress: r,
            options: e.options,
            ...e.options,
            id: o == null ? void 0 : o[l],
            FORMLET: E
          }
        ) : /* @__PURE__ */ t(
          j,
          {
            setValid: m,
            formRef: u,
            handleKeyPress: r,
            options: e.options,
            ...e.options,
            initialData: o,
            FORMLET: x
          }
        ),
        /* @__PURE__ */ i("div", { className: "py-drawer-form-btn-container", children: [
          /* @__PURE__ */ t(
            h,
            {
              className: "py-cancel-filled-button",
              onClick: d,
              tabIndex: -1,
              leftSection: /* @__PURE__ */ t(T, { className: "py-button-icon" }),
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ i(
            h,
            {
              disabled: !f,
              className: f ? "py-filled-button" : "py-disabled-button",
              onClick: w,
              leftSection: /* @__PURE__ */ t(V, { className: "py-button-icon" }),
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
