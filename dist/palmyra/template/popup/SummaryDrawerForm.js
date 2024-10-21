import { jsx as t, jsxs as i } from "react/jsx-runtime";
import { forwardRef as D, useState as K, useRef as F, useImperativeHandle as O } from "react";
import { useSaveForm as j } from "../hooks/useSaveForm.js";
import { EditForm as k } from "./EditForm.js";
import { NewForm as I } from "./NewForm.js";
import { Drawer as L, Button as h } from "@mantine/core";
const Q = D((e, v) => {
  const y = e.title, l = e.idKey || "id", [o, n] = K(void 0), w = F(0), s = e.gridRef, C = v || F();
  O(C, () => ({ setData: n }), [s]);
  const r = () => {
    n(void 0);
  }, p = () => {
    n(void 0), c();
  }, c = () => {
    w.current += 1, s.current.refresh();
  }, R = (u) => (r(), !1), b = (u) => {
    console.log(u);
  }, {
    doCancel: N,
    doSaveClose: E,
    handleKeyPress: d,
    setValid: a,
    isValid: m,
    formRef: f
  } = j({ onCancel: r, onComplete: p, onFailure: b, onSave: c }), S = o != null, x = e.EditFormlet, g = e.NewFormlet;
  return /* @__PURE__ */ t(L, { position: "right", opened: S, onClose: r, title: y, children: /* @__PURE__ */ i("div", { className: "py-drawer-content-container", children: [
    o != null && o[l] ? /* @__PURE__ */ t(
      k,
      {
        setValid: a,
        formRef: f,
        onQueryFailure: R,
        handleKeyPress: d,
        options: e.options,
        ...e.options,
        id: o == null ? void 0 : o[l],
        FORMLET: x
      }
    ) : /* @__PURE__ */ t(
      I,
      {
        setValid: a,
        formRef: f,
        handleKeyPress: d,
        options: e.options,
        ...e.options,
        initialData: o,
        FORMLET: g
      }
    ),
    /* @__PURE__ */ i("div", { className: "py-drawer-form-btn-container", children: [
      /* @__PURE__ */ t(
        h,
        {
          className: "py-cancel-filled-button",
          onClick: N,
          tabIndex: -1,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ i(
        h,
        {
          disabled: !m,
          className: m ? "py-filled-button" : "py-disabled-button",
          onClick: E,
          children: [
            /* @__PURE__ */ t("u", { style: { width: "5px" }, children: "S" }),
            "ave"
          ]
        }
      )
    ] })
  ] }) });
});
export {
  Q as SummaryDrawerForm
};
