import { jsx as t, jsxs as s } from "react/jsx-runtime";
import { forwardRef as I, useState as k, useRef as y, useImperativeHandle as K } from "react";
import { useSaveForm as M } from "../hooks/useSaveForm.js";
import { EditForm as O } from "./EditForm.js";
import { NewForm as T } from "./NewForm.js";
import { Drawer as j, Button as h } from "@mantine/core";
import { I as L } from "../../../chunks/index.js";
import { F as V } from "../../../chunks/index2.js";
const A = I((o, p) => {
  const c = o.title, n = o.idKey || "id", [e, r] = k(void 0), v = y(0), l = o.gridRef, C = p || y();
  K(C, () => ({ setData: r }), [l]);
  const i = () => {
    r(void 0);
  }, w = () => {
    r(void 0), a();
  }, a = () => {
    v.current += 1, l.current.refresh();
  }, N = (F) => (i(), !1), b = (F) => {
    console.log(F);
  }, {
    doCancel: R,
    doSaveClose: S,
    handleKeyPress: d,
    setValid: m,
    isValid: f,
    formRef: u
  } = M({ onCancel: i, onComplete: w, onFailure: b, onSave: a }), E = e != null, g = o.EditFormlet, x = o.NewFormlet, D = e != null && e[n] ? `Edit ${c}` : `New ${c}`;
  return /* @__PURE__ */ t(j, { position: "right", opened: E, onClose: i, title: D, children: /* @__PURE__ */ s("div", { className: "py-drawer-content-container", children: [
    e != null && e[n] ? /* @__PURE__ */ t(
      O,
      {
        setValid: m,
        formRef: u,
        onQueryFailure: N,
        handleKeyPress: d,
        options: o.options,
        ...o.options,
        id: e == null ? void 0 : e[n],
        FORMLET: g
      }
    ) : /* @__PURE__ */ t(
      T,
      {
        setValid: m,
        formRef: u,
        handleKeyPress: d,
        options: o.options,
        ...o.options,
        initialData: e,
        FORMLET: x
      }
    ),
    /* @__PURE__ */ s("div", { className: "py-drawer-form-btn-container", children: [
      /* @__PURE__ */ t(
        h,
        {
          className: "py-cancel-filled-button",
          onClick: R,
          tabIndex: -1,
          leftSection: /* @__PURE__ */ t(L, { className: "py-button-icon" }),
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ s(
        h,
        {
          disabled: !f,
          className: f ? "py-filled-button" : "py-disabled-button",
          onClick: S,
          leftSection: /* @__PURE__ */ t(V, { className: "py-button-icon" }),
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
