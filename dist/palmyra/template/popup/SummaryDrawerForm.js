import { jsx as e, jsxs as i, Fragment as K } from "react/jsx-runtime";
import { Drawer as O, Button as l } from "@mantine/core";
import { forwardRef as V, useState as j, useRef as y, useImperativeHandle as L } from "react";
import { I as B } from "../../../chunks/index.js";
import { M as d } from "../../../chunks/index2.js";
import { useSaveForm as H } from "../hooks/useSaveForm.js";
import { getTitle as S } from "../util/TitleUtil.js";
import { EditForm as P } from "./EditForm.js";
import { NewForm as Q } from "./NewForm.js";
const Y = V((t, C) => {
  const a = t.idKey || "id", [o, r] = j(void 0), N = y(0), s = t.gridRef, w = C || y(null);
  L(w, () => ({ setData: r }), [s]);
  const c = () => {
    r(void 0);
  }, F = () => {
    r(void 0), m();
  }, m = () => {
    N.current += 1, s.current.refresh();
  }, D = (v) => (c(), !1), p = (v) => {
    console.log(v);
  }, {
    doCancel: R,
    doSaveClose: u,
    doSaveNew: g,
    handleKeyPress: f,
    setValid: b,
    isValid: n,
    formRef: h
  } = H({ onCancel: c, onComplete: F, onFailure: p, onSave: m }), E = o != null, M = t.EditFormlet, k = t.NewFormlet, x = o?.[a] ? S(t.title, "edit") : S(t.title, "new"), I = t.customDataSection?.new || "", T = t.customDataSection?.edit || "";
  return /* @__PURE__ */ e(O, { position: "right", opened: E, onClose: c, title: x, children: /* @__PURE__ */ i("div", { className: "py-drawer-content-container", children: [
    o?.[a] ? /* @__PURE__ */ e(
      P,
      {
        setValid: b,
        formRef: h,
        onQueryFailure: D,
        handleKeyPress: f,
        options: t.options,
        customDataSection: T,
        ...t.options,
        id: o?.[a],
        FORMLET: M
      }
    ) : /* @__PURE__ */ e(
      Q,
      {
        setValid: b,
        formRef: h,
        customDataSection: I,
        handleKeyPress: f,
        options: t.options,
        ...t.options,
        initialData: o,
        FORMLET: k
      }
    ),
    /* @__PURE__ */ i("div", { className: "py-drawer-form-btn-container", children: [
      /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(
        l,
        {
          className: "py-cancel-filled-button",
          onClick: R,
          tabIndex: -1,
          leftSection: /* @__PURE__ */ e(B, { className: "py-button-icon" }),
          children: "Cancel"
        }
      ) }),
      !o?.[a] && t.enableSaveVariants ? /* @__PURE__ */ i(K, { children: [
        /* @__PURE__ */ e("div", { children: /* @__PURE__ */ i(
          l,
          {
            disabled: !n,
            className: n ? "py-filled-button" : "py-disabled-button",
            onClick: g,
            leftSection: /* @__PURE__ */ e(d, { className: "py-button-icon" }),
            children: [
              /* @__PURE__ */ e("u", { children: "S" }),
              "ave & New"
            ]
          }
        ) }),
        /* @__PURE__ */ e("div", { children: /* @__PURE__ */ i(
          l,
          {
            disabled: !n,
            className: n ? "py-filled-button" : "py-disabled-button",
            onClick: u,
            leftSection: /* @__PURE__ */ e(d, { className: "py-button-icon" }),
            children: [
              /* @__PURE__ */ e("u", { children: "S" }),
              "ave & Close"
            ]
          }
        ) })
      ] }) : /* @__PURE__ */ e("div", { children: /* @__PURE__ */ i(
        l,
        {
          disabled: !n,
          className: n ? "py-filled-button" : "py-disabled-button",
          onClick: u,
          leftSection: /* @__PURE__ */ e(d, { className: "py-button-icon" }),
          children: [
            /* @__PURE__ */ e("u", { children: "S" }),
            "ave"
          ]
        }
      ) })
    ] })
  ] }) });
});
export {
  Y as SummaryDrawerForm
};
