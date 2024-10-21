import { jsx as o, Fragment as m, jsxs as y } from "react/jsx-runtime";
import R from "react-dom";
import { forwardRef as f, useState as g, useRef as E, useImperativeHandle as h } from "react";
import { Modal as C, Button as _ } from "@mantine/core";
var l = {}, r = R;
if (process.env.NODE_ENV === "production")
  l.createRoot = r.createRoot, l.hydrateRoot = r.hydrateRoot;
else {
  var s = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  l.createRoot = function(e, t) {
    s.usingClientEntryPoint = !0;
    try {
      return r.createRoot(e, t);
    } finally {
      s.usingClientEntryPoint = !1;
    }
  }, l.hydrateRoot = function(e, t, n) {
    s.usingClientEntryPoint = !0;
    try {
      return r.hydrateRoot(e, t, n);
    } finally {
      s.usingClientEntryPoint = !1;
    }
  };
}
const D = f(function(t, n) {
  const { buttonText: a = "OK" } = t, [i, c] = g(!t.hidden), u = n || E();
  h(u, () => ({
    hide: () => c(!1),
    show: () => c(!0)
  }), []);
  const d = () => {
    t.onClose && t.onClose(), c(!1);
  };
  return /* @__PURE__ */ o(m, { children: i && /* @__PURE__ */ y(
    C,
    {
      className: "py-alert-dialog",
      opened: i,
      onClose: d,
      title: t.title,
      children: [
        /* @__PURE__ */ o("div", { className: "py-alert-dialog-content", children: t.content }),
        /* @__PURE__ */ o("div", { className: "py-alert-dialog-action", children: /* @__PURE__ */ o(
          _,
          {
            onClick: d,
            className: "py-alert-dialog-button py-alert-dialog-button-ok",
            children: a
          }
        ) })
      ]
    }
  ) });
}), I = (e, t) => {
  const n = t || D, a = l.createRoot(document.getElementById("PalmyraDialogRoot")), i = () => {
    a.unmount(), e.onClose && e.onClose();
  };
  a.render(
    /* @__PURE__ */ o(n, { ...e, onClose: i })
  );
}, p = () => /* @__PURE__ */ o("div", { id: "PalmyraDialogRoot" });
export {
  D as AlertDialog,
  p as PyDialogRoot,
  I as showDialog
};
