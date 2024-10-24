import { jsxs as i, jsx as e } from "react/jsx-runtime";
import { Popover as r, Button as l } from "@mantine/core";
const c = (n) => /* @__PURE__ */ i("div", { className: "profile-menu", children: [
  " ",
  /* @__PURE__ */ i(r, { width: 200, position: "bottom", withArrow: !0, children: [
    /* @__PURE__ */ e(r.Target, { children: /* @__PURE__ */ i(l, { variant: "transparent", size: "compact-md", children: [
      "Welcome ",
      n.displayName
    ] }) }),
    /* @__PURE__ */ e(r.Dropdown, { children: /* @__PURE__ */ e("div", { className: "profile-menu-list-container", children: /* @__PURE__ */ i("ul", { children: [
      /* @__PURE__ */ e("li", { children: /* @__PURE__ */ e("span", { className: "profile-sub-menu", children: "Profile" }) }),
      /* @__PURE__ */ e("li", { children: /* @__PURE__ */ e("span", { className: "profile-sub-menu", children: "Settings" }) }),
      /* @__PURE__ */ e("li", { children: /* @__PURE__ */ e("span", { className: "profile-sub-menu", children: "Log out" }) })
    ] }) }) })
  ] })
] });
export {
  c as ProfileIcon
};
