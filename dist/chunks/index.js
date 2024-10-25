import a from "react";
var g = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
}, f = a.createContext && /* @__PURE__ */ a.createContext(g), d = ["attr", "size", "title"];
function O(t, e) {
  if (t == null) return {};
  var r = y(t, e), n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++)
      n = o[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t, n) && (r[n] = t[n]);
  }
  return r;
}
function y(t, e) {
  if (t == null) return {};
  var r = {};
  for (var n in t)
    if (Object.prototype.hasOwnProperty.call(t, n)) {
      if (e.indexOf(n) >= 0) continue;
      r[n] = t[n];
    }
  return r;
}
function l() {
  return l = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
    }
    return t;
  }, l.apply(this, arguments);
}
function m(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function u(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? m(Object(r), !0).forEach(function(n) {
      h(t, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : m(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t;
}
function h(t, e, r) {
  return e = w(e), e in t ? Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = r, t;
}
function w(t) {
  var e = j(t, "string");
  return typeof e == "symbol" ? e : e + "";
}
function j(t, e) {
  if (typeof t != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
function p(t) {
  return t && t.map((e, r) => /* @__PURE__ */ a.createElement(e.tag, u({
    key: r
  }, e.attr), p(e.child)));
}
function v(t) {
  return (e) => /* @__PURE__ */ a.createElement(P, l({
    attr: u({}, t.attr)
  }, e), p(t.child));
}
function P(t) {
  var e = (r) => {
    var {
      attr: n,
      size: i,
      title: o
    } = t, b = O(t, d), s = i || r.size || "1em", c;
    return r.className && (c = r.className), t.className && (c = (c ? c + " " : "") + t.className), /* @__PURE__ */ a.createElement("svg", l({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, r.attr, n, b, {
      className: c,
      style: u(u({
        color: t.color || r.color
      }, r.style), t.style),
      height: s,
      width: s,
      xmlns: "http://www.w3.org/2000/svg"
    }), o && /* @__PURE__ */ a.createElement("title", null, o), t.children);
  };
  return f !== void 0 ? /* @__PURE__ */ a.createElement(f.Consumer, null, (r) => e(r)) : e(g);
}
function E(t) {
  return v({ tag: "svg", attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z" }, child: [] }] })(t);
}
function C(t) {
  return v({ tag: "svg", attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z" }, child: [] }] })(t);
}
export {
  v as G,
  C as I,
  E as a
};
