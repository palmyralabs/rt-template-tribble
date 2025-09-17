import { jsx as t, jsxs as a } from "react/jsx-runtime";
import { forwardRef as k, useState as K, useRef as F, useImperativeHandle as M } from "react";
import { useSaveForm as O } from "../hooks/useSaveForm.js";
import { EditForm as j } from "./EditForm.js";
import { NewForm as L } from "./NewForm.js";
import { Drawer as V, Button as C } from "@mantine/core";
import { I as B } from "../../../chunks/index.js";
import { F as H } from "../../../chunks/index2.js";
import { getTitle as w } from "../util/TitleUtil.js";
const W = k((e, y) => {
  const n = e.idKey || "id", [o, i] = K(void 0), S = F(0), c = e.gridRef, h = y || F(null);
  M(h, () => ({ setData: i }), [c]);
  const r = () => {
    i(void 0);
  }, v = () => {
    i(void 0), s();
  }, s = () => {
    S.current += 1, c.current.refresh();
  }, D = (f) => (r(), !1), b = (f) => {
    console.log(f);
  }, {
    doCancel: N,
    doSaveClose: R,
    handleKeyPress: l,
    setValid: d,
    isValid: m,
    formRef: u
  } = O({ onCancel: r, onComplete: v, onFailure: b, onSave: s }), p = o != null, E = e.EditFormlet, g = e.NewFormlet, x = o?.[n] ? w(e.title, "edit") : w(e.title, "new"), I = e.customDataSection?.new || "", T = e.customDataSection?.edit || "";
  return /* @__PURE__ */ t(V, { position: "right", opened: p, onClose: r, title: x, children: /* @__PURE__ */ a("div", { className: "py-drawer-content-container", children: [
    o?.[n] ? /* @__PURE__ */ t(
      j,
      {
        setValid: d,
        formRef: u,
        onQueryFailure: D,
        handleKeyPress: l,
        options: e.options,
        customDataSection: T,
        ...e.options,
        id: o?.[n],
        FORMLET: E
      }
    ) : /* @__PURE__ */ t(
      L,
      {
        setValid: d,
        formRef: u,
        customDataSection: I,
        handleKeyPress: l,
        options: e.options,
        ...e.options,
        initialData: o,
        FORMLET: g
      }
    ),
    /* @__PURE__ */ a("div", { className: "py-drawer-form-btn-container", children: [
      /* @__PURE__ */ t(
        C,
        {
          className: "py-cancel-filled-button",
          onClick: N,
          tabIndex: -1,
          leftSection: /* @__PURE__ */ t(B, { className: "py-button-icon" }),
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ a(
        C,
        {
          disabled: !m,
          className: m ? "py-filled-button" : "py-disabled-button",
          onClick: R,
          leftSection: /* @__PURE__ */ t(H, { className: "py-button-icon" }),
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
  W as SummaryDrawerForm
};
