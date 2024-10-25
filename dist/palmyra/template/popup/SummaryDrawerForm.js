import { jsx as t, jsxs as i } from "react/jsx-runtime";
import { forwardRef as D, useState as I, useRef as F, useImperativeHandle as k } from "react";
import { useSaveForm as K } from "../hooks/useSaveForm.js";
import { EditForm as M } from "./EditForm.js";
import { NewForm as O } from "./NewForm.js";
import { Drawer as j, Button as y } from "@mantine/core";
import { I as L } from "../../../chunks/index.js";
import { F as T } from "../../../chunks/index2.js";
const A = D((e, h) => {
  const p = e.title, s = e.idKey || "id", [o, n] = I(void 0), v = F(0), c = e.gridRef, C = h || F();
  k(C, () => ({ setData: n }), [c]);
  const r = () => {
    n(void 0);
  }, b = () => {
    n(void 0), l();
  }, l = () => {
    v.current += 1, c.current.refresh();
  }, w = (u) => (r(), !1), N = (u) => {
    console.log(u);
  }, {
    doCancel: R,
    doSaveClose: S,
    handleKeyPress: a,
    setValid: d,
    isValid: m,
    formRef: f
  } = K({ onCancel: r, onComplete: b, onFailure: N, onSave: l }), E = o != null, g = e.EditFormlet, x = e.NewFormlet;
  return /* @__PURE__ */ t(j, { position: "right", opened: E, onClose: r, title: p, children: /* @__PURE__ */ i("div", { className: "py-drawer-content-container", children: [
    o != null && o[s] ? /* @__PURE__ */ t(
      M,
      {
        setValid: d,
        formRef: f,
        onQueryFailure: w,
        handleKeyPress: a,
        options: e.options,
        ...e.options,
        id: o == null ? void 0 : o[s],
        FORMLET: g
      }
    ) : /* @__PURE__ */ t(
      O,
      {
        setValid: d,
        formRef: f,
        handleKeyPress: a,
        options: e.options,
        ...e.options,
        initialData: o,
        FORMLET: x
      }
    ),
    /* @__PURE__ */ i("div", { className: "py-drawer-form-btn-container", children: [
      /* @__PURE__ */ t(
        y,
        {
          className: "py-cancel-filled-button",
          onClick: R,
          tabIndex: -1,
          leftSection: /* @__PURE__ */ t(L, { className: "py-button-icon" }),
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ i(
        y,
        {
          disabled: !m,
          className: m ? "py-filled-button" : "py-disabled-button",
          onClick: S,
          leftSection: /* @__PURE__ */ t(T, { className: "py-button-icon" }),
          children: [
            /* @__PURE__ */ t("u", { children: "S" }),
            "ave"
          ]
        }
      )
    ] })
  ] }) });
});
export {
  A as SummaryDrawerForm
};
