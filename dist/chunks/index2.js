import i from "react";
var y = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
}, f = i.createContext && /* @__PURE__ */ i.createContext(y), g = ["attr", "size", "title"];
function O(e, r) {
  if (e == null) return {};
  var t, n, a = p(e, r);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (n = 0; n < o.length; n++) t = o[n], r.indexOf(t) === -1 && {}.propertyIsEnumerable.call(e, t) && (a[t] = e[t]);
  }
  return a;
}
function p(e, r) {
  if (e == null) return {};
  var t = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (r.indexOf(n) !== -1) continue;
    t[n] = e[n];
  }
  return t;
}
function l() {
  return l = Object.assign ? Object.assign.bind() : function(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = arguments[r];
      for (var n in t) ({}).hasOwnProperty.call(t, n) && (e[n] = t[n]);
    }
    return e;
  }, l.apply(null, arguments);
}
function m(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    r && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), t.push.apply(t, n);
  }
  return t;
}
function u(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = arguments[r] != null ? arguments[r] : {};
    r % 2 ? m(Object(t), !0).forEach(function(n) {
      h(e, n, t[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : m(Object(t)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n));
    });
  }
  return e;
}
function h(e, r, t) {
  return (r = w(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e;
}
function w(e) {
  var r = j(e, "string");
  return typeof r == "symbol" ? r : r + "";
}
function j(e, r) {
  if (typeof e != "object" || !e) return e;
  var t = e[Symbol.toPrimitive];
  if (t !== void 0) {
    var n = t.call(e, r);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(e);
}
function b(e) {
  return e && e.map((r, t) => /* @__PURE__ */ i.createElement(r.tag, u({
    key: t
  }, r.attr), b(r.child)));
}
function d(e) {
  return (r) => /* @__PURE__ */ i.createElement(P, l({
    attr: u({}, e.attr)
  }, r), b(e.child));
}
function P(e) {
  var r = (t) => {
    var n = e.attr, a = e.size, o = e.title, v = O(e, g), s = a || t.size || "1em", c;
    return t.className && (c = t.className), e.className && (c = (c ? c + " " : "") + e.className), /* @__PURE__ */ i.createElement("svg", l({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, t.attr, n, v, {
      className: c,
      style: u(u({
        color: e.color || t.color
      }, t.style), e.style),
      height: s,
      width: s,
      xmlns: "http://www.w3.org/2000/svg"
    }), o && /* @__PURE__ */ i.createElement("title", null, o), e.children);
  };
  return f !== void 0 ? /* @__PURE__ */ i.createElement(f.Consumer, null, (t) => r(t)) : r(y);
}
function E(e) {
  return d({ attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z" }, child: [] }] })(e);
}
function z(e) {
  return d({ attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z" }, child: [] }] })(e);
}
export {
  d as G,
  E as I,
  z as a
};
