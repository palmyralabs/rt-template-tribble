import { jsx as t, jsxs as a, Fragment as K } from "react/jsx-runtime";
import { Drawer as V, Button as l } from "@mantine/core";
import { forwardRef as j, useState as L, useRef as b, useImperativeHandle as B } from "react";
import { I as H } from "../../../chunks/index.js";
import { M as s } from "../../../chunks/index2.js";
import { useSaveForm as P } from "../hooks/useSaveForm.js";
import { getTitle as h } from "../util/TitleUtil.js";
import { EditForm as Q } from "./EditForm.js";
import { NewForm as _ } from "./NewForm.js";
const Z = j((e, y) => {
  const c = e.idKey || "id", [n, r] = L(void 0), C = b(0), m = e.gridRef, N = y || b(null);
  B(N, () => ({ setData: r }), [m]);
  const d = () => {
    r(void 0);
  }, w = (i) => {
    r(void 0), F(), e.onSaveSuccess(i);
  }, F = () => {
    C.current += 1, m.current.refresh();
  }, D = (i) => (d(), !1), R = (i) => {
    e.onSaveFailure(i);
  }, E = (i) => {
    e.onSaveSuccess(i);
  }, {
    doCancel: g,
    doSaveClose: u,
    doSaveNew: M,
    handleKeyPress: f,
    setValid: S,
    isValid: o,
    formRef: v
  } = P({ onCancel: d, onComplete: w, onFailure: R, onSave: E }), k = n != null, p = e.EditFormlet, x = e.NewFormlet, I = n?.[c] ? h(e.title, "edit") : h(e.title, "new"), O = e.customDataSection?.new || "", T = e.customDataSection?.edit || "";
  return /* @__PURE__ */ t(V, { position: "right", opened: k, onClose: d, title: I, children: /* @__PURE__ */ a("div", { className: "py-drawer-content-container", children: [
    n?.[c] ? /* @__PURE__ */ t(
      Q,
      {
        setValid: S,
        formRef: v,
        onQueryFailure: D,
        handleKeyPress: f,
        options: e.options,
        customDataSection: T,
        ...e.options,
        id: n?.[c],
        FORMLET: p
      }
    ) : /* @__PURE__ */ t(
      _,
      {
        setValid: S,
        formRef: v,
        customDataSection: O,
        handleKeyPress: f,
        options: e.options,
        ...e.options,
        initialData: n,
        FORMLET: x
      }
    ),
    /* @__PURE__ */ a("div", { className: "py-drawer-form-btn-container", children: [
      /* @__PURE__ */ t("div", { children: /* @__PURE__ */ t(
        l,
        {
          className: "py-cancel-filled-button",
          onClick: g,
          tabIndex: -1,
          leftSection: /* @__PURE__ */ t(H, { className: "py-button-icon" }),
          children: "Cancel"
        }
      ) }),
      !n?.[c] && e.enableSaveVariants ? /* @__PURE__ */ a(K, { children: [
        /* @__PURE__ */ t("div", { children: /* @__PURE__ */ a(
          l,
          {
            disabled: !o,
            className: o ? "py-filled-button" : "py-disabled-button",
            onClick: M,
            leftSection: /* @__PURE__ */ t(s, { className: "py-button-icon" }),
            children: [
              /* @__PURE__ */ t("u", { children: "S" }),
              "ave & New"
            ]
          }
        ) }),
        /* @__PURE__ */ t("div", { children: /* @__PURE__ */ a(
          l,
          {
            disabled: !o,
            className: o ? "py-filled-button" : "py-disabled-button",
            onClick: u,
            leftSection: /* @__PURE__ */ t(s, { className: "py-button-icon" }),
            children: [
              /* @__PURE__ */ t("u", { children: "S" }),
              "ave & Close"
            ]
          }
        ) })
      ] }) : /* @__PURE__ */ t("div", { children: /* @__PURE__ */ a(
        l,
        {
          disabled: !o,
          className: o ? "py-filled-button" : "py-disabled-button",
          onClick: u,
          leftSection: /* @__PURE__ */ t(s, { className: "py-button-icon" }),
          children: [
            /* @__PURE__ */ t("u", { children: "S" }),
            "ave"
          ]
        }
      ) })
    ] })
  ] }) });
});
export {
  Z as SummaryDrawerForm
};
