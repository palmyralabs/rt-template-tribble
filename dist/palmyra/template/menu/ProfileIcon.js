import { jsxs as r, jsx as e } from "react/jsx-runtime";
import { Popover as i, Button as o } from "@mantine/core";
const c = (l) => /* @__PURE__ */ r("div", { className: "profile-menu", children: [
  " ",
  /* @__PURE__ */ r(i, { width: 200, position: "bottom", withArrow: !0, shadow: "md", children: [
    /* @__PURE__ */ e(i.Target, { children: /* @__PURE__ */ r(o, { children: [
      "Welcome ",
      l.displayName
    ] }) }),
    /* @__PURE__ */ e(i.Dropdown, { children: /* @__PURE__ */ r("ul", { children: [
      /* @__PURE__ */ e("li", { children: /* @__PURE__ */ e("span", { className: "profile-sub-menu", children: "Profile" }) }),
      /* @__PURE__ */ e("li", { children: /* @__PURE__ */ e("span", { className: "profile-sub-menu", children: "Settings" }) }),
      /* @__PURE__ */ e("li", { children: /* @__PURE__ */ e("span", { className: "profile-sub-menu", children: "Log out" }) })
    ] }) })
  ] })
] });
export {
  c as ProfileIcon
};
