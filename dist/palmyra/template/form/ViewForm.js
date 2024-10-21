import { jsxs as t, jsx as i } from "react/jsx-runtime";
import { useNavigate as m } from "react-router-dom";
import { PalmyraViewForm as l } from "@palmyralabs/rt-forms";
import { Button as r } from "@mantine/core";
function N(e) {
  const a = e.id, n = e.pageName, o = m(), c = () => o("../" + n + "/edit/" + e.id), d = () => o("../" + n);
  return /* @__PURE__ */ t("div", { className: "py-form-container", children: [
    /* @__PURE__ */ t("div", { className: "py-form-header-container", children: [
      /* @__PURE__ */ i("div", { children: e.title }),
      /* @__PURE__ */ t("div", { className: "py-form-header-button-container", children: [
        /* @__PURE__ */ i(
          r,
          {
            onClick: d,
            className: "py-filled-button",
            children: "Back"
          }
        ),
        /* @__PURE__ */ i(
          r,
          {
            className: "py-filled-button",
            onClick: c,
            children: "Edit"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ i(l, { id: a, ...e.options, children: e.children })
  ] });
}
export {
  N as ViewForm
};
