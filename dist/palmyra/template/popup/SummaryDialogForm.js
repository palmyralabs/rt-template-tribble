import { jsx as t, Fragment as k, jsxs as a } from "react/jsx-runtime";
import { forwardRef as j, useState as L, useRef as S, useImperativeHandle as O } from "react";
import { useSaveForm as V } from "../hooks/useSaveForm.js";
import { EditForm as B } from "./EditForm.js";
import { NewForm as H } from "./NewForm.js";
import { Modal as P, Button as D } from "@mantine/core";
import { I as Q } from "../../../chunks/index.js";
import { F as _ } from "../../../chunks/index2.js";
import { useDisclosure as q } from "@mantine/hooks";
import { getTitle as h } from "../util/TitleUtil.js";
const ee = j((e, v) => {
  const [c, { open: b, close: l }] = q(!1), n = e.idKey || "id", [o, i] = L(void 0), w = S(0), s = e.gridRef, N = v || S(null);
  O(N, () => ({ setData: i }), [s]);
  const m = () => {
    i(void 0), l();
  }, R = () => {
    i(void 0), d(), l();
  }, d = () => {
    w.current += 1, s.current.refresh();
  }, g = (y) => {
    console.log(y);
  }, E = (y) => (m(), !1);
  o !== void 0 && !c && b();
  const {
    doCancel: u,
    doSaveClose: p,
    handleKeyPress: r,
    setValid: f,
    isValid: F,
    formRef: C
  } = V({ onCancel: m, onComplete: R, onFailure: g, onSave: d }), x = e.EditFormlet, I = e.NewFormlet, K = o?.[n] ? h(e.title, "edit") : h(e.title, "new"), M = e.customDataSection?.new || "", T = e.customDataSection?.edit || "";
  return /* @__PURE__ */ t(k, { children: /* @__PURE__ */ a(
    P,
    {
      opened: c,
      onClose: u,
      onKeyDown: r,
      title: K,
      centered: !0,
      children: [
        o?.[n] ? /* @__PURE__ */ t(
          B,
          {
            setValid: f,
            formRef: C,
            onQueryFailure: E,
            handleKeyPress: r,
            options: e.options,
            customDataSection: T,
            ...e.options,
            id: o?.[n],
            FORMLET: x
          }
        ) : /* @__PURE__ */ t(
          H,
          {
            setValid: f,
            formRef: C,
            customDataSection: M,
            handleKeyPress: r,
            options: e.options,
            ...e.options,
            initialData: o,
            FORMLET: I
          }
        ),
        /* @__PURE__ */ a("div", { className: "py-drawer-form-btn-container", children: [
          /* @__PURE__ */ t(
            D,
            {
              className: "py-cancel-filled-button",
              onClick: u,
              tabIndex: -1,
              leftSection: /* @__PURE__ */ t(Q, { className: "py-button-icon" }),
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ a(
            D,
            {
              disabled: !F,
              className: F ? "py-filled-button" : "py-disabled-button",
              onClick: p,
              leftSection: /* @__PURE__ */ t(_, { className: "py-button-icon" }),
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
  ee as SummaryDialogForm
};
