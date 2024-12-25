import { jsxs as e, jsx as i } from "react/jsx-runtime";
import { useNavigate as m } from "react-router-dom";
import { PalmyraViewForm as d } from "@palmyralabs/rt-forms";
import { Button as r } from "@mantine/core";
import { G as s, a as f } from "../../../chunks/index.js";
import { getTitle as u } from "../util/TitleUtil.js";
function h(t) {
  return s({ tag: "svg", attr: { viewBox: "0 0 24 24", fill: "currentColor" }, child: [{ tag: "path", attr: { d: "M9.24264 18.9967H21V20.9967H3V16.754L12.8995 6.85453L17.1421 11.0972L9.24264 18.9967ZM14.3137 5.44032L16.435 3.319C16.8256 2.92848 17.4587 2.92848 17.8492 3.319L20.6777 6.14743C21.0682 6.53795 21.0682 7.17112 20.6777 7.56164L18.5563 9.68296L14.3137 5.44032Z" }, child: [] }] })(t);
}
function b(t) {
  const a = t.id, o = t.pageName, n = m(), c = () => n("../" + o + "/edit/" + t.id), l = () => n("../" + o);
  return /* @__PURE__ */ e("div", { className: "py-form-container", children: [
    /* @__PURE__ */ e("div", { className: "py-form-header-container", children: [
      /* @__PURE__ */ i("div", { children: u(t.title, "view") }),
      /* @__PURE__ */ e("div", { className: "py-form-header-button-container", children: [
        /* @__PURE__ */ i(
          r,
          {
            onClick: l,
            className: "py-filled-button",
            leftSection: /* @__PURE__ */ i(f, { className: "py-button-icon" }),
            children: "Back"
          }
        ),
        /* @__PURE__ */ i(
          r,
          {
            className: "py-filled-button",
            onClick: c,
            leftSection: /* @__PURE__ */ i(h, { className: "py-button-icon" }),
            children: "Edit"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ i(d, { id: a, ...t.options, children: t.children })
  ] });
}
export {
  b as ViewForm
};
