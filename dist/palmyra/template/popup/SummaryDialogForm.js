import { jsx as e, Fragment as N, jsxs as i } from "react/jsx-runtime";
import { Modal as L, Button as a } from "@mantine/core";
import { useDisclosure as O } from "@mantine/hooks";
import { forwardRef as B, useState as H, useRef as F, useImperativeHandle as P } from "react";
import { I as Q } from "../../../chunks/index.js";
import { M as s } from "../../../chunks/index2.js";
import { useSaveForm as _ } from "../hooks/useSaveForm.js";
import { getTitle as D } from "../util/TitleUtil.js";
import { EditForm as q } from "./EditForm.js";
import { NewForm as z } from "./NewForm.js";
const te = B((t, w) => {
  const [d, { open: p, close: m }] = O(!1), l = t.idKey || "id", [o, c] = H(void 0), R = F(0), u = t.gridRef, g = w || F(null);
  P(g, () => ({ setData: c }), [u]);
  const f = () => {
    c(void 0), m();
  }, E = () => {
    c(void 0), b(), m();
  }, b = () => {
    R.current += 1, u.current.refresh();
  }, M = (C) => {
    console.log(C);
  }, k = (C) => (f(), !1);
  o !== void 0 && !d && p();
  const {
    doCancel: y,
    doSaveClose: S,
    doSaveNew: x,
    handleKeyPress: r,
    setValid: h,
    isValid: n,
    formRef: v
  } = _({ onCancel: f, onComplete: E, onFailure: M, onSave: b }), I = t.EditFormlet, K = t.NewFormlet, T = o?.[l] ? D(t.title, "edit") : D(t.title, "new"), V = t.customDataSection?.new || "", j = t.customDataSection?.edit || "";
  return /* @__PURE__ */ e(N, { children: /* @__PURE__ */ i(
    L,
    {
      opened: d,
      onClose: y,
      onKeyDown: r,
      title: T,
      centered: !0,
      children: [
        o?.[l] ? /* @__PURE__ */ e(
          q,
          {
            setValid: h,
            formRef: v,
            onQueryFailure: k,
            handleKeyPress: r,
            options: t.options,
            customDataSection: j,
            ...t.options,
            id: o?.[l],
            FORMLET: I
          }
        ) : /* @__PURE__ */ e(
          z,
          {
            setValid: h,
            formRef: v,
            customDataSection: V,
            handleKeyPress: r,
            options: t.options,
            ...t.options,
            initialData: o,
            FORMLET: K
          }
        ),
        /* @__PURE__ */ i("div", { className: "py-drawer-form-btn-container", children: [
          /* @__PURE__ */ e(
            a,
            {
              className: "py-cancel-filled-button",
              onClick: y,
              tabIndex: -1,
              leftSection: /* @__PURE__ */ e(Q, { className: "py-button-icon" }),
              children: "Cancel"
            }
          ),
          !o?.[l] && t.enableSaveVariants ? /* @__PURE__ */ i(N, { children: [
            /* @__PURE__ */ e("div", { children: /* @__PURE__ */ i(
              a,
              {
                disabled: !n,
                className: n ? "py-filled-button" : "py-disabled-button",
                onClick: x,
                leftSection: /* @__PURE__ */ e(s, { className: "py-button-icon" }),
                children: [
                  /* @__PURE__ */ e("u", { children: "S" }),
                  "ave & New"
                ]
              }
            ) }),
            /* @__PURE__ */ e("div", { children: /* @__PURE__ */ i(
              a,
              {
                disabled: !n,
                className: n ? "py-filled-button" : "py-disabled-button",
                onClick: S,
                leftSection: /* @__PURE__ */ e(s, { className: "py-button-icon" }),
                children: [
                  /* @__PURE__ */ e("u", { children: "S" }),
                  "ave & Close"
                ]
              }
            ) })
          ] }) : /* @__PURE__ */ e("div", { children: /* @__PURE__ */ i(
            a,
            {
              disabled: !n,
              className: n ? "py-filled-button" : "py-disabled-button",
              onClick: S,
              leftSection: /* @__PURE__ */ e(s, { className: "py-button-icon" }),
              children: [
                /* @__PURE__ */ e("u", { children: "S" }),
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
  te as SummaryDialogForm
};
