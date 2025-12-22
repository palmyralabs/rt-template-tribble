import { jsx as t, Fragment as C, jsxs as a } from "react/jsx-runtime";
import { Modal as L, Button as c } from "@mantine/core";
import { useDisclosure as B } from "@mantine/hooks";
import { forwardRef as H, useState as P, useRef as F, useImperativeHandle as Q } from "react";
import { I as _ } from "../../../chunks/index.js";
import { M as d } from "../../../chunks/index2.js";
import { useSaveForm as q } from "../hooks/useSaveForm.js";
import { getTitle as N } from "../util/TitleUtil.js";
import { EditForm as z } from "./EditForm.js";
import { NewForm as A } from "./NewForm.js";
const oe = H((e, D) => {
  const [m, { open: w, close: u }] = B(!1), l = e.idKey || "id", [o, s] = P(void 0), R = F(0), f = e.gridRef, E = D || F(null);
  Q(E, () => ({ setData: s }), [f]);
  const S = () => {
    s(void 0), u();
  }, M = (i) => {
    s(void 0), g(), u(), e.onSaveSuccess(i);
  }, g = () => {
    R.current += 1, f.current.refresh();
  }, k = (i) => {
    e.onSaveFailure(i);
  }, x = (i) => {
    e.onSaveSuccess(i);
  }, I = (i) => (S(), !1);
  o !== void 0 && !m && w();
  const {
    doCancel: v,
    doSaveClose: b,
    doSaveNew: K,
    handleKeyPress: r,
    setValid: h,
    isValid: n,
    formRef: y
  } = q({ onCancel: S, onComplete: M, onFailure: k, onSave: x }), T = e.EditFormlet, p = e.NewFormlet, O = o?.[l] ? N(e.title, "edit") : N(e.title, "new"), V = e.customDataSection?.new || "", j = e.customDataSection?.edit || "";
  return /* @__PURE__ */ t(C, { children: /* @__PURE__ */ a(
    L,
    {
      opened: m,
      onClose: v,
      onKeyDown: r,
      title: O,
      centered: !0,
      children: [
        o?.[l] ? /* @__PURE__ */ t(
          z,
          {
            setValid: h,
            formRef: y,
            onQueryFailure: I,
            handleKeyPress: r,
            options: e.options,
            customDataSection: j,
            ...e.options,
            id: o?.[l],
            FORMLET: T
          }
        ) : /* @__PURE__ */ t(
          A,
          {
            setValid: h,
            formRef: y,
            customDataSection: V,
            handleKeyPress: r,
            options: e.options,
            ...e.options,
            initialData: o,
            FORMLET: p
          }
        ),
        /* @__PURE__ */ a("div", { className: "py-drawer-form-btn-container", children: [
          /* @__PURE__ */ t(
            c,
            {
              className: "py-cancel-filled-button",
              onClick: v,
              tabIndex: -1,
              leftSection: /* @__PURE__ */ t(_, { className: "py-button-icon" }),
              children: "Cancel"
            }
          ),
          !o?.[l] && e.enableSaveVariants ? /* @__PURE__ */ a(C, { children: [
            /* @__PURE__ */ t("div", { children: /* @__PURE__ */ a(
              c,
              {
                disabled: !n,
                className: n ? "py-filled-button" : "py-disabled-button",
                onClick: K,
                leftSection: /* @__PURE__ */ t(d, { className: "py-button-icon" }),
                children: [
                  /* @__PURE__ */ t("u", { children: "S" }),
                  "ave & New"
                ]
              }
            ) }),
            /* @__PURE__ */ t("div", { children: /* @__PURE__ */ a(
              c,
              {
                disabled: !n,
                className: n ? "py-filled-button" : "py-disabled-button",
                onClick: b,
                leftSection: /* @__PURE__ */ t(d, { className: "py-button-icon" }),
                children: [
                  /* @__PURE__ */ t("u", { children: "S" }),
                  "ave & Close"
                ]
              }
            ) })
          ] }) : /* @__PURE__ */ t("div", { children: /* @__PURE__ */ a(
            c,
            {
              disabled: !n,
              className: n ? "py-filled-button" : "py-disabled-button",
              onClick: b,
              leftSection: /* @__PURE__ */ t(d, { className: "py-button-icon" }),
              children: [
                /* @__PURE__ */ t("u", { children: "S" }),
                "ave"
              ]
            }
          ) })
        ] })
      ]
    }
  ) });
});
export {
  oe as SummaryDialogForm
};
