import { jsx as t, Fragment as L, jsxs as c } from "react/jsx-runtime";
import { forwardRef as O, useState as V, useRef as h, useImperativeHandle as B } from "react";
import { useSaveForm as H } from "../hooks/useSaveForm.js";
import { EditForm as P } from "./EditForm.js";
import { NewForm as Q } from "./NewForm.js";
import { Modal as _, Button as v } from "@mantine/core";
import { I as q } from "../../../chunks/index.js";
import { F as z } from "../../../chunks/index2.js";
import { useDisclosure as A } from "@mantine/hooks";
import { getTitle as b } from "../util/TitleUtil.js";
const te = O((e, w) => {
  var y, S;
  const [s, { open: N, close: l }] = A(!1), n = e.idKey || "id", [o, i] = V(void 0), R = h(0), a = e.gridRef, g = w || h();
  B(g, () => ({ setData: i }), [a]);
  const m = () => {
    i(void 0), l();
  }, E = () => {
    i(void 0), d(), l();
  }, d = () => {
    R.current += 1, a.current.refresh();
  }, p = (D) => {
    console.log(D);
  }, x = (D) => (m(), !1);
  o !== void 0 && !s && N();
  const {
    doCancel: u,
    doSaveClose: I,
    handleKeyPress: r,
    setValid: f,
    isValid: F,
    formRef: C
  } = H({ onCancel: m, onComplete: E, onFailure: p, onSave: d }), K = e.EditFormlet, M = e.NewFormlet, T = o != null && o[n] ? b(e.title, "edit") : b(e.title, "new"), k = ((y = e.customDataSection) == null ? void 0 : y.new) || "", j = ((S = e.customDataSection) == null ? void 0 : S.edit) || "";
  return /* @__PURE__ */ t(L, { children: /* @__PURE__ */ c(
    _,
    {
      opened: s,
      onClose: u,
      onKeyDown: r,
      title: T,
      centered: !0,
      children: [
        o != null && o[n] ? /* @__PURE__ */ t(
          P,
          {
            setValid: f,
            formRef: C,
            onQueryFailure: x,
            handleKeyPress: r,
            options: e.options,
            customDataSection: j,
            ...e.options,
            id: o == null ? void 0 : o[n],
            FORMLET: K
          }
        ) : /* @__PURE__ */ t(
          Q,
          {
            setValid: f,
            formRef: C,
            customDataSection: k,
            handleKeyPress: r,
            options: e.options,
            ...e.options,
            initialData: o,
            FORMLET: M
          }
        ),
        /* @__PURE__ */ c("div", { className: "py-drawer-form-btn-container", children: [
          /* @__PURE__ */ t(
            v,
            {
              className: "py-cancel-filled-button",
              onClick: u,
              tabIndex: -1,
              leftSection: /* @__PURE__ */ t(q, { className: "py-button-icon" }),
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ c(
            v,
            {
              disabled: !F,
              className: F ? "py-filled-button" : "py-disabled-button",
              onClick: I,
              leftSection: /* @__PURE__ */ t(z, { className: "py-button-icon" }),
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
  te as SummaryDialogForm
};
