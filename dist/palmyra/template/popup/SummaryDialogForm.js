import { jsx as t, Fragment as M, jsxs as l } from "react/jsx-runtime";
import { forwardRef as k, useState as T, useRef as p, useImperativeHandle as j } from "react";
import { useSaveForm as L } from "../hooks/useSaveForm.js";
import { EditForm as O } from "./EditForm.js";
import { NewForm as V } from "./NewForm.js";
import { Modal as $, Button as v } from "@mantine/core";
import { I as B } from "../../../chunks/index.js";
import { F as H } from "../../../chunks/index2.js";
import { useDisclosure as P } from "@mantine/hooks";
const X = k((o, b) => {
  const [s, { open: N, close: c }] = P(!1), m = o.title, n = o.idKey || "id", [e, r] = T(void 0), R = p(0), a = o.gridRef, S = b || p();
  j(S, () => ({ setData: r }), [a]);
  const d = () => {
    r(void 0), c();
  }, w = () => {
    r(void 0), f(), c();
  }, f = () => {
    R.current += 1, a.current.refresh();
  }, E = (h) => {
    console.log(h);
  }, g = (h) => (d(), !1);
  e !== void 0 && !s && N();
  const {
    doCancel: u,
    doSaveClose: D,
    handleKeyPress: i,
    setValid: F,
    isValid: y,
    formRef: C
  } = L({ onCancel: d, onComplete: w, onFailure: E, onSave: f }), x = o.EditFormlet, I = o.NewFormlet, K = e != null && e[n] ? `Edit ${m}` : `New ${m}`;
  return /* @__PURE__ */ t(M, { children: /* @__PURE__ */ l(
    $,
    {
      opened: s,
      onClose: u,
      onKeyDown: i,
      title: K,
      centered: !0,
      children: [
        e != null && e[n] ? /* @__PURE__ */ t(
          O,
          {
            setValid: F,
            formRef: C,
            onQueryFailure: g,
            handleKeyPress: i,
            options: o.options,
            ...o.options,
            id: e == null ? void 0 : e[n],
            FORMLET: x
          }
        ) : /* @__PURE__ */ t(
          V,
          {
            setValid: F,
            formRef: C,
            handleKeyPress: i,
            options: o.options,
            ...o.options,
            initialData: e,
            FORMLET: I
          }
        ),
        /* @__PURE__ */ l("div", { className: "py-drawer-form-btn-container", children: [
          /* @__PURE__ */ t(
            v,
            {
              className: "py-cancel-filled-button",
              onClick: u,
              tabIndex: -1,
              leftSection: /* @__PURE__ */ t(B, { className: "py-button-icon" }),
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ l(
            v,
            {
              disabled: !y,
              className: y ? "py-filled-button" : "py-disabled-button",
              onClick: D,
              leftSection: /* @__PURE__ */ t(H, { className: "py-button-icon" }),
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
  X as SummaryDialogForm
};
