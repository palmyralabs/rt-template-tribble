import { jsx as o, Fragment as c, jsxs as d } from "react/jsx-runtime";
import m from "react-dom/client";
import { forwardRef as u, useState as g, useRef as f, useImperativeHandle as h } from "react";
import { Modal as y, Button as C } from "@mantine/core";
const R = u(function(e, a) {
  const { buttonText: n = "OK" } = e, [l, r] = g(!e.hidden), s = a || f(null);
  h(s, () => ({
    hide: () => r(!1),
    show: () => r(!0)
  }), []);
  const i = () => {
    e.onClose && e.onClose(), r(!1);
  };
  return /* @__PURE__ */ o(c, { children: l && /* @__PURE__ */ d(
    y,
    {
      className: "py-alert-dialog",
      opened: l,
      onClose: i,
      title: e.title,
      children: [
        /* @__PURE__ */ o("div", { className: "py-alert-dialog-content", children: e.content }),
        /* @__PURE__ */ o("div", { className: "py-alert-dialog-action", children: /* @__PURE__ */ o(
          C,
          {
            onClick: i,
            className: "py-alert-dialog-button py-alert-dialog-button-ok",
            children: n
          }
        ) })
      ]
    }
  ) });
}), b = (t, e) => {
  const a = e || R, n = m.createRoot(document.getElementById("PalmyraDialogRoot")), l = () => {
    n.unmount(), t.onClose && t.onClose();
  };
  n.render(
    /* @__PURE__ */ o(a, { ...t, onClose: l })
  );
}, w = () => /* @__PURE__ */ o("div", { id: "PalmyraDialogRoot" });
export {
  R as AlertDialog,
  w as PyDialogRoot,
  b as showDialog
};
