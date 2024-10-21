import { jsx as t, Fragment as D, jsxs as i } from "react/jsx-runtime";
import { forwardRef as K, useState as M, useRef as h, useImperativeHandle as O } from "react";
import { useSaveForm as j } from "../hooks/useSaveForm.js";
import { EditForm as k } from "./EditForm.js";
import { NewForm as I } from "./NewForm.js";
import { Modal as L, Button as v } from "@mantine/core";
const _ = K((e, C) => {
  const R = e.title, l = e.idKey || "id", [o, n] = M(void 0), b = h(0), s = e.gridRef, w = C || h();
  O(w, () => ({ setData: n }), [s]);
  const c = () => {
    n(void 0);
  }, g = () => {
    n(void 0), d();
  }, d = () => {
    b.current += 1, s.current.refresh();
  }, p = (y) => {
    console.log(y);
  }, E = (y) => (c(), !1), {
    doCancel: a,
    doSaveClose: N,
    handleKeyPress: r,
    setValid: m,
    isValid: u,
    formRef: f
  } = j({ onCancel: c, onComplete: g, onFailure: p, onSave: d }), F = o != null, S = e.EditFormlet, x = e.NewFormlet;
  return /* @__PURE__ */ t(D, { children: F && /* @__PURE__ */ i(
    L,
    {
      opened: F,
      onClose: a,
      onKeyDown: r,
      title: R,
      centered: !0,
      children: [
        o != null && o[l] ? /* @__PURE__ */ t(
          k,
          {
            setValid: m,
            formRef: f,
            onQueryFailure: E,
            handleKeyPress: r,
            options: e.options,
            ...e.options,
            id: o == null ? void 0 : o[l],
            FORMLET: S
          }
        ) : /* @__PURE__ */ t(
          I,
          {
            setValid: m,
            formRef: f,
            handleKeyPress: r,
            options: e.options,
            ...e.options,
            initialData: o,
            FORMLET: x
          }
        ),
        /* @__PURE__ */ i("div", { className: "py-drawer-form-btn-container", children: [
          /* @__PURE__ */ t(
            v,
            {
              className: "py-cancel-filled-button",
              onClick: a,
              tabIndex: -1,
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ i(
            v,
            {
              disabled: !u,
              className: u ? "py-filled-button" : "py-disabled-button",
              onClick: N,
              children: [
                /* @__PURE__ */ t("u", { style: { width: "5px" }, children: "S" }),
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
  _ as SummaryDialogForm
};
