import { jsx as dh, Fragment as fb, jsxs as ob } from "react/jsx-runtime";
import uS, { forwardRef as sb, useState as rb, useRef as db, useImperativeHandle as hb } from "react";
import iS from "react-dom";
import { Modal as yb, Button as mb } from "@mantine/core";
function vb(j) {
  return j && j.__esModule && Object.prototype.hasOwnProperty.call(j, "default") ? j.default : j;
}
var cg = { exports: {} }, Lm = {}, Yv = { exports: {} }, ug = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var eS;
function pb() {
  return eS || (eS = 1, function(j) {
    function yt(C, w) {
      var L = C.length;
      C.push(w);
      e: for (; 0 < L; ) {
        var ae = L - 1 >>> 1, le = C[ae];
        if (0 < zt(le, w))
          C[ae] = w, C[L] = le, L = ae;
        else break e;
      }
    }
    function ct(C) {
      return C.length === 0 ? null : C[0];
    }
    function x(C) {
      if (C.length === 0) return null;
      var w = C[0], L = C.pop();
      if (L !== w) {
        C[0] = L;
        e: for (var ae = 0, le = C.length, Ce = le >>> 1; ae < Ce; ) {
          var be = 2 * (ae + 1) - 1, At = C[be], ie = be + 1, ot = C[ie];
          if (0 > zt(At, L))
            ie < le && 0 > zt(ot, At) ? (C[ae] = ot, C[ie] = L, ae = ie) : (C[ae] = At, C[be] = L, ae = be);
          else if (ie < le && 0 > zt(ot, L))
            C[ae] = ot, C[ie] = L, ae = ie;
          else break e;
        }
      }
      return w;
    }
    function zt(C, w) {
      var L = C.sortIndex - w.sortIndex;
      return L !== 0 ? L : C.id - w.id;
    }
    if (j.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var kl = performance;
      j.unstable_now = function() {
        return kl.now();
      };
    } else {
      var bl = Date, we = bl.now();
      j.unstable_now = function() {
        return bl.now() - we;
      };
    }
    var _ = [], Jt = [], Kn = 1, kt = null, Ne = 3, cl = !1, ft = !1, Gt = !1, ln = typeof setTimeout == "function" ? setTimeout : null, Ke = typeof clearTimeout == "function" ? clearTimeout : null, ne = typeof setImmediate < "u" ? setImmediate : null;
    function $l(C) {
      for (var w = ct(Jt); w !== null; ) {
        if (w.callback === null) x(Jt);
        else if (w.startTime <= C)
          x(Jt), w.sortIndex = w.expirationTime, yt(_, w);
        else break;
        w = ct(Jt);
      }
    }
    function P(C) {
      if (Gt = !1, $l(C), !ft)
        if (ct(_) !== null)
          ft = !0, $();
        else {
          var w = ct(Jt);
          w !== null && Bl(P, w.startTime - C);
        }
    }
    var Ul = !1, Hl = -1, xi = 5, Cl = -1;
    function te() {
      return !(j.unstable_now() - Cl < xi);
    }
    function Ee() {
      if (Ul) {
        var C = j.unstable_now();
        Cl = C;
        var w = !0;
        try {
          e: {
            ft = !1, Gt && (Gt = !1, Ke(Hl), Hl = -1), cl = !0;
            var L = Ne;
            try {
              t: {
                for ($l(C), kt = ct(_); kt !== null && !(kt.expirationTime > C && te()); ) {
                  var ae = kt.callback;
                  if (typeof ae == "function") {
                    kt.callback = null, Ne = kt.priorityLevel;
                    var le = ae(
                      kt.expirationTime <= C
                    );
                    if (C = j.unstable_now(), typeof le == "function") {
                      kt.callback = le, $l(C), w = !0;
                      break t;
                    }
                    kt === ct(_) && x(_), $l(C);
                  } else x(_);
                  kt = ct(_);
                }
                if (kt !== null) w = !0;
                else {
                  var Ce = ct(Jt);
                  Ce !== null && Bl(
                    P,
                    Ce.startTime - C
                  ), w = !1;
                }
              }
              break e;
            } finally {
              kt = null, Ne = L, cl = !1;
            }
            w = void 0;
          }
        } finally {
          w ? xl() : Ul = !1;
        }
      }
    }
    var xl;
    if (typeof ne == "function")
      xl = function() {
        ne(Ee);
      };
    else if (typeof MessageChannel < "u") {
      var Ba = new MessageChannel(), Wl = Ba.port2;
      Ba.port1.onmessage = Ee, xl = function() {
        Wl.postMessage(null);
      };
    } else
      xl = function() {
        ln(Ee, 0);
      };
    function $() {
      Ul || (Ul = !0, xl());
    }
    function Bl(C, w) {
      Hl = ln(function() {
        C(j.unstable_now());
      }, w);
    }
    j.unstable_IdlePriority = 5, j.unstable_ImmediatePriority = 1, j.unstable_LowPriority = 4, j.unstable_NormalPriority = 3, j.unstable_Profiling = null, j.unstable_UserBlockingPriority = 2, j.unstable_cancelCallback = function(C) {
      C.callback = null;
    }, j.unstable_continueExecution = function() {
      ft || cl || (ft = !0, $());
    }, j.unstable_forceFrameRate = function(C) {
      0 > C || 125 < C ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : xi = 0 < C ? Math.floor(1e3 / C) : 5;
    }, j.unstable_getCurrentPriorityLevel = function() {
      return Ne;
    }, j.unstable_getFirstCallbackNode = function() {
      return ct(_);
    }, j.unstable_next = function(C) {
      switch (Ne) {
        case 1:
        case 2:
        case 3:
          var w = 3;
          break;
        default:
          w = Ne;
      }
      var L = Ne;
      Ne = w;
      try {
        return C();
      } finally {
        Ne = L;
      }
    }, j.unstable_pauseExecution = function() {
    }, j.unstable_requestPaint = function() {
    }, j.unstable_runWithPriority = function(C, w) {
      switch (C) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          C = 3;
      }
      var L = Ne;
      Ne = C;
      try {
        return w();
      } finally {
        Ne = L;
      }
    }, j.unstable_scheduleCallback = function(C, w, L) {
      var ae = j.unstable_now();
      switch (typeof L == "object" && L !== null ? (L = L.delay, L = typeof L == "number" && 0 < L ? ae + L : ae) : L = ae, C) {
        case 1:
          var le = -1;
          break;
        case 2:
          le = 250;
          break;
        case 5:
          le = 1073741823;
          break;
        case 4:
          le = 1e4;
          break;
        default:
          le = 5e3;
      }
      return le = L + le, C = {
        id: Kn++,
        callback: w,
        priorityLevel: C,
        startTime: L,
        expirationTime: le,
        sortIndex: -1
      }, L > ae ? (C.sortIndex = L, yt(Jt, C), ct(_) === null && C === ct(Jt) && (Gt ? (Ke(Hl), Hl = -1) : Gt = !0, Bl(P, L - ae))) : (C.sortIndex = le, yt(_, C), ft || cl || (ft = !0, $())), C;
    }, j.unstable_shouldYield = te, j.unstable_wrapCallback = function(C) {
      var w = Ne;
      return function() {
        var L = Ne;
        Ne = w;
        try {
          return C.apply(this, arguments);
        } finally {
          Ne = L;
        }
      };
    };
  }(ug)), ug;
}
var ig = {};
/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var tS;
function gb() {
  return tS || (tS = 1, function(j) {
    process.env.NODE_ENV !== "production" && function() {
      function yt() {
        if (te) {
          var C = j.unstable_now();
          Ba = C;
          var w = !0;
          try {
            e: {
              P = !1, Ul && (Ul = !1, xi(Ee), Ee = -1), $l = !0;
              var L = ne;
              try {
                t: {
                  for (bl(C), Ke = x(ft); Ke !== null && !(Ke.expirationTime > C && _()); ) {
                    var ae = Ke.callback;
                    if (typeof ae == "function") {
                      Ke.callback = null, ne = Ke.priorityLevel;
                      var le = ae(
                        Ke.expirationTime <= C
                      );
                      if (C = j.unstable_now(), typeof le == "function") {
                        Ke.callback = le, bl(C), w = !0;
                        break t;
                      }
                      Ke === x(ft) && zt(ft), bl(C);
                    } else zt(ft);
                    Ke = x(ft);
                  }
                  if (Ke !== null) w = !0;
                  else {
                    var Ce = x(Gt);
                    Ce !== null && Kn(
                      we,
                      Ce.startTime - C
                    ), w = !1;
                  }
                }
                break e;
              } finally {
                Ke = null, ne = L, $l = !1;
              }
              w = void 0;
            }
          } finally {
            w ? Wl() : te = !1;
          }
        }
      }
      function ct(C, w) {
        var L = C.length;
        C.push(w);
        e: for (; 0 < L; ) {
          var ae = L - 1 >>> 1, le = C[ae];
          if (0 < kl(le, w))
            C[ae] = w, C[L] = le, L = ae;
          else break e;
        }
      }
      function x(C) {
        return C.length === 0 ? null : C[0];
      }
      function zt(C) {
        if (C.length === 0) return null;
        var w = C[0], L = C.pop();
        if (L !== w) {
          C[0] = L;
          e: for (var ae = 0, le = C.length, Ce = le >>> 1; ae < Ce; ) {
            var be = 2 * (ae + 1) - 1, At = C[be], ie = be + 1, ot = C[ie];
            if (0 > kl(At, L))
              ie < le && 0 > kl(ot, At) ? (C[ae] = ot, C[ie] = L, ae = ie) : (C[ae] = At, C[be] = L, ae = be);
            else if (ie < le && 0 > kl(ot, L))
              C[ae] = ot, C[ie] = L, ae = ie;
            else break e;
          }
        }
        return w;
      }
      function kl(C, w) {
        var L = C.sortIndex - w.sortIndex;
        return L !== 0 ? L : C.id - w.id;
      }
      function bl(C) {
        for (var w = x(Gt); w !== null; ) {
          if (w.callback === null) zt(Gt);
          else if (w.startTime <= C)
            zt(Gt), w.sortIndex = w.expirationTime, ct(ft, w);
          else break;
          w = x(Gt);
        }
      }
      function we(C) {
        if (Ul = !1, bl(C), !P)
          if (x(ft) !== null)
            P = !0, Jt();
          else {
            var w = x(Gt);
            w !== null && Kn(
              we,
              w.startTime - C
            );
          }
      }
      function _() {
        return !(j.unstable_now() - Ba < xl);
      }
      function Jt() {
        te || (te = !0, Wl());
      }
      function Kn(C, w) {
        Ee = Hl(function() {
          C(j.unstable_now());
        }, w);
      }
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error()), j.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
        var kt = performance;
        j.unstable_now = function() {
          return kt.now();
        };
      } else {
        var Ne = Date, cl = Ne.now();
        j.unstable_now = function() {
          return Ne.now() - cl;
        };
      }
      var ft = [], Gt = [], ln = 1, Ke = null, ne = 3, $l = !1, P = !1, Ul = !1, Hl = typeof setTimeout == "function" ? setTimeout : null, xi = typeof clearTimeout == "function" ? clearTimeout : null, Cl = typeof setImmediate < "u" ? setImmediate : null, te = !1, Ee = -1, xl = 5, Ba = -1;
      if (typeof Cl == "function")
        var Wl = function() {
          Cl(yt);
        };
      else if (typeof MessageChannel < "u") {
        var $ = new MessageChannel(), Bl = $.port2;
        $.port1.onmessage = yt, Wl = function() {
          Bl.postMessage(null);
        };
      } else
        Wl = function() {
          Hl(yt, 0);
        };
      j.unstable_IdlePriority = 5, j.unstable_ImmediatePriority = 1, j.unstable_LowPriority = 4, j.unstable_NormalPriority = 3, j.unstable_Profiling = null, j.unstable_UserBlockingPriority = 2, j.unstable_cancelCallback = function(C) {
        C.callback = null;
      }, j.unstable_continueExecution = function() {
        P || $l || (P = !0, Jt());
      }, j.unstable_forceFrameRate = function(C) {
        0 > C || 125 < C ? console.error(
          "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
        ) : xl = 0 < C ? Math.floor(1e3 / C) : 5;
      }, j.unstable_getCurrentPriorityLevel = function() {
        return ne;
      }, j.unstable_getFirstCallbackNode = function() {
        return x(ft);
      }, j.unstable_next = function(C) {
        switch (ne) {
          case 1:
          case 2:
          case 3:
            var w = 3;
            break;
          default:
            w = ne;
        }
        var L = ne;
        ne = w;
        try {
          return C();
        } finally {
          ne = L;
        }
      }, j.unstable_pauseExecution = function() {
      }, j.unstable_requestPaint = function() {
      }, j.unstable_runWithPriority = function(C, w) {
        switch (C) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            C = 3;
        }
        var L = ne;
        ne = C;
        try {
          return w();
        } finally {
          ne = L;
        }
      }, j.unstable_scheduleCallback = function(C, w, L) {
        var ae = j.unstable_now();
        switch (typeof L == "object" && L !== null ? (L = L.delay, L = typeof L == "number" && 0 < L ? ae + L : ae) : L = ae, C) {
          case 1:
            var le = -1;
            break;
          case 2:
            le = 250;
            break;
          case 5:
            le = 1073741823;
            break;
          case 4:
            le = 1e4;
            break;
          default:
            le = 5e3;
        }
        return le = L + le, C = {
          id: ln++,
          callback: w,
          priorityLevel: C,
          startTime: L,
          expirationTime: le,
          sortIndex: -1
        }, L > ae ? (C.sortIndex = L, ct(Gt, C), x(ft) === null && C === x(Gt) && (Ul ? (xi(Ee), Ee = -1) : Ul = !0, Kn(we, L - ae))) : (C.sortIndex = le, ct(ft, C), P || $l || (P = !0, Jt())), C;
      }, j.unstable_shouldYield = _, j.unstable_wrapCallback = function(C) {
        var w = ne;
        return function() {
          var L = ne;
          ne = w;
          try {
            return C.apply(this, arguments);
          } finally {
            ne = L;
          }
        };
      }, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    }();
  }(ig)), ig;
}
var lS;
function cS() {
  return lS || (lS = 1, process.env.NODE_ENV === "production" ? Yv.exports = pb() : Yv.exports = gb()), Yv.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aS;
function Sb() {
  if (aS) return Lm;
  aS = 1;
  var j = cS(), yt = uS, ct = iS;
  function x(l) {
    var n = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      n += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var u = 2; u < arguments.length; u++)
        n += "&args[]=" + encodeURIComponent(arguments[u]);
    }
    return "Minified React error #" + l + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function zt(l) {
    return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
  }
  var kl = Symbol.for("react.element"), bl = Symbol.for("react.transitional.element"), we = Symbol.for("react.portal"), _ = Symbol.for("react.fragment"), Jt = Symbol.for("react.strict_mode"), Kn = Symbol.for("react.profiler"), kt = Symbol.for("react.provider"), Ne = Symbol.for("react.consumer"), cl = Symbol.for("react.context"), ft = Symbol.for("react.forward_ref"), Gt = Symbol.for("react.suspense"), ln = Symbol.for("react.suspense_list"), Ke = Symbol.for("react.memo"), ne = Symbol.for("react.lazy"), $l = Symbol.for("react.offscreen"), P = Symbol.for("react.memo_cache_sentinel"), Ul = Symbol.iterator;
  function Hl(l) {
    return l === null || typeof l != "object" ? null : (l = Ul && l[Ul] || l["@@iterator"], typeof l == "function" ? l : null);
  }
  var xi = Symbol.for("react.client.reference");
  function Cl(l) {
    if (l == null) return null;
    if (typeof l == "function")
      return l.$$typeof === xi ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case _:
        return "Fragment";
      case we:
        return "Portal";
      case Kn:
        return "Profiler";
      case Jt:
        return "StrictMode";
      case Gt:
        return "Suspense";
      case ln:
        return "SuspenseList";
    }
    if (typeof l == "object")
      switch (l.$$typeof) {
        case cl:
          return (l.displayName || "Context") + ".Provider";
        case Ne:
          return (l._context.displayName || "Context") + ".Consumer";
        case ft:
          var n = l.render;
          return l = l.displayName, l || (l = n.displayName || n.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
        case Ke:
          return n = l.displayName || null, n !== null ? n : Cl(l.type) || "Memo";
        case ne:
          n = l._payload, l = l._init;
          try {
            return Cl(l(n));
          } catch {
          }
      }
    return null;
  }
  var te = yt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Ee = Object.assign, xl, Ba;
  function Wl(l) {
    if (xl === void 0)
      try {
        throw Error();
      } catch (u) {
        var n = u.stack.trim().match(/\n( *(at )?)/);
        xl = n && n[1] || "", Ba = -1 < u.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < u.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + xl + l + Ba;
  }
  var $ = !1;
  function Bl(l, n) {
    if (!l || $) return "";
    $ = !0;
    var u = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var c = {
        DetermineComponentFrameRoot: function() {
          try {
            if (n) {
              var X = function() {
                throw Error();
              };
              if (Object.defineProperty(X.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(X, []);
                } catch (B) {
                  var O = B;
                }
                Reflect.construct(l, [], X);
              } else {
                try {
                  X.call();
                } catch (B) {
                  O = B;
                }
                l.call(X.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (B) {
                O = B;
              }
              (X = l()) && typeof X.catch == "function" && X.catch(function() {
              });
            }
          } catch (B) {
            if (B && O && typeof B.stack == "string")
              return [B.stack, O.stack];
          }
          return [null, null];
        }
      };
      c.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var s = Object.getOwnPropertyDescriptor(
        c.DetermineComponentFrameRoot,
        "name"
      );
      s && s.configurable && Object.defineProperty(
        c.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var r = c.DetermineComponentFrameRoot(), y = r[0], v = r[1];
      if (y && v) {
        var g = y.split(`
`), z = v.split(`
`);
        for (s = c = 0; c < g.length && !g[c].includes("DetermineComponentFrameRoot"); )
          c++;
        for (; s < z.length && !z[s].includes(
          "DetermineComponentFrameRoot"
        ); )
          s++;
        if (c === g.length || s === z.length)
          for (c = g.length - 1, s = z.length - 1; 1 <= c && 0 <= s && g[c] !== z[s]; )
            s--;
        for (; 1 <= c && 0 <= s; c--, s--)
          if (g[c] !== z[s]) {
            if (c !== 1 || s !== 1)
              do
                if (c--, s--, 0 > s || g[c] !== z[s]) {
                  var Y = `
` + g[c].replace(" at new ", " at ");
                  return l.displayName && Y.includes("<anonymous>") && (Y = Y.replace("<anonymous>", l.displayName)), Y;
                }
              while (1 <= c && 0 <= s);
            break;
          }
      }
    } finally {
      $ = !1, Error.prepareStackTrace = u;
    }
    return (u = l ? l.displayName || l.name : "") ? Wl(u) : "";
  }
  function C(l) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return Wl(l.type);
      case 16:
        return Wl("Lazy");
      case 13:
        return Wl("Suspense");
      case 19:
        return Wl("SuspenseList");
      case 0:
      case 15:
        return l = Bl(l.type, !1), l;
      case 11:
        return l = Bl(l.type.render, !1), l;
      case 1:
        return l = Bl(l.type, !0), l;
      default:
        return "";
    }
  }
  function w(l) {
    try {
      var n = "";
      do
        n += C(l), l = l.return;
      while (l);
      return n;
    } catch (u) {
      return `
Error generating stack: ` + u.message + `
` + u.stack;
    }
  }
  function L(l) {
    var n = l, u = l;
    if (l.alternate) for (; n.return; ) n = n.return;
    else {
      l = n;
      do
        n = l, n.flags & 4098 && (u = n.return), l = n.return;
      while (l);
    }
    return n.tag === 3 ? u : null;
  }
  function ae(l) {
    if (l.tag === 13) {
      var n = l.memoizedState;
      if (n === null && (l = l.alternate, l !== null && (n = l.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function le(l) {
    if (L(l) !== l)
      throw Error(x(188));
  }
  function Ce(l) {
    var n = l.alternate;
    if (!n) {
      if (n = L(l), n === null) throw Error(x(188));
      return n !== l ? null : l;
    }
    for (var u = l, c = n; ; ) {
      var s = u.return;
      if (s === null) break;
      var r = s.alternate;
      if (r === null) {
        if (c = s.return, c !== null) {
          u = c;
          continue;
        }
        break;
      }
      if (s.child === r.child) {
        for (r = s.child; r; ) {
          if (r === u) return le(s), l;
          if (r === c) return le(s), n;
          r = r.sibling;
        }
        throw Error(x(188));
      }
      if (u.return !== c.return) u = s, c = r;
      else {
        for (var y = !1, v = s.child; v; ) {
          if (v === u) {
            y = !0, u = s, c = r;
            break;
          }
          if (v === c) {
            y = !0, c = s, u = r;
            break;
          }
          v = v.sibling;
        }
        if (!y) {
          for (v = r.child; v; ) {
            if (v === u) {
              y = !0, u = r, c = s;
              break;
            }
            if (v === c) {
              y = !0, c = r, u = s;
              break;
            }
            v = v.sibling;
          }
          if (!y) throw Error(x(189));
        }
      }
      if (u.alternate !== c) throw Error(x(190));
    }
    if (u.tag !== 3) throw Error(x(188));
    return u.stateNode.current === u ? l : n;
  }
  function be(l) {
    var n = l.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return l;
    for (l = l.child; l !== null; ) {
      if (n = be(l), n !== null) return n;
      l = l.sibling;
    }
    return null;
  }
  var At = Array.isArray, ie = ct.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ot = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Jn = [], Gu = -1;
  function Fl(l) {
    return { current: l };
  }
  function mt(l) {
    0 > Gu || (l.current = Jn[Gu], Jn[Gu] = null, Gu--);
  }
  function Xe(l, n) {
    Gu++, Jn[Gu] = l.current, l.current = n;
  }
  var ql = Fl(null), He = Fl(null), an = Fl(null), Bi = Fl(null);
  function Ws(l, n) {
    switch (Xe(an, n), Xe(He, l), Xe(ql, null), l = n.nodeType, l) {
      case 9:
      case 11:
        n = (n = n.documentElement) && (n = n.namespaceURI) ? Ud(n) : 0;
        break;
      default:
        if (l = l === 8 ? n.parentNode : n, n = l.tagName, l = l.namespaceURI)
          l = Ud(l), n = $y(l, n);
        else
          switch (n) {
            case "svg":
              n = 1;
              break;
            case "math":
              n = 2;
              break;
            default:
              n = 0;
          }
    }
    mt(ql), Xe(ql, n);
  }
  function wc() {
    mt(ql), mt(He), mt(an);
  }
  function je(l) {
    l.memoizedState !== null && Xe(Bi, l);
    var n = ql.current, u = $y(n, l.type);
    n !== u && (Xe(He, l), Xe(ql, u));
  }
  function Fs(l) {
    He.current === l && (mt(ql), mt(He)), Bi.current === l && (mt(Bi), Kl._currentValue = ot);
  }
  var Is = Object.prototype.hasOwnProperty, qi = j.unstable_scheduleCallback, Vu = j.unstable_cancelCallback, _m = j.unstable_shouldYield, wm = j.unstable_requestPaint, Yl = j.unstable_now, Nv = j.unstable_getCurrentPriorityLevel, Km = j.unstable_ImmediatePriority, Xu = j.unstable_UserBlockingPriority, Yi = j.unstable_NormalPriority, ho = j.unstable_LowPriority, Jm = j.unstable_IdlePriority, km = j.log, $m = j.unstable_setDisableYieldValue, Ni = null, $t = null;
  function Gv(l) {
    if ($t && typeof $t.onCommitFiberRoot == "function")
      try {
        $t.onCommitFiberRoot(
          Ni,
          l,
          void 0,
          (l.current.flags & 128) === 128
        );
      } catch {
      }
  }
  function kn(l) {
    if (typeof km == "function" && $m(l), $t && typeof $t.setStrictMode == "function")
      try {
        $t.setStrictMode(Ni, l);
      } catch {
      }
  }
  var Nl = Math.clz32 ? Math.clz32 : Im, Wm = Math.log, Fm = Math.LN2;
  function Im(l) {
    return l >>>= 0, l === 0 ? 32 : 31 - (Wm(l) / Fm | 0) | 0;
  }
  var yo = 128, Ps = 4194304;
  function $n(l) {
    var n = l & 42;
    if (n !== 0) return n;
    switch (l & -l) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return l & 4194176;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return l & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return l;
    }
  }
  function nn(l, n) {
    var u = l.pendingLanes;
    if (u === 0) return 0;
    var c = 0, s = l.suspendedLanes, r = l.pingedLanes, y = l.warmLanes;
    l = l.finishedLanes !== 0;
    var v = u & 134217727;
    return v !== 0 ? (u = v & ~s, u !== 0 ? c = $n(u) : (r &= v, r !== 0 ? c = $n(r) : l || (y = v & ~y, y !== 0 && (c = $n(y))))) : (v = u & ~s, v !== 0 ? c = $n(v) : r !== 0 ? c = $n(r) : l || (y = u & ~y, y !== 0 && (c = $n(y)))), c === 0 ? 0 : n !== 0 && n !== c && !(n & s) && (s = c & -c, y = n & -n, s >= y || s === 32 && (y & 4194176) !== 0) ? n : c;
  }
  function qa(l, n) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & n) === 0;
  }
  function mo(l, n) {
    switch (l) {
      case 1:
      case 2:
      case 4:
      case 8:
        return n + 250;
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Gi() {
    var l = yo;
    return yo <<= 1, !(yo & 4194176) && (yo = 128), l;
  }
  function Dt() {
    var l = Ps;
    return Ps <<= 1, !(Ps & 62914560) && (Ps = 4194304), l;
  }
  function Wn(l) {
    for (var n = [], u = 0; 31 > u; u++) n.push(l);
    return n;
  }
  function un(l, n) {
    l.pendingLanes |= n, n !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
  }
  function Kc(l, n, u, c, s, r) {
    var y = l.pendingLanes;
    l.pendingLanes = u, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= u, l.entangledLanes &= u, l.errorRecoveryDisabledLanes &= u, l.shellSuspendCounter = 0;
    var v = l.entanglements, g = l.expirationTimes, z = l.hiddenUpdates;
    for (u = y & ~u; 0 < u; ) {
      var Y = 31 - Nl(u), X = 1 << Y;
      v[Y] = 0, g[Y] = -1;
      var O = z[Y];
      if (O !== null)
        for (z[Y] = null, Y = 0; Y < O.length; Y++) {
          var B = O[Y];
          B !== null && (B.lane &= -536870913);
        }
      u &= ~X;
    }
    c !== 0 && er(l, c, 0), r !== 0 && s === 0 && l.tag !== 0 && (l.suspendedLanes |= r & ~(y & ~n));
  }
  function er(l, n, u) {
    l.pendingLanes |= n, l.suspendedLanes &= ~n;
    var c = 31 - Nl(n);
    l.entangledLanes |= n, l.entanglements[c] = l.entanglements[c] | 1073741824 | u & 4194218;
  }
  function hh(l, n) {
    var u = l.entangledLanes |= n;
    for (l = l.entanglements; u; ) {
      var c = 31 - Nl(u), s = 1 << c;
      s & n | l[c] & n && (l[c] |= n), u &= ~s;
    }
  }
  function vo(l) {
    return l &= -l, 2 < l ? 8 < l ? l & 134217727 ? 32 : 268435456 : 8 : 2;
  }
  function po() {
    var l = ie.p;
    return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : F0(l.type));
  }
  function Fn(l, n) {
    var u = ie.p;
    try {
      return ie.p = l, n();
    } finally {
      ie.p = u;
    }
  }
  var Rt = Math.random().toString(36).slice(2), Wt = "__reactFiber$" + Rt, Gl = "__reactProps$" + Rt, In = "__reactContainer$" + Rt, tr = "__reactEvents$" + Rt, lr = "__reactListeners$" + Rt, Ta = "__reactHandles$" + Rt, yh = "__reactResources$" + Rt, Vi = "__reactMarker$" + Rt;
  function ar(l) {
    delete l[Wt], delete l[Gl], delete l[tr], delete l[lr], delete l[Ta];
  }
  function Pn(l) {
    var n = l[Wt];
    if (n) return n;
    for (var u = l.parentNode; u; ) {
      if (n = u[In] || u[Wt]) {
        if (u = n.alternate, n.child !== null || u !== null && u.child !== null)
          for (l = zs(l); l !== null; ) {
            if (u = l[Wt]) return u;
            l = zs(l);
          }
        return n;
      }
      l = u, u = l.parentNode;
    }
    return null;
  }
  function Xi(l) {
    if (l = l[Wt] || l[In]) {
      var n = l.tag;
      if (n === 5 || n === 6 || n === 13 || n === 26 || n === 27 || n === 3)
        return l;
    }
    return null;
  }
  function Jc(l) {
    var n = l.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return l.stateNode;
    throw Error(x(33));
  }
  function Ya(l) {
    var n = l[yh];
    return n || (n = l[yh] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function Mt(l) {
    l[Vi] = !0;
  }
  var mh = /* @__PURE__ */ new Set(), vh = {};
  function Qu(l, n) {
    Qi(l, n), Qi(l + "Capture", n);
  }
  function Qi(l, n) {
    for (vh[l] = n, l = 0; l < n.length; l++)
      mh.add(n[l]);
  }
  var vt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), kc = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), ju = {}, ph = {};
  function go(l) {
    return Is.call(ph, l) ? !0 : Is.call(ju, l) ? !1 : kc.test(l) ? ph[l] = !0 : (ju[l] = !0, !1);
  }
  function ji(l, n, u) {
    if (go(n))
      if (u === null) l.removeAttribute(n);
      else {
        switch (typeof u) {
          case "undefined":
          case "function":
          case "symbol":
            l.removeAttribute(n);
            return;
          case "boolean":
            var c = n.toLowerCase().slice(0, 5);
            if (c !== "data-" && c !== "aria-") {
              l.removeAttribute(n);
              return;
            }
        }
        l.setAttribute(n, "" + u);
      }
  }
  function $c(l, n, u) {
    if (u === null) l.removeAttribute(n);
    else {
      switch (typeof u) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(n);
          return;
      }
      l.setAttribute(n, "" + u);
    }
  }
  function Il(l, n, u, c) {
    if (c === null) l.removeAttribute(u);
    else {
      switch (typeof c) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(u);
          return;
      }
      l.setAttributeNS(n, u, "" + c);
    }
  }
  function Ft(l) {
    switch (typeof l) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return l;
      case "object":
        return l;
      default:
        return "";
    }
  }
  function nr(l) {
    var n = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function Vv(l) {
    var n = nr(l) ? "checked" : "value", u = Object.getOwnPropertyDescriptor(
      l.constructor.prototype,
      n
    ), c = "" + l[n];
    if (!l.hasOwnProperty(n) && typeof u < "u" && typeof u.get == "function" && typeof u.set == "function") {
      var s = u.get, r = u.set;
      return Object.defineProperty(l, n, {
        configurable: !0,
        get: function() {
          return s.call(this);
        },
        set: function(y) {
          c = "" + y, r.call(this, y);
        }
      }), Object.defineProperty(l, n, {
        enumerable: u.enumerable
      }), {
        getValue: function() {
          return c;
        },
        setValue: function(y) {
          c = "" + y;
        },
        stopTracking: function() {
          l._valueTracker = null, delete l[n];
        }
      };
    }
  }
  function ur(l) {
    l._valueTracker || (l._valueTracker = Vv(l));
  }
  function gh(l) {
    if (!l) return !1;
    var n = l._valueTracker;
    if (!n) return !0;
    var u = n.getValue(), c = "";
    return l && (c = nr(l) ? l.checked ? "true" : "false" : l.value), l = c, l !== u ? (n.setValue(l), !0) : !1;
  }
  function Wc(l) {
    if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var Sh = /[\n"\\]/g;
  function Pl(l) {
    return l.replace(
      Sh,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function ir(l, n, u, c, s, r, y, v) {
    l.name = "", y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" ? l.type = y : l.removeAttribute("type"), n != null ? y === "number" ? (n === 0 && l.value === "" || l.value != n) && (l.value = "" + Ft(n)) : l.value !== "" + Ft(n) && (l.value = "" + Ft(n)) : y !== "submit" && y !== "reset" || l.removeAttribute("value"), n != null ? Th(l, y, Ft(n)) : u != null ? Th(l, y, Ft(u)) : c != null && l.removeAttribute("value"), s == null && r != null && (l.defaultChecked = !!r), s != null && (l.checked = s && typeof s != "function" && typeof s != "symbol"), v != null && typeof v != "function" && typeof v != "symbol" && typeof v != "boolean" ? l.name = "" + Ft(v) : l.removeAttribute("name");
  }
  function bh(l, n, u, c, s, r, y, v) {
    if (r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" && (l.type = r), n != null || u != null) {
      if (!(r !== "submit" && r !== "reset" || n != null))
        return;
      u = u != null ? "" + Ft(u) : "", n = n != null ? "" + Ft(n) : u, v || n === l.value || (l.value = n), l.defaultValue = n;
    }
    c = c ?? s, c = typeof c != "function" && typeof c != "symbol" && !!c, l.checked = v ? l.checked : !!c, l.defaultChecked = !!c, y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" && (l.name = y);
  }
  function Th(l, n, u) {
    n === "number" && Wc(l.ownerDocument) === l || l.defaultValue === "" + u || (l.defaultValue = "" + u);
  }
  function Li(l, n, u, c) {
    if (l = l.options, n) {
      n = {};
      for (var s = 0; s < u.length; s++)
        n["$" + u[s]] = !0;
      for (u = 0; u < l.length; u++)
        s = n.hasOwnProperty("$" + l[u].value), l[u].selected !== s && (l[u].selected = s), s && c && (l[u].defaultSelected = !0);
    } else {
      for (u = "" + Ft(u), n = null, s = 0; s < l.length; s++) {
        if (l[s].value === u) {
          l[s].selected = !0, c && (l[s].defaultSelected = !0);
          return;
        }
        n !== null || l[s].disabled || (n = l[s]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function cr(l, n, u) {
    if (n != null && (n = "" + Ft(n), n !== l.value && (l.value = n), u == null)) {
      l.defaultValue !== n && (l.defaultValue = n);
      return;
    }
    l.defaultValue = u != null ? "" + Ft(u) : "";
  }
  function So(l, n, u, c) {
    if (n == null) {
      if (c != null) {
        if (u != null) throw Error(x(92));
        if (At(c)) {
          if (1 < c.length) throw Error(x(93));
          c = c[0];
        }
        u = c;
      }
      u == null && (u = ""), n = u;
    }
    u = Ft(n), l.defaultValue = u, c = l.textContent, c === u && c !== "" && c !== null && (l.value = c);
  }
  function cn(l, n) {
    if (n) {
      var u = l.firstChild;
      if (u && u === l.lastChild && u.nodeType === 3) {
        u.nodeValue = n;
        return;
      }
    }
    l.textContent = n;
  }
  var Xv = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Eh(l, n, u) {
    var c = n.indexOf("--") === 0;
    u == null || typeof u == "boolean" || u === "" ? c ? l.setProperty(n, "") : n === "float" ? l.cssFloat = "" : l[n] = "" : c ? l.setProperty(n, u) : typeof u != "number" || u === 0 || Xv.has(n) ? n === "float" ? l.cssFloat = u : l[n] = ("" + u).trim() : l[n] = u + "px";
  }
  function zh(l, n, u) {
    if (n != null && typeof n != "object")
      throw Error(x(62));
    if (l = l.style, u != null) {
      for (var c in u)
        !u.hasOwnProperty(c) || n != null && n.hasOwnProperty(c) || (c.indexOf("--") === 0 ? l.setProperty(c, "") : c === "float" ? l.cssFloat = "" : l[c] = "");
      for (var s in n)
        c = n[s], n.hasOwnProperty(s) && u[s] !== c && Eh(l, s, c);
    } else
      for (var r in n)
        n.hasOwnProperty(r) && Eh(l, r, n[r]);
  }
  function Zi(l) {
    if (l.indexOf("-") === -1) return !1;
    switch (l) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Pm = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), Qv = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function fr(l) {
    return Qv.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  var Ah = null;
  function Dh(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var fn = null, Lu = null;
  function Rh(l) {
    var n = Xi(l);
    if (n && (l = n.stateNode)) {
      var u = l[Gl] || null;
      e: switch (l = n.stateNode, n.type) {
        case "input":
          if (ir(
            l,
            u.value,
            u.defaultValue,
            u.defaultValue,
            u.checked,
            u.defaultChecked,
            u.type,
            u.name
          ), n = u.name, u.type === "radio" && n != null) {
            for (u = l; u.parentNode; ) u = u.parentNode;
            for (u = u.querySelectorAll(
              'input[name="' + Pl(
                "" + n
              ) + '"][type="radio"]'
            ), n = 0; n < u.length; n++) {
              var c = u[n];
              if (c !== l && c.form === l.form) {
                var s = c[Gl] || null;
                if (!s) throw Error(x(90));
                ir(
                  c,
                  s.value,
                  s.defaultValue,
                  s.defaultValue,
                  s.checked,
                  s.defaultChecked,
                  s.type,
                  s.name
                );
              }
            }
            for (n = 0; n < u.length; n++)
              c = u[n], c.form === l.form && gh(c);
          }
          break e;
        case "textarea":
          cr(l, u.value, u.defaultValue);
          break e;
        case "select":
          n = u.value, n != null && Li(l, !!u.multiple, n, !1);
      }
    }
  }
  var or = !1;
  function Fc(l, n, u) {
    if (or) return l(n, u);
    or = !0;
    try {
      var c = l(n);
      return c;
    } finally {
      if (or = !1, (fn !== null || Lu !== null) && (Dc(), fn && (n = fn, l = Lu, Lu = fn = null, Rh(n), l)))
        for (n = 0; n < l.length; n++) Rh(l[n]);
    }
  }
  function Ic(l, n) {
    var u = l.stateNode;
    if (u === null) return null;
    var c = u[Gl] || null;
    if (c === null) return null;
    u = c[n];
    e: switch (n) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (c = !c.disabled) || (l = l.type, c = !(l === "button" || l === "input" || l === "select" || l === "textarea")), l = !c;
        break e;
      default:
        l = !1;
    }
    if (l) return null;
    if (u && typeof u != "function")
      throw Error(
        x(231, n, typeof u)
      );
    return u;
  }
  var Pc = !1;
  if (vt)
    try {
      var Zu = {};
      Object.defineProperty(Zu, "passive", {
        get: function() {
          Pc = !0;
        }
      }), window.addEventListener("test", Zu, Zu), window.removeEventListener("test", Zu, Zu);
    } catch {
      Pc = !1;
    }
  var eu = null, fl = null, sr = null;
  function rr() {
    if (sr) return sr;
    var l, n = fl, u = n.length, c, s = "value" in eu ? eu.value : eu.textContent, r = s.length;
    for (l = 0; l < u && n[l] === s[l]; l++) ;
    var y = u - l;
    for (c = 1; c <= y && n[u - c] === s[r - c]; c++) ;
    return sr = s.slice(l, 1 < c ? 1 - c : void 0);
  }
  function bo(l) {
    var n = l.keyCode;
    return "charCode" in l ? (l = l.charCode, l === 0 && n === 13 && (l = 13)) : l = n, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
  }
  function To() {
    return !0;
  }
  function e0() {
    return !1;
  }
  function Vl(l) {
    function n(u, c, s, r, y) {
      this._reactName = u, this._targetInst = s, this.type = c, this.nativeEvent = r, this.target = y, this.currentTarget = null;
      for (var v in l)
        l.hasOwnProperty(v) && (u = l[v], this[v] = u ? u(r) : r[v]);
      return this.isDefaultPrevented = (r.defaultPrevented != null ? r.defaultPrevented : r.returnValue === !1) ? To : e0, this.isPropagationStopped = e0, this;
    }
    return Ee(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var u = this.nativeEvent;
        u && (u.preventDefault ? u.preventDefault() : typeof u.returnValue != "unknown" && (u.returnValue = !1), this.isDefaultPrevented = To);
      },
      stopPropagation: function() {
        var u = this.nativeEvent;
        u && (u.stopPropagation ? u.stopPropagation() : typeof u.cancelBubble != "unknown" && (u.cancelBubble = !0), this.isPropagationStopped = To);
      },
      persist: function() {
      },
      isPersistent: To
    }), n;
  }
  var _u = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(l) {
      return l.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, dr = Vl(_u), ef = Ee({}, _u, { view: 0, detail: 0 }), jv = Vl(ef), tf, hr, lf, Eo = Ee({}, ef, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: ea,
    button: 0,
    buttons: 0,
    relatedTarget: function(l) {
      return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
    },
    movementX: function(l) {
      return "movementX" in l ? l.movementX : (l !== lf && (lf && l.type === "mousemove" ? (tf = l.screenX - lf.screenX, hr = l.screenY - lf.screenY) : hr = tf = 0, lf = l), tf);
    },
    movementY: function(l) {
      return "movementY" in l ? l.movementY : hr;
    }
  }), t0 = Vl(Eo), Lv = Ee({}, Eo, { dataTransfer: 0 }), Zv = Vl(Lv), _v = Ee({}, ef, { relatedTarget: 0 }), Mh = Vl(_v), zo = Ee({}, _u, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), l0 = Vl(zo), a0 = Ee({}, _u, {
    clipboardData: function(l) {
      return "clipboardData" in l ? l.clipboardData : window.clipboardData;
    }
  }), n0 = Vl(a0), u0 = Ee({}, _u, { data: 0 }), yr = Vl(u0), wv = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, i0 = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, _i = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function wi(l) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(l) : (l = _i[l]) ? !!n[l] : !1;
  }
  function ea() {
    return wi;
  }
  var mr = Ee({}, ef, {
    key: function(l) {
      if (l.key) {
        var n = wv[l.key] || l.key;
        if (n !== "Unidentified") return n;
      }
      return l.type === "keypress" ? (l = bo(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? i0[l.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: ea,
    charCode: function(l) {
      return l.type === "keypress" ? bo(l) : 0;
    },
    keyCode: function(l) {
      return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    },
    which: function(l) {
      return l.type === "keypress" ? bo(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    }
  }), vr = Vl(mr), Oh = Ee({}, Eo, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), It = Vl(Oh), c0 = Ee({}, ef, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: ea
  }), pr = Vl(c0), Ki = Ee({}, _u, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Uh = Vl(Ki), f0 = Ee({}, Eo, {
    deltaX: function(l) {
      return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
    },
    deltaY: function(l) {
      return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), o0 = Vl(f0), Hh = Ee({}, _u, {
    newState: 0,
    oldState: 0
  }), tu = Vl(Hh), gr = [9, 13, 27, 32], Ji = vt && "CompositionEvent" in window, ki = null;
  vt && "documentMode" in document && (ki = document.documentMode);
  var Ch = vt && "TextEvent" in window && !ki, xh = vt && (!Ji || ki && 8 < ki && 11 >= ki), Na = " ", Ga = !1;
  function Ao(l, n) {
    switch (l) {
      case "keyup":
        return gr.indexOf(n.keyCode) !== -1;
      case "keydown":
        return n.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Xl(l) {
    return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
  }
  var Ea = !1;
  function s0(l, n) {
    switch (l) {
      case "compositionend":
        return Xl(n);
      case "keypress":
        return n.which !== 32 ? null : (Ga = !0, Na);
      case "textInput":
        return l = n.data, l === Na && Ga ? null : l;
      default:
        return null;
    }
  }
  function Bh(l, n) {
    if (Ea)
      return l === "compositionend" || !Ji && Ao(l, n) ? (l = rr(), sr = fl = eu = null, Ea = !1, l) : null;
    switch (l) {
      case "paste":
        return null;
      case "keypress":
        if (!(n.ctrlKey || n.altKey || n.metaKey) || n.ctrlKey && n.altKey) {
          if (n.char && 1 < n.char.length)
            return n.char;
          if (n.which) return String.fromCharCode(n.which);
        }
        return null;
      case "compositionend":
        return xh && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var qh = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function wu(l) {
    var n = l && l.nodeName && l.nodeName.toLowerCase();
    return n === "input" ? !!qh[l.type] : n === "textarea";
  }
  function Ku(l, n, u, c) {
    fn ? Lu ? Lu.push(c) : Lu = [c] : fn = c, n = yl(n, "onChange"), 0 < n.length && (u = new dr(
      "onChange",
      "change",
      null,
      u,
      c
    ), l.push({ event: u, listeners: n }));
  }
  var $i = null, Va = null;
  function r0(l) {
    Ad(l, 0);
  }
  function Do(l) {
    var n = Jc(l);
    if (gh(n)) return l;
  }
  function af(l, n) {
    if (l === "change") return n;
  }
  var nf = !1;
  if (vt) {
    var Wi;
    if (vt) {
      var Sr = "oninput" in document;
      if (!Sr) {
        var Yh = document.createElement("div");
        Yh.setAttribute("oninput", "return;"), Sr = typeof Yh.oninput == "function";
      }
      Wi = Sr;
    } else Wi = !1;
    nf = Wi && (!document.documentMode || 9 < document.documentMode);
  }
  function Nh() {
    $i && ($i.detachEvent("onpropertychange", Ro), Va = $i = null);
  }
  function Ro(l) {
    if (l.propertyName === "value" && Do(Va)) {
      var n = [];
      Ku(
        n,
        Va,
        l,
        Dh(l)
      ), Fc(r0, n);
    }
  }
  function d0(l, n, u) {
    l === "focusin" ? (Nh(), $i = n, Va = u, $i.attachEvent("onpropertychange", Ro)) : l === "focusout" && Nh();
  }
  function h0(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return Do(Va);
  }
  function y0(l, n) {
    if (l === "click") return Do(n);
  }
  function Pt(l, n) {
    if (l === "input" || l === "change")
      return Do(n);
  }
  function br(l, n) {
    return l === n && (l !== 0 || 1 / l === 1 / n) || l !== l && n !== n;
  }
  var ol = typeof Object.is == "function" ? Object.is : br;
  function lu(l, n) {
    if (ol(l, n)) return !0;
    if (typeof l != "object" || l === null || typeof n != "object" || n === null)
      return !1;
    var u = Object.keys(l), c = Object.keys(n);
    if (u.length !== c.length) return !1;
    for (c = 0; c < u.length; c++) {
      var s = u[c];
      if (!Is.call(n, s) || !ol(l[s], n[s]))
        return !1;
    }
    return !0;
  }
  function Mo(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function Oo(l, n) {
    var u = Mo(l);
    l = 0;
    for (var c; u; ) {
      if (u.nodeType === 3) {
        if (c = l + u.textContent.length, l <= n && c >= n)
          return { node: u, offset: n - l };
        l = c;
      }
      e: {
        for (; u; ) {
          if (u.nextSibling) {
            u = u.nextSibling;
            break e;
          }
          u = u.parentNode;
        }
        u = void 0;
      }
      u = Mo(u);
    }
  }
  function Uo(l, n) {
    return l && n ? l === n ? !0 : l && l.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Uo(l, n.parentNode) : "contains" in l ? l.contains(n) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function Gh(l) {
    l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
    for (var n = Wc(l.document); n instanceof l.HTMLIFrameElement; ) {
      try {
        var u = typeof n.contentWindow.location.href == "string";
      } catch {
        u = !1;
      }
      if (u) l = n.contentWindow;
      else break;
      n = Wc(l.document);
    }
    return n;
  }
  function Tr(l) {
    var n = l && l.nodeName && l.nodeName.toLowerCase();
    return n && (n === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || n === "textarea" || l.contentEditable === "true");
  }
  function Vh(l, n) {
    var u = Gh(n);
    n = l.focusedElem;
    var c = l.selectionRange;
    if (u !== n && n && n.ownerDocument && Uo(n.ownerDocument.documentElement, n)) {
      if (c !== null && Tr(n)) {
        if (l = c.start, u = c.end, u === void 0 && (u = l), "selectionStart" in n)
          n.selectionStart = l, n.selectionEnd = Math.min(
            u,
            n.value.length
          );
        else if (u = (l = n.ownerDocument || document) && l.defaultView || window, u.getSelection) {
          u = u.getSelection();
          var s = n.textContent.length, r = Math.min(c.start, s);
          c = c.end === void 0 ? r : Math.min(c.end, s), !u.extend && r > c && (s = c, c = r, r = s), s = Oo(n, r);
          var y = Oo(
            n,
            c
          );
          s && y && (u.rangeCount !== 1 || u.anchorNode !== s.node || u.anchorOffset !== s.offset || u.focusNode !== y.node || u.focusOffset !== y.offset) && (l = l.createRange(), l.setStart(s.node, s.offset), u.removeAllRanges(), r > c ? (u.addRange(l), u.extend(y.node, y.offset)) : (l.setEnd(
            y.node,
            y.offset
          ), u.addRange(l)));
        }
      }
      for (l = [], u = n; u = u.parentNode; )
        u.nodeType === 1 && l.push({
          element: u,
          left: u.scrollLeft,
          top: u.scrollTop
        });
      for (typeof n.focus == "function" && n.focus(), n = 0; n < l.length; n++)
        u = l[n], u.element.scrollLeft = u.left, u.element.scrollTop = u.top;
    }
  }
  var Xh = vt && "documentMode" in document && 11 >= document.documentMode, ta = null, Er = null, za = null, Xa = !1;
  function Ho(l, n, u) {
    var c = u.window === u ? u.document : u.nodeType === 9 ? u : u.ownerDocument;
    Xa || ta == null || ta !== Wc(c) || (c = ta, "selectionStart" in c && Tr(c) ? c = { start: c.selectionStart, end: c.selectionEnd } : (c = (c.ownerDocument && c.ownerDocument.defaultView || window).getSelection(), c = {
      anchorNode: c.anchorNode,
      anchorOffset: c.anchorOffset,
      focusNode: c.focusNode,
      focusOffset: c.focusOffset
    }), za && lu(za, c) || (za = c, c = yl(Er, "onSelect"), 0 < c.length && (n = new dr(
      "onSelect",
      "select",
      null,
      n,
      u
    ), l.push({ event: n, listeners: c }), n.target = ta)));
  }
  function au(l, n) {
    var u = {};
    return u[l.toLowerCase()] = n.toLowerCase(), u["Webkit" + l] = "webkit" + n, u["Moz" + l] = "moz" + n, u;
  }
  var Aa = {
    animationend: au("Animation", "AnimationEnd"),
    animationiteration: au("Animation", "AnimationIteration"),
    animationstart: au("Animation", "AnimationStart"),
    transitionrun: au("Transition", "TransitionRun"),
    transitionstart: au("Transition", "TransitionStart"),
    transitioncancel: au("Transition", "TransitionCancel"),
    transitionend: au("Transition", "TransitionEnd")
  }, Fi = {}, m0 = {};
  vt && (m0 = document.createElement("div").style, "AnimationEvent" in window || (delete Aa.animationend.animation, delete Aa.animationiteration.animation, delete Aa.animationstart.animation), "TransitionEvent" in window || delete Aa.transitionend.transition);
  function Ju(l) {
    if (Fi[l]) return Fi[l];
    if (!Aa[l]) return l;
    var n = Aa[l], u;
    for (u in n)
      if (n.hasOwnProperty(u) && u in m0)
        return Fi[l] = n[u];
    return l;
  }
  var v0 = Ju("animationend"), zr = Ju("animationiteration"), Co = Ju("animationstart"), p0 = Ju("transitionrun"), ve = Ju("transitionstart"), Q = Ju("transitioncancel"), Ii = Ju("transitionend"), xo = /* @__PURE__ */ new Map(), st = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll scrollEnd toggle touchMove waiting wheel".split(
    " "
  );
  function la(l, n) {
    xo.set(l, n), Qu(n, [l]);
  }
  var Ql = [], Pi = 0, Bo = 0;
  function Ar() {
    for (var l = Pi, n = Bo = Pi = 0; n < l; ) {
      var u = Ql[n];
      Ql[n++] = null;
      var c = Ql[n];
      Ql[n++] = null;
      var s = Ql[n];
      Ql[n++] = null;
      var r = Ql[n];
      if (Ql[n++] = null, c !== null && s !== null) {
        var y = c.pending;
        y === null ? s.next = s : (s.next = y.next, y.next = s), c.pending = s;
      }
      r !== 0 && Tl(u, s, r);
    }
  }
  function uf(l, n, u, c) {
    Ql[Pi++] = l, Ql[Pi++] = n, Ql[Pi++] = u, Ql[Pi++] = c, Bo |= c, l.lanes |= c, l = l.alternate, l !== null && (l.lanes |= c);
  }
  function qo(l, n, u, c) {
    return uf(l, n, u, c), Me(l);
  }
  function on(l, n) {
    return uf(l, null, null, n), Me(l);
  }
  function Tl(l, n, u) {
    l.lanes |= u;
    var c = l.alternate;
    c !== null && (c.lanes |= u);
    for (var s = !1, r = l.return; r !== null; )
      r.childLanes |= u, c = r.alternate, c !== null && (c.childLanes |= u), r.tag === 22 && (l = r.stateNode, l === null || l._visibility & 1 || (s = !0)), l = r, r = r.return;
    s && n !== null && l.tag === 3 && (r = l.stateNode, s = 31 - Nl(u), r = r.hiddenUpdates, l = r[s], l === null ? r[s] = [n] : l.push(n), n.lane = u | 536870912);
  }
  function Me(l) {
    if (50 < Gf)
      throw Gf = 0, vd = null, Error(x(185));
    for (var n = l.return; n !== null; )
      l = n, n = l.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var sn = {}, nu = /* @__PURE__ */ new WeakMap();
  function Vt(l, n) {
    if (typeof l == "object" && l !== null) {
      var u = nu.get(l);
      return u !== void 0 ? u : (n = {
        value: l,
        source: n,
        stack: w(n)
      }, nu.set(l, n), n);
    }
    return {
      value: l,
      source: n,
      stack: w(n)
    };
  }
  var sl = [], ku = 0, uu = null, cf = 0, rl = [], jl = 0, rn = null, dn = 1, hn = "";
  function $u(l, n) {
    sl[ku++] = cf, sl[ku++] = uu, uu = l, cf = n;
  }
  function Qh(l, n, u) {
    rl[jl++] = dn, rl[jl++] = hn, rl[jl++] = rn, rn = l;
    var c = dn;
    l = hn;
    var s = 32 - Nl(c) - 1;
    c &= ~(1 << s), u += 1;
    var r = 32 - Nl(n) + s;
    if (30 < r) {
      var y = s - s % 5;
      r = (c & (1 << y) - 1).toString(32), c >>= y, s -= y, dn = 1 << 32 - Nl(n) + s | u << s | c, hn = r + l;
    } else
      dn = 1 << r | u << s | c, hn = l;
  }
  function Dr(l) {
    l.return !== null && ($u(l, 1), Qh(l, 1, 0));
  }
  function Yo(l) {
    for (; l === uu; )
      uu = sl[--ku], sl[ku] = null, cf = sl[--ku], sl[ku] = null;
    for (; l === rn; )
      rn = rl[--jl], rl[jl] = null, hn = rl[--jl], rl[jl] = null, dn = rl[--jl], rl[jl] = null;
  }
  var el = null, Ot = null, De = !1, Da = null, Qa = !1, jh = Error(x(519));
  function Wu(l) {
    var n = Error(x(418, ""));
    throw of(Vt(n, l)), jh;
  }
  function Lh(l) {
    var n = l.stateNode, u = l.type, c = l.memoizedProps;
    switch (n[Wt] = l, n[Gl] = c, u) {
      case "dialog":
        ze("cancel", n), ze("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        ze("load", n);
        break;
      case "video":
      case "audio":
        for (u = 0; u < xn.length; u++)
          ze(xn[u], n);
        break;
      case "source":
        ze("error", n);
        break;
      case "img":
      case "image":
      case "link":
        ze("error", n), ze("load", n);
        break;
      case "details":
        ze("toggle", n);
        break;
      case "input":
        ze("invalid", n), bh(
          n,
          c.value,
          c.defaultValue,
          c.checked,
          c.defaultChecked,
          c.type,
          c.name,
          !0
        ), ur(n);
        break;
      case "select":
        ze("invalid", n);
        break;
      case "textarea":
        ze("invalid", n), So(n, c.value, c.defaultValue, c.children), ur(n);
    }
    u = c.children, typeof u != "string" && typeof u != "number" && typeof u != "bigint" || n.textContent === "" + u || c.suppressHydrationWarning === !0 || se(n.textContent, u) ? (c.popover != null && (ze("beforetoggle", n), ze("toggle", n)), c.onScroll != null && ze("scroll", n), c.onScrollEnd != null && ze("scrollend", n), c.onClick != null && (n.onclick = pi), n = !0) : n = !1, n || Wu(l);
  }
  function Zh(l) {
    for (el = l.return; el; )
      switch (el.tag) {
        case 3:
        case 27:
          Qa = !0;
          return;
        case 5:
        case 13:
          Qa = !1;
          return;
        default:
          el = el.return;
      }
  }
  function ec(l) {
    if (l !== el) return !1;
    if (!De) return Zh(l), De = !0, !1;
    var n = !1, u;
    if ((u = l.tag !== 3 && l.tag !== 27) && ((u = l.tag === 5) && (u = l.type, u = !(u !== "form" && u !== "button") || Ss(l.type, l.memoizedProps)), u = !u), u && (n = !0), n && Ot && Wu(l), Zh(l), l.tag === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(x(317));
      e: {
        for (l = l.nextSibling, n = 0; l; ) {
          if (l.nodeType === 8)
            if (u = l.data, u === "/$") {
              if (n === 0) {
                Ot = _t(l.nextSibling);
                break e;
              }
              n--;
            } else
              u !== "$" && u !== "$!" && u !== "$?" || n++;
          l = l.nextSibling;
        }
        Ot = null;
      }
    } else
      Ot = el ? _t(l.stateNode.nextSibling) : null;
    return !0;
  }
  function ff() {
    Ot = el = null, De = !1;
  }
  function of(l) {
    Da === null ? Da = [l] : Da.push(l);
  }
  var yn = Error(x(460)), No = Error(x(474)), Rr = { then: function() {
  } };
  function g0(l) {
    return l = l.status, l === "fulfilled" || l === "rejected";
  }
  function tc() {
  }
  function lc(l, n, u) {
    switch (u = l[u], u === void 0 ? l.push(n) : u !== n && (n.then(tc, tc), n = u), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw l = n.reason, l === yn ? Error(x(483)) : l;
      default:
        if (typeof n.status == "string") n.then(tc, tc);
        else {
          if (l = Ge, l !== null && 100 < l.shellSuspendCounter)
            throw Error(x(482));
          l = n, l.status = "pending", l.then(
            function(c) {
              if (n.status === "pending") {
                var s = n;
                s.status = "fulfilled", s.value = c;
              }
            },
            function(c) {
              if (n.status === "pending") {
                var s = n;
                s.status = "rejected", s.reason = c;
              }
            }
          );
        }
        switch (n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw l = n.reason, l === yn ? Error(x(483)) : l;
        }
        throw ac = n, yn;
    }
  }
  var ac = null;
  function Fu() {
    if (ac === null) throw Error(x(459));
    var l = ac;
    return ac = null, l;
  }
  var Ut = null, Iu = 0;
  function sf(l) {
    var n = Iu;
    return Iu += 1, Ut === null && (Ut = []), lc(Ut, l, n);
  }
  function rf(l, n) {
    n = n.props.ref, l.ref = n !== void 0 ? n : null;
  }
  function df(l, n) {
    throw n.$$typeof === kl ? Error(x(525)) : (l = Object.prototype.toString.call(n), Error(
      x(
        31,
        l === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : l
      )
    ));
  }
  function Go(l) {
    var n = l._init;
    return n(l._payload);
  }
  function Mr(l) {
    function n(A, E) {
      if (l) {
        var D = A.deletions;
        D === null ? (A.deletions = [E], A.flags |= 16) : D.push(E);
      }
    }
    function u(A, E) {
      if (!l) return null;
      for (; E !== null; )
        n(A, E), E = E.sibling;
      return null;
    }
    function c(A) {
      for (var E = /* @__PURE__ */ new Map(); A !== null; )
        A.key !== null ? E.set(A.key, A) : E.set(A.index, A), A = A.sibling;
      return E;
    }
    function s(A, E) {
      return A = $a(A, E), A.index = 0, A.sibling = null, A;
    }
    function r(A, E, D) {
      return A.index = D, l ? (D = A.alternate, D !== null ? (D = D.index, D < E ? (A.flags |= 33554434, E) : D) : (A.flags |= 33554434, E)) : (A.flags |= 1048576, E);
    }
    function y(A) {
      return l && A.alternate === null && (A.flags |= 33554434), A;
    }
    function v(A, E, D, V) {
      return E === null || E.tag !== 6 ? (E = rd(D, A.mode, V), E.return = A, E) : (E = s(E, D), E.return = A, E);
    }
    function g(A, E, D, V) {
      var k = D.type;
      return k === _ ? Y(
        A,
        E,
        D.props.children,
        V,
        D.key
      ) : E !== null && (E.elementType === k || typeof k == "object" && k !== null && k.$$typeof === ne && Go(k) === E.type) ? (E = s(E, D.props), rf(E, D), E.return = A, E) : (E = Bf(
        D.type,
        D.key,
        D.props,
        null,
        A.mode,
        V
      ), rf(E, D), E.return = A, E);
    }
    function z(A, E, D, V) {
      return E === null || E.tag !== 4 || E.stateNode.containerInfo !== D.containerInfo || E.stateNode.implementation !== D.implementation ? (E = fs(D, A.mode, V), E.return = A, E) : (E = s(E, D.children || []), E.return = A, E);
    }
    function Y(A, E, D, V, k) {
      return E === null || E.tag !== 7 ? (E = nt(
        D,
        A.mode,
        V,
        k
      ), E.return = A, E) : (E = s(E, D), E.return = A, E);
    }
    function X(A, E, D) {
      if (typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint")
        return E = rd(
          "" + E,
          A.mode,
          D
        ), E.return = A, E;
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case bl:
            return D = Bf(
              E.type,
              E.key,
              E.props,
              null,
              A.mode,
              D
            ), rf(D, E), D.return = A, D;
          case we:
            return E = fs(
              E,
              A.mode,
              D
            ), E.return = A, E;
          case ne:
            var V = E._init;
            return E = V(E._payload), X(A, E, D);
        }
        if (At(E) || Hl(E))
          return E = nt(
            E,
            A.mode,
            D,
            null
          ), E.return = A, E;
        if (typeof E.then == "function")
          return X(A, sf(E), D);
        if (E.$$typeof === cl)
          return X(
            A,
            ed(A, E),
            D
          );
        df(A, E);
      }
      return null;
    }
    function O(A, E, D, V) {
      var k = E !== null ? E.key : null;
      if (typeof D == "string" && D !== "" || typeof D == "number" || typeof D == "bigint")
        return k !== null ? null : v(A, E, "" + D, V);
      if (typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case bl:
            return D.key === k ? g(A, E, D, V) : null;
          case we:
            return D.key === k ? z(A, E, D, V) : null;
          case ne:
            return k = D._init, D = k(D._payload), O(A, E, D, V);
        }
        if (At(D) || Hl(D))
          return k !== null ? null : Y(A, E, D, V, null);
        if (typeof D.then == "function")
          return O(
            A,
            E,
            sf(D),
            V
          );
        if (D.$$typeof === cl)
          return O(
            A,
            E,
            ed(A, D),
            V
          );
        df(A, D);
      }
      return null;
    }
    function B(A, E, D, V, k) {
      if (typeof V == "string" && V !== "" || typeof V == "number" || typeof V == "bigint")
        return A = A.get(D) || null, v(E, A, "" + V, k);
      if (typeof V == "object" && V !== null) {
        switch (V.$$typeof) {
          case bl:
            return A = A.get(
              V.key === null ? D : V.key
            ) || null, g(E, A, V, k);
          case we:
            return A = A.get(
              V.key === null ? D : V.key
            ) || null, z(E, A, V, k);
          case ne:
            var de = V._init;
            return V = de(V._payload), B(
              A,
              E,
              D,
              V,
              k
            );
        }
        if (At(V) || Hl(V))
          return A = A.get(D) || null, Y(E, A, V, k, null);
        if (typeof V.then == "function")
          return B(
            A,
            E,
            D,
            sf(V),
            k
          );
        if (V.$$typeof === cl)
          return B(
            A,
            E,
            D,
            ed(E, V),
            k
          );
        df(E, V);
      }
      return null;
    }
    function J(A, E, D, V) {
      for (var k = null, de = null, I = E, ee = E = 0, qt = null; I !== null && ee < D.length; ee++) {
        I.index > ee ? (qt = I, I = null) : qt = I.sibling;
        var Oe = O(
          A,
          I,
          D[ee],
          V
        );
        if (Oe === null) {
          I === null && (I = qt);
          break;
        }
        l && I && Oe.alternate === null && n(A, I), E = r(Oe, E, ee), de === null ? k = Oe : de.sibling = Oe, de = Oe, I = qt;
      }
      if (ee === D.length)
        return u(A, I), De && $u(A, ee), k;
      if (I === null) {
        for (; ee < D.length; ee++)
          I = X(A, D[ee], V), I !== null && (E = r(
            I,
            E,
            ee
          ), de === null ? k = I : de.sibling = I, de = I);
        return De && $u(A, ee), k;
      }
      for (I = c(I); ee < D.length; ee++)
        qt = B(
          I,
          A,
          ee,
          D[ee],
          V
        ), qt !== null && (l && qt.alternate !== null && I.delete(
          qt.key === null ? ee : qt.key
        ), E = r(
          qt,
          E,
          ee
        ), de === null ? k = qt : de.sibling = qt, de = qt);
      return l && I.forEach(function(Mi) {
        return n(A, Mi);
      }), De && $u(A, ee), k;
    }
    function ue(A, E, D, V) {
      if (D == null) throw Error(x(151));
      for (var k = null, de = null, I = E, ee = E = 0, qt = null, Oe = D.next(); I !== null && !Oe.done; ee++, Oe = D.next()) {
        I.index > ee ? (qt = I, I = null) : qt = I.sibling;
        var Mi = O(A, I, Oe.value, V);
        if (Mi === null) {
          I === null && (I = qt);
          break;
        }
        l && I && Mi.alternate === null && n(A, I), E = r(Mi, E, ee), de === null ? k = Mi : de.sibling = Mi, de = Mi, I = qt;
      }
      if (Oe.done)
        return u(A, I), De && $u(A, ee), k;
      if (I === null) {
        for (; !Oe.done; ee++, Oe = D.next())
          Oe = X(A, Oe.value, V), Oe !== null && (E = r(Oe, E, ee), de === null ? k = Oe : de.sibling = Oe, de = Oe);
        return De && $u(A, ee), k;
      }
      for (I = c(I); !Oe.done; ee++, Oe = D.next())
        Oe = B(I, A, ee, Oe.value, V), Oe !== null && (l && Oe.alternate !== null && I.delete(Oe.key === null ? ee : Oe.key), E = r(Oe, E, ee), de === null ? k = Oe : de.sibling = Oe, de = Oe);
      return l && I.forEach(function(op) {
        return n(A, op);
      }), De && $u(A, ee), k;
    }
    function $e(A, E, D, V) {
      if (typeof D == "object" && D !== null && D.type === _ && D.key === null && (D = D.props.children), typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case bl:
            e: {
              for (var k = D.key; E !== null; ) {
                if (E.key === k) {
                  if (k = D.type, k === _) {
                    if (E.tag === 7) {
                      u(
                        A,
                        E.sibling
                      ), V = s(
                        E,
                        D.props.children
                      ), V.return = A, A = V;
                      break e;
                    }
                  } else if (E.elementType === k || typeof k == "object" && k !== null && k.$$typeof === ne && Go(k) === E.type) {
                    u(
                      A,
                      E.sibling
                    ), V = s(E, D.props), rf(V, D), V.return = A, A = V;
                    break e;
                  }
                  u(A, E);
                  break;
                } else n(A, E);
                E = E.sibling;
              }
              D.type === _ ? (V = nt(
                D.props.children,
                A.mode,
                V,
                D.key
              ), V.return = A, A = V) : (V = Bf(
                D.type,
                D.key,
                D.props,
                null,
                A.mode,
                V
              ), rf(V, D), V.return = A, A = V);
            }
            return y(A);
          case we:
            e: {
              for (k = D.key; E !== null; ) {
                if (E.key === k)
                  if (E.tag === 4 && E.stateNode.containerInfo === D.containerInfo && E.stateNode.implementation === D.implementation) {
                    u(
                      A,
                      E.sibling
                    ), V = s(E, D.children || []), V.return = A, A = V;
                    break e;
                  } else {
                    u(A, E);
                    break;
                  }
                else n(A, E);
                E = E.sibling;
              }
              V = fs(D, A.mode, V), V.return = A, A = V;
            }
            return y(A);
          case ne:
            return k = D._init, D = k(D._payload), $e(
              A,
              E,
              D,
              V
            );
        }
        if (At(D))
          return J(
            A,
            E,
            D,
            V
          );
        if (Hl(D)) {
          if (k = Hl(D), typeof k != "function") throw Error(x(150));
          return D = k.call(D), ue(
            A,
            E,
            D,
            V
          );
        }
        if (typeof D.then == "function")
          return $e(
            A,
            E,
            sf(D),
            V
          );
        if (D.$$typeof === cl)
          return $e(
            A,
            E,
            ed(A, D),
            V
          );
        df(A, D);
      }
      return typeof D == "string" && D !== "" || typeof D == "number" || typeof D == "bigint" ? (D = "" + D, E !== null && E.tag === 6 ? (u(A, E.sibling), V = s(E, D), V.return = A, A = V) : (u(A, E), V = rd(D, A.mode, V), V.return = A, A = V), y(A)) : u(A, E);
    }
    return function(A, E, D, V) {
      try {
        Iu = 0;
        var k = $e(
          A,
          E,
          D,
          V
        );
        return Ut = null, k;
      } catch (I) {
        if (I === yn) throw I;
        var de = xt(29, I, null, A.mode);
        return de.lanes = V, de.return = A, de;
      } finally {
      }
    };
  }
  var mn = Mr(!0), Or = Mr(!1), iu = Fl(null), hf = Fl(0);
  function _h(l, n) {
    l = Ru, Xe(hf, l), Xe(iu, n), Ru = l | n.baseLanes;
  }
  function Ur() {
    Xe(hf, Ru), Xe(iu, iu.current);
  }
  function Vo() {
    Ru = hf.current, mt(iu), mt(hf);
  }
  var aa = Fl(null), ja = null;
  function vn(l) {
    var n = l.alternate;
    Xe(St, St.current & 1), Xe(aa, l), ja === null && (n === null || iu.current !== null || n.memoizedState !== null) && (ja = l);
  }
  function wh(l) {
    if (l.tag === 22) {
      if (Xe(St, St.current), Xe(aa, l), ja === null) {
        var n = l.alternate;
        n !== null && n.memoizedState !== null && (ja = l);
      }
    } else cu();
  }
  function cu() {
    Xe(St, St.current), Xe(aa, aa.current);
  }
  function La(l) {
    mt(aa), ja === l && (ja = null), mt(St);
  }
  var St = Fl(0);
  function Xo(l) {
    for (var n = l; n !== null; ) {
      if (n.tag === 13) {
        var u = n.memoizedState;
        if (u !== null && (u = u.dehydrated, u === null || u.data === "$?" || u.data === "$!"))
          return n;
      } else if (n.tag === 19 && n.memoizedProps.revealOrder !== void 0) {
        if (n.flags & 128) return n;
      } else if (n.child !== null) {
        n.child.return = n, n = n.child;
        continue;
      }
      if (n === l) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === l) return null;
        n = n.return;
      }
      n.sibling.return = n.return, n = n.sibling;
    }
    return null;
  }
  var nc = typeof AbortController < "u" ? AbortController : function() {
    var l = [], n = this.signal = {
      aborted: !1,
      addEventListener: function(u, c) {
        l.push(c);
      }
    };
    this.abort = function() {
      n.aborted = !0, l.forEach(function(u) {
        return u();
      });
    };
  }, Kh = j.unstable_scheduleCallback, Jh = j.unstable_NormalPriority, Ht = {
    $$typeof: cl,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function kh() {
    return {
      controller: new nc(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function yf(l) {
    l.refCount--, l.refCount === 0 && Kh(Jh, function() {
      l.controller.abort();
    });
  }
  var fu = null, Qo = 0, ou = 0, uc = null;
  function S0(l, n) {
    if (fu === null) {
      var u = fu = [];
      Qo = 0, ou = Lf(), uc = {
        status: "pending",
        value: void 0,
        then: function(c) {
          u.push(c);
        }
      };
    }
    return Qo++, n.then(Hr, Hr), n;
  }
  function Hr() {
    if (--Qo === 0 && fu !== null) {
      uc !== null && (uc.status = "fulfilled");
      var l = fu;
      fu = null, ou = 0, uc = null;
      for (var n = 0; n < l.length; n++) (0, l[n])();
    }
  }
  function $h(l, n) {
    var u = [], c = {
      status: "pending",
      value: null,
      reason: null,
      then: function(s) {
        u.push(s);
      }
    };
    return l.then(
      function() {
        c.status = "fulfilled", c.value = n;
        for (var s = 0; s < u.length; s++) (0, u[s])(n);
      },
      function(s) {
        for (c.status = "rejected", c.reason = s, s = 0; s < u.length; s++)
          (0, u[s])(void 0);
      }
    ), c;
  }
  var Wh = te.S;
  te.S = function(l, n) {
    typeof n == "object" && n !== null && typeof n.then == "function" && S0(l, n), Wh !== null && Wh(l, n);
  };
  var Pu = Fl(null);
  function su() {
    var l = Pu.current;
    return l !== null ? l : Ge.pooledCache;
  }
  function jo(l, n) {
    n === null ? Xe(Pu, Pu.current) : Xe(Pu, n.pool);
  }
  function Fh() {
    var l = su();
    return l === null ? null : { parent: Ht._currentValue, pool: l };
  }
  var ru = 0, fe = null, xe = null, rt = null, mf = !1, ei = !1, ic = !1, bt = 0, vf = 0, cc = null, b0 = 0;
  function dt() {
    throw Error(x(321));
  }
  function Cr(l, n) {
    if (n === null) return !1;
    for (var u = 0; u < n.length && u < l.length; u++)
      if (!ol(l[u], n[u])) return !1;
    return !0;
  }
  function fc(l, n, u, c, s, r) {
    return ru = r, fe = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, te.H = l === null || l.memoizedState === null ? ai : vu, ic = !1, r = u(c, s), ic = !1, ei && (r = Ih(
      n,
      u,
      c,
      s
    )), xr(l), r;
  }
  function xr(l) {
    te.H = Xt;
    var n = xe !== null && xe.next !== null;
    if (ru = 0, rt = xe = fe = null, mf = !1, vf = 0, cc = null, n) throw Error(x(300));
    l === null || at || (l = l.dependencies, l !== null && ls(l) && (at = !0));
  }
  function Ih(l, n, u, c) {
    fe = l;
    var s = 0;
    do {
      if (ei && (cc = null), vf = 0, ei = !1, 25 <= s) throw Error(x(301));
      if (s += 1, rt = xe = null, l.updateQueue != null) {
        var r = l.updateQueue;
        r.lastEffect = null, r.events = null, r.stores = null, r.memoCache != null && (r.memoCache.index = 0);
      }
      te.H = rc, r = n(u, c);
    } while (ei);
    return r;
  }
  function T0() {
    var l = te.H, n = l.useState()[0];
    return n = typeof n.then == "function" ? oc(n) : n, l = l.useState()[0], (xe !== null ? xe.memoizedState : null) !== l && (fe.flags |= 1024), n;
  }
  function Br() {
    var l = bt !== 0;
    return bt = 0, l;
  }
  function Lo(l, n, u) {
    n.updateQueue = l.updateQueue, n.flags &= -2053, l.lanes &= ~u;
  }
  function Zo(l) {
    if (mf) {
      for (l = l.memoizedState; l !== null; ) {
        var n = l.queue;
        n !== null && (n.pending = null), l = l.next;
      }
      mf = !1;
    }
    ru = 0, rt = xe = fe = null, ei = !1, vf = bt = 0, cc = null;
  }
  function dl() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return rt === null ? fe.memoizedState = rt = l : rt = rt.next = l, rt;
  }
  function pt() {
    if (xe === null) {
      var l = fe.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = xe.next;
    var n = rt === null ? fe.memoizedState : rt.next;
    if (n !== null)
      rt = n, xe = l;
    else {
      if (l === null)
        throw fe.alternate === null ? Error(x(467)) : Error(x(310));
      xe = l, l = {
        memoizedState: xe.memoizedState,
        baseState: xe.baseState,
        baseQueue: xe.baseQueue,
        queue: xe.queue,
        next: null
      }, rt === null ? fe.memoizedState = rt = l : rt = rt.next = l;
    }
    return rt;
  }
  var pf;
  pf = function() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  };
  function oc(l) {
    var n = vf;
    return vf += 1, cc === null && (cc = []), l = lc(cc, l, n), n = fe, (rt === null ? n.memoizedState : rt.next) === null && (n = n.alternate, te.H = n === null || n.memoizedState === null ? ai : vu), l;
  }
  function gf(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return oc(l);
      if (l.$$typeof === cl) return tl(l);
    }
    throw Error(x(438, String(l)));
  }
  function qr(l) {
    var n = null, u = fe.updateQueue;
    if (u !== null && (n = u.memoCache), n == null) {
      var c = fe.alternate;
      c !== null && (c = c.updateQueue, c !== null && (c = c.memoCache, c != null && (n = {
        data: c.data.map(function(s) {
          return s.slice();
        }),
        index: 0
      })));
    }
    if (n == null && (n = { data: [], index: 0 }), u === null && (u = pf(), fe.updateQueue = u), u.memoCache = n, u = n.data[n.index], u === void 0)
      for (u = n.data[n.index] = Array(l), c = 0; c < l; c++)
        u[c] = P;
    return n.index++, u;
  }
  function pn(l, n) {
    return typeof n == "function" ? n(l) : n;
  }
  function Sf(l) {
    var n = pt();
    return Yr(n, xe, l);
  }
  function Yr(l, n, u) {
    var c = l.queue;
    if (c === null) throw Error(x(311));
    c.lastRenderedReducer = u;
    var s = l.baseQueue, r = c.pending;
    if (r !== null) {
      if (s !== null) {
        var y = s.next;
        s.next = r.next, r.next = y;
      }
      n.baseQueue = s = r, c.pending = null;
    }
    if (r = l.baseState, s === null) l.memoizedState = r;
    else {
      n = s.next;
      var v = y = null, g = null, z = n, Y = !1;
      do {
        var X = z.lane & -536870913;
        if (X !== z.lane ? (Ae & X) === X : (ru & X) === X) {
          var O = z.revertLane;
          if (O === 0)
            g !== null && (g = g.next = {
              lane: 0,
              revertLane: 0,
              action: z.action,
              hasEagerState: z.hasEagerState,
              eagerState: z.eagerState,
              next: null
            }), X === ou && (Y = !0);
          else if ((ru & O) === O) {
            z = z.next, O === ou && (Y = !0);
            continue;
          } else
            X = {
              lane: 0,
              revertLane: z.revertLane,
              action: z.action,
              hasEagerState: z.hasEagerState,
              eagerState: z.eagerState,
              next: null
            }, g === null ? (v = g = X, y = r) : g = g.next = X, fe.lanes |= O, si |= O;
          X = z.action, ic && u(r, X), r = z.hasEagerState ? z.eagerState : u(r, X);
        } else
          O = {
            lane: X,
            revertLane: z.revertLane,
            action: z.action,
            hasEagerState: z.hasEagerState,
            eagerState: z.eagerState,
            next: null
          }, g === null ? (v = g = O, y = r) : g = g.next = O, fe.lanes |= X, si |= X;
        z = z.next;
      } while (z !== null && z !== n);
      if (g === null ? y = r : g.next = v, !ol(r, l.memoizedState) && (at = !0, Y && (u = uc, u !== null)))
        throw u;
      l.memoizedState = r, l.baseState = y, l.baseQueue = g, c.lastRenderedState = r;
    }
    return s === null && (c.lanes = 0), [l.memoizedState, c.dispatch];
  }
  function Za(l) {
    var n = pt(), u = n.queue;
    if (u === null) throw Error(x(311));
    u.lastRenderedReducer = l;
    var c = u.dispatch, s = u.pending, r = n.memoizedState;
    if (s !== null) {
      u.pending = null;
      var y = s = s.next;
      do
        r = l(r, y.action), y = y.next;
      while (y !== s);
      ol(r, n.memoizedState) || (at = !0), n.memoizedState = r, n.baseQueue === null && (n.baseState = r), u.lastRenderedState = r;
    }
    return [r, c];
  }
  function Nr(l, n, u) {
    var c = fe, s = pt(), r = De;
    if (r) {
      if (u === void 0) throw Error(x(407));
      u = u();
    } else u = n();
    var y = !ol(
      (xe || s).memoizedState,
      u
    );
    if (y && (s.memoizedState = u, at = !0), s = s.queue, Ra(_o.bind(null, c, s, l), [
      l
    ]), s.getSnapshot !== n || y || rt !== null && rt.memoizedState.tag & 1) {
      if (c.flags |= 2048, Sn(
        9,
        Gr.bind(
          null,
          c,
          s,
          u,
          n
        ),
        { destroy: void 0 },
        null
      ), Ge === null) throw Error(x(349));
      r || ru & 60 || E0(c, n, u);
    }
    return u;
  }
  function E0(l, n, u) {
    l.flags |= 16384, l = { getSnapshot: n, value: u }, n = fe.updateQueue, n === null ? (n = pf(), fe.updateQueue = n, n.stores = [l]) : (u = n.stores, u === null ? n.stores = [l] : u.push(l));
  }
  function Gr(l, n, u, c) {
    n.value = u, n.getSnapshot = c, du(n) && gn(l);
  }
  function _o(l, n, u) {
    return u(function() {
      du(n) && gn(l);
    });
  }
  function du(l) {
    var n = l.getSnapshot;
    l = l.value;
    try {
      var u = n();
      return !ol(l, u);
    } catch {
      return !0;
    }
  }
  function gn(l) {
    var n = on(l, 2);
    n !== null && Bt(n, l, 2);
  }
  function wo(l) {
    var n = dl();
    if (typeof l == "function") {
      var u = l;
      if (l = u(), ic) {
        kn(!0);
        try {
          u();
        } finally {
          kn(!1);
        }
      }
    }
    return n.memoizedState = n.baseState = l, n.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: pn,
      lastRenderedState: l
    }, n;
  }
  function Vr(l, n, u, c) {
    return l.baseState = u, Yr(
      l,
      xe,
      typeof c == "function" ? c : pn
    );
  }
  function Ko(l, n, u, c, s) {
    if (Kr(l)) throw Error(x(485));
    if (l = n.action, l !== null) {
      var r = {
        payload: s,
        action: l,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(y) {
          r.listeners.push(y);
        }
      };
      te.T !== null ? u(!0) : r.isTransition = !1, c(r), u = n.pending, u === null ? (r.next = n.pending = r, Jo(n, r)) : (r.next = u.next, n.pending = u.next = r);
    }
  }
  function Jo(l, n) {
    var u = n.action, c = n.payload, s = l.state;
    if (n.isTransition) {
      var r = te.T, y = {};
      te.T = y;
      try {
        var v = u(s, c), g = te.S;
        g !== null && g(y, v), ti(l, n, v);
      } catch (z) {
        bf(l, n, z);
      } finally {
        te.T = r;
      }
    } else
      try {
        r = u(s, c), ti(l, n, r);
      } catch (z) {
        bf(l, n, z);
      }
  }
  function ti(l, n, u) {
    u !== null && typeof u == "object" && typeof u.then == "function" ? u.then(
      function(c) {
        Je(l, n, c);
      },
      function(c) {
        return bf(l, n, c);
      }
    ) : Je(l, n, u);
  }
  function Je(l, n, u) {
    n.status = "fulfilled", n.value = u, Ph(n), l.state = u, n = l.pending, n !== null && (u = n.next, u === n ? l.pending = null : (u = u.next, n.next = u, Jo(l, u)));
  }
  function bf(l, n, u) {
    var c = l.pending;
    if (l.pending = null, c !== null) {
      c = c.next;
      do
        n.status = "rejected", n.reason = u, Ph(n), n = n.next;
      while (n !== c);
    }
    l.action = null;
  }
  function Ph(l) {
    l = l.listeners;
    for (var n = 0; n < l.length; n++) (0, l[n])();
  }
  function Xr(l, n) {
    return n;
  }
  function Qr(l, n) {
    if (De) {
      var u = Ge.formState;
      if (u !== null) {
        e: {
          var c = fe;
          if (De) {
            if (Ot) {
              t: {
                for (var s = Ot, r = Qa; s.nodeType !== 8; ) {
                  if (!r) {
                    s = null;
                    break t;
                  }
                  if (s = _t(
                    s.nextSibling
                  ), s === null) {
                    s = null;
                    break t;
                  }
                }
                r = s.data, s = r === "F!" || r === "F" ? s : null;
              }
              if (s) {
                Ot = _t(
                  s.nextSibling
                ), c = s.data === "F!";
                break e;
              }
            }
            Wu(c);
          }
          c = !1;
        }
        c && (n = u[0]);
      }
    }
    return u = dl(), u.memoizedState = u.baseState = n, c = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Xr,
      lastRenderedState: n
    }, u.queue = c, u = wr.bind(
      null,
      fe,
      c
    ), c.dispatch = u, c = wo(!1), r = sy.bind(
      null,
      fe,
      !1,
      c.queue
    ), c = dl(), s = {
      state: n,
      dispatch: null,
      action: l,
      pending: null
    }, c.queue = s, u = Ko.bind(
      null,
      fe,
      s,
      r,
      u
    ), s.dispatch = u, c.memoizedState = l, [n, u, !1];
  }
  function hu(l) {
    var n = pt();
    return yu(n, xe, l);
  }
  function yu(l, n, u) {
    n = Yr(
      l,
      n,
      Xr
    )[0], l = Sf(pn)[0], n = typeof n == "object" && n !== null && typeof n.then == "function" ? oc(n) : n;
    var c = pt(), s = c.queue, r = s.dispatch;
    return u !== c.memoizedState && (fe.flags |= 2048, Sn(
      9,
      ko.bind(null, s, u),
      { destroy: void 0 },
      null
    )), [n, r, l];
  }
  function ko(l, n) {
    l.action = n;
  }
  function $o(l) {
    var n = pt(), u = xe;
    if (u !== null)
      return yu(n, u, l);
    pt(), n = n.memoizedState, u = pt();
    var c = u.queue.dispatch;
    return u.memoizedState = l, [n, c, !1];
  }
  function Sn(l, n, u, c) {
    return l = { tag: l, create: n, inst: u, deps: c, next: null }, n = fe.updateQueue, n === null && (n = pf(), fe.updateQueue = n), u = n.lastEffect, u === null ? n.lastEffect = l.next = l : (c = u.next, u.next = l, l.next = c, n.lastEffect = l), l;
  }
  function Tf() {
    return pt().memoizedState;
  }
  function Wo(l, n, u, c) {
    var s = dl();
    fe.flags |= l, s.memoizedState = Sn(
      1 | n,
      u,
      { destroy: void 0 },
      c === void 0 ? null : c
    );
  }
  function jr(l, n, u, c) {
    var s = pt();
    c = c === void 0 ? null : c;
    var r = s.memoizedState.inst;
    xe !== null && c !== null && Cr(c, xe.memoizedState.deps) ? s.memoizedState = Sn(n, u, r, c) : (fe.flags |= l, s.memoizedState = Sn(1 | n, u, r, c));
  }
  function ey(l, n) {
    Wo(8390656, 8, l, n);
  }
  function Ra(l, n) {
    jr(2048, 8, l, n);
  }
  function ty(l, n) {
    return jr(4, 2, l, n);
  }
  function Lr(l, n) {
    return jr(4, 4, l, n);
  }
  function Ef(l, n) {
    if (typeof n == "function") {
      l = l();
      var u = n(l);
      return function() {
        typeof u == "function" ? u() : n(null);
      };
    }
    if (n != null)
      return l = l(), n.current = l, function() {
        n.current = null;
      };
  }
  function sc(l, n, u) {
    u = u != null ? u.concat([l]) : null, jr(4, 4, Ef.bind(null, n, l), u);
  }
  function Zr() {
  }
  function _r(l, n) {
    var u = pt();
    n = n === void 0 ? null : n;
    var c = u.memoizedState;
    return n !== null && Cr(n, c[1]) ? c[0] : (u.memoizedState = [l, n], l);
  }
  function ly(l, n) {
    var u = pt();
    n = n === void 0 ? null : n;
    var c = u.memoizedState;
    if (n !== null && Cr(n, c[1]))
      return c[0];
    if (c = l(), ic) {
      kn(!0);
      try {
        l();
      } finally {
        kn(!1);
      }
    }
    return u.memoizedState = [c, n], c;
  }
  function ay(l, n, u) {
    return u === void 0 || ru & 1073741824 ? l.memoizedState = n : (l.memoizedState = u, l = zc(), fe.lanes |= l, si |= l, u);
  }
  function z0(l, n, u, c) {
    return ol(u, n) ? u : iu.current !== null ? (l = ay(l, u, c), ol(l, n) || (at = !0), l) : ru & 42 ? (l = zc(), fe.lanes |= l, si |= l, n) : (at = !0, l.memoizedState = u);
  }
  function ny(l, n, u, c, s) {
    var r = ie.p;
    ie.p = r !== 0 && 8 > r ? r : 8;
    var y = te.T, v = {};
    te.T = v, sy(l, !1, n, u);
    try {
      var g = s(), z = te.S;
      if (z !== null && z(v, g), g !== null && typeof g == "object" && typeof g.then == "function") {
        var Y = $h(
          g,
          c
        );
        li(
          l,
          n,
          Y,
          hl(l)
        );
      } else
        li(
          l,
          n,
          c,
          hl(l)
        );
    } catch (X) {
      li(
        l,
        n,
        { then: function() {
        }, status: "rejected", reason: X },
        hl()
      );
    } finally {
      ie.p = r, te.T = y;
    }
  }
  function Kv() {
  }
  function mu(l, n, u, c) {
    if (l.tag !== 5) throw Error(x(476));
    var s = Ll(l).queue;
    ny(
      l,
      s,
      n,
      ot,
      u === null ? Kv : function() {
        return uy(l), u(c);
      }
    );
  }
  function Ll(l) {
    var n = l.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: ot,
      baseState: ot,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: pn,
        lastRenderedState: ot
      },
      next: null
    };
    var u = {};
    return n.next = {
      memoizedState: u,
      baseState: u,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: pn,
        lastRenderedState: u
      },
      next: null
    }, l.memoizedState = n, l = l.alternate, l !== null && (l.memoizedState = n), n;
  }
  function uy(l) {
    var n = Ll(l).next.queue;
    li(l, n, {}, hl());
  }
  function iy() {
    return tl(Kl);
  }
  function cy() {
    return pt().memoizedState;
  }
  function fy() {
    return pt().memoizedState;
  }
  function A0(l) {
    for (var n = l.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var u = hl();
          l = bu(u);
          var c = Tu(n, l, u);
          c !== null && (Bt(c, n, u), Uf(c, n, u)), n = { cache: kh() }, l.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function oy(l, n, u) {
    var c = hl();
    u = {
      lane: c,
      revertLane: 0,
      action: u,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Kr(l) ? ry(n, u) : (u = qo(l, n, u, c), u !== null && (Bt(u, l, c), dy(u, n, c)));
  }
  function wr(l, n, u) {
    var c = hl();
    li(l, n, u, c);
  }
  function li(l, n, u, c) {
    var s = {
      lane: c,
      revertLane: 0,
      action: u,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Kr(l)) ry(n, s);
    else {
      var r = l.alternate;
      if (l.lanes === 0 && (r === null || r.lanes === 0) && (r = n.lastRenderedReducer, r !== null))
        try {
          var y = n.lastRenderedState, v = r(y, u);
          if (s.hasEagerState = !0, s.eagerState = v, ol(v, y))
            return uf(l, n, s, 0), Ge === null && Ar(), !1;
        } catch {
        } finally {
        }
      if (u = qo(l, n, s, c), u !== null)
        return Bt(u, l, c), dy(u, n, c), !0;
    }
    return !1;
  }
  function sy(l, n, u, c) {
    if (c = {
      lane: 2,
      revertLane: Lf(),
      action: c,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Kr(l)) {
      if (n) throw Error(x(479));
    } else
      n = qo(
        l,
        u,
        c,
        2
      ), n !== null && Bt(n, l, 2);
  }
  function Kr(l) {
    var n = l.alternate;
    return l === fe || n !== null && n === fe;
  }
  function ry(l, n) {
    ei = mf = !0;
    var u = l.pending;
    u === null ? n.next = n : (n.next = u.next, u.next = n), l.pending = n;
  }
  function dy(l, n, u) {
    if (u & 4194176) {
      var c = n.lanes;
      c &= l.pendingLanes, u |= c, n.lanes = u, hh(l, u);
    }
  }
  var Xt = {
    readContext: tl,
    use: gf,
    useCallback: dt,
    useContext: dt,
    useEffect: dt,
    useImperativeHandle: dt,
    useLayoutEffect: dt,
    useInsertionEffect: dt,
    useMemo: dt,
    useReducer: dt,
    useRef: dt,
    useState: dt,
    useDebugValue: dt,
    useDeferredValue: dt,
    useTransition: dt,
    useSyncExternalStore: dt,
    useId: dt
  };
  Xt.useCacheRefresh = dt, Xt.useMemoCache = dt, Xt.useHostTransitionStatus = dt, Xt.useFormState = dt, Xt.useActionState = dt, Xt.useOptimistic = dt;
  var ai = {
    readContext: tl,
    use: gf,
    useCallback: function(l, n) {
      return dl().memoizedState = [
        l,
        n === void 0 ? null : n
      ], l;
    },
    useContext: tl,
    useEffect: ey,
    useImperativeHandle: function(l, n, u) {
      u = u != null ? u.concat([l]) : null, Wo(
        4194308,
        4,
        Ef.bind(null, n, l),
        u
      );
    },
    useLayoutEffect: function(l, n) {
      return Wo(4194308, 4, l, n);
    },
    useInsertionEffect: function(l, n) {
      Wo(4, 2, l, n);
    },
    useMemo: function(l, n) {
      var u = dl();
      n = n === void 0 ? null : n;
      var c = l();
      if (ic) {
        kn(!0);
        try {
          l();
        } finally {
          kn(!1);
        }
      }
      return u.memoizedState = [c, n], c;
    },
    useReducer: function(l, n, u) {
      var c = dl();
      if (u !== void 0) {
        var s = u(n);
        if (ic) {
          kn(!0);
          try {
            u(n);
          } finally {
            kn(!1);
          }
        }
      } else s = n;
      return c.memoizedState = c.baseState = s, l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: l,
        lastRenderedState: s
      }, c.queue = l, l = l.dispatch = oy.bind(
        null,
        fe,
        l
      ), [c.memoizedState, l];
    },
    useRef: function(l) {
      var n = dl();
      return l = { current: l }, n.memoizedState = l;
    },
    useState: function(l) {
      l = wo(l);
      var n = l.queue, u = wr.bind(null, fe, n);
      return n.dispatch = u, [l.memoizedState, u];
    },
    useDebugValue: Zr,
    useDeferredValue: function(l, n) {
      var u = dl();
      return ay(u, l, n);
    },
    useTransition: function() {
      var l = wo(!1);
      return l = ny.bind(
        null,
        fe,
        l.queue,
        !0,
        !1
      ), dl().memoizedState = l, [!1, l];
    },
    useSyncExternalStore: function(l, n, u) {
      var c = fe, s = dl();
      if (De) {
        if (u === void 0)
          throw Error(x(407));
        u = u();
      } else {
        if (u = n(), Ge === null) throw Error(x(349));
        Ae & 60 || E0(c, n, u);
      }
      s.memoizedState = u;
      var r = { value: u, getSnapshot: n };
      return s.queue = r, ey(_o.bind(null, c, r, l), [
        l
      ]), c.flags |= 2048, Sn(
        9,
        Gr.bind(
          null,
          c,
          r,
          u,
          n
        ),
        { destroy: void 0 },
        null
      ), u;
    },
    useId: function() {
      var l = dl(), n = Ge.identifierPrefix;
      if (De) {
        var u = hn, c = dn;
        u = (c & ~(1 << 32 - Nl(c) - 1)).toString(32) + u, n = ":" + n + "R" + u, u = bt++, 0 < u && (n += "H" + u.toString(32)), n += ":";
      } else
        u = b0++, n = ":" + n + "r" + u.toString(32) + ":";
      return l.memoizedState = n;
    },
    useCacheRefresh: function() {
      return dl().memoizedState = A0.bind(
        null,
        fe
      );
    }
  };
  ai.useMemoCache = qr, ai.useHostTransitionStatus = iy, ai.useFormState = Qr, ai.useActionState = Qr, ai.useOptimistic = function(l) {
    var n = dl();
    n.memoizedState = n.baseState = l;
    var u = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: null,
      lastRenderedState: null
    };
    return n.queue = u, n = sy.bind(
      null,
      fe,
      !0,
      u
    ), u.dispatch = n, [l, n];
  };
  var vu = {
    readContext: tl,
    use: gf,
    useCallback: _r,
    useContext: tl,
    useEffect: Ra,
    useImperativeHandle: sc,
    useInsertionEffect: ty,
    useLayoutEffect: Lr,
    useMemo: ly,
    useReducer: Sf,
    useRef: Tf,
    useState: function() {
      return Sf(pn);
    },
    useDebugValue: Zr,
    useDeferredValue: function(l, n) {
      var u = pt();
      return z0(
        u,
        xe.memoizedState,
        l,
        n
      );
    },
    useTransition: function() {
      var l = Sf(pn)[0], n = pt().memoizedState;
      return [
        typeof l == "boolean" ? l : oc(l),
        n
      ];
    },
    useSyncExternalStore: Nr,
    useId: cy
  };
  vu.useCacheRefresh = fy, vu.useMemoCache = qr, vu.useHostTransitionStatus = iy, vu.useFormState = hu, vu.useActionState = hu, vu.useOptimistic = function(l, n) {
    var u = pt();
    return Vr(u, xe, l, n);
  };
  var rc = {
    readContext: tl,
    use: gf,
    useCallback: _r,
    useContext: tl,
    useEffect: Ra,
    useImperativeHandle: sc,
    useInsertionEffect: ty,
    useLayoutEffect: Lr,
    useMemo: ly,
    useReducer: Za,
    useRef: Tf,
    useState: function() {
      return Za(pn);
    },
    useDebugValue: Zr,
    useDeferredValue: function(l, n) {
      var u = pt();
      return xe === null ? ay(u, l, n) : z0(
        u,
        xe.memoizedState,
        l,
        n
      );
    },
    useTransition: function() {
      var l = Za(pn)[0], n = pt().memoizedState;
      return [
        typeof l == "boolean" ? l : oc(l),
        n
      ];
    },
    useSyncExternalStore: Nr,
    useId: cy
  };
  rc.useCacheRefresh = fy, rc.useMemoCache = qr, rc.useHostTransitionStatus = iy, rc.useFormState = $o, rc.useActionState = $o, rc.useOptimistic = function(l, n) {
    var u = pt();
    return xe !== null ? Vr(u, xe, l, n) : (u.baseState = l, [l, u.queue.dispatch]);
  };
  function Fo(l, n, u, c) {
    n = l.memoizedState, u = u(c, n), u = u == null ? n : Ee({}, n, u), l.memoizedState = u, l.lanes === 0 && (l.updateQueue.baseState = u);
  }
  var hy = {
    isMounted: function(l) {
      return (l = l._reactInternals) ? L(l) === l : !1;
    },
    enqueueSetState: function(l, n, u) {
      l = l._reactInternals;
      var c = hl(), s = bu(c);
      s.payload = n, u != null && (s.callback = u), n = Tu(l, s, c), n !== null && (Bt(n, l, c), Uf(n, l, c));
    },
    enqueueReplaceState: function(l, n, u) {
      l = l._reactInternals;
      var c = hl(), s = bu(c);
      s.tag = 1, s.payload = n, u != null && (s.callback = u), n = Tu(l, s, c), n !== null && (Bt(n, l, c), Uf(n, l, c));
    },
    enqueueForceUpdate: function(l, n) {
      l = l._reactInternals;
      var u = hl(), c = bu(u);
      c.tag = 2, n != null && (c.callback = n), n = Tu(l, c, u), n !== null && (Bt(n, l, u), Uf(n, l, u));
    }
  };
  function na(l, n, u, c, s, r, y) {
    return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(c, r, y) : n.prototype && n.prototype.isPureReactComponent ? !lu(u, c) || !lu(s, r) : !0;
  }
  function yy(l, n, u, c) {
    l = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(u, c), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(u, c), n.state !== l && hy.enqueueReplaceState(n, n.state, null);
  }
  function Qt(l, n) {
    var u = n;
    if ("ref" in n) {
      u = {};
      for (var c in n)
        c !== "ref" && (u[c] = n[c]);
    }
    if (l = l.defaultProps) {
      u === n && (u = Ee({}, u));
      for (var s in l)
        u[s] === void 0 && (u[s] = l[s]);
    }
    return u;
  }
  var Io = typeof reportError == "function" ? reportError : function(l) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var n = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l),
        error: l
      });
      if (!window.dispatchEvent(n)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", l);
      return;
    }
    console.error(l);
  };
  function D0(l) {
    Io(l);
  }
  function _a(l) {
    console.error(l);
  }
  function my(l) {
    Io(l);
  }
  function pu(l, n) {
    try {
      var u = l.onUncaughtError;
      u(n.value, { componentStack: n.stack });
    } catch (c) {
      setTimeout(function() {
        throw c;
      });
    }
  }
  function vy(l, n, u) {
    try {
      var c = l.onCaughtError;
      c(u.value, {
        componentStack: u.stack,
        errorBoundary: n.tag === 1 ? n.stateNode : null
      });
    } catch (s) {
      setTimeout(function() {
        throw s;
      });
    }
  }
  function wa(l, n, u) {
    return u = bu(u), u.tag = 3, u.payload = { element: null }, u.callback = function() {
      pu(l, n);
    }, u;
  }
  function Jr(l) {
    return l = bu(l), l.tag = 3, l;
  }
  function kr(l, n, u, c) {
    var s = u.type.getDerivedStateFromError;
    if (typeof s == "function") {
      var r = c.value;
      l.payload = function() {
        return s(r);
      }, l.callback = function() {
        vy(n, u, c);
      };
    }
    var y = u.stateNode;
    y !== null && typeof y.componentDidCatch == "function" && (l.callback = function() {
      vy(n, u, c), typeof s != "function" && (Mu === null ? Mu = /* @__PURE__ */ new Set([this]) : Mu.add(this));
      var v = c.stack;
      this.componentDidCatch(c.value, {
        componentStack: v !== null ? v : ""
      });
    });
  }
  function ni(l, n, u, c, s) {
    if (u.flags |= 32768, c !== null && typeof c == "object" && typeof c.then == "function") {
      if (n = u.alternate, n !== null && Qe(
        n,
        u,
        s,
        !0
      ), u = aa.current, u !== null) {
        switch (u.tag) {
          case 13:
            return ja === null ? pd() : u.alternate === null && tt === 0 && (tt = 3), u.flags &= -257, u.flags |= 65536, u.lanes = s, c === Rr ? u.flags |= 16384 : (n = u.updateQueue, n === null ? u.updateQueue = /* @__PURE__ */ new Set([c]) : n.add(c), Xy(l, c, s)), !1;
          case 22:
            return u.flags |= 65536, c === Rr ? u.flags |= 16384 : (n = u.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([c])
            }, u.updateQueue = n) : (u = n.retryQueue, u === null ? n.retryQueue = /* @__PURE__ */ new Set([c]) : u.add(c)), Xy(l, c, s)), !1;
        }
        throw Error(x(435, u.tag));
      }
      return Xy(l, c, s), pd(), !1;
    }
    if (De)
      return n = aa.current, n !== null ? (!(n.flags & 65536) && (n.flags |= 256), n.flags |= 65536, n.lanes = s, c !== jh && (l = Error(x(422), { cause: c }), of(Vt(l, u)))) : (c !== jh && (n = Error(x(423), {
        cause: c
      }), of(
        Vt(n, u)
      )), l = l.current.alternate, l.flags |= 65536, s &= -s, l.lanes |= s, c = Vt(c, u), s = wa(
        l.stateNode,
        c,
        s
      ), ns(l, s), tt !== 4 && (tt = 2)), !1;
    var r = Error(x(520), { cause: c });
    if (r = Vt(r, u), ss === null ? ss = [r] : ss.push(r), tt !== 4 && (tt = 2), n === null) return !0;
    c = Vt(c, u), u = n;
    do {
      switch (u.tag) {
        case 3:
          return u.flags |= 65536, l = s & -s, u.lanes |= l, l = wa(u.stateNode, c, l), ns(u, l), !1;
        case 1:
          if (n = u.type, r = u.stateNode, (u.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || r !== null && typeof r.componentDidCatch == "function" && (Mu === null || !Mu.has(r))))
            return u.flags |= 65536, s &= -s, u.lanes |= s, s = Jr(s), kr(
              s,
              l,
              u,
              c
            ), ns(u, s), !1;
      }
      u = u.return;
    } while (u !== null);
    return !1;
  }
  var py = Error(x(461)), at = !1;
  function jt(l, n, u, c) {
    n.child = l === null ? Or(n, null, u, c) : mn(
      n,
      l.child,
      u,
      c
    );
  }
  function zf(l, n, u, c, s) {
    u = u.render;
    var r = n.ref;
    if ("ref" in c) {
      var y = {};
      for (var v in c)
        v !== "ref" && (y[v] = c[v]);
    } else y = c;
    return Su(n), c = fc(
      l,
      n,
      u,
      y,
      r,
      s
    ), v = Br(), l !== null && !at ? (Lo(l, n, s), En(l, n, s)) : (De && v && Dr(n), n.flags |= 1, jt(l, n, c, s), n.child);
  }
  function dc(l, n, u, c, s) {
    if (l === null) {
      var r = u.type;
      return typeof r == "function" && !sd(r) && r.defaultProps === void 0 && u.compare === null ? (n.tag = 15, n.type = r, gy(
        l,
        n,
        r,
        c,
        s
      )) : (l = Bf(
        u.type,
        null,
        c,
        n,
        n.mode,
        s
      ), l.ref = n.ref, l.return = n, n.child = l);
    }
    if (r = l.child, !Of(l, s)) {
      var y = r.memoizedProps;
      if (u = u.compare, u = u !== null ? u : lu, u(y, c) && l.ref === n.ref)
        return En(l, n, s);
    }
    return n.flags |= 1, l = $a(r, c), l.ref = n.ref, l.return = n, n.child = l;
  }
  function gy(l, n, u, c, s) {
    if (l !== null) {
      var r = l.memoizedProps;
      if (lu(r, c) && l.ref === n.ref)
        if (at = !1, n.pendingProps = c = r, Of(l, s))
          l.flags & 131072 && (at = !0);
        else
          return n.lanes = l.lanes, En(l, n, s);
    }
    return Rf(
      l,
      n,
      u,
      c,
      s
    );
  }
  function Sy(l, n, u) {
    var c = n.pendingProps, s = c.children, r = (n.stateNode._pendingVisibility & 2) !== 0, y = l !== null ? l.memoizedState : null;
    if (Df(l, n), c.mode === "hidden" || r) {
      if (n.flags & 128) {
        if (c = y !== null ? y.baseLanes | u : u, l !== null) {
          for (s = n.child = l.child, r = 0; s !== null; )
            r = r | s.lanes | s.childLanes, s = s.sibling;
          n.childLanes = r & ~c;
        } else n.childLanes = 0, n.child = null;
        return Af(
          l,
          n,
          c,
          u
        );
      }
      if (u & 536870912)
        n.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && jo(
          n,
          y !== null ? y.cachePool : null
        ), y !== null ? _h(n, y) : Ur(), wh(n);
      else
        return n.lanes = n.childLanes = 536870912, Af(
          l,
          n,
          y !== null ? y.baseLanes | u : u,
          u
        );
    } else
      y !== null ? (jo(n, y.cachePool), _h(n, y), cu(), n.memoizedState = null) : (l !== null && jo(n, null), Ur(), cu());
    return jt(l, n, s, u), n.child;
  }
  function Af(l, n, u, c) {
    var s = su();
    return s = s === null ? null : { parent: Ht._currentValue, pool: s }, n.memoizedState = {
      baseLanes: u,
      cachePool: s
    }, l !== null && jo(n, null), Ur(), wh(n), l !== null && Qe(l, n, c, !0), null;
  }
  function Df(l, n) {
    var u = n.ref;
    if (u === null)
      l !== null && l.ref !== null && (n.flags |= 2097664);
    else {
      if (typeof u != "function" && typeof u != "object")
        throw Error(x(284));
      (l === null || l.ref !== u) && (n.flags |= 2097664);
    }
  }
  function Rf(l, n, u, c, s) {
    return Su(n), u = fc(
      l,
      n,
      u,
      c,
      void 0,
      s
    ), c = Br(), l !== null && !at ? (Lo(l, n, s), En(l, n, s)) : (De && c && Dr(n), n.flags |= 1, jt(l, n, u, s), n.child);
  }
  function by(l, n, u, c, s, r) {
    return Su(n), n.updateQueue = null, u = Ih(
      n,
      c,
      u,
      s
    ), xr(l), c = Br(), l !== null && !at ? (Lo(l, n, r), En(l, n, r)) : (De && c && Dr(n), n.flags |= 1, jt(l, n, u, r), n.child);
  }
  function Ty(l, n, u, c, s) {
    if (Su(n), n.stateNode === null) {
      var r = sn, y = u.contextType;
      typeof y == "object" && y !== null && (r = tl(y)), r = new u(c, r), n.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = hy, n.stateNode = r, r._reactInternals = n, r = n.stateNode, r.props = c, r.state = n.memoizedState, r.refs = {}, as(n), y = u.contextType, r.context = typeof y == "object" && y !== null ? tl(y) : sn, r.state = n.memoizedState, y = u.getDerivedStateFromProps, typeof y == "function" && (Fo(
        n,
        u,
        y,
        c
      ), r.state = n.memoizedState), typeof u.getDerivedStateFromProps == "function" || typeof r.getSnapshotBeforeUpdate == "function" || typeof r.UNSAFE_componentWillMount != "function" && typeof r.componentWillMount != "function" || (y = r.state, typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount(), y !== r.state && hy.enqueueReplaceState(r, r.state, null), is(n, c, r, s), Hf(), r.state = n.memoizedState), typeof r.componentDidMount == "function" && (n.flags |= 4194308), c = !0;
    } else if (l === null) {
      r = n.stateNode;
      var v = n.memoizedProps, g = Qt(u, v);
      r.props = g;
      var z = r.context, Y = u.contextType;
      y = sn, typeof Y == "object" && Y !== null && (y = tl(Y));
      var X = u.getDerivedStateFromProps;
      Y = typeof X == "function" || typeof r.getSnapshotBeforeUpdate == "function", v = n.pendingProps !== v, Y || typeof r.UNSAFE_componentWillReceiveProps != "function" && typeof r.componentWillReceiveProps != "function" || (v || z !== y) && yy(
        n,
        r,
        c,
        y
      ), ua = !1;
      var O = n.memoizedState;
      r.state = O, is(n, c, r, s), Hf(), z = n.memoizedState, v || O !== z || ua ? (typeof X == "function" && (Fo(
        n,
        u,
        X,
        c
      ), z = n.memoizedState), (g = ua || na(
        n,
        u,
        g,
        c,
        O,
        z,
        y
      )) ? (Y || typeof r.UNSAFE_componentWillMount != "function" && typeof r.componentWillMount != "function" || (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof r.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = c, n.memoizedState = z), r.props = c, r.state = z, r.context = y, c = g) : (typeof r.componentDidMount == "function" && (n.flags |= 4194308), c = !1);
    } else {
      r = n.stateNode, ii(l, n), y = n.memoizedProps, Y = Qt(u, y), r.props = Y, X = n.pendingProps, O = r.context, z = u.contextType, g = sn, typeof z == "object" && z !== null && (g = tl(z)), v = u.getDerivedStateFromProps, (z = typeof v == "function" || typeof r.getSnapshotBeforeUpdate == "function") || typeof r.UNSAFE_componentWillReceiveProps != "function" && typeof r.componentWillReceiveProps != "function" || (y !== X || O !== g) && yy(
        n,
        r,
        c,
        g
      ), ua = !1, O = n.memoizedState, r.state = O, is(n, c, r, s), Hf();
      var B = n.memoizedState;
      y !== X || O !== B || ua || l !== null && l.dependencies !== null && ls(l.dependencies) ? (typeof v == "function" && (Fo(
        n,
        u,
        v,
        c
      ), B = n.memoizedState), (Y = ua || na(
        n,
        u,
        Y,
        c,
        O,
        B,
        g
      ) || l !== null && l.dependencies !== null && ls(l.dependencies)) ? (z || typeof r.UNSAFE_componentWillUpdate != "function" && typeof r.componentWillUpdate != "function" || (typeof r.componentWillUpdate == "function" && r.componentWillUpdate(c, B, g), typeof r.UNSAFE_componentWillUpdate == "function" && r.UNSAFE_componentWillUpdate(
        c,
        B,
        g
      )), typeof r.componentDidUpdate == "function" && (n.flags |= 4), typeof r.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof r.componentDidUpdate != "function" || y === l.memoizedProps && O === l.memoizedState || (n.flags |= 4), typeof r.getSnapshotBeforeUpdate != "function" || y === l.memoizedProps && O === l.memoizedState || (n.flags |= 1024), n.memoizedProps = c, n.memoizedState = B), r.props = c, r.state = B, r.context = g, c = Y) : (typeof r.componentDidUpdate != "function" || y === l.memoizedProps && O === l.memoizedState || (n.flags |= 4), typeof r.getSnapshotBeforeUpdate != "function" || y === l.memoizedProps && O === l.memoizedState || (n.flags |= 1024), c = !1);
    }
    return r = c, Df(l, n), c = (n.flags & 128) !== 0, r || c ? (r = n.stateNode, u = c && typeof u.getDerivedStateFromError != "function" ? null : r.render(), n.flags |= 1, l !== null && c ? (n.child = mn(
      n,
      l.child,
      null,
      s
    ), n.child = mn(
      n,
      null,
      u,
      s
    )) : jt(l, n, u, s), n.memoizedState = r.state, l = n.child) : l = En(
      l,
      n,
      s
    ), l;
  }
  function R0(l, n, u, c) {
    return ff(), n.flags |= 256, jt(l, n, u, c), n.child;
  }
  var Po = { dehydrated: null, treeContext: null, retryLane: 0 };
  function bn(l) {
    return { baseLanes: l, cachePool: Fh() };
  }
  function $r(l, n, u) {
    return l = l !== null ? l.childLanes & ~u : 0, n && (l |= Oa), l;
  }
  function Wr(l, n, u) {
    var c = n.pendingProps, s = !1, r = (n.flags & 128) !== 0, y;
    if ((y = r) || (y = l !== null && l.memoizedState === null ? !1 : (St.current & 2) !== 0), y && (s = !0, n.flags &= -129), y = (n.flags & 32) !== 0, n.flags &= -33, l === null) {
      if (De) {
        if (s ? vn(n) : cu(), De) {
          var v = Ot, g;
          if (g = v) {
            e: {
              for (g = v, v = Qa; g.nodeType !== 8; ) {
                if (!v) {
                  v = null;
                  break e;
                }
                if (g = _t(
                  g.nextSibling
                ), g === null) {
                  v = null;
                  break e;
                }
              }
              v = g;
            }
            v !== null ? (n.memoizedState = {
              dehydrated: v,
              treeContext: rn !== null ? { id: dn, overflow: hn } : null,
              retryLane: 536870912
            }, g = xt(
              18,
              null,
              null,
              0
            ), g.stateNode = v, g.return = n, n.child = g, el = n, Ot = null, g = !0) : g = !1;
          }
          g || Wu(n);
        }
        if (v = n.memoizedState, v !== null && (v = v.dehydrated, v !== null))
          return v.data === "$!" ? n.lanes = 16 : n.lanes = 536870912, null;
        La(n);
      }
      return v = c.children, c = c.fallback, s ? (cu(), s = n.mode, v = gu(
        { mode: "hidden", children: v },
        s
      ), c = nt(
        c,
        s,
        u,
        null
      ), v.return = n, c.return = n, v.sibling = c, n.child = v, s = n.child, s.memoizedState = bn(u), s.childLanes = $r(
        l,
        y,
        u
      ), n.memoizedState = Po, c) : (vn(n), Mf(n, v));
    }
    if (g = l.memoizedState, g !== null && (v = g.dehydrated, v !== null)) {
      if (r)
        n.flags & 256 ? (vn(n), n.flags &= -257, n = Fr(
          l,
          n,
          u
        )) : n.memoizedState !== null ? (cu(), n.child = l.child, n.flags |= 128, n = null) : (cu(), s = c.fallback, v = n.mode, c = gu(
          { mode: "visible", children: c.children },
          v
        ), s = nt(
          s,
          v,
          u,
          null
        ), s.flags |= 2, c.return = n, s.return = n, c.sibling = s, n.child = c, mn(
          n,
          l.child,
          null,
          u
        ), c = n.child, c.memoizedState = bn(u), c.childLanes = $r(
          l,
          y,
          u
        ), n.memoizedState = Po, n = s);
      else if (vn(n), v.data === "$!") {
        if (y = v.nextSibling && v.nextSibling.dataset, y) var z = y.dgst;
        y = z, c = Error(x(419)), c.stack = "", c.digest = y, of({ value: c, source: null, stack: null }), n = Fr(
          l,
          n,
          u
        );
      } else if (at || Qe(l, n, u, !1), y = (u & l.childLanes) !== 0, at || y) {
        if (y = Ge, y !== null) {
          if (c = u & -u, c & 42) c = 1;
          else
            switch (c) {
              case 2:
                c = 1;
                break;
              case 8:
                c = 4;
                break;
              case 32:
                c = 16;
                break;
              case 128:
              case 256:
              case 512:
              case 1024:
              case 2048:
              case 4096:
              case 8192:
              case 16384:
              case 32768:
              case 65536:
              case 131072:
              case 262144:
              case 524288:
              case 1048576:
              case 2097152:
              case 4194304:
              case 8388608:
              case 16777216:
              case 33554432:
                c = 64;
                break;
              case 268435456:
                c = 134217728;
                break;
              default:
                c = 0;
            }
          if (c = c & (y.suspendedLanes | u) ? 0 : c, c !== 0 && c !== g.retryLane)
            throw g.retryLane = c, on(l, c), Bt(y, l, c), py;
        }
        v.data === "$?" || pd(), n = Fr(
          l,
          n,
          u
        );
      } else
        v.data === "$?" ? (n.flags |= 128, n.child = l.child, n = Wv.bind(
          null,
          l
        ), v._reactRetry = n, n = null) : (l = g.treeContext, Ot = _t(
          v.nextSibling
        ), el = n, De = !0, Da = null, Qa = !1, l !== null && (rl[jl++] = dn, rl[jl++] = hn, rl[jl++] = rn, dn = l.id, hn = l.overflow, rn = n), n = Mf(
          n,
          c.children
        ), n.flags |= 4096);
      return n;
    }
    return s ? (cu(), s = c.fallback, v = n.mode, g = l.child, z = g.sibling, c = $a(g, {
      mode: "hidden",
      children: c.children
    }), c.subtreeFlags = g.subtreeFlags & 31457280, z !== null ? s = $a(z, s) : (s = nt(
      s,
      v,
      u,
      null
    ), s.flags |= 2), s.return = n, c.return = n, c.sibling = s, n.child = c, c = s, s = n.child, v = l.child.memoizedState, v === null ? v = bn(u) : (g = v.cachePool, g !== null ? (z = Ht._currentValue, g = g.parent !== z ? { parent: z, pool: z } : g) : g = Fh(), v = {
      baseLanes: v.baseLanes | u,
      cachePool: g
    }), s.memoizedState = v, s.childLanes = $r(
      l,
      y,
      u
    ), n.memoizedState = Po, c) : (vn(n), u = l.child, l = u.sibling, u = $a(u, {
      mode: "visible",
      children: c.children
    }), u.return = n, u.sibling = null, l !== null && (y = n.deletions, y === null ? (n.deletions = [l], n.flags |= 16) : y.push(l)), n.child = u, n.memoizedState = null, u);
  }
  function Mf(l, n) {
    return n = gu(
      { mode: "visible", children: n },
      l.mode
    ), n.return = l, l.child = n;
  }
  function gu(l, n) {
    return q0(l, n, 0, null);
  }
  function Fr(l, n, u) {
    return mn(n, l.child, null, u), l = Mf(
      n,
      n.pendingProps.children
    ), l.flags |= 2, n.memoizedState = null, l;
  }
  function Ir(l, n, u) {
    l.lanes |= n;
    var c = l.alternate;
    c !== null && (c.lanes |= n), El(l.return, n, u);
  }
  function es(l, n, u, c, s) {
    var r = l.memoizedState;
    r === null ? l.memoizedState = {
      isBackwards: n,
      rendering: null,
      renderingStartTime: 0,
      last: c,
      tail: u,
      tailMode: s
    } : (r.isBackwards = n, r.rendering = null, r.renderingStartTime = 0, r.last = c, r.tail = u, r.tailMode = s);
  }
  function Tn(l, n, u) {
    var c = n.pendingProps, s = c.revealOrder, r = c.tail;
    if (jt(l, n, c.children, u), c = St.current, c & 2)
      c = c & 1 | 2, n.flags |= 128;
    else {
      if (l !== null && l.flags & 128)
        e: for (l = n.child; l !== null; ) {
          if (l.tag === 13)
            l.memoizedState !== null && Ir(l, u, n);
          else if (l.tag === 19)
            Ir(l, u, n);
          else if (l.child !== null) {
            l.child.return = l, l = l.child;
            continue;
          }
          if (l === n) break e;
          for (; l.sibling === null; ) {
            if (l.return === null || l.return === n)
              break e;
            l = l.return;
          }
          l.sibling.return = l.return, l = l.sibling;
        }
      c &= 1;
    }
    switch (Xe(St, c), s) {
      case "forwards":
        for (u = n.child, s = null; u !== null; )
          l = u.alternate, l !== null && Xo(l) === null && (s = u), u = u.sibling;
        u = s, u === null ? (s = n.child, n.child = null) : (s = u.sibling, u.sibling = null), es(
          n,
          !1,
          s,
          u,
          r
        );
        break;
      case "backwards":
        for (u = null, s = n.child, n.child = null; s !== null; ) {
          if (l = s.alternate, l !== null && Xo(l) === null) {
            n.child = s;
            break;
          }
          l = s.sibling, s.sibling = u, u = s, s = l;
        }
        es(
          n,
          !0,
          u,
          null,
          r
        );
        break;
      case "together":
        es(n, !1, null, null, void 0);
        break;
      default:
        n.memoizedState = null;
    }
    return n.child;
  }
  function En(l, n, u) {
    if (l !== null && (n.dependencies = l.dependencies), si |= n.lanes, !(u & n.childLanes))
      if (l !== null) {
        if (Qe(
          l,
          n,
          u,
          !1
        ), (u & n.childLanes) === 0)
          return null;
      } else return null;
    if (l !== null && n.child !== l.child)
      throw Error(x(153));
    if (n.child !== null) {
      for (l = n.child, u = $a(l, l.pendingProps), n.child = u, u.return = n; l.sibling !== null; )
        l = l.sibling, u = u.sibling = $a(l, l.pendingProps), u.return = n;
      u.sibling = null;
    }
    return n.child;
  }
  function Of(l, n) {
    return l.lanes & n ? !0 : (l = l.dependencies, !!(l !== null && ls(l)));
  }
  function ts(l, n, u) {
    switch (n.tag) {
      case 3:
        Ws(n, n.stateNode.containerInfo), ui(n, Ht, l.memoizedState.cache), ff();
        break;
      case 27:
      case 5:
        je(n);
        break;
      case 4:
        Ws(n, n.stateNode.containerInfo);
        break;
      case 10:
        ui(
          n,
          n.type,
          n.memoizedProps.value
        );
        break;
      case 13:
        var c = n.memoizedState;
        if (c !== null)
          return c.dehydrated !== null ? (vn(n), n.flags |= 128, null) : u & n.child.childLanes ? Wr(l, n, u) : (vn(n), l = En(
            l,
            n,
            u
          ), l !== null ? l.sibling : null);
        vn(n);
        break;
      case 19:
        var s = (l.flags & 128) !== 0;
        if (c = (u & n.childLanes) !== 0, c || (Qe(
          l,
          n,
          u,
          !1
        ), c = (u & n.childLanes) !== 0), s) {
          if (c)
            return Tn(
              l,
              n,
              u
            );
          n.flags |= 128;
        }
        if (s = n.memoizedState, s !== null && (s.rendering = null, s.tail = null, s.lastEffect = null), Xe(St, St.current), c) break;
        return null;
      case 22:
      case 23:
        return n.lanes = 0, Sy(l, n, u);
      case 24:
        ui(n, Ht, l.memoizedState.cache);
    }
    return En(l, n, u);
  }
  function ke(l, n, u) {
    if (l !== null)
      if (l.memoizedProps !== n.pendingProps)
        at = !0;
      else {
        if (!Of(l, u) && !(n.flags & 128))
          return at = !1, ts(
            l,
            n,
            u
          );
        at = !!(l.flags & 131072);
      }
    else
      at = !1, De && n.flags & 1048576 && Qh(n, cf, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          l = n.pendingProps;
          var c = n.elementType, s = c._init;
          if (c = s(c._payload), n.type = c, typeof c == "function")
            sd(c) ? (l = Qt(c, l), n.tag = 1, n = Ty(
              null,
              n,
              c,
              l,
              u
            )) : (n.tag = 0, n = Rf(
              null,
              n,
              c,
              l,
              u
            ));
          else {
            if (c != null) {
              if (s = c.$$typeof, s === ft) {
                n.tag = 11, n = zf(
                  null,
                  n,
                  c,
                  l,
                  u
                );
                break e;
              } else if (s === Ke) {
                n.tag = 14, n = dc(
                  null,
                  n,
                  c,
                  l,
                  u
                );
                break e;
              }
            }
            throw n = Cl(c) || c, Error(x(306, n, ""));
          }
        }
        return n;
      case 0:
        return Rf(
          l,
          n,
          n.type,
          n.pendingProps,
          u
        );
      case 1:
        return c = n.type, s = Qt(
          c,
          n.pendingProps
        ), Ty(
          l,
          n,
          c,
          s,
          u
        );
      case 3:
        e: {
          if (Ws(
            n,
            n.stateNode.containerInfo
          ), l === null) throw Error(x(387));
          var r = n.pendingProps;
          s = n.memoizedState, c = s.element, ii(l, n), is(n, r, null, u);
          var y = n.memoizedState;
          if (r = y.cache, ui(n, Ht, r), r !== s.cache && Pr(
            n,
            [Ht],
            u,
            !0
          ), Hf(), r = y.element, s.isDehydrated)
            if (s = {
              element: r,
              isDehydrated: !1,
              cache: y.cache
            }, n.updateQueue.baseState = s, n.memoizedState = s, n.flags & 256) {
              n = R0(
                l,
                n,
                r,
                u
              );
              break e;
            } else if (r !== c) {
              c = Vt(
                Error(x(424)),
                n
              ), of(c), n = R0(
                l,
                n,
                r,
                u
              );
              break e;
            } else
              for (Ot = _t(
                n.stateNode.containerInfo.firstChild
              ), el = n, De = !0, Da = null, Qa = !0, u = Or(
                n,
                null,
                r,
                u
              ), n.child = u; u; )
                u.flags = u.flags & -3 | 4096, u = u.sibling;
          else {
            if (ff(), r === c) {
              n = En(
                l,
                n,
                u
              );
              break e;
            }
            jt(l, n, r, u);
          }
          n = n.child;
        }
        return n;
      case 26:
        return Df(l, n), l === null ? (u = K(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = u : De || (u = n.type, l = n.pendingProps, c = gs(
          an.current
        ).createElement(u), c[Wt] = n, c[Gl] = l, Zt(c, u, l), Mt(c), n.stateNode = c) : n.memoizedState = K(
          n.type,
          l.memoizedProps,
          n.pendingProps,
          l.memoizedState
        ), null;
      case 27:
        return je(n), l === null && De && (c = n.stateNode = Bn(
          n.type,
          n.pendingProps,
          an.current
        ), el = n, Qa = !0, Ot = _t(
          c.firstChild
        )), c = n.pendingProps.children, l !== null || De ? jt(
          l,
          n,
          c,
          u
        ) : n.child = mn(
          n,
          null,
          c,
          u
        ), Df(l, n), n.child;
      case 5:
        return l === null && De && ((s = c = Ot) && (c = gi(
          c,
          n.type,
          n.pendingProps,
          Qa
        ), c !== null ? (n.stateNode = c, el = n, Ot = _t(
          c.firstChild
        ), Qa = !1, s = !0) : s = !1), s || Wu(n)), je(n), s = n.type, r = n.pendingProps, y = l !== null ? l.memoizedProps : null, c = r.children, Ss(s, r) ? c = null : y !== null && Ss(s, y) && (n.flags |= 32), n.memoizedState !== null && (s = fc(
          l,
          n,
          T0,
          null,
          null,
          u
        ), Kl._currentValue = s), Df(l, n), jt(l, n, c, u), n.child;
      case 6:
        return l === null && De && ((l = u = Ot) && (u = Es(
          u,
          n.pendingProps,
          Qa
        ), u !== null ? (n.stateNode = u, el = n, Ot = null, l = !0) : l = !1), l || Wu(n)), null;
      case 13:
        return Wr(l, n, u);
      case 4:
        return Ws(
          n,
          n.stateNode.containerInfo
        ), c = n.pendingProps, l === null ? n.child = mn(
          n,
          null,
          c,
          u
        ) : jt(
          l,
          n,
          c,
          u
        ), n.child;
      case 11:
        return zf(
          l,
          n,
          n.type,
          n.pendingProps,
          u
        );
      case 7:
        return jt(
          l,
          n,
          n.pendingProps,
          u
        ), n.child;
      case 8:
        return jt(
          l,
          n,
          n.pendingProps.children,
          u
        ), n.child;
      case 12:
        return jt(
          l,
          n,
          n.pendingProps.children,
          u
        ), n.child;
      case 10:
        return c = n.pendingProps, ui(n, n.type, c.value), jt(
          l,
          n,
          c.children,
          u
        ), n.child;
      case 9:
        return s = n.type._context, c = n.pendingProps.children, Su(n), s = tl(s), c = c(s), n.flags |= 1, jt(l, n, c, u), n.child;
      case 14:
        return dc(
          l,
          n,
          n.type,
          n.pendingProps,
          u
        );
      case 15:
        return gy(
          l,
          n,
          n.type,
          n.pendingProps,
          u
        );
      case 19:
        return Tn(l, n, u);
      case 22:
        return Sy(l, n, u);
      case 24:
        return Su(n), c = tl(Ht), l === null ? (s = su(), s === null && (s = Ge, r = kh(), s.pooledCache = r, r.refCount++, r !== null && (s.pooledCacheLanes |= u), s = r), n.memoizedState = {
          parent: c,
          cache: s
        }, as(n), ui(n, Ht, s)) : (l.lanes & u && (ii(l, n), is(n, null, null, u), Hf()), s = l.memoizedState, r = n.memoizedState, s.parent !== c ? (s = { parent: c, cache: c }, n.memoizedState = s, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = s), ui(n, Ht, c)) : (c = r.cache, ui(n, Ht, c), c !== s.cache && Pr(
          n,
          [Ht],
          u,
          !0
        ))), jt(
          l,
          n,
          n.pendingProps.children,
          u
        ), n.child;
      case 29:
        throw n.pendingProps;
    }
    throw Error(x(156, n.tag));
  }
  var Ey = Fl(null), hc = null, zn = null;
  function ui(l, n, u) {
    Xe(Ey, n._currentValue), n._currentValue = u;
  }
  function An(l) {
    l._currentValue = Ey.current, mt(Ey);
  }
  function El(l, n, u) {
    for (; l !== null; ) {
      var c = l.alternate;
      if ((l.childLanes & n) !== n ? (l.childLanes |= n, c !== null && (c.childLanes |= n)) : c !== null && (c.childLanes & n) !== n && (c.childLanes |= n), l === u) break;
      l = l.return;
    }
  }
  function Pr(l, n, u, c) {
    var s = l.child;
    for (s !== null && (s.return = l); s !== null; ) {
      var r = s.dependencies;
      if (r !== null) {
        var y = s.child;
        r = r.firstContext;
        e: for (; r !== null; ) {
          var v = r;
          r = s;
          for (var g = 0; g < n.length; g++)
            if (v.context === n[g]) {
              r.lanes |= u, v = r.alternate, v !== null && (v.lanes |= u), El(
                r.return,
                u,
                l
              ), c || (y = null);
              break e;
            }
          r = v.next;
        }
      } else if (s.tag === 18) {
        if (y = s.return, y === null) throw Error(x(341));
        y.lanes |= u, r = y.alternate, r !== null && (r.lanes |= u), El(y, u, l), y = null;
      } else y = s.child;
      if (y !== null) y.return = s;
      else
        for (y = s; y !== null; ) {
          if (y === l) {
            y = null;
            break;
          }
          if (s = y.sibling, s !== null) {
            s.return = y.return, y = s;
            break;
          }
          y = y.return;
        }
      s = y;
    }
  }
  function Qe(l, n, u, c) {
    l = null;
    for (var s = n, r = !1; s !== null; ) {
      if (!r) {
        if (s.flags & 524288) r = !0;
        else if (s.flags & 262144) break;
      }
      if (s.tag === 10) {
        var y = s.alternate;
        if (y === null) throw Error(x(387));
        if (y = y.memoizedProps, y !== null) {
          var v = s.type;
          ol(s.pendingProps.value, y.value) || (l !== null ? l.push(v) : l = [v]);
        }
      } else if (s === Bi.current) {
        if (y = s.alternate, y === null) throw Error(x(387));
        y.memoizedState.memoizedState !== s.memoizedState.memoizedState && (l !== null ? l.push(Kl) : l = [Kl]);
      }
      s = s.return;
    }
    l !== null && Pr(
      n,
      l,
      u,
      c
    ), n.flags |= 262144;
  }
  function ls(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!ol(
        l.context._currentValue,
        l.memoizedValue
      ))
        return !0;
      l = l.next;
    }
    return !1;
  }
  function Su(l) {
    hc = l, zn = null, l = l.dependencies, l !== null && (l.firstContext = null);
  }
  function tl(l) {
    return Dn(hc, l);
  }
  function ed(l, n) {
    return hc === null && Su(l), Dn(l, n);
  }
  function Dn(l, n) {
    var u = n._currentValue;
    if (n = { context: n, memoizedValue: u, next: null }, zn === null) {
      if (l === null) throw Error(x(308));
      zn = n, l.dependencies = { lanes: 0, firstContext: n }, l.flags |= 524288;
    } else zn = zn.next = n;
    return u;
  }
  var ua = !1;
  function as(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function ii(l, n) {
    l = l.updateQueue, n.updateQueue === l && (n.updateQueue = {
      baseState: l.baseState,
      firstBaseUpdate: l.firstBaseUpdate,
      lastBaseUpdate: l.lastBaseUpdate,
      shared: l.shared,
      callbacks: null
    });
  }
  function bu(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function Tu(l, n, u) {
    var c = l.updateQueue;
    if (c === null) return null;
    if (c = c.shared, et & 2) {
      var s = c.pending;
      return s === null ? n.next = n : (n.next = s.next, s.next = n), c.pending = n, n = Me(l), Tl(l, null, u), n;
    }
    return uf(l, c, n, u), Me(l);
  }
  function Uf(l, n, u) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (u & 4194176) !== 0)) {
      var c = n.lanes;
      c &= l.pendingLanes, u |= c, n.lanes = u, hh(l, u);
    }
  }
  function ns(l, n) {
    var u = l.updateQueue, c = l.alternate;
    if (c !== null && (c = c.updateQueue, u === c)) {
      var s = null, r = null;
      if (u = u.firstBaseUpdate, u !== null) {
        do {
          var y = {
            lane: u.lane,
            tag: u.tag,
            payload: u.payload,
            callback: null,
            next: null
          };
          r === null ? s = r = y : r = r.next = y, u = u.next;
        } while (u !== null);
        r === null ? s = r = n : r = r.next = n;
      } else s = r = n;
      u = {
        baseState: c.baseState,
        firstBaseUpdate: s,
        lastBaseUpdate: r,
        shared: c.shared,
        callbacks: c.callbacks
      }, l.updateQueue = u;
      return;
    }
    l = u.lastBaseUpdate, l === null ? u.firstBaseUpdate = n : l.next = n, u.lastBaseUpdate = n;
  }
  var us = !1;
  function Hf() {
    if (us) {
      var l = uc;
      if (l !== null) throw l;
    }
  }
  function is(l, n, u, c) {
    us = !1;
    var s = l.updateQueue;
    ua = !1;
    var r = s.firstBaseUpdate, y = s.lastBaseUpdate, v = s.shared.pending;
    if (v !== null) {
      s.shared.pending = null;
      var g = v, z = g.next;
      g.next = null, y === null ? r = z : y.next = z, y = g;
      var Y = l.alternate;
      Y !== null && (Y = Y.updateQueue, v = Y.lastBaseUpdate, v !== y && (v === null ? Y.firstBaseUpdate = z : v.next = z, Y.lastBaseUpdate = g));
    }
    if (r !== null) {
      var X = s.baseState;
      y = 0, Y = z = g = null, v = r;
      do {
        var O = v.lane & -536870913, B = O !== v.lane;
        if (B ? (Ae & O) === O : (c & O) === O) {
          O !== 0 && O === ou && (us = !0), Y !== null && (Y = Y.next = {
            lane: 0,
            tag: v.tag,
            payload: v.payload,
            callback: null,
            next: null
          });
          e: {
            var J = l, ue = v;
            O = n;
            var $e = u;
            switch (ue.tag) {
              case 1:
                if (J = ue.payload, typeof J == "function") {
                  X = J.call($e, X, O);
                  break e;
                }
                X = J;
                break e;
              case 3:
                J.flags = J.flags & -65537 | 128;
              case 0:
                if (J = ue.payload, O = typeof J == "function" ? J.call($e, X, O) : J, O == null) break e;
                X = Ee({}, X, O);
                break e;
              case 2:
                ua = !0;
            }
          }
          O = v.callback, O !== null && (l.flags |= 64, B && (l.flags |= 8192), B = s.callbacks, B === null ? s.callbacks = [O] : B.push(O));
        } else
          B = {
            lane: O,
            tag: v.tag,
            payload: v.payload,
            callback: v.callback,
            next: null
          }, Y === null ? (z = Y = B, g = X) : Y = Y.next = B, y |= O;
        if (v = v.next, v === null) {
          if (v = s.shared.pending, v === null)
            break;
          B = v, v = B.next, B.next = null, s.lastBaseUpdate = B, s.shared.pending = null;
        }
      } while (!0);
      Y === null && (g = X), s.baseState = g, s.firstBaseUpdate = z, s.lastBaseUpdate = Y, r === null && (s.shared.lanes = 0), si |= y, l.lanes = y, l.memoizedState = X;
    }
  }
  function M0(l, n) {
    if (typeof l != "function")
      throw Error(x(191, l));
    l.call(n);
  }
  function zy(l, n) {
    var u = l.callbacks;
    if (u !== null)
      for (l.callbacks = null, l = 0; l < u.length; l++)
        M0(u[l], n);
  }
  function Cf(l, n) {
    try {
      var u = n.updateQueue, c = u !== null ? u.lastEffect : null;
      if (c !== null) {
        var s = c.next;
        u = s;
        do {
          if ((u.tag & l) === l) {
            c = void 0;
            var r = u.create, y = u.inst;
            c = r(), y.destroy = c;
          }
          u = u.next;
        } while (u !== s);
      }
    } catch (v) {
      Ve(n, n.return, v);
    }
  }
  function ci(l, n, u) {
    try {
      var c = n.updateQueue, s = c !== null ? c.lastEffect : null;
      if (s !== null) {
        var r = s.next;
        c = r;
        do {
          if ((c.tag & l) === l) {
            var y = c.inst, v = y.destroy;
            if (v !== void 0) {
              y.destroy = void 0, s = n;
              var g = u;
              try {
                v();
              } catch (z) {
                Ve(
                  s,
                  g,
                  z
                );
              }
            }
          }
          c = c.next;
        } while (c !== r);
      }
    } catch (z) {
      Ve(n, n.return, z);
    }
  }
  function yc(l) {
    var n = l.updateQueue;
    if (n !== null) {
      var u = l.stateNode;
      try {
        zy(n, u);
      } catch (c) {
        Ve(l, l.return, c);
      }
    }
  }
  function cs(l, n, u) {
    u.props = Qt(
      l.type,
      l.memoizedProps
    ), u.state = l.memoizedState;
    try {
      u.componentWillUnmount();
    } catch (c) {
      Ve(l, n, c);
    }
  }
  function fi(l, n) {
    try {
      var u = l.ref;
      if (u !== null) {
        var c = l.stateNode;
        switch (l.tag) {
          case 26:
          case 27:
          case 5:
            var s = c;
            break;
          default:
            s = c;
        }
        typeof u == "function" ? l.refCleanup = u(s) : u.current = s;
      }
    } catch (r) {
      Ve(l, n, r);
    }
  }
  function zl(l, n) {
    var u = l.ref, c = l.refCleanup;
    if (u !== null)
      if (typeof c == "function")
        try {
          c();
        } catch (s) {
          Ve(l, n, s);
        } finally {
          l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
        }
      else if (typeof u == "function")
        try {
          u(null);
        } catch (s) {
          Ve(l, n, s);
        }
      else u.current = null;
  }
  function O0(l) {
    var n = l.type, u = l.memoizedProps, c = l.stateNode;
    try {
      e: switch (n) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          u.autoFocus && c.focus();
          break e;
        case "img":
          u.src ? c.src = u.src : u.srcSet && (c.srcset = u.srcSet);
      }
    } catch (s) {
      Ve(l, l.return, s);
    }
  }
  function U0(l, n, u) {
    try {
      var c = l.stateNode;
      _0(c, l.type, u, n), c[Gl] = n;
    } catch (s) {
      Ve(l, l.return, s);
    }
  }
  function Ay(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 || l.tag === 4;
  }
  function Eu(l) {
    e: for (; ; ) {
      for (; l.sibling === null; ) {
        if (l.return === null || Ay(l.return)) return null;
        l = l.return;
      }
      for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 27 && l.tag !== 18; ) {
        if (l.flags & 2 || l.child === null || l.tag === 4) continue e;
        l.child.return = l, l = l.child;
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function td(l, n, u) {
    var c = l.tag;
    if (c === 5 || c === 6)
      l = l.stateNode, n ? u.nodeType === 8 ? u.parentNode.insertBefore(l, n) : u.insertBefore(l, n) : (u.nodeType === 8 ? (n = u.parentNode, n.insertBefore(l, u)) : (n = u, n.appendChild(l)), u = u._reactRootContainer, u != null || n.onclick !== null || (n.onclick = pi));
    else if (c !== 4 && c !== 27 && (l = l.child, l !== null))
      for (td(l, n, u), l = l.sibling; l !== null; )
        td(l, n, u), l = l.sibling;
  }
  function Ue(l, n, u) {
    var c = l.tag;
    if (c === 5 || c === 6)
      l = l.stateNode, n ? u.insertBefore(l, n) : u.appendChild(l);
    else if (c !== 4 && c !== 27 && (l = l.child, l !== null))
      for (Ue(l, n, u), l = l.sibling; l !== null; )
        Ue(l, n, u), l = l.sibling;
  }
  var Ka = !1, ht = !1, ld = !1, H0 = typeof WeakSet == "function" ? WeakSet : Set, Lt = null, ad = !1;
  function C0(l, n) {
    if (l = l.containerInfo, Md = Rs, l = Gh(l), Tr(l)) {
      if ("selectionStart" in l)
        var u = {
          start: l.selectionStart,
          end: l.selectionEnd
        };
      else
        e: {
          u = (u = l.ownerDocument) && u.defaultView || window;
          var c = u.getSelection && u.getSelection();
          if (c && c.rangeCount !== 0) {
            u = c.anchorNode;
            var s = c.anchorOffset, r = c.focusNode;
            c = c.focusOffset;
            try {
              u.nodeType, r.nodeType;
            } catch {
              u = null;
              break e;
            }
            var y = 0, v = -1, g = -1, z = 0, Y = 0, X = l, O = null;
            t: for (; ; ) {
              for (var B; X !== u || s !== 0 && X.nodeType !== 3 || (v = y + s), X !== r || c !== 0 && X.nodeType !== 3 || (g = y + c), X.nodeType === 3 && (y += X.nodeValue.length), (B = X.firstChild) !== null; )
                O = X, X = B;
              for (; ; ) {
                if (X === l) break t;
                if (O === u && ++z === s && (v = y), O === r && ++Y === c && (g = y), (B = X.nextSibling) !== null) break;
                X = O, O = X.parentNode;
              }
              X = B;
            }
            u = v === -1 || g === -1 ? null : { start: v, end: g };
          } else u = null;
        }
      u = u || { start: 0, end: 0 };
    } else u = null;
    for (Od = { focusedElem: l, selectionRange: u }, Rs = !1, Lt = n; Lt !== null; )
      if (n = Lt, l = n.child, (n.subtreeFlags & 1028) !== 0 && l !== null)
        l.return = n, Lt = l;
      else
        for (; Lt !== null; ) {
          switch (n = Lt, r = n.alternate, l = n.flags, n.tag) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if (l & 1024 && r !== null) {
                l = void 0, u = n, s = r.memoizedProps, r = r.memoizedState, c = u.stateNode;
                try {
                  var J = Qt(
                    u.type,
                    s,
                    u.elementType === u.type
                  );
                  l = c.getSnapshotBeforeUpdate(
                    J,
                    r
                  ), c.__reactInternalSnapshotBeforeUpdate = l;
                } catch (ue) {
                  Ve(
                    u,
                    u.return,
                    ue
                  );
                }
              }
              break;
            case 3:
              if (l & 1024) {
                if (l = n.stateNode.containerInfo, u = l.nodeType, u === 9)
                  Wa(l);
                else if (u === 1)
                  switch (l.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Wa(l);
                      break;
                    default:
                      l.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if (l & 1024) throw Error(x(163));
          }
          if (l = n.sibling, l !== null) {
            l.return = n.return, Lt = l;
            break;
          }
          Lt = n.return;
        }
    return J = ad, ad = !1, J;
  }
  function Dy(l, n, u) {
    var c = u.flags;
    switch (u.tag) {
      case 0:
      case 11:
      case 15:
        Rn(l, u), c & 4 && Cf(5, u);
        break;
      case 1:
        if (Rn(l, u), c & 4)
          if (l = u.stateNode, n === null)
            try {
              l.componentDidMount();
            } catch (v) {
              Ve(u, u.return, v);
            }
          else {
            var s = Qt(
              u.type,
              n.memoizedProps
            );
            n = n.memoizedState;
            try {
              l.componentDidUpdate(
                s,
                n,
                l.__reactInternalSnapshotBeforeUpdate
              );
            } catch (v) {
              Ve(
                u,
                u.return,
                v
              );
            }
          }
        c & 64 && yc(u), c & 512 && fi(u, u.return);
        break;
      case 3:
        if (Rn(l, u), c & 64 && (c = u.updateQueue, c !== null)) {
          if (l = null, u.child !== null)
            switch (u.child.tag) {
              case 27:
              case 5:
                l = u.child.stateNode;
                break;
              case 1:
                l = u.child.stateNode;
            }
          try {
            zy(c, l);
          } catch (v) {
            Ve(u, u.return, v);
          }
        }
        break;
      case 26:
        Rn(l, u), c & 512 && fi(u, u.return);
        break;
      case 27:
      case 5:
        Rn(l, u), n === null && c & 4 && O0(u), c & 512 && fi(u, u.return);
        break;
      case 12:
        Rn(l, u);
        break;
      case 13:
        Rn(l, u), c & 4 && xf(l, u);
        break;
      case 22:
        if (s = u.memoizedState !== null || Ka, !s) {
          n = n !== null && n.memoizedState !== null || ht;
          var r = Ka, y = ht;
          Ka = s, (ht = n) && !y ? oi(
            l,
            u,
            (u.subtreeFlags & 8772) !== 0
          ) : Rn(l, u), Ka = r, ht = y;
        }
        c & 512 && (u.memoizedProps.mode === "manual" ? fi(u, u.return) : zl(u, u.return));
        break;
      default:
        Rn(l, u);
    }
  }
  function Ry(l) {
    var n = l.alternate;
    n !== null && (l.alternate = null, Ry(n)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (n = l.stateNode, n !== null && ar(n)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
  }
  var Ie = null, ia = !1;
  function zu(l, n, u) {
    for (u = u.child; u !== null; )
      Ja(l, n, u), u = u.sibling;
  }
  function Ja(l, n, u) {
    if ($t && typeof $t.onCommitFiberUnmount == "function")
      try {
        $t.onCommitFiberUnmount(Ni, u);
      } catch {
      }
    switch (u.tag) {
      case 26:
        ht || zl(u, n), zu(
          l,
          n,
          u
        ), u.memoizedState ? u.memoizedState.count-- : u.stateNode && (u = u.stateNode, u.parentNode.removeChild(u));
        break;
      case 27:
        ht || zl(u, n);
        var c = Ie, s = ia;
        for (Ie = u.stateNode, zu(
          l,
          n,
          u
        ), u = u.stateNode, n = u.attributes; n.length; )
          u.removeAttributeNode(n[0]);
        ar(u), Ie = c, ia = s;
        break;
      case 5:
        ht || zl(u, n);
      case 6:
        s = Ie;
        var r = ia;
        if (Ie = null, zu(
          l,
          n,
          u
        ), Ie = s, ia = r, Ie !== null)
          if (ia)
            try {
              l = Ie, c = u.stateNode, l.nodeType === 8 ? l.parentNode.removeChild(c) : l.removeChild(c);
            } catch (y) {
              Ve(
                u,
                n,
                y
              );
            }
          else
            try {
              Ie.removeChild(u.stateNode);
            } catch (y) {
              Ve(
                u,
                n,
                y
              );
            }
        break;
      case 18:
        Ie !== null && (ia ? (n = Ie, u = u.stateNode, n.nodeType === 8 ? Ts(
          n.parentNode,
          u
        ) : n.nodeType === 1 && Ts(n, u), Wf(n)) : Ts(Ie, u.stateNode));
        break;
      case 4:
        c = Ie, s = ia, Ie = u.stateNode.containerInfo, ia = !0, zu(
          l,
          n,
          u
        ), Ie = c, ia = s;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ht || ci(2, u, n), ht || ci(4, u, n), zu(
          l,
          n,
          u
        );
        break;
      case 1:
        ht || (zl(u, n), c = u.stateNode, typeof c.componentWillUnmount == "function" && cs(
          u,
          n,
          c
        )), zu(
          l,
          n,
          u
        );
        break;
      case 21:
        zu(
          l,
          n,
          u
        );
        break;
      case 22:
        ht || zl(u, n), ht = (c = ht) || u.memoizedState !== null, zu(
          l,
          n,
          u
        ), ht = c;
        break;
      default:
        zu(
          l,
          n,
          u
        );
    }
  }
  function xf(l, n) {
    if (n.memoizedState === null && (l = n.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
      try {
        Wf(l);
      } catch (u) {
        Ve(n, n.return, u);
      }
  }
  function x0(l) {
    switch (l.tag) {
      case 13:
      case 19:
        var n = l.stateNode;
        return n === null && (n = l.stateNode = new H0()), n;
      case 22:
        return l = l.stateNode, n = l._retryCache, n === null && (n = l._retryCache = new H0()), n;
      default:
        throw Error(x(435, l.tag));
    }
  }
  function nd(l, n) {
    var u = x0(l);
    n.forEach(function(c) {
      var s = Qy.bind(null, l, c);
      u.has(c) || (u.add(c), c.then(s, s));
    });
  }
  function ca(l, n) {
    var u = n.deletions;
    if (u !== null)
      for (var c = 0; c < u.length; c++) {
        var s = u[c], r = l, y = n, v = y;
        e: for (; v !== null; ) {
          switch (v.tag) {
            case 27:
            case 5:
              Ie = v.stateNode, ia = !1;
              break e;
            case 3:
              Ie = v.stateNode.containerInfo, ia = !0;
              break e;
            case 4:
              Ie = v.stateNode.containerInfo, ia = !0;
              break e;
          }
          v = v.return;
        }
        if (Ie === null) throw Error(x(160));
        Ja(r, y, s), Ie = null, ia = !1, r = s.alternate, r !== null && (r.return = null), s.return = null;
      }
    if (n.subtreeFlags & 13878)
      for (n = n.child; n !== null; )
        ud(n, l), n = n.sibling;
  }
  var Ma = null;
  function ud(l, n) {
    var u = l.alternate, c = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ca(n, l), fa(l), c & 4 && (ci(3, l, l.return), Cf(3, l), ci(5, l, l.return));
        break;
      case 1:
        ca(n, l), fa(l), c & 512 && (ht || u === null || zl(u, u.return)), c & 64 && Ka && (l = l.updateQueue, l !== null && (c = l.callbacks, c !== null && (u = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = u === null ? c : u.concat(c))));
        break;
      case 26:
        var s = Ma;
        if (ca(n, l), fa(l), c & 512 && (ht || u === null || zl(u, u.return)), c & 4) {
          var r = u !== null ? u.memoizedState : null;
          if (c = l.memoizedState, u === null)
            if (c === null)
              if (l.stateNode === null) {
                e: {
                  c = l.type, u = l.memoizedProps, s = s.ownerDocument || s;
                  t: switch (c) {
                    case "title":
                      r = s.getElementsByTagName("title")[0], (!r || r[Vi] || r[Wt] || r.namespaceURI === "http://www.w3.org/2000/svg" || r.hasAttribute("itemprop")) && (r = s.createElement(c), s.head.insertBefore(
                        r,
                        s.querySelector("head > title")
                      )), Zt(r, c, u), r[Wt] = l, Mt(r), c = r;
                      break e;
                    case "link":
                      var y = Uu(
                        "link",
                        "href",
                        s
                      ).get(c + (u.href || ""));
                      if (y) {
                        for (var v = 0; v < y.length; v++)
                          if (r = y[v], r.getAttribute("href") === (u.href == null ? null : u.href) && r.getAttribute("rel") === (u.rel == null ? null : u.rel) && r.getAttribute("title") === (u.title == null ? null : u.title) && r.getAttribute("crossorigin") === (u.crossOrigin == null ? null : u.crossOrigin)) {
                            y.splice(v, 1);
                            break t;
                          }
                      }
                      r = s.createElement(c), Zt(r, c, u), s.head.appendChild(r);
                      break;
                    case "meta":
                      if (y = Uu(
                        "meta",
                        "content",
                        s
                      ).get(c + (u.content || ""))) {
                        for (v = 0; v < y.length; v++)
                          if (r = y[v], r.getAttribute("content") === (u.content == null ? null : "" + u.content) && r.getAttribute("name") === (u.name == null ? null : u.name) && r.getAttribute("property") === (u.property == null ? null : u.property) && r.getAttribute("http-equiv") === (u.httpEquiv == null ? null : u.httpEquiv) && r.getAttribute("charset") === (u.charSet == null ? null : u.charSet)) {
                            y.splice(v, 1);
                            break t;
                          }
                      }
                      r = s.createElement(c), Zt(r, c, u), s.head.appendChild(r);
                      break;
                    default:
                      throw Error(x(468, c));
                  }
                  r[Wt] = l, Mt(r), c = r;
                }
                l.stateNode = c;
              } else
                al(
                  s,
                  l.type,
                  l.stateNode
                );
            else
              l.stateNode = As(
                s,
                c,
                l.memoizedProps
              );
          else
            r !== c ? (r === null ? u.stateNode !== null && (u = u.stateNode, u.parentNode.removeChild(u)) : r.count--, c === null ? al(
              s,
              l.type,
              l.stateNode
            ) : As(
              s,
              c,
              l.memoizedProps
            )) : c === null && l.stateNode !== null && U0(
              l,
              l.memoizedProps,
              u.memoizedProps
            );
        }
        break;
      case 27:
        if (c & 4 && l.alternate === null) {
          s = l.stateNode, r = l.memoizedProps;
          try {
            for (var g = s.firstChild; g; ) {
              var z = g.nextSibling, Y = g.nodeName;
              g[Vi] || Y === "HEAD" || Y === "BODY" || Y === "SCRIPT" || Y === "STYLE" || Y === "LINK" && g.rel.toLowerCase() === "stylesheet" || s.removeChild(g), g = z;
            }
            for (var X = l.type, O = s.attributes; O.length; )
              s.removeAttributeNode(O[0]);
            Zt(s, X, r), s[Wt] = l, s[Gl] = r;
          } catch (J) {
            Ve(l, l.return, J);
          }
        }
      case 5:
        if (ca(n, l), fa(l), c & 512 && (ht || u === null || zl(u, u.return)), l.flags & 32) {
          s = l.stateNode;
          try {
            cn(s, "");
          } catch (J) {
            Ve(l, l.return, J);
          }
        }
        c & 4 && l.stateNode != null && (s = l.memoizedProps, U0(
          l,
          s,
          u !== null ? u.memoizedProps : s
        )), c & 1024 && (ld = !0);
        break;
      case 6:
        if (ca(n, l), fa(l), c & 4) {
          if (l.stateNode === null)
            throw Error(x(162));
          c = l.memoizedProps, u = l.stateNode;
          try {
            u.nodeValue = c;
          } catch (J) {
            Ve(l, l.return, J);
          }
        }
        break;
      case 3:
        if (Hc = null, s = Ma, Ma = Hd(n.containerInfo), ca(n, l), Ma = s, fa(l), c & 4 && u !== null && u.memoizedState.isDehydrated)
          try {
            Wf(n.containerInfo);
          } catch (J) {
            Ve(l, l.return, J);
          }
        ld && (ld = !1, id(l));
        break;
      case 4:
        c = Ma, Ma = Hd(
          l.stateNode.containerInfo
        ), ca(n, l), fa(l), Ma = c;
        break;
      case 12:
        ca(n, l), fa(l);
        break;
      case 13:
        ca(n, l), fa(l), l.child.flags & 8192 && l.memoizedState !== null != (u !== null && u.memoizedState !== null) && (yd = Yl()), c & 4 && (c = l.updateQueue, c !== null && (l.updateQueue = null, nd(l, c)));
        break;
      case 22:
        if (c & 512 && (ht || u === null || zl(u, u.return)), g = l.memoizedState !== null, z = u !== null && u.memoizedState !== null, Y = Ka, X = ht, Ka = Y || g, ht = X || z, ca(n, l), ht = X, Ka = Y, fa(l), n = l.stateNode, n._current = l, n._visibility &= -3, n._visibility |= n._pendingVisibility & 2, c & 8192 && (n._visibility = g ? n._visibility & -2 : n._visibility | 1, g && (n = Ka || ht, u === null || z || n || mc(l)), l.memoizedProps === null || l.memoizedProps.mode !== "manual"))
          e: for (u = null, n = l; ; ) {
            if (n.tag === 5 || n.tag === 26 || n.tag === 27) {
              if (u === null) {
                z = u = n;
                try {
                  if (s = z.stateNode, g)
                    r = s.style, typeof r.setProperty == "function" ? r.setProperty(
                      "display",
                      "none",
                      "important"
                    ) : r.display = "none";
                  else {
                    y = z.stateNode, v = z.memoizedProps.style;
                    var B = v != null && v.hasOwnProperty("display") ? v.display : null;
                    y.style.display = B == null || typeof B == "boolean" ? "" : ("" + B).trim();
                  }
                } catch (J) {
                  Ve(z, z.return, J);
                }
              }
            } else if (n.tag === 6) {
              if (u === null) {
                z = n;
                try {
                  z.stateNode.nodeValue = g ? "" : z.memoizedProps;
                } catch (J) {
                  Ve(z, z.return, J);
                }
              }
            } else if ((n.tag !== 22 && n.tag !== 23 || n.memoizedState === null || n === l) && n.child !== null) {
              n.child.return = n, n = n.child;
              continue;
            }
            if (n === l) break e;
            for (; n.sibling === null; ) {
              if (n.return === null || n.return === l) break e;
              u === n && (u = null), n = n.return;
            }
            u === n && (u = null), n.sibling.return = n.return, n = n.sibling;
          }
        c & 4 && (c = l.updateQueue, c !== null && (u = c.retryQueue, u !== null && (c.retryQueue = null, nd(l, u))));
        break;
      case 19:
        ca(n, l), fa(l), c & 4 && (c = l.updateQueue, c !== null && (l.updateQueue = null, nd(l, c)));
        break;
      case 21:
        break;
      default:
        ca(n, l), fa(l);
    }
  }
  function fa(l) {
    var n = l.flags;
    if (n & 2) {
      try {
        if (l.tag !== 27) {
          e: {
            for (var u = l.return; u !== null; ) {
              if (Ay(u)) {
                var c = u;
                break e;
              }
              u = u.return;
            }
            throw Error(x(160));
          }
          switch (c.tag) {
            case 27:
              var s = c.stateNode, r = Eu(l);
              Ue(l, r, s);
              break;
            case 5:
              var y = c.stateNode;
              c.flags & 32 && (cn(y, ""), c.flags &= -33);
              var v = Eu(l);
              Ue(l, v, y);
              break;
            case 3:
            case 4:
              var g = c.stateNode.containerInfo, z = Eu(l);
              td(
                l,
                z,
                g
              );
              break;
            default:
              throw Error(x(161));
          }
        }
      } catch (Y) {
        Ve(l, l.return, Y);
      }
      l.flags &= -3;
    }
    n & 4096 && (l.flags &= -4097);
  }
  function id(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var n = l;
        id(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), l = l.sibling;
      }
  }
  function Rn(l, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        Dy(l, n.alternate, n), n = n.sibling;
  }
  function mc(l) {
    for (l = l.child; l !== null; ) {
      var n = l;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ci(4, n, n.return), mc(n);
          break;
        case 1:
          zl(n, n.return);
          var u = n.stateNode;
          typeof u.componentWillUnmount == "function" && cs(
            n,
            n.return,
            u
          ), mc(n);
          break;
        case 26:
        case 27:
        case 5:
          zl(n, n.return), mc(n);
          break;
        case 22:
          zl(n, n.return), n.memoizedState === null && mc(n);
          break;
        default:
          mc(n);
      }
      l = l.sibling;
    }
  }
  function oi(l, n, u) {
    for (u = u && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var c = n.alternate, s = l, r = n, y = r.flags;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          oi(
            s,
            r,
            u
          ), Cf(4, r);
          break;
        case 1:
          if (oi(
            s,
            r,
            u
          ), c = r, s = c.stateNode, typeof s.componentDidMount == "function")
            try {
              s.componentDidMount();
            } catch (z) {
              Ve(c, c.return, z);
            }
          if (c = r, s = c.updateQueue, s !== null) {
            var v = c.stateNode;
            try {
              var g = s.shared.hiddenCallbacks;
              if (g !== null)
                for (s.shared.hiddenCallbacks = null, s = 0; s < g.length; s++)
                  M0(g[s], v);
            } catch (z) {
              Ve(c, c.return, z);
            }
          }
          u && y & 64 && yc(r), fi(r, r.return);
          break;
        case 26:
        case 27:
        case 5:
          oi(
            s,
            r,
            u
          ), u && c === null && y & 4 && O0(r), fi(r, r.return);
          break;
        case 12:
          oi(
            s,
            r,
            u
          );
          break;
        case 13:
          oi(
            s,
            r,
            u
          ), u && y & 4 && xf(s, r);
          break;
        case 22:
          r.memoizedState === null && oi(
            s,
            r,
            u
          ), fi(r, r.return);
          break;
        default:
          oi(
            s,
            r,
            u
          );
      }
      n = n.sibling;
    }
  }
  function cd(l, n) {
    var u = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), l = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (l = n.memoizedState.cachePool.pool), l !== u && (l != null && l.refCount++, u != null && yf(u));
  }
  function pe(l, n) {
    l = null, n.alternate !== null && (l = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== l && (n.refCount++, l != null && yf(l));
  }
  function Mn(l, n, u, c) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        fd(
          l,
          n,
          u,
          c
        ), n = n.sibling;
  }
  function fd(l, n, u, c) {
    var s = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        Mn(
          l,
          n,
          u,
          c
        ), s & 2048 && Cf(9, n);
        break;
      case 3:
        Mn(
          l,
          n,
          u,
          c
        ), s & 2048 && (l = null, n.alternate !== null && (l = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== l && (n.refCount++, l != null && yf(l)));
        break;
      case 12:
        if (s & 2048) {
          Mn(
            l,
            n,
            u,
            c
          ), l = n.stateNode;
          try {
            var r = n.memoizedProps, y = r.id, v = r.onPostCommit;
            typeof v == "function" && v(
              y,
              n.alternate === null ? "mount" : "update",
              l.passiveEffectDuration,
              -0
            );
          } catch (g) {
            Ve(n, n.return, g);
          }
        } else
          Mn(
            l,
            n,
            u,
            c
          );
        break;
      case 23:
        break;
      case 22:
        r = n.stateNode, n.memoizedState !== null ? r._visibility & 4 ? Mn(
          l,
          n,
          u,
          c
        ) : pc(l, n) : r._visibility & 4 ? Mn(
          l,
          n,
          u,
          c
        ) : (r._visibility |= 4, vc(
          l,
          n,
          u,
          c,
          (n.subtreeFlags & 10256) !== 0
        )), s & 2048 && cd(
          n.alternate,
          n
        );
        break;
      case 24:
        Mn(
          l,
          n,
          u,
          c
        ), s & 2048 && pe(n.alternate, n);
        break;
      default:
        Mn(
          l,
          n,
          u,
          c
        );
    }
  }
  function vc(l, n, u, c, s) {
    for (s = s && (n.subtreeFlags & 10256) !== 0, n = n.child; n !== null; ) {
      var r = l, y = n, v = u, g = c, z = y.flags;
      switch (y.tag) {
        case 0:
        case 11:
        case 15:
          vc(
            r,
            y,
            v,
            g,
            s
          ), Cf(8, y);
          break;
        case 23:
          break;
        case 22:
          var Y = y.stateNode;
          y.memoizedState !== null ? Y._visibility & 4 ? vc(
            r,
            y,
            v,
            g,
            s
          ) : pc(
            r,
            y
          ) : (Y._visibility |= 4, vc(
            r,
            y,
            v,
            g,
            s
          )), s && z & 2048 && cd(
            y.alternate,
            y
          );
          break;
        case 24:
          vc(
            r,
            y,
            v,
            g,
            s
          ), s && z & 2048 && pe(y.alternate, y);
          break;
        default:
          vc(
            r,
            y,
            v,
            g,
            s
          );
      }
      n = n.sibling;
    }
  }
  function pc(l, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var u = l, c = n, s = c.flags;
        switch (c.tag) {
          case 22:
            pc(u, c), s & 2048 && cd(
              c.alternate,
              c
            );
            break;
          case 24:
            pc(u, c), s & 2048 && pe(c.alternate, c);
            break;
          default:
            pc(u, c);
        }
        n = n.sibling;
      }
  }
  var Au = 8192;
  function Du(l) {
    if (l.subtreeFlags & Au)
      for (l = l.child; l !== null; )
        gc(l), l = l.sibling;
  }
  function gc(l) {
    switch (l.tag) {
      case 26:
        Du(l), l.flags & Au && l.memoizedState !== null && ip(
          Ma,
          l.memoizedState,
          l.memoizedProps
        );
        break;
      case 5:
        Du(l);
        break;
      case 3:
      case 4:
        var n = Ma;
        Ma = Hd(l.stateNode.containerInfo), Du(l), Ma = n;
        break;
      case 22:
        l.memoizedState === null && (n = l.alternate, n !== null && n.memoizedState !== null ? (n = Au, Au = 16777216, Du(l), Au = n) : Du(l));
        break;
      default:
        Du(l);
    }
  }
  function My(l) {
    var n = l.alternate;
    if (n !== null && (l = n.child, l !== null)) {
      n.child = null;
      do
        n = l.sibling, l.sibling = null, l = n;
      while (l !== null);
    }
  }
  function Sc(l) {
    var n = l.deletions;
    if (l.flags & 16) {
      if (n !== null)
        for (var u = 0; u < n.length; u++) {
          var c = n[u];
          Lt = c, ka(
            c,
            l
          );
        }
      My(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        Ct(l), l = l.sibling;
  }
  function Ct(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Sc(l), l.flags & 2048 && ci(9, l, l.return);
        break;
      case 3:
        Sc(l);
        break;
      case 12:
        Sc(l);
        break;
      case 22:
        var n = l.stateNode;
        l.memoizedState !== null && n._visibility & 4 && (l.return === null || l.return.tag !== 13) ? (n._visibility &= -5, od(l)) : Sc(l);
        break;
      default:
        Sc(l);
    }
  }
  function od(l) {
    var n = l.deletions;
    if (l.flags & 16) {
      if (n !== null)
        for (var u = 0; u < n.length; u++) {
          var c = n[u];
          Lt = c, ka(
            c,
            l
          );
        }
      My(l);
    }
    for (l = l.child; l !== null; ) {
      switch (n = l, n.tag) {
        case 0:
        case 11:
        case 15:
          ci(8, n, n.return), od(n);
          break;
        case 22:
          u = n.stateNode, u._visibility & 4 && (u._visibility &= -5, od(n));
          break;
        default:
          od(n);
      }
      l = l.sibling;
    }
  }
  function ka(l, n) {
    for (; Lt !== null; ) {
      var u = Lt;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          ci(8, u, n);
          break;
        case 23:
        case 22:
          if (u.memoizedState !== null && u.memoizedState.cachePool !== null) {
            var c = u.memoizedState.cachePool.pool;
            c != null && c.refCount++;
          }
          break;
        case 24:
          yf(u.memoizedState.cache);
      }
      if (c = u.child, c !== null) c.return = u, Lt = c;
      else
        e: for (u = l; Lt !== null; ) {
          c = Lt;
          var s = c.sibling, r = c.return;
          if (Ry(c), c === u) {
            Lt = null;
            break e;
          }
          if (s !== null) {
            s.return = r, Lt = s;
            break e;
          }
          Lt = r;
        }
    }
  }
  function B0(l, n, u, c) {
    this.tag = l, this.key = u, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = c, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function xt(l, n, u, c) {
    return new B0(l, n, u, c);
  }
  function sd(l) {
    return l = l.prototype, !(!l || !l.isReactComponent);
  }
  function $a(l, n) {
    var u = l.alternate;
    return u === null ? (u = xt(
      l.tag,
      n,
      l.key,
      l.mode
    ), u.elementType = l.elementType, u.type = l.type, u.stateNode = l.stateNode, u.alternate = l, l.alternate = u) : (u.pendingProps = n, u.type = l.type, u.flags = 0, u.subtreeFlags = 0, u.deletions = null), u.flags = l.flags & 31457280, u.childLanes = l.childLanes, u.lanes = l.lanes, u.child = l.child, u.memoizedProps = l.memoizedProps, u.memoizedState = l.memoizedState, u.updateQueue = l.updateQueue, n = l.dependencies, u.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, u.sibling = l.sibling, u.index = l.index, u.ref = l.ref, u.refCleanup = l.refCleanup, u;
  }
  function Be(l, n) {
    l.flags &= 31457282;
    var u = l.alternate;
    return u === null ? (l.childLanes = 0, l.lanes = n, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = u.childLanes, l.lanes = u.lanes, l.child = u.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = u.memoizedProps, l.memoizedState = u.memoizedState, l.updateQueue = u.updateQueue, l.type = u.type, n = u.dependencies, l.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), l;
  }
  function Bf(l, n, u, c, s, r) {
    var y = 0;
    if (c = l, typeof l == "function") sd(l) && (y = 1);
    else if (typeof l == "string")
      y = wl(
        l,
        u,
        ql.current
      ) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else
      e: switch (l) {
        case _:
          return nt(u.children, s, r, n);
        case Jt:
          y = 8, s |= 24;
          break;
        case Kn:
          return l = xt(12, u, n, s | 2), l.elementType = Kn, l.lanes = r, l;
        case Gt:
          return l = xt(13, u, n, s), l.elementType = Gt, l.lanes = r, l;
        case ln:
          return l = xt(19, u, n, s), l.elementType = ln, l.lanes = r, l;
        case $l:
          return q0(u, s, r, n);
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case kt:
              case cl:
                y = 10;
                break e;
              case Ne:
                y = 9;
                break e;
              case ft:
                y = 11;
                break e;
              case Ke:
                y = 14;
                break e;
              case ne:
                y = 16, c = null;
                break e;
            }
          y = 29, u = Error(
            x(130, l === null ? "null" : typeof l, "")
          ), c = null;
      }
    return n = xt(y, u, n, s), n.elementType = l, n.type = c, n.lanes = r, n;
  }
  function nt(l, n, u, c) {
    return l = xt(7, l, c, n), l.lanes = u, l;
  }
  function q0(l, n, u, c) {
    l = xt(22, l, c, n), l.elementType = $l, l.lanes = u;
    var s = {
      _visibility: 1,
      _pendingVisibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null,
      _current: null,
      detach: function() {
        var r = s._current;
        if (r === null) throw Error(x(456));
        if (!(s._pendingVisibility & 2)) {
          var y = on(r, 2);
          y !== null && (s._pendingVisibility |= 2, Bt(y, r, 2));
        }
      },
      attach: function() {
        var r = s._current;
        if (r === null) throw Error(x(456));
        if (s._pendingVisibility & 2) {
          var y = on(r, 2);
          y !== null && (s._pendingVisibility &= -3, Bt(y, r, 2));
        }
      }
    };
    return l.stateNode = s, l;
  }
  function rd(l, n, u) {
    return l = xt(6, l, null, n), l.lanes = u, l;
  }
  function fs(l, n, u) {
    return n = xt(
      4,
      l.children !== null ? l.children : [],
      l.key,
      n
    ), n.lanes = u, n.stateNode = {
      containerInfo: l.containerInfo,
      pendingChildren: null,
      implementation: l.implementation
    }, n;
  }
  function On(l) {
    l.flags |= 4;
  }
  function oa(l, n) {
    if (n.type !== "stylesheet" || n.state.loading & 4)
      l.flags &= -16777217;
    else if (l.flags |= 16777216, !Ti(n)) {
      if (n = aa.current, n !== null && ((Ae & 4194176) === Ae ? ja !== null : (Ae & 62914560) !== Ae && !(Ae & 536870912) || n !== ja))
        throw ac = Rr, No;
      l.flags |= 8192;
    }
  }
  function os(l, n) {
    n !== null && (l.flags |= 4), l.flags & 16384 && (n = l.tag !== 22 ? Dt() : 536870912, l.lanes |= n, ri |= n);
  }
  function bc(l, n) {
    if (!De)
      switch (l.tailMode) {
        case "hidden":
          n = l.tail;
          for (var u = null; n !== null; )
            n.alternate !== null && (u = n), n = n.sibling;
          u === null ? l.tail = null : u.sibling = null;
          break;
        case "collapsed":
          u = l.tail;
          for (var c = null; u !== null; )
            u.alternate !== null && (c = u), u = u.sibling;
          c === null ? n || l.tail === null ? l.tail = null : l.tail.sibling = null : c.sibling = null;
      }
  }
  function Pe(l) {
    var n = l.alternate !== null && l.alternate.child === l.child, u = 0, c = 0;
    if (n)
      for (var s = l.child; s !== null; )
        u |= s.lanes | s.childLanes, c |= s.subtreeFlags & 31457280, c |= s.flags & 31457280, s.return = l, s = s.sibling;
    else
      for (s = l.child; s !== null; )
        u |= s.lanes | s.childLanes, c |= s.subtreeFlags, c |= s.flags, s.return = l, s = s.sibling;
    return l.subtreeFlags |= c, l.childLanes = u, n;
  }
  function dd(l, n, u) {
    var c = n.pendingProps;
    switch (Yo(n), n.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Pe(n), null;
      case 1:
        return Pe(n), null;
      case 3:
        return u = n.stateNode, c = null, l !== null && (c = l.memoizedState.cache), n.memoizedState.cache !== c && (n.flags |= 2048), An(Ht), wc(), u.pendingContext && (u.context = u.pendingContext, u.pendingContext = null), (l === null || l.child === null) && (ec(n) ? On(n) : l === null || l.memoizedState.isDehydrated && !(n.flags & 256) || (n.flags |= 1024, Da !== null && (xy(Da), Da = null))), Pe(n), null;
      case 26:
        return u = n.memoizedState, l === null ? (On(n), u !== null ? (Pe(n), oa(n, u)) : (Pe(n), n.flags &= -16777217)) : u ? u !== l.memoizedState ? (On(n), Pe(n), oa(n, u)) : (Pe(n), n.flags &= -16777217) : (l.memoizedProps !== c && On(n), Pe(n), n.flags &= -16777217), null;
      case 27:
        Fs(n), u = an.current;
        var s = n.type;
        if (l !== null && n.stateNode != null)
          l.memoizedProps !== c && On(n);
        else {
          if (!c) {
            if (n.stateNode === null)
              throw Error(x(166));
            return Pe(n), null;
          }
          l = ql.current, ec(n) ? Lh(n) : (l = Bn(s, c, u), n.stateNode = l, On(n));
        }
        return Pe(n), null;
      case 5:
        if (Fs(n), u = n.type, l !== null && n.stateNode != null)
          l.memoizedProps !== c && On(n);
        else {
          if (!c) {
            if (n.stateNode === null)
              throw Error(x(166));
            return Pe(n), null;
          }
          if (l = ql.current, ec(n))
            Lh(n);
          else {
            switch (s = gs(
              an.current
            ), l) {
              case 1:
                l = s.createElementNS(
                  "http://www.w3.org/2000/svg",
                  u
                );
                break;
              case 2:
                l = s.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  u
                );
                break;
              default:
                switch (u) {
                  case "svg":
                    l = s.createElementNS(
                      "http://www.w3.org/2000/svg",
                      u
                    );
                    break;
                  case "math":
                    l = s.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    l = s.createElement("div"), l.innerHTML = "<script><\/script>", l = l.removeChild(l.firstChild);
                    break;
                  case "select":
                    l = typeof c.is == "string" ? s.createElement("select", { is: c.is }) : s.createElement("select"), c.multiple ? l.multiple = !0 : c.size && (l.size = c.size);
                    break;
                  default:
                    l = typeof c.is == "string" ? s.createElement(u, { is: c.is }) : s.createElement(u);
                }
            }
            l[Wt] = n, l[Gl] = c;
            e: for (s = n.child; s !== null; ) {
              if (s.tag === 5 || s.tag === 6)
                l.appendChild(s.stateNode);
              else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
                s.child.return = s, s = s.child;
                continue;
              }
              if (s === n) break e;
              for (; s.sibling === null; ) {
                if (s.return === null || s.return === n)
                  break e;
                s = s.return;
              }
              s.sibling.return = s.return, s = s.sibling;
            }
            n.stateNode = l;
            e: switch (Zt(l, u, c), u) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                l = !!c.autoFocus;
                break e;
              case "img":
                l = !0;
                break e;
              default:
                l = !1;
            }
            l && On(n);
          }
        }
        return Pe(n), n.flags &= -16777217, null;
      case 6:
        if (l && n.stateNode != null)
          l.memoizedProps !== c && On(n);
        else {
          if (typeof c != "string" && n.stateNode === null)
            throw Error(x(166));
          if (l = an.current, ec(n)) {
            if (l = n.stateNode, u = n.memoizedProps, c = null, s = el, s !== null)
              switch (s.tag) {
                case 27:
                case 5:
                  c = s.memoizedProps;
              }
            l[Wt] = n, l = !!(l.nodeValue === u || c !== null && c.suppressHydrationWarning === !0 || se(l.nodeValue, u)), l || Wu(n);
          } else
            l = gs(l).createTextNode(
              c
            ), l[Wt] = n, n.stateNode = l;
        }
        return Pe(n), null;
      case 13:
        if (c = n.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (s = ec(n), c !== null && c.dehydrated !== null) {
            if (l === null) {
              if (!s) throw Error(x(318));
              if (s = n.memoizedState, s = s !== null ? s.dehydrated : null, !s) throw Error(x(317));
              s[Wt] = n;
            } else
              ff(), !(n.flags & 128) && (n.memoizedState = null), n.flags |= 4;
            Pe(n), s = !1;
          } else
            Da !== null && (xy(Da), Da = null), s = !0;
          if (!s)
            return n.flags & 256 ? (La(n), n) : (La(n), null);
        }
        if (La(n), n.flags & 128)
          return n.lanes = u, n;
        if (u = c !== null, l = l !== null && l.memoizedState !== null, u) {
          c = n.child, s = null, c.alternate !== null && c.alternate.memoizedState !== null && c.alternate.memoizedState.cachePool !== null && (s = c.alternate.memoizedState.cachePool.pool);
          var r = null;
          c.memoizedState !== null && c.memoizedState.cachePool !== null && (r = c.memoizedState.cachePool.pool), r !== s && (c.flags |= 2048);
        }
        return u !== l && u && (n.child.flags |= 8192), os(n, n.updateQueue), Pe(n), null;
      case 4:
        return wc(), l === null && Oc(n.stateNode.containerInfo), Pe(n), null;
      case 10:
        return An(n.type), Pe(n), null;
      case 19:
        if (mt(St), s = n.memoizedState, s === null) return Pe(n), null;
        if (c = (n.flags & 128) !== 0, r = s.rendering, r === null)
          if (c) bc(s, !1);
          else {
            if (tt !== 0 || l !== null && l.flags & 128)
              for (l = n.child; l !== null; ) {
                if (r = Xo(l), r !== null) {
                  for (n.flags |= 128, bc(s, !1), l = r.updateQueue, n.updateQueue = l, os(n, l), n.subtreeFlags = 0, l = u, u = n.child; u !== null; )
                    Be(u, l), u = u.sibling;
                  return Xe(
                    St,
                    St.current & 1 | 2
                  ), n.child;
                }
                l = l.sibling;
              }
            s.tail !== null && Yl() > rs && (n.flags |= 128, c = !0, bc(s, !1), n.lanes = 4194304);
          }
        else {
          if (!c)
            if (l = Xo(r), l !== null) {
              if (n.flags |= 128, c = !0, l = l.updateQueue, n.updateQueue = l, os(n, l), bc(s, !0), s.tail === null && s.tailMode === "hidden" && !r.alternate && !De)
                return Pe(n), null;
            } else
              2 * Yl() - s.renderingStartTime > rs && u !== 536870912 && (n.flags |= 128, c = !0, bc(s, !1), n.lanes = 4194304);
          s.isBackwards ? (r.sibling = n.child, n.child = r) : (l = s.last, l !== null ? l.sibling = r : n.child = r, s.last = r);
        }
        return s.tail !== null ? (n = s.tail, s.rendering = n, s.tail = n.sibling, s.renderingStartTime = Yl(), n.sibling = null, l = St.current, Xe(St, c ? l & 1 | 2 : l & 1), n) : (Pe(n), null);
      case 22:
      case 23:
        return La(n), Vo(), c = n.memoizedState !== null, l !== null ? l.memoizedState !== null !== c && (n.flags |= 8192) : c && (n.flags |= 8192), c ? u & 536870912 && !(n.flags & 128) && (Pe(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Pe(n), u = n.updateQueue, u !== null && os(n, u.retryQueue), u = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), c = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (c = n.memoizedState.cachePool.pool), c !== u && (n.flags |= 2048), l !== null && mt(Pu), null;
      case 24:
        return u = null, l !== null && (u = l.memoizedState.cache), n.memoizedState.cache !== u && (n.flags |= 2048), An(Ht), Pe(n), null;
      case 25:
        return null;
    }
    throw Error(x(156, n.tag));
  }
  function Y0(l, n) {
    switch (Yo(n), n.tag) {
      case 1:
        return l = n.flags, l & 65536 ? (n.flags = l & -65537 | 128, n) : null;
      case 3:
        return An(Ht), wc(), l = n.flags, l & 65536 && !(l & 128) ? (n.flags = l & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return Fs(n), null;
      case 13:
        if (La(n), l = n.memoizedState, l !== null && l.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(x(340));
          ff();
        }
        return l = n.flags, l & 65536 ? (n.flags = l & -65537 | 128, n) : null;
      case 19:
        return mt(St), null;
      case 4:
        return wc(), null;
      case 10:
        return An(n.type), null;
      case 22:
      case 23:
        return La(n), Vo(), l !== null && mt(Pu), l = n.flags, l & 65536 ? (n.flags = l & -65537 | 128, n) : null;
      case 24:
        return An(Ht), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function N0(l, n) {
    switch (Yo(n), n.tag) {
      case 3:
        An(Ht), wc();
        break;
      case 26:
      case 27:
      case 5:
        Fs(n);
        break;
      case 4:
        wc();
        break;
      case 13:
        La(n);
        break;
      case 19:
        mt(St);
        break;
      case 10:
        An(n.type);
        break;
      case 22:
      case 23:
        La(n), Vo(), l !== null && mt(Pu);
        break;
      case 24:
        An(Ht);
    }
  }
  var hd = {
    getCacheForType: function(l) {
      var n = tl(Ht), u = n.data.get(l);
      return u === void 0 && (u = l(), n.data.set(l, u)), u;
    }
  }, G0 = typeof WeakMap == "function" ? WeakMap : Map, et = 0, Ge = null, ge = null, Ae = 0, Le = 0, sa = null, Un = !1, qf = !1, Oy = !1, Ru = 0, tt = 0, si = 0, Tc = 0, Uy = 0, Oa = 0, ri = 0, ss = null, Hn = null, Zl = !1, yd = 0, rs = 1 / 0, ds = null, Mu = null, md = !1, Ec = null, Yf = 0, Hy = 0, Nf = null, Gf = 0, vd = null;
  function hl() {
    if (et & 2 && Ae !== 0)
      return Ae & -Ae;
    if (te.T !== null) {
      var l = ou;
      return l !== 0 ? l : Lf();
    }
    return po();
  }
  function zc() {
    Oa === 0 && (Oa = !(Ae & 536870912) || De ? Gi() : 536870912);
    var l = aa.current;
    return l !== null && (l.flags |= 32), Oa;
  }
  function Bt(l, n, u) {
    (l === Ge && Le === 2 || l.cancelPendingCommit !== null) && (di(l, 0), Cn(
      l,
      Ae,
      Oa,
      !1
    )), un(l, u), (!(et & 2) || l !== Ge) && (l === Ge && (!(et & 2) && (Tc |= u), tt === 4 && Cn(
      l,
      Ae,
      Oa,
      !1
    )), ra(l));
  }
  function Cy(l, n, u) {
    if (et & 6) throw Error(x(327));
    var c = !u && (n & 60) === 0 && (n & l.expiredLanes) === 0 || qa(l, n), s = c ? kv(l, n) : Yy(l, n, !0), r = c;
    do {
      if (s === 0) {
        qf && !c && Cn(l, n, 0, !1);
        break;
      } else if (s === 6)
        Cn(
          l,
          n,
          0,
          !Un
        );
      else {
        if (u = l.current.alternate, r && !hs(u)) {
          s = Yy(l, n, !1), r = !1;
          continue;
        }
        if (s === 2) {
          if (r = n, l.errorRecoveryDisabledLanes & r)
            var y = 0;
          else
            y = l.pendingLanes & -536870913, y = y !== 0 ? y : y & 536870912 ? 536870912 : 0;
          if (y !== 0) {
            n = y;
            e: {
              var v = l;
              s = ss;
              var g = v.current.memoizedState.isDehydrated;
              if (g && (di(v, y).flags |= 256), y = Yy(
                v,
                y,
                !1
              ), y !== 2) {
                if (Oy && !g) {
                  v.errorRecoveryDisabledLanes |= r, Tc |= r, s = 4;
                  break e;
                }
                r = Hn, Hn = s, r !== null && xy(r);
              }
              s = y;
            }
            if (r = !1, s !== 2) continue;
          }
        }
        if (s === 1) {
          di(l, 0), Cn(l, n, 0, !0);
          break;
        }
        e: {
          switch (c = l, s) {
            case 0:
            case 1:
              throw Error(x(345));
            case 4:
              if ((n & 4194176) === n) {
                Cn(
                  c,
                  n,
                  Oa,
                  !Un
                );
                break e;
              }
              break;
            case 2:
              Hn = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(x(329));
          }
          if (c.finishedWork = u, c.finishedLanes = n, (n & 62914560) === n && (r = yd + 300 - Yl(), 10 < r)) {
            if (Cn(
              c,
              n,
              Oa,
              !Un
            ), nn(c, 0) !== 0) break e;
            c.timeoutHandle = ha(
              Ac.bind(
                null,
                c,
                u,
                Hn,
                ds,
                Zl,
                n,
                Oa,
                Tc,
                ri,
                Un,
                2,
                -0,
                0
              ),
              r
            );
            break e;
          }
          Ac(
            c,
            u,
            Hn,
            ds,
            Zl,
            n,
            Oa,
            Tc,
            ri,
            Un,
            0,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    ra(l);
  }
  function xy(l) {
    Hn === null ? Hn = l : Hn.push.apply(
      Hn,
      l
    );
  }
  function Ac(l, n, u, c, s, r, y, v, g, z, Y, X, O) {
    var B = n.subtreeFlags;
    if ((B & 8192 || (B & 16785408) === 16785408) && (Cc = { stylesheets: null, count: 0, unsuspend: up }, gc(n), n = K0(), n !== null)) {
      l.cancelPendingCommit = n(
        Gy.bind(
          null,
          l,
          u,
          c,
          s,
          y,
          v,
          g,
          1,
          X,
          O
        )
      ), Cn(l, r, y, !z);
      return;
    }
    Gy(
      l,
      u,
      c,
      s,
      y,
      v,
      g,
      Y,
      X,
      O
    );
  }
  function hs(l) {
    for (var n = l; ; ) {
      var u = n.tag;
      if ((u === 0 || u === 11 || u === 15) && n.flags & 16384 && (u = n.updateQueue, u !== null && (u = u.stores, u !== null)))
        for (var c = 0; c < u.length; c++) {
          var s = u[c], r = s.getSnapshot;
          s = s.value;
          try {
            if (!ol(r(), s)) return !1;
          } catch {
            return !1;
          }
        }
      if (u = n.child, n.subtreeFlags & 16384 && u !== null)
        u.return = n, n = u;
      else {
        if (n === l) break;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === l) return !0;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
    }
    return !0;
  }
  function Cn(l, n, u, c) {
    n &= ~Uy, n &= ~Tc, l.suspendedLanes |= n, l.pingedLanes &= ~n, c && (l.warmLanes |= n), c = l.expirationTimes;
    for (var s = n; 0 < s; ) {
      var r = 31 - Nl(s), y = 1 << r;
      c[r] = -1, s &= ~y;
    }
    u !== 0 && er(l, u, n);
  }
  function Dc() {
    return et & 6 ? !0 : (Qf(0), !1);
  }
  function ys() {
    if (ge !== null) {
      if (Le === 0)
        var l = ge.return;
      else
        l = ge, zn = hc = null, Zo(l), Ut = null, Iu = 0, l = ge;
      for (; l !== null; )
        N0(l.alternate, l), l = l.return;
      ge = null;
    }
  }
  function di(l, n) {
    l.finishedWork = null, l.finishedLanes = 0;
    var u = l.timeoutHandle;
    u !== -1 && (l.timeoutHandle = -1, ll(u)), u = l.cancelPendingCommit, u !== null && (l.cancelPendingCommit = null, u()), ys(), Ge = l, ge = u = $a(l.current, null), Ae = n, Le = 0, sa = null, Un = !1, qf = qa(l, n), Oy = !1, ri = Oa = Uy = Tc = si = tt = 0, Hn = ss = null, Zl = !1, n & 8 && (n |= n & 32);
    var c = l.entangledLanes;
    if (c !== 0)
      for (l = l.entanglements, c &= n; 0 < c; ) {
        var s = 31 - Nl(c), r = 1 << s;
        n |= l[s], c &= ~r;
      }
    return Ru = n, Ar(), u;
  }
  function By(l, n) {
    fe = null, te.H = Xt, n === yn ? (n = Fu(), Le = 3) : n === No ? (n = Fu(), Le = 4) : Le = n === py ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, sa = n, ge === null && (tt = 1, pu(
      l,
      Vt(n, l.current)
    ));
  }
  function qy() {
    var l = te.H;
    return te.H = Xt, l === null ? Xt : l;
  }
  function V0() {
    var l = te.A;
    return te.A = hd, l;
  }
  function pd() {
    tt = 4, Un || (Ae & 4194176) !== Ae && aa.current !== null || (qf = !0), !(si & 134217727) && !(Tc & 134217727) || Ge === null || Cn(
      Ge,
      Ae,
      Oa,
      !1
    );
  }
  function Yy(l, n, u) {
    var c = et;
    et |= 2;
    var s = qy(), r = V0();
    (Ge !== l || Ae !== n) && (ds = null, di(l, n)), n = !1;
    var y = tt;
    e: do
      try {
        if (Le !== 0 && ge !== null) {
          var v = ge, g = sa;
          switch (Le) {
            case 8:
              ys(), y = 6;
              break e;
            case 3:
            case 2:
            case 6:
              aa.current === null && (n = !0);
              var z = Le;
              if (Le = 0, sa = null, Vf(l, v, g, z), u && qf) {
                y = 0;
                break e;
              }
              break;
            default:
              z = Le, Le = 0, sa = null, Vf(l, v, g, z);
          }
        }
        Jv(), y = tt;
        break;
      } catch (Y) {
        By(l, Y);
      }
    while (!0);
    return n && l.shellSuspendCounter++, zn = hc = null, et = c, te.H = s, te.A = r, ge === null && (Ge = null, Ae = 0, Ar()), y;
  }
  function Jv() {
    for (; ge !== null; ) Sd(ge);
  }
  function kv(l, n) {
    var u = et;
    et |= 2;
    var c = qy(), s = V0();
    Ge !== l || Ae !== n ? (ds = null, rs = Yl() + 500, di(l, n)) : qf = qa(
      l,
      n
    );
    e: do
      try {
        if (Le !== 0 && ge !== null) {
          n = ge;
          var r = sa;
          t: switch (Le) {
            case 1:
              Le = 0, sa = null, Vf(l, n, r, 1);
              break;
            case 2:
              if (g0(r)) {
                Le = 0, sa = null, X0(n);
                break;
              }
              n = function() {
                Le === 2 && Ge === l && (Le = 7), ra(l);
              }, r.then(n, n);
              break e;
            case 3:
              Le = 7;
              break e;
            case 4:
              Le = 5;
              break e;
            case 7:
              g0(r) ? (Le = 0, sa = null, X0(n)) : (Le = 0, sa = null, Vf(l, n, r, 7));
              break;
            case 5:
              var y = null;
              switch (ge.tag) {
                case 26:
                  y = ge.memoizedState;
                case 5:
                case 27:
                  var v = ge;
                  if (!y || Ti(y)) {
                    Le = 0, sa = null;
                    var g = v.sibling;
                    if (g !== null) ge = g;
                    else {
                      var z = v.return;
                      z !== null ? (ge = z, bd(z)) : ge = null;
                    }
                    break t;
                  }
              }
              Le = 0, sa = null, Vf(l, n, r, 5);
              break;
            case 6:
              Le = 0, sa = null, Vf(l, n, r, 6);
              break;
            case 8:
              ys(), tt = 6;
              break e;
            default:
              throw Error(x(462));
          }
        }
        gd();
        break;
      } catch (Y) {
        By(l, Y);
      }
    while (!0);
    return zn = hc = null, te.H = c, te.A = s, et = u, ge !== null ? 0 : (Ge = null, Ae = 0, Ar(), tt);
  }
  function gd() {
    for (; ge !== null && !_m(); )
      Sd(ge);
  }
  function Sd(l) {
    var n = ke(l.alternate, l, Ru);
    l.memoizedProps = l.pendingProps, n === null ? bd(l) : ge = n;
  }
  function X0(l) {
    var n = l, u = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = by(
          u,
          n,
          n.pendingProps,
          n.type,
          void 0,
          Ae
        );
        break;
      case 11:
        n = by(
          u,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          Ae
        );
        break;
      case 5:
        Zo(n);
      default:
        N0(u, n), n = ge = Be(n, Ru), n = ke(u, n, Ru);
    }
    l.memoizedProps = l.pendingProps, n === null ? bd(l) : ge = n;
  }
  function Vf(l, n, u, c) {
    zn = hc = null, Zo(n), Ut = null, Iu = 0;
    var s = n.return;
    try {
      if (ni(
        l,
        s,
        n,
        u,
        Ae
      )) {
        tt = 1, pu(
          l,
          Vt(u, l.current)
        ), ge = null;
        return;
      }
    } catch (r) {
      if (s !== null) throw ge = s, r;
      tt = 1, pu(
        l,
        Vt(u, l.current)
      ), ge = null;
      return;
    }
    n.flags & 32768 ? (De || c === 1 ? l = !0 : qf || Ae & 536870912 ? l = !1 : (Un = l = !0, (c === 2 || c === 3 || c === 6) && (c = aa.current, c !== null && c.tag === 13 && (c.flags |= 16384))), Ny(n, l)) : bd(n);
  }
  function bd(l) {
    var n = l;
    do {
      if (n.flags & 32768) {
        Ny(
          n,
          Un
        );
        return;
      }
      l = n.return;
      var u = dd(
        n.alternate,
        n,
        Ru
      );
      if (u !== null) {
        ge = u;
        return;
      }
      if (n = n.sibling, n !== null) {
        ge = n;
        return;
      }
      ge = n = l;
    } while (n !== null);
    tt === 0 && (tt = 5);
  }
  function Ny(l, n) {
    do {
      var u = Y0(l.alternate, l);
      if (u !== null) {
        u.flags &= 32767, ge = u;
        return;
      }
      if (u = l.return, u !== null && (u.flags |= 32768, u.subtreeFlags = 0, u.deletions = null), !n && (l = l.sibling, l !== null)) {
        ge = l;
        return;
      }
      ge = l = u;
    } while (l !== null);
    tt = 6, ge = null;
  }
  function Gy(l, n, u, c, s, r, y, v, g, z) {
    var Y = te.T, X = ie.p;
    try {
      ie.p = 2, te.T = null, Q0(
        l,
        n,
        u,
        c,
        X,
        s,
        r,
        y,
        v,
        g,
        z
      );
    } finally {
      te.T = Y, ie.p = X;
    }
  }
  function Q0(l, n, u, c, s, r, y, v) {
    do
      Rc();
    while (Ec !== null);
    if (et & 6) throw Error(x(327));
    var g = l.finishedWork;
    if (c = l.finishedLanes, g === null) return null;
    if (l.finishedWork = null, l.finishedLanes = 0, g === l.current) throw Error(x(177));
    l.callbackNode = null, l.callbackPriority = 0, l.cancelPendingCommit = null;
    var z = g.lanes | g.childLanes;
    if (z |= Bo, Kc(
      l,
      c,
      z,
      r,
      y,
      v
    ), l === Ge && (ge = Ge = null, Ae = 0), !(g.subtreeFlags & 10256) && !(g.flags & 10256) || md || (md = !0, Hy = z, Nf = u, jy(Yi, function() {
      return Rc(), null;
    })), u = (g.flags & 15990) !== 0, g.subtreeFlags & 15990 || u ? (u = te.T, te.T = null, r = ie.p, ie.p = 2, y = et, et |= 4, C0(l, g), ud(g, l), Vh(Od, l.containerInfo), Rs = !!Md, Od = Md = null, l.current = g, Dy(l, g.alternate, g), wm(), et = y, ie.p = r, te.T = u) : l.current = g, md ? (md = !1, Ec = l, Yf = c) : Vy(l, z), z = l.pendingLanes, z === 0 && (Mu = null), Gv(g.stateNode), ra(l), n !== null)
      for (s = l.onRecoverableError, g = 0; g < n.length; g++)
        z = n[g], s(z.value, {
          componentStack: z.stack
        });
    return Yf & 3 && Rc(), z = l.pendingLanes, c & 4194218 && z & 42 ? l === vd ? Gf++ : (Gf = 0, vd = l) : Gf = 0, Qf(0), null;
  }
  function Vy(l, n) {
    (l.pooledCacheLanes &= n) === 0 && (n = l.pooledCache, n != null && (l.pooledCache = null, yf(n)));
  }
  function Rc() {
    if (Ec !== null) {
      var l = Ec, n = Hy;
      Hy = 0;
      var u = vo(Yf), c = te.T, s = ie.p;
      try {
        if (ie.p = 32 > u ? 32 : u, te.T = null, Ec === null)
          var r = !1;
        else {
          u = Nf, Nf = null;
          var y = Ec, v = Yf;
          if (Ec = null, Yf = 0, et & 6)
            throw Error(x(331));
          var g = et;
          if (et |= 4, Ct(y.current), fd(y, y.current, v, u), et = g, Qf(0, !1), $t && typeof $t.onPostCommitFiberRoot == "function")
            try {
              $t.onPostCommitFiberRoot(Ni, y);
            } catch {
            }
          r = !0;
        }
        return r;
      } finally {
        ie.p = s, te.T = c, Vy(l, n);
      }
    }
    return !1;
  }
  function Td(l, n, u) {
    n = Vt(u, n), n = wa(l.stateNode, n, 2), l = Tu(l, n, 2), l !== null && (un(l, 2), ra(l));
  }
  function Ve(l, n, u) {
    if (l.tag === 3)
      Td(l, l, u);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          Td(
            n,
            l,
            u
          );
          break;
        } else if (n.tag === 1) {
          var c = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof c.componentDidCatch == "function" && (Mu === null || !Mu.has(c))) {
            l = Vt(u, l), u = Jr(2), c = Tu(n, u, 2), c !== null && (kr(
              u,
              c,
              n,
              l
            ), un(c, 2), ra(c));
            break;
          }
        }
        n = n.return;
      }
  }
  function Xy(l, n, u) {
    var c = l.pingCache;
    if (c === null) {
      c = l.pingCache = new G0();
      var s = /* @__PURE__ */ new Set();
      c.set(n, s);
    } else
      s = c.get(n), s === void 0 && (s = /* @__PURE__ */ new Set(), c.set(n, s));
    s.has(u) || (Oy = !0, s.add(u), l = $v.bind(null, l, n, u), n.then(l, l));
  }
  function $v(l, n, u) {
    var c = l.pingCache;
    c !== null && c.delete(n), l.pingedLanes |= l.suspendedLanes & u, l.warmLanes &= ~u, Ge === l && (Ae & u) === u && (tt === 4 || tt === 3 && (Ae & 62914560) === Ae && 300 > Yl() - yd ? !(et & 2) && di(l, 0) : Uy |= u, ri === Ae && (ri = 0)), ra(l);
  }
  function j0(l, n) {
    n === 0 && (n = Dt()), l = on(l, n), l !== null && (un(l, n), ra(l));
  }
  function Wv(l) {
    var n = l.memoizedState, u = 0;
    n !== null && (u = n.retryLane), j0(l, u);
  }
  function Qy(l, n) {
    var u = 0;
    switch (l.tag) {
      case 13:
        var c = l.stateNode, s = l.memoizedState;
        s !== null && (u = s.retryLane);
        break;
      case 19:
        c = l.stateNode;
        break;
      case 22:
        c = l.stateNode._retryCache;
        break;
      default:
        throw Error(x(314));
    }
    c !== null && c.delete(n), j0(l, u);
  }
  function jy(l, n) {
    return qi(l, n);
  }
  var Xf = null, Mc = null, Ed = !1, hi = !1, Ly = !1, yi = 0;
  function ra(l) {
    l !== Mc && l.next === null && (Mc === null ? Xf = Mc = l : Mc = Mc.next = l), hi = !0, Ed || (Ed = !0, _y(Fv));
  }
  function Qf(l, n) {
    if (!Ly && hi) {
      Ly = !0;
      do
        for (var u = !1, c = Xf; c !== null; ) {
          if (l !== 0) {
            var s = c.pendingLanes;
            if (s === 0) var r = 0;
            else {
              var y = c.suspendedLanes, v = c.pingedLanes;
              r = (1 << 31 - Nl(42 | l) + 1) - 1, r &= s & ~(y & ~v), r = r & 201326677 ? r & 201326677 | 1 : r ? r | 2 : 0;
            }
            r !== 0 && (u = !0, jf(c, r));
          } else
            r = Ae, r = nn(
              c,
              c === Ge ? r : 0
            ), !(r & 3) || qa(c, r) || (u = !0, jf(c, r));
          c = c.next;
        }
      while (u);
      Ly = !1;
    }
  }
  function Fv() {
    hi = Ed = !1;
    var l = 0;
    yi !== 0 && (ml() && (l = yi), yi = 0);
    for (var n = Yl(), u = null, c = Xf; c !== null; ) {
      var s = c.next, r = ms(c, n);
      r === 0 ? (c.next = null, u === null ? Xf = s : u.next = s, s === null && (Mc = u)) : (u = c, (l !== 0 || r & 3) && (hi = !0)), c = s;
    }
    Qf(l);
  }
  function ms(l, n) {
    for (var u = l.suspendedLanes, c = l.pingedLanes, s = l.expirationTimes, r = l.pendingLanes & -62914561; 0 < r; ) {
      var y = 31 - Nl(r), v = 1 << y, g = s[y];
      g === -1 ? (!(v & u) || v & c) && (s[y] = mo(v, n)) : g <= n && (l.expiredLanes |= v), r &= ~v;
    }
    if (n = Ge, u = Ae, u = nn(
      l,
      l === n ? u : 0
    ), c = l.callbackNode, u === 0 || l === n && Le === 2 || l.cancelPendingCommit !== null)
      return c !== null && c !== null && Vu(c), l.callbackNode = null, l.callbackPriority = 0;
    if (!(u & 3) || qa(l, u)) {
      if (n = u & -u, n === l.callbackPriority) return n;
      switch (c !== null && Vu(c), vo(u)) {
        case 2:
        case 8:
          u = Xu;
          break;
        case 32:
          u = Yi;
          break;
        case 268435456:
          u = Jm;
          break;
        default:
          u = Yi;
      }
      return c = Zy.bind(null, l), u = qi(u, c), l.callbackPriority = n, l.callbackNode = u, n;
    }
    return c !== null && c !== null && Vu(c), l.callbackPriority = 2, l.callbackNode = null, 2;
  }
  function Zy(l, n) {
    var u = l.callbackNode;
    if (Rc() && l.callbackNode !== u)
      return null;
    var c = Ae;
    return c = nn(
      l,
      l === Ge ? c : 0
    ), c === 0 ? null : (Cy(l, c, n), ms(l, Yl()), l.callbackNode != null && l.callbackNode === u ? Zy.bind(null, l) : null);
  }
  function jf(l, n) {
    if (Rc()) return null;
    Cy(l, n, !0);
  }
  function _y(l) {
    Pv(function() {
      et & 6 ? qi(Km, l) : l();
    });
  }
  function Lf() {
    return yi === 0 && (yi = Gi()), yi;
  }
  function wy(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : fr("" + l);
  }
  function gt(l, n) {
    var u = n.ownerDocument.createElement("input");
    return u.name = n.name, u.value = n.value, l.id && u.setAttribute("form", l.id), n.parentNode.insertBefore(u, n), l = new FormData(l), u.parentNode.removeChild(u), l;
  }
  function Ky(l, n, u, c, s) {
    if (n === "submit" && u && u.stateNode === s) {
      var r = wy(
        (s[Gl] || null).action
      ), y = c.submitter;
      y && (n = (n = y[Gl] || null) ? wy(n.formAction) : y.getAttribute("formAction"), n !== null && (r = n, y = null));
      var v = new dr(
        "action",
        "action",
        null,
        c,
        s
      );
      l.push({
        event: v,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (c.defaultPrevented) {
                if (yi !== 0) {
                  var g = y ? gt(s, y) : new FormData(s);
                  mu(
                    u,
                    {
                      pending: !0,
                      data: g,
                      method: s.method,
                      action: r
                    },
                    null,
                    g
                  );
                }
              } else
                typeof r == "function" && (v.preventDefault(), g = y ? gt(s, y) : new FormData(s), mu(
                  u,
                  {
                    pending: !0,
                    data: g,
                    method: s.method,
                    action: r
                  },
                  r,
                  g
                ));
            },
            currentTarget: s
          }
        ]
      });
    }
  }
  for (var Jy = 0; Jy < st.length; Jy++) {
    var ky = st[Jy], mi = ky.toLowerCase(), Zf = ky[0].toUpperCase() + ky.slice(1);
    la(
      mi,
      "on" + Zf
    );
  }
  la(v0, "onAnimationEnd"), la(zr, "onAnimationIteration"), la(Co, "onAnimationStart"), la("dblclick", "onDoubleClick"), la("focusin", "onFocus"), la("focusout", "onBlur"), la(p0, "onTransitionRun"), la(ve, "onTransitionStart"), la(Q, "onTransitionCancel"), la(Ii, "onTransitionEnd"), Qi("onMouseEnter", ["mouseout", "mouseover"]), Qi("onMouseLeave", ["mouseout", "mouseover"]), Qi("onPointerEnter", ["pointerout", "pointerover"]), Qi("onPointerLeave", ["pointerout", "pointerover"]), Qu(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Qu(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Qu("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Qu(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Qu(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Qu(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var xn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), zd = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(xn)
  );
  function Ad(l, n) {
    n = (n & 4) !== 0;
    for (var u = 0; u < l.length; u++) {
      var c = l[u], s = c.event;
      c = c.listeners;
      e: {
        var r = void 0;
        if (n)
          for (var y = c.length - 1; 0 <= y; y--) {
            var v = c[y], g = v.instance, z = v.currentTarget;
            if (v = v.listener, g !== r && s.isPropagationStopped())
              break e;
            r = v, s.currentTarget = z;
            try {
              r(s);
            } catch (Y) {
              Io(Y);
            }
            s.currentTarget = null, r = g;
          }
        else
          for (y = 0; y < c.length; y++) {
            if (v = c[y], g = v.instance, z = v.currentTarget, v = v.listener, g !== r && s.isPropagationStopped())
              break e;
            r = v, s.currentTarget = z;
            try {
              r(s);
            } catch (Y) {
              Io(Y);
            }
            s.currentTarget = null, r = g;
          }
      }
    }
  }
  function ze(l, n) {
    var u = n[tr];
    u === void 0 && (u = n[tr] = /* @__PURE__ */ new Set());
    var c = l + "__bubble";
    u.has(c) || (Dd(n, l, 2, !1), u.add(c));
  }
  function vs(l, n, u) {
    var c = 0;
    n && (c |= 4), Dd(
      u,
      l,
      c,
      n
    );
  }
  var da = "_reactListening" + Math.random().toString(36).slice(2);
  function Oc(l) {
    if (!l[da]) {
      l[da] = !0, mh.forEach(function(u) {
        u !== "selectionchange" && (zd.has(u) || vs(u, !1, l), vs(u, !0, l));
      });
      var n = l.nodeType === 9 ? l : l.ownerDocument;
      n === null || n[da] || (n[da] = !0, vs("selectionchange", !1, n));
    }
  }
  function Dd(l, n, u, c) {
    switch (F0(n)) {
      case 2:
        var s = $0;
        break;
      case 8:
        s = W0;
        break;
      default:
        s = Bd;
    }
    u = s.bind(
      null,
      n,
      u,
      l
    ), s = void 0, !Pc || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (s = !0), c ? s !== void 0 ? l.addEventListener(n, u, {
      capture: !0,
      passive: s
    }) : l.addEventListener(n, u, !0) : s !== void 0 ? l.addEventListener(n, u, {
      passive: s
    }) : l.addEventListener(n, u, !1);
  }
  function ps(l, n, u, c, s) {
    var r = c;
    if (!(n & 1) && !(n & 2) && c !== null)
      e: for (; ; ) {
        if (c === null) return;
        var y = c.tag;
        if (y === 3 || y === 4) {
          var v = c.stateNode.containerInfo;
          if (v === s || v.nodeType === 8 && v.parentNode === s)
            break;
          if (y === 4)
            for (y = c.return; y !== null; ) {
              var g = y.tag;
              if ((g === 3 || g === 4) && (g = y.stateNode.containerInfo, g === s || g.nodeType === 8 && g.parentNode === s))
                return;
              y = y.return;
            }
          for (; v !== null; ) {
            if (y = Pn(v), y === null) return;
            if (g = y.tag, g === 5 || g === 6 || g === 26 || g === 27) {
              c = r = y;
              continue e;
            }
            v = v.parentNode;
          }
        }
        c = c.return;
      }
    Fc(function() {
      var z = r, Y = Dh(u), X = [];
      e: {
        var O = xo.get(l);
        if (O !== void 0) {
          var B = dr, J = l;
          switch (l) {
            case "keypress":
              if (bo(u) === 0) break e;
            case "keydown":
            case "keyup":
              B = vr;
              break;
            case "focusin":
              J = "focus", B = Mh;
              break;
            case "focusout":
              J = "blur", B = Mh;
              break;
            case "beforeblur":
            case "afterblur":
              B = Mh;
              break;
            case "click":
              if (u.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              B = t0;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              B = Zv;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              B = pr;
              break;
            case v0:
            case zr:
            case Co:
              B = l0;
              break;
            case Ii:
              B = Uh;
              break;
            case "scroll":
            case "scrollend":
              B = jv;
              break;
            case "wheel":
              B = o0;
              break;
            case "copy":
            case "cut":
            case "paste":
              B = n0;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              B = It;
              break;
            case "toggle":
            case "beforetoggle":
              B = tu;
          }
          var ue = (n & 4) !== 0, $e = !ue && (l === "scroll" || l === "scrollend"), A = ue ? O !== null ? O + "Capture" : null : O;
          ue = [];
          for (var E = z, D; E !== null; ) {
            var V = E;
            if (D = V.stateNode, V = V.tag, V !== 5 && V !== 26 && V !== 27 || D === null || A === null || (V = Ic(E, A), V != null && ue.push(
              vi(E, V, D)
            )), $e) break;
            E = E.return;
          }
          0 < ue.length && (O = new B(
            O,
            J,
            null,
            u,
            Y
          ), X.push({ event: O, listeners: ue }));
        }
      }
      if (!(n & 7)) {
        e: {
          if (O = l === "mouseover" || l === "pointerover", B = l === "mouseout" || l === "pointerout", O && u !== Ah && (J = u.relatedTarget || u.fromElement) && (Pn(J) || J[In]))
            break e;
          if ((B || O) && (O = Y.window === Y ? Y : (O = Y.ownerDocument) ? O.defaultView || O.parentWindow : window, B ? (J = u.relatedTarget || u.toElement, B = z, J = J ? Pn(J) : null, J !== null && ($e = L(J), ue = J.tag, J !== $e || ue !== 5 && ue !== 27 && ue !== 6) && (J = null)) : (B = null, J = z), B !== J)) {
            if (ue = t0, V = "onMouseLeave", A = "onMouseEnter", E = "mouse", (l === "pointerout" || l === "pointerover") && (ue = It, V = "onPointerLeave", A = "onPointerEnter", E = "pointer"), $e = B == null ? O : Jc(B), D = J == null ? O : Jc(J), O = new ue(
              V,
              E + "leave",
              B,
              u,
              Y
            ), O.target = $e, O.relatedTarget = D, V = null, Pn(Y) === z && (ue = new ue(
              A,
              E + "enter",
              J,
              u,
              Y
            ), ue.target = D, ue.relatedTarget = $e, V = ue), $e = V, B && J)
              t: {
                for (ue = B, A = J, E = 0, D = ue; D; D = Uc(D))
                  E++;
                for (D = 0, V = A; V; V = Uc(V))
                  D++;
                for (; 0 < E - D; )
                  ue = Uc(ue), E--;
                for (; 0 < D - E; )
                  A = Uc(A), D--;
                for (; E--; ) {
                  if (ue === A || A !== null && ue === A.alternate)
                    break t;
                  ue = Uc(ue), A = Uc(A);
                }
                ue = null;
              }
            else ue = null;
            B !== null && L0(
              X,
              O,
              B,
              ue,
              !1
            ), J !== null && $e !== null && L0(
              X,
              $e,
              J,
              ue,
              !0
            );
          }
        }
        e: {
          if (O = z ? Jc(z) : window, B = O.nodeName && O.nodeName.toLowerCase(), B === "select" || B === "input" && O.type === "file")
            var k = af;
          else if (wu(O))
            if (nf)
              k = Pt;
            else {
              k = h0;
              var de = d0;
            }
          else
            B = O.nodeName, !B || B.toLowerCase() !== "input" || O.type !== "checkbox" && O.type !== "radio" ? z && Zi(z.elementType) && (k = af) : k = y0;
          if (k && (k = k(l, z))) {
            Ku(
              X,
              k,
              u,
              Y
            );
            break e;
          }
          de && de(l, O, z), l === "focusout" && z && O.type === "number" && z.memoizedProps.value != null && Th(O, "number", O.value);
        }
        switch (de = z ? Jc(z) : window, l) {
          case "focusin":
            (wu(de) || de.contentEditable === "true") && (ta = de, Er = z, za = null);
            break;
          case "focusout":
            za = Er = ta = null;
            break;
          case "mousedown":
            Xa = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Xa = !1, Ho(X, u, Y);
            break;
          case "selectionchange":
            if (Xh) break;
          case "keydown":
          case "keyup":
            Ho(X, u, Y);
        }
        var I;
        if (Ji)
          e: {
            switch (l) {
              case "compositionstart":
                var ee = "onCompositionStart";
                break e;
              case "compositionend":
                ee = "onCompositionEnd";
                break e;
              case "compositionupdate":
                ee = "onCompositionUpdate";
                break e;
            }
            ee = void 0;
          }
        else
          Ea ? Ao(l, u) && (ee = "onCompositionEnd") : l === "keydown" && u.keyCode === 229 && (ee = "onCompositionStart");
        ee && (xh && u.locale !== "ko" && (Ea || ee !== "onCompositionStart" ? ee === "onCompositionEnd" && Ea && (I = rr()) : (eu = Y, fl = "value" in eu ? eu.value : eu.textContent, Ea = !0)), de = yl(z, ee), 0 < de.length && (ee = new yr(
          ee,
          l,
          null,
          u,
          Y
        ), X.push({ event: ee, listeners: de }), I ? ee.data = I : (I = Xl(u), I !== null && (ee.data = I)))), (I = Ch ? s0(l, u) : Bh(l, u)) && (ee = yl(z, "onBeforeInput"), 0 < ee.length && (de = new yr(
          "onBeforeInput",
          "beforeinput",
          null,
          u,
          Y
        ), X.push({
          event: de,
          listeners: ee
        }), de.data = I)), Ky(
          X,
          l,
          z,
          u,
          Y
        );
      }
      Ad(X, n);
    });
  }
  function vi(l, n, u) {
    return {
      instance: l,
      listener: n,
      currentTarget: u
    };
  }
  function yl(l, n) {
    for (var u = n + "Capture", c = []; l !== null; ) {
      var s = l, r = s.stateNode;
      s = s.tag, s !== 5 && s !== 26 && s !== 27 || r === null || (s = Ic(l, u), s != null && c.unshift(
        vi(l, s, r)
      ), s = Ic(l, n), s != null && c.push(
        vi(l, s, r)
      )), l = l.return;
    }
    return c;
  }
  function Uc(l) {
    if (l === null) return null;
    do
      l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function L0(l, n, u, c, s) {
    for (var r = n._reactName, y = []; u !== null && u !== c; ) {
      var v = u, g = v.alternate, z = v.stateNode;
      if (v = v.tag, g !== null && g === c) break;
      v !== 5 && v !== 26 && v !== 27 || z === null || (g = z, s ? (z = Ic(u, r), z != null && y.unshift(
        vi(u, z, g)
      )) : s || (z = Ic(u, r), z != null && y.push(
        vi(u, z, g)
      ))), u = u.return;
    }
    y.length !== 0 && l.push({ event: n, listeners: y });
  }
  var Z0 = /\r\n?/g, Iv = /\u0000|\uFFFD/g;
  function U(l) {
    return (typeof l == "string" ? l : "" + l).replace(Z0, `
`).replace(Iv, "");
  }
  function se(l, n) {
    return n = U(n), U(l) === n;
  }
  function pi() {
  }
  function qe(l, n, u, c, s, r) {
    switch (u) {
      case "children":
        typeof c == "string" ? n === "body" || n === "textarea" && c === "" || cn(l, c) : (typeof c == "number" || typeof c == "bigint") && n !== "body" && cn(l, "" + c);
        break;
      case "className":
        $c(l, "class", c);
        break;
      case "tabIndex":
        $c(l, "tabindex", c);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        $c(l, u, c);
        break;
      case "style":
        zh(l, c, r);
        break;
      case "data":
        if (n !== "object") {
          $c(l, "data", c);
          break;
        }
      case "src":
      case "href":
        if (c === "" && (n !== "a" || u !== "href")) {
          l.removeAttribute(u);
          break;
        }
        if (c == null || typeof c == "function" || typeof c == "symbol" || typeof c == "boolean") {
          l.removeAttribute(u);
          break;
        }
        c = fr("" + c), l.setAttribute(u, c);
        break;
      case "action":
      case "formAction":
        if (typeof c == "function") {
          l.setAttribute(
            u,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof r == "function" && (u === "formAction" ? (n !== "input" && qe(l, n, "name", s.name, s, null), qe(
            l,
            n,
            "formEncType",
            s.formEncType,
            s,
            null
          ), qe(
            l,
            n,
            "formMethod",
            s.formMethod,
            s,
            null
          ), qe(
            l,
            n,
            "formTarget",
            s.formTarget,
            s,
            null
          )) : (qe(l, n, "encType", s.encType, s, null), qe(l, n, "method", s.method, s, null), qe(l, n, "target", s.target, s, null)));
        if (c == null || typeof c == "symbol" || typeof c == "boolean") {
          l.removeAttribute(u);
          break;
        }
        c = fr("" + c), l.setAttribute(u, c);
        break;
      case "onClick":
        c != null && (l.onclick = pi);
        break;
      case "onScroll":
        c != null && ze("scroll", l);
        break;
      case "onScrollEnd":
        c != null && ze("scrollend", l);
        break;
      case "dangerouslySetInnerHTML":
        if (c != null) {
          if (typeof c != "object" || !("__html" in c))
            throw Error(x(61));
          if (u = c.__html, u != null) {
            if (s.children != null) throw Error(x(60));
            l.innerHTML = u;
          }
        }
        break;
      case "multiple":
        l.multiple = c && typeof c != "function" && typeof c != "symbol";
        break;
      case "muted":
        l.muted = c && typeof c != "function" && typeof c != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (c == null || typeof c == "function" || typeof c == "boolean" || typeof c == "symbol") {
          l.removeAttribute("xlink:href");
          break;
        }
        u = fr("" + c), l.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          u
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        c != null && typeof c != "function" && typeof c != "symbol" ? l.setAttribute(u, "" + c) : l.removeAttribute(u);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        c && typeof c != "function" && typeof c != "symbol" ? l.setAttribute(u, "") : l.removeAttribute(u);
        break;
      case "capture":
      case "download":
        c === !0 ? l.setAttribute(u, "") : c !== !1 && c != null && typeof c != "function" && typeof c != "symbol" ? l.setAttribute(u, c) : l.removeAttribute(u);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        c != null && typeof c != "function" && typeof c != "symbol" && !isNaN(c) && 1 <= c ? l.setAttribute(u, c) : l.removeAttribute(u);
        break;
      case "rowSpan":
      case "start":
        c == null || typeof c == "function" || typeof c == "symbol" || isNaN(c) ? l.removeAttribute(u) : l.setAttribute(u, c);
        break;
      case "popover":
        ze("beforetoggle", l), ze("toggle", l), ji(l, "popover", c);
        break;
      case "xlinkActuate":
        Il(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          c
        );
        break;
      case "xlinkArcrole":
        Il(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          c
        );
        break;
      case "xlinkRole":
        Il(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          c
        );
        break;
      case "xlinkShow":
        Il(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          c
        );
        break;
      case "xlinkTitle":
        Il(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          c
        );
        break;
      case "xlinkType":
        Il(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          c
        );
        break;
      case "xmlBase":
        Il(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          c
        );
        break;
      case "xmlLang":
        Il(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          c
        );
        break;
      case "xmlSpace":
        Il(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          c
        );
        break;
      case "is":
        ji(l, "is", c);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < u.length) || u[0] !== "o" && u[0] !== "O" || u[1] !== "n" && u[1] !== "N") && (u = Pm.get(u) || u, ji(l, u, c));
    }
  }
  function Rd(l, n, u, c, s, r) {
    switch (u) {
      case "style":
        zh(l, c, r);
        break;
      case "dangerouslySetInnerHTML":
        if (c != null) {
          if (typeof c != "object" || !("__html" in c))
            throw Error(x(61));
          if (u = c.__html, u != null) {
            if (s.children != null) throw Error(x(60));
            l.innerHTML = u;
          }
        }
        break;
      case "children":
        typeof c == "string" ? cn(l, c) : (typeof c == "number" || typeof c == "bigint") && cn(l, "" + c);
        break;
      case "onScroll":
        c != null && ze("scroll", l);
        break;
      case "onScrollEnd":
        c != null && ze("scrollend", l);
        break;
      case "onClick":
        c != null && (l.onclick = pi);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!vh.hasOwnProperty(u))
          e: {
            if (u[0] === "o" && u[1] === "n" && (s = u.endsWith("Capture"), n = u.slice(2, s ? u.length - 7 : void 0), r = l[Gl] || null, r = r != null ? r[u] : null, typeof r == "function" && l.removeEventListener(n, r, s), typeof c == "function")) {
              typeof r != "function" && r !== null && (u in l ? l[u] = null : l.hasAttribute(u) && l.removeAttribute(u)), l.addEventListener(n, c, s);
              break e;
            }
            u in l ? l[u] = c : c === !0 ? l.setAttribute(u, "") : ji(l, u, c);
          }
    }
  }
  function Zt(l, n, u) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        ze("error", l), ze("load", l);
        var c = !1, s = !1, r;
        for (r in u)
          if (u.hasOwnProperty(r)) {
            var y = u[r];
            if (y != null)
              switch (r) {
                case "src":
                  c = !0;
                  break;
                case "srcSet":
                  s = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(x(137, n));
                default:
                  qe(l, n, r, y, u, null);
              }
          }
        s && qe(l, n, "srcSet", u.srcSet, u, null), c && qe(l, n, "src", u.src, u, null);
        return;
      case "input":
        ze("invalid", l);
        var v = r = y = s = null, g = null, z = null;
        for (c in u)
          if (u.hasOwnProperty(c)) {
            var Y = u[c];
            if (Y != null)
              switch (c) {
                case "name":
                  s = Y;
                  break;
                case "type":
                  y = Y;
                  break;
                case "checked":
                  g = Y;
                  break;
                case "defaultChecked":
                  z = Y;
                  break;
                case "value":
                  r = Y;
                  break;
                case "defaultValue":
                  v = Y;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (Y != null)
                    throw Error(x(137, n));
                  break;
                default:
                  qe(l, n, c, Y, u, null);
              }
          }
        bh(
          l,
          r,
          v,
          g,
          z,
          y,
          s,
          !1
        ), ur(l);
        return;
      case "select":
        ze("invalid", l), c = y = r = null;
        for (s in u)
          if (u.hasOwnProperty(s) && (v = u[s], v != null))
            switch (s) {
              case "value":
                r = v;
                break;
              case "defaultValue":
                y = v;
                break;
              case "multiple":
                c = v;
              default:
                qe(l, n, s, v, u, null);
            }
        n = r, u = y, l.multiple = !!c, n != null ? Li(l, !!c, n, !1) : u != null && Li(l, !!c, u, !0);
        return;
      case "textarea":
        ze("invalid", l), r = s = c = null;
        for (y in u)
          if (u.hasOwnProperty(y) && (v = u[y], v != null))
            switch (y) {
              case "value":
                c = v;
                break;
              case "defaultValue":
                s = v;
                break;
              case "children":
                r = v;
                break;
              case "dangerouslySetInnerHTML":
                if (v != null) throw Error(x(91));
                break;
              default:
                qe(l, n, y, v, u, null);
            }
        So(l, c, s, r), ur(l);
        return;
      case "option":
        for (g in u)
          if (u.hasOwnProperty(g) && (c = u[g], c != null))
            switch (g) {
              case "selected":
                l.selected = c && typeof c != "function" && typeof c != "symbol";
                break;
              default:
                qe(l, n, g, c, u, null);
            }
        return;
      case "dialog":
        ze("cancel", l), ze("close", l);
        break;
      case "iframe":
      case "object":
        ze("load", l);
        break;
      case "video":
      case "audio":
        for (c = 0; c < xn.length; c++)
          ze(xn[c], l);
        break;
      case "image":
        ze("error", l), ze("load", l);
        break;
      case "details":
        ze("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        ze("error", l), ze("load", l);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (z in u)
          if (u.hasOwnProperty(z) && (c = u[z], c != null))
            switch (z) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(x(137, n));
              default:
                qe(l, n, z, c, u, null);
            }
        return;
      default:
        if (Zi(n)) {
          for (Y in u)
            u.hasOwnProperty(Y) && (c = u[Y], c !== void 0 && Rd(
              l,
              n,
              Y,
              c,
              u,
              void 0
            ));
          return;
        }
    }
    for (v in u)
      u.hasOwnProperty(v) && (c = u[v], c != null && qe(l, n, v, c, u, null));
  }
  function _0(l, n, u, c) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var s = null, r = null, y = null, v = null, g = null, z = null, Y = null;
        for (B in u) {
          var X = u[B];
          if (u.hasOwnProperty(B) && X != null)
            switch (B) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                g = X;
              default:
                c.hasOwnProperty(B) || qe(l, n, B, null, c, X);
            }
        }
        for (var O in c) {
          var B = c[O];
          if (X = u[O], c.hasOwnProperty(O) && (B != null || X != null))
            switch (O) {
              case "type":
                r = B;
                break;
              case "name":
                s = B;
                break;
              case "checked":
                z = B;
                break;
              case "defaultChecked":
                Y = B;
                break;
              case "value":
                y = B;
                break;
              case "defaultValue":
                v = B;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (B != null)
                  throw Error(x(137, n));
                break;
              default:
                B !== X && qe(
                  l,
                  n,
                  O,
                  B,
                  c,
                  X
                );
            }
        }
        ir(
          l,
          y,
          v,
          g,
          z,
          Y,
          r,
          s
        );
        return;
      case "select":
        B = y = v = O = null;
        for (r in u)
          if (g = u[r], u.hasOwnProperty(r) && g != null)
            switch (r) {
              case "value":
                break;
              case "multiple":
                B = g;
              default:
                c.hasOwnProperty(r) || qe(
                  l,
                  n,
                  r,
                  null,
                  c,
                  g
                );
            }
        for (s in c)
          if (r = c[s], g = u[s], c.hasOwnProperty(s) && (r != null || g != null))
            switch (s) {
              case "value":
                O = r;
                break;
              case "defaultValue":
                v = r;
                break;
              case "multiple":
                y = r;
              default:
                r !== g && qe(
                  l,
                  n,
                  s,
                  r,
                  c,
                  g
                );
            }
        n = v, u = y, c = B, O != null ? Li(l, !!u, O, !1) : !!c != !!u && (n != null ? Li(l, !!u, n, !0) : Li(l, !!u, u ? [] : "", !1));
        return;
      case "textarea":
        B = O = null;
        for (v in u)
          if (s = u[v], u.hasOwnProperty(v) && s != null && !c.hasOwnProperty(v))
            switch (v) {
              case "value":
                break;
              case "children":
                break;
              default:
                qe(l, n, v, null, c, s);
            }
        for (y in c)
          if (s = c[y], r = u[y], c.hasOwnProperty(y) && (s != null || r != null))
            switch (y) {
              case "value":
                O = s;
                break;
              case "defaultValue":
                B = s;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (s != null) throw Error(x(91));
                break;
              default:
                s !== r && qe(l, n, y, s, c, r);
            }
        cr(l, O, B);
        return;
      case "option":
        for (var J in u)
          if (O = u[J], u.hasOwnProperty(J) && O != null && !c.hasOwnProperty(J))
            switch (J) {
              case "selected":
                l.selected = !1;
                break;
              default:
                qe(
                  l,
                  n,
                  J,
                  null,
                  c,
                  O
                );
            }
        for (g in c)
          if (O = c[g], B = u[g], c.hasOwnProperty(g) && O !== B && (O != null || B != null))
            switch (g) {
              case "selected":
                l.selected = O && typeof O != "function" && typeof O != "symbol";
                break;
              default:
                qe(
                  l,
                  n,
                  g,
                  O,
                  c,
                  B
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var ue in u)
          O = u[ue], u.hasOwnProperty(ue) && O != null && !c.hasOwnProperty(ue) && qe(l, n, ue, null, c, O);
        for (z in c)
          if (O = c[z], B = u[z], c.hasOwnProperty(z) && O !== B && (O != null || B != null))
            switch (z) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (O != null)
                  throw Error(x(137, n));
                break;
              default:
                qe(
                  l,
                  n,
                  z,
                  O,
                  c,
                  B
                );
            }
        return;
      default:
        if (Zi(n)) {
          for (var $e in u)
            O = u[$e], u.hasOwnProperty($e) && O !== void 0 && !c.hasOwnProperty($e) && Rd(
              l,
              n,
              $e,
              void 0,
              c,
              O
            );
          for (Y in c)
            O = c[Y], B = u[Y], !c.hasOwnProperty(Y) || O === B || O === void 0 && B === void 0 || Rd(
              l,
              n,
              Y,
              O,
              c,
              B
            );
          return;
        }
    }
    for (var A in u)
      O = u[A], u.hasOwnProperty(A) && O != null && !c.hasOwnProperty(A) && qe(l, n, A, null, c, O);
    for (X in c)
      O = c[X], B = u[X], !c.hasOwnProperty(X) || O === B || O == null && B == null || qe(l, n, X, O, c, B);
  }
  var Md = null, Od = null;
  function gs(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function Ud(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function $y(l, n) {
    if (l === 0)
      switch (n) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return l === 1 && n === "foreignObject" ? 0 : l;
  }
  function Ss(l, n) {
    return l === "textarea" || l === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var bs = null;
  function ml() {
    var l = window.event;
    return l && l.type === "popstate" ? l === bs ? !1 : (bs = l, !0) : (bs = null, !1);
  }
  var ha = typeof setTimeout == "function" ? setTimeout : void 0, ll = typeof clearTimeout == "function" ? clearTimeout : void 0, Ze = typeof Promise == "function" ? Promise : void 0, Pv = typeof queueMicrotask == "function" ? queueMicrotask : typeof Ze < "u" ? function(l) {
    return Ze.resolve(null).then(l).catch(Wy);
  } : ha;
  function Wy(l) {
    setTimeout(function() {
      throw l;
    });
  }
  function Ts(l, n) {
    var u = n, c = 0;
    do {
      var s = u.nextSibling;
      if (l.removeChild(u), s && s.nodeType === 8)
        if (u = s.data, u === "/$") {
          if (c === 0) {
            l.removeChild(s), Wf(n);
            return;
          }
          c--;
        } else u !== "$" && u !== "$?" && u !== "$!" || c++;
      u = s;
    } while (u);
    Wf(n);
  }
  function Wa(l) {
    var n = l.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var u = n;
      switch (n = n.nextSibling, u.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Wa(u), ar(u);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (u.rel.toLowerCase() === "stylesheet") continue;
      }
      l.removeChild(u);
    }
  }
  function gi(l, n, u, c) {
    for (; l.nodeType === 1; ) {
      var s = u;
      if (l.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!c && (l.nodeName !== "INPUT" || l.type !== "hidden"))
          break;
      } else if (c) {
        if (!l[Vi])
          switch (n) {
            case "meta":
              if (!l.hasAttribute("itemprop")) break;
              return l;
            case "link":
              if (r = l.getAttribute("rel"), r === "stylesheet" && l.hasAttribute("data-precedence"))
                break;
              if (r !== s.rel || l.getAttribute("href") !== (s.href == null ? null : s.href) || l.getAttribute("crossorigin") !== (s.crossOrigin == null ? null : s.crossOrigin) || l.getAttribute("title") !== (s.title == null ? null : s.title))
                break;
              return l;
            case "style":
              if (l.hasAttribute("data-precedence")) break;
              return l;
            case "script":
              if (r = l.getAttribute("src"), (r !== (s.src == null ? null : s.src) || l.getAttribute("type") !== (s.type == null ? null : s.type) || l.getAttribute("crossorigin") !== (s.crossOrigin == null ? null : s.crossOrigin)) && r && l.hasAttribute("async") && !l.hasAttribute("itemprop"))
                break;
              return l;
            default:
              return l;
          }
      } else if (n === "input" && l.type === "hidden") {
        var r = s.name == null ? null : "" + s.name;
        if (s.type === "hidden" && l.getAttribute("name") === r)
          return l;
      } else return l;
      if (l = _t(l.nextSibling), l === null) break;
    }
    return null;
  }
  function Es(l, n, u) {
    if (n === "") return null;
    for (; l.nodeType !== 3; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !u || (l = _t(l.nextSibling), l === null)) return null;
    return l;
  }
  function _t(l) {
    for (; l != null; l = l.nextSibling) {
      var n = l.nodeType;
      if (n === 1 || n === 3) break;
      if (n === 8) {
        if (n = l.data, n === "$" || n === "$!" || n === "$?" || n === "F!" || n === "F")
          break;
        if (n === "/$") return null;
      }
    }
    return l;
  }
  function zs(l) {
    l = l.previousSibling;
    for (var n = 0; l; ) {
      if (l.nodeType === 8) {
        var u = l.data;
        if (u === "$" || u === "$!" || u === "$?") {
          if (n === 0) return l;
          n--;
        } else u === "/$" && n++;
      }
      l = l.previousSibling;
    }
    return null;
  }
  function Bn(l, n, u) {
    switch (n = gs(u), l) {
      case "html":
        if (l = n.documentElement, !l) throw Error(x(452));
        return l;
      case "head":
        if (l = n.head, !l) throw Error(x(453));
        return l;
      case "body":
        if (l = n.body, !l) throw Error(x(454));
        return l;
      default:
        throw Error(x(451));
    }
  }
  var _l = /* @__PURE__ */ new Map(), w0 = /* @__PURE__ */ new Set();
  function Hd(l) {
    return typeof l.getRootNode == "function" ? l.getRootNode() : l.ownerDocument;
  }
  var Ou = ie.d;
  ie.d = {
    f: qn,
    r: ep,
    D: _f,
    C: tp,
    L: Fy,
    m: lp,
    X: wf,
    S: ap,
    M: vl
  };
  function qn() {
    var l = Ou.f(), n = Dc();
    return l || n;
  }
  function ep(l) {
    var n = Xi(l);
    n !== null && n.tag === 5 && n.type === "form" ? uy(n) : Ou.r(l);
  }
  var Si = typeof document > "u" ? null : document;
  function Cd(l, n, u) {
    var c = Si;
    if (c && typeof n == "string" && n) {
      var s = Pl(n);
      s = 'link[rel="' + l + '"][href="' + s + '"]', typeof u == "string" && (s += '[crossorigin="' + u + '"]'), w0.has(s) || (w0.add(s), l = { rel: l, crossOrigin: u, href: n }, c.querySelector(s) === null && (n = c.createElement("link"), Zt(n, "link", l), Mt(n), c.head.appendChild(n)));
    }
  }
  function _f(l) {
    Ou.D(l), Cd("dns-prefetch", l, null);
  }
  function tp(l, n) {
    Ou.C(l, n), Cd("preconnect", l, n);
  }
  function Fy(l, n, u) {
    Ou.L(l, n, u);
    var c = Si;
    if (c && l && n) {
      var s = 'link[rel="preload"][as="' + Pl(n) + '"]';
      n === "image" && u && u.imageSrcSet ? (s += '[imagesrcset="' + Pl(
        u.imageSrcSet
      ) + '"]', typeof u.imageSizes == "string" && (s += '[imagesizes="' + Pl(
        u.imageSizes
      ) + '"]')) : s += '[href="' + Pl(l) + '"]';
      var r = s;
      switch (n) {
        case "style":
          r = Al(l);
          break;
        case "script":
          r = Kf(l);
      }
      _l.has(r) || (l = Ee(
        {
          rel: "preload",
          href: n === "image" && u && u.imageSrcSet ? void 0 : l,
          as: n
        },
        u
      ), _l.set(r, l), c.querySelector(s) !== null || n === "style" && c.querySelector(Dl(r)) || n === "script" && c.querySelector(bi(r)) || (n = c.createElement("link"), Zt(n, "link", l), Mt(n), c.head.appendChild(n)));
    }
  }
  function lp(l, n) {
    Ou.m(l, n);
    var u = Si;
    if (u && l) {
      var c = n && typeof n.as == "string" ? n.as : "script", s = 'link[rel="modulepreload"][as="' + Pl(c) + '"][href="' + Pl(l) + '"]', r = s;
      switch (c) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          r = Kf(l);
      }
      if (!_l.has(r) && (l = Ee({ rel: "modulepreload", href: l }, n), _l.set(r, l), u.querySelector(s) === null)) {
        switch (c) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (u.querySelector(bi(r)))
              return;
        }
        c = u.createElement("link"), Zt(c, "link", l), Mt(c), u.head.appendChild(c);
      }
    }
  }
  function ap(l, n, u) {
    Ou.S(l, n, u);
    var c = Si;
    if (c && l) {
      var s = Ya(c).hoistableStyles, r = Al(l);
      n = n || "default";
      var y = s.get(r);
      if (!y) {
        var v = { loading: 0, preload: null };
        if (y = c.querySelector(
          Dl(r)
        ))
          v.loading = 5;
        else {
          l = Ee(
            { rel: "stylesheet", href: l, "data-precedence": n },
            u
          ), (u = _l.get(r)) && Ua(l, u);
          var g = y = c.createElement("link");
          Mt(g), Zt(g, "link", l), g._p = new Promise(function(z, Y) {
            g.onload = z, g.onerror = Y;
          }), g.addEventListener("load", function() {
            v.loading |= 1;
          }), g.addEventListener("error", function() {
            v.loading |= 2;
          }), v.loading |= 4, ya(y, n, c);
        }
        y = {
          type: "stylesheet",
          instance: y,
          count: 1,
          state: v
        }, s.set(r, y);
      }
    }
  }
  function wf(l, n) {
    Ou.X(l, n);
    var u = Si;
    if (u && l) {
      var c = Ya(u).hoistableScripts, s = Kf(l), r = c.get(s);
      r || (r = u.querySelector(bi(s)), r || (l = Ee({ src: l, async: !0 }, n), (n = _l.get(s)) && Fa(l, n), r = u.createElement("script"), Mt(r), Zt(r, "link", l), u.head.appendChild(r)), r = {
        type: "script",
        instance: r,
        count: 1,
        state: null
      }, c.set(s, r));
    }
  }
  function vl(l, n) {
    Ou.M(l, n);
    var u = Si;
    if (u && l) {
      var c = Ya(u).hoistableScripts, s = Kf(l), r = c.get(s);
      r || (r = u.querySelector(bi(s)), r || (l = Ee({ src: l, async: !0, type: "module" }, n), (n = _l.get(s)) && Fa(l, n), r = u.createElement("script"), Mt(r), Zt(r, "link", l), u.head.appendChild(r)), r = {
        type: "script",
        instance: r,
        count: 1,
        state: null
      }, c.set(s, r));
    }
  }
  function K(l, n, u, c) {
    var s = (s = an.current) ? Hd(s) : null;
    if (!s) throw Error(x(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof u.precedence == "string" && typeof u.href == "string" ? (n = Al(u.href), u = Ya(
          s
        ).hoistableStyles, c = u.get(n), c || (c = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, u.set(n, c)), c) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (u.rel === "stylesheet" && typeof u.href == "string" && typeof u.precedence == "string") {
          l = Al(u.href);
          var r = Ya(
            s
          ).hoistableStyles, y = r.get(l);
          if (y || (s = s.ownerDocument || s, y = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, r.set(l, y), (r = s.querySelector(
            Dl(l)
          )) && !r._p && (y.instance = r, y.state.loading = 5), _l.has(l) || (u = {
            rel: "preload",
            as: "style",
            href: u.href,
            crossOrigin: u.crossOrigin,
            integrity: u.integrity,
            media: u.media,
            hrefLang: u.hrefLang,
            referrerPolicy: u.referrerPolicy
          }, _l.set(l, u), r || np(
            s,
            l,
            u,
            y.state
          ))), n && c === null)
            throw Error(x(528, ""));
          return y;
        }
        if (n && c !== null)
          throw Error(x(529, ""));
        return null;
      case "script":
        return n = u.async, u = u.src, typeof u == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = Kf(u), u = Ya(
          s
        ).hoistableScripts, c = u.get(n), c || (c = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, u.set(n, c)), c) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(x(444, l));
    }
  }
  function Al(l) {
    return 'href="' + Pl(l) + '"';
  }
  function Dl(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function pl(l) {
    return Ee({}, l, {
      "data-precedence": l.precedence,
      precedence: null
    });
  }
  function np(l, n, u, c) {
    l.querySelector('link[rel="preload"][as="style"][' + n + "]") ? c.loading = 1 : (n = l.createElement("link"), c.preload = n, n.addEventListener("load", function() {
      return c.loading |= 1;
    }), n.addEventListener("error", function() {
      return c.loading |= 2;
    }), Zt(n, "link", u), Mt(n), l.head.appendChild(n));
  }
  function Kf(l) {
    return '[src="' + Pl(l) + '"]';
  }
  function bi(l) {
    return "script[async]" + l;
  }
  function As(l, n, u) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var c = l.querySelector(
            'style[data-href~="' + Pl(u.href) + '"]'
          );
          if (c)
            return n.instance = c, Mt(c), c;
          var s = Ee({}, u, {
            "data-href": u.href,
            "data-precedence": u.precedence,
            href: null,
            precedence: null
          });
          return c = (l.ownerDocument || l).createElement(
            "style"
          ), Mt(c), Zt(c, "style", s), ya(c, u.precedence, l), n.instance = c;
        case "stylesheet":
          s = Al(u.href);
          var r = l.querySelector(
            Dl(s)
          );
          if (r)
            return n.state.loading |= 4, n.instance = r, Mt(r), r;
          c = pl(u), (s = _l.get(s)) && Ua(c, s), r = (l.ownerDocument || l).createElement("link"), Mt(r);
          var y = r;
          return y._p = new Promise(function(v, g) {
            y.onload = v, y.onerror = g;
          }), Zt(r, "link", c), n.state.loading |= 4, ya(r, u.precedence, l), n.instance = r;
        case "script":
          return r = Kf(u.src), (s = l.querySelector(
            bi(r)
          )) ? (n.instance = s, Mt(s), s) : (c = u, (s = _l.get(r)) && (c = Ee({}, u), Fa(c, s)), l = l.ownerDocument || l, s = l.createElement("script"), Mt(s), Zt(s, "link", c), l.head.appendChild(s), n.instance = s);
        case "void":
          return null;
        default:
          throw Error(x(443, n.type));
      }
    else
      n.type === "stylesheet" && !(n.state.loading & 4) && (c = n.instance, n.state.loading |= 4, ya(c, u.precedence, l));
    return n.instance;
  }
  function ya(l, n, u) {
    for (var c = u.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), s = c.length ? c[c.length - 1] : null, r = s, y = 0; y < c.length; y++) {
      var v = c[y];
      if (v.dataset.precedence === n) r = v;
      else if (r !== s) break;
    }
    r ? r.parentNode.insertBefore(l, r.nextSibling) : (n = u.nodeType === 9 ? u.head : u, n.insertBefore(l, n.firstChild));
  }
  function Ua(l, n) {
    l.crossOrigin == null && (l.crossOrigin = n.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = n.referrerPolicy), l.title == null && (l.title = n.title);
  }
  function Fa(l, n) {
    l.crossOrigin == null && (l.crossOrigin = n.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = n.referrerPolicy), l.integrity == null && (l.integrity = n.integrity);
  }
  var Hc = null;
  function Uu(l, n, u) {
    if (Hc === null) {
      var c = /* @__PURE__ */ new Map(), s = Hc = /* @__PURE__ */ new Map();
      s.set(u, c);
    } else
      s = Hc, c = s.get(u), c || (c = /* @__PURE__ */ new Map(), s.set(u, c));
    if (c.has(l)) return c;
    for (c.set(l, null), u = u.getElementsByTagName(l), s = 0; s < u.length; s++) {
      var r = u[s];
      if (!(r[Vi] || r[Wt] || l === "link" && r.getAttribute("rel") === "stylesheet") && r.namespaceURI !== "http://www.w3.org/2000/svg") {
        var y = r.getAttribute(n) || "";
        y = l + y;
        var v = c.get(y);
        v ? v.push(r) : c.set(y, [r]);
      }
    }
    return c;
  }
  function al(l, n, u) {
    l = l.ownerDocument || l, l.head.insertBefore(
      u,
      n === "title" ? l.querySelector("head > title") : null
    );
  }
  function wl(l, n, u) {
    if (u === 1 || n.itemProp != null) return !1;
    switch (l) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof n.precedence != "string" || typeof n.href != "string" || n.href === "")
          break;
        return !0;
      case "link":
        if (typeof n.rel != "string" || typeof n.href != "string" || n.href === "" || n.onLoad || n.onError)
          break;
        switch (n.rel) {
          case "stylesheet":
            return l = n.disabled, typeof n.precedence == "string" && l == null;
          default:
            return !0;
        }
      case "script":
        if (n.async && typeof n.async != "function" && typeof n.async != "symbol" && !n.onLoad && !n.onError && n.src && typeof n.src == "string")
          return !0;
    }
    return !1;
  }
  function Ti(l) {
    return !(l.type === "stylesheet" && !(l.state.loading & 3));
  }
  var Cc = null;
  function up() {
  }
  function ip(l, n, u) {
    if (Cc === null) throw Error(x(475));
    var c = Cc;
    if (n.type === "stylesheet" && (typeof u.media != "string" || matchMedia(u.media).matches !== !1) && !(n.state.loading & 4)) {
      if (n.instance === null) {
        var s = Al(u.href), r = l.querySelector(
          Dl(s)
        );
        if (r) {
          l = r._p, l !== null && typeof l == "object" && typeof l.then == "function" && (c.count++, c = Ei.bind(c), l.then(c, c)), n.state.loading |= 4, n.instance = r, Mt(r);
          return;
        }
        r = l.ownerDocument || l, u = pl(u), (s = _l.get(s)) && Ua(u, s), r = r.createElement("link"), Mt(r);
        var y = r;
        y._p = new Promise(function(v, g) {
          y.onload = v, y.onerror = g;
        }), Zt(r, "link", u), n.instance = r;
      }
      c.stylesheets === null && (c.stylesheets = /* @__PURE__ */ new Map()), c.stylesheets.set(n, l), (l = n.state.preload) && !(n.state.loading & 3) && (c.count++, n = Ei.bind(c), l.addEventListener("load", n), l.addEventListener("error", n));
    }
  }
  function K0() {
    if (Cc === null) throw Error(x(475));
    var l = Cc;
    return l.stylesheets && l.count === 0 && Hu(l, l.stylesheets), 0 < l.count ? function(n) {
      var u = setTimeout(function() {
        if (l.stylesheets && Hu(l, l.stylesheets), l.unsuspend) {
          var c = l.unsuspend;
          l.unsuspend = null, c();
        }
      }, 6e4);
      return l.unsuspend = n, function() {
        l.unsuspend = null, clearTimeout(u);
      };
    } : null;
  }
  function Ei() {
    if (this.count--, this.count === 0) {
      if (this.stylesheets) Hu(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        this.unsuspend = null, l();
      }
    }
  }
  var Ds = null;
  function Hu(l, n) {
    l.stylesheets = null, l.unsuspend !== null && (l.count++, Ds = /* @__PURE__ */ new Map(), n.forEach(Iy, l), Ds = null, Ei.call(l));
  }
  function Iy(l, n) {
    if (!(n.state.loading & 4)) {
      var u = Ds.get(l);
      if (u) var c = u.get(null);
      else {
        u = /* @__PURE__ */ new Map(), Ds.set(l, u);
        for (var s = l.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), r = 0; r < s.length; r++) {
          var y = s[r];
          (y.nodeName === "LINK" || y.getAttribute("media") !== "not all") && (u.set(y.dataset.precedence, y), c = y);
        }
        c && u.set(null, c);
      }
      s = n.instance, y = s.getAttribute("data-precedence"), r = u.get(y) || c, r === c && u.set(null, s), u.set(y, s), this.count++, c = Ei.bind(this), s.addEventListener("load", c), s.addEventListener("error", c), r ? r.parentNode.insertBefore(s, r.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(s, l.firstChild)), n.state.loading |= 4;
    }
  }
  var Kl = {
    $$typeof: cl,
    Provider: null,
    Consumer: null,
    _currentValue: ot,
    _currentValue2: ot,
    _threadCount: 0
  };
  function cp(l, n, u, c, s, r, y, v) {
    this.tag = 1, this.containerInfo = l, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Wn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.finishedLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Wn(0), this.hiddenUpdates = Wn(null), this.identifierPrefix = c, this.onUncaughtError = s, this.onCaughtError = r, this.onRecoverableError = y, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = v, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function J0(l, n, u, c, s, r, y, v, g, z, Y, X) {
    return l = new cp(
      l,
      n,
      u,
      y,
      v,
      g,
      z,
      X
    ), n = 1, r === !0 && (n |= 24), r = xt(3, null, null, n), l.current = r, r.stateNode = l, n = kh(), n.refCount++, l.pooledCache = n, n.refCount++, r.memoizedState = {
      element: c,
      isDehydrated: u,
      cache: n
    }, as(r), l;
  }
  function Py(l) {
    return l ? (l = sn, l) : sn;
  }
  function em(l, n, u, c, s, r) {
    s = Py(s), c.context === null ? c.context = s : c.pendingContext = s, c = bu(n), c.payload = { element: u }, r = r === void 0 ? null : r, r !== null && (c.callback = r), u = Tu(l, c, n), u !== null && (Bt(u, l, n), Uf(u, l, n));
  }
  function k0(l, n) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var u = l.retryLane;
      l.retryLane = u !== 0 && u < n ? u : n;
    }
  }
  function xd(l, n) {
    k0(l, n), (l = l.alternate) && k0(l, n);
  }
  function tm(l) {
    if (l.tag === 13) {
      var n = on(l, 67108864);
      n !== null && Bt(n, l, 67108864), xd(l, 67108864);
    }
  }
  var Rs = !0;
  function $0(l, n, u, c) {
    var s = te.T;
    te.T = null;
    var r = ie.p;
    try {
      ie.p = 2, Bd(l, n, u, c);
    } finally {
      ie.p = r, te.T = s;
    }
  }
  function W0(l, n, u, c) {
    var s = te.T;
    te.T = null;
    var r = ie.p;
    try {
      ie.p = 8, Bd(l, n, u, c);
    } finally {
      ie.p = r, te.T = s;
    }
  }
  function Bd(l, n, u, c) {
    if (Rs) {
      var s = qd(c);
      if (s === null)
        ps(
          l,
          n,
          c,
          Ms,
          u
        ), am(l, c);
      else if (fp(
        s,
        l,
        n,
        u,
        c
      ))
        c.stopPropagation();
      else if (am(l, c), n & 4 && -1 < lm.indexOf(l)) {
        for (; s !== null; ) {
          var r = Xi(s);
          if (r !== null)
            switch (r.tag) {
              case 3:
                if (r = r.stateNode, r.current.memoizedState.isDehydrated) {
                  var y = $n(r.pendingLanes);
                  if (y !== 0) {
                    var v = r;
                    for (v.pendingLanes |= 2, v.entangledLanes |= 2; y; ) {
                      var g = 1 << 31 - Nl(y);
                      v.entanglements[1] |= g, y &= ~g;
                    }
                    ra(r), !(et & 6) && (rs = Yl() + 500, Qf(0));
                  }
                }
                break;
              case 13:
                v = on(r, 2), v !== null && Bt(v, r, 2), Dc(), xd(r, 2);
            }
          if (r = qd(c), r === null && ps(
            l,
            n,
            c,
            Ms,
            u
          ), r === s) break;
          s = r;
        }
        s !== null && c.stopPropagation();
      } else
        ps(
          l,
          n,
          c,
          null,
          u
        );
    }
  }
  function qd(l) {
    return l = Dh(l), Yd(l);
  }
  var Ms = null;
  function Yd(l) {
    if (Ms = null, l = Pn(l), l !== null) {
      var n = L(l);
      if (n === null) l = null;
      else {
        var u = n.tag;
        if (u === 13) {
          if (l = ae(n), l !== null) return l;
          l = null;
        } else if (u === 3) {
          if (n.stateNode.current.memoizedState.isDehydrated)
            return n.tag === 3 ? n.stateNode.containerInfo : null;
          l = null;
        } else n !== l && (l = null);
      }
    }
    return Ms = l, null;
  }
  function F0(l) {
    switch (l) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Nv()) {
          case Km:
            return 2;
          case Xu:
            return 8;
          case Yi:
          case ho:
            return 32;
          case Jm:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Nd = !1, zi = null, Ai = null, Cu = null, Di = /* @__PURE__ */ new Map(), Ri = /* @__PURE__ */ new Map(), ma = [], lm = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function am(l, n) {
    switch (l) {
      case "focusin":
      case "focusout":
        zi = null;
        break;
      case "dragenter":
      case "dragleave":
        Ai = null;
        break;
      case "mouseover":
      case "mouseout":
        Cu = null;
        break;
      case "pointerover":
      case "pointerout":
        Di.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Ri.delete(n.pointerId);
    }
  }
  function Jf(l, n, u, c, s, r) {
    return l === null || l.nativeEvent !== r ? (l = {
      blockedOn: n,
      domEventName: u,
      eventSystemFlags: c,
      nativeEvent: r,
      targetContainers: [s]
    }, n !== null && (n = Xi(n), n !== null && tm(n)), l) : (l.eventSystemFlags |= c, n = l.targetContainers, s !== null && n.indexOf(s) === -1 && n.push(s), l);
  }
  function fp(l, n, u, c, s) {
    switch (n) {
      case "focusin":
        return zi = Jf(
          zi,
          l,
          n,
          u,
          c,
          s
        ), !0;
      case "dragenter":
        return Ai = Jf(
          Ai,
          l,
          n,
          u,
          c,
          s
        ), !0;
      case "mouseover":
        return Cu = Jf(
          Cu,
          l,
          n,
          u,
          c,
          s
        ), !0;
      case "pointerover":
        var r = s.pointerId;
        return Di.set(
          r,
          Jf(
            Di.get(r) || null,
            l,
            n,
            u,
            c,
            s
          )
        ), !0;
      case "gotpointercapture":
        return r = s.pointerId, Ri.set(
          r,
          Jf(
            Ri.get(r) || null,
            l,
            n,
            u,
            c,
            s
          )
        ), !0;
    }
    return !1;
  }
  function I0(l) {
    var n = Pn(l.target);
    if (n !== null) {
      var u = L(n);
      if (u !== null) {
        if (n = u.tag, n === 13) {
          if (n = ae(u), n !== null) {
            l.blockedOn = n, Fn(l.priority, function() {
              if (u.tag === 13) {
                var c = hl(), s = on(u, c);
                s !== null && Bt(s, u, c), xd(u, c);
              }
            });
            return;
          }
        } else if (n === 3 && u.stateNode.current.memoizedState.isDehydrated) {
          l.blockedOn = u.tag === 3 ? u.stateNode.containerInfo : null;
          return;
        }
      }
    }
    l.blockedOn = null;
  }
  function Gd(l) {
    if (l.blockedOn !== null) return !1;
    for (var n = l.targetContainers; 0 < n.length; ) {
      var u = qd(l.nativeEvent);
      if (u === null) {
        u = l.nativeEvent;
        var c = new u.constructor(
          u.type,
          u
        );
        Ah = c, u.target.dispatchEvent(c), Ah = null;
      } else
        return n = Xi(u), n !== null && tm(n), l.blockedOn = u, !1;
      n.shift();
    }
    return !0;
  }
  function nm(l, n, u) {
    Gd(l) && u.delete(n);
  }
  function kf() {
    Nd = !1, zi !== null && Gd(zi) && (zi = null), Ai !== null && Gd(Ai) && (Ai = null), Cu !== null && Gd(Cu) && (Cu = null), Di.forEach(nm), Ri.forEach(nm);
  }
  function $f(l, n) {
    l.blockedOn === n && (l.blockedOn = null, Nd || (Nd = !0, j.unstable_scheduleCallback(
      j.unstable_NormalPriority,
      kf
    )));
  }
  var Os = null;
  function um(l) {
    Os !== l && (Os = l, j.unstable_scheduleCallback(
      j.unstable_NormalPriority,
      function() {
        Os === l && (Os = null);
        for (var n = 0; n < l.length; n += 3) {
          var u = l[n], c = l[n + 1], s = l[n + 2];
          if (typeof c != "function") {
            if (Yd(c || u) === null)
              continue;
            break;
          }
          var r = Xi(u);
          r !== null && (l.splice(n, 3), n -= 3, mu(
            r,
            {
              pending: !0,
              data: s,
              method: u.method,
              action: c
            },
            c,
            s
          ));
        }
      }
    ));
  }
  function Wf(l) {
    function n(g) {
      return $f(g, l);
    }
    zi !== null && $f(zi, l), Ai !== null && $f(Ai, l), Cu !== null && $f(Cu, l), Di.forEach(n), Ri.forEach(n);
    for (var u = 0; u < ma.length; u++) {
      var c = ma[u];
      c.blockedOn === l && (c.blockedOn = null);
    }
    for (; 0 < ma.length && (u = ma[0], u.blockedOn === null); )
      I0(u), u.blockedOn === null && ma.shift();
    if (u = (l.ownerDocument || l).$$reactFormReplay, u != null)
      for (c = 0; c < u.length; c += 3) {
        var s = u[c], r = u[c + 1], y = s[Gl] || null;
        if (typeof r == "function")
          y || um(u);
        else if (y) {
          var v = null;
          if (r && r.hasAttribute("formAction")) {
            if (s = r, y = r[Gl] || null)
              v = y.formAction;
            else if (Yd(s) !== null) continue;
          } else v = y.action;
          typeof v == "function" ? u[c + 1] = v : (u.splice(c, 3), c -= 3), um(u);
        }
      }
  }
  function im(l) {
    this._internalRoot = l;
  }
  xc.prototype.render = im.prototype.render = function(l) {
    var n = this._internalRoot;
    if (n === null) throw Error(x(409));
    var u = n.current, c = hl();
    em(u, c, l, n, null, null);
  }, xc.prototype.unmount = im.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var n = l.containerInfo;
      l.tag === 0 && Rc(), em(l.current, 2, null, l, null, null), Dc(), n[In] = null;
    }
  };
  function xc(l) {
    this._internalRoot = l;
  }
  xc.prototype.unstable_scheduleHydration = function(l) {
    if (l) {
      var n = po();
      l = { blockedOn: null, target: l, priority: n };
      for (var u = 0; u < ma.length && n !== 0 && n < ma[u].priority; u++) ;
      ma.splice(u, 0, l), u === 0 && I0(l);
    }
  };
  var cm = yt.version;
  if (cm !== "19.0.0")
    throw Error(
      x(
        527,
        cm,
        "19.0.0"
      )
    );
  ie.findDOMNode = function(l) {
    var n = l._reactInternals;
    if (n === void 0)
      throw typeof l.render == "function" ? Error(x(188)) : (l = Object.keys(l).join(","), Error(x(268, l)));
    return l = Ce(n), l = l !== null ? be(l) : null, l = l === null ? null : l.stateNode, l;
  };
  var Ff = {
    bundleType: 0,
    version: "19.0.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: te,
    findFiberByHostInstance: Pn,
    reconcilerVersion: "19.0.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Vd = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Vd.isDisabled && Vd.supportsFiber)
      try {
        Ni = Vd.inject(
          Ff
        ), $t = Vd;
      } catch {
      }
  }
  return Lm.createRoot = function(l, n) {
    if (!zt(l)) throw Error(x(299));
    var u = !1, c = "", s = D0, r = _a, y = my, v = null;
    return n != null && (n.unstable_strictMode === !0 && (u = !0), n.identifierPrefix !== void 0 && (c = n.identifierPrefix), n.onUncaughtError !== void 0 && (s = n.onUncaughtError), n.onCaughtError !== void 0 && (r = n.onCaughtError), n.onRecoverableError !== void 0 && (y = n.onRecoverableError), n.unstable_transitionCallbacks !== void 0 && (v = n.unstable_transitionCallbacks)), n = J0(
      l,
      1,
      !1,
      null,
      null,
      u,
      c,
      s,
      r,
      y,
      v,
      null
    ), l[In] = n.current, Oc(
      l.nodeType === 8 ? l.parentNode : l
    ), new im(n);
  }, Lm.hydrateRoot = function(l, n, u) {
    if (!zt(l)) throw Error(x(299));
    var c = !1, s = "", r = D0, y = _a, v = my, g = null, z = null;
    return u != null && (u.unstable_strictMode === !0 && (c = !0), u.identifierPrefix !== void 0 && (s = u.identifierPrefix), u.onUncaughtError !== void 0 && (r = u.onUncaughtError), u.onCaughtError !== void 0 && (y = u.onCaughtError), u.onRecoverableError !== void 0 && (v = u.onRecoverableError), u.unstable_transitionCallbacks !== void 0 && (g = u.unstable_transitionCallbacks), u.formState !== void 0 && (z = u.formState)), n = J0(
      l,
      1,
      !0,
      n,
      u ?? null,
      c,
      s,
      r,
      y,
      v,
      g,
      z
    ), n.context = Py(null), u = n.current, c = hl(), s = bu(c), s.callback = null, Tu(u, s, c), n.current.lanes = c, un(n, c), ra(n), l[In] = n.current, Oc(l), new xc(n);
  }, Lm.version = "19.0.0", Lm;
}
var Zm = {};
/**
 * @license React
 * react-dom-client.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var nS;
function bb() {
  return nS || (nS = 1, process.env.NODE_ENV !== "production" && function() {
    function j(e, t) {
      for (e = e.memoizedState; e !== null && 0 < t; )
        e = e.next, t--;
      return e;
    }
    function yt(e, t, a, i) {
      if (a >= t.length) return i;
      var f = t[a], o = ll(e) ? e.slice() : se({}, e);
      return o[f] = yt(e[f], t, a + 1, i), o;
    }
    function ct(e, t, a) {
      if (t.length !== a.length)
        console.warn("copyWithRename() expects paths of the same length");
      else {
        for (var i = 0; i < a.length - 1; i++)
          if (t[i] !== a[i]) {
            console.warn(
              "copyWithRename() expects paths to be the same except for the deepest key"
            );
            return;
          }
        return x(e, t, a, 0);
      }
    }
    function x(e, t, a, i) {
      var f = t[i], o = ll(e) ? e.slice() : se({}, e);
      return i + 1 === t.length ? (o[a[i]] = o[f], ll(o) ? o.splice(f, 1) : delete o[f]) : o[f] = x(
        e[f],
        t,
        a,
        i + 1
      ), o;
    }
    function zt(e, t, a) {
      var i = t[a], f = ll(e) ? e.slice() : se({}, e);
      return a + 1 === t.length ? (ll(f) ? f.splice(i, 1) : delete f[i], f) : (f[i] = zt(e[i], t, a + 1), f);
    }
    function kl() {
      return !1;
    }
    function bl() {
      return null;
    }
    function we(e, t, a, i) {
      return new R0(e, t, a, i);
    }
    function _() {
      console.error(
        "Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://react.dev/link/rules-of-hooks"
      );
    }
    function Jt() {
      console.error(
        "Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."
      );
    }
    function Kn() {
    }
    function kt() {
    }
    function Ne(e) {
      var t = [];
      return e.forEach(function(a) {
        t.push(a);
      }), t.sort().join(", ");
    }
    function cl(e, t) {
      e.context === If && (Q0(t, e, null, null), ua());
    }
    function ft(e, t) {
      if (Nn !== null) {
        var a = t.staleFamilies;
        t = t.updatedFamilies, Eu(), Hh(
          e.current,
          t,
          a
        ), ua();
      }
    }
    function Gt(e) {
      Nn = e;
    }
    function ln(e) {
      return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
    }
    function Ke(e) {
      return e === null || typeof e != "object" ? null : (e = Z0 && e[Z0] || e["@@iterator"], typeof e == "function" ? e : null);
    }
    function ne(e) {
      if (e == null) return null;
      if (typeof e == "function")
        return e.$$typeof === Iv ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case xn:
          return "Fragment";
        case Zf:
          return "Portal";
        case Ad:
          return "Profiler";
        case zd:
          return "StrictMode";
        case Dd:
          return "Suspense";
        case ps:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case da:
            return (e.displayName || "Context") + ".Provider";
          case vs:
            return (e._context.displayName || "Context") + ".Consumer";
          case Oc:
            var t = e.render;
            return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case vi:
            return t = e.displayName || null, t !== null ? t : ne(e.type) || "Memo";
          case yl:
            t = e._payload, e = e._init;
            try {
              return ne(e(t));
            } catch {
            }
        }
      return null;
    }
    function $l(e) {
      return typeof e.tag == "number" ? P(e) : typeof e.name == "string" ? e.name : null;
    }
    function P(e) {
      var t = e.type;
      switch (e.tag) {
        case 24:
          return "Cache";
        case 9:
          return (t._context.displayName || "Context") + ".Consumer";
        case 10:
          return (t.displayName || "Context") + ".Provider";
        case 18:
          return "DehydratedFragment";
        case 11:
          return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
        case 7:
          return "Fragment";
        case 26:
        case 27:
        case 5:
          return t;
        case 4:
          return "Portal";
        case 3:
          return "Root";
        case 6:
          return "Text";
        case 16:
          return ne(t);
        case 8:
          return t === zd ? "StrictMode" : "Mode";
        case 22:
          return "Offscreen";
        case 12:
          return "Profiler";
        case 21:
          return "Scope";
        case 13:
          return "Suspense";
        case 19:
          return "SuspenseList";
        case 25:
          return "TracingMarker";
        case 1:
        case 0:
        case 14:
        case 15:
          if (typeof t == "function")
            return t.displayName || t.name || null;
          if (typeof t == "string") return t;
          break;
        case 29:
          if (t = e._debugInfo, t != null) {
            for (var a = t.length - 1; 0 <= a; a--)
              if (typeof t[a].name == "string") return t[a].name;
          }
          if (e.return !== null)
            return P(e.return);
      }
      return null;
    }
    function Ul() {
    }
    function Hl() {
      if (pi === 0) {
        qe = console.log, Rd = console.info, Zt = console.warn, _0 = console.error, Md = console.group, Od = console.groupCollapsed, gs = console.groupEnd;
        var e = {
          configurable: !0,
          enumerable: !0,
          value: Ul,
          writable: !0
        };
        Object.defineProperties(console, {
          info: e,
          log: e,
          warn: e,
          error: e,
          group: e,
          groupCollapsed: e,
          groupEnd: e
        });
      }
      pi++;
    }
    function xi() {
      if (pi--, pi === 0) {
        var e = { configurable: !0, enumerable: !0, writable: !0 };
        Object.defineProperties(console, {
          log: se({}, e, { value: qe }),
          info: se({}, e, { value: Rd }),
          warn: se({}, e, { value: Zt }),
          error: se({}, e, { value: _0 }),
          group: se({}, e, { value: Md }),
          groupCollapsed: se({}, e, { value: Od }),
          groupEnd: se({}, e, { value: gs })
        });
      }
      0 > pi && console.error(
        "disabledDepth fell below zero. This is a bug in React. Please file an issue."
      );
    }
    function Cl(e) {
      if (Ud === void 0)
        try {
          throw Error();
        } catch (a) {
          var t = a.stack.trim().match(/\n( *(at )?)/);
          Ud = t && t[1] || "", $y = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return `
` + Ud + e + $y;
    }
    function te(e, t) {
      if (!e || Ss) return "";
      var a = bs.get(e);
      if (a !== void 0) return a;
      Ss = !0, a = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
      var i = null;
      i = U.H, U.H = null, Hl();
      try {
        var f = {
          DetermineComponentFrameRoot: function() {
            try {
              if (t) {
                var M = function() {
                  throw Error();
                };
                if (Object.defineProperty(M.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                }), typeof Reflect == "object" && Reflect.construct) {
                  try {
                    Reflect.construct(M, []);
                  } catch (F) {
                    var G = F;
                  }
                  Reflect.construct(e, [], M);
                } else {
                  try {
                    M.call();
                  } catch (F) {
                    G = F;
                  }
                  e.call(M.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (F) {
                  G = F;
                }
                (M = e()) && typeof M.catch == "function" && M.catch(function() {
                });
              }
            } catch (F) {
              if (F && G && typeof F.stack == "string")
                return [F.stack, G.stack];
            }
            return [null, null];
          }
        };
        f.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var o = Object.getOwnPropertyDescriptor(
          f.DetermineComponentFrameRoot,
          "name"
        );
        o && o.configurable && Object.defineProperty(
          f.DetermineComponentFrameRoot,
          "name",
          { value: "DetermineComponentFrameRoot" }
        );
        var d = f.DetermineComponentFrameRoot(), h = d[0], m = d[1];
        if (h && m) {
          var p = h.split(`
`), R = m.split(`
`);
          for (d = o = 0; o < p.length && !p[o].includes(
            "DetermineComponentFrameRoot"
          ); )
            o++;
          for (; d < R.length && !R[d].includes(
            "DetermineComponentFrameRoot"
          ); )
            d++;
          if (o === p.length || d === R.length)
            for (o = p.length - 1, d = R.length - 1; 1 <= o && 0 <= d && p[o] !== R[d]; )
              d--;
          for (; 1 <= o && 0 <= d; o--, d--)
            if (p[o] !== R[d]) {
              if (o !== 1 || d !== 1)
                do
                  if (o--, d--, 0 > d || p[o] !== R[d]) {
                    var N = `
` + p[o].replace(
                      " at new ",
                      " at "
                    );
                    return e.displayName && N.includes("<anonymous>") && (N = N.replace("<anonymous>", e.displayName)), typeof e == "function" && bs.set(e, N), N;
                  }
                while (1 <= o && 0 <= d);
              break;
            }
        }
      } finally {
        Ss = !1, U.H = i, xi(), Error.prepareStackTrace = a;
      }
      return p = (p = e ? e.displayName || e.name : "") ? Cl(p) : "", typeof e == "function" && bs.set(e, p), p;
    }
    function Ee(e) {
      switch (e.tag) {
        case 26:
        case 27:
        case 5:
          return Cl(e.type);
        case 16:
          return Cl("Lazy");
        case 13:
          return Cl("Suspense");
        case 19:
          return Cl("SuspenseList");
        case 0:
        case 15:
          return e = te(e.type, !1), e;
        case 11:
          return e = te(e.type.render, !1), e;
        case 1:
          return e = te(e.type, !0), e;
        default:
          return "";
      }
    }
    function xl(e) {
      try {
        var t = "";
        do {
          t += Ee(e);
          var a = e._debugInfo;
          if (a)
            for (var i = a.length - 1; 0 <= i; i--) {
              var f = a[i];
              if (typeof f.name == "string") {
                var o = t, d = f.env, h = Cl(
                  f.name + (d ? " [" + d + "]" : "")
                );
                t = o + h;
              }
            }
          e = e.return;
        } while (e);
        return t;
      } catch (m) {
        return `
Error generating stack: ` + m.message + `
` + m.stack;
      }
    }
    function Ba() {
      if (ml === null) return null;
      var e = ml._debugOwner;
      return e != null ? $l(e) : null;
    }
    function Wl() {
      return ml === null ? "" : xl(ml);
    }
    function $(e, t, a, i, f, o, d) {
      var h = ml;
      U.getCurrentStack = e === null ? null : Wl, ha = !1, ml = e;
      try {
        return t(a, i, f, o, d);
      } finally {
        ml = h;
      }
      throw Error(
        "runWithFiberInDEV should never be called in production. This is a bug in React."
      );
    }
    function Bl(e) {
      var t = e, a = e;
      if (e.alternate) for (; t.return; ) t = t.return;
      else {
        e = t;
        do
          t = e, t.flags & 4098 && (a = t.return), e = t.return;
        while (e);
      }
      return t.tag === 3 ? a : null;
    }
    function C(e) {
      if (e.tag === 13) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
      }
      return null;
    }
    function w(e) {
      if (Bl(e) !== e)
        throw Error("Unable to find node on an unmounted component.");
    }
    function L(e) {
      var t = e.alternate;
      if (!t) {
        if (t = Bl(e), t === null)
          throw Error("Unable to find node on an unmounted component.");
        return t !== e ? null : e;
      }
      for (var a = e, i = t; ; ) {
        var f = a.return;
        if (f === null) break;
        var o = f.alternate;
        if (o === null) {
          if (i = f.return, i !== null) {
            a = i;
            continue;
          }
          break;
        }
        if (f.child === o.child) {
          for (o = f.child; o; ) {
            if (o === a) return w(f), e;
            if (o === i) return w(f), t;
            o = o.sibling;
          }
          throw Error("Unable to find node on an unmounted component.");
        }
        if (a.return !== i.return) a = f, i = o;
        else {
          for (var d = !1, h = f.child; h; ) {
            if (h === a) {
              d = !0, a = f, i = o;
              break;
            }
            if (h === i) {
              d = !0, i = f, a = o;
              break;
            }
            h = h.sibling;
          }
          if (!d) {
            for (h = o.child; h; ) {
              if (h === a) {
                d = !0, a = o, i = f;
                break;
              }
              if (h === i) {
                d = !0, i = o, a = f;
                break;
              }
              h = h.sibling;
            }
            if (!d)
              throw Error(
                "Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue."
              );
          }
        }
        if (a.alternate !== i)
          throw Error(
            "Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue."
          );
      }
      if (a.tag !== 3)
        throw Error("Unable to find node on an unmounted component.");
      return a.stateNode.current === a ? e : t;
    }
    function ae(e) {
      var t = e.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6) return e;
      for (e = e.child; e !== null; ) {
        if (t = ae(e), t !== null) return t;
        e = e.sibling;
      }
      return null;
    }
    function le(e) {
      return { current: e };
    }
    function Ce(e, t) {
      0 > Wa ? console.error("Unexpected pop.") : (t !== Ts[Wa] && console.error("Unexpected Fiber popped."), e.current = Wy[Wa], Wy[Wa] = null, Ts[Wa] = null, Wa--);
    }
    function be(e, t, a) {
      Wa++, Wy[Wa] = e.current, Ts[Wa] = a, e.current = t;
    }
    function At(e) {
      return e === null && console.error(
        "Expected host context to exist. This error is likely caused by a bug in React. Please file an issue."
      ), e;
    }
    function ie(e, t) {
      be(_t, t, e), be(Es, e, e), be(gi, null, e);
      var a = t.nodeType;
      switch (a) {
        case 9:
        case 11:
          a = a === 9 ? "#document" : "#fragment", t = (t = t.documentElement) && (t = t.namespaceURI) ? G0(t) : Lc;
          break;
        default:
          if (t = a === 8 ? t.parentNode : t, a = t.tagName, t = t.namespaceURI)
            t = G0(t), t = et(
              t,
              a
            );
          else
            switch (a) {
              case "svg":
                t = sh;
                break;
              case "math":
                t = Ov;
                break;
              default:
                t = Lc;
            }
      }
      a = a.toLowerCase(), a = ir(null, a), a = {
        context: t,
        ancestorInfo: a
      }, Ce(gi, e), be(gi, a, e);
    }
    function ot(e) {
      Ce(gi, e), Ce(Es, e), Ce(_t, e);
    }
    function Jn() {
      return At(gi.current);
    }
    function Gu(e) {
      e.memoizedState !== null && be(zs, e, e);
      var t = At(gi.current), a = e.type, i = et(t.context, a);
      a = ir(t.ancestorInfo, a), i = { context: i, ancestorInfo: a }, t !== i && (be(Es, e, e), be(gi, i, e));
    }
    function Fl(e) {
      Es.current === e && (Ce(gi, e), Ce(Es, e)), zs.current === e && (Ce(zs, e), Xm._currentValue = $s);
    }
    function mt(e) {
      return typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
    }
    function Xe(e) {
      try {
        return ql(e), !1;
      } catch {
        return !0;
      }
    }
    function ql(e) {
      return "" + e;
    }
    function He(e, t) {
      if (Xe(e))
        return console.error(
          "The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before using it here.",
          t,
          mt(e)
        ), ql(e);
    }
    function an(e, t) {
      if (Xe(e))
        return console.error(
          "The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before using it here.",
          t,
          mt(e)
        ), ql(e);
    }
    function Bi(e) {
      if (Xe(e))
        return console.error(
          "Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before using it here.",
          mt(e)
        ), ql(e);
    }
    function Ws(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u") return !1;
      var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (t.isDisabled) return !0;
      if (!t.supportsFiber)
        return console.error(
          "The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://react.dev/link/react-devtools"
        ), !0;
      try {
        wf = t.inject(e), vl = t;
      } catch (a) {
        console.error("React instrumentation encountered an error: %s.", a);
      }
      return !!t.checkDCE;
    }
    function wc(e, t) {
      if (vl && typeof vl.onCommitFiberRoot == "function")
        try {
          var a = (e.current.flags & 128) === 128;
          switch (t) {
            case ya:
              var i = Si;
              break;
            case Ua:
              i = Cd;
              break;
            case Fa:
              i = _f;
              break;
            case Hc:
              i = Fy;
              break;
            default:
              i = _f;
          }
          vl.onCommitFiberRoot(
            wf,
            e,
            i,
            a
          );
        } catch (f) {
          Al || (Al = !0, console.error(
            "React instrumentation encountered an error: %s",
            f
          ));
        }
    }
    function je(e) {
      if (typeof lp == "function" && ap(e), vl && typeof vl.setStrictMode == "function")
        try {
          vl.setStrictMode(wf, e);
        } catch (t) {
          Al || (Al = !0, console.error(
            "React instrumentation encountered an error: %s",
            t
          ));
        }
    }
    function Fs(e) {
      K = e;
    }
    function Is() {
      K !== null && typeof K.markCommitStopped == "function" && K.markCommitStopped();
    }
    function qi(e) {
      K !== null && typeof K.markComponentRenderStarted == "function" && K.markComponentRenderStarted(e);
    }
    function Vu() {
      K !== null && typeof K.markComponentRenderStopped == "function" && K.markComponentRenderStopped();
    }
    function _m(e) {
      K !== null && typeof K.markRenderStarted == "function" && K.markRenderStarted(e);
    }
    function wm() {
      K !== null && typeof K.markRenderStopped == "function" && K.markRenderStopped();
    }
    function Yl(e, t) {
      K !== null && typeof K.markStateUpdateScheduled == "function" && K.markStateUpdateScheduled(e, t);
    }
    function Nv(e) {
      return e >>>= 0, e === 0 ? 32 : 31 - (np(e) / Kf | 0) | 0;
    }
    function Km(e) {
      if (e & 1) return "SyncHydrationLane";
      if (e & 2) return "Sync";
      if (e & 4) return "InputContinuousHydration";
      if (e & 8) return "InputContinuous";
      if (e & 16) return "DefaultHydration";
      if (e & 32) return "Default";
      if (e & 64) return "TransitionHydration";
      if (e & 4194176) return "Transition";
      if (e & 62914560) return "Retry";
      if (e & 67108864) return "SelectiveHydration";
      if (e & 134217728) return "IdleHydration";
      if (e & 268435456) return "Idle";
      if (e & 536870912) return "Offscreen";
      if (e & 1073741824) return "Deferred";
    }
    function Xu(e) {
      var t = e & 42;
      if (t !== 0) return t;
      switch (e & -e) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 4:
          return 4;
        case 8:
          return 8;
        case 16:
          return 16;
        case 32:
          return 32;
        case 64:
          return 64;
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return e & 4194176;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return e & 62914560;
        case 67108864:
          return 67108864;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 0;
        default:
          return console.error(
            "Should have found matching lanes. This is a bug in React."
          ), e;
      }
    }
    function Yi(e, t) {
      var a = e.pendingLanes;
      if (a === 0) return 0;
      var i = 0, f = e.suspendedLanes, o = e.pingedLanes, d = e.warmLanes;
      e = e.finishedLanes !== 0;
      var h = a & 134217727;
      return h !== 0 ? (a = h & ~f, a !== 0 ? i = Xu(a) : (o &= h, o !== 0 ? i = Xu(o) : e || (d = h & ~d, d !== 0 && (i = Xu(d))))) : (h = a & ~f, h !== 0 ? i = Xu(h) : o !== 0 ? i = Xu(o) : e || (d = a & ~d, d !== 0 && (i = Xu(d)))), i === 0 ? 0 : t !== 0 && t !== i && !(t & f) && (f = i & -i, d = t & -t, f >= d || f === 32 && (d & 4194176) !== 0) ? t : i;
    }
    function ho(e, t) {
      return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
    }
    function Jm(e, t) {
      switch (e) {
        case 1:
        case 2:
        case 4:
        case 8:
          return t + 250;
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return -1;
        case 67108864:
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1;
        default:
          return console.error(
            "Should have found matching lanes. This is a bug in React."
          ), -1;
      }
    }
    function km() {
      var e = bi;
      return bi <<= 1, !(bi & 4194176) && (bi = 128), e;
    }
    function $m() {
      var e = As;
      return As <<= 1, !(As & 62914560) && (As = 4194304), e;
    }
    function Ni(e) {
      for (var t = [], a = 0; 31 > a; a++) t.push(e);
      return t;
    }
    function $t(e, t) {
      e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
    }
    function Gv(e, t, a, i, f, o) {
      var d = e.pendingLanes;
      e.pendingLanes = a, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= a, e.entangledLanes &= a, e.errorRecoveryDisabledLanes &= a, e.shellSuspendCounter = 0;
      var h = e.entanglements, m = e.expirationTimes, p = e.hiddenUpdates;
      for (a = d & ~a; 0 < a; ) {
        var R = 31 - pl(a), N = 1 << R;
        h[R] = 0, m[R] = -1;
        var M = p[R];
        if (M !== null)
          for (p[R] = null, R = 0; R < M.length; R++) {
            var G = M[R];
            G !== null && (G.lane &= -536870913);
          }
        a &= ~N;
      }
      i !== 0 && kn(e, i, 0), o !== 0 && f === 0 && e.tag !== 0 && (e.suspendedLanes |= o & ~(d & ~t));
    }
    function kn(e, t, a) {
      e.pendingLanes |= t, e.suspendedLanes &= ~t;
      var i = 31 - pl(t);
      e.entangledLanes |= t, e.entanglements[i] = e.entanglements[i] | 1073741824 | a & 4194218;
    }
    function Nl(e, t) {
      var a = e.entangledLanes |= t;
      for (e = e.entanglements; a; ) {
        var i = 31 - pl(a), f = 1 << i;
        f & t | e[i] & t && (e[i] |= t), a &= ~f;
      }
    }
    function Wm(e, t, a) {
      if (Dl)
        for (e = e.pendingUpdatersLaneMap; 0 < a; ) {
          var i = 31 - pl(a), f = 1 << i;
          e[i].add(t), a &= ~f;
        }
    }
    function Fm(e, t) {
      if (Dl)
        for (var a = e.pendingUpdatersLaneMap, i = e.memoizedUpdaters; 0 < t; ) {
          var f = 31 - pl(t);
          e = 1 << f, f = a[f], 0 < f.size && (f.forEach(function(o) {
            var d = o.alternate;
            d !== null && i.has(d) || i.add(o);
          }), f.clear()), t &= ~e;
        }
    }
    function Im(e) {
      return e &= -e, ya < e ? Ua < e ? e & 134217727 ? Fa : Hc : Ua : ya;
    }
    function yo() {
      var e = Ze.p;
      return e !== 0 ? e : (e = window.event, e === void 0 ? Fa : Mc(e.type));
    }
    function Ps(e, t) {
      var a = Ze.p;
      try {
        return Ze.p = e, t();
      } finally {
        Ze.p = a;
      }
    }
    function $n(e) {
      delete e[al], delete e[wl], delete e[Cc], delete e[up], delete e[ip];
    }
    function nn(e) {
      var t = e[al];
      if (t) return t;
      for (var a = e.parentNode; a; ) {
        if (t = a[Ti] || a[al]) {
          if (a = t.alternate, t.child !== null || a !== null && a.child !== null)
            for (e = Mu(e); e !== null; ) {
              if (a = e[al])
                return a;
              e = Mu(e);
            }
          return t;
        }
        e = a, a = e.parentNode;
      }
      return null;
    }
    function qa(e) {
      if (e = e[al] || e[Ti]) {
        var t = e.tag;
        if (t === 5 || t === 6 || t === 13 || t === 26 || t === 27 || t === 3)
          return e;
      }
      return null;
    }
    function mo(e) {
      var t = e.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6)
        return e.stateNode;
      throw Error("getNodeFromInstance: Invalid argument.");
    }
    function Gi(e) {
      var t = e[K0];
      return t || (t = e[K0] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
    }
    function Dt(e) {
      e[Ei] = !0;
    }
    function Wn(e, t) {
      un(e, t), un(e + "Capture", t);
    }
    function un(e, t) {
      Hu[e] && console.error(
        "EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.",
        e
      ), Hu[e] = t;
      var a = e.toLowerCase();
      for (Iy[a] = e, e === "onDoubleClick" && (Iy.ondblclick = e), e = 0; e < t.length; e++)
        Ds.add(t[e]);
    }
    function Kc(e, t) {
      cp[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || console.error(
        e === "select" ? "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set `onChange`." : "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."
      ), t.onChange || t.readOnly || t.disabled || t.checked == null || console.error(
        "You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`."
      );
    }
    function er(e) {
      return Bn.call(em, e) ? !0 : Bn.call(Py, e) ? !1 : J0.test(e) ? em[e] = !0 : (Py[e] = !0, console.error("Invalid attribute name: `%s`", e), !1);
    }
    function hh(e, t, a) {
      if (er(t)) {
        if (!e.hasAttribute(t)) {
          switch (typeof a) {
            case "symbol":
            case "object":
              return a;
            case "function":
              return a;
            case "boolean":
              if (a === !1) return a;
          }
          return a === void 0 ? void 0 : null;
        }
        return e = e.getAttribute(t), e === "" && a === !0 ? !0 : (He(a, t), e === "" + a ? a : e);
      }
    }
    function vo(e, t, a) {
      if (er(t))
        if (a === null) e.removeAttribute(t);
        else {
          switch (typeof a) {
            case "undefined":
            case "function":
            case "symbol":
              e.removeAttribute(t);
              return;
            case "boolean":
              var i = t.toLowerCase().slice(0, 5);
              if (i !== "data-" && i !== "aria-") {
                e.removeAttribute(t);
                return;
              }
          }
          He(a, t), e.setAttribute(t, "" + a);
        }
    }
    function po(e, t, a) {
      if (a === null) e.removeAttribute(t);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            e.removeAttribute(t);
            return;
        }
        He(a, t), e.setAttribute(t, "" + a);
      }
    }
    function Fn(e, t, a, i) {
      if (i === null) e.removeAttribute(a);
      else {
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            e.removeAttribute(a);
            return;
        }
        He(i, a), e.setAttributeNS(t, a, "" + i);
      }
    }
    function Rt(e) {
      switch (typeof e) {
        case "bigint":
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return Bi(e), e;
        default:
          return "";
      }
    }
    function Wt(e) {
      var t = e.type;
      return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function Gl(e) {
      var t = Wt(e) ? "checked" : "value", a = Object.getOwnPropertyDescriptor(
        e.constructor.prototype,
        t
      );
      Bi(e[t]);
      var i = "" + e[t];
      if (!e.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
        var f = a.get, o = a.set;
        return Object.defineProperty(e, t, {
          configurable: !0,
          get: function() {
            return f.call(this);
          },
          set: function(d) {
            Bi(d), i = "" + d, o.call(this, d);
          }
        }), Object.defineProperty(e, t, {
          enumerable: a.enumerable
        }), {
          getValue: function() {
            return i;
          },
          setValue: function(d) {
            Bi(d), i = "" + d;
          },
          stopTracking: function() {
            e._valueTracker = null, delete e[t];
          }
        };
      }
    }
    function In(e) {
      e._valueTracker || (e._valueTracker = Gl(e));
    }
    function tr(e) {
      if (!e) return !1;
      var t = e._valueTracker;
      if (!t) return !0;
      var a = t.getValue(), i = "";
      return e && (i = Wt(e) ? e.checked ? "true" : "false" : e.value), e = i, e !== a ? (t.setValue(e), !0) : !1;
    }
    function lr(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    function Ta(e) {
      return e.replace(
        k0,
        function(t) {
          return "\\" + t.charCodeAt(0).toString(16) + " ";
        }
      );
    }
    function yh(e, t) {
      t.checked === void 0 || t.defaultChecked === void 0 || tm || (console.error(
        "%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components",
        Ba() || "A component",
        t.type
      ), tm = !0), t.value === void 0 || t.defaultValue === void 0 || xd || (console.error(
        "%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components",
        Ba() || "A component",
        t.type
      ), xd = !0);
    }
    function Vi(e, t, a, i, f, o, d, h) {
      e.name = "", d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" ? (He(d, "type"), e.type = d) : e.removeAttribute("type"), t != null ? d === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Rt(t)) : e.value !== "" + Rt(t) && (e.value = "" + Rt(t)) : d !== "submit" && d !== "reset" || e.removeAttribute("value"), t != null ? Pn(e, d, Rt(t)) : a != null ? Pn(e, d, Rt(a)) : i != null && e.removeAttribute("value"), f == null && o != null && (e.defaultChecked = !!o), f != null && (e.checked = f && typeof f != "function" && typeof f != "symbol"), h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" ? (He(h, "name"), e.name = "" + Rt(h)) : e.removeAttribute("name");
    }
    function ar(e, t, a, i, f, o, d, h) {
      if (o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (He(o, "type"), e.type = o), t != null || a != null) {
        if (!(o !== "submit" && o !== "reset" || t != null))
          return;
        a = a != null ? "" + Rt(a) : "", t = t != null ? "" + Rt(t) : a, h || t === e.value || (e.value = t), e.defaultValue = t;
      }
      i = i ?? f, i = typeof i != "function" && typeof i != "symbol" && !!i, e.checked = h ? e.checked : !!i, e.defaultChecked = !!i, d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (He(d, "name"), e.name = d);
    }
    function Pn(e, t, a) {
      t === "number" && lr(e.ownerDocument) === e || e.defaultValue === "" + a || (e.defaultValue = "" + a);
    }
    function Xi(e, t) {
      t.value == null && (typeof t.children == "object" && t.children !== null ? Ky.Children.forEach(t.children, function(a) {
        a == null || typeof a == "string" || typeof a == "number" || typeof a == "bigint" || $0 || ($0 = !0, console.error(
          "Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>."
        ));
      }) : t.dangerouslySetInnerHTML == null || W0 || (W0 = !0, console.error(
        "Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected."
      ))), t.selected == null || Rs || (console.error(
        "Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."
      ), Rs = !0);
    }
    function Jc() {
      var e = Ba();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    function Ya(e, t, a, i) {
      if (e = e.options, t) {
        t = {};
        for (var f = 0; f < a.length; f++)
          t["$" + a[f]] = !0;
        for (a = 0; a < e.length; a++)
          f = t.hasOwnProperty("$" + e[a].value), e[a].selected !== f && (e[a].selected = f), f && i && (e[a].defaultSelected = !0);
      } else {
        for (a = "" + Rt(a), t = null, f = 0; f < e.length; f++) {
          if (e[f].value === a) {
            e[f].selected = !0, i && (e[f].defaultSelected = !0);
            return;
          }
          t !== null || e[f].disabled || (t = e[f]);
        }
        t !== null && (t.selected = !0);
      }
    }
    function Mt(e, t) {
      for (e = 0; e < qd.length; e++) {
        var a = qd[e];
        if (t[a] != null) {
          var i = ll(t[a]);
          t.multiple && !i ? console.error(
            "The `%s` prop supplied to <select> must be an array if `multiple` is true.%s",
            a,
            Jc()
          ) : !t.multiple && i && console.error(
            "The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s",
            a,
            Jc()
          );
        }
      }
      t.value === void 0 || t.defaultValue === void 0 || Bd || (console.error(
        "Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://react.dev/link/controlled-components"
      ), Bd = !0);
    }
    function mh(e, t) {
      t.value === void 0 || t.defaultValue === void 0 || Ms || (console.error(
        "%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://react.dev/link/controlled-components",
        Ba() || "A component"
      ), Ms = !0), t.children != null && t.value == null && console.error(
        "Use the `defaultValue` or `value` props instead of setting children on <textarea>."
      );
    }
    function vh(e, t, a) {
      if (t != null && (t = "" + Rt(t), t !== e.value && (e.value = t), a == null)) {
        e.defaultValue !== t && (e.defaultValue = t);
        return;
      }
      e.defaultValue = a != null ? "" + Rt(a) : "";
    }
    function Qu(e, t, a, i) {
      if (t == null) {
        if (i != null) {
          if (a != null)
            throw Error(
              "If you supply `defaultValue` on a <textarea>, do not pass children."
            );
          if (ll(i)) {
            if (1 < i.length)
              throw Error("<textarea> can only have at most one child.");
            i = i[0];
          }
          a = i;
        }
        a == null && (a = ""), t = a;
      }
      a = Rt(t), e.defaultValue = a, i = e.textContent, i === a && i !== "" && i !== null && (e.value = i);
    }
    function Qi(e, t) {
      return e.serverProps === void 0 && e.serverTail.length === 0 && e.children.length === 1 && 3 < e.distanceFromLeaf && e.distanceFromLeaf > 15 - t ? Qi(e.children[0], t) : e;
    }
    function vt(e) {
      return "  " + "  ".repeat(e);
    }
    function kc(e) {
      return "+ " + "  ".repeat(e);
    }
    function ju(e) {
      return "- " + "  ".repeat(e);
    }
    function ph(e) {
      switch (e.tag) {
        case 26:
        case 27:
        case 5:
          return e.type;
        case 16:
          return "Lazy";
        case 13:
          return "Suspense";
        case 19:
          return "SuspenseList";
        case 0:
        case 15:
          return e = e.type, e.displayName || e.name || null;
        case 11:
          return e = e.type.render, e.displayName || e.name || null;
        case 1:
          return e = e.type, e.displayName || e.name || null;
        default:
          return null;
      }
    }
    function go(e, t) {
      return Yd.test(e) ? (e = JSON.stringify(e), e.length > t - 2 ? 8 > t ? '{"..."}' : "{" + e.slice(0, t - 7) + '..."}' : "{" + e + "}") : e.length > t ? 5 > t ? '{"..."}' : e.slice(0, t - 3) + "..." : e;
    }
    function ji(e, t, a) {
      var i = 120 - 2 * a;
      if (t === null)
        return kc(a) + go(e, i) + `
`;
      if (typeof t == "string") {
        for (var f = 0; f < t.length && f < e.length && t.charCodeAt(f) === e.charCodeAt(f); f++) ;
        return f > i - 8 && 10 < f && (e = "..." + e.slice(f - 8), t = "..." + t.slice(f - 8)), kc(a) + go(e, i) + `
` + ju(a) + go(t, i) + `
`;
      }
      return vt(a) + go(e, i) + `
`;
    }
    function $c(e) {
      return Object.prototype.toString.call(e).replace(/^\[object (.*)\]$/, function(t, a) {
        return a;
      });
    }
    function Il(e, t) {
      switch (typeof e) {
        case "string":
          return e = JSON.stringify(e), e.length > t ? 5 > t ? '"..."' : e.slice(0, t - 4) + '..."' : e;
        case "object":
          if (e === null) return "null";
          if (ll(e)) return "[...]";
          if (e.$$typeof === mi)
            return (t = ne(e.type)) ? "<" + t + ">" : "<...>";
          var a = $c(e);
          if (a === "Object") {
            a = "", t -= 2;
            for (var i in e)
              if (e.hasOwnProperty(i)) {
                var f = JSON.stringify(i);
                if (f !== '"' + i + '"' && (i = f), t -= i.length - 2, f = Il(
                  e[i],
                  15 > t ? t : 15
                ), t -= f.length, 0 > t) {
                  a += a === "" ? "..." : ", ...";
                  break;
                }
                a += (a === "" ? "" : ",") + i + ":" + f;
              }
            return "{" + a + "}";
          }
          return a;
        case "function":
          return (t = e.displayName || e.name) ? "function " + t : "function";
        default:
          return String(e);
      }
    }
    function Ft(e, t) {
      return typeof e != "string" || Yd.test(e) ? "{" + Il(e, t - 2) + "}" : e.length > t - 2 ? 5 > t ? '"..."' : '"' + e.slice(0, t - 5) + '..."' : '"' + e + '"';
    }
    function nr(e, t, a) {
      var i = 120 - a.length - e.length, f = [], o;
      for (o in t)
        if (t.hasOwnProperty(o) && o !== "children") {
          var d = Ft(
            t[o],
            120 - a.length - o.length - 1
          );
          i -= o.length + d.length + 2, f.push(o + "=" + d);
        }
      return f.length === 0 ? a + "<" + e + `>
` : 0 < i ? a + "<" + e + " " + f.join(" ") + `>
` : a + "<" + e + `
` + a + "  " + f.join(`
` + a + "  ") + `
` + a + `>
`;
    }
    function Vv(e, t, a) {
      var i = "", f = se({}, t), o;
      for (o in e)
        if (e.hasOwnProperty(o)) {
          delete f[o];
          var d = 120 - 2 * a - o.length - 2, h = Il(e[o], d);
          t.hasOwnProperty(o) ? (d = Il(t[o], d), i += kc(a) + o + ": " + h + `
`, i += ju(a) + o + ": " + d + `
`) : i += kc(a) + o + ": " + h + `
`;
        }
      for (var m in f)
        f.hasOwnProperty(m) && (e = Il(
          f[m],
          120 - 2 * a - m.length - 2
        ), i += ju(a) + m + ": " + e + `
`);
      return i;
    }
    function ur(e, t, a, i) {
      var f = "", o = /* @__PURE__ */ new Map();
      for (p in a)
        a.hasOwnProperty(p) && o.set(
          p.toLowerCase(),
          p
        );
      if (o.size === 1 && o.has("children"))
        f += nr(
          e,
          t,
          vt(i)
        );
      else {
        for (var d in t)
          if (t.hasOwnProperty(d) && d !== "children") {
            var h = 120 - 2 * (i + 1) - d.length - 1, m = o.get(d.toLowerCase());
            if (m !== void 0) {
              o.delete(d.toLowerCase());
              var p = t[d];
              m = a[m];
              var R = Ft(
                p,
                h
              );
              h = Ft(
                m,
                h
              ), typeof p == "object" && p !== null && typeof m == "object" && m !== null && $c(p) === "Object" && $c(m) === "Object" && (2 < Object.keys(p).length || 2 < Object.keys(m).length || -1 < R.indexOf("...") || -1 < h.indexOf("...")) ? f += vt(i + 1) + d + `={{
` + Vv(
                p,
                m,
                i + 2
              ) + vt(i + 1) + `}}
` : (f += kc(i + 1) + d + "=" + R + `
`, f += ju(i + 1) + d + "=" + h + `
`);
            } else
              f += vt(i + 1) + d + "=" + Ft(t[d], h) + `
`;
          }
        o.forEach(function(N) {
          if (N !== "children") {
            var M = 120 - 2 * (i + 1) - N.length - 1;
            f += ju(i + 1) + N + "=" + Ft(a[N], M) + `
`;
          }
        }), f = f === "" ? vt(i) + "<" + e + `>
` : vt(i) + "<" + e + `
` + f + vt(i) + `>
`;
      }
      return e = a.children, t = t.children, typeof e == "string" || typeof e == "number" || typeof e == "bigint" ? (o = "", (typeof t == "string" || typeof t == "number" || typeof t == "bigint") && (o = "" + t), f += ji(o, "" + e, i + 1)) : (typeof t == "string" || typeof t == "number" || typeof t == "bigint") && (f = e == null ? f + ji("" + t, null, i + 1) : f + ji("" + t, void 0, i + 1)), f;
    }
    function gh(e, t) {
      var a = ph(e);
      if (a === null) {
        for (a = "", e = e.child; e; )
          a += gh(e, t), e = e.sibling;
        return a;
      }
      return vt(t) + "<" + a + `>
`;
    }
    function Wc(e, t) {
      var a = Qi(e, t);
      if (a !== e && (e.children.length !== 1 || e.children[0] !== a))
        return vt(t) + `...
` + Wc(a, t + 1);
      a = "";
      var i = e.fiber._debugInfo;
      if (i)
        for (var f = 0; f < i.length; f++) {
          var o = i[f].name;
          typeof o == "string" && (a += vt(t) + "<" + o + `>
`, t++);
        }
      if (i = "", f = e.fiber.pendingProps, e.fiber.tag === 6)
        i = ji(f, e.serverProps, t), t++;
      else if (o = ph(e.fiber), o !== null)
        if (e.serverProps === void 0) {
          i = t;
          var d = 120 - 2 * i - o.length - 2, h = "";
          for (p in f)
            if (f.hasOwnProperty(p) && p !== "children") {
              var m = Ft(f[p], 15);
              if (d -= p.length + m.length + 2, 0 > d) {
                h += " ...";
                break;
              }
              h += " " + p + "=" + m;
            }
          i = vt(i) + "<" + o + h + `>
`, t++;
        } else
          e.serverProps === null ? (i = nr(
            o,
            f,
            kc(t)
          ), t++) : typeof e.serverProps == "string" ? console.error(
            "Should not have matched a non HostText fiber to a Text node. This is a bug in React."
          ) : (i = ur(
            o,
            f,
            e.serverProps,
            t
          ), t++);
      var p = "";
      for (f = e.fiber.child, o = 0; f && o < e.children.length; )
        d = e.children[o], d.fiber === f ? (p += Wc(d, t), o++) : p += gh(f, t), f = f.sibling;
      for (f && 0 < e.children.length && (p += vt(t) + `...
`), f = e.serverTail, e.serverProps === null && t--, e = 0; e < f.length; e++)
        o = f[e], p = typeof o == "string" ? p + (ju(t) + go(o, 120 - 2 * t) + `
`) : p + nr(
          o.type,
          o.props,
          ju(t)
        );
      return a + i + p;
    }
    function Sh(e) {
      try {
        return `

` + Wc(e, 0);
      } catch {
        return "";
      }
    }
    function Pl(e, t, a) {
      for (var i = t, f = null, o = 0; i; )
        i === e && (o = 0), f = {
          fiber: i,
          children: f !== null ? [f] : [],
          serverProps: i === t ? a : i === e ? null : void 0,
          serverTail: [],
          distanceFromLeaf: o
        }, o++, i = i.return;
      return f !== null ? Sh(f).replaceAll(/^[+-]/gm, ">") : "";
    }
    function ir(e, t) {
      e = se({}, e || Cu);
      var a = { tag: t };
      return Nd.indexOf(t) !== -1 && (e.aTagInScope = null, e.buttonTagInScope = null, e.nobrTagInScope = null), zi.indexOf(t) !== -1 && (e.pTagInButtonScope = null), F0.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (e.listItemTagAutoclosing = null, e.dlItemTagAutoclosing = null), e.current = a, t === "form" && (e.formTag = a), t === "a" && (e.aTagInScope = a), t === "button" && (e.buttonTagInScope = a), t === "nobr" && (e.nobrTagInScope = a), t === "p" && (e.pTagInButtonScope = a), t === "li" && (e.listItemTagAutoclosing = a), (t === "dd" || t === "dt") && (e.dlItemTagAutoclosing = a), t === "#document" || t === "html" ? e.containerTagInScope = null : e.containerTagInScope || (e.containerTagInScope = a), e;
    }
    function bh(e, t) {
      switch (t) {
        case "select":
          return e === "hr" || e === "option" || e === "optgroup" || e === "#text";
        case "optgroup":
          return e === "option" || e === "#text";
        case "option":
          return e === "#text";
        case "tr":
          return e === "th" || e === "td" || e === "style" || e === "script" || e === "template";
        case "tbody":
        case "thead":
        case "tfoot":
          return e === "tr" || e === "style" || e === "script" || e === "template";
        case "colgroup":
          return e === "col" || e === "template";
        case "table":
          return e === "caption" || e === "colgroup" || e === "tbody" || e === "tfoot" || e === "thead" || e === "style" || e === "script" || e === "template";
        case "head":
          return e === "base" || e === "basefont" || e === "bgsound" || e === "link" || e === "meta" || e === "title" || e === "noscript" || e === "noframes" || e === "style" || e === "script" || e === "template";
        case "html":
          return e === "head" || e === "body" || e === "frameset";
        case "frameset":
          return e === "frame";
        case "#document":
          return e === "html";
      }
      switch (e) {
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          return t !== "h1" && t !== "h2" && t !== "h3" && t !== "h4" && t !== "h5" && t !== "h6";
        case "rp":
        case "rt":
          return Ai.indexOf(t) === -1;
        case "body":
        case "caption":
        case "col":
        case "colgroup":
        case "frameset":
        case "frame":
        case "head":
        case "html":
        case "tbody":
        case "td":
        case "tfoot":
        case "th":
        case "thead":
        case "tr":
          return t == null;
      }
      return !0;
    }
    function Th(e, t) {
      switch (e) {
        case "address":
        case "article":
        case "aside":
        case "blockquote":
        case "center":
        case "details":
        case "dialog":
        case "dir":
        case "div":
        case "dl":
        case "fieldset":
        case "figcaption":
        case "figure":
        case "footer":
        case "header":
        case "hgroup":
        case "main":
        case "menu":
        case "nav":
        case "ol":
        case "p":
        case "section":
        case "summary":
        case "ul":
        case "pre":
        case "listing":
        case "table":
        case "hr":
        case "xmp":
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          return t.pTagInButtonScope;
        case "form":
          return t.formTag || t.pTagInButtonScope;
        case "li":
          return t.listItemTagAutoclosing;
        case "dd":
        case "dt":
          return t.dlItemTagAutoclosing;
        case "button":
          return t.buttonTagInScope;
        case "a":
          return t.aTagInScope;
        case "nobr":
          return t.nobrTagInScope;
      }
      return null;
    }
    function Li(e, t) {
      for (; e; ) {
        switch (e.tag) {
          case 5:
          case 26:
          case 27:
            if (e.type === t) return e;
        }
        e = e.return;
      }
      return null;
    }
    function cr(e, t) {
      t = t || Cu;
      var a = t.current;
      if (t = (a = bh(
        e,
        a && a.tag
      ) ? null : a) ? null : Th(e, t), t = a || t, !t) return !0;
      t = t.tag;
      var i = String(!!a) + "|" + e + "|" + t;
      if (Di[i]) return !1;
      Di[i] = !0;
      var f = (i = ml) ? Li(i.return, t) : null;
      return i = i !== null && f !== null ? Pl(f, i, null) : "", f = "<" + e + ">", a ? (a = "", t === "table" && e === "tr" && (a += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), console.error(
        `In HTML, %s cannot be a child of <%s>.%s
This will cause a hydration error.%s`,
        f,
        t,
        a,
        i
      )) : console.error(
        `In HTML, %s cannot be a descendant of <%s>.
This will cause a hydration error.%s`,
        f,
        t,
        i
      ), !1;
    }
    function So(e, t) {
      if (bh("#text", t)) return !0;
      var a = "#text|" + t;
      if (Di[a]) return !1;
      Di[a] = !0;
      var i = (a = ml) ? Li(a, t) : null;
      return a = a !== null && i !== null ? Pl(
        i,
        a,
        a.tag !== 6 ? { children: null } : null
      ) : "", /\S/.test(e) ? console.error(
        `In HTML, text nodes cannot be a child of <%s>.
This will cause a hydration error.%s`,
        t,
        a
      ) : console.error(
        `In HTML, whitespace text nodes cannot be a child of <%s>. Make sure you don't have any extra whitespace between tags on each line of your source code.
This will cause a hydration error.%s`,
        t,
        a
      ), !1;
    }
    function cn(e, t) {
      if (t) {
        var a = e.firstChild;
        if (a && a === e.lastChild && a.nodeType === 3) {
          a.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }
    function Xv(e) {
      return e.replace(Gd, function(t, a) {
        return a.toUpperCase();
      });
    }
    function Eh(e, t, a) {
      var i = t.indexOf("--") === 0;
      i || (-1 < t.indexOf("-") ? kf.hasOwnProperty(t) && kf[t] || (kf[t] = !0, console.error(
        "Unsupported style property %s. Did you mean %s?",
        t,
        Xv(t.replace(I0, "ms-"))
      )) : fp.test(t) ? kf.hasOwnProperty(t) && kf[t] || (kf[t] = !0, console.error(
        "Unsupported vendor-prefixed style property %s. Did you mean %s?",
        t,
        t.charAt(0).toUpperCase() + t.slice(1)
      )) : !nm.test(a) || $f.hasOwnProperty(a) && $f[a] || ($f[a] = !0, console.error(
        `Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`,
        t,
        a.replace(nm, "")
      )), typeof a == "number" && (isNaN(a) ? Os || (Os = !0, console.error(
        "`NaN` is an invalid value for the `%s` css style property.",
        t
      )) : isFinite(a) || um || (um = !0, console.error(
        "`Infinity` is an invalid value for the `%s` css style property.",
        t
      )))), a == null || typeof a == "boolean" || a === "" ? i ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : i ? e.setProperty(t, a) : typeof a != "number" || a === 0 || Wf.has(t) ? t === "float" ? e.cssFloat = a : (an(a, t), e[t] = ("" + a).trim()) : e[t] = a + "px";
    }
    function zh(e, t, a) {
      if (t != null && typeof t != "object")
        throw Error(
          "The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX."
        );
      if (t && Object.freeze(t), e = e.style, a != null) {
        if (t) {
          var i = {};
          if (a) {
            for (var f in a)
              if (a.hasOwnProperty(f) && !t.hasOwnProperty(f))
                for (var o = lm[f] || [f], d = 0; d < o.length; d++)
                  i[o[d]] = f;
          }
          for (var h in t)
            if (t.hasOwnProperty(h) && (!a || a[h] !== t[h]))
              for (f = lm[h] || [h], o = 0; o < f.length; o++)
                i[f[o]] = h;
          h = {};
          for (var m in t)
            for (f = lm[m] || [m], o = 0; o < f.length; o++)
              h[f[o]] = m;
          m = {};
          for (var p in i)
            if (f = i[p], (o = h[p]) && f !== o && (d = f + "," + o, !m[d])) {
              m[d] = !0, d = console;
              var R = t[f];
              d.error.call(
                d,
                "%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.",
                R == null || typeof R == "boolean" || R === "" ? "Removing" : "Updating",
                f,
                o
              );
            }
        }
        for (var N in a)
          !a.hasOwnProperty(N) || t != null && t.hasOwnProperty(N) || (N.indexOf("--") === 0 ? e.setProperty(N, "") : N === "float" ? e.cssFloat = "" : e[N] = "");
        for (var M in t)
          p = t[M], t.hasOwnProperty(M) && a[M] !== p && Eh(e, M, p);
      } else
        for (i in t)
          t.hasOwnProperty(i) && Eh(e, i, t[i]);
    }
    function Zi(e) {
      if (e.indexOf("-") === -1) return !1;
      switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    function Pm(e) {
      return im.get(e) || e;
    }
    function Qv(e, t) {
      if (Bn.call(Ff, t) && Ff[t])
        return !0;
      if (l.test(t)) {
        if (e = "aria-" + t.slice(4).toLowerCase(), e = cm.hasOwnProperty(e) ? e : null, e == null)
          return console.error(
            "Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.",
            t
          ), Ff[t] = !0;
        if (t !== e)
          return console.error(
            "Invalid ARIA attribute `%s`. Did you mean `%s`?",
            t,
            e
          ), Ff[t] = !0;
      }
      if (Vd.test(t)) {
        if (e = t.toLowerCase(), e = cm.hasOwnProperty(e) ? e : null, e == null) return Ff[t] = !0, !1;
        t !== e && (console.error(
          "Unknown ARIA attribute `%s`. Did you mean `%s`?",
          t,
          e
        ), Ff[t] = !0);
      }
      return !0;
    }
    function fr(e, t) {
      var a = [], i;
      for (i in t)
        Qv(e, i) || a.push(i);
      t = a.map(function(f) {
        return "`" + f + "`";
      }).join(", "), a.length === 1 ? console.error(
        "Invalid aria prop %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props",
        t,
        e
      ) : 1 < a.length && console.error(
        "Invalid aria props %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props",
        t,
        e
      );
    }
    function Ah(e, t, a, i) {
      if (Bn.call(u, t) && u[t])
        return !0;
      var f = t.toLowerCase();
      if (f === "onfocusin" || f === "onfocusout")
        return console.error(
          "React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."
        ), u[t] = !0;
      if (typeof a == "function" && (e === "form" && t === "action" || e === "input" && t === "formAction" || e === "button" && t === "formAction"))
        return !0;
      if (i != null) {
        if (e = i.possibleRegistrationNames, i.registrationNameDependencies.hasOwnProperty(t))
          return !0;
        if (i = e.hasOwnProperty(f) ? e[f] : null, i != null)
          return console.error(
            "Invalid event handler property `%s`. Did you mean `%s`?",
            t,
            i
          ), u[t] = !0;
        if (c.test(t))
          return console.error(
            "Unknown event handler property `%s`. It will be ignored.",
            t
          ), u[t] = !0;
      } else if (c.test(t))
        return s.test(t) && console.error(
          "Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.",
          t
        ), u[t] = !0;
      if (r.test(t) || y.test(t)) return !0;
      if (f === "innerhtml")
        return console.error(
          "Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."
        ), u[t] = !0;
      if (f === "aria")
        return console.error(
          "The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."
        ), u[t] = !0;
      if (f === "is" && a !== null && a !== void 0 && typeof a != "string")
        return console.error(
          "Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.",
          typeof a
        ), u[t] = !0;
      if (typeof a == "number" && isNaN(a))
        return console.error(
          "Received NaN for the `%s` attribute. If this is expected, cast the value to a string.",
          t
        ), u[t] = !0;
      if (xc.hasOwnProperty(f)) {
        if (f = xc[f], f !== t)
          return console.error(
            "Invalid DOM property `%s`. Did you mean `%s`?",
            t,
            f
          ), u[t] = !0;
      } else if (t !== f)
        return console.error(
          "React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.",
          t,
          f
        ), u[t] = !0;
      switch (t) {
        case "dangerouslySetInnerHTML":
        case "children":
        case "style":
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "ref":
          return !0;
        case "innerText":
        case "textContent":
          return !0;
      }
      switch (typeof a) {
        case "boolean":
          switch (t) {
            case "autoFocus":
            case "checked":
            case "multiple":
            case "muted":
            case "selected":
            case "contentEditable":
            case "spellCheck":
            case "draggable":
            case "value":
            case "autoReverse":
            case "externalResourcesRequired":
            case "focusable":
            case "preserveAlpha":
            case "allowFullScreen":
            case "async":
            case "autoPlay":
            case "controls":
            case "default":
            case "defer":
            case "disabled":
            case "disablePictureInPicture":
            case "disableRemotePlayback":
            case "formNoValidate":
            case "hidden":
            case "loop":
            case "noModule":
            case "noValidate":
            case "open":
            case "playsInline":
            case "readOnly":
            case "required":
            case "reversed":
            case "scoped":
            case "seamless":
            case "itemScope":
            case "capture":
            case "download":
            case "inert":
              return !0;
            default:
              return f = t.toLowerCase().slice(0, 5), f === "data-" || f === "aria-" ? !0 : (a ? console.error(
                'Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.',
                a,
                t,
                t,
                a,
                t
              ) : console.error(
                'Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.',
                a,
                t,
                t,
                a,
                t,
                t,
                t
              ), u[t] = !0);
          }
        case "function":
        case "symbol":
          return u[t] = !0, !1;
        case "string":
          if (a === "false" || a === "true") {
            switch (t) {
              case "checked":
              case "selected":
              case "multiple":
              case "muted":
              case "allowFullScreen":
              case "async":
              case "autoPlay":
              case "controls":
              case "default":
              case "defer":
              case "disabled":
              case "disablePictureInPicture":
              case "disableRemotePlayback":
              case "formNoValidate":
              case "hidden":
              case "loop":
              case "noModule":
              case "noValidate":
              case "open":
              case "playsInline":
              case "readOnly":
              case "required":
              case "reversed":
              case "scoped":
              case "seamless":
              case "itemScope":
              case "inert":
                break;
              default:
                return !0;
            }
            console.error(
              "Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?",
              a,
              t,
              a === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".',
              t,
              a
            ), u[t] = !0;
          }
      }
      return !0;
    }
    function Dh(e, t, a) {
      var i = [], f;
      for (f in t)
        Ah(e, f, t[f], a) || i.push(f);
      t = i.map(function(o) {
        return "`" + o + "`";
      }).join(", "), i.length === 1 ? console.error(
        "Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://react.dev/link/attribute-behavior ",
        t,
        e
      ) : 1 < i.length && console.error(
        "Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://react.dev/link/attribute-behavior ",
        t,
        e
      );
    }
    function fn(e) {
      return v.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
    }
    function Lu(e) {
      return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
    }
    function Rh(e) {
      var t = qa(e);
      if (t && (e = t.stateNode)) {
        var a = e[wl] || null;
        e: switch (e = t.stateNode, t.type) {
          case "input":
            if (Vi(
              e,
              a.value,
              a.defaultValue,
              a.defaultValue,
              a.checked,
              a.defaultChecked,
              a.type,
              a.name
            ), t = a.name, a.type === "radio" && t != null) {
              for (a = e; a.parentNode; ) a = a.parentNode;
              for (He(t, "name"), a = a.querySelectorAll(
                'input[name="' + Ta(
                  "" + t
                ) + '"][type="radio"]'
              ), t = 0; t < a.length; t++) {
                var i = a[t];
                if (i !== e && i.form === e.form) {
                  var f = i[wl] || null;
                  if (!f)
                    throw Error(
                      "ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported."
                    );
                  Vi(
                    i,
                    f.value,
                    f.defaultValue,
                    f.defaultValue,
                    f.checked,
                    f.defaultChecked,
                    f.type,
                    f.name
                  );
                }
              }
              for (t = 0; t < a.length; t++)
                i = a[t], i.form === e.form && tr(i);
            }
            break e;
          case "textarea":
            vh(e, a.value, a.defaultValue);
            break e;
          case "select":
            t = a.value, t != null && Ya(e, !!a.multiple, t, !1);
        }
      }
    }
    function or(e, t, a) {
      if (X) return e(t, a);
      X = !0;
      try {
        var i = e(t);
        return i;
      } finally {
        if (X = !1, (z !== null || Y !== null) && (ua(), z && (t = z, e = Y, Y = z = null, Rh(t), e)))
          for (t = 0; t < e.length; t++) Rh(e[t]);
      }
    }
    function Fc(e, t) {
      var a = e.stateNode;
      if (a === null) return null;
      var i = a[wl] || null;
      if (i === null) return null;
      a = i[t];
      e: switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          (i = !i.disabled) || (e = e.type, i = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !i;
          break e;
        default:
          e = !1;
      }
      if (e) return null;
      if (a && typeof a != "function")
        throw Error(
          "Expected `" + t + "` listener to be a function, instead got a value of `" + typeof a + "` type."
        );
      return a;
    }
    function Ic() {
      if ($e) return $e;
      var e, t = ue, a = t.length, i, f = "value" in J ? J.value : J.textContent, o = f.length;
      for (e = 0; e < a && t[e] === f[e]; e++) ;
      var d = a - e;
      for (i = 1; i <= d && t[a - i] === f[o - i]; i++) ;
      return $e = f.slice(e, 1 < i ? 1 - i : void 0);
    }
    function Pc(e) {
      var t = e.keyCode;
      return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
    }
    function Zu() {
      return !0;
    }
    function eu() {
      return !1;
    }
    function fl(e) {
      function t(a, i, f, o, d) {
        this._reactName = a, this._targetInst = f, this.type = i, this.nativeEvent = o, this.target = d, this.currentTarget = null;
        for (var h in e)
          e.hasOwnProperty(h) && (a = e[h], this[h] = a ? a(o) : o[h]);
        return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? Zu : eu, this.isPropagationStopped = eu, this;
      }
      return se(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = Zu);
        },
        stopPropagation: function() {
          var a = this.nativeEvent;
          a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = Zu);
        },
        persist: function() {
        },
        isPersistent: Zu
      }), t;
    }
    function sr(e) {
      var t = this.nativeEvent;
      return t.getModifierState ? t.getModifierState(e) : (e = pS[e]) ? !!t[e] : !1;
    }
    function rr() {
      return sr;
    }
    function bo(e, t) {
      switch (e) {
        case "keyup":
          return US.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== sg;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function To(e) {
      return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
    }
    function e0(e, t) {
      switch (e) {
        case "compositionend":
          return To(t);
        case "keypress":
          return t.which !== dg ? null : (yg = !0, hg);
        case "textInput":
          return e = t.data, e === hg && yg ? null : e;
        default:
          return null;
      }
    }
    function Vl(e, t) {
      if (Xd)
        return e === "compositionend" || !rp && bo(e, t) ? (e = Ic(), $e = ue = J = null, Xd = !1, e) : null;
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
            if (t.char && 1 < t.char.length)
              return t.char;
            if (t.which)
              return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return rg && t.locale !== "ko" ? null : t.data;
        default:
          return null;
      }
    }
    function _u(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!CS[e.type] : t === "textarea";
    }
    function dr(e) {
      if (!Kl) return !1;
      e = "on" + e;
      var t = e in document;
      return t || (t = document.createElement("div"), t.setAttribute(e, "return;"), t = typeof t[e] == "function"), t;
    }
    function ef(e, t, a, i) {
      z ? Y ? Y.push(i) : Y = [i] : z = i, t = Du(t, "onChange"), 0 < t.length && (a = new E(
        "onChange",
        "change",
        null,
        a,
        i
      ), e.push({ event: a, listeners: t }));
    }
    function jv(e) {
      cd(e, 0);
    }
    function tf(e) {
      var t = mo(e);
      if (tr(t)) return e;
    }
    function hr(e, t) {
      if (e === "change") return t;
    }
    function lf() {
      om && (om.detachEvent("onpropertychange", Eo), sm = om = null);
    }
    function Eo(e) {
      if (e.propertyName === "value" && tf(sm)) {
        var t = [];
        ef(
          t,
          sm,
          e,
          Lu(e)
        ), or(jv, t);
      }
    }
    function t0(e, t, a) {
      e === "focusin" ? (lf(), om = t, sm = a, om.attachEvent("onpropertychange", Eo)) : e === "focusout" && lf();
    }
    function Lv(e) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return tf(sm);
    }
    function Zv(e, t) {
      if (e === "click") return tf(t);
    }
    function _v(e, t) {
      if (e === "input" || e === "change")
        return tf(t);
    }
    function Mh(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    function zo(e, t) {
      if (va(e, t)) return !0;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
      var a = Object.keys(e), i = Object.keys(t);
      if (a.length !== i.length) return !1;
      for (i = 0; i < a.length; i++) {
        var f = a[i];
        if (!Bn.call(t, f) || !va(e[f], t[f]))
          return !1;
      }
      return !0;
    }
    function l0(e) {
      for (; e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function a0(e, t) {
      var a = l0(e);
      e = 0;
      for (var i; a; ) {
        if (a.nodeType === 3) {
          if (i = e + a.textContent.length, e <= t && i >= t)
            return { node: a, offset: t - e };
          e = i;
        }
        e: {
          for (; a; ) {
            if (a.nextSibling) {
              a = a.nextSibling;
              break e;
            }
            a = a.parentNode;
          }
          a = void 0;
        }
        a = l0(a);
      }
    }
    function n0(e, t) {
      return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? n0(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
    }
    function u0(e) {
      e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
      for (var t = lr(e.document); t instanceof e.HTMLIFrameElement; ) {
        try {
          var a = typeof t.contentWindow.location.href == "string";
        } catch {
          a = !1;
        }
        if (a) e = t.contentWindow;
        else break;
        t = lr(e.document);
      }
      return t;
    }
    function yr(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function wv(e, t) {
      var a = u0(t);
      t = e.focusedElem;
      var i = e.selectionRange;
      if (a !== t && t && t.ownerDocument && n0(t.ownerDocument.documentElement, t)) {
        if (i !== null && yr(t)) {
          if (e = i.start, a = i.end, a === void 0 && (a = e), "selectionStart" in t)
            t.selectionStart = e, t.selectionEnd = Math.min(
              a,
              t.value.length
            );
          else if (a = (e = t.ownerDocument || document) && e.defaultView || window, a.getSelection) {
            a = a.getSelection();
            var f = t.textContent.length, o = Math.min(i.start, f);
            i = i.end === void 0 ? o : Math.min(i.end, f), !a.extend && o > i && (f = i, i = o, o = f), f = a0(t, o);
            var d = a0(
              t,
              i
            );
            f && d && (a.rangeCount !== 1 || a.anchorNode !== f.node || a.anchorOffset !== f.offset || a.focusNode !== d.node || a.focusOffset !== d.offset) && (e = e.createRange(), e.setStart(f.node, f.offset), a.removeAllRanges(), o > i ? (a.addRange(e), a.extend(d.node, d.offset)) : (e.setEnd(
              d.node,
              d.offset
            ), a.addRange(e)));
          }
        }
        for (e = [], a = t; a = a.parentNode; )
          a.nodeType === 1 && e.push({
            element: a,
            left: a.scrollLeft,
            top: a.scrollTop
          });
        for (typeof t.focus == "function" && t.focus(), t = 0; t < e.length; t++)
          a = e[t], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
      }
    }
    function i0(e, t, a) {
      var i = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
      hp || Qd == null || Qd !== lr(i) || (i = Qd, "selectionStart" in i && yr(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = {
        anchorNode: i.anchorNode,
        anchorOffset: i.anchorOffset,
        focusNode: i.focusNode,
        focusOffset: i.focusOffset
      }), rm && zo(rm, i) || (rm = i, i = Du(dp, "onSelect"), 0 < i.length && (t = new E(
        "onSelect",
        "select",
        null,
        t,
        a
      ), e.push({ event: t, listeners: i }), t.target = Qd)));
    }
    function _i(e, t) {
      var a = {};
      return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
    }
    function wi(e) {
      if (yp[e]) return yp[e];
      if (!jd[e]) return e;
      var t = jd[e], a;
      for (a in t)
        if (t.hasOwnProperty(a) && a in vg)
          return yp[e] = t[a];
      return e;
    }
    function ea(e, t) {
      Tg.set(e, t), Wn(t, [e]);
    }
    function mr() {
      for (var e = Ld, t = mp = Ld = 0; t < e; ) {
        var a = Yn[t];
        Yn[t++] = null;
        var i = Yn[t];
        Yn[t++] = null;
        var f = Yn[t];
        Yn[t++] = null;
        var o = Yn[t];
        if (Yn[t++] = null, i !== null && f !== null) {
          var d = i.pending;
          d === null ? f.next = f : (f.next = d.next, d.next = f), i.pending = f;
        }
        o !== 0 && c0(a, f, o);
      }
    }
    function vr(e, t, a, i) {
      Yn[Ld++] = e, Yn[Ld++] = t, Yn[Ld++] = a, Yn[Ld++] = i, mp |= i, e.lanes |= i, e = e.alternate, e !== null && (e.lanes |= i);
    }
    function Oh(e, t, a, i) {
      return vr(e, t, a, i), pr(e);
    }
    function It(e, t) {
      return vr(e, null, null, t), pr(e);
    }
    function c0(e, t, a) {
      e.lanes |= a;
      var i = e.alternate;
      i !== null && (i.lanes |= a);
      for (var f = !1, o = e.return; o !== null; )
        o.childLanes |= a, i = o.alternate, i !== null && (i.childLanes |= a), o.tag === 22 && (e = o.stateNode, e === null || e._visibility & P0 || (f = !0)), e = o, o = o.return;
      f && t !== null && e.tag === 3 && (o = e.stateNode, f = 31 - pl(a), o = o.hiddenUpdates, e = o[f], e === null ? o[f] = [t] : e.push(t), t.lane = a | 536870912);
    }
    function pr(e) {
      if (qm > kS)
        throw Zs = qm = 0, Ym = _p = null, Error(
          "Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops."
        );
      Zs > $S && (Zs = 0, Ym = null, console.error(
        "Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."
      )), e.alternate === null && e.flags & 4098 && Ry(e);
      for (var t = e, a = t.return; a !== null; )
        t.alternate === null && t.flags & 4098 && Ry(e), t = a, a = t.return;
      return t.tag === 3 ? t.stateNode : null;
    }
    function Ki(e) {
      if (Nn === null) return e;
      var t = Nn(e);
      return t === void 0 ? e : t.current;
    }
    function Uh(e) {
      if (Nn === null) return e;
      var t = Nn(e);
      return t === void 0 ? e != null && typeof e.render == "function" && (t = Ki(e.render), e.render !== t) ? (t = { $$typeof: Oc, render: t }, e.displayName !== void 0 && (t.displayName = e.displayName), t) : e : t.current;
    }
    function f0(e, t) {
      if (Nn === null) return !1;
      var a = e.elementType;
      t = t.type;
      var i = !1, f = typeof t == "object" && t !== null ? t.$$typeof : null;
      switch (e.tag) {
        case 1:
          typeof t == "function" && (i = !0);
          break;
        case 0:
          (typeof t == "function" || f === yl) && (i = !0);
          break;
        case 11:
          (f === Oc || f === yl) && (i = !0);
          break;
        case 14:
        case 15:
          (f === vi || f === yl) && (i = !0);
          break;
        default:
          return !1;
      }
      return !!(i && (e = Nn(a), e !== void 0 && e === Nn(t)));
    }
    function o0(e) {
      Nn !== null && typeof WeakSet == "function" && (Zd === null && (Zd = /* @__PURE__ */ new WeakSet()), Zd.add(e));
    }
    function Hh(e, t, a) {
      var i = e.alternate, f = e.child, o = e.sibling, d = e.tag, h = e.type, m = null;
      switch (d) {
        case 0:
        case 15:
        case 1:
          m = h;
          break;
        case 11:
          m = h.render;
      }
      if (Nn === null)
        throw Error("Expected resolveFamily to be set during hot reload.");
      var p = !1;
      h = !1, m !== null && (m = Nn(m), m !== void 0 && (a.has(m) ? h = !0 : t.has(m) && (d === 1 ? h = !0 : p = !0))), Zd !== null && (Zd.has(e) || i !== null && Zd.has(i)) && (h = !0), h && (e._debugNeedsRemount = !0), (h || p) && (i = It(e, 2), i !== null && Qe(i, e, 2)), f === null || h || Hh(
        f,
        t,
        a
      ), o !== null && Hh(
        o,
        t,
        a
      );
    }
    function tu() {
      var e = Hs;
      return Hs = 0, e;
    }
    function gr(e) {
      var t = Hs;
      return Hs = e, t;
    }
    function Ji(e) {
      var t = Hs;
      return Hs += e, t;
    }
    function ki(e) {
      Ha = _d(), 0 > e.actualStartTime && (e.actualStartTime = Ha);
    }
    function Ch(e) {
      if (0 <= Ha) {
        var t = _d() - Ha;
        e.actualDuration += t, e.selfBaseDuration = t, Ha = -1;
      }
    }
    function xh(e) {
      if (0 <= Ha) {
        var t = _d() - Ha;
        e.actualDuration += t, Ha = -1;
      }
    }
    function Na() {
      if (0 <= Ha) {
        var e = _d() - Ha;
        Ha = -1, Hs += e;
      }
    }
    function Ga() {
      Ha = _d();
    }
    function Ao(e) {
      for (var t = e.child; t; )
        e.actualDuration += t.actualDuration, t = t.sibling;
    }
    function Xl(e, t) {
      if (typeof e == "object" && e !== null) {
        var a = pp.get(e);
        return a !== void 0 ? a : (t = {
          value: e,
          source: t,
          stack: xl(t)
        }, pp.set(e, t), t);
      }
      return {
        value: e,
        source: t,
        stack: xl(t)
      };
    }
    function Ea(e, t) {
      wu(), wd[Kd++] = uv, wd[Kd++] = nv, nv = e, uv = t;
    }
    function s0(e, t, a) {
      wu(), Gn[Vn++] = Bc, Gn[Vn++] = qc, Gn[Vn++] = xs, xs = e;
      var i = Bc;
      e = qc;
      var f = 32 - pl(i) - 1;
      i &= ~(1 << f), a += 1;
      var o = 32 - pl(t) + f;
      if (30 < o) {
        var d = f - f % 5;
        o = (i & (1 << d) - 1).toString(32), i >>= d, f -= d, Bc = 1 << 32 - pl(t) + f | a << f | i, qc = o + e;
      } else
        Bc = 1 << o | a << f | i, qc = e;
    }
    function Bh(e) {
      wu(), e.return !== null && (Ea(e, 1), s0(e, 1, 0));
    }
    function qh(e) {
      for (; e === nv; )
        nv = wd[--Kd], wd[Kd] = null, uv = wd[--Kd], wd[Kd] = null;
      for (; e === xs; )
        xs = Gn[--Vn], Gn[Vn] = null, qc = Gn[--Vn], Gn[Vn] = null, Bc = Gn[--Vn], Gn[Vn] = null;
    }
    function wu() {
      Re || console.error(
        "Expected to be hydrating. This is a bug in React. Please file an issue."
      );
    }
    function Ku(e, t) {
      if (e.return === null) {
        if (Xn === null)
          Xn = {
            fiber: e,
            children: [],
            serverProps: void 0,
            serverTail: [],
            distanceFromLeaf: t
          };
        else {
          if (Xn.fiber !== e)
            throw Error(
              "Saw multiple hydration diff roots in a pass. This is a bug in React."
            );
          Xn.distanceFromLeaf > t && (Xn.distanceFromLeaf = t);
        }
        return Xn;
      }
      var a = Ku(
        e.return,
        t + 1
      ).children;
      return 0 < a.length && a[a.length - 1].fiber === e ? (a = a[a.length - 1], a.distanceFromLeaf > t && (a.distanceFromLeaf = t), a) : (t = {
        fiber: e,
        children: [],
        serverProps: void 0,
        serverTail: [],
        distanceFromLeaf: t
      }, a.push(t), t);
    }
    function $i(e, t) {
      Yc || (e = Ku(e, 0), e.serverProps = null, t !== null && (t = yd(t), e.serverTail.push(t)));
    }
    function Va(e) {
      var t = "", a = Xn;
      throw a !== null && (Xn = null, t = Sh(a)), Wi(
        Xl(
          Error(
            `Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:

- A server/client branch \`if (typeof window !== 'undefined')\`.
- Variable input such as \`Date.now()\` or \`Math.random()\` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

https://react.dev/link/hydration-mismatch` + t
          ),
          e
        )
      ), gp;
    }
    function r0(e) {
      var t = e.stateNode, a = e.type, i = e.memoizedProps;
      switch (t[al] = e, t[wl] = i, Sc(a, i), a) {
        case "dialog":
          pe("cancel", t), pe("close", t);
          break;
        case "iframe":
        case "object":
        case "embed":
          pe("load", t);
          break;
        case "video":
        case "audio":
          for (a = 0; a < Nm.length; a++)
            pe(Nm[a], t);
          break;
        case "source":
          pe("error", t);
          break;
        case "img":
        case "image":
        case "link":
          pe("error", t), pe("load", t);
          break;
        case "details":
          pe("toggle", t);
          break;
        case "input":
          Kc("input", i), pe("invalid", t), yh(t, i), ar(
            t,
            i.value,
            i.defaultValue,
            i.checked,
            i.defaultChecked,
            i.type,
            i.name,
            !0
          ), In(t);
          break;
        case "option":
          Xi(t, i);
          break;
        case "select":
          Kc("select", i), pe("invalid", t), Mt(t, i);
          break;
        case "textarea":
          Kc("textarea", i), pe("invalid", t), mh(t, i), Qu(
            t,
            i.value,
            i.defaultValue,
            i.children
          ), In(t);
      }
      a = i.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || t.textContent === "" + a || i.suppressHydrationWarning === !0 || sd(t.textContent, a) ? (i.popover != null && (pe("beforetoggle", t), pe("toggle", t)), i.onScroll != null && pe("scroll", t), i.onScrollEnd != null && pe("scrollend", t), i.onClick != null && (t.onclick = $a), t = !0) : t = !1, t || Va(e);
    }
    function Do(e) {
      for (pa = e.return; pa; )
        switch (pa.tag) {
          case 3:
          case 27:
            Oi = !0;
            return;
          case 5:
          case 13:
            Oi = !1;
            return;
          default:
            pa = pa.return;
        }
    }
    function af(e) {
      if (e !== pa) return !1;
      if (!Re)
        return Do(e), Re = !0, !1;
      var t = !1, a;
      if ((a = e.tag !== 3 && e.tag !== 27) && ((a = e.tag === 5) && (a = e.type, a = !(a !== "form" && a !== "button") || Ge(e.type, e.memoizedProps)), a = !a), a && (t = !0), t && Ml) {
        for (t = Ml; t; ) {
          a = Ku(e, 0);
          var i = yd(t);
          a.serverTail.push(i), t = i.type === "Suspense" ? ds(t) : Zl(t.nextSibling);
        }
        Va(e);
      }
      if (Do(e), e.tag === 13) {
        if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e)
          throw Error(
            "Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue."
          );
        Ml = ds(e);
      } else
        Ml = pa ? Zl(e.stateNode.nextSibling) : null;
      return !0;
    }
    function nf() {
      Ml = pa = null, Yc = Re = !1;
    }
    function Wi(e) {
      qu === null ? qu = [e] : qu.push(e);
    }
    function Sr() {
      var e = Xn;
      e !== null && (Xn = null, e = Sh(e), console.error(
        `A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:

- A server/client branch \`if (typeof window !== 'undefined')\`.
- Variable input such as \`Date.now()\` or \`Math.random()\` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

%s%s`,
        "https://react.dev/link/hydration-mismatch",
        e
      ));
    }
    function Yh() {
      return { didWarnAboutUncachedPromise: !1, thenables: [] };
    }
    function Nh(e) {
      return e = e.status, e === "fulfilled" || e === "rejected";
    }
    function Ro() {
    }
    function d0(e, t, a) {
      U.actQueue !== null && (U.didUsePromise = !0);
      var i = e.thenables;
      switch (a = i[a], a === void 0 ? i.push(t) : a !== t && (e.didWarnAboutUncachedPromise || (e.didWarnAboutUncachedPromise = !0, console.error(
        "A component was suspended by an uncached promise. Creating promises inside a Client Component or hook is not yet supported, except via a Suspense-compatible library or framework."
      )), t.then(Ro, Ro), t = a), t.status) {
        case "fulfilled":
          return t.value;
        case "rejected":
          throw e = t.reason, y0(e), e;
        default:
          if (typeof t.status == "string")
            t.then(Ro, Ro);
          else {
            if (e = We, e !== null && 100 < e.shellSuspendCounter)
              throw Error(
                "async/await is not yet supported in Client Components, only Server Components. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server."
              );
            e = t, e.status = "pending", e.then(
              function(f) {
                if (t.status === "pending") {
                  var o = t;
                  o.status = "fulfilled", o.value = f;
                }
              },
              function(f) {
                if (t.status === "pending") {
                  var o = t;
                  o.status = "rejected", o.reason = f;
                }
              }
            );
          }
          switch (t.status) {
            case "fulfilled":
              return t.value;
            case "rejected":
              throw e = t.reason, y0(e), e;
          }
          throw Sm = t, cv = !0, iv;
      }
    }
    function h0() {
      if (Sm === null)
        throw Error(
          "Expected a suspended thenable. This is a bug in React. Please file an issue."
        );
      var e = Sm;
      return Sm = null, cv = !1, e;
    }
    function y0(e) {
      if (e === iv)
        throw Error(
          "Hooks are not supported inside an async component. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server."
        );
    }
    function Pt(e) {
      var t = me;
      return e != null && (me = t === null ? e : t.concat(e)), t;
    }
    function br(e, t, a) {
      for (var i = Object.keys(e.props), f = 0; f < i.length; f++) {
        var o = i[f];
        if (o !== "children" && o !== "key") {
          t === null && (t = Mf(e, a.mode, 0), t._debugInfo = me, t.return = a), $(
            t,
            function(d) {
              console.error(
                "Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",
                d
              );
            },
            o
          );
          break;
        }
      }
    }
    function ol(e) {
      var t = bm;
      return bm += 1, Jd === null && (Jd = Yh()), d0(Jd, e, t);
    }
    function lu(e, t) {
      t = t.props.ref, e.ref = t !== void 0 ? t : null;
    }
    function Mo(e, t) {
      throw t.$$typeof === ky ? Error(
        `A React Element from an older version of React was rendered. This is not supported. It can happen if:
- Multiple copies of the "react" package is used.
- A library pre-bundled an old copy of "react" or "react/jsx-runtime".
- A compiler tries to "inline" JSX instead of using the runtime.`
      ) : (e = Object.prototype.toString.call(t), Error(
        "Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead."
      ));
    }
    function Oo(e, t) {
      var a = P(e) || "Component";
      Qg[a] || (Qg[a] = !0, t = t.displayName || t.name || "Component", e.tag === 3 ? console.error(
        `Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.
  root.render(%s)`,
        t,
        t,
        t
      ) : console.error(
        `Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.
  <%s>{%s}</%s>`,
        t,
        t,
        a,
        t,
        a
      ));
    }
    function Uo(e, t) {
      var a = P(e) || "Component";
      jg[a] || (jg[a] = !0, t = String(t), e.tag === 3 ? console.error(
        `Symbols are not valid as a React child.
  root.render(%s)`,
        t
      ) : console.error(
        `Symbols are not valid as a React child.
  <%s>%s</%s>`,
        a,
        t,
        a
      ));
    }
    function Gh(e) {
      function t(b, S) {
        if (e) {
          var T = b.deletions;
          T === null ? (b.deletions = [S], b.flags |= 16) : T.push(S);
        }
      }
      function a(b, S) {
        if (!e) return null;
        for (; S !== null; )
          t(b, S), S = S.sibling;
        return null;
      }
      function i(b) {
        for (var S = /* @__PURE__ */ new Map(); b !== null; )
          b.key !== null ? S.set(b.key, b) : S.set(b.index, b), b = b.sibling;
        return S;
      }
      function f(b, S) {
        return b = bn(b, S), b.index = 0, b.sibling = null, b;
      }
      function o(b, S, T) {
        return b.index = T, e ? (T = b.alternate, T !== null ? (T = T.index, T < S ? (b.flags |= 33554434, S) : T) : (b.flags |= 33554434, S)) : (b.flags |= 1048576, S);
      }
      function d(b) {
        return e && b.alternate === null && (b.flags |= 33554434), b;
      }
      function h(b, S, T, q) {
        return S === null || S.tag !== 6 ? (S = Ir(
          T,
          b.mode,
          q
        ), S.return = b, S._debugOwner = b, S._debugInfo = me, S) : (S = f(S, T), S.return = b, S._debugInfo = me, S);
      }
      function m(b, S, T, q) {
        var Z = T.type;
        return Z === xn ? (S = R(
          b,
          S,
          T.props.children,
          q,
          T.key
        ), br(T, S, b), S) : S !== null && (S.elementType === Z || f0(S, T) || typeof Z == "object" && Z !== null && Z.$$typeof === yl && Pf(Z) === S.type) ? (S = f(S, T.props), lu(S, T), S.return = b, S._debugOwner = T._owner, S._debugInfo = me, S) : (S = Mf(T, b.mode, q), lu(S, T), S.return = b, S._debugInfo = me, S);
      }
      function p(b, S, T, q) {
        return S === null || S.tag !== 4 || S.stateNode.containerInfo !== T.containerInfo || S.stateNode.implementation !== T.implementation ? (S = es(T, b.mode, q), S.return = b, S._debugInfo = me, S) : (S = f(S, T.children || []), S.return = b, S._debugInfo = me, S);
      }
      function R(b, S, T, q, Z) {
        return S === null || S.tag !== 7 ? (S = gu(
          T,
          b.mode,
          q,
          Z
        ), S.return = b, S._debugOwner = b, S._debugInfo = me, S) : (S = f(S, T), S.return = b, S._debugInfo = me, S);
      }
      function N(b, S, T) {
        if (typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint")
          return S = Ir(
            "" + S,
            b.mode,
            T
          ), S.return = b, S._debugOwner = b, S._debugInfo = me, S;
        if (typeof S == "object" && S !== null) {
          switch (S.$$typeof) {
            case mi:
              return T = Mf(
                S,
                b.mode,
                T
              ), lu(T, S), T.return = b, b = Pt(S._debugInfo), T._debugInfo = me, me = b, T;
            case Zf:
              return S = es(
                S,
                b.mode,
                T
              ), S.return = b, S._debugInfo = me, S;
            case yl:
              var q = Pt(S._debugInfo);
              return S = Pf(S), b = N(b, S, T), me = q, b;
          }
          if (ll(S) || Ke(S))
            return T = gu(
              S,
              b.mode,
              T,
              null
            ), T.return = b, T._debugOwner = b, b = Pt(S._debugInfo), T._debugInfo = me, me = b, T;
          if (typeof S.then == "function")
            return q = Pt(S._debugInfo), b = N(
              b,
              ol(S),
              T
            ), me = q, b;
          if (S.$$typeof === da)
            return N(
              b,
              bf(b, S),
              T
            );
          Mo(b, S);
        }
        return typeof S == "function" && Oo(b, S), typeof S == "symbol" && Uo(b, S), null;
      }
      function M(b, S, T, q) {
        var Z = S !== null ? S.key : null;
        if (typeof T == "string" && T !== "" || typeof T == "number" || typeof T == "bigint")
          return Z !== null ? null : h(b, S, "" + T, q);
        if (typeof T == "object" && T !== null) {
          switch (T.$$typeof) {
            case mi:
              return T.key === Z ? (Z = Pt(T._debugInfo), b = m(
                b,
                S,
                T,
                q
              ), me = Z, b) : null;
            case Zf:
              return T.key === Z ? p(b, S, T, q) : null;
            case yl:
              return Z = Pt(T._debugInfo), T = Pf(T), b = M(
                b,
                S,
                T,
                q
              ), me = Z, b;
          }
          if (ll(T) || Ke(T))
            return Z !== null ? null : (Z = Pt(T._debugInfo), b = R(
              b,
              S,
              T,
              q,
              null
            ), me = Z, b);
          if (typeof T.then == "function")
            return Z = Pt(T._debugInfo), b = M(
              b,
              S,
              ol(T),
              q
            ), me = Z, b;
          if (T.$$typeof === da)
            return M(
              b,
              S,
              bf(b, T),
              q
            );
          Mo(b, T);
        }
        return typeof T == "function" && Oo(b, T), typeof T == "symbol" && Uo(b, T), null;
      }
      function G(b, S, T, q, Z) {
        if (typeof q == "string" && q !== "" || typeof q == "number" || typeof q == "bigint")
          return b = b.get(T) || null, h(S, b, "" + q, Z);
        if (typeof q == "object" && q !== null) {
          switch (q.$$typeof) {
            case mi:
              return T = b.get(
                q.key === null ? T : q.key
              ) || null, b = Pt(q._debugInfo), S = m(
                S,
                T,
                q,
                Z
              ), me = b, S;
            case Zf:
              return b = b.get(
                q.key === null ? T : q.key
              ) || null, p(S, b, q, Z);
            case yl:
              var oe = Pt(q._debugInfo);
              return q = Pf(q), S = G(
                b,
                S,
                T,
                q,
                Z
              ), me = oe, S;
          }
          if (ll(q) || Ke(q))
            return T = b.get(T) || null, b = Pt(q._debugInfo), S = R(
              S,
              T,
              q,
              Z,
              null
            ), me = b, S;
          if (typeof q.then == "function")
            return oe = Pt(q._debugInfo), S = G(
              b,
              S,
              T,
              ol(q),
              Z
            ), me = oe, S;
          if (q.$$typeof === da)
            return G(
              b,
              S,
              T,
              bf(S, q),
              Z
            );
          Mo(S, q);
        }
        return typeof q == "function" && Oo(S, q), typeof q == "symbol" && Uo(S, q), null;
      }
      function F(b, S, T, q) {
        if (typeof T != "object" || T === null) return q;
        switch (T.$$typeof) {
          case mi:
          case Zf:
            kt(b, S, T);
            var Z = T.key;
            if (typeof Z != "string") break;
            if (q === null) {
              q = /* @__PURE__ */ new Set(), q.add(Z);
              break;
            }
            if (!q.has(Z)) {
              q.add(Z);
              break;
            }
            $(S, function() {
              console.error(
                "Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.",
                Z
              );
            });
            break;
          case yl:
            T = Pf(T), F(b, S, T, q);
        }
        return q;
      }
      function he(b, S, T, q) {
        for (var Z = null, oe = null, W = null, re = S, ye = S = 0, it = null; re !== null && ye < T.length; ye++) {
          re.index > ye ? (it = re, re = null) : it = re.sibling;
          var Nt = M(
            b,
            re,
            T[ye],
            q
          );
          if (Nt === null) {
            re === null && (re = it);
            break;
          }
          Z = F(
            b,
            Nt,
            T[ye],
            Z
          ), e && re && Nt.alternate === null && t(b, re), S = o(Nt, S, ye), W === null ? oe = Nt : W.sibling = Nt, W = Nt, re = it;
        }
        if (ye === T.length)
          return a(b, re), Re && Ea(b, ye), oe;
        if (re === null) {
          for (; ye < T.length; ye++)
            re = N(b, T[ye], q), re !== null && (Z = F(
              b,
              re,
              T[ye],
              Z
            ), S = o(
              re,
              S,
              ye
            ), W === null ? oe = re : W.sibling = re, W = re);
          return Re && Ea(b, ye), oe;
        }
        for (re = i(re); ye < T.length; ye++)
          it = G(
            re,
            b,
            ye,
            T[ye],
            q
          ), it !== null && (Z = F(
            b,
            it,
            T[ye],
            Z
          ), e && it.alternate !== null && re.delete(
            it.key === null ? ye : it.key
          ), S = o(
            it,
            S,
            ye
          ), W === null ? oe = it : W.sibling = it, W = it);
        return e && re.forEach(function(_c) {
          return t(b, _c);
        }), Re && Ea(b, ye), oe;
      }
      function Yt(b, S, T, q) {
        if (T == null)
          throw Error("An iterable object provided no iterator.");
        for (var Z = null, oe = null, W = S, re = S = 0, ye = null, it = null, Nt = T.next(); W !== null && !Nt.done; re++, Nt = T.next()) {
          W.index > re ? (ye = W, W = null) : ye = W.sibling;
          var _c = M(b, W, Nt.value, q);
          if (_c === null) {
            W === null && (W = ye);
            break;
          }
          it = F(
            b,
            _c,
            Nt.value,
            it
          ), e && W && _c.alternate === null && t(b, W), S = o(_c, S, re), oe === null ? Z = _c : oe.sibling = _c, oe = _c, W = ye;
        }
        if (Nt.done)
          return a(b, W), Re && Ea(b, re), Z;
        if (W === null) {
          for (; !Nt.done; re++, Nt = T.next())
            W = N(b, Nt.value, q), W !== null && (it = F(
              b,
              W,
              Nt.value,
              it
            ), S = o(
              W,
              S,
              re
            ), oe === null ? Z = W : oe.sibling = W, oe = W);
          return Re && Ea(b, re), Z;
        }
        for (W = i(W); !Nt.done; re++, Nt = T.next())
          ye = G(
            W,
            b,
            re,
            Nt.value,
            q
          ), ye !== null && (it = F(
            b,
            ye,
            Nt.value,
            it
          ), e && ye.alternate !== null && W.delete(
            ye.key === null ? re : ye.key
          ), S = o(
            ye,
            S,
            re
          ), oe === null ? Z = ye : oe.sibling = ye, oe = ye);
        return e && W.forEach(function(cb) {
          return t(b, cb);
        }), Re && Ea(b, re), Z;
      }
      function Ye(b, S, T, q) {
        if (typeof T == "object" && T !== null && T.type === xn && T.key === null && (br(T, null, b), T = T.props.children), typeof T == "object" && T !== null) {
          switch (T.$$typeof) {
            case mi:
              var Z = Pt(T._debugInfo);
              e: {
                for (var oe = T.key; S !== null; ) {
                  if (S.key === oe) {
                    if (oe = T.type, oe === xn) {
                      if (S.tag === 7) {
                        a(
                          b,
                          S.sibling
                        ), q = f(
                          S,
                          T.props.children
                        ), q.return = b, q._debugOwner = T._owner, q._debugInfo = me, br(T, q, b), b = q;
                        break e;
                      }
                    } else if (S.elementType === oe || f0(
                      S,
                      T
                    ) || typeof oe == "object" && oe !== null && oe.$$typeof === yl && Pf(oe) === S.type) {
                      a(
                        b,
                        S.sibling
                      ), q = f(S, T.props), lu(q, T), q.return = b, q._debugOwner = T._owner, q._debugInfo = me, b = q;
                      break e;
                    }
                    a(b, S);
                    break;
                  } else t(b, S);
                  S = S.sibling;
                }
                T.type === xn ? (q = gu(
                  T.props.children,
                  b.mode,
                  q,
                  T.key
                ), q.return = b, q._debugOwner = b, q._debugInfo = me, br(T, q, b), b = q) : (q = Mf(
                  T,
                  b.mode,
                  q
                ), lu(q, T), q.return = b, q._debugInfo = me, b = q);
              }
              return b = d(b), me = Z, b;
            case Zf:
              e: {
                for (Z = T, T = Z.key; S !== null; ) {
                  if (S.key === T)
                    if (S.tag === 4 && S.stateNode.containerInfo === Z.containerInfo && S.stateNode.implementation === Z.implementation) {
                      a(
                        b,
                        S.sibling
                      ), q = f(
                        S,
                        Z.children || []
                      ), q.return = b, b = q;
                      break e;
                    } else {
                      a(b, S);
                      break;
                    }
                  else t(b, S);
                  S = S.sibling;
                }
                q = es(
                  Z,
                  b.mode,
                  q
                ), q.return = b, b = q;
              }
              return d(b);
            case yl:
              return Z = Pt(T._debugInfo), T = Pf(T), b = Ye(
                b,
                S,
                T,
                q
              ), me = Z, b;
          }
          if (ll(T))
            return Z = Pt(T._debugInfo), b = he(
              b,
              S,
              T,
              q
            ), me = Z, b;
          if (Ke(T)) {
            if (Z = Pt(T._debugInfo), oe = Ke(T), typeof oe != "function")
              throw Error(
                "An object is not an iterable. This error is likely caused by a bug in React. Please file an issue."
              );
            var W = oe.call(T);
            return W === T ? (b.tag !== 0 || Object.prototype.toString.call(b.type) !== "[object GeneratorFunction]" || Object.prototype.toString.call(W) !== "[object Generator]") && (Vg || console.error(
              "Using Iterators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. You can also use an Iterable that can iterate multiple times over the same items."
            ), Vg = !0) : T.entries !== oe || Ep || (console.error(
              "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
            ), Ep = !0), b = Yt(
              b,
              S,
              W,
              q
            ), me = Z, b;
          }
          if (typeof T.then == "function")
            return Z = Pt(T._debugInfo), b = Ye(
              b,
              S,
              ol(T),
              q
            ), me = Z, b;
          if (T.$$typeof === da)
            return Ye(
              b,
              S,
              bf(b, T),
              q
            );
          Mo(b, T);
        }
        return typeof T == "string" && T !== "" || typeof T == "number" || typeof T == "bigint" ? (Z = "" + T, S !== null && S.tag === 6 ? (a(
          b,
          S.sibling
        ), q = f(S, Z), q.return = b, b = q) : (a(b, S), q = Ir(
          Z,
          b.mode,
          q
        ), q.return = b, q._debugOwner = b, q._debugInfo = me, b = q), d(b)) : (typeof T == "function" && Oo(b, T), typeof T == "symbol" && Uo(b, T), a(b, S));
      }
      return function(b, S, T, q) {
        var Z = me;
        me = null;
        try {
          bm = 0;
          var oe = Ye(
            b,
            S,
            T,
            q
          );
          return Jd = null, oe;
        } catch (it) {
          if (it === iv) throw it;
          var W = we(29, it, null, b.mode);
          W.lanes = q, W.return = b;
          var re = W._debugInfo = me;
          if (W._debugOwner = b._debugOwner, re != null) {
            for (var ye = re.length - 1; 0 <= ye; ye--)
              if (typeof re[ye].stack == "string") {
                W._debugOwner = re[ye];
                break;
              }
          }
          return W;
        } finally {
          me = Z;
        }
      };
    }
    function Tr(e, t) {
      var a = Ci;
      be(fv, a, e), be(kd, t, e), Ci = a | t.baseLanes;
    }
    function Vh(e) {
      be(fv, Ci, e), be(
        kd,
        kd.current,
        e
      );
    }
    function Xh(e) {
      Ci = fv.current, Ce(kd, e), Ce(fv, e);
    }
    function ta(e) {
      var t = e.alternate;
      be(
        nl,
        nl.current & $d,
        e
      ), be(Qn, e, e), Ui === null && (t === null || kd.current !== null || t.memoizedState !== null) && (Ui = e);
    }
    function Er(e) {
      if (e.tag === 22) {
        if (be(nl, nl.current, e), be(Qn, e, e), Ui === null) {
          var t = e.alternate;
          t !== null && t.memoizedState !== null && (Ui = e);
        }
      } else za(e);
    }
    function za(e) {
      be(nl, nl.current, e), be(
        Qn,
        Qn.current,
        e
      );
    }
    function Xa(e) {
      Ce(Qn, e), Ui === e && (Ui = null), Ce(nl, e);
    }
    function Ho(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === 13) {
          var a = t.memoizedState;
          if (a !== null && (a = a.dehydrated, a === null || a.data === Ks || a.data === Js))
            return t;
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
          if (t.flags & 128) return t;
        } else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return null;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return null;
    }
    function au() {
      return {
        controller: new QS(),
        data: /* @__PURE__ */ new Map(),
        refCount: 0
      };
    }
    function Aa(e) {
      e.controller.signal.aborted && console.warn(
        "A cache instance was retained after it was already freed. This likely indicates a bug in React."
      ), e.refCount++;
    }
    function Fi(e) {
      e.refCount--, 0 > e.refCount && console.warn(
        "A cache instance was released after it was already freed. This likely indicates a bug in React."
      ), e.refCount === 0 && jS(LS, function() {
        e.controller.abort();
      });
    }
    function m0(e, t) {
      if (Em === null) {
        var a = Em = [];
        zp = 0, qs = id(), Wd = {
          status: "pending",
          value: void 0,
          then: function(i) {
            a.push(i);
          }
        };
      }
      return zp++, t.then(Ju, Ju), t;
    }
    function Ju() {
      if (--zp === 0 && Em !== null) {
        Wd !== null && (Wd.status = "fulfilled");
        var e = Em;
        Em = null, qs = 0, Wd = null;
        for (var t = 0; t < e.length; t++) (0, e[t])();
      }
    }
    function v0(e, t) {
      var a = [], i = {
        status: "pending",
        value: null,
        reason: null,
        then: function(f) {
          a.push(f);
        }
      };
      return e.then(
        function() {
          i.status = "fulfilled", i.value = t;
          for (var f = 0; f < a.length; f++) (0, a[f])(t);
        },
        function(f) {
          for (i.status = "rejected", i.reason = f, f = 0; f < a.length; f++)
            (0, a[f])(void 0);
        }
      ), i;
    }
    function zr() {
      var e = Ys.current;
      return e !== null ? e : We.pooledCache;
    }
    function Co(e, t) {
      t === null ? be(Ys, Ys.current, e) : be(Ys, t.pool, e);
    }
    function p0() {
      var e = zr();
      return e === null ? null : { parent: il._currentValue, pool: e };
    }
    function ve() {
      var e = H;
      Zn === null ? Zn = [e] : Zn.push(e);
    }
    function Q() {
      var e = H;
      if (Zn !== null && (Gc++, Zn[Gc] !== e)) {
        var t = P(
          ce
        );
        if (!_g.has(t) && (_g.add(t), Zn !== null)) {
          for (var a = "", i = 0; i <= Gc; i++) {
            var f = Zn[i], o = i === Gc ? e : f;
            for (f = i + 1 + ". " + f; 30 > f.length; )
              f += " ";
            f += o + `
`, a += f;
          }
          console.error(
            `React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://react.dev/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`,
            t,
            a
          );
        }
      }
    }
    function Ii(e) {
      e == null || ll(e) || console.error(
        "%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.",
        H,
        typeof e
      );
    }
    function xo() {
      var e = P(ce);
      Kg.has(e) || (Kg.add(e), console.error(
        "ReactDOM.useFormState has been renamed to React.useActionState. Please update %s to use React.useActionState.",
        e
      ));
    }
    function st() {
      throw Error(
        `Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`
      );
    }
    function la(e, t) {
      if (Am) return !1;
      if (t === null)
        return console.error(
          "%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.",
          H
        ), !1;
      e.length !== t.length && console.error(
        `The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`,
        H,
        "[" + t.join(", ") + "]",
        "[" + e.join(", ") + "]"
      );
      for (var a = 0; a < t.length && a < e.length; a++)
        if (!va(e[a], t[a])) return !1;
      return !0;
    }
    function Ql(e, t, a, i, f, o) {
      eo = o, ce = t, Zn = e !== null ? e._debugHookTypes : null, Gc = -1, Am = e !== null && e.type !== t.type, (Object.prototype.toString.call(a) === "[object AsyncFunction]" || Object.prototype.toString.call(a) === "[object AsyncGeneratorFunction]") && (o = P(
        ce
      ), Ap.has(o) || (Ap.add(o), console.error(
        "async/await is not yet supported in Client Components, only Server Components. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server."
      ))), t.memoizedState = null, t.updateQueue = null, t.lanes = 0, U.H = e !== null && e.memoizedState !== null ? lo : Zn !== null ? Gs : to, Ns = o = (t.mode & Jl) !== lt;
      var d = bp(a, i, f);
      if (Ns = !1, Id && (d = Bo(
        t,
        a,
        i,
        f
      )), o) {
        je(!0);
        try {
          d = Bo(
            t,
            a,
            i,
            f
          );
        } finally {
          je(!1);
        }
      }
      return Pi(e, t), d;
    }
    function Pi(e, t) {
      t._debugHookTypes = Zn, t.dependencies === null ? Nc !== null && (t.dependencies = {
        lanes: 0,
        firstContext: null,
        _debugThenableState: Nc
      }) : t.dependencies._debugThenableState = Nc, U.H = Hi;
      var a = _e !== null && _e.next !== null;
      if (eo = 0, Zn = H = wt = _e = ce = null, Gc = -1, e !== null && (e.flags & 31457280) !== (t.flags & 31457280) && console.error(
        "Internal React error: Expected static flag was missing. Please notify the React team."
      ), ov = !1, zm = 0, Nc = null, a)
        throw Error(
          "Rendered fewer hooks than expected. This may be caused by an accidental early return statement."
        );
      e === null || gl || (e = e.dependencies, e !== null && Jo(e) && (gl = !0)), cv ? (cv = !1, e = !0) : e = !1, e && (t = P(t) || "Unknown", wg.has(t) || Ap.has(t) || (wg.add(t), console.error(
        "`use` was called from inside a try/catch block. This is not allowed and can lead to unexpected behavior. To handle errors triggered by `use`, wrap your component in a error boundary."
      )));
    }
    function Bo(e, t, a, i) {
      ce = e;
      var f = 0;
      do {
        if (Id && (Nc = null), zm = 0, Id = !1, f >= _S)
          throw Error(
            "Too many re-renders. React limits the number of renders to prevent an infinite loop."
          );
        if (f += 1, Am = !1, wt = _e = null, e.updateQueue != null) {
          var o = e.updateQueue;
          o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
        }
        Gc = -1, U.H = Vs, o = bp(t, a, i);
      } while (Id);
      return o;
    }
    function Ar() {
      var e = U.H, t = e.useState()[0];
      return t = typeof t.then == "function" ? sn(t) : t, e = e.useState()[0], (_e !== null ? _e.memoizedState : null) !== e && (ce.flags |= 1024), t;
    }
    function uf() {
      var e = sv !== 0;
      return sv = 0, e;
    }
    function qo(e, t, a) {
      t.updateQueue = e.updateQueue, t.flags = (t.mode & xu) !== lt ? t.flags & -201328645 : t.flags & -2053, e.lanes &= ~a;
    }
    function on(e) {
      if (ov) {
        for (e = e.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        ov = !1;
      }
      eo = 0, Zn = wt = _e = ce = null, Gc = -1, H = null, Id = !1, zm = sv = 0, Nc = null;
    }
    function Tl() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return wt === null ? ce.memoizedState = wt = e : wt = wt.next = e, wt;
    }
    function Me() {
      if (_e === null) {
        var e = ce.alternate;
        e = e !== null ? e.memoizedState : null;
      } else e = _e.next;
      var t = wt === null ? ce.memoizedState : wt.next;
      if (t !== null)
        wt = t, _e = e;
      else {
        if (e === null)
          throw ce.alternate === null ? Error(
            "Update hook called on initial render. This is likely a bug in React. Please file an issue."
          ) : Error("Rendered more hooks than during the previous render.");
        _e = e, e = {
          memoizedState: _e.memoizedState,
          baseState: _e.baseState,
          baseQueue: _e.baseQueue,
          queue: _e.queue,
          next: null
        }, wt === null ? ce.memoizedState = wt = e : wt = wt.next = e;
      }
      return wt;
    }
    function sn(e) {
      var t = zm;
      return zm += 1, Nc === null && (Nc = Yh()), e = d0(Nc, e, t), t = ce, (wt === null ? t.memoizedState : wt.next) === null && (t = t.alternate, U.H = t !== null && t.memoizedState !== null ? lo : to), e;
    }
    function nu(e) {
      if (e !== null && typeof e == "object") {
        if (typeof e.then == "function") return sn(e);
        if (e.$$typeof === da) return Je(e);
      }
      throw Error("An unsupported type was passed to use(): " + String(e));
    }
    function Vt(e) {
      var t = null, a = ce.updateQueue;
      if (a !== null && (t = a.memoCache), t == null) {
        var i = ce.alternate;
        i !== null && (i = i.updateQueue, i !== null && (i = i.memoCache, i != null && (t = {
          data: i.data.map(function(f) {
            return f.slice();
          }),
          index: 0
        })));
      }
      if (t == null && (t = { data: [], index: 0 }), a === null && (a = Dp(), ce.updateQueue = a), a.memoCache = t, a = t.data[t.index], a === void 0 || Am)
        for (a = t.data[t.index] = Array(e), i = 0; i < e; i++)
          a[i] = L0;
      else
        a.length !== e && console.error(
          "Expected a constant size argument for each invocation of useMemoCache. The previous cache was allocated with size %s but size %s was requested.",
          a.length,
          e
        );
      return t.index++, a;
    }
    function sl(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function ku(e, t, a) {
      var i = Tl();
      if (a !== void 0) {
        var f = a(t);
        if (Ns) {
          je(!0);
          try {
            a(t);
          } finally {
            je(!1);
          }
        }
      } else f = t;
      return i.memoizedState = i.baseState = f, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: f
      }, i.queue = e, e = e.dispatch = kh.bind(
        null,
        ce,
        e
      ), [i.memoizedState, e];
    }
    function uu(e) {
      var t = Me();
      return cf(t, _e, e);
    }
    function cf(e, t, a) {
      var i = e.queue;
      if (i === null)
        throw Error(
          "Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)"
        );
      i.lastRenderedReducer = a;
      var f = e.baseQueue, o = i.pending;
      if (o !== null) {
        if (f !== null) {
          var d = f.next;
          f.next = o.next, o.next = d;
        }
        t.baseQueue !== f && console.error(
          "Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."
        ), t.baseQueue = f = o, i.pending = null;
      }
      if (o = e.baseState, f === null) e.memoizedState = o;
      else {
        t = f.next;
        var h = d = null, m = null, p = t, R = !1;
        do {
          var N = p.lane & -536870913;
          if (N !== p.lane ? (Te & N) === N : (eo & N) === N) {
            var M = p.revertLane;
            if (M === 0)
              m !== null && (m = m.next = {
                lane: 0,
                revertLane: 0,
                action: p.action,
                hasEagerState: p.hasEagerState,
                eagerState: p.eagerState,
                next: null
              }), N === qs && (R = !0);
            else if ((eo & M) === M) {
              p = p.next, M === qs && (R = !0);
              continue;
            } else
              N = {
                lane: 0,
                revertLane: p.revertLane,
                action: p.action,
                hasEagerState: p.hasEagerState,
                eagerState: p.eagerState,
                next: null
              }, m === null ? (h = m = N, d = o) : m = m.next = N, ce.lanes |= M, uo |= M;
            N = p.action, Ns && a(o, N), o = p.hasEagerState ? p.eagerState : a(o, N);
          } else
            M = {
              lane: N,
              revertLane: p.revertLane,
              action: p.action,
              hasEagerState: p.hasEagerState,
              eagerState: p.eagerState,
              next: null
            }, m === null ? (h = m = M, d = o) : m = m.next = M, ce.lanes |= N, uo |= N;
          p = p.next;
        } while (p !== null && p !== t);
        if (m === null ? d = o : m.next = h, !va(o, e.memoizedState) && (gl = !0, R && (a = Wd, a !== null)))
          throw a;
        e.memoizedState = o, e.baseState = d, e.baseQueue = m, i.lastRenderedState = o;
      }
      return f === null && (i.lanes = 0), [e.memoizedState, i.dispatch];
    }
    function rl(e) {
      var t = Me(), a = t.queue;
      if (a === null)
        throw Error(
          "Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)"
        );
      a.lastRenderedReducer = e;
      var i = a.dispatch, f = a.pending, o = t.memoizedState;
      if (f !== null) {
        a.pending = null;
        var d = f = f.next;
        do
          o = e(o, d.action), d = d.next;
        while (d !== f);
        va(o, t.memoizedState) || (gl = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), a.lastRenderedState = o;
      }
      return [o, i];
    }
    function jl(e, t, a) {
      var i = ce, f = Tl();
      if (Re) {
        if (a === void 0)
          throw Error(
            "Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering."
          );
        var o = a();
        Fd || o === a() || (console.error(
          "The result of getServerSnapshot should be cached to avoid an infinite loop"
        ), Fd = !0);
      } else {
        if (o = t(), Fd || (a = t(), va(o, a) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), Fd = !0)), We === null)
          throw Error(
            "Expected a work-in-progress root. This is a bug in React. Please file an issue."
          );
        Te & 60 || dn(i, t, o);
      }
      return f.memoizedState = o, a = { value: o, getSnapshot: t }, f.queue = a, Iu(
        $u.bind(null, i, a, e),
        [e]
      ), i.flags |= 2048, lc(
        Ln | ul,
        hn.bind(
          null,
          i,
          a,
          o,
          t
        ),
        { destroy: void 0 },
        null
      ), o;
    }
    function rn(e, t, a) {
      var i = ce, f = Me(), o = Re;
      if (o) {
        if (a === void 0)
          throw Error(
            "Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering."
          );
        a = a();
      } else if (a = t(), !Fd) {
        var d = t();
        va(a, d) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), Fd = !0);
      }
      (d = !va(
        (_e || f).memoizedState,
        a
      )) && (f.memoizedState = a, gl = !0), f = f.queue;
      var h = $u.bind(null, i, f, e);
      if (Ut(2048, ul, h, [e]), f.getSnapshot !== t || d || wt !== null && wt.memoizedState.tag & Ln) {
        if (i.flags |= 2048, lc(
          Ln | ul,
          hn.bind(
            null,
            i,
            f,
            a,
            t
          ),
          { destroy: void 0 },
          null
        ), We === null)
          throw Error(
            "Expected a work-in-progress root. This is a bug in React. Please file an issue."
          );
        o || eo & 60 || dn(i, t, a);
      }
      return a;
    }
    function dn(e, t, a) {
      e.flags |= 16384, e = { getSnapshot: t, value: a }, t = ce.updateQueue, t === null ? (t = Dp(), ce.updateQueue = t, t.stores = [e]) : (a = t.stores, a === null ? t.stores = [e] : a.push(e));
    }
    function hn(e, t, a, i) {
      t.value = a, t.getSnapshot = i, Qh(t) && Dr(e);
    }
    function $u(e, t, a) {
      return a(function() {
        Qh(t) && Dr(e);
      });
    }
    function Qh(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var a = t();
        return !va(e, a);
      } catch {
        return !0;
      }
    }
    function Dr(e) {
      var t = It(e, 2);
      t !== null && Qe(t, e, 2);
    }
    function Yo(e) {
      var t = Tl();
      if (typeof e == "function") {
        var a = e;
        if (e = a(), Ns) {
          je(!0);
          try {
            a();
          } finally {
            je(!1);
          }
        }
      }
      return t.memoizedState = t.baseState = e, t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: sl,
        lastRenderedState: e
      }, t;
    }
    function el(e) {
      e = Yo(e);
      var t = e.queue, a = yf.bind(
        null,
        ce,
        t
      );
      return t.dispatch = a, [e.memoizedState, a];
    }
    function Ot(e) {
      var t = Tl();
      t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = a, t = Qo.bind(
        null,
        ce,
        !0,
        a
      ), a.dispatch = t, [e, t];
    }
    function De(e, t) {
      var a = Me();
      return Da(a, _e, e, t);
    }
    function Da(e, t, a, i) {
      return e.baseState = a, cf(
        e,
        _e,
        typeof i == "function" ? i : sl
      );
    }
    function Qa(e, t) {
      var a = Me();
      return _e !== null ? Da(a, _e, e, t) : (a.baseState = e, [e, a.queue.dispatch]);
    }
    function jh(e, t, a, i, f) {
      if (ou(e))
        throw Error("Cannot update form state while rendering.");
      if (e = t.action, e !== null) {
        var o = {
          payload: f,
          action: e,
          next: null,
          isTransition: !0,
          status: "pending",
          value: null,
          reason: null,
          listeners: [],
          then: function(d) {
            o.listeners.push(d);
          }
        };
        U.T !== null ? a(!0) : o.isTransition = !1, i(o), a = t.pending, a === null ? (o.next = t.pending = o, Wu(t, o)) : (o.next = a.next, t.pending = a.next = o);
      }
    }
    function Wu(e, t) {
      var a = t.action, i = t.payload, f = e.state;
      if (t.isTransition) {
        var o = U.T, d = {};
        U.T = d, U.T._updatedFibers = /* @__PURE__ */ new Set();
        try {
          var h = a(f, i), m = U.S;
          m !== null && m(d, h), Lh(e, t, h);
        } catch (p) {
          ec(e, t, p);
        } finally {
          U.T = o, o === null && d._updatedFibers && (e = d._updatedFibers.size, d._updatedFibers.clear(), 10 < e && console.warn(
            "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
          ));
        }
      } else
        try {
          d = a(f, i), Lh(e, t, d);
        } catch (p) {
          ec(e, t, p);
        }
    }
    function Lh(e, t, a) {
      a !== null && typeof a == "object" && typeof a.then == "function" ? (a.then(
        function(i) {
          Zh(e, t, i);
        },
        function(i) {
          return ec(e, t, i);
        }
      ), t.isTransition || console.error(
        "An async function was passed to useActionState, but it was dispatched outside of an action context. This is likely not what you intended. Either pass the dispatch function to an `action` prop, or dispatch manually inside `startTransition`"
      )) : Zh(e, t, a);
    }
    function Zh(e, t, a) {
      t.status = "fulfilled", t.value = a, ff(t), e.state = a, t = e.pending, t !== null && (a = t.next, a === t ? e.pending = null : (a = a.next, t.next = a, Wu(e, a)));
    }
    function ec(e, t, a) {
      var i = e.pending;
      if (e.pending = null, i !== null) {
        i = i.next;
        do
          t.status = "rejected", t.reason = a, ff(t), t = t.next;
        while (t !== i);
      }
      e.action = null;
    }
    function ff(e) {
      e = e.listeners;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
    function of(e, t) {
      return t;
    }
    function yn(e, t) {
      if (Re) {
        var a = We.formState;
        if (a !== null) {
          e: {
            var i = ce;
            if (Re) {
              if (Ml) {
                t: {
                  for (var f = Ml, o = Oi; f.nodeType !== 8; ) {
                    if (!o) {
                      f = null;
                      break t;
                    }
                    if (f = Zl(
                      f.nextSibling
                    ), f === null) {
                      f = null;
                      break t;
                    }
                  }
                  o = f.data, f = o === Ip || o === x1 ? f : null;
                }
                if (f) {
                  Ml = Zl(
                    f.nextSibling
                  ), i = f.data === Ip;
                  break e;
                }
              }
              Va(i);
            }
            i = !1;
          }
          i && (t = a[0]);
        }
      }
      return a = Tl(), a.memoizedState = a.baseState = t, i = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: of,
        lastRenderedState: t
      }, a.queue = i, a = yf.bind(
        null,
        ce,
        i
      ), i.dispatch = a, i = Yo(!1), o = Qo.bind(
        null,
        ce,
        !1,
        i.queue
      ), i = Tl(), f = {
        state: t,
        dispatch: null,
        action: e,
        pending: null
      }, i.queue = f, a = jh.bind(
        null,
        ce,
        f,
        o,
        a
      ), f.dispatch = a, i.memoizedState = e, [t, a, !1];
    }
    function No(e) {
      var t = Me();
      return Rr(t, _e, e);
    }
    function Rr(e, t, a) {
      t = cf(
        e,
        t,
        of
      )[0], e = uu(sl)[0], t = typeof t == "object" && t !== null && typeof t.then == "function" ? sn(t) : t;
      var i = Me(), f = i.queue, o = f.dispatch;
      return a !== i.memoizedState && (ce.flags |= 2048, lc(
        Ln | ul,
        g0.bind(null, f, a),
        { destroy: void 0 },
        null
      )), [t, o, e];
    }
    function g0(e, t) {
      e.action = t;
    }
    function tc(e) {
      var t = Me(), a = _e;
      if (a !== null)
        return Rr(t, a, e);
      Me(), t = t.memoizedState, a = Me();
      var i = a.queue.dispatch;
      return a.memoizedState = e, [t, i, !1];
    }
    function lc(e, t, a, i) {
      return e = { tag: e, create: t, inst: a, deps: i, next: null }, t = ce.updateQueue, t === null && (t = Dp(), ce.updateQueue = t), a = t.lastEffect, a === null ? t.lastEffect = e.next = e : (i = a.next, a.next = e, e.next = i, t.lastEffect = e), e;
    }
    function ac(e) {
      var t = Tl();
      return e = { current: e }, t.memoizedState = e;
    }
    function Fu(e, t, a, i) {
      var f = Tl();
      ce.flags |= e, f.memoizedState = lc(
        Ln | t,
        a,
        { destroy: void 0 },
        i === void 0 ? null : i
      );
    }
    function Ut(e, t, a, i) {
      var f = Me();
      i = i === void 0 ? null : i;
      var o = f.memoizedState.inst;
      _e !== null && i !== null && la(i, _e.memoizedState.deps) ? f.memoizedState = lc(t, a, o, i) : (ce.flags |= e, f.memoizedState = lc(
        Ln | t,
        a,
        o,
        i
      ));
    }
    function Iu(e, t) {
      (ce.mode & xu) !== lt && (ce.mode & zg) === lt ? Fu(142608384, ul, e, t) : Fu(8390656, ul, e, t);
    }
    function sf(e, t) {
      var a = 4194308;
      return (ce.mode & xu) !== lt && (a |= 67108864), Fu(a, Ol, e, t);
    }
    function rf(e, t) {
      if (typeof t == "function") {
        e = e();
        var a = t(e);
        return function() {
          typeof a == "function" ? a() : t(null);
        };
      }
      if (t != null)
        return t.hasOwnProperty("current") || console.error(
          "Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.",
          "an object with keys {" + Object.keys(t).join(", ") + "}"
        ), e = e(), t.current = e, function() {
          t.current = null;
        };
    }
    function df(e, t, a) {
      typeof t != "function" && console.error(
        "Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",
        t !== null ? typeof t : "null"
      ), a = a != null ? a.concat([e]) : null;
      var i = 4194308;
      (ce.mode & xu) !== lt && (i |= 67108864), Fu(
        i,
        Ol,
        rf.bind(null, t, e),
        a
      );
    }
    function Go(e, t, a) {
      typeof t != "function" && console.error(
        "Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",
        t !== null ? typeof t : "null"
      ), a = a != null ? a.concat([e]) : null, Ut(
        4,
        Ol,
        rf.bind(null, t, e),
        a
      );
    }
    function Mr(e, t) {
      return Tl().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    }
    function mn(e, t) {
      var a = Me();
      t = t === void 0 ? null : t;
      var i = a.memoizedState;
      return t !== null && la(t, i[1]) ? i[0] : (a.memoizedState = [e, t], e);
    }
    function Or(e, t) {
      var a = Tl();
      t = t === void 0 ? null : t;
      var i = e();
      if (Ns) {
        je(!0);
        try {
          e();
        } finally {
          je(!1);
        }
      }
      return a.memoizedState = [i, t], i;
    }
    function iu(e, t) {
      var a = Me();
      t = t === void 0 ? null : t;
      var i = a.memoizedState;
      if (t !== null && la(t, i[1]))
        return i[0];
      if (i = e(), Ns) {
        je(!0);
        try {
          e();
        } finally {
          je(!1);
        }
      }
      return a.memoizedState = [i, t], i;
    }
    function hf(e, t) {
      var a = Tl();
      return Vo(a, e, t);
    }
    function _h(e, t) {
      var a = Me();
      return aa(
        a,
        _e.memoizedState,
        e,
        t
      );
    }
    function Ur(e, t) {
      var a = Me();
      return _e === null ? Vo(a, e, t) : aa(
        a,
        _e.memoizedState,
        e,
        t
      );
    }
    function Vo(e, t, a) {
      return a === void 0 || eo & 1073741824 ? e.memoizedState = t : (e.memoizedState = a, e = Pr(), ce.lanes |= e, uo |= e, a);
    }
    function aa(e, t, a, i) {
      return va(a, t) ? a : kd.current !== null ? (e = Vo(e, a, i), va(e, t) || (gl = !0), e) : eo & 42 ? (e = Pr(), ce.lanes |= e, uo |= e, t) : (gl = !0, e.memoizedState = a);
    }
    function ja(e, t, a, i, f) {
      var o = Ze.p;
      Ze.p = o !== 0 && o < Ua ? o : Ua;
      var d = U.T, h = {};
      U.T = h, Qo(e, !1, t, a), h._updatedFibers = /* @__PURE__ */ new Set();
      try {
        var m = f(), p = U.S;
        if (p !== null && p(h, m), m !== null && typeof m == "object" && typeof m.then == "function") {
          var R = v0(
            m,
            i
          );
          fu(
            e,
            t,
            R,
            El(e)
          );
        } else
          fu(
            e,
            t,
            i,
            El(e)
          );
      } catch (N) {
        fu(
          e,
          t,
          { then: function() {
          }, status: "rejected", reason: N },
          El(e)
        );
      } finally {
        Ze.p = o, U.T = d, d === null && h._updatedFibers && (e = h._updatedFibers.size, h._updatedFibers.clear(), 10 < e && console.warn(
          "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
        ));
      }
    }
    function vn(e, t, a, i) {
      if (e.tag !== 5)
        throw Error(
          "Expected the form instance to be a HostComponent. This is a bug in React."
        );
      var f = wh(e).queue;
      ja(
        e,
        f,
        t,
        $s,
        a === null ? Kn : function() {
          return cu(e), a(i);
        }
      );
    }
    function wh(e) {
      var t = e.memoizedState;
      if (t !== null) return t;
      t = {
        memoizedState: $s,
        baseState: $s,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: sl,
          lastRenderedState: $s
        },
        next: null
      };
      var a = {};
      return t.next = {
        memoizedState: a,
        baseState: a,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: sl,
          lastRenderedState: a
        },
        next: null
      }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
    }
    function cu(e) {
      U.T === null && console.error(
        "requestFormReset was called outside a transition or action. To fix, move to an action, or wrap with startTransition."
      );
      var t = wh(e).next.queue;
      fu(
        e,
        t,
        {},
        El(e)
      );
    }
    function La() {
      var e = Yo(!1);
      return e = ja.bind(
        null,
        ce,
        e.queue,
        !0,
        !1
      ), Tl().memoizedState = e, [!1, e];
    }
    function St() {
      var e = uu(sl)[0], t = Me().memoizedState;
      return [
        typeof e == "boolean" ? e : sn(e),
        t
      ];
    }
    function Xo() {
      var e = rl(sl)[0], t = Me().memoizedState;
      return [
        typeof e == "boolean" ? e : sn(e),
        t
      ];
    }
    function nc() {
      return Je(Xm);
    }
    function Kh() {
      var e = Tl(), t = We.identifierPrefix;
      if (Re) {
        var a = qc, i = Bc;
        a = (i & ~(1 << 32 - pl(i) - 1)).toString(32) + a, t = ":" + t + "R" + a, a = sv++, 0 < a && (t += "H" + a.toString(32)), t += ":";
      } else
        a = ZS++, t = ":" + t + "r" + a.toString(32) + ":";
      return e.memoizedState = t;
    }
    function Jh() {
      return Tl().memoizedState = Ht.bind(
        null,
        ce
      );
    }
    function Ht(e, t) {
      for (var a = e.return; a !== null; ) {
        switch (a.tag) {
          case 24:
          case 3:
            var i = El(a);
            e = hu(i);
            var f = yu(a, e, i);
            f !== null && (Qe(f, a, i), ko(f, a, i)), a = au(), t != null && f !== null && console.error(
              "The seed argument is not enabled outside experimental channels."
            ), e.payload = { cache: a };
            return;
        }
        a = a.return;
      }
    }
    function kh(e, t, a, i) {
      typeof i == "function" && console.error(
        "State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."
      ), i = El(e), a = {
        lane: i,
        revertLane: 0,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      }, ou(e) ? uc(t, a) : (a = Oh(
        e,
        t,
        a,
        i
      ), a !== null && (Qe(
        a,
        e,
        i
      ), S0(
        a,
        t,
        i
      ))), Yl(e, i);
    }
    function yf(e, t, a, i) {
      typeof i == "function" && console.error(
        "State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."
      ), i = El(e), fu(
        e,
        t,
        a,
        i
      ), Yl(e, i);
    }
    function fu(e, t, a, i) {
      var f = {
        lane: i,
        revertLane: 0,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (ou(e)) uc(t, f);
      else {
        var o = e.alternate;
        if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) {
          var d = U.H;
          U.H = Sa;
          try {
            var h = t.lastRenderedState, m = o(h, a);
            if (f.hasEagerState = !0, f.eagerState = m, va(m, h))
              return vr(e, t, f, 0), We === null && mr(), !1;
          } catch {
          } finally {
            U.H = d;
          }
        }
        if (a = Oh(e, t, f, i), a !== null)
          return Qe(a, e, i), S0(a, t, i), !0;
      }
      return !1;
    }
    function Qo(e, t, a, i) {
      if (U.T === null && qs === 0 && console.error(
        "An optimistic state update occurred outside a transition or action. To fix, move the update to an action, or wrap with startTransition."
      ), i = {
        lane: 2,
        revertLane: id(),
        action: i,
        hasEagerState: !1,
        eagerState: null,
        next: null
      }, ou(e)) {
        if (t)
          throw Error("Cannot update optimistic state while rendering.");
        console.error("Cannot call startTransition while rendering.");
      } else
        t = Oh(
          e,
          a,
          i,
          2
        ), t !== null && Qe(t, e, 2);
      Yl(e, 2);
    }
    function ou(e) {
      var t = e.alternate;
      return e === ce || t !== null && t === ce;
    }
    function uc(e, t) {
      Id = ov = !0;
      var a = e.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
    }
    function S0(e, t, a) {
      if (a & 4194176) {
        var i = t.lanes;
        i &= e.pendingLanes, a |= i, t.lanes = a, Nl(e, a);
      }
    }
    function Hr(e) {
      if (e !== null && typeof e != "function") {
        var t = String(e);
        a1.has(t) || (a1.add(t), console.error(
          "Expected the last optional `callback` argument to be a function. Instead received: %s.",
          e
        ));
      }
    }
    function $h(e, t, a, i) {
      var f = e.memoizedState, o = a(i, f);
      if (e.mode & Jl) {
        je(!0);
        try {
          o = a(i, f);
        } finally {
          je(!1);
        }
      }
      o === void 0 && (t = ne(t) || "Component", Pg.has(t) || (Pg.add(t), console.error(
        "%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.",
        t
      ))), f = o == null ? f : se({}, f, o), e.memoizedState = f, e.lanes === 0 && (e.updateQueue.baseState = f);
    }
    function Wh(e, t, a, i, f, o, d) {
      var h = e.stateNode;
      if (typeof h.shouldComponentUpdate == "function") {
        if (a = h.shouldComponentUpdate(
          i,
          o,
          d
        ), e.mode & Jl) {
          je(!0);
          try {
            a = h.shouldComponentUpdate(
              i,
              o,
              d
            );
          } finally {
            je(!1);
          }
        }
        return a === void 0 && console.error(
          "%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.",
          ne(t) || "Component"
        ), a;
      }
      return t.prototype && t.prototype.isPureReactComponent ? !zo(a, i) || !zo(f, o) : !0;
    }
    function Pu(e, t, a, i) {
      var f = t.state;
      typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, i), t.state !== f && (e = P(e) || "Component", kg.has(e) || (kg.add(e), console.error(
        "%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",
        e
      )), Rp.enqueueReplaceState(
        t,
        t.state,
        null
      ));
    }
    function su(e, t) {
      var a = t;
      if ("ref" in t) {
        a = {};
        for (var i in t)
          i !== "ref" && (a[i] = t[i]);
      }
      if (e = e.defaultProps) {
        a === t && (a = se({}, a));
        for (var f in e)
          a[f] === void 0 && (a[f] = e[f]);
      }
      return a;
    }
    function jo(e, t) {
      rv(e), e = Pd ? "An error occurred in the <" + Pd + "> component." : "An error occurred in one of your React components.";
      var a = U.getCurrentStack, i = t.componentStack != null ? t.componentStack : "";
      U.getCurrentStack = function() {
        return i;
      };
      try {
        console.warn(
          `%s

%s
`,
          e,
          `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://react.dev/link/error-boundaries to learn more about error boundaries.`
        );
      } finally {
        U.getCurrentStack = a;
      }
    }
    function Fh(e, t) {
      var a = Pd ? "The above error occurred in the <" + Pd + "> component." : "The above error occurred in one of your React components.", i = "React will try to recreate this component tree from scratch using the error boundary you provided, " + ((Mp || "Anonymous") + "."), f = U.getCurrentStack, o = t.componentStack != null ? t.componentStack : "";
      U.getCurrentStack = function() {
        return o;
      };
      try {
        typeof e == "object" && e !== null && typeof e.environmentName == "string" ? Vf(
          "error",
          [
            `%o

%s

%s
`,
            e,
            a,
            i
          ],
          e.environmentName
        )() : console.error(
          `%o

%s

%s
`,
          e,
          a,
          i
        );
      } finally {
        U.getCurrentStack = f;
      }
    }
    function ru(e) {
      rv(e);
    }
    function fe(e, t) {
      try {
        Pd = t.source ? P(t.source) : null, Mp = null;
        var a = t.value;
        if (U.actQueue !== null)
          U.thrownErrors.push(a);
        else {
          var i = e.onUncaughtError;
          i(a, { componentStack: t.stack });
        }
      } catch (f) {
        setTimeout(function() {
          throw f;
        });
      }
    }
    function xe(e, t, a) {
      try {
        Pd = a.source ? P(a.source) : null, Mp = P(t);
        var i = e.onCaughtError;
        i(a.value, {
          componentStack: a.stack,
          errorBoundary: t.tag === 1 ? t.stateNode : null
        });
      } catch (f) {
        setTimeout(function() {
          throw f;
        });
      }
    }
    function rt(e, t, a) {
      return a = hu(a), a.tag = xp, a.payload = { element: null }, a.callback = function() {
        $(t.source, fe, e, t);
      }, a;
    }
    function mf(e) {
      return e = hu(e), e.tag = xp, e;
    }
    function ei(e, t, a, i) {
      var f = a.type.getDerivedStateFromError;
      if (typeof f == "function") {
        var o = i.value;
        e.payload = function() {
          return f(o);
        }, e.callback = function() {
          o0(a), $(
            i.source,
            xe,
            t,
            a,
            i
          );
        };
      }
      var d = a.stateNode;
      d !== null && typeof d.componentDidCatch == "function" && (e.callback = function() {
        o0(a), $(
          i.source,
          xe,
          t,
          a,
          i
        ), typeof f != "function" && (co === null ? co = /* @__PURE__ */ new Set([this]) : co.add(this)), GS(this, i), typeof f == "function" || !(a.lanes & 2) && console.error(
          "%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.",
          P(a) || "Unknown"
        );
      });
    }
    function ic(e, t, a, i, f) {
      if (a.flags |= 32768, Dl && Ie(e, f), i !== null && typeof i == "object" && typeof i.then == "function") {
        if (t = a.alternate, t !== null && Ko(
          t,
          a,
          f,
          !0
        ), Re && (Yc = !0), a = Qn.current, a !== null) {
          switch (a.tag) {
            case 13:
              return Ui === null ? ns() : a.alternate === null && Et === Qc && (Et = Np), a.flags &= -257, a.flags |= 65536, a.lanes = f, i === Sp ? a.flags |= 16384 : (t = a.updateQueue, t === null ? a.updateQueue = /* @__PURE__ */ new Set([i]) : t.add(i), Ka(e, i, f)), !1;
            case 22:
              return a.flags |= 65536, i === Sp ? a.flags |= 16384 : (t = a.updateQueue, t === null ? (t = {
                transitions: null,
                markerInstances: null,
                retryQueue: /* @__PURE__ */ new Set([i])
              }, a.updateQueue = t) : (a = t.retryQueue, a === null ? t.retryQueue = /* @__PURE__ */ new Set([i]) : a.add(i)), Ka(e, i, f)), !1;
          }
          throw Error(
            "Unexpected Suspense handler tag (" + a.tag + "). This is a bug in React."
          );
        }
        return Ka(e, i, f), ns(), !1;
      }
      if (Re)
        return Yc = !0, t = Qn.current, t !== null ? (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = f, i !== gp && Wi(
          Xl(
            Error(
              "There was an error while hydrating but React was able to recover by instead client rendering from the nearest Suspense boundary.",
              { cause: i }
            ),
            a
          )
        )) : (i !== gp && Wi(
          Xl(
            Error(
              "There was an error while hydrating but React was able to recover by instead client rendering the entire root.",
              { cause: i }
            ),
            a
          )
        ), e = e.current.alternate, e.flags |= 65536, f &= -f, e.lanes |= f, i = Xl(i, a), f = rt(
          e.stateNode,
          i,
          f
        ), $o(e, f), Et !== Xs && (Et = uh)), !1;
      var o = Xl(
        Error(
          "There was an error during concurrent rendering but React was able to recover by instead synchronously rendering the entire root.",
          { cause: i }
        ),
        a
      );
      if (Cm === null ? Cm = [o] : Cm.push(o), Et !== Xs && (Et = uh), t === null) return !0;
      i = Xl(i, a), a = t;
      do {
        switch (a.tag) {
          case 3:
            return a.flags |= 65536, e = f & -f, a.lanes |= e, e = rt(
              a.stateNode,
              i,
              e
            ), $o(a, e), !1;
          case 1:
            if (t = a.type, o = a.stateNode, (a.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (co === null || !co.has(o))))
              return a.flags |= 65536, f &= -f, a.lanes |= f, f = mf(f), ei(
                f,
                e,
                a,
                i
              ), $o(a, f), !1;
        }
        a = a.return;
      } while (a !== null);
      return !1;
    }
    function bt(e, t, a, i) {
      t.child = e === null ? Lg(t, null, a, i) : Bs(
        t,
        e.child,
        a,
        i
      );
    }
    function vf(e, t, a, i, f) {
      a = a.render;
      var o = t.ref;
      if ("ref" in i) {
        var d = {};
        for (var h in i)
          h !== "ref" && (d[h] = i[h]);
      } else d = i;
      return ti(t), qi(t), i = Ql(
        e,
        t,
        a,
        d,
        o,
        f
      ), h = uf(), Vu(), e !== null && !gl ? (qo(e, t, f), Za(e, t, f)) : (Re && h && Bh(t), t.flags |= 1, bt(e, t, i, f), t.child);
    }
    function cc(e, t, a, i, f) {
      if (e === null) {
        var o = a.type;
        return typeof o == "function" && !Po(o) && o.defaultProps === void 0 && a.compare === null ? (a = Ki(o), t.tag = 15, t.type = a, Lo(t, o), b0(
          e,
          t,
          a,
          i,
          f
        )) : (e = Wr(
          a.type,
          null,
          i,
          t,
          t.mode,
          f
        ), e.ref = t.ref, e.return = t, t.child = e);
      }
      if (o = e.child, !Nr(e, f)) {
        var d = o.memoizedProps;
        if (a = a.compare, a = a !== null ? a : zo, a(d, i) && e.ref === t.ref)
          return Za(
            e,
            t,
            f
          );
      }
      return t.flags |= 1, e = bn(o, i), e.ref = t.ref, e.return = t, t.child = e;
    }
    function b0(e, t, a, i, f) {
      if (e !== null) {
        var o = e.memoizedProps;
        if (zo(o, i) && e.ref === t.ref && t.type === e.type)
          if (gl = !1, t.pendingProps = i = o, Nr(e, f))
            e.flags & 131072 && (gl = !0);
          else
            return t.lanes = e.lanes, Za(e, t, f);
      }
      return xr(
        e,
        t,
        a,
        i,
        f
      );
    }
    function dt(e, t, a) {
      var i = t.pendingProps, f = i.children, o = (t.stateNode._pendingVisibility & dm) !== 0, d = e !== null ? e.memoizedState : null;
      if (fc(e, t), i.mode === "hidden" || o) {
        if (t.flags & 128) {
          if (i = d !== null ? d.baseLanes | a : a, e !== null) {
            for (f = t.child = e.child, o = 0; f !== null; )
              o = o | f.lanes | f.childLanes, f = f.sibling;
            t.childLanes = o & ~i;
          } else t.childLanes = 0, t.child = null;
          return Cr(
            e,
            t,
            i,
            a
          );
        }
        if (a & 536870912)
          t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Co(
            t,
            d !== null ? d.cachePool : null
          ), d !== null ? Tr(t, d) : Vh(t), Er(t);
        else
          return t.lanes = t.childLanes = 536870912, Cr(
            e,
            t,
            d !== null ? d.baseLanes | a : a,
            a
          );
      } else
        d !== null ? (Co(t, d.cachePool), Tr(t, d), za(t), t.memoizedState = null) : (e !== null && Co(t, null), Vh(t), za(t));
      return bt(e, t, f, a), t.child;
    }
    function Cr(e, t, a, i) {
      var f = zr();
      return f = f === null ? null : {
        parent: il._currentValue,
        pool: f
      }, t.memoizedState = {
        baseLanes: a,
        cachePool: f
      }, e !== null && Co(t, null), Vh(t), Er(t), e !== null && Ko(e, t, i, !0), null;
    }
    function fc(e, t) {
      var a = t.ref;
      if (a === null)
        e !== null && e.ref !== null && (t.flags |= 2097664);
      else {
        if (typeof a != "function" && typeof a != "object")
          throw Error(
            "Expected ref to be a function, an object returned by React.createRef(), or undefined/null."
          );
        (e === null || e.ref !== a) && (t.flags |= 2097664);
      }
    }
    function xr(e, t, a, i, f) {
      if (a.prototype && typeof a.prototype.render == "function") {
        var o = ne(a) || "Unknown";
        u1[o] || (console.error(
          "The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.",
          o,
          o
        ), u1[o] = !0);
      }
      return t.mode & Jl && Bu.recordLegacyContextWarning(
        t,
        null
      ), e === null && (Lo(t, t.type), a.contextTypes && (o = ne(a) || "Unknown", c1[o] || (c1[o] = !0, console.error(
        "%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with React.useContext() instead. (https://react.dev/link/legacy-context)",
        o
      )))), ti(t), qi(t), a = Ql(
        e,
        t,
        a,
        i,
        void 0,
        f
      ), i = uf(), Vu(), e !== null && !gl ? (qo(e, t, f), Za(e, t, f)) : (Re && i && Bh(t), t.flags |= 1, bt(e, t, a, f), t.child);
    }
    function Ih(e, t, a, i, f, o) {
      return ti(t), qi(t), Gc = -1, Am = e !== null && e.type !== t.type, t.updateQueue = null, a = Bo(
        t,
        i,
        a,
        f
      ), Pi(e, t), i = uf(), Vu(), e !== null && !gl ? (qo(e, t, o), Za(e, t, o)) : (Re && i && Bh(t), t.flags |= 1, bt(e, t, a, o), t.child);
    }
    function T0(e, t, a, i, f) {
      switch (bl(t)) {
        case !1:
          var o = t.stateNode, d = new t.type(
            t.memoizedProps,
            o.context
          ).state;
          o.updater.enqueueSetState(o, d, null);
          break;
        case !0:
          t.flags |= 128, t.flags |= 65536, o = Error("Simulated error coming from DevTools");
          var h = f & -f;
          if (t.lanes |= h, d = We, d === null)
            throw Error(
              "Expected a work-in-progress root. This is a bug in React. Please file an issue."
            );
          h = mf(h), ei(
            h,
            d,
            t,
            Xl(o, t)
          ), $o(t, h);
      }
      if (ti(t), t.stateNode === null) {
        if (d = If, o = a.contextType, "contextType" in a && o !== null && (o === void 0 || o.$$typeof !== da) && !l1.has(a) && (l1.add(a), h = o === void 0 ? " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof o != "object" ? " However, it is set to a " + typeof o + "." : o.$$typeof === vs ? " Did you accidentally pass the Context.Consumer instead?" : " However, it is set to an object with keys {" + Object.keys(o).join(", ") + "}.", console.error(
          "%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s",
          ne(a) || "Component",
          h
        )), typeof o == "object" && o !== null && (d = Je(o)), o = new a(i, d), t.mode & Jl) {
          je(!0);
          try {
            o = new a(i, d);
          } finally {
            je(!1);
          }
        }
        if (d = t.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null, o.updater = Rp, t.stateNode = o, o._reactInternals = t, o._reactInternalInstance = Jg, typeof a.getDerivedStateFromProps == "function" && d === null && (d = ne(a) || "Component", $g.has(d) || ($g.add(d), console.error(
          "`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.",
          d,
          o.state === null ? "null" : "undefined",
          d
        ))), typeof a.getDerivedStateFromProps == "function" || typeof o.getSnapshotBeforeUpdate == "function") {
          var m = h = d = null;
          if (typeof o.componentWillMount == "function" && o.componentWillMount.__suppressDeprecationWarning !== !0 ? d = "componentWillMount" : typeof o.UNSAFE_componentWillMount == "function" && (d = "UNSAFE_componentWillMount"), typeof o.componentWillReceiveProps == "function" && o.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? h = "componentWillReceiveProps" : typeof o.UNSAFE_componentWillReceiveProps == "function" && (h = "UNSAFE_componentWillReceiveProps"), typeof o.componentWillUpdate == "function" && o.componentWillUpdate.__suppressDeprecationWarning !== !0 ? m = "componentWillUpdate" : typeof o.UNSAFE_componentWillUpdate == "function" && (m = "UNSAFE_componentWillUpdate"), d !== null || h !== null || m !== null) {
            o = ne(a) || "Component";
            var p = typeof a.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            Fg.has(o) || (Fg.add(o), console.error(
              `Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://react.dev/link/unsafe-component-lifecycles`,
              o,
              p,
              d !== null ? `
  ` + d : "",
              h !== null ? `
  ` + h : "",
              m !== null ? `
  ` + m : ""
            ));
          }
        }
        o = t.stateNode, d = ne(a) || "Component", o.render || (a.prototype && typeof a.prototype.render == "function" ? console.error(
          "No `render` method found on the %s instance: did you accidentally return an object from the constructor?",
          d
        ) : console.error(
          "No `render` method found on the %s instance: you may have forgotten to define `render`.",
          d
        )), !o.getInitialState || o.getInitialState.isReactClassApproved || o.state || console.error(
          "getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?",
          d
        ), o.getDefaultProps && !o.getDefaultProps.isReactClassApproved && console.error(
          "getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.",
          d
        ), o.contextType && console.error(
          "contextType was defined as an instance property on %s. Use a static property to define contextType instead.",
          d
        ), a.childContextTypes && !t1.has(a) && (t1.add(a), console.error(
          "%s uses the legacy childContextTypes API which was removed in React 19. Use React.createContext() instead. (https://react.dev/link/legacy-context)",
          d
        )), a.contextTypes && !e1.has(a) && (e1.add(a), console.error(
          "%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with static contextType instead. (https://react.dev/link/legacy-context)",
          d
        )), typeof o.componentShouldUpdate == "function" && console.error(
          "%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.",
          d
        ), a.prototype && a.prototype.isPureReactComponent && typeof o.shouldComponentUpdate < "u" && console.error(
          "%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.",
          ne(a) || "A pure component"
        ), typeof o.componentDidUnmount == "function" && console.error(
          "%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?",
          d
        ), typeof o.componentDidReceiveProps == "function" && console.error(
          "%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().",
          d
        ), typeof o.componentWillRecieveProps == "function" && console.error(
          "%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?",
          d
        ), typeof o.UNSAFE_componentWillRecieveProps == "function" && console.error(
          "%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?",
          d
        ), h = o.props !== i, o.props !== void 0 && h && console.error(
          "When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.",
          d
        ), o.defaultProps && console.error(
          "Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.",
          d,
          d
        ), typeof o.getSnapshotBeforeUpdate != "function" || typeof o.componentDidUpdate == "function" || Wg.has(a) || (Wg.add(a), console.error(
          "%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.",
          ne(a)
        )), typeof o.getDerivedStateFromProps == "function" && console.error(
          "%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.",
          d
        ), typeof o.getDerivedStateFromError == "function" && console.error(
          "%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.",
          d
        ), typeof a.getSnapshotBeforeUpdate == "function" && console.error(
          "%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.",
          d
        ), (h = o.state) && (typeof h != "object" || ll(h)) && console.error("%s.state: must be set to an object or null", d), typeof o.getChildContext == "function" && typeof a.childContextTypes != "object" && console.error(
          "%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().",
          d
        ), o = t.stateNode, o.props = i, o.state = t.memoizedState, o.refs = {}, Xr(t), d = a.contextType, o.context = typeof d == "object" && d !== null ? Je(d) : If, o.state === i && (d = ne(a) || "Component", Ig.has(d) || (Ig.add(d), console.error(
          "%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.",
          d
        ))), t.mode & Jl && Bu.recordLegacyContextWarning(
          t,
          o
        ), Bu.recordUnsafeLifecycleWarnings(
          t,
          o
        ), o.state = t.memoizedState, d = a.getDerivedStateFromProps, typeof d == "function" && ($h(
          t,
          a,
          d,
          i
        ), o.state = t.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof o.getSnapshotBeforeUpdate == "function" || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (d = o.state, typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount(), d !== o.state && (console.error(
          "%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",
          P(t) || "Component"
        ), Rp.enqueueReplaceState(
          o,
          o.state,
          null
        )), Tf(t, i, o, f), Sn(), o.state = t.memoizedState), typeof o.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & xu) !== lt && (t.flags |= 67108864), o = !0;
      } else if (e === null) {
        o = t.stateNode;
        var R = t.memoizedProps;
        h = su(a, R), o.props = h;
        var N = o.context;
        m = a.contextType, d = If, typeof m == "object" && m !== null && (d = Je(m)), p = a.getDerivedStateFromProps, m = typeof p == "function" || typeof o.getSnapshotBeforeUpdate == "function", R = t.pendingProps !== R, m || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (R || N !== d) && Pu(
          t,
          o,
          i,
          d
        ), no = !1;
        var M = t.memoizedState;
        o.state = M, Tf(t, i, o, f), Sn(), N = t.memoizedState, R || M !== N || no ? (typeof p == "function" && ($h(
          t,
          a,
          p,
          i
        ), N = t.memoizedState), (h = no || Wh(
          t,
          a,
          h,
          i,
          M,
          N,
          d
        )) ? (m || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & xu) !== lt && (t.flags |= 67108864)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & xu) !== lt && (t.flags |= 67108864), t.memoizedProps = i, t.memoizedState = N), o.props = i, o.state = N, o.context = d, o = h) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & xu) !== lt && (t.flags |= 67108864), o = !1);
      } else {
        o = t.stateNode, Qr(e, t), d = t.memoizedProps, m = su(a, d), o.props = m, p = t.pendingProps, M = o.context, N = a.contextType, h = If, typeof N == "object" && N !== null && (h = Je(N)), R = a.getDerivedStateFromProps, (N = typeof R == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (d !== p || M !== h) && Pu(
          t,
          o,
          i,
          h
        ), no = !1, M = t.memoizedState, o.state = M, Tf(t, i, o, f), Sn();
        var G = t.memoizedState;
        d !== p || M !== G || no || e !== null && e.dependencies !== null && Jo(e.dependencies) ? (typeof R == "function" && ($h(
          t,
          a,
          R,
          i
        ), G = t.memoizedState), (m = no || Wh(
          t,
          a,
          m,
          i,
          M,
          G,
          h
        ) || e !== null && e.dependencies !== null && Jo(e.dependencies)) ? (N || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(i, G, h), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(
          i,
          G,
          h
        )), typeof o.componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || d === e.memoizedProps && M === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && M === e.memoizedState || (t.flags |= 1024), t.memoizedProps = i, t.memoizedState = G), o.props = i, o.state = G, o.context = h, o = m) : (typeof o.componentDidUpdate != "function" || d === e.memoizedProps && M === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && M === e.memoizedState || (t.flags |= 1024), o = !1);
      }
      if (h = o, fc(e, t), d = (t.flags & 128) !== 0, h || d) {
        if (h = t.stateNode, U.getCurrentStack = t === null ? null : Wl, ha = !1, ml = t, d && typeof a.getDerivedStateFromError != "function")
          a = null, Ha = -1;
        else {
          if (qi(t), a = Og(h), t.mode & Jl) {
            je(!0);
            try {
              Og(h);
            } finally {
              je(!1);
            }
          }
          Vu();
        }
        t.flags |= 1, e !== null && d ? (t.child = Bs(
          t,
          e.child,
          null,
          f
        ), t.child = Bs(
          t,
          null,
          a,
          f
        )) : bt(
          e,
          t,
          a,
          f
        ), t.memoizedState = h.state, e = t.child;
      } else
        e = Za(
          e,
          t,
          f
        );
      return f = t.stateNode, o && f.props !== i && (eh || console.error(
        "It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.",
        P(t) || "a component"
      ), eh = !0), e;
    }
    function Br(e, t, a, i) {
      return nf(), t.flags |= 256, bt(e, t, a, i), t.child;
    }
    function Lo(e, t) {
      t && t.childContextTypes && console.error(
        `childContextTypes cannot be defined on a function component.
  %s.childContextTypes = ...`,
        t.displayName || t.name || "Component"
      ), typeof t.getDerivedStateFromProps == "function" && (e = ne(t) || "Unknown", f1[e] || (console.error(
        "%s: Function components do not support getDerivedStateFromProps.",
        e
      ), f1[e] = !0)), typeof t.contextType == "object" && t.contextType !== null && (t = ne(t) || "Unknown", i1[t] || (console.error(
        "%s: Function components do not support contextType.",
        t
      ), i1[t] = !0));
    }
    function Zo(e) {
      return { baseLanes: e, cachePool: p0() };
    }
    function dl(e, t, a) {
      return e = e !== null ? e.childLanes & ~a : 0, t && (e |= tn), e;
    }
    function pt(e, t, a) {
      var i, f = t.pendingProps;
      kl(t) && (t.flags |= 128);
      var o = !1, d = (t.flags & 128) !== 0;
      if ((i = d) || (i = e !== null && e.memoizedState === null ? !1 : (nl.current & Tm) !== 0), i && (o = !0, t.flags &= -129), i = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
        if (Re) {
          if (o ? ta(t) : za(t), Re) {
            var h = Ml, m;
            if (!(m = !h)) {
              e: {
                var p = h;
                for (m = Oi; p.nodeType !== 8; ) {
                  if (!m) {
                    m = null;
                    break e;
                  }
                  if (p = Zl(p.nextSibling), p === null) {
                    m = null;
                    break e;
                  }
                }
                m = p;
              }
              m !== null ? (wu(), t.memoizedState = {
                dehydrated: m,
                treeContext: xs !== null ? { id: Bc, overflow: qc } : null,
                retryLane: 536870912
              }, p = we(18, null, null, lt), p.stateNode = m, p.return = t, t.child = p, pa = t, Ml = null, m = !0) : m = !1, m = !m;
            }
            m && ($i(
              t,
              h
            ), Va(t));
          }
          if (h = t.memoizedState, h !== null && (h = h.dehydrated, h !== null))
            return h.data === Js ? t.lanes = 16 : t.lanes = 536870912, null;
          Xa(t);
        }
        return h = f.children, f = f.fallback, o ? (za(t), o = t.mode, h = oc(
          {
            mode: "hidden",
            children: h
          },
          o
        ), f = gu(
          f,
          o,
          a,
          null
        ), h.return = t, f.return = t, h.sibling = f, t.child = h, o = t.child, o.memoizedState = Zo(a), o.childLanes = dl(
          e,
          i,
          a
        ), t.memoizedState = Up, f) : (ta(t), pf(
          t,
          h
        ));
      }
      var R = e.memoizedState;
      if (R !== null && (h = R.dehydrated, h !== null)) {
        if (d)
          t.flags & 256 ? (ta(t), t.flags &= -257, t = gf(
            e,
            t,
            a
          )) : t.memoizedState !== null ? (za(t), t.child = e.child, t.flags |= 128, t = null) : (za(t), o = f.fallback, h = t.mode, f = oc(
            {
              mode: "visible",
              children: f.children
            },
            h
          ), o = gu(
            o,
            h,
            a,
            null
          ), o.flags |= 2, f.return = t, o.return = t, f.sibling = o, t.child = f, Bs(
            t,
            e.child,
            null,
            a
          ), f = t.child, f.memoizedState = Zo(a), f.childLanes = dl(
            e,
            i,
            a
          ), t.memoizedState = Up, t = o);
        else if (ta(t), Re && console.error(
          "We should not be hydrating here. This is a bug in React. Please file a bug."
        ), h.data === Js) {
          if (i = h.nextSibling && h.nextSibling.dataset, i) {
            m = i.dgst;
            var N = i.msg;
            p = i.stck;
            var M = i.cstck;
          }
          h = N, i = m, f = p, m = o = M, o = Error(h || "The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering."), o.stack = f || "", o.digest = i, i = m === void 0 ? null : m, f = {
            value: o,
            source: null,
            stack: i
          }, typeof i == "string" && pp.set(
            o,
            f
          ), Wi(f), t = gf(
            e,
            t,
            a
          );
        } else if (gl || Ko(
          e,
          t,
          a,
          !1
        ), i = (a & e.childLanes) !== 0, gl || i) {
          if (i = We, i !== null) {
            if (f = a & -a, f & 42)
              f = 1;
            else
              switch (f) {
                case 2:
                  f = 1;
                  break;
                case 8:
                  f = 4;
                  break;
                case 32:
                  f = 16;
                  break;
                case 128:
                case 256:
                case 512:
                case 1024:
                case 2048:
                case 4096:
                case 8192:
                case 16384:
                case 32768:
                case 65536:
                case 131072:
                case 262144:
                case 524288:
                case 1048576:
                case 2097152:
                case 4194304:
                case 8388608:
                case 16777216:
                case 33554432:
                  f = 64;
                  break;
                case 268435456:
                  f = 134217728;
                  break;
                default:
                  f = 0;
              }
            if (f = f & (i.suspendedLanes | a) ? 0 : f, f !== 0 && f !== R.retryLane)
              throw R.retryLane = f, It(
                e,
                f
              ), Qe(
                i,
                e,
                f
              ), n1;
          }
          h.data === Ks || ns(), t = gf(
            e,
            t,
            a
          );
        } else
          h.data === Ks ? (t.flags |= 128, t.child = e.child, t = H0.bind(
            null,
            e
          ), h._reactRetry = t, t = null) : (e = R.treeContext, Ml = Zl(
            h.nextSibling
          ), pa = t, Re = !0, qu = null, Yc = !1, Xn = null, Oi = !1, e !== null && (wu(), Gn[Vn++] = Bc, Gn[Vn++] = qc, Gn[Vn++] = xs, Bc = e.id, qc = e.overflow, xs = t), t = pf(
            t,
            f.children
          ), t.flags |= 4096);
        return t;
      }
      return o ? (za(t), o = f.fallback, h = t.mode, m = e.child, p = m.sibling, f = bn(
        m,
        {
          mode: "hidden",
          children: f.children
        }
      ), f.subtreeFlags = m.subtreeFlags & 31457280, p !== null ? o = bn(
        p,
        o
      ) : (o = gu(
        o,
        h,
        a,
        null
      ), o.flags |= 2), o.return = t, f.return = t, f.sibling = o, t.child = f, f = o, o = t.child, h = e.child.memoizedState, h === null ? h = Zo(a) : (m = h.cachePool, m !== null ? (p = il._currentValue, m = m.parent !== p ? { parent: p, pool: p } : m) : m = p0(), h = {
        baseLanes: h.baseLanes | a,
        cachePool: m
      }), o.memoizedState = h, o.childLanes = dl(
        e,
        i,
        a
      ), t.memoizedState = Up, f) : (ta(t), a = e.child, e = a.sibling, a = bn(a, {
        mode: "visible",
        children: f.children
      }), a.return = t, a.sibling = null, e !== null && (i = t.deletions, i === null ? (t.deletions = [e], t.flags |= 16) : i.push(e)), t.child = a, t.memoizedState = null, a);
    }
    function pf(e, t) {
      return t = oc(
        { mode: "visible", children: t },
        e.mode
      ), t.return = e, e.child = t;
    }
    function oc(e, t) {
      return Fr(e, t, 0, null);
    }
    function gf(e, t, a) {
      return Bs(t, e.child, null, a), e = pf(
        t,
        t.pendingProps.children
      ), e.flags |= 2, t.memoizedState = null, e;
    }
    function qr(e, t, a) {
      e.lanes |= t;
      var i = e.alternate;
      i !== null && (i.lanes |= t), wo(
        e.return,
        t,
        a
      );
    }
    function pn(e, t) {
      var a = ll(e);
      return e = !a && typeof Ke(e) == "function", a || e ? (a = a ? "array" : "iterable", console.error(
        "A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>",
        a,
        t,
        a
      ), !1) : !0;
    }
    function Sf(e, t, a, i, f) {
      var o = e.memoizedState;
      o === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: i,
        tail: a,
        tailMode: f
      } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = i, o.tail = a, o.tailMode = f);
    }
    function Yr(e, t, a) {
      var i = t.pendingProps, f = i.revealOrder, o = i.tail;
      if (i = i.children, f !== void 0 && f !== "forwards" && f !== "backwards" && f !== "together" && !o1[f])
        if (o1[f] = !0, typeof f == "string")
          switch (f.toLowerCase()) {
            case "together":
            case "forwards":
            case "backwards":
              console.error(
                '"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.',
                f,
                f.toLowerCase()
              );
              break;
            case "forward":
            case "backward":
              console.error(
                '"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.',
                f,
                f.toLowerCase()
              );
              break;
            default:
              console.error(
                '"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?',
                f
              );
          }
        else
          console.error(
            '%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?',
            f
          );
      o === void 0 || Op[o] || (o !== "collapsed" && o !== "hidden" ? (Op[o] = !0, console.error(
        '"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?',
        o
      )) : f !== "forwards" && f !== "backwards" && (Op[o] = !0, console.error(
        '<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?',
        o
      )));
      e: if ((f === "forwards" || f === "backwards") && i !== void 0 && i !== null && i !== !1)
        if (ll(i)) {
          for (var d = 0; d < i.length; d++)
            if (!pn(i[d], d)) break e;
        } else if (d = Ke(i), typeof d == "function") {
          if (d = d.call(i))
            for (var h = d.next(), m = 0; !h.done; h = d.next()) {
              if (!pn(h.value, m)) break e;
              m++;
            }
        } else
          console.error(
            'A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?',
            f
          );
      if (bt(e, t, i, a), i = nl.current, i & Tm)
        i = i & $d | Tm, t.flags |= 128;
      else {
        if (e !== null && e.flags & 128)
          e: for (e = t.child; e !== null; ) {
            if (e.tag === 13)
              e.memoizedState !== null && qr(
                e,
                a,
                t
              );
            else if (e.tag === 19)
              qr(e, a, t);
            else if (e.child !== null) {
              e.child.return = e, e = e.child;
              continue;
            }
            if (e === t) break e;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t)
                break e;
              e = e.return;
            }
            e.sibling.return = e.return, e = e.sibling;
          }
        i &= $d;
      }
      switch (be(nl, i, t), f) {
        case "forwards":
          for (a = t.child, f = null; a !== null; )
            e = a.alternate, e !== null && Ho(e) === null && (f = a), a = a.sibling;
          a = f, a === null ? (f = t.child, t.child = null) : (f = a.sibling, a.sibling = null), Sf(
            t,
            !1,
            f,
            a,
            o
          );
          break;
        case "backwards":
          for (a = null, f = t.child, t.child = null; f !== null; ) {
            if (e = f.alternate, e !== null && Ho(e) === null) {
              t.child = f;
              break;
            }
            e = f.sibling, f.sibling = a, a = f, f = e;
          }
          Sf(
            t,
            !0,
            a,
            null,
            o
          );
          break;
        case "together":
          Sf(t, !1, null, null, void 0);
          break;
        default:
          t.memoizedState = null;
      }
      return t.child;
    }
    function Za(e, t, a) {
      if (e !== null && (t.dependencies = e.dependencies), Ha = -1, uo |= t.lanes, !(a & t.childLanes))
        if (e !== null) {
          if (Ko(
            e,
            t,
            a,
            !1
          ), (a & t.childLanes) === 0)
            return null;
        } else return null;
      if (e !== null && t.child !== e.child)
        throw Error("Resuming work not yet implemented.");
      if (t.child !== null) {
        for (e = t.child, a = bn(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null; )
          e = e.sibling, a = a.sibling = bn(e, e.pendingProps), a.return = t;
        a.sibling = null;
      }
      return t.child;
    }
    function Nr(e, t) {
      return e.lanes & t ? !0 : (e = e.dependencies, !!(e !== null && Jo(e)));
    }
    function E0(e, t, a) {
      switch (t.tag) {
        case 3:
          ie(
            t,
            t.stateNode.containerInfo
          ), du(
            t,
            il,
            e.memoizedState.cache
          ), nf();
          break;
        case 27:
        case 5:
          Gu(t);
          break;
        case 4:
          ie(
            t,
            t.stateNode.containerInfo
          );
          break;
        case 10:
          du(
            t,
            t.type,
            t.memoizedProps.value
          );
          break;
        case 12:
          a & t.childLanes && (t.flags |= 4), t.flags |= 2048;
          var i = t.stateNode;
          i.effectDuration = -0, i.passiveEffectDuration = -0;
          break;
        case 13:
          if (i = t.memoizedState, i !== null)
            return i.dehydrated !== null ? (ta(t), t.flags |= 128, null) : a & t.child.childLanes ? pt(
              e,
              t,
              a
            ) : (ta(t), e = Za(
              e,
              t,
              a
            ), e !== null ? e.sibling : null);
          ta(t);
          break;
        case 19:
          var f = (e.flags & 128) !== 0;
          if (i = (a & t.childLanes) !== 0, i || (Ko(
            e,
            t,
            a,
            !1
          ), i = (a & t.childLanes) !== 0), f) {
            if (i)
              return Yr(
                e,
                t,
                a
              );
            t.flags |= 128;
          }
          if (f = t.memoizedState, f !== null && (f.rendering = null, f.tail = null, f.lastEffect = null), be(
            nl,
            nl.current,
            t
          ), i) break;
          return null;
        case 22:
        case 23:
          return t.lanes = 0, dt(e, t, a);
        case 24:
          du(
            t,
            il,
            e.memoizedState.cache
          );
      }
      return Za(e, t, a);
    }
    function Gr(e, t, a) {
      if (t._debugNeedsRemount && e !== null) {
        a = Wr(
          t.type,
          t.key,
          t.pendingProps,
          t._debugOwner || null,
          t.mode,
          t.lanes
        );
        var i = t.return;
        if (i === null) throw Error("Cannot swap the root fiber.");
        if (e.alternate = null, t.alternate = null, a.index = t.index, a.sibling = t.sibling, a.return = t.return, a.ref = t.ref, a._debugInfo = t._debugInfo, t === i.child)
          i.child = a;
        else {
          var f = i.child;
          if (f === null)
            throw Error("Expected parent to have a child.");
          for (; f.sibling !== t; )
            if (f = f.sibling, f === null)
              throw Error("Expected to find the previous sibling.");
          f.sibling = a;
        }
        return t = i.deletions, t === null ? (i.deletions = [e], i.flags |= 16) : t.push(e), a.flags |= 2, a;
      }
      if (e !== null)
        if (e.memoizedProps !== t.pendingProps || t.type !== e.type)
          gl = !0;
        else {
          if (!Nr(e, a) && !(t.flags & 128))
            return gl = !1, E0(
              e,
              t,
              a
            );
          gl = !!(e.flags & 131072);
        }
      else
        gl = !1, (i = Re) && (wu(), i = (t.flags & 1048576) !== 0), i && (i = t.index, wu(), s0(t, uv, i));
      switch (t.lanes = 0, t.tag) {
        case 16:
          e: if (i = t.pendingProps, e = Pf(t.elementType), t.type = e, typeof e == "function")
            Po(e) ? (i = su(
              e,
              i
            ), t.tag = 1, t.type = e = Ki(e), t = T0(
              null,
              t,
              e,
              i,
              a
            )) : (t.tag = 0, Lo(t, e), t.type = e = Ki(e), t = xr(
              null,
              t,
              e,
              i,
              a
            ));
          else {
            if (e != null) {
              if (f = e.$$typeof, f === Oc) {
                t.tag = 11, t.type = e = Uh(e), t = vf(
                  null,
                  t,
                  e,
                  i,
                  a
                );
                break e;
              } else if (f === vi) {
                t.tag = 14, t = cc(
                  null,
                  t,
                  e,
                  i,
                  a
                );
                break e;
              }
            }
            throw t = "", e !== null && typeof e == "object" && e.$$typeof === yl && (t = " Did you wrap a component in React.lazy() more than once?"), e = ne(e) || e, Error(
              "Element type is invalid. Received a promise that resolves to: " + e + ". Lazy element type must resolve to a class or function." + t
            );
          }
          return t;
        case 0:
          return xr(
            e,
            t,
            t.type,
            t.pendingProps,
            a
          );
        case 1:
          return i = t.type, f = su(
            i,
            t.pendingProps
          ), T0(
            e,
            t,
            i,
            f,
            a
          );
        case 3:
          e: {
            if (ie(
              t,
              t.stateNode.containerInfo
            ), e === null)
              throw Error(
                "Should have a current fiber. This is a bug in React."
              );
            var o = t.pendingProps;
            f = t.memoizedState, i = f.element, Qr(e, t), Tf(t, o, null, a);
            var d = t.memoizedState;
            if (o = d.cache, du(t, il, o), o !== f.cache && Vr(
              t,
              [il],
              a,
              !0
            ), Sn(), o = d.element, f.isDehydrated)
              if (f = {
                element: o,
                isDehydrated: !1,
                cache: d.cache
              }, t.updateQueue.baseState = f, t.memoizedState = f, t.flags & 256) {
                t = Br(
                  e,
                  t,
                  o,
                  a
                );
                break e;
              } else if (o !== i) {
                i = Xl(
                  Error(
                    "This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."
                  ),
                  t
                ), Wi(i), t = Br(
                  e,
                  t,
                  o,
                  a
                );
                break e;
              } else
                for (Ml = Zl(
                  t.stateNode.containerInfo.firstChild
                ), pa = t, Re = !0, qu = null, Yc = !1, Xn = null, Oi = !0, e = Lg(
                  t,
                  null,
                  o,
                  a
                ), t.child = e; e; )
                  e.flags = e.flags & -3 | 4096, e = e.sibling;
            else {
              if (nf(), o === i) {
                t = Za(
                  e,
                  t,
                  a
                );
                break e;
              }
              bt(
                e,
                t,
                o,
                a
              );
            }
            t = t.child;
          }
          return t;
        case 26:
          return fc(e, t), e === null ? (e = vd(
            t.type,
            null,
            t.pendingProps,
            null
          )) ? t.memoizedState = e : Re || (e = t.type, a = t.pendingProps, i = At(
            _t.current
          ), i = hd(
            i
          ).createElement(e), i[al] = t, i[wl] = a, nt(i, e, a), Dt(i), t.stateNode = i) : t.memoizedState = vd(
            t.type,
            e.memoizedProps,
            t.pendingProps,
            e.memoizedState
          ), null;
        case 27:
          return Gu(t), e === null && Re && (f = At(_t.current), i = Jn(), f = t.stateNode = Yf(
            t.type,
            t.pendingProps,
            f,
            i,
            !1
          ), Yc || (i = Y0(
            f,
            t.type,
            t.pendingProps,
            i
          ), i !== null && (Ku(t, 0).serverProps = i)), pa = t, Oi = !0, Ml = Zl(
            f.firstChild
          )), i = t.pendingProps.children, e !== null || Re ? bt(
            e,
            t,
            i,
            a
          ) : t.child = Bs(
            t,
            null,
            i,
            a
          ), fc(e, t), t.child;
        case 5:
          return e === null && Re && (o = Jn(), i = cr(
            t.type,
            o.ancestorInfo
          ), f = Ml, (d = !f) || (d = ss(
            f,
            t.type,
            t.pendingProps,
            Oi
          ), d !== null ? (t.stateNode = d, Yc || (o = Y0(
            d,
            t.type,
            t.pendingProps,
            o
          ), o !== null && (Ku(t, 0).serverProps = o)), pa = t, Ml = Zl(
            d.firstChild
          ), Oi = !1, o = !0) : o = !1, d = !o), d && (i && $i(t, f), Va(t))), Gu(t), f = t.type, o = t.pendingProps, d = e !== null ? e.memoizedProps : null, i = o.children, Ge(f, o) ? i = null : d !== null && Ge(f, d) && (t.flags |= 32), t.memoizedState !== null && (f = Ql(
            e,
            t,
            Ar,
            null,
            null,
            a
          ), Xm._currentValue = f), fc(e, t), bt(
            e,
            t,
            i,
            a
          ), t.child;
        case 6:
          return e === null && Re && (e = t.pendingProps, a = Jn().ancestorInfo.current, e = a != null ? So(e, a.tag) : !0, a = Ml, (i = !a) || (i = Hn(
            a,
            t.pendingProps,
            Oi
          ), i !== null ? (t.stateNode = i, pa = t, Ml = null, i = !0) : i = !1, i = !i), i && (e && $i(t, a), Va(t))), null;
        case 13:
          return pt(e, t, a);
        case 4:
          return ie(
            t,
            t.stateNode.containerInfo
          ), i = t.pendingProps, e === null ? t.child = Bs(
            t,
            null,
            i,
            a
          ) : bt(
            e,
            t,
            i,
            a
          ), t.child;
        case 11:
          return vf(
            e,
            t,
            t.type,
            t.pendingProps,
            a
          );
        case 7:
          return bt(
            e,
            t,
            t.pendingProps,
            a
          ), t.child;
        case 8:
          return bt(
            e,
            t,
            t.pendingProps.children,
            a
          ), t.child;
        case 12:
          return t.flags |= 4, t.flags |= 2048, i = t.stateNode, i.effectDuration = -0, i.passiveEffectDuration = -0, bt(
            e,
            t,
            t.pendingProps.children,
            a
          ), t.child;
        case 10:
          return i = t.type, f = t.pendingProps, o = f.value, "value" in f || s1 || (s1 = !0, console.error(
            "The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"
          )), du(t, i, o), bt(
            e,
            t,
            f.children,
            a
          ), t.child;
        case 9:
          return f = t.type._context, i = t.pendingProps.children, typeof i != "function" && console.error(
            "A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."
          ), ti(t), f = Je(f), qi(t), i = bp(
            i,
            f,
            void 0
          ), Vu(), t.flags |= 1, bt(
            e,
            t,
            i,
            a
          ), t.child;
        case 14:
          return cc(
            e,
            t,
            t.type,
            t.pendingProps,
            a
          );
        case 15:
          return b0(
            e,
            t,
            t.type,
            t.pendingProps,
            a
          );
        case 19:
          return Yr(
            e,
            t,
            a
          );
        case 22:
          return dt(e, t, a);
        case 24:
          return ti(t), i = Je(il), e === null ? (f = zr(), f === null && (f = We, o = au(), f.pooledCache = o, Aa(o), o !== null && (f.pooledCacheLanes |= a), f = o), t.memoizedState = {
            parent: i,
            cache: f
          }, Xr(t), du(t, il, f)) : (e.lanes & a && (Qr(e, t), Tf(t, null, null, a), Sn()), f = e.memoizedState, o = t.memoizedState, f.parent !== i ? (f = {
            parent: i,
            cache: i
          }, t.memoizedState = f, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = f), du(t, il, i)) : (i = o.cache, du(t, il, i), i !== f.cache && Vr(
            t,
            [il],
            a,
            !0
          ))), bt(
            e,
            t,
            t.pendingProps.children,
            a
          ), t.child;
        case 29:
          throw t.pendingProps;
      }
      throw Error(
        "Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue."
      );
    }
    function _o() {
      th = dv = null, lh = !1;
    }
    function du(e, t, a) {
      be(Hp, t._currentValue, e), t._currentValue = a, be(Cp, t._currentRenderer, e), t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== r1 && console.error(
        "Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."
      ), t._currentRenderer = r1;
    }
    function gn(e, t) {
      e._currentValue = Hp.current;
      var a = Cp.current;
      Ce(Cp, t), e._currentRenderer = a, Ce(Hp, t);
    }
    function wo(e, t, a) {
      for (; e !== null; ) {
        var i = e.alternate;
        if ((e.childLanes & t) !== t ? (e.childLanes |= t, i !== null && (i.childLanes |= t)) : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t), e === a) break;
        e = e.return;
      }
      e !== a && console.error(
        "Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue."
      );
    }
    function Vr(e, t, a, i) {
      var f = e.child;
      for (f !== null && (f.return = e); f !== null; ) {
        var o = f.dependencies;
        if (o !== null) {
          var d = f.child;
          o = o.firstContext;
          e: for (; o !== null; ) {
            var h = o;
            o = f;
            for (var m = 0; m < t.length; m++)
              if (h.context === t[m]) {
                o.lanes |= a, h = o.alternate, h !== null && (h.lanes |= a), wo(
                  o.return,
                  a,
                  e
                ), i || (d = null);
                break e;
              }
            o = h.next;
          }
        } else if (f.tag === 18) {
          if (d = f.return, d === null)
            throw Error(
              "We just came from a parent so we must have had a parent. This is a bug in React."
            );
          d.lanes |= a, o = d.alternate, o !== null && (o.lanes |= a), wo(
            d,
            a,
            e
          ), d = null;
        } else d = f.child;
        if (d !== null) d.return = f;
        else
          for (d = f; d !== null; ) {
            if (d === e) {
              d = null;
              break;
            }
            if (f = d.sibling, f !== null) {
              f.return = d.return, d = f;
              break;
            }
            d = d.return;
          }
        f = d;
      }
    }
    function Ko(e, t, a, i) {
      e = null;
      for (var f = t, o = !1; f !== null; ) {
        if (!o) {
          if (f.flags & 524288) o = !0;
          else if (f.flags & 262144) break;
        }
        if (f.tag === 10) {
          var d = f.alternate;
          if (d === null)
            throw Error("Should have a current fiber. This is a bug in React.");
          if (d = d.memoizedProps, d !== null) {
            var h = f.type;
            va(f.pendingProps.value, d.value) || (e !== null ? e.push(h) : e = [h]);
          }
        } else if (f === zs.current) {
          if (d = f.alternate, d === null)
            throw Error("Should have a current fiber. This is a bug in React.");
          d.memoizedState.memoizedState !== f.memoizedState.memoizedState && (e !== null ? e.push(Xm) : e = [Xm]);
        }
        f = f.return;
      }
      e !== null && Vr(
        t,
        e,
        a,
        i
      ), t.flags |= 262144;
    }
    function Jo(e) {
      for (e = e.firstContext; e !== null; ) {
        if (!va(
          e.context._currentValue,
          e.memoizedValue
        ))
          return !0;
        e = e.next;
      }
      return !1;
    }
    function ti(e) {
      dv = e, th = null, e = e.dependencies, e !== null && (e.firstContext = null);
    }
    function Je(e) {
      return lh && console.error(
        "Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."
      ), Ph(dv, e);
    }
    function bf(e, t) {
      return dv === null && ti(e), Ph(e, t);
    }
    function Ph(e, t) {
      var a = t._currentValue;
      if (t = { context: t, memoizedValue: a, next: null }, th === null) {
        if (e === null)
          throw Error(
            "Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."
          );
        th = t, e.dependencies = {
          lanes: 0,
          firstContext: t,
          _debugThenableState: null
        }, e.flags |= 524288;
      } else th = th.next = t;
      return a;
    }
    function Xr(e) {
      e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, lanes: 0, hiddenCallbacks: null },
        callbacks: null
      };
    }
    function Qr(e, t) {
      e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        callbacks: null
      });
    }
    function hu(e) {
      return {
        lane: e,
        tag: d1,
        payload: null,
        callback: null,
        next: null
      };
    }
    function yu(e, t, a) {
      var i = e.updateQueue;
      if (i === null) return null;
      if (i = i.shared, Bp === i && !m1) {
        var f = P(e);
        console.error(
          `An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback.

Please update the following component: %s`,
          f
        ), m1 = !0;
      }
      return (ut & ba) !== Pa ? (f = i.pending, f === null ? t.next = t : (t.next = f.next, f.next = t), i.pending = t, t = pr(e), c0(e, null, a), t) : (vr(e, i, t, a), pr(e));
    }
    function ko(e, t, a) {
      if (t = t.updateQueue, t !== null && (t = t.shared, (a & 4194176) !== 0)) {
        var i = t.lanes;
        i &= e.pendingLanes, a |= i, t.lanes = a, Nl(e, a);
      }
    }
    function $o(e, t) {
      var a = e.updateQueue, i = e.alternate;
      if (i !== null && (i = i.updateQueue, a === i)) {
        var f = null, o = null;
        if (a = a.firstBaseUpdate, a !== null) {
          do {
            var d = {
              lane: a.lane,
              tag: a.tag,
              payload: a.payload,
              callback: null,
              next: null
            };
            o === null ? f = o = d : o = o.next = d, a = a.next;
          } while (a !== null);
          o === null ? f = o = t : o = o.next = t;
        } else f = o = t;
        a = {
          baseState: i.baseState,
          firstBaseUpdate: f,
          lastBaseUpdate: o,
          shared: i.shared,
          callbacks: i.callbacks
        }, e.updateQueue = a;
        return;
      }
      e = a.lastBaseUpdate, e === null ? a.firstBaseUpdate = t : e.next = t, a.lastBaseUpdate = t;
    }
    function Sn() {
      if (qp) {
        var e = Wd;
        if (e !== null) throw e;
      }
    }
    function Tf(e, t, a, i) {
      qp = !1;
      var f = e.updateQueue;
      no = !1, Bp = f.shared;
      var o = f.firstBaseUpdate, d = f.lastBaseUpdate, h = f.shared.pending;
      if (h !== null) {
        f.shared.pending = null;
        var m = h, p = m.next;
        m.next = null, d === null ? o = p : d.next = p, d = m;
        var R = e.alternate;
        R !== null && (R = R.updateQueue, h = R.lastBaseUpdate, h !== d && (h === null ? R.firstBaseUpdate = p : h.next = p, R.lastBaseUpdate = m));
      }
      if (o !== null) {
        var N = f.baseState;
        d = 0, R = p = m = null, h = o;
        do {
          var M = h.lane & -536870913, G = M !== h.lane;
          if (G ? (Te & M) === M : (i & M) === M) {
            M !== 0 && M === qs && (qp = !0), R !== null && (R = R.next = {
              lane: 0,
              tag: h.tag,
              payload: h.payload,
              callback: null,
              next: null
            });
            e: {
              M = e;
              var F = h, he = t, Yt = a;
              switch (F.tag) {
                case h1:
                  if (F = F.payload, typeof F == "function") {
                    lh = !0;
                    var Ye = F.call(
                      Yt,
                      N,
                      he
                    );
                    if (M.mode & Jl) {
                      je(!0);
                      try {
                        F.call(Yt, N, he);
                      } finally {
                        je(!1);
                      }
                    }
                    lh = !1, N = Ye;
                    break e;
                  }
                  N = F;
                  break e;
                case xp:
                  M.flags = M.flags & -65537 | 128;
                case d1:
                  if (Ye = F.payload, typeof Ye == "function") {
                    if (lh = !0, F = Ye.call(
                      Yt,
                      N,
                      he
                    ), M.mode & Jl) {
                      je(!0);
                      try {
                        Ye.call(Yt, N, he);
                      } finally {
                        je(!1);
                      }
                    }
                    lh = !1;
                  } else F = Ye;
                  if (F == null) break e;
                  N = se({}, N, F);
                  break e;
                case y1:
                  no = !0;
              }
            }
            M = h.callback, M !== null && (e.flags |= 64, G && (e.flags |= 8192), G = f.callbacks, G === null ? f.callbacks = [M] : G.push(M));
          } else
            G = {
              lane: M,
              tag: h.tag,
              payload: h.payload,
              callback: h.callback,
              next: null
            }, R === null ? (p = R = G, m = N) : R = R.next = G, d |= M;
          if (h = h.next, h === null) {
            if (h = f.shared.pending, h === null)
              break;
            G = h, h = G.next, G.next = null, f.lastBaseUpdate = G, f.shared.pending = null;
          }
        } while (!0);
        R === null && (m = N), f.baseState = m, f.firstBaseUpdate = p, f.lastBaseUpdate = R, o === null && (f.shared.lanes = 0), uo |= d, e.lanes = d, e.memoizedState = N;
      }
      Bp = null;
    }
    function Wo(e, t) {
      if (typeof e != "function")
        throw Error(
          "Invalid argument passed as callback. Expected a function. Instead received: " + e
        );
      e.call(t);
    }
    function jr(e, t) {
      var a = e.shared.hiddenCallbacks;
      if (a !== null)
        for (e.shared.hiddenCallbacks = null, e = 0; e < a.length; e++)
          Wo(a[e], t);
    }
    function ey(e, t) {
      var a = e.callbacks;
      if (a !== null)
        for (e.callbacks = null, e = 0; e < a.length; e++)
          Wo(a[e], t);
    }
    function Ra(e) {
      return (e.mode & Rl) !== lt;
    }
    function ty(e, t) {
      Ra(e) ? (Ga(), Ef(t, e), Na()) : Ef(t, e);
    }
    function Lr(e, t, a) {
      Ra(e) ? (Ga(), sc(
        a,
        e,
        t
      ), Na()) : sc(
        a,
        e,
        t
      );
    }
    function Ef(e, t) {
      try {
        var a = t.updateQueue, i = a !== null ? a.lastEffect : null;
        if (i !== null) {
          var f = i.next;
          a = f;
          do {
            if ((a.tag & e) === e && ((e & ul) !== jn ? K !== null && typeof K.markComponentPassiveEffectMountStarted == "function" && K.markComponentPassiveEffectMountStarted(
              t
            ) : (e & Ol) !== jn && K !== null && typeof K.markComponentLayoutEffectMountStarted == "function" && K.markComponentLayoutEffectMountStarted(
              t
            ), i = void 0, (e & ga) !== jn && (fh = !0), i = $(
              t,
              VS,
              a
            ), (e & ga) !== jn && (fh = !1), (e & ul) !== jn ? K !== null && typeof K.markComponentPassiveEffectMountStopped == "function" && K.markComponentPassiveEffectMountStopped() : (e & Ol) !== jn && K !== null && typeof K.markComponentLayoutEffectMountStopped == "function" && K.markComponentLayoutEffectMountStopped(), i !== void 0 && typeof i != "function")) {
              var o = void 0;
              o = a.tag & Ol ? "useLayoutEffect" : a.tag & ga ? "useInsertionEffect" : "useEffect";
              var d = void 0;
              d = i === null ? " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof i.then == "function" ? `

It looks like you wrote ` + o + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + o + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://react.dev/link/hooks-data-fetching` : " You returned: " + i, $(
                t,
                function(h, m) {
                  console.error(
                    "%s must not return anything besides a function, which is used for clean-up.%s",
                    h,
                    m
                  );
                },
                o,
                d
              );
            }
            a = a.next;
          } while (a !== f);
        }
      } catch (h) {
        Ue(t, t.return, h);
      }
    }
    function sc(e, t, a) {
      try {
        var i = t.updateQueue, f = i !== null ? i.lastEffect : null;
        if (f !== null) {
          var o = f.next;
          i = o;
          do {
            if ((i.tag & e) === e) {
              var d = i.inst, h = d.destroy;
              h !== void 0 && (d.destroy = void 0, (e & ul) !== jn ? K !== null && typeof K.markComponentPassiveEffectUnmountStarted == "function" && K.markComponentPassiveEffectUnmountStarted(
                t
              ) : (e & Ol) !== jn && K !== null && typeof K.markComponentLayoutEffectUnmountStarted == "function" && K.markComponentLayoutEffectUnmountStarted(
                t
              ), (e & ga) !== jn && (fh = !0), $(
                t,
                XS,
                t,
                a,
                h
              ), (e & ga) !== jn && (fh = !1), (e & ul) !== jn ? K !== null && typeof K.markComponentPassiveEffectUnmountStopped == "function" && K.markComponentPassiveEffectUnmountStopped() : (e & Ol) !== jn && K !== null && typeof K.markComponentLayoutEffectUnmountStopped == "function" && K.markComponentLayoutEffectUnmountStopped());
            }
            i = i.next;
          } while (i !== o);
        }
      } catch (m) {
        Ue(t, t.return, m);
      }
    }
    function Zr(e, t) {
      Ra(e) ? (Ga(), Ef(t, e), Na()) : Ef(t, e);
    }
    function _r(e, t, a) {
      Ra(e) ? (Ga(), sc(
        a,
        e,
        t
      ), Na()) : sc(
        a,
        e,
        t
      );
    }
    function ly(e) {
      var t = e.updateQueue;
      if (t !== null) {
        var a = e.stateNode;
        e.type.defaultProps || "ref" in e.memoizedProps || eh || (a.props !== e.memoizedProps && console.error(
          "Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
          P(e) || "instance"
        ), a.state !== e.memoizedState && console.error(
          "Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
          P(e) || "instance"
        ));
        try {
          $(
            e,
            ey,
            t,
            a
          );
        } catch (i) {
          Ue(e, e.return, i);
        }
      }
    }
    function ay(e, t, a) {
      return e.getSnapshotBeforeUpdate(t, a);
    }
    function z0(e, t) {
      var a = t.memoizedProps, i = t.memoizedState;
      t = e.stateNode, e.type.defaultProps || "ref" in e.memoizedProps || eh || (t.props !== e.memoizedProps && console.error(
        "Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
        P(e) || "instance"
      ), t.state !== e.memoizedState && console.error(
        "Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
        P(e) || "instance"
      ));
      try {
        var f = su(
          e.type,
          a,
          e.elementType === e.type
        ), o = $(
          e,
          ay,
          t,
          f,
          i
        );
        a = v1, o !== void 0 || a.has(e.type) || (a.add(e.type), $(e, function() {
          console.error(
            "%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.",
            P(e)
          );
        })), t.__reactInternalSnapshotBeforeUpdate = o;
      } catch (d) {
        Ue(e, e.return, d);
      }
    }
    function ny(e, t, a) {
      a.props = su(
        e.type,
        e.memoizedProps
      ), a.state = e.memoizedState, Ra(e) ? (Ga(), $(
        e,
        qg,
        e,
        t,
        a
      ), Na()) : $(
        e,
        qg,
        e,
        t,
        a
      );
    }
    function Kv(e) {
      var t = e.ref;
      if (t !== null) {
        var a = e.stateNode;
        if (typeof t == "function")
          if (Ra(e))
            try {
              Ga(), e.refCleanup = t(a);
            } finally {
              Na();
            }
          else e.refCleanup = t(a);
        else
          typeof t == "string" ? console.error("String refs are no longer supported.") : t.hasOwnProperty("current") || console.error(
            "Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().",
            P(e)
          ), t.current = a;
      }
    }
    function mu(e, t) {
      try {
        $(e, Kv, e);
      } catch (a) {
        Ue(e, t, a);
      }
    }
    function Ll(e, t) {
      var a = e.ref, i = e.refCleanup;
      if (a !== null)
        if (typeof i == "function")
          try {
            if (Ra(e))
              try {
                Ga(), $(e, i);
              } finally {
                Na(e);
              }
            else $(e, i);
          } catch (f) {
            Ue(e, t, f);
          } finally {
            e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
          }
        else if (typeof a == "function")
          try {
            if (Ra(e))
              try {
                Ga(), $(e, a, null);
              } finally {
                Na(e);
              }
            else $(e, a, null);
          } catch (f) {
            Ue(e, t, f);
          }
        else a.current = null;
    }
    function uy(e, t, a, i) {
      var f = e.memoizedProps, o = f.id, d = f.onCommit;
      f = f.onRender, t = t === null ? "mount" : "update", tv && (t = "nested-update"), typeof f == "function" && f(
        o,
        t,
        e.actualDuration,
        e.treeBaseDuration,
        e.actualStartTime,
        a
      ), typeof d == "function" && d(
        e.memoizedProps.id,
        t,
        i,
        a
      );
    }
    function iy(e, t, a, i) {
      var f = e.memoizedProps;
      e = f.id, f = f.onPostCommit, t = t === null ? "mount" : "update", tv && (t = "nested-update"), typeof f == "function" && f(
        e,
        t,
        i,
        a
      );
    }
    function cy(e) {
      var t = e.type, a = e.memoizedProps, i = e.stateNode;
      try {
        $(
          e,
          Le,
          i,
          t,
          a,
          e
        );
      } catch (f) {
        Ue(e, e.return, f);
      }
    }
    function fy(e, t, a) {
      try {
        $(
          e,
          sa,
          e.stateNode,
          e.type,
          a,
          t,
          e
        );
      } catch (i) {
        Ue(e, e.return, i);
      }
    }
    function A0(e) {
      return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 || e.tag === 4;
    }
    function oy(e) {
      e: for (; ; ) {
        for (; e.sibling === null; ) {
          if (e.return === null || A0(e.return)) return null;
          e = e.return;
        }
        for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 27 && e.tag !== 18; ) {
          if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
          e.child.return = e, e = e.child;
        }
        if (!(e.flags & 2)) return e.stateNode;
      }
    }
    function wr(e, t, a) {
      var i = e.tag;
      if (i === 5 || i === 6)
        e = e.stateNode, t ? a.nodeType === 8 ? a.parentNode.insertBefore(e, t) : a.insertBefore(e, t) : (a.nodeType === 8 ? (t = a.parentNode, t.insertBefore(e, a)) : (t = a, t.appendChild(e)), a = a._reactRootContainer, a != null || t.onclick !== null || (t.onclick = $a));
      else if (i !== 4 && i !== 27 && (e = e.child, e !== null))
        for (wr(e, t, a), e = e.sibling; e !== null; )
          wr(e, t, a), e = e.sibling;
    }
    function li(e, t, a) {
      var i = e.tag;
      if (i === 5 || i === 6)
        e = e.stateNode, t ? a.insertBefore(e, t) : a.appendChild(e);
      else if (i !== 4 && i !== 27 && (e = e.child, e !== null))
        for (li(e, t, a), e = e.sibling; e !== null; )
          li(e, t, a), e = e.sibling;
    }
    function sy(e) {
      if (e.tag !== 27) {
        e: {
          for (var t = e.return; t !== null; ) {
            if (A0(t)) {
              var a = t;
              break e;
            }
            t = t.return;
          }
          throw Error(
            "Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue."
          );
        }
        switch (a.tag) {
          case 27:
            t = a.stateNode, a = oy(e), li(e, a, t);
            break;
          case 5:
            t = a.stateNode, a.flags & 32 && (Un(t), a.flags &= -33), a = oy(e), li(e, a, t);
            break;
          case 3:
          case 4:
            t = a.stateNode.containerInfo, a = oy(e), wr(
              e,
              a,
              t
            );
            break;
          default:
            throw Error(
              "Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue."
            );
        }
      }
    }
    function Kr(e, t) {
      if (e = e.containerInfo, Pp = xv, e = u0(e), yr(e)) {
        if ("selectionStart" in e)
          var a = {
            start: e.selectionStart,
            end: e.selectionEnd
          };
        else
          e: {
            a = (a = e.ownerDocument) && a.defaultView || window;
            var i = a.getSelection && a.getSelection();
            if (i && i.rangeCount !== 0) {
              a = i.anchorNode;
              var f = i.anchorOffset, o = i.focusNode;
              i = i.focusOffset;
              try {
                a.nodeType, o.nodeType;
              } catch {
                a = null;
                break e;
              }
              var d = 0, h = -1, m = -1, p = 0, R = 0, N = e, M = null;
              t: for (; ; ) {
                for (var G; N !== a || f !== 0 && N.nodeType !== 3 || (h = d + f), N !== o || i !== 0 && N.nodeType !== 3 || (m = d + i), N.nodeType === 3 && (d += N.nodeValue.length), (G = N.firstChild) !== null; )
                  M = N, N = G;
                for (; ; ) {
                  if (N === e) break t;
                  if (M === a && ++p === f && (h = d), M === o && ++R === i && (m = d), (G = N.nextSibling) !== null) break;
                  N = M, M = N.parentNode;
                }
                N = G;
              }
              a = h === -1 || m === -1 ? null : { start: h, end: m };
            } else a = null;
          }
        a = a || { start: 0, end: 0 };
      } else a = null;
      for (eg = {
        focusedElem: e,
        selectionRange: a
      }, xv = !1, Sl = t; Sl !== null; )
        if (t = Sl, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
          e.return = t, Sl = e;
        else
          for (; Sl !== null; ) {
            switch (e = t = Sl, a = e.alternate, f = e.flags, e.tag) {
              case 0:
                break;
              case 11:
              case 15:
                break;
              case 1:
                f & 1024 && a !== null && z0(e, a);
                break;
              case 3:
                if (f & 1024) {
                  if (e = e.stateNode.containerInfo, a = e.nodeType, a === 9)
                    ri(e);
                  else if (a === 1)
                    switch (e.nodeName) {
                      case "HEAD":
                      case "HTML":
                      case "BODY":
                        ri(e);
                        break;
                      default:
                        e.textContent = "";
                    }
                }
                break;
              case 5:
              case 26:
              case 27:
              case 6:
              case 4:
              case 17:
                break;
              default:
                if (f & 1024)
                  throw Error(
                    "This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue."
                  );
            }
            if (e = t.sibling, e !== null) {
              e.return = t.return, Sl = e;
              break;
            }
            Sl = t.return;
          }
      return t = g1, g1 = !1, t;
    }
    function ry(e, t, a) {
      var i = a.flags;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          _a(e, a), i & 4 && ty(a, Ol | Ln);
          break;
        case 1:
          if (_a(e, a), i & 4)
            if (e = a.stateNode, t === null)
              a.type.defaultProps || "ref" in a.memoizedProps || eh || (e.props !== a.memoizedProps && console.error(
                "Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
                P(a) || "instance"
              ), e.state !== a.memoizedState && console.error(
                "Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
                P(a) || "instance"
              )), Ra(a) ? (Ga(), $(
                a,
                Tp,
                a,
                e
              ), Na()) : $(
                a,
                Tp,
                a,
                e
              );
            else {
              var f = su(
                a.type,
                t.memoizedProps
              );
              t = t.memoizedState, a.type.defaultProps || "ref" in a.memoizedProps || eh || (e.props !== a.memoizedProps && console.error(
                "Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
                P(a) || "instance"
              ), e.state !== a.memoizedState && console.error(
                "Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
                P(a) || "instance"
              )), Ra(a) ? (Ga(), $(
                a,
                Cg,
                a,
                e,
                f,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              ), Na()) : $(
                a,
                Cg,
                a,
                e,
                f,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            }
          i & 64 && ly(a), i & 512 && mu(a, a.return);
          break;
        case 3:
          if (t = tu(), _a(e, a), i & 64 && (i = a.updateQueue, i !== null)) {
            if (f = null, a.child !== null)
              switch (a.child.tag) {
                case 27:
                case 5:
                  f = a.child.stateNode;
                  break;
                case 1:
                  f = a.child.stateNode;
              }
            try {
              $(
                a,
                ey,
                i,
                f
              );
            } catch (h) {
              Ue(a, a.return, h);
            }
          }
          e.effectDuration += gr(t);
          break;
        case 26:
          _a(e, a), i & 512 && mu(a, a.return);
          break;
        case 27:
        case 5:
          _a(e, a), t === null && i & 4 && cy(a), i & 512 && mu(a, a.return);
          break;
        case 12:
          if (i & 4) {
            i = tu(), _a(e, a), e = a.stateNode, e.effectDuration += Ji(i);
            try {
              $(
                a,
                uy,
                a,
                t,
                ev,
                e.effectDuration
              );
            } catch (h) {
              Ue(a, a.return, h);
            }
          } else _a(e, a);
          break;
        case 13:
          _a(e, a), i & 4 && vu(e, a);
          break;
        case 22:
          if (f = a.memoizedState !== null || Vc, !f) {
            t = t !== null && t.memoizedState !== null || Tt;
            var o = Vc, d = Tt;
            Vc = f, (Tt = t) && !d ? wa(
              e,
              a,
              (a.subtreeFlags & 8772) !== 0
            ) : _a(e, a), Vc = o, Tt = d;
          }
          i & 512 && (a.memoizedProps.mode === "manual" ? mu(a, a.return) : Ll(a, a.return));
          break;
        default:
          _a(e, a);
      }
    }
    function dy(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, dy(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && $n(t)), e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
    }
    function Xt(e, t, a) {
      for (a = a.child; a !== null; )
        ai(
          e,
          t,
          a
        ), a = a.sibling;
    }
    function ai(e, t, a) {
      if (vl && typeof vl.onCommitFiberUnmount == "function")
        try {
          vl.onCommitFiberUnmount(wf, a);
        } catch (o) {
          Al || (Al = !0, console.error(
            "React instrumentation encountered an error: %s",
            o
          ));
        }
      switch (a.tag) {
        case 26:
          Tt || Ll(a, t), Xt(
            e,
            t,
            a
          ), a.memoizedState ? a.memoizedState.count-- : a.stateNode && (a = a.stateNode, a.parentNode.removeChild(a));
          break;
        case 27:
          Tt || Ll(a, t);
          var i = Kt, f = Ia;
          for (Kt = a.stateNode, Xt(
            e,
            t,
            a
          ), a = a.stateNode, e = a.attributes; e.length; )
            a.removeAttributeNode(e[0]);
          $n(a), Kt = i, Ia = f;
          break;
        case 5:
          Tt || Ll(a, t);
        case 6:
          if (i = Kt, f = Ia, Kt = null, Xt(
            e,
            t,
            a
          ), Kt = i, Ia = f, Kt !== null)
            if (Ia)
              try {
                $(
                  a,
                  Ru,
                  Kt,
                  a.stateNode
                );
              } catch (o) {
                Ue(
                  a,
                  t,
                  o
                );
              }
            else
              try {
                $(
                  a,
                  Oy,
                  Kt,
                  a.stateNode
                );
              } catch (o) {
                Ue(
                  a,
                  t,
                  o
                );
              }
          break;
        case 18:
          Kt !== null && (Ia ? (e = Kt, a = a.stateNode, e.nodeType === 8 ? tt(e.parentNode, a) : e.nodeType === 1 && tt(e, a), jf(e)) : tt(Kt, a.stateNode));
          break;
        case 4:
          i = Kt, f = Ia, Kt = a.stateNode.containerInfo, Ia = !0, Xt(
            e,
            t,
            a
          ), Kt = i, Ia = f;
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          Tt || sc(
            ga,
            a,
            t
          ), Tt || Lr(
            a,
            t,
            Ol
          ), Xt(
            e,
            t,
            a
          );
          break;
        case 1:
          Tt || (Ll(a, t), i = a.stateNode, typeof i.componentWillUnmount == "function" && ny(
            a,
            t,
            i
          )), Xt(
            e,
            t,
            a
          );
          break;
        case 21:
          Xt(
            e,
            t,
            a
          );
          break;
        case 22:
          Tt || Ll(a, t), Tt = (i = Tt) || a.memoizedState !== null, Xt(
            e,
            t,
            a
          ), Tt = i;
          break;
        default:
          Xt(
            e,
            t,
            a
          );
      }
    }
    function vu(e, t) {
      if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
        try {
          $(
            t,
            Ec,
            e
          );
        } catch (a) {
          Ue(t, t.return, a);
        }
    }
    function rc(e) {
      switch (e.tag) {
        case 13:
        case 19:
          var t = e.stateNode;
          return t === null && (t = e.stateNode = new p1()), t;
        case 22:
          return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new p1()), t;
        default:
          throw Error(
            "Unexpected Suspense handler tag (" + e.tag + "). This is a bug in React."
          );
      }
    }
    function Fo(e, t) {
      var a = rc(e);
      t.forEach(function(i) {
        var f = Lt.bind(null, e, i);
        if (!a.has(i)) {
          if (a.add(i), Dl)
            if (ah !== null && nh !== null)
              Ie(nh, ah);
            else
              throw Error(
                "Expected finished root and lanes to be set. This is a bug in React."
              );
          i.then(f, f);
        }
      });
    }
    function hy(e, t, a) {
      ah = a, nh = e, yy(t, e), nh = ah = null;
    }
    function na(e, t) {
      var a = t.deletions;
      if (a !== null)
        for (var i = 0; i < a.length; i++) {
          var f = e, o = t, d = a[i], h = o;
          e: for (; h !== null; ) {
            switch (h.tag) {
              case 27:
              case 5:
                Kt = h.stateNode, Ia = !1;
                break e;
              case 3:
                Kt = h.stateNode.containerInfo, Ia = !0;
                break e;
              case 4:
                Kt = h.stateNode.containerInfo, Ia = !0;
                break e;
            }
            h = h.return;
          }
          if (Kt === null)
            throw Error(
              "Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue."
            );
          ai(f, o, d), Kt = null, Ia = !1, f = d, o = f.alternate, o !== null && (o.return = null), f.return = null;
        }
      if (t.subtreeFlags & 13878)
        for (t = t.child; t !== null; )
          yy(t, e), t = t.sibling;
    }
    function yy(e, t) {
      var a = e.alternate, i = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          na(t, e), Qt(e), i & 4 && (sc(
            ga | Ln,
            e,
            e.return
          ), Ef(ga | Ln, e), Lr(
            e,
            e.return,
            Ol | Ln
          ));
          break;
        case 1:
          na(t, e), Qt(e), i & 512 && (Tt || a === null || Ll(a, a.return)), i & 64 && Vc && (e = e.updateQueue, e !== null && (i = e.callbacks, i !== null && (a = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = a === null ? i : a.concat(i))));
          break;
        case 26:
          var f = Yu;
          if (na(t, e), Qt(e), i & 512 && (Tt || a === null || Ll(a, a.return)), i & 4)
            if (t = a !== null ? a.memoizedState : null, i = e.memoizedState, a === null)
              if (i === null)
                if (e.stateNode === null) {
                  e: {
                    i = e.type, a = e.memoizedProps, t = f.ownerDocument || f;
                    t: switch (i) {
                      case "title":
                        f = t.getElementsByTagName("title")[0], (!f || f[Ei] || f[al] || f.namespaceURI === ma || f.hasAttribute("itemprop")) && (f = t.createElement(i), t.head.insertBefore(
                          f,
                          t.querySelector("head > title")
                        )), nt(f, i, a), f[al] = e, Dt(f), i = f;
                        break e;
                      case "link":
                        var o = By(
                          "link",
                          "href",
                          t
                        ).get(i + (a.href || ""));
                        if (o) {
                          for (var d = 0; d < o.length; d++)
                            if (f = o[d], f.getAttribute("href") === (a.href == null ? null : a.href) && f.getAttribute("rel") === (a.rel == null ? null : a.rel) && f.getAttribute("title") === (a.title == null ? null : a.title) && f.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                              o.splice(d, 1);
                              break t;
                            }
                        }
                        f = t.createElement(i), nt(f, i, a), t.head.appendChild(f);
                        break;
                      case "meta":
                        if (o = By(
                          "meta",
                          "content",
                          t
                        ).get(i + (a.content || ""))) {
                          for (d = 0; d < o.length; d++)
                            if (f = o[d], He(
                              a.content,
                              "content"
                            ), f.getAttribute("content") === (a.content == null ? null : "" + a.content) && f.getAttribute("name") === (a.name == null ? null : a.name) && f.getAttribute("property") === (a.property == null ? null : a.property) && f.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && f.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                              o.splice(d, 1);
                              break t;
                            }
                        }
                        f = t.createElement(i), nt(f, i, a), t.head.appendChild(f);
                        break;
                      default:
                        throw Error(
                          'getNodesForType encountered a type it did not expect: "' + i + '". This is a bug in React.'
                        );
                    }
                    f[al] = e, Dt(f), i = f;
                  }
                  e.stateNode = i;
                } else
                  qy(
                    f,
                    e.type,
                    e.stateNode
                  );
              else
                e.stateNode = Cn(
                  f,
                  i,
                  e.memoizedProps
                );
            else
              t !== i ? (t === null ? a.stateNode !== null && (a = a.stateNode, a.parentNode.removeChild(a)) : t.count--, i === null ? qy(
                f,
                e.type,
                e.stateNode
              ) : Cn(
                f,
                i,
                e.memoizedProps
              )) : i === null && e.stateNode !== null && fy(
                e,
                e.memoizedProps,
                a.memoizedProps
              );
          break;
        case 27:
          if (i & 4 && e.alternate === null) {
            f = e.stateNode, o = e.memoizedProps;
            try {
              for (d = f.firstChild; d; ) {
                var h = d.nextSibling, m = d.nodeName;
                d[Ei] || m === "HEAD" || m === "BODY" || m === "SCRIPT" || m === "STYLE" || m === "LINK" && d.rel.toLowerCase() === "stylesheet" || f.removeChild(d), d = h;
              }
              $(
                e,
                Hy,
                e.type,
                o,
                f,
                e
              );
            } catch (R) {
              Ue(e, e.return, R);
            }
          }
        case 5:
          if (na(t, e), Qt(e), i & 512 && (Tt || a === null || Ll(a, a.return)), e.flags & 32) {
            t = e.stateNode;
            try {
              $(e, Un, t);
            } catch (R) {
              Ue(e, e.return, R);
            }
          }
          i & 4 && e.stateNode != null && (t = e.memoizedProps, fy(
            e,
            t,
            a !== null ? a.memoizedProps : t
          )), i & 1024 && (Yp = !0, e.type !== "form" && console.error(
            "Unexpected host component type. Expected a form. This is a bug in React."
          ));
          break;
        case 6:
          if (na(t, e), Qt(e), i & 4) {
            if (e.stateNode === null)
              throw Error(
                "This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue."
              );
            i = e.memoizedProps, a = a !== null ? a.memoizedProps : i, t = e.stateNode;
            try {
              $(
                e,
                qf,
                t,
                a,
                i
              );
            } catch (R) {
              Ue(e, e.return, R);
            }
          }
          break;
        case 3:
          if (f = tu(), Uv = null, o = Yu, Yu = Nf(t.containerInfo), na(t, e), Yu = o, Qt(e), i & 4 && a !== null && a.memoizedState.isDehydrated)
            try {
              $(
                e,
                md,
                t.containerInfo
              );
            } catch (R) {
              Ue(e, e.return, R);
            }
          Yp && (Yp = !1, Io(e)), t.effectDuration += gr(f);
          break;
        case 4:
          i = Yu, Yu = Nf(
            e.stateNode.containerInfo
          ), na(t, e), Qt(e), Yu = i;
          break;
        case 12:
          i = tu(), na(t, e), Qt(e), e.stateNode.effectDuration += Ji(i);
          break;
        case 13:
          na(t, e), Qt(e), e.child.flags & 8192 && e.memoizedState !== null != (a !== null && a.memoizedState !== null) && (jp = qn()), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, Fo(e, i)));
          break;
        case 22:
          i & 512 && (Tt || a === null || Ll(a, a.return)), d = e.memoizedState !== null, h = a !== null && a.memoizedState !== null, m = Vc;
          var p = Tt;
          if (Vc = m || d, Tt = p || h, na(t, e), Tt = p, Vc = m, Qt(e), t = e.stateNode, t._current = e, t._visibility &= -3, t._visibility |= t._pendingVisibility & dm, i & 8192 && (t._visibility = d ? t._visibility & -2 : t._visibility | P0, d && (t = Vc || Tt, a === null || h || t || pu(e)), e.memoizedProps === null || e.memoizedProps.mode !== "manual"))
            e: for (a = null, t = e; ; ) {
              if (t.tag === 5 || t.tag === 26 || t.tag === 27) {
                if (a === null) {
                  h = a = t;
                  try {
                    f = h.stateNode, d ? $(
                      h,
                      si,
                      f
                    ) : $(
                      h,
                      Uy,
                      h.stateNode,
                      h.memoizedProps
                    );
                  } catch (R) {
                    Ue(h, h.return, R);
                  }
                }
              } else if (t.tag === 6) {
                if (a === null) {
                  h = t;
                  try {
                    o = h.stateNode, d ? $(
                      h,
                      Tc,
                      o
                    ) : $(
                      h,
                      Oa,
                      o,
                      h.memoizedProps
                    );
                  } catch (R) {
                    Ue(h, h.return, R);
                  }
                }
              } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
                t.child.return = t, t = t.child;
                continue;
              }
              if (t === e) break e;
              for (; t.sibling === null; ) {
                if (t.return === null || t.return === e)
                  break e;
                a === t && (a = null), t = t.return;
              }
              a === t && (a = null), t.sibling.return = t.return, t = t.sibling;
            }
          i & 4 && (i = e.updateQueue, i !== null && (a = i.retryQueue, a !== null && (i.retryQueue = null, Fo(e, a))));
          break;
        case 19:
          na(t, e), Qt(e), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, Fo(e, i)));
          break;
        case 21:
          break;
        default:
          na(t, e), Qt(e);
      }
    }
    function Qt(e) {
      var t = e.flags;
      if (t & 2) {
        try {
          $(e, sy, e);
        } catch (a) {
          Ue(e, e.return, a);
        }
        e.flags &= -3;
      }
      t & 4096 && (e.flags &= -4097);
    }
    function Io(e) {
      if (e.subtreeFlags & 1024)
        for (e = e.child; e !== null; ) {
          var t = e;
          Io(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
        }
    }
    function D0(e, t, a) {
      ah = a, nh = t, ry(t, e.alternate, e), nh = ah = null;
    }
    function _a(e, t) {
      if (t.subtreeFlags & 8772)
        for (t = t.child; t !== null; )
          ry(e, t.alternate, t), t = t.sibling;
    }
    function my(e) {
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Lr(
            e,
            e.return,
            Ol
          ), pu(e);
          break;
        case 1:
          Ll(e, e.return);
          var t = e.stateNode;
          typeof t.componentWillUnmount == "function" && ny(
            e,
            e.return,
            t
          ), pu(e);
          break;
        case 26:
        case 27:
        case 5:
          Ll(e, e.return), pu(e);
          break;
        case 22:
          Ll(e, e.return), e.memoizedState === null && pu(e);
          break;
        default:
          pu(e);
      }
    }
    function pu(e) {
      for (e = e.child; e !== null; )
        my(e), e = e.sibling;
    }
    function vy(e, t, a, i) {
      var f = a.flags;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          wa(
            e,
            a,
            i
          ), ty(a, Ol);
          break;
        case 1:
          if (wa(
            e,
            a,
            i
          ), t = a.stateNode, typeof t.componentDidMount == "function" && $(
            a,
            Tp,
            a,
            t
          ), t = a.updateQueue, t !== null) {
            e = a.stateNode;
            try {
              $(
                a,
                jr,
                t,
                e
              );
            } catch (o) {
              Ue(a, a.return, o);
            }
          }
          i && f & 64 && ly(a), mu(a, a.return);
          break;
        case 26:
        case 27:
        case 5:
          wa(
            e,
            a,
            i
          ), i && t === null && f & 4 && cy(a), mu(a, a.return);
          break;
        case 12:
          if (i && f & 4) {
            f = tu(), wa(
              e,
              a,
              i
            ), i = a.stateNode, i.effectDuration += Ji(f);
            try {
              $(
                a,
                uy,
                a,
                t,
                ev,
                i.effectDuration
              );
            } catch (o) {
              Ue(a, a.return, o);
            }
          } else
            wa(
              e,
              a,
              i
            );
          break;
        case 13:
          wa(
            e,
            a,
            i
          ), i && f & 4 && vu(e, a);
          break;
        case 22:
          a.memoizedState === null && wa(
            e,
            a,
            i
          ), mu(a, a.return);
          break;
        default:
          wa(
            e,
            a,
            i
          );
      }
    }
    function wa(e, t, a) {
      for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; )
        vy(
          e,
          t.alternate,
          t,
          a
        ), t = t.sibling;
    }
    function Jr(e, t) {
      var a = null;
      e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== a && (e != null && Aa(e), a != null && Fi(a));
    }
    function kr(e, t) {
      e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (Aa(t), e != null && Fi(e));
    }
    function ni(e, t, a, i) {
      if (t.subtreeFlags & 10256)
        for (t = t.child; t !== null; )
          py(
            e,
            t,
            a,
            i
          ), t = t.sibling;
    }
    function py(e, t, a, i) {
      var f = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          ni(
            e,
            t,
            a,
            i
          ), f & 2048 && Zr(t, ul | Ln);
          break;
        case 3:
          var o = tu();
          ni(
            e,
            t,
            a,
            i
          ), f & 2048 && (a = null, t.alternate !== null && (a = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== a && (Aa(t), a != null && Fi(a))), e.passiveEffectDuration += gr(o);
          break;
        case 12:
          if (f & 2048) {
            o = tu(), ni(
              e,
              t,
              a,
              i
            ), e = t.stateNode, e.passiveEffectDuration += Ji(o);
            try {
              $(
                t,
                iy,
                t,
                t.alternate,
                ev,
                e.passiveEffectDuration
              );
            } catch (d) {
              Ue(t, t.return, d);
            }
          } else
            ni(
              e,
              t,
              a,
              i
            );
          break;
        case 23:
          break;
        case 22:
          o = t.stateNode, t.memoizedState !== null ? o._visibility & Us ? ni(
            e,
            t,
            a,
            i
          ) : zf(
            e,
            t
          ) : o._visibility & Us ? ni(
            e,
            t,
            a,
            i
          ) : (o._visibility |= Us, at(
            e,
            t,
            a,
            i,
            (t.subtreeFlags & 10256) !== 0
          )), f & 2048 && Jr(
            t.alternate,
            t
          );
          break;
        case 24:
          ni(
            e,
            t,
            a,
            i
          ), f & 2048 && kr(t.alternate, t);
          break;
        default:
          ni(
            e,
            t,
            a,
            i
          );
      }
    }
    function at(e, t, a, i, f) {
      for (f = f && (t.subtreeFlags & 10256) !== 0, t = t.child; t !== null; )
        jt(
          e,
          t,
          a,
          i,
          f
        ), t = t.sibling;
    }
    function jt(e, t, a, i, f) {
      var o = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          at(
            e,
            t,
            a,
            i,
            f
          ), Zr(t, ul);
          break;
        case 23:
          break;
        case 22:
          var d = t.stateNode;
          t.memoizedState !== null ? d._visibility & Us ? at(
            e,
            t,
            a,
            i,
            f
          ) : zf(
            e,
            t
          ) : (d._visibility |= Us, at(
            e,
            t,
            a,
            i,
            f
          )), f && o & 2048 && Jr(
            t.alternate,
            t
          );
          break;
        case 24:
          at(
            e,
            t,
            a,
            i,
            f
          ), f && o & 2048 && kr(t.alternate, t);
          break;
        default:
          at(
            e,
            t,
            a,
            i,
            f
          );
      }
    }
    function zf(e, t) {
      if (t.subtreeFlags & 10256)
        for (t = t.child; t !== null; ) {
          var a = e, i = t, f = i.flags;
          switch (i.tag) {
            case 22:
              zf(
                a,
                i
              ), f & 2048 && Jr(
                i.alternate,
                i
              );
              break;
            case 24:
              zf(
                a,
                i
              ), f & 2048 && kr(
                i.alternate,
                i
              );
              break;
            default:
              zf(
                a,
                i
              );
          }
          t = t.sibling;
        }
    }
    function dc(e) {
      if (e.subtreeFlags & Dm)
        for (e = e.child; e !== null; )
          gy(e), e = e.sibling;
    }
    function gy(e) {
      switch (e.tag) {
        case 26:
          dc(e), e.flags & Dm && e.memoizedState !== null && Jv(
            Yu,
            e.memoizedState,
            e.memoizedProps
          );
          break;
        case 5:
          dc(e);
          break;
        case 3:
        case 4:
          var t = Yu;
          Yu = Nf(
            e.stateNode.containerInfo
          ), dc(e), Yu = t;
          break;
        case 22:
          e.memoizedState === null && (t = e.alternate, t !== null && t.memoizedState !== null ? (t = Dm, Dm = 16777216, dc(e), Dm = t) : dc(e));
          break;
        default:
          dc(e);
      }
    }
    function Sy(e) {
      var t = e.alternate;
      if (t !== null && (e = t.child, e !== null)) {
        t.child = null;
        do
          t = e.sibling, e.sibling = null, e = t;
        while (e !== null);
      }
    }
    function Af(e) {
      var t = e.deletions;
      if (e.flags & 16) {
        if (t !== null)
          for (var a = 0; a < t.length; a++) {
            var i = t[a];
            Sl = i, Ty(
              i,
              e
            );
          }
        Sy(e);
      }
      if (e.subtreeFlags & 10256)
        for (e = e.child; e !== null; )
          Df(e), e = e.sibling;
    }
    function Df(e) {
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          Af(e), e.flags & 2048 && _r(
            e,
            e.return,
            ul | Ln
          );
          break;
        case 3:
          var t = tu();
          Af(e), e.stateNode.passiveEffectDuration += gr(t);
          break;
        case 12:
          t = tu(), Af(e), e.stateNode.passiveEffectDuration += Ji(t);
          break;
        case 22:
          t = e.stateNode, e.memoizedState !== null && t._visibility & Us && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -5, Rf(e)) : Af(e);
          break;
        default:
          Af(e);
      }
    }
    function Rf(e) {
      var t = e.deletions;
      if (e.flags & 16) {
        if (t !== null)
          for (var a = 0; a < t.length; a++) {
            var i = t[a];
            Sl = i, Ty(
              i,
              e
            );
          }
        Sy(e);
      }
      for (e = e.child; e !== null; )
        by(e), e = e.sibling;
    }
    function by(e) {
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          _r(
            e,
            e.return,
            ul
          ), Rf(e);
          break;
        case 22:
          var t = e.stateNode;
          t._visibility & Us && (t._visibility &= -5, Rf(e));
          break;
        default:
          Rf(e);
      }
    }
    function Ty(e, t) {
      for (; Sl !== null; ) {
        var a = Sl, i = a;
        switch (i.tag) {
          case 0:
          case 11:
          case 15:
            _r(
              i,
              t,
              ul
            );
            break;
          case 23:
          case 22:
            i.memoizedState !== null && i.memoizedState.cachePool !== null && (i = i.memoizedState.cachePool.pool, i != null && Aa(i));
            break;
          case 24:
            Fi(i.memoizedState.cache);
        }
        if (i = a.child, i !== null) i.return = a, Sl = i;
        else
          e: for (a = e; Sl !== null; ) {
            i = Sl;
            var f = i.sibling, o = i.return;
            if (dy(i), i === a) {
              Sl = null;
              break e;
            }
            if (f !== null) {
              f.return = o, Sl = f;
              break e;
            }
            Sl = o;
          }
      }
    }
    function R0(e, t, a, i) {
      this.tag = e, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null, this.actualDuration = -0, this.actualStartTime = -1.1, this.treeBaseDuration = this.selfBaseDuration = -0, this._debugOwner = this._debugInfo = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, S1 || typeof Object.preventExtensions != "function" || Object.preventExtensions(this);
    }
    function Po(e) {
      return e = e.prototype, !(!e || !e.isReactComponent);
    }
    function bn(e, t) {
      var a = e.alternate;
      switch (a === null ? (a = we(
        e.tag,
        t,
        e.key,
        e.mode
      ), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a._debugOwner = e._debugOwner, a._debugHookTypes = e._debugHookTypes, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null, a.actualDuration = -0, a.actualStartTime = -1.1), a.flags = e.flags & 31457280, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue, t = e.dependencies, a.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext,
        _debugThenableState: t._debugThenableState
      }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.refCleanup = e.refCleanup, a.selfBaseDuration = e.selfBaseDuration, a.treeBaseDuration = e.treeBaseDuration, a._debugInfo = e._debugInfo, a._debugNeedsRemount = e._debugNeedsRemount, a.tag) {
        case 0:
        case 15:
          a.type = Ki(e.type);
          break;
        case 1:
          a.type = Ki(e.type);
          break;
        case 11:
          a.type = Uh(e.type);
      }
      return a;
    }
    function $r(e, t) {
      e.flags &= 31457282;
      var a = e.alternate;
      return a === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0) : (e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type, t = a.dependencies, e.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext,
        _debugThenableState: t._debugThenableState
      }, e.selfBaseDuration = a.selfBaseDuration, e.treeBaseDuration = a.treeBaseDuration), e;
    }
    function Wr(e, t, a, i, f, o) {
      var d = 0, h = e;
      if (typeof e == "function")
        Po(e) && (d = 1), h = Ki(h);
      else if (typeof e == "string")
        d = Jn(), d = V0(e, a, d) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
      else
        e: switch (e) {
          case xn:
            return gu(
              a.children,
              f,
              o,
              t
            );
          case zd:
            d = 8, f |= Jl, f |= xu;
            break;
          case Ad:
            return e = a, i = f, typeof e.id != "string" && console.error(
              'Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.',
              typeof e.id
            ), t = we(12, e, t, i | Rl), t.elementType = Ad, t.lanes = o, t.stateNode = { effectDuration: 0, passiveEffectDuration: 0 }, t;
          case Dd:
            return t = we(13, a, t, f), t.elementType = Dd, t.lanes = o, t;
          case ps:
            return t = we(19, a, t, f), t.elementType = ps, t.lanes = o, t;
          case Uc:
            return Fr(a, f, o, t);
          default:
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case ze:
                case da:
                  d = 10;
                  break e;
                case vs:
                  d = 9;
                  break e;
                case Oc:
                  d = 11, h = Uh(h);
                  break e;
                case vi:
                  d = 14;
                  break e;
                case yl:
                  d = 16, h = null;
                  break e;
              }
            h = "", (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (h += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), e === null ? a = "null" : ll(e) ? a = "array" : e !== void 0 && e.$$typeof === mi ? (a = "<" + (ne(e.type) || "Unknown") + " />", h = " Did you accidentally export a JSX literal instead of a component?") : a = typeof e, (d = i ? $l(i) : null) && (h += `

Check the render method of \`` + d + "`."), d = 29, a = Error(
              "Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + (a + "." + h)
            ), h = null;
        }
      return t = we(d, a, t, f), t.elementType = e, t.type = h, t.lanes = o, t._debugOwner = i, t;
    }
    function Mf(e, t, a) {
      return t = Wr(
        e.type,
        e.key,
        e.props,
        e._owner,
        t,
        a
      ), t._debugOwner = e._owner, t;
    }
    function gu(e, t, a, i) {
      return e = we(7, e, i, t), e.lanes = a, e;
    }
    function Fr(e, t, a, i) {
      e = we(22, e, i, t), e.elementType = Uc, e.lanes = a;
      var f = {
        _visibility: P0,
        _pendingVisibility: P0,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null,
        _current: null,
        detach: function() {
          var o = f, d = o._current;
          if (d === null)
            throw Error(
              "Calling Offscreen.detach before instance handle has been set."
            );
          if (!(o._pendingVisibility & dm)) {
            var h = It(d, 2);
            h !== null && (o._pendingVisibility |= dm, Qe(h, d, 2));
          }
        },
        attach: function() {
          var o = f, d = o._current;
          if (d === null)
            throw Error(
              "Calling Offscreen.detach before instance handle has been set."
            );
          if (o._pendingVisibility & dm) {
            var h = It(d, 2);
            h !== null && (o._pendingVisibility &= -3, Qe(h, d, 2));
          }
        }
      };
      return e.stateNode = f, e;
    }
    function Ir(e, t, a) {
      return e = we(6, e, null, t), e.lanes = a, e;
    }
    function es(e, t, a) {
      return t = we(
        4,
        e.children !== null ? e.children : [],
        e.key,
        t
      ), t.lanes = a, t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
      }, t;
    }
    function Tn(e) {
      e.flags |= 4;
    }
    function En(e, t) {
      if (t.type !== "stylesheet" || (t.state.loading & _n) !== ks)
        e.flags &= -16777217;
      else if (e.flags |= 16777216, !pd(t)) {
        if (t = Qn.current, t !== null && ((Te & 4194176) === Te ? Ui !== null : (Te & 62914560) !== Te && !(Te & 536870912) || t !== Ui))
          throw Sm = Sp, Dg;
        e.flags |= 8192;
      }
    }
    function Of(e, t) {
      t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? $m() : 536870912, e.lanes |= t, js |= t);
    }
    function ts(e, t) {
      if (!Re)
        switch (e.tailMode) {
          case "hidden":
            t = e.tail;
            for (var a = null; t !== null; )
              t.alternate !== null && (a = t), t = t.sibling;
            a === null ? e.tail = null : a.sibling = null;
            break;
          case "collapsed":
            a = e.tail;
            for (var i = null; a !== null; )
              a.alternate !== null && (i = a), a = a.sibling;
            i === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : i.sibling = null;
        }
    }
    function ke(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, a = 0, i = 0;
      if (t)
        if ((e.mode & Rl) !== lt) {
          for (var f = e.selfBaseDuration, o = e.child; o !== null; )
            a |= o.lanes | o.childLanes, i |= o.subtreeFlags & 31457280, i |= o.flags & 31457280, f += o.treeBaseDuration, o = o.sibling;
          e.treeBaseDuration = f;
        } else
          for (f = e.child; f !== null; )
            a |= f.lanes | f.childLanes, i |= f.subtreeFlags & 31457280, i |= f.flags & 31457280, f.return = e, f = f.sibling;
      else if ((e.mode & Rl) !== lt) {
        f = e.actualDuration, o = e.selfBaseDuration;
        for (var d = e.child; d !== null; )
          a |= d.lanes | d.childLanes, i |= d.subtreeFlags, i |= d.flags, f += d.actualDuration, o += d.treeBaseDuration, d = d.sibling;
        e.actualDuration = f, e.treeBaseDuration = o;
      } else
        for (f = e.child; f !== null; )
          a |= f.lanes | f.childLanes, i |= f.subtreeFlags, i |= f.flags, f.return = e, f = f.sibling;
      return e.subtreeFlags |= i, e.childLanes = a, t;
    }
    function Ey(e, t, a) {
      var i = t.pendingProps;
      switch (qh(t), t.tag) {
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return ke(t), null;
        case 1:
          return ke(t), null;
        case 3:
          return i = t.stateNode, a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), gn(il, t), ot(t), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && (af(t) ? (Sr(), Tn(t)) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, qu !== null && (Su(qu), qu = null))), ke(t), null;
        case 26:
          return a = t.memoizedState, e === null ? (Tn(t), a !== null ? (ke(t), En(
            t,
            a
          )) : (ke(t), t.flags &= -16777217)) : a ? a !== e.memoizedState ? (Tn(t), ke(t), En(
            t,
            a
          )) : (ke(t), t.flags &= -16777217) : (e.memoizedProps !== i && Tn(t), ke(t), t.flags &= -16777217), null;
        case 27:
          Fl(t), a = At(_t.current);
          var f = t.type;
          if (e !== null && t.stateNode != null)
            e.memoizedProps !== i && Tn(t);
          else {
            if (!i) {
              if (t.stateNode === null)
                throw Error(
                  "We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue."
                );
              return ke(t), null;
            }
            e = Jn(), af(t) ? r0(t) : (e = Yf(
              f,
              i,
              a,
              e,
              !0
            ), t.stateNode = e, Tn(t));
          }
          return ke(t), null;
        case 5:
          if (Fl(t), a = t.type, e !== null && t.stateNode != null)
            e.memoizedProps !== i && Tn(t);
          else {
            if (!i) {
              if (t.stateNode === null)
                throw Error(
                  "We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue."
                );
              return ke(t), null;
            }
            if (f = Jn(), af(t))
              r0(t);
            else {
              switch (e = At(_t.current), cr(a, f.ancestorInfo), f = f.context, e = hd(e), f) {
                case sh:
                  e = e.createElementNS(ma, a);
                  break;
                case Ov:
                  e = e.createElementNS(
                    Ri,
                    a
                  );
                  break;
                default:
                  switch (a) {
                    case "svg":
                      e = e.createElementNS(
                        ma,
                        a
                      );
                      break;
                    case "math":
                      e = e.createElementNS(
                        Ri,
                        a
                      );
                      break;
                    case "script":
                      e = e.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild);
                      break;
                    case "select":
                      e = typeof i.is == "string" ? e.createElement("select", { is: i.is }) : e.createElement("select"), i.multiple ? e.multiple = !0 : i.size && (e.size = i.size);
                      break;
                    default:
                      e = typeof i.is == "string" ? e.createElement(a, {
                        is: i.is
                      }) : e.createElement(a), a.indexOf("-") === -1 && (a !== a.toLowerCase() && console.error(
                        "<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.",
                        a
                      ), Object.prototype.toString.call(e) !== "[object HTMLUnknownElement]" || Bn.call(
                        B1,
                        a
                      ) || (B1[a] = !0, console.error(
                        "The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.",
                        a
                      )));
                  }
              }
              e[al] = t, e[wl] = i;
              e: for (f = t.child; f !== null; ) {
                if (f.tag === 5 || f.tag === 6)
                  e.appendChild(f.stateNode);
                else if (f.tag !== 4 && f.tag !== 27 && f.child !== null) {
                  f.child.return = f, f = f.child;
                  continue;
                }
                if (f === t) break e;
                for (; f.sibling === null; ) {
                  if (f.return === null || f.return === t)
                    break e;
                  f = f.return;
                }
                f.sibling.return = f.return, f = f.sibling;
              }
              t.stateNode = e;
              e: switch (nt(e, a, i), a) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  e = !!i.autoFocus;
                  break e;
                case "img":
                  e = !0;
                  break e;
                default:
                  e = !1;
              }
              e && Tn(t);
            }
          }
          return ke(t), t.flags &= -16777217, null;
        case 6:
          if (e && t.stateNode != null)
            e.memoizedProps !== i && Tn(t);
          else {
            if (typeof i != "string" && t.stateNode === null)
              throw Error(
                "We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue."
              );
            if (e = At(_t.current), a = Jn(), af(t)) {
              e = t.stateNode, i = t.memoizedProps, f = !Yc, a = null;
              var o = pa;
              if (o !== null)
                switch (o.tag) {
                  case 3:
                    f && (f = rs(
                      e,
                      i,
                      a
                    ), f !== null && (Ku(t, 0).serverProps = f));
                    break;
                  case 27:
                  case 5:
                    a = o.memoizedProps, f && (f = rs(
                      e,
                      i,
                      a
                    ), f !== null && (Ku(
                      t,
                      0
                    ).serverProps = f));
                }
              e[al] = t, e = !!(e.nodeValue === i || a !== null && a.suppressHydrationWarning === !0 || sd(e.nodeValue, i)), e || Va(t);
            } else
              a = a.ancestorInfo.current, a != null && So(i, a.tag), e = hd(e).createTextNode(
                i
              ), e[al] = t, t.stateNode = e;
          }
          return ke(t), null;
        case 13:
          if (i = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            if (f = af(t), i !== null && i.dehydrated !== null) {
              if (e === null) {
                if (!f)
                  throw Error(
                    "A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React."
                  );
                if (f = t.memoizedState, f = f !== null ? f.dehydrated : null, !f)
                  throw Error(
                    "Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue."
                  );
                f[al] = t, ke(t), (t.mode & Rl) !== lt && i !== null && (f = t.child, f !== null && (t.treeBaseDuration -= f.treeBaseDuration));
              } else
                Sr(), nf(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4, ke(t), (t.mode & Rl) !== lt && i !== null && (f = t.child, f !== null && (t.treeBaseDuration -= f.treeBaseDuration));
              f = !1;
            } else
              qu !== null && (Su(qu), qu = null), f = !0;
            if (!f)
              return t.flags & 256 ? (Xa(t), t) : (Xa(t), null);
          }
          return Xa(t), t.flags & 128 ? (t.lanes = a, (t.mode & Rl) !== lt && Ao(t), t) : (i = i !== null, e = e !== null && e.memoizedState !== null, i && (a = t.child, f = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (f = a.alternate.memoizedState.cachePool.pool), o = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (o = a.memoizedState.cachePool.pool), o !== f && (a.flags |= 2048)), i !== e && i && (t.child.flags |= 8192), Of(t, t.updateQueue), ke(t), (t.mode & Rl) !== lt && i && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration)), null);
        case 4:
          return ot(t), e === null && fd(
            t.stateNode.containerInfo
          ), ke(t), null;
        case 10:
          return gn(t.type, t), ke(t), null;
        case 19:
          if (Ce(nl, t), f = t.memoizedState, f === null) return ke(t), null;
          if (i = (t.flags & 128) !== 0, o = f.rendering, o === null)
            if (i) ts(f, !1);
            else {
              if (Et !== Qc || e !== null && e.flags & 128)
                for (e = t.child; e !== null; ) {
                  if (o = Ho(e), o !== null) {
                    for (t.flags |= 128, ts(f, !1), e = o.updateQueue, t.updateQueue = e, Of(t, e), t.subtreeFlags = 0, e = a, i = t.child; i !== null; )
                      $r(i, e), i = i.sibling;
                    return be(
                      nl,
                      nl.current & $d | Tm,
                      t
                    ), t.child;
                  }
                  e = e.sibling;
                }
              f.tail !== null && qn() > mv && (t.flags |= 128, i = !0, ts(f, !1), t.lanes = 4194304);
            }
          else {
            if (!i)
              if (e = Ho(o), e !== null) {
                if (t.flags |= 128, i = !0, e = e.updateQueue, t.updateQueue = e, Of(t, e), ts(f, !0), f.tail === null && f.tailMode === "hidden" && !o.alternate && !Re)
                  return ke(t), null;
              } else
                2 * qn() - f.renderingStartTime > mv && a !== 536870912 && (t.flags |= 128, i = !0, ts(f, !1), t.lanes = 4194304);
            f.isBackwards ? (o.sibling = t.child, t.child = o) : (e = f.last, e !== null ? e.sibling = o : t.child = o, f.last = o);
          }
          return f.tail !== null ? (e = f.tail, f.rendering = e, f.tail = e.sibling, f.renderingStartTime = qn(), e.sibling = null, a = nl.current, a = i ? a & $d | Tm : a & $d, be(nl, a, t), e) : (ke(t), null);
        case 22:
        case 23:
          return Xa(t), Xh(t), i = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== i && (t.flags |= 8192) : i && (t.flags |= 8192), i ? a & 536870912 && !(t.flags & 128) && (ke(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ke(t), i = t.updateQueue, i !== null && Of(t, i.retryQueue), i = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== i && (t.flags |= 2048), e !== null && Ce(Ys, t), null;
        case 24:
          return i = null, e !== null && (i = e.memoizedState.cache), t.memoizedState.cache !== i && (t.flags |= 2048), gn(il, t), ke(t), null;
        case 25:
          return null;
      }
      throw Error(
        "Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue."
      );
    }
    function hc(e, t) {
      switch (qh(t), t.tag) {
        case 1:
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & Rl) !== lt && Ao(t), t) : null;
        case 3:
          return gn(il, t), ot(t), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
        case 26:
        case 27:
        case 5:
          return Fl(t), null;
        case 13:
          if (Xa(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
            if (t.alternate === null)
              throw Error(
                "Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue."
              );
            nf();
          }
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & Rl) !== lt && Ao(t), t) : null;
        case 19:
          return Ce(nl, t), null;
        case 4:
          return ot(t), null;
        case 10:
          return gn(t.type, t), null;
        case 22:
        case 23:
          return Xa(t), Xh(t), e !== null && Ce(Ys, t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & Rl) !== lt && Ao(t), t) : null;
        case 24:
          return gn(il, t), null;
        case 25:
          return null;
        default:
          return null;
      }
    }
    function zn(e, t) {
      switch (qh(t), t.tag) {
        case 3:
          gn(il, t), ot(t);
          break;
        case 26:
        case 27:
        case 5:
          Fl(t);
          break;
        case 4:
          ot(t);
          break;
        case 13:
          Xa(t);
          break;
        case 19:
          Ce(nl, t);
          break;
        case 10:
          gn(t.type, t);
          break;
        case 22:
        case 23:
          Xa(t), Xh(t), e !== null && Ce(Ys, t);
          break;
        case 24:
          gn(il, t);
      }
    }
    function ui() {
      KS.forEach(function(e) {
        return e();
      });
    }
    function An() {
      var e = typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0;
      return e || U.actQueue === null || console.error(
        "The current testing environment is not configured to support act(...)"
      ), e;
    }
    function El(e) {
      if ((ut & ba) !== Pa && Te !== 0)
        return Te & -Te;
      var t = U.T;
      return t !== null ? (t._updatedFibers || (t._updatedFibers = /* @__PURE__ */ new Set()), t._updatedFibers.add(e), e = qs, e !== 0 ? e : id()) : yo();
    }
    function Pr() {
      tn === 0 && (tn = !(Te & 536870912) || Re ? km() : 536870912);
      var e = Qn.current;
      return e !== null && (e.flags |= 32), tn;
    }
    function Qe(e, t, a) {
      if (fh && console.error("useInsertionEffect must not schedule updates."), wp && (pv = !0), (e === We && Fe === Qs || e.cancelPendingCommit !== null) && (ii(e, 0), Dn(
        e,
        Te,
        tn,
        !1
      )), $t(e, a), ut & ba && e === We) {
        if (ha)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              e = Se && P(Se) || "Unknown", M1.has(e) || (M1.add(e), t = P(t) || "Unknown", console.error(
                "Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://react.dev/link/setstate-in-render",
                t,
                e,
                e
              ));
              break;
            case 1:
              R1 || (console.error(
                "Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."
              ), R1 = !0);
          }
      } else
        Dl && Wm(e, t, a), zu(t), e === We && ((ut & ba) === Pa && (io |= a), Et === Xs && Dn(
          e,
          Te,
          tn,
          !1
        )), Ja(e);
    }
    function ls(e, t, a) {
      if ((ut & (ba | Xc)) !== Pa)
        throw Error("Should not already be working.");
      var i = !a && (t & 60) === 0 && (t & e.expiredLanes) === 0 || ho(e, t), f = i ? is(e, t) : us(e, t, !0), o = i;
      do {
        if (f === Qc) {
          ch && !i && Dn(e, t, 0, !1);
          break;
        } else if (f === hv)
          Dn(
            e,
            t,
            0,
            !jc
          );
        else {
          if (a = e.current.alternate, o && !ed(a)) {
            f = us(e, t, !1), o = !1;
            continue;
          }
          if (f === uh) {
            if (o = t, e.errorRecoveryDisabledLanes & o)
              var d = 0;
            else
              d = e.pendingLanes & -536870913, d = d !== 0 ? d : d & 536870912 ? 536870912 : 0;
            if (d !== 0) {
              t = d;
              e: {
                f = e;
                var h = d;
                d = Cm;
                var m = f.current.memoizedState.isDehydrated;
                if (m && (ii(
                  f,
                  h
                ).flags |= 256), h = us(
                  f,
                  h,
                  !1
                ), h !== uh) {
                  if (Xp && !m) {
                    f.errorRecoveryDisabledLanes |= o, io |= o, f = Xs;
                    break e;
                  }
                  f = Nu, Nu = d, f !== null && Su(f);
                }
                f = h;
              }
              if (o = !1, f !== uh) continue;
            }
          }
          if (f === Mm) {
            ii(e, 0), Dn(e, t, 0, !0);
            break;
          }
          e: {
            switch (i = e, f) {
              case Qc:
              case Mm:
                throw Error("Root did not complete. This is a bug in React.");
              case Xs:
                if ((t & 4194176) === t) {
                  Dn(
                    i,
                    t,
                    tn,
                    !jc
                  );
                  break e;
                }
                break;
              case uh:
                Nu = null;
                break;
              case Np:
              case T1:
                break;
              default:
                throw Error("Unknown root exit status.");
            }
            if (i.finishedWork = a, i.finishedLanes = t, U.actQueue !== null)
              zl(
                i,
                Nu,
                xm,
                yv,
                tn,
                io,
                js,
                D1,
                vp,
                0
              );
            else {
              if ((t & 62914560) === t && (f = jp + z1 - qn(), 10 < f)) {
                if (Dn(
                  i,
                  t,
                  tn,
                  !jc
                ), Yi(i, 0) !== 0) break e;
                i.timeoutHandle = q1(
                  tl.bind(
                    null,
                    i,
                    a,
                    Nu,
                    xm,
                    yv,
                    t,
                    tn,
                    io,
                    js,
                    jc,
                    FS,
                    vp,
                    0
                  ),
                  f
                );
                break e;
              }
              tl(
                i,
                a,
                Nu,
                xm,
                yv,
                t,
                tn,
                io,
                js,
                jc,
                D1,
                vp,
                0
              );
            }
          }
        }
        break;
      } while (!0);
      Ja(e);
    }
    function Su(e) {
      Nu === null ? Nu = e : Nu.push.apply(
        Nu,
        e
      );
    }
    function tl(e, t, a, i, f, o, d, h, m, p, R, N, M) {
      var G = t.subtreeFlags;
      if ((G & 8192 || (G & 16785408) === 16785408) && (Vm = { stylesheets: null, count: 0, unsuspend: Yy }, gy(t), t = kv(), t !== null)) {
        e.cancelPendingCommit = t(
          zl.bind(
            null,
            e,
            a,
            i,
            f,
            d,
            h,
            m,
            WS,
            N,
            M
          )
        ), Dn(
          e,
          o,
          d,
          !p
        );
        return;
      }
      zl(
        e,
        a,
        i,
        f,
        d,
        h,
        m,
        R,
        N,
        M
      );
    }
    function ed(e) {
      for (var t = e; ; ) {
        var a = t.tag;
        if ((a === 0 || a === 11 || a === 15) && t.flags & 16384 && (a = t.updateQueue, a !== null && (a = a.stores, a !== null)))
          for (var i = 0; i < a.length; i++) {
            var f = a[i], o = f.getSnapshot;
            f = f.value;
            try {
              if (!va(o(), f)) return !1;
            } catch {
              return !1;
            }
          }
        if (a = t.child, t.subtreeFlags & 16384 && a !== null)
          a.return = t, t = a;
        else {
          if (t === e) break;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) return !0;
            t = t.return;
          }
          t.sibling.return = t.return, t = t.sibling;
        }
      }
      return !0;
    }
    function Dn(e, t, a, i) {
      t &= ~Qp, t &= ~io, e.suspendedLanes |= t, e.pingedLanes &= ~t, i && (e.warmLanes |= t), i = e.expirationTimes;
      for (var f = t; 0 < f; ) {
        var o = 31 - pl(f), d = 1 << o;
        i[o] = -1, f &= ~d;
      }
      a !== 0 && kn(e, a, t);
    }
    function ua() {
      return (ut & (ba | Xc)) === Pa ? (xf(0), !1) : !0;
    }
    function as() {
      if (Se !== null) {
        if (Fe === xa)
          var e = Se.return;
        else
          e = Se, _o(), on(e), Jd = null, bm = 0, e = Se;
        for (; e !== null; )
          zn(e.alternate, e), e = e.return;
        Se = null;
      }
    }
    function ii(e, t) {
      e.finishedWork = null, e.finishedLanes = 0;
      var a = e.timeoutHandle;
      a !== lg && (e.timeoutHandle = lg, nb(a)), a = e.cancelPendingCommit, a !== null && (e.cancelPendingCommit = null, a()), as(), We = e, Se = a = bn(e.current, null), Te = t, Fe = xa, en = null, jc = !1, ch = ho(e, t), Xp = !1, Et = Qc, js = tn = Qp = io = uo = 0, Nu = Cm = null, yv = !1, t & 8 && (t |= t & 32);
      var i = e.entangledLanes;
      if (i !== 0)
        for (e = e.entanglements, i &= t; 0 < i; ) {
          var f = 31 - pl(i), o = 1 << f;
          t |= e[f], i &= ~o;
        }
      return Ci = t, mr(), Bu.discardPendingWarnings(), a;
    }
    function bu(e, t) {
      ce = null, U.H = Hi, U.getCurrentStack = null, ha = !1, ml = null, t === iv ? (t = h0(), Fe = Um) : t === Dg ? (t = h0(), Fe = E1) : Fe = t === n1 ? Vp : t !== null && typeof t == "object" && typeof t.then == "function" ? ih : Om, en = t;
      var a = Se;
      if (a === null)
        Et = Mm, fe(
          e,
          Xl(t, e.current)
        );
      else
        switch (a.mode & Rl && Ch(a), Vu(), Fe) {
          case Om:
            K !== null && typeof K.markComponentErrored == "function" && K.markComponentErrored(
              a,
              t,
              Te
            );
            break;
          case Qs:
          case Um:
          case ih:
          case Hm:
            K !== null && typeof K.markComponentSuspended == "function" && K.markComponentSuspended(
              a,
              t,
              Te
            );
        }
    }
    function Tu() {
      var e = U.H;
      return U.H = Hi, e === null ? Hi : e;
    }
    function Uf() {
      var e = U.A;
      return U.A = wS, e;
    }
    function ns() {
      Et = Xs, jc || (Te & 4194176) !== Te && Qn.current !== null || (ch = !0), !(uo & 134217727) && !(io & 134217727) || We === null || Dn(
        We,
        Te,
        tn,
        !1
      );
    }
    function us(e, t, a) {
      var i = ut;
      ut |= ba;
      var f = Tu(), o = Uf();
      if (We !== e || Te !== t) {
        if (Dl) {
          var d = e.memoizedUpdaters;
          0 < d.size && (Ie(e, Te), d.clear()), Fm(e, t);
        }
        xm = null, ii(e, t);
      }
      _m(t), t = !1, d = Et;
      e: do
        try {
          if (Fe !== xa && Se !== null) {
            var h = Se, m = en;
            switch (Fe) {
              case Vp:
                as(), d = hv;
                break e;
              case Um:
              case Qs:
              case ih:
                Qn.current === null && (t = !0);
                var p = Fe;
                if (Fe = xa, en = null, yc(e, h, m, p), a && ch) {
                  d = Qc;
                  break e;
                }
                break;
              default:
                p = Fe, Fe = xa, en = null, yc(e, h, m, p);
            }
          }
          Hf(), d = Et;
          break;
        } catch (R) {
          bu(e, R);
        }
      while (!0);
      return t && e.shellSuspendCounter++, _o(), ut = i, U.H = f, U.A = o, wm(), Se === null && (We = null, Te = 0, mr()), d;
    }
    function Hf() {
      for (; Se !== null; ) zy(Se);
    }
    function is(e, t) {
      var a = ut;
      ut |= ba;
      var i = Tu(), f = Uf();
      if (We !== e || Te !== t) {
        if (Dl) {
          var o = e.memoizedUpdaters;
          0 < o.size && (Ie(e, Te), o.clear()), Fm(e, t);
        }
        xm = null, mv = qn() + A1, ii(e, t);
      } else
        ch = ho(
          e,
          t
        );
      _m(t);
      e: do
        try {
          if (Fe !== xa && Se !== null)
            t: switch (t = Se, o = en, Fe) {
              case Om:
                Fe = xa, en = null, yc(
                  e,
                  t,
                  o,
                  Om
                );
                break;
              case Qs:
                if (Nh(o)) {
                  Fe = xa, en = null, Cf(t);
                  break;
                }
                t = function() {
                  Fe === Qs && We === e && (Fe = Hm), Ja(e);
                }, o.then(t, t);
                break e;
              case Um:
                Fe = Hm;
                break e;
              case E1:
                Fe = Gp;
                break e;
              case Hm:
                Nh(o) ? (Fe = xa, en = null, Cf(t)) : (Fe = xa, en = null, yc(
                  e,
                  t,
                  o,
                  Hm
                ));
                break;
              case Gp:
                var d = null;
                switch (Se.tag) {
                  case 26:
                    d = Se.memoizedState;
                  case 5:
                  case 27:
                    var h = Se;
                    if (!d || pd(d)) {
                      Fe = xa, en = null;
                      var m = h.sibling;
                      if (m !== null) Se = m;
                      else {
                        var p = h.return;
                        p !== null ? (Se = p, cs(p)) : Se = null;
                      }
                      break t;
                    }
                    break;
                  default:
                    console.error(
                      "Unexpected type of fiber triggered a suspensey commit. This is a bug in React."
                    );
                }
                Fe = xa, en = null, yc(
                  e,
                  t,
                  o,
                  Gp
                );
                break;
              case ih:
                Fe = xa, en = null, yc(
                  e,
                  t,
                  o,
                  ih
                );
                break;
              case Vp:
                as(), Et = hv;
                break e;
              default:
                throw Error(
                  "Unexpected SuspendedReason. This is a bug in React."
                );
            }
          U.actQueue !== null ? Hf() : M0();
          break;
        } catch (R) {
          bu(e, R);
        }
      while (!0);
      return _o(), U.H = i, U.A = f, ut = a, Se !== null ? (K !== null && typeof K.markRenderYielded == "function" && K.markRenderYielded(), Qc) : (wm(), We = null, Te = 0, mr(), Et);
    }
    function M0() {
      for (; Se !== null && !Hd(); )
        zy(Se);
    }
    function zy(e) {
      var t = e.alternate;
      (e.mode & Rl) !== lt ? (ki(e), t = $(
        e,
        Gr,
        t,
        e,
        Ci
      ), Ch(e)) : t = $(
        e,
        Gr,
        t,
        e,
        Ci
      ), e.memoizedProps = e.pendingProps, t === null ? cs(e) : Se = t;
    }
    function Cf(e) {
      var t = $(e, ci, e);
      e.memoizedProps = e.pendingProps, t === null ? cs(e) : Se = t;
    }
    function ci(e) {
      var t = e.alternate, a = (e.mode & Rl) !== lt;
      switch (a && ki(e), e.tag) {
        case 15:
        case 0:
          t = Ih(
            t,
            e,
            e.pendingProps,
            e.type,
            void 0,
            Te
          );
          break;
        case 11:
          t = Ih(
            t,
            e,
            e.pendingProps,
            e.type.render,
            e.ref,
            Te
          );
          break;
        case 5:
          on(e);
        default:
          zn(t, e), e = Se = $r(e, Ci), t = Gr(t, e, Ci);
      }
      return a && Ch(e), t;
    }
    function yc(e, t, a, i) {
      _o(), on(t), Jd = null, bm = 0;
      var f = t.return;
      try {
        if (ic(
          e,
          f,
          t,
          a,
          Te
        )) {
          Et = Mm, fe(
            e,
            Xl(a, e.current)
          ), Se = null;
          return;
        }
      } catch (o) {
        if (f !== null) throw Se = f, o;
        Et = Mm, fe(
          e,
          Xl(a, e.current)
        ), Se = null;
        return;
      }
      t.flags & 32768 ? (Re || i === Om ? e = !0 : ch || Te & 536870912 ? e = !1 : (jc = e = !0, (i === Qs || i === Um || i === ih) && (i = Qn.current, i !== null && i.tag === 13 && (i.flags |= 16384))), fi(t, e)) : cs(t);
    }
    function cs(e) {
      var t = e;
      do {
        if (t.flags & 32768) {
          fi(
            t,
            jc
          );
          return;
        }
        var a = t.alternate;
        if (e = t.return, ki(t), a = $(
          t,
          Ey,
          a,
          t,
          Ci
        ), (t.mode & Rl) !== lt && xh(t), a !== null) {
          Se = a;
          return;
        }
        if (t = t.sibling, t !== null) {
          Se = t;
          return;
        }
        Se = t = e;
      } while (t !== null);
      Et === Qc && (Et = T1);
    }
    function fi(e, t) {
      do {
        var a = hc(e.alternate, e);
        if (a !== null) {
          a.flags &= 32767, Se = a;
          return;
        }
        if ((e.mode & Rl) !== lt) {
          xh(e), a = e.actualDuration;
          for (var i = e.child; i !== null; )
            a += i.actualDuration, i = i.sibling;
          e.actualDuration = a;
        }
        if (a = e.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !t && (e = e.sibling, e !== null)) {
          Se = e;
          return;
        }
        Se = e = a;
      } while (e !== null);
      Et = hv, Se = null;
    }
    function zl(e, t, a, i, f, o, d, h, m, p) {
      var R = U.T, N = Ze.p;
      try {
        Ze.p = ya, U.T = null, O0(
          e,
          t,
          a,
          i,
          N,
          f,
          o,
          d,
          h,
          m,
          p
        );
      } finally {
        U.T = R, Ze.p = N;
      }
    }
    function O0(e, t, a, i, f, o, d, h) {
      do
        Eu();
      while (Ls !== null);
      if (Bu.flushLegacyContextWarning(), Bu.flushPendingUnsafeLifecycleWarnings(), (ut & (ba | Xc)) !== Pa)
        throw Error("Should not already be working.");
      var m = e.finishedWork;
      if (i = e.finishedLanes, K !== null && typeof K.markCommitStarted == "function" && K.markCommitStarted(i), m === null) return Is(), null;
      if (i === 0 && console.error(
        "root.finishedLanes should not be empty during a commit. This is a bug in React."
      ), e.finishedWork = null, e.finishedLanes = 0, m === e.current)
        throw Error(
          "Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue."
        );
      e.callbackNode = null, e.callbackPriority = 0, e.cancelPendingCommit = null;
      var p = m.lanes | m.childLanes;
      if (p |= mp, Gv(
        e,
        i,
        p,
        o,
        d,
        h
      ), e === We && (Se = We = null, Te = 0), !(m.subtreeFlags & 10256) && !(m.flags & 10256) || vv || (vv = !0, Lp = p, Zp = a, ia(_f, function() {
        return Eu(), null;
      })), ev = _d(), a = (m.flags & 15990) !== 0, m.subtreeFlags & 15990 || a ? (a = U.T, U.T = null, o = Ze.p, Ze.p = ya, d = ut, ut |= Xc, Kr(e, m), hy(
        e,
        m,
        i
      ), wv(eg, e.containerInfo), xv = !!Pp, eg = Pp = null, e.current = m, K !== null && typeof K.markLayoutEffectsStarted == "function" && K.markLayoutEffectsStarted(
        i
      ), D0(m, e, i), K !== null && typeof K.markLayoutEffectsStopped == "function" && K.markLayoutEffectsStopped(), Ou(), ut = d, Ze.p = o, U.T = a) : e.current = m, (a = vv) ? (vv = !1, Ls = e, Bm = i) : (Ay(e, p), Zs = 0, Ym = null), p = e.pendingLanes, p === 0 && (co = null), a || Dy(e), wc(m.stateNode, f), Dl && e.memoizedUpdaters.clear(), ui(), Ja(e), t !== null)
        for (f = e.onRecoverableError, m = 0; m < t.length; m++)
          p = t[m], a = U0(p.stack), $(
            p.source,
            f,
            p.value,
            a
          );
      return Bm & 3 && Eu(), p = e.pendingLanes, i & 4194218 && p & 42 ? (lv = !0, e === _p ? qm++ : (qm = 0, _p = e)) : qm = 0, xf(0), Is(), null;
    }
    function U0(e) {
      return e = { componentStack: e }, Object.defineProperty(e, "digest", {
        get: function() {
          console.error(
            'You are accessing "digest" from the errorInfo object passed to onRecoverableError. This property is no longer provided as part of errorInfo but can be accessed as a property of the Error instance itself.'
          );
        }
      }), e;
    }
    function Ay(e, t) {
      (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Fi(t)));
    }
    function Eu() {
      if (Ls !== null) {
        var e = Ls, t = Lp;
        Lp = 0;
        var a = Im(Bm), i = Fa > a ? Fa : a;
        a = U.T;
        var f = Ze.p;
        try {
          if (Ze.p = i, U.T = null, Ls === null)
            var o = !1;
          else {
            i = Zp, Zp = null;
            var d = Ls, h = Bm;
            if (Ls = null, Bm = 0, (ut & (ba | Xc)) !== Pa)
              throw Error(
                "Cannot flush passive effects while already rendering."
              );
            wp = !0, pv = !1, K !== null && typeof K.markPassiveEffectsStarted == "function" && K.markPassiveEffectsStarted(h);
            var m = ut;
            if (ut |= Xc, Df(d.current), py(
              d,
              d.current,
              h,
              i
            ), K !== null && typeof K.markPassiveEffectsStopped == "function" && K.markPassiveEffectsStopped(), Dy(d), ut = m, xf(0, !1), pv ? d === Ym ? Zs++ : (Zs = 0, Ym = d) : Zs = 0, pv = wp = !1, vl && typeof vl.onPostCommitFiberRoot == "function")
              try {
                vl.onPostCommitFiberRoot(wf, d);
              } catch (R) {
                Al || (Al = !0, console.error(
                  "React instrumentation encountered an error: %s",
                  R
                ));
              }
            var p = d.current.stateNode;
            p.effectDuration = 0, p.passiveEffectDuration = 0, o = !0;
          }
          return o;
        } finally {
          Ze.p = f, U.T = a, Ay(e, t);
        }
      }
      return !1;
    }
    function td(e, t, a) {
      t = Xl(a, t), t = rt(e.stateNode, t, 2), e = yu(e, t, 2), e !== null && ($t(e, 2), Ja(e));
    }
    function Ue(e, t, a) {
      if (fh = !1, e.tag === 3)
        td(e, e, a);
      else {
        for (; t !== null; ) {
          if (t.tag === 3) {
            td(
              t,
              e,
              a
            );
            return;
          }
          if (t.tag === 1) {
            var i = t.stateNode;
            if (typeof t.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (co === null || !co.has(i))) {
              e = Xl(a, e), a = mf(2), i = yu(t, a, 2), i !== null && (ei(
                a,
                i,
                t,
                e
              ), $t(i, 2), Ja(i));
              return;
            }
          }
          t = t.return;
        }
        console.error(
          `Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Potential causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`,
          a
        );
      }
    }
    function Ka(e, t, a) {
      var i = e.pingCache;
      if (i === null) {
        i = e.pingCache = new JS();
        var f = /* @__PURE__ */ new Set();
        i.set(t, f);
      } else
        f = i.get(t), f === void 0 && (f = /* @__PURE__ */ new Set(), i.set(t, f));
      f.has(a) || (Xp = !0, f.add(a), i = ht.bind(null, e, t, a), Dl && Ie(e, a), t.then(i, i));
    }
    function ht(e, t, a) {
      var i = e.pingCache;
      i !== null && i.delete(t), e.pingedLanes |= e.suspendedLanes & a, e.warmLanes &= ~a, An() && U.actQueue === null && console.error(
        `A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act`
      ), We === e && (Te & a) === a && (Et === Xs || Et === Np && (Te & 62914560) === Te && qn() - jp < z1 ? (ut & ba) === Pa && ii(e, 0) : Qp |= a, js === Te && (js = 0)), Ja(e);
    }
    function ld(e, t) {
      t === 0 && (t = $m()), e = It(e, t), e !== null && ($t(e, t), Ja(e));
    }
    function H0(e) {
      var t = e.memoizedState, a = 0;
      t !== null && (a = t.retryLane), ld(e, a);
    }
    function Lt(e, t) {
      var a = 0;
      switch (e.tag) {
        case 13:
          var i = e.stateNode, f = e.memoizedState;
          f !== null && (a = f.retryLane);
          break;
        case 19:
          i = e.stateNode;
          break;
        case 22:
          i = e.stateNode._retryCache;
          break;
        default:
          throw Error(
            "Pinged unknown suspense boundary type. This is probably a bug in React."
          );
      }
      i !== null && i.delete(t), ld(e, a);
    }
    function ad(e, t, a) {
      if (t.subtreeFlags & 33562624)
        for (t = t.child; t !== null; ) {
          var i = e, f = t, o = f.type === zd;
          o = a || o, f.tag !== 22 ? f.flags & 33554432 ? o && $(
            f,
            C0,
            i,
            f,
            (f.mode & zg) === lt
          ) : ad(
            i,
            f,
            o
          ) : f.memoizedState === null && (o && f.flags & 8192 ? $(
            f,
            C0,
            i,
            f
          ) : f.subtreeFlags & 33554432 && $(
            f,
            ad,
            i,
            f,
            o
          )), t = t.sibling;
        }
    }
    function C0(e, t) {
      var a = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : !0;
      je(!0);
      try {
        my(t), a && by(t), vy(e, t.alternate, t, !1), a && jt(e, t, 0, null, !1);
      } finally {
        je(!1);
      }
    }
    function Dy(e) {
      var t = !0;
      e.current.mode & (Jl | xu) || (t = !1), ad(
        e,
        e.current,
        t
      );
    }
    function Ry(e) {
      if ((ut & ba) === Pa) {
        var t = e.tag;
        if (t === 3 || t === 1 || t === 0 || t === 11 || t === 14 || t === 15) {
          if (t = P(e) || "ReactComponent", gv !== null) {
            if (gv.has(t)) return;
            gv.add(t);
          } else gv = /* @__PURE__ */ new Set([t]);
          $(e, function() {
            console.error(
              "Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead."
            );
          });
        }
      }
    }
    function Ie(e, t) {
      Dl && e.memoizedUpdaters.forEach(function(a) {
        Wm(e, a, t);
      });
    }
    function ia(e, t) {
      var a = U.actQueue;
      return a !== null ? (a.push(t), IS) : _l(e, t);
    }
    function zu(e) {
      An() && U.actQueue === null && $(e, function() {
        console.error(
          `An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act`,
          P(e)
        );
      });
    }
    function Ja(e) {
      e !== oh && e.next === null && (oh === null ? Sv = oh = e : oh = oh.next = e), bv = !0, U.actQueue !== null ? Jp || (Jp = !0, fa(x0)) : Kp || (Kp = !0, fa(x0));
    }
    function xf(e, t) {
      if (!kp && bv) {
        kp = !0;
        do
          for (var a = !1, i = Sv; i !== null; ) {
            if (e !== 0) {
              var f = i.pendingLanes;
              if (f === 0) var o = 0;
              else {
                var d = i.suspendedLanes, h = i.pingedLanes;
                o = (1 << 31 - pl(42 | e) + 1) - 1, o &= f & ~(d & ~h), o = o & 201326677 ? o & 201326677 | 1 : o ? o | 2 : 0;
              }
              o !== 0 && (a = !0, Ma(i, o));
            } else
              o = Te, o = Yi(
                i,
                i === We ? o : 0
              ), !(o & 3) || ho(i, o) || (a = !0, Ma(i, o));
            i = i.next;
          }
        while (a);
        kp = !1;
      }
    }
    function x0() {
      bv = Jp = Kp = !1;
      var e = 0;
      _s !== 0 && (ge() && (e = _s), _s = 0);
      for (var t = qn(), a = null, i = Sv; i !== null; ) {
        var f = i.next, o = nd(i, t);
        o === 0 ? (i.next = null, a === null ? Sv = f : a.next = f, f === null && (oh = a)) : (a = i, (e !== 0 || o & 3) && (bv = !0)), i = f;
      }
      xf(e);
    }
    function nd(e, t) {
      for (var a = e.suspendedLanes, i = e.pingedLanes, f = e.expirationTimes, o = e.pendingLanes & -62914561; 0 < o; ) {
        var d = 31 - pl(o), h = 1 << d, m = f[d];
        m === -1 ? (!(h & a) || h & i) && (f[d] = Jm(h, t)) : m <= t && (e.expiredLanes |= h), o &= ~h;
      }
      if (t = We, a = Te, a = Yi(
        e,
        e === t ? a : 0
      ), i = e.callbackNode, a === 0 || e === t && Fe === Qs || e.cancelPendingCommit !== null)
        return i !== null && ud(i), e.callbackNode = null, e.callbackPriority = 0;
      if (!(a & 3) || ho(e, a)) {
        if (t = a & -a, t !== e.callbackPriority || U.actQueue !== null && i !== $p)
          ud(i);
        else return t;
        switch (Im(a)) {
          case ya:
          case Ua:
            a = Cd;
            break;
          case Fa:
            a = _f;
            break;
          case Hc:
            a = Fy;
            break;
          default:
            a = _f;
        }
        return i = ca.bind(null, e), U.actQueue !== null ? (U.actQueue.push(i), a = $p) : a = _l(a, i), e.callbackPriority = t, e.callbackNode = a, t;
      }
      return i !== null && ud(i), e.callbackPriority = 2, e.callbackNode = null, 2;
    }
    function ca(e, t) {
      lv = tv = !1;
      var a = e.callbackNode;
      if (Eu() && e.callbackNode !== a)
        return null;
      var i = Te;
      return i = Yi(
        e,
        e === We ? i : 0
      ), i === 0 ? null : (ls(
        e,
        i,
        t
      ), nd(e, qn()), e.callbackNode != null && e.callbackNode === a ? ca.bind(null, e) : null);
    }
    function Ma(e, t) {
      if (Eu()) return null;
      tv = lv, lv = !1, ls(e, t, !0);
    }
    function ud(e) {
      e !== $p && e !== null && w0(e);
    }
    function fa(e) {
      U.actQueue !== null && U.actQueue.push(function() {
        return e(), null;
      }), ub(function() {
        (ut & (ba | Xc)) !== Pa ? _l(Si, e) : e();
      });
    }
    function id() {
      return _s === 0 && (_s = km()), _s;
    }
    function Rn(e) {
      return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : (He(e, "action"), fn("" + e));
    }
    function mc(e, t) {
      var a = t.ownerDocument.createElement("input");
      return a.name = t.name, a.value = t.value, e.id && a.setAttribute("form", e.id), t.parentNode.insertBefore(a, t), e = new FormData(e), a.parentNode.removeChild(a), e;
    }
    function oi(e, t, a, i, f) {
      if (t === "submit" && a && a.stateNode === f) {
        var o = Rn(
          (f[wl] || null).action
        ), d = i.submitter;
        d && (t = (t = d[wl] || null) ? Rn(t.formAction) : d.getAttribute("formAction"), t !== null && (o = t, d = null));
        var h = new E(
          "action",
          "action",
          null,
          i,
          f
        );
        e.push({
          event: h,
          listeners: [
            {
              instance: null,
              listener: function() {
                if (i.defaultPrevented) {
                  if (_s !== 0) {
                    var m = d ? mc(
                      f,
                      d
                    ) : new FormData(f), p = {
                      pending: !0,
                      data: m,
                      method: f.method,
                      action: o
                    };
                    Object.freeze(p), vn(
                      a,
                      p,
                      null,
                      m
                    );
                  }
                } else
                  typeof o == "function" && (h.preventDefault(), m = d ? mc(
                    f,
                    d
                  ) : new FormData(f), p = {
                    pending: !0,
                    data: m,
                    method: f.method,
                    action: o
                  }, Object.freeze(p), vn(
                    a,
                    p,
                    o,
                    m
                  ));
              },
              currentTarget: f
            }
          ]
        });
      }
    }
    function cd(e, t) {
      t = (t & 4) !== 0;
      for (var a = 0; a < e.length; a++) {
        var i = e[a];
        e: {
          var f = void 0, o = i.event;
          if (i = i.listeners, t)
            for (var d = i.length - 1; 0 <= d; d--) {
              var h = i[d], m = h.instance, p = h.currentTarget;
              if (h = h.listener, m !== f && o.isPropagationStopped())
                break e;
              f = o, f.currentTarget = p;
              try {
                h(f);
              } catch (R) {
                rv(R);
              }
              f.currentTarget = null, f = m;
            }
          else
            for (d = 0; d < i.length; d++) {
              if (h = i[d], m = h.instance, p = h.currentTarget, h = h.listener, m !== f && o.isPropagationStopped())
                break e;
              f = o, f.currentTarget = p;
              try {
                h(f);
              } catch (R) {
                rv(R);
              }
              f.currentTarget = null, f = m;
            }
        }
      }
    }
    function pe(e, t) {
      Wp.has(e) || console.error(
        'Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.',
        e
      );
      var a = t[Cc];
      a === void 0 && (a = t[Cc] = /* @__PURE__ */ new Set());
      var i = e + "__bubble";
      a.has(i) || (vc(t, e, 2, !1), a.add(i));
    }
    function Mn(e, t, a) {
      Wp.has(e) && !t && console.error(
        'Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.',
        e
      );
      var i = 0;
      t && (i |= 4), vc(
        a,
        e,
        i,
        t
      );
    }
    function fd(e) {
      if (!e[Tv]) {
        e[Tv] = !0, Ds.forEach(function(a) {
          a !== "selectionchange" && (Wp.has(a) || Mn(a, !1, e), Mn(a, !0, e));
        });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[Tv] || (t[Tv] = !0, Mn("selectionchange", !1, t));
      }
    }
    function vc(e, t, a, i) {
      switch (Mc(t)) {
        case ya:
          var f = j0;
          break;
        case Ua:
          f = Wv;
          break;
        default:
          f = Qy;
      }
      a = f.bind(
        null,
        t,
        a,
        e
      ), f = void 0, !O || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (f = !0), i ? f !== void 0 ? e.addEventListener(t, a, {
        capture: !0,
        passive: f
      }) : e.addEventListener(t, a, !0) : f !== void 0 ? e.addEventListener(t, a, {
        passive: f
      }) : e.addEventListener(
        t,
        a,
        !1
      );
    }
    function pc(e, t, a, i, f) {
      var o = i;
      if (!(t & 1) && !(t & 2) && i !== null)
        e: for (; ; ) {
          if (i === null) return;
          var d = i.tag;
          if (d === 3 || d === 4) {
            var h = i.stateNode.containerInfo;
            if (h === f || h.nodeType === 8 && h.parentNode === f)
              break;
            if (d === 4)
              for (d = i.return; d !== null; ) {
                var m = d.tag;
                if ((m === 3 || m === 4) && (m = d.stateNode.containerInfo, m === f || m.nodeType === 8 && m.parentNode === f))
                  return;
                d = d.return;
              }
            for (; h !== null; ) {
              if (d = nn(h), d === null) return;
              if (m = d.tag, m === 5 || m === 6 || m === 26 || m === 27) {
                i = o = d;
                continue e;
              }
              h = h.parentNode;
            }
          }
          i = i.return;
        }
      or(function() {
        var p = o, R = Lu(a), N = [];
        e: {
          var M = Tg.get(e);
          if (M !== void 0) {
            var G = E, F = e;
            switch (e) {
              case "keypress":
                if (Pc(a) === 0) break e;
              case "keydown":
              case "keyup":
                G = SS;
                break;
              case "focusin":
                F = "focus", G = sp;
                break;
              case "focusout":
                F = "blur", G = sp;
                break;
              case "beforeblur":
              case "afterblur":
                G = sp;
                break;
              case "click":
                if (a.button === 2) break e;
              case "auxclick":
              case "dblclick":
              case "mousedown":
              case "mousemove":
              case "mouseup":
              case "mouseout":
              case "mouseover":
              case "contextmenu":
                G = qt;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                G = Mi;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                G = ES;
                break;
              case pg:
              case gg:
              case Sg:
                G = sS;
                break;
              case bg:
                G = AS;
                break;
              case "scroll":
              case "scrollend":
                G = V;
                break;
              case "wheel":
                G = RS;
                break;
              case "copy":
              case "cut":
              case "paste":
                G = dS;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                G = og;
                break;
              case "toggle":
              case "beforetoggle":
                G = OS;
            }
            var he = (t & 4) !== 0, Yt = !he && (e === "scroll" || e === "scrollend"), Ye = he ? M !== null ? M + "Capture" : null : M;
            he = [];
            for (var b = p, S; b !== null; ) {
              var T = b;
              if (S = T.stateNode, T = T.tag, T !== 5 && T !== 26 && T !== 27 || S === null || Ye === null || (T = Fc(b, Ye), T != null && he.push(
                Au(
                  b,
                  T,
                  S
                )
              )), Yt) break;
              b = b.return;
            }
            0 < he.length && (M = new G(
              M,
              F,
              null,
              a,
              R
            ), N.push({
              event: M,
              listeners: he
            }));
          }
        }
        if (!(t & 7)) {
          e: {
            if (M = e === "mouseover" || e === "pointerover", G = e === "mouseout" || e === "pointerout", M && a !== g && (F = a.relatedTarget || a.fromElement) && (nn(F) || F[Ti]))
              break e;
            if ((G || M) && (M = R.window === R ? R : (M = R.ownerDocument) ? M.defaultView || M.parentWindow : window, G ? (F = a.relatedTarget || a.toElement, G = p, F = F ? nn(F) : null, F !== null && (Yt = Bl(F), he = F.tag, F !== Yt || he !== 5 && he !== 27 && he !== 6) && (F = null)) : (G = null, F = p), G !== F)) {
              if (he = qt, T = "onMouseLeave", Ye = "onMouseEnter", b = "mouse", (e === "pointerout" || e === "pointerover") && (he = og, T = "onPointerLeave", Ye = "onPointerEnter", b = "pointer"), Yt = G == null ? M : mo(G), S = F == null ? M : mo(F), M = new he(
                T,
                b + "leave",
                G,
                a,
                R
              ), M.target = Yt, M.relatedTarget = S, T = null, nn(R) === p && (he = new he(
                Ye,
                b + "enter",
                F,
                a,
                R
              ), he.target = S, he.relatedTarget = Yt, T = he), Yt = T, G && F)
                t: {
                  for (he = G, Ye = F, b = 0, S = he; S; S = gc(S))
                    b++;
                  for (S = 0, T = Ye; T; T = gc(T))
                    S++;
                  for (; 0 < b - S; )
                    he = gc(he), b--;
                  for (; 0 < S - b; )
                    Ye = gc(Ye), S--;
                  for (; b--; ) {
                    if (he === Ye || Ye !== null && he === Ye.alternate)
                      break t;
                    he = gc(he), Ye = gc(Ye);
                  }
                  he = null;
                }
              else he = null;
              G !== null && My(
                N,
                M,
                G,
                he,
                !1
              ), F !== null && Yt !== null && My(
                N,
                Yt,
                F,
                he,
                !0
              );
            }
          }
          e: {
            if (M = p ? mo(p) : window, G = M.nodeName && M.nodeName.toLowerCase(), G === "select" || G === "input" && M.type === "file")
              var q = hr;
            else if (_u(M))
              if (mg)
                q = _v;
              else {
                q = Lv;
                var Z = t0;
              }
            else
              G = M.nodeName, !G || G.toLowerCase() !== "input" || M.type !== "checkbox" && M.type !== "radio" ? p && Zi(p.elementType) && (q = hr) : q = Zv;
            if (q && (q = q(e, p))) {
              ef(
                N,
                q,
                a,
                R
              );
              break e;
            }
            Z && Z(e, M, p), e === "focusout" && p && M.type === "number" && p.memoizedProps.value != null && Pn(M, "number", M.value);
          }
          switch (Z = p ? mo(p) : window, e) {
            case "focusin":
              (_u(Z) || Z.contentEditable === "true") && (Qd = Z, dp = p, rm = null);
              break;
            case "focusout":
              rm = dp = Qd = null;
              break;
            case "mousedown":
              hp = !0;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              hp = !1, i0(
                N,
                a,
                R
              );
              break;
            case "selectionchange":
              if (xS) break;
            case "keydown":
            case "keyup":
              i0(
                N,
                a,
                R
              );
          }
          var oe;
          if (rp)
            e: {
              switch (e) {
                case "compositionstart":
                  var W = "onCompositionStart";
                  break e;
                case "compositionend":
                  W = "onCompositionEnd";
                  break e;
                case "compositionupdate":
                  W = "onCompositionUpdate";
                  break e;
              }
              W = void 0;
            }
          else
            Xd ? bo(e, a) && (W = "onCompositionEnd") : e === "keydown" && a.keyCode === sg && (W = "onCompositionStart");
          W && (rg && a.locale !== "ko" && (Xd || W !== "onCompositionStart" ? W === "onCompositionEnd" && Xd && (oe = Ic()) : (J = R, ue = "value" in J ? J.value : J.textContent, Xd = !0)), Z = Du(
            p,
            W
          ), 0 < Z.length && (W = new fg(
            W,
            e,
            null,
            a,
            R
          ), N.push({
            event: W,
            listeners: Z
          }), oe ? W.data = oe : (oe = To(a), oe !== null && (W.data = oe)))), (oe = HS ? e0(e, a) : Vl(e, a)) && (W = Du(
            p,
            "onBeforeInput"
          ), 0 < W.length && (Z = new yS(
            "onBeforeInput",
            "beforeinput",
            null,
            a,
            R
          ), N.push({
            event: Z,
            listeners: W
          }), Z.data = oe)), oi(
            N,
            e,
            p,
            a,
            R
          );
        }
        cd(N, t);
      });
    }
    function Au(e, t, a) {
      return {
        instance: e,
        listener: t,
        currentTarget: a
      };
    }
    function Du(e, t) {
      for (var a = t + "Capture", i = []; e !== null; ) {
        var f = e, o = f.stateNode;
        f = f.tag, f !== 5 && f !== 26 && f !== 27 || o === null || (f = Fc(e, a), f != null && i.unshift(
          Au(e, f, o)
        ), f = Fc(e, t), f != null && i.push(
          Au(e, f, o)
        )), e = e.return;
      }
      return i;
    }
    function gc(e) {
      if (e === null) return null;
      do
        e = e.return;
      while (e && e.tag !== 5 && e.tag !== 27);
      return e || null;
    }
    function My(e, t, a, i, f) {
      for (var o = t._reactName, d = []; a !== null && a !== i; ) {
        var h = a, m = h.alternate, p = h.stateNode;
        if (h = h.tag, m !== null && m === i) break;
        h !== 5 && h !== 26 && h !== 27 || p === null || (m = p, f ? (p = Fc(a, o), p != null && d.unshift(
          Au(a, p, m)
        )) : f || (p = Fc(a, o), p != null && d.push(
          Au(a, p, m)
        ))), a = a.return;
      }
      d.length !== 0 && e.push({ event: t, listeners: d });
    }
    function Sc(e, t) {
      fr(e, t), e !== "input" && e !== "textarea" && e !== "select" || t == null || t.value !== null || n || (n = !0, e === "select" && t.multiple ? console.error(
        "`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.",
        e
      ) : console.error(
        "`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.",
        e
      ));
      var a = {
        registrationNameDependencies: Hu,
        possibleRegistrationNames: Iy
      };
      Zi(e) || typeof t.is == "string" || Dh(e, t, a), t.contentEditable && !t.suppressContentEditableWarning && t.children != null && console.error(
        "A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."
      );
    }
    function Ct(e, t, a, i) {
      t !== a && (a = xt(a), xt(t) !== a && (i[e] = t));
    }
    function od(e, t, a) {
      t.forEach(function(i) {
        a[rd(i)] = i === "style" ? fs(e) : e.getAttribute(i);
      });
    }
    function ka(e, t) {
      t === !1 ? console.error(
        "Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.",
        e,
        e,
        e
      ) : console.error(
        "Expected `%s` listener to be a function, instead got a value of `%s` type.",
        e,
        typeof t
      );
    }
    function B0(e, t) {
      return e = e.namespaceURI === Ri || e.namespaceURI === ma ? e.ownerDocument.createElementNS(
        e.namespaceURI,
        e.tagName
      ) : e.ownerDocument.createElement(e.tagName), e.innerHTML = t, e.innerHTML;
    }
    function xt(e) {
      return Xe(e) && (console.error(
        "The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before using it here.",
        mt(e)
      ), ql(e)), (typeof e == "string" ? e : "" + e).replace(PS, `
`).replace(eb, "");
    }
    function sd(e, t) {
      return t = xt(t), xt(e) === t;
    }
    function $a() {
    }
    function Be(e, t, a, i, f, o) {
      switch (a) {
        case "children":
          typeof i == "string" ? (So(i, t), t === "body" || t === "textarea" && i === "" || cn(e, i)) : (typeof i == "number" || typeof i == "bigint") && (So("" + i, t), t !== "body" && cn(e, "" + i));
          break;
        case "className":
          po(e, "class", i);
          break;
        case "tabIndex":
          po(e, "tabindex", i);
          break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
          po(e, a, i);
          break;
        case "style":
          zh(e, i, o);
          break;
        case "data":
          if (t !== "object") {
            po(e, "data", i);
            break;
          }
        case "src":
        case "href":
          if (i === "" && (t !== "a" || a !== "href")) {
            console.error(
              a === "src" ? 'An empty string ("") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string.' : 'An empty string ("") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.',
              a,
              a
            ), e.removeAttribute(a);
            break;
          }
          if (i == null || typeof i == "function" || typeof i == "symbol" || typeof i == "boolean") {
            e.removeAttribute(a);
            break;
          }
          He(i, a), i = fn("" + i), e.setAttribute(a, i);
          break;
        case "action":
        case "formAction":
          if (i != null && (t === "form" ? a === "formAction" ? console.error(
            "You can only pass the formAction prop to <input> or <button>. Use the action prop on <form>."
          ) : typeof i == "function" && (f.encType == null && f.method == null || Av || (Av = !0, console.error(
            "Cannot specify a encType or method for a form that specifies a function as the action. React provides those automatically. They will get overridden."
          )), f.target == null || zv || (zv = !0, console.error(
            "Cannot specify a target for a form that specifies a function as the action. The function will always be executed in the same window."
          ))) : t === "input" || t === "button" ? a === "action" ? console.error(
            "You can only pass the action prop to <form>. Use the formAction prop on <input> or <button>."
          ) : t !== "input" || f.type === "submit" || f.type === "image" || Ev ? t !== "button" || f.type == null || f.type === "submit" || Ev ? typeof i == "function" && (f.name == null || H1 || (H1 = !0, console.error(
            'Cannot specify a "name" prop for a button that specifies a function as a formAction. React needs it to encode which action should be invoked. It will get overridden.'
          )), f.formEncType == null && f.formMethod == null || Av || (Av = !0, console.error(
            "Cannot specify a formEncType or formMethod for a button that specifies a function as a formAction. React provides those automatically. They will get overridden."
          )), f.formTarget == null || zv || (zv = !0, console.error(
            "Cannot specify a formTarget for a button that specifies a function as a formAction. The function will always be executed in the same window."
          ))) : (Ev = !0, console.error(
            'A button can only specify a formAction along with type="submit" or no type.'
          )) : (Ev = !0, console.error(
            'An input can only specify a formAction along with type="submit" or type="image".'
          )) : console.error(
            a === "action" ? "You can only pass the action prop to <form>." : "You can only pass the formAction prop to <input> or <button>."
          )), typeof i == "function") {
            e.setAttribute(
              a,
              "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
            );
            break;
          } else
            typeof o == "function" && (a === "formAction" ? (t !== "input" && Be(e, t, "name", f.name, f, null), Be(
              e,
              t,
              "formEncType",
              f.formEncType,
              f,
              null
            ), Be(
              e,
              t,
              "formMethod",
              f.formMethod,
              f,
              null
            ), Be(
              e,
              t,
              "formTarget",
              f.formTarget,
              f,
              null
            )) : (Be(
              e,
              t,
              "encType",
              f.encType,
              f,
              null
            ), Be(e, t, "method", f.method, f, null), Be(
              e,
              t,
              "target",
              f.target,
              f,
              null
            )));
          if (i == null || typeof i == "symbol" || typeof i == "boolean") {
            e.removeAttribute(a);
            break;
          }
          He(i, a), i = fn("" + i), e.setAttribute(a, i);
          break;
        case "onClick":
          i != null && (typeof i != "function" && ka(a, i), e.onclick = $a);
          break;
        case "onScroll":
          i != null && (typeof i != "function" && ka(a, i), pe("scroll", e));
          break;
        case "onScrollEnd":
          i != null && (typeof i != "function" && ka(a, i), pe("scrollend", e));
          break;
        case "dangerouslySetInnerHTML":
          if (i != null) {
            if (typeof i != "object" || !("__html" in i))
              throw Error(
                "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information."
              );
            if (a = i.__html, a != null) {
              if (f.children != null)
                throw Error(
                  "Can only set one of `children` or `props.dangerouslySetInnerHTML`."
                );
              e.innerHTML = a;
            }
          }
          break;
        case "multiple":
          e.multiple = i && typeof i != "function" && typeof i != "symbol";
          break;
        case "muted":
          e.muted = i && typeof i != "function" && typeof i != "symbol";
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "ref":
          break;
        case "autoFocus":
          break;
        case "xlinkHref":
          if (i == null || typeof i == "function" || typeof i == "boolean" || typeof i == "symbol") {
            e.removeAttribute("xlink:href");
            break;
          }
          He(i, a), a = fn("" + i), e.setAttributeNS(ws, "xlink:href", a);
          break;
        case "contentEditable":
        case "spellCheck":
        case "draggable":
        case "value":
        case "autoReverse":
        case "externalResourcesRequired":
        case "focusable":
        case "preserveAlpha":
          i != null && typeof i != "function" && typeof i != "symbol" ? (He(i, a), e.setAttribute(a, "" + i)) : e.removeAttribute(a);
          break;
        case "inert":
          i !== "" || Dv[a] || (Dv[a] = !0, console.error(
            "Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.",
            a
          ));
        case "allowFullScreen":
        case "async":
        case "autoPlay":
        case "controls":
        case "default":
        case "defer":
        case "disabled":
        case "disablePictureInPicture":
        case "disableRemotePlayback":
        case "formNoValidate":
        case "hidden":
        case "loop":
        case "noModule":
        case "noValidate":
        case "open":
        case "playsInline":
        case "readOnly":
        case "required":
        case "reversed":
        case "scoped":
        case "seamless":
        case "itemScope":
          i && typeof i != "function" && typeof i != "symbol" ? e.setAttribute(a, "") : e.removeAttribute(a);
          break;
        case "capture":
        case "download":
          i === !0 ? e.setAttribute(a, "") : i !== !1 && i != null && typeof i != "function" && typeof i != "symbol" ? (He(i, a), e.setAttribute(a, i)) : e.removeAttribute(a);
          break;
        case "cols":
        case "rows":
        case "size":
        case "span":
          i != null && typeof i != "function" && typeof i != "symbol" && !isNaN(i) && 1 <= i ? (He(i, a), e.setAttribute(a, i)) : e.removeAttribute(a);
          break;
        case "rowSpan":
        case "start":
          i == null || typeof i == "function" || typeof i == "symbol" || isNaN(i) ? e.removeAttribute(a) : (He(i, a), e.setAttribute(a, i));
          break;
        case "popover":
          pe("beforetoggle", e), pe("toggle", e), vo(e, "popover", i);
          break;
        case "xlinkActuate":
          Fn(
            e,
            ws,
            "xlink:actuate",
            i
          );
          break;
        case "xlinkArcrole":
          Fn(
            e,
            ws,
            "xlink:arcrole",
            i
          );
          break;
        case "xlinkRole":
          Fn(
            e,
            ws,
            "xlink:role",
            i
          );
          break;
        case "xlinkShow":
          Fn(
            e,
            ws,
            "xlink:show",
            i
          );
          break;
        case "xlinkTitle":
          Fn(
            e,
            ws,
            "xlink:title",
            i
          );
          break;
        case "xlinkType":
          Fn(
            e,
            ws,
            "xlink:type",
            i
          );
          break;
        case "xmlBase":
          Fn(
            e,
            Fp,
            "xml:base",
            i
          );
          break;
        case "xmlLang":
          Fn(
            e,
            Fp,
            "xml:lang",
            i
          );
          break;
        case "xmlSpace":
          Fn(
            e,
            Fp,
            "xml:space",
            i
          );
          break;
        case "is":
          o != null && console.error(
            'Cannot update the "is" prop after it has been initialized.'
          ), vo(e, "is", i);
          break;
        case "innerText":
        case "textContent":
          break;
        case "popoverTarget":
          C1 || i == null || typeof i != "object" || (C1 = !0, console.error(
            "The `popoverTarget` prop expects the ID of an Element as a string. Received %s instead.",
            i
          ));
        default:
          !(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N" ? (a = Pm(a), vo(e, a, i)) : Hu.hasOwnProperty(a) && i != null && typeof i != "function" && ka(a, i);
      }
    }
    function Bf(e, t, a, i, f, o) {
      switch (a) {
        case "style":
          zh(e, i, o);
          break;
        case "dangerouslySetInnerHTML":
          if (i != null) {
            if (typeof i != "object" || !("__html" in i))
              throw Error(
                "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information."
              );
            if (a = i.__html, a != null) {
              if (f.children != null)
                throw Error(
                  "Can only set one of `children` or `props.dangerouslySetInnerHTML`."
                );
              e.innerHTML = a;
            }
          }
          break;
        case "children":
          typeof i == "string" ? cn(e, i) : (typeof i == "number" || typeof i == "bigint") && cn(e, "" + i);
          break;
        case "onScroll":
          i != null && (typeof i != "function" && ka(a, i), pe("scroll", e));
          break;
        case "onScrollEnd":
          i != null && (typeof i != "function" && ka(a, i), pe("scrollend", e));
          break;
        case "onClick":
          i != null && (typeof i != "function" && ka(a, i), e.onclick = $a);
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "innerHTML":
        case "ref":
          break;
        case "innerText":
        case "textContent":
          break;
        default:
          if (Hu.hasOwnProperty(a))
            i != null && typeof i != "function" && ka(a, i);
          else
            e: {
              if (a[0] === "o" && a[1] === "n" && (f = a.endsWith("Capture"), t = a.slice(2, f ? a.length - 7 : void 0), o = e[wl] || null, o = o != null ? o[a] : null, typeof o == "function" && e.removeEventListener(t, o, f), typeof i == "function")) {
                typeof o != "function" && o !== null && (a in e ? e[a] = null : e.hasAttribute(a) && e.removeAttribute(a)), e.addEventListener(t, i, f);
                break e;
              }
              a in e ? e[a] = i : i === !0 ? e.setAttribute(a, "") : vo(e, a, i);
            }
      }
    }
    function nt(e, t, a) {
      switch (Sc(t, a), t) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "img":
          pe("error", e), pe("load", e);
          var i = !1, f = !1, o;
          for (o in a)
            if (a.hasOwnProperty(o)) {
              var d = a[o];
              if (d != null)
                switch (o) {
                  case "src":
                    i = !0;
                    break;
                  case "srcSet":
                    f = !0;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(
                      t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  default:
                    Be(e, t, o, d, a, null);
                }
            }
          f && Be(e, t, "srcSet", a.srcSet, a, null), i && Be(e, t, "src", a.src, a, null);
          return;
        case "input":
          Kc("input", a), pe("invalid", e);
          var h = o = d = f = null, m = null, p = null;
          for (i in a)
            if (a.hasOwnProperty(i)) {
              var R = a[i];
              if (R != null)
                switch (i) {
                  case "name":
                    f = R;
                    break;
                  case "type":
                    d = R;
                    break;
                  case "checked":
                    m = R;
                    break;
                  case "defaultChecked":
                    p = R;
                    break;
                  case "value":
                    o = R;
                    break;
                  case "defaultValue":
                    h = R;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    if (R != null)
                      throw Error(
                        t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                      );
                    break;
                  default:
                    Be(e, t, i, R, a, null);
                }
            }
          yh(e, a), ar(
            e,
            o,
            h,
            m,
            p,
            d,
            f,
            !1
          ), In(e);
          return;
        case "select":
          Kc("select", a), pe("invalid", e), i = d = o = null;
          for (f in a)
            if (a.hasOwnProperty(f) && (h = a[f], h != null))
              switch (f) {
                case "value":
                  o = h;
                  break;
                case "defaultValue":
                  d = h;
                  break;
                case "multiple":
                  i = h;
                default:
                  Be(
                    e,
                    t,
                    f,
                    h,
                    a,
                    null
                  );
              }
          Mt(e, a), t = o, a = d, e.multiple = !!i, t != null ? Ya(e, !!i, t, !1) : a != null && Ya(e, !!i, a, !0);
          return;
        case "textarea":
          Kc("textarea", a), pe("invalid", e), o = f = i = null;
          for (d in a)
            if (a.hasOwnProperty(d) && (h = a[d], h != null))
              switch (d) {
                case "value":
                  i = h;
                  break;
                case "defaultValue":
                  f = h;
                  break;
                case "children":
                  o = h;
                  break;
                case "dangerouslySetInnerHTML":
                  if (h != null)
                    throw Error(
                      "`dangerouslySetInnerHTML` does not make sense on <textarea>."
                    );
                  break;
                default:
                  Be(
                    e,
                    t,
                    d,
                    h,
                    a,
                    null
                  );
              }
          mh(e, a), Qu(e, i, f, o), In(e);
          return;
        case "option":
          Xi(e, a);
          for (m in a)
            if (a.hasOwnProperty(m) && (i = a[m], i != null))
              switch (m) {
                case "selected":
                  e.selected = i && typeof i != "function" && typeof i != "symbol";
                  break;
                default:
                  Be(e, t, m, i, a, null);
              }
          return;
        case "dialog":
          pe("cancel", e), pe("close", e);
          break;
        case "iframe":
        case "object":
          pe("load", e);
          break;
        case "video":
        case "audio":
          for (i = 0; i < Nm.length; i++)
            pe(Nm[i], e);
          break;
        case "image":
          pe("error", e), pe("load", e);
          break;
        case "details":
          pe("toggle", e);
          break;
        case "embed":
        case "source":
        case "link":
          pe("error", e), pe("load", e);
        case "area":
        case "base":
        case "br":
        case "col":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "track":
        case "wbr":
        case "menuitem":
          for (p in a)
            if (a.hasOwnProperty(p) && (i = a[p], i != null))
              switch (p) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(
                    t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                  );
                default:
                  Be(e, t, p, i, a, null);
              }
          return;
        default:
          if (Zi(t)) {
            for (R in a)
              a.hasOwnProperty(R) && (i = a[R], i !== void 0 && Bf(
                e,
                t,
                R,
                i,
                a,
                void 0
              ));
            return;
          }
      }
      for (h in a)
        a.hasOwnProperty(h) && (i = a[h], i != null && Be(e, t, h, i, a, null));
    }
    function q0(e, t, a, i) {
      switch (Sc(t, i), t) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "input":
          var f = null, o = null, d = null, h = null, m = null, p = null, R = null;
          for (G in a) {
            var N = a[G];
            if (a.hasOwnProperty(G) && N != null)
              switch (G) {
                case "checked":
                  break;
                case "value":
                  break;
                case "defaultValue":
                  m = N;
                default:
                  i.hasOwnProperty(G) || Be(
                    e,
                    t,
                    G,
                    null,
                    i,
                    N
                  );
              }
          }
          for (var M in i) {
            var G = i[M];
            if (N = a[M], i.hasOwnProperty(M) && (G != null || N != null))
              switch (M) {
                case "type":
                  o = G;
                  break;
                case "name":
                  f = G;
                  break;
                case "checked":
                  p = G;
                  break;
                case "defaultChecked":
                  R = G;
                  break;
                case "value":
                  d = G;
                  break;
                case "defaultValue":
                  h = G;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (G != null)
                    throw Error(
                      t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  break;
                default:
                  G !== N && Be(
                    e,
                    t,
                    M,
                    G,
                    i,
                    N
                  );
              }
          }
          t = a.type === "checkbox" || a.type === "radio" ? a.checked != null : a.value != null, i = i.type === "checkbox" || i.type === "radio" ? i.checked != null : i.value != null, t || !i || U1 || (console.error(
            "A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"
          ), U1 = !0), !t || i || O1 || (console.error(
            "A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"
          ), O1 = !0), Vi(
            e,
            d,
            h,
            m,
            p,
            R,
            o,
            f
          );
          return;
        case "select":
          G = d = h = M = null;
          for (o in a)
            if (m = a[o], a.hasOwnProperty(o) && m != null)
              switch (o) {
                case "value":
                  break;
                case "multiple":
                  G = m;
                default:
                  i.hasOwnProperty(o) || Be(
                    e,
                    t,
                    o,
                    null,
                    i,
                    m
                  );
              }
          for (f in i)
            if (o = i[f], m = a[f], i.hasOwnProperty(f) && (o != null || m != null))
              switch (f) {
                case "value":
                  M = o;
                  break;
                case "defaultValue":
                  h = o;
                  break;
                case "multiple":
                  d = o;
                default:
                  o !== m && Be(
                    e,
                    t,
                    f,
                    o,
                    i,
                    m
                  );
              }
          i = h, t = d, a = G, M != null ? Ya(e, !!t, M, !1) : !!a != !!t && (i != null ? Ya(e, !!t, i, !0) : Ya(e, !!t, t ? [] : "", !1));
          return;
        case "textarea":
          G = M = null;
          for (h in a)
            if (f = a[h], a.hasOwnProperty(h) && f != null && !i.hasOwnProperty(h))
              switch (h) {
                case "value":
                  break;
                case "children":
                  break;
                default:
                  Be(e, t, h, null, i, f);
              }
          for (d in i)
            if (f = i[d], o = a[d], i.hasOwnProperty(d) && (f != null || o != null))
              switch (d) {
                case "value":
                  M = f;
                  break;
                case "defaultValue":
                  G = f;
                  break;
                case "children":
                  break;
                case "dangerouslySetInnerHTML":
                  if (f != null)
                    throw Error(
                      "`dangerouslySetInnerHTML` does not make sense on <textarea>."
                    );
                  break;
                default:
                  f !== o && Be(e, t, d, f, i, o);
              }
          vh(e, M, G);
          return;
        case "option":
          for (var F in a)
            if (M = a[F], a.hasOwnProperty(F) && M != null && !i.hasOwnProperty(F))
              switch (F) {
                case "selected":
                  e.selected = !1;
                  break;
                default:
                  Be(
                    e,
                    t,
                    F,
                    null,
                    i,
                    M
                  );
              }
          for (m in i)
            if (M = i[m], G = a[m], i.hasOwnProperty(m) && M !== G && (M != null || G != null))
              switch (m) {
                case "selected":
                  e.selected = M && typeof M != "function" && typeof M != "symbol";
                  break;
                default:
                  Be(
                    e,
                    t,
                    m,
                    M,
                    i,
                    G
                  );
              }
          return;
        case "img":
        case "link":
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
        case "menuitem":
          for (var he in a)
            M = a[he], a.hasOwnProperty(he) && M != null && !i.hasOwnProperty(he) && Be(
              e,
              t,
              he,
              null,
              i,
              M
            );
          for (p in i)
            if (M = i[p], G = a[p], i.hasOwnProperty(p) && M !== G && (M != null || G != null))
              switch (p) {
                case "children":
                case "dangerouslySetInnerHTML":
                  if (M != null)
                    throw Error(
                      t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  break;
                default:
                  Be(
                    e,
                    t,
                    p,
                    M,
                    i,
                    G
                  );
              }
          return;
        default:
          if (Zi(t)) {
            for (var Yt in a)
              M = a[Yt], a.hasOwnProperty(Yt) && M !== void 0 && !i.hasOwnProperty(Yt) && Bf(
                e,
                t,
                Yt,
                void 0,
                i,
                M
              );
            for (R in i)
              M = i[R], G = a[R], !i.hasOwnProperty(R) || M === G || M === void 0 && G === void 0 || Bf(
                e,
                t,
                R,
                M,
                i,
                G
              );
            return;
          }
      }
      for (var Ye in a)
        M = a[Ye], a.hasOwnProperty(Ye) && M != null && !i.hasOwnProperty(Ye) && Be(e, t, Ye, null, i, M);
      for (N in i)
        M = i[N], G = a[N], !i.hasOwnProperty(N) || M === G || M == null && G == null || Be(e, t, N, M, i, G);
    }
    function rd(e) {
      switch (e) {
        case "class":
          return "className";
        case "for":
          return "htmlFor";
        default:
          return e;
      }
    }
    function fs(e) {
      var t = {};
      e = e.style;
      for (var a = 0; a < e.length; a++) {
        var i = e[a];
        t[i] = e.getPropertyValue(i);
      }
      return t;
    }
    function On(e, t, a) {
      if (t != null && typeof t != "object")
        console.error(
          "The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX."
        );
      else {
        var i, f = i = "", o;
        for (o in t)
          if (t.hasOwnProperty(o)) {
            var d = t[o];
            d != null && typeof d != "boolean" && d !== "" && (o.indexOf("--") === 0 ? (an(d, o), i += f + o + ":" + ("" + d).trim()) : typeof d != "number" || d === 0 || Wf.has(o) ? (an(d, o), i += f + o.replace(am, "-$1").toLowerCase().replace(Jf, "-ms-") + ":" + ("" + d).trim()) : i += f + o.replace(am, "-$1").toLowerCase().replace(Jf, "-ms-") + ":" + d + "px", f = ";");
          }
        i = i || null, t = e.getAttribute("style"), t !== i && (i = xt(i), xt(t) !== i && (a.style = fs(e)));
      }
    }
    function oa(e, t, a, i, f, o) {
      if (f.delete(a), e = e.getAttribute(a), e === null)
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            return;
        }
      else if (i != null)
        switch (typeof i) {
          case "function":
          case "symbol":
          case "boolean":
            break;
          default:
            if (He(i, t), e === "" + i)
              return;
        }
      Ct(t, e, i, o);
    }
    function os(e, t, a, i, f, o) {
      if (f.delete(a), e = e.getAttribute(a), e === null) {
        switch (typeof i) {
          case "function":
          case "symbol":
            return;
        }
        if (!i) return;
      } else
        switch (typeof i) {
          case "function":
          case "symbol":
            break;
          default:
            if (i) return;
        }
      Ct(t, e, i, o);
    }
    function bc(e, t, a, i, f, o) {
      if (f.delete(a), e = e.getAttribute(a), e === null)
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
            return;
        }
      else if (i != null)
        switch (typeof i) {
          case "function":
          case "symbol":
            break;
          default:
            if (He(i, a), e === "" + i)
              return;
        }
      Ct(t, e, i, o);
    }
    function Pe(e, t, a, i, f, o) {
      if (f.delete(a), e = e.getAttribute(a), e === null)
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            return;
          default:
            if (isNaN(i)) return;
        }
      else if (i != null)
        switch (typeof i) {
          case "function":
          case "symbol":
          case "boolean":
            break;
          default:
            if (!isNaN(i) && (He(i, t), e === "" + i))
              return;
        }
      Ct(t, e, i, o);
    }
    function dd(e, t, a, i, f, o) {
      if (f.delete(a), e = e.getAttribute(a), e === null)
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            return;
        }
      else if (i != null)
        switch (typeof i) {
          case "function":
          case "symbol":
          case "boolean":
            break;
          default:
            if (He(i, t), a = fn("" + i), e === a)
              return;
        }
      Ct(t, e, i, o);
    }
    function Y0(e, t, a, i) {
      for (var f = {}, o = /* @__PURE__ */ new Set(), d = e.attributes, h = 0; h < d.length; h++)
        switch (d[h].name.toLowerCase()) {
          case "value":
            break;
          case "checked":
            break;
          case "selected":
            break;
          default:
            o.add(d[h].name);
        }
      if (Zi(t)) {
        for (var m in a)
          if (a.hasOwnProperty(m)) {
            var p = a[m];
            if (p != null) {
              if (Hu.hasOwnProperty(m))
                typeof p != "function" && ka(m, p);
              else if (a.suppressHydrationWarning !== !0)
                switch (m) {
                  case "children":
                    typeof p != "string" && typeof p != "number" || Ct(
                      "children",
                      e.textContent,
                      p,
                      f
                    );
                    continue;
                  case "suppressContentEditableWarning":
                  case "suppressHydrationWarning":
                  case "defaultValue":
                  case "defaultChecked":
                  case "innerHTML":
                  case "ref":
                    continue;
                  case "dangerouslySetInnerHTML":
                    d = e.innerHTML, p = p ? p.__html : void 0, p != null && (p = B0(e, p), Ct(
                      m,
                      d,
                      p,
                      f
                    ));
                    continue;
                  case "style":
                    o.delete(m), On(e, p, f);
                    continue;
                  case "offsetParent":
                  case "offsetTop":
                  case "offsetLeft":
                  case "offsetWidth":
                  case "offsetHeight":
                  case "isContentEditable":
                  case "outerText":
                  case "outerHTML":
                    o.delete(m.toLowerCase()), console.error(
                      "Assignment to read-only property will result in a no-op: `%s`",
                      m
                    );
                    continue;
                  case "className":
                    o.delete("class"), d = hh(
                      e,
                      "class",
                      p
                    ), Ct(
                      "className",
                      d,
                      p,
                      f
                    );
                    continue;
                  default:
                    i.context === Lc && t !== "svg" && t !== "math" ? o.delete(m.toLowerCase()) : o.delete(m), d = hh(
                      e,
                      m,
                      p
                    ), Ct(
                      m,
                      d,
                      p,
                      f
                    );
                }
            }
          }
      } else
        for (p in a)
          if (a.hasOwnProperty(p) && (m = a[p], m != null)) {
            if (Hu.hasOwnProperty(p))
              typeof m != "function" && ka(p, m);
            else if (a.suppressHydrationWarning !== !0)
              switch (p) {
                case "children":
                  typeof m != "string" && typeof m != "number" || Ct(
                    "children",
                    e.textContent,
                    m,
                    f
                  );
                  continue;
                case "suppressContentEditableWarning":
                case "suppressHydrationWarning":
                case "value":
                case "checked":
                case "selected":
                case "defaultValue":
                case "defaultChecked":
                case "innerHTML":
                case "ref":
                  continue;
                case "dangerouslySetInnerHTML":
                  d = e.innerHTML, m = m ? m.__html : void 0, m != null && (m = B0(e, m), d !== m && (f[p] = { __html: d }));
                  continue;
                case "className":
                  oa(
                    e,
                    p,
                    "class",
                    m,
                    o,
                    f
                  );
                  continue;
                case "tabIndex":
                  oa(
                    e,
                    p,
                    "tabindex",
                    m,
                    o,
                    f
                  );
                  continue;
                case "style":
                  o.delete(p), On(e, m, f);
                  continue;
                case "multiple":
                  o.delete(p), Ct(
                    p,
                    e.multiple,
                    m,
                    f
                  );
                  continue;
                case "muted":
                  o.delete(p), Ct(
                    p,
                    e.muted,
                    m,
                    f
                  );
                  continue;
                case "autoFocus":
                  o.delete("autofocus"), Ct(
                    p,
                    e.autofocus,
                    m,
                    f
                  );
                  continue;
                case "data":
                  if (t !== "object") {
                    o.delete(p), d = e.getAttribute("data"), Ct(
                      p,
                      d,
                      m,
                      f
                    );
                    continue;
                  }
                case "src":
                case "href":
                  if (!(m !== "" || t === "a" && p === "href" || t === "object" && p === "data")) {
                    console.error(
                      p === "src" ? 'An empty string ("") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string.' : 'An empty string ("") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.',
                      p,
                      p
                    ), dd(
                      e,
                      p,
                      p,
                      null,
                      o,
                      f
                    );
                    continue;
                  }
                  dd(
                    e,
                    p,
                    p,
                    m,
                    o,
                    f
                  );
                  continue;
                case "action":
                case "formAction":
                  if (d = e.getAttribute(p), typeof m == "function") {
                    o.delete(p.toLowerCase()), p === "formAction" ? (o.delete("name"), o.delete("formenctype"), o.delete("formmethod"), o.delete("formtarget")) : (o.delete("enctype"), o.delete("method"), o.delete("target"));
                    continue;
                  } else if (d === tb) {
                    o.delete(p.toLowerCase()), Ct(
                      p,
                      "function",
                      m,
                      f
                    );
                    continue;
                  }
                  dd(
                    e,
                    p,
                    p.toLowerCase(),
                    m,
                    o,
                    f
                  );
                  continue;
                case "xlinkHref":
                  dd(
                    e,
                    p,
                    "xlink:href",
                    m,
                    o,
                    f
                  );
                  continue;
                case "contentEditable":
                  bc(
                    e,
                    p,
                    "contenteditable",
                    m,
                    o,
                    f
                  );
                  continue;
                case "spellCheck":
                  bc(
                    e,
                    p,
                    "spellcheck",
                    m,
                    o,
                    f
                  );
                  continue;
                case "draggable":
                case "autoReverse":
                case "externalResourcesRequired":
                case "focusable":
                case "preserveAlpha":
                  bc(
                    e,
                    p,
                    p,
                    m,
                    o,
                    f
                  );
                  continue;
                case "allowFullScreen":
                case "async":
                case "autoPlay":
                case "controls":
                case "default":
                case "defer":
                case "disabled":
                case "disablePictureInPicture":
                case "disableRemotePlayback":
                case "formNoValidate":
                case "hidden":
                case "loop":
                case "noModule":
                case "noValidate":
                case "open":
                case "playsInline":
                case "readOnly":
                case "required":
                case "reversed":
                case "scoped":
                case "seamless":
                case "itemScope":
                  os(
                    e,
                    p,
                    p.toLowerCase(),
                    m,
                    o,
                    f
                  );
                  continue;
                case "capture":
                case "download":
                  e: {
                    h = e;
                    var R = d = p, N = f;
                    if (o.delete(R), h = h.getAttribute(R), h === null)
                      switch (typeof m) {
                        case "undefined":
                        case "function":
                        case "symbol":
                          break e;
                        default:
                          if (m === !1) break e;
                      }
                    else if (m != null)
                      switch (typeof m) {
                        case "function":
                        case "symbol":
                          break;
                        case "boolean":
                          if (m === !0 && h === "") break e;
                          break;
                        default:
                          if (He(m, d), h === "" + m)
                            break e;
                      }
                    Ct(
                      d,
                      h,
                      m,
                      N
                    );
                  }
                  continue;
                case "cols":
                case "rows":
                case "size":
                case "span":
                  e: {
                    if (h = e, R = d = p, N = f, o.delete(R), h = h.getAttribute(R), h === null)
                      switch (typeof m) {
                        case "undefined":
                        case "function":
                        case "symbol":
                        case "boolean":
                          break e;
                        default:
                          if (isNaN(m) || 1 > m) break e;
                      }
                    else if (m != null)
                      switch (typeof m) {
                        case "function":
                        case "symbol":
                        case "boolean":
                          break;
                        default:
                          if (!(isNaN(m) || 1 > m) && (He(m, d), h === "" + m))
                            break e;
                      }
                    Ct(
                      d,
                      h,
                      m,
                      N
                    );
                  }
                  continue;
                case "rowSpan":
                  Pe(
                    e,
                    p,
                    "rowspan",
                    m,
                    o,
                    f
                  );
                  continue;
                case "start":
                  Pe(
                    e,
                    p,
                    p,
                    m,
                    o,
                    f
                  );
                  continue;
                case "xHeight":
                  oa(
                    e,
                    p,
                    "x-height",
                    m,
                    o,
                    f
                  );
                  continue;
                case "xlinkActuate":
                  oa(
                    e,
                    p,
                    "xlink:actuate",
                    m,
                    o,
                    f
                  );
                  continue;
                case "xlinkArcrole":
                  oa(
                    e,
                    p,
                    "xlink:arcrole",
                    m,
                    o,
                    f
                  );
                  continue;
                case "xlinkRole":
                  oa(
                    e,
                    p,
                    "xlink:role",
                    m,
                    o,
                    f
                  );
                  continue;
                case "xlinkShow":
                  oa(
                    e,
                    p,
                    "xlink:show",
                    m,
                    o,
                    f
                  );
                  continue;
                case "xlinkTitle":
                  oa(
                    e,
                    p,
                    "xlink:title",
                    m,
                    o,
                    f
                  );
                  continue;
                case "xlinkType":
                  oa(
                    e,
                    p,
                    "xlink:type",
                    m,
                    o,
                    f
                  );
                  continue;
                case "xmlBase":
                  oa(
                    e,
                    p,
                    "xml:base",
                    m,
                    o,
                    f
                  );
                  continue;
                case "xmlLang":
                  oa(
                    e,
                    p,
                    "xml:lang",
                    m,
                    o,
                    f
                  );
                  continue;
                case "xmlSpace":
                  oa(
                    e,
                    p,
                    "xml:space",
                    m,
                    o,
                    f
                  );
                  continue;
                case "inert":
                  m !== "" || Dv[p] || (Dv[p] = !0, console.error(
                    "Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.",
                    p
                  )), os(
                    e,
                    p,
                    p,
                    m,
                    o,
                    f
                  );
                  continue;
                default:
                  if (!(2 < p.length) || p[0] !== "o" && p[0] !== "O" || p[1] !== "n" && p[1] !== "N") {
                    h = Pm(p), d = !1, i.context === Lc && t !== "svg" && t !== "math" ? o.delete(h.toLowerCase()) : (R = p.toLowerCase(), R = xc.hasOwnProperty(
                      R
                    ) && xc[R] || null, R !== null && R !== p && (d = !0, o.delete(R)), o.delete(h));
                    e: if (R = e, N = h, h = m, er(N))
                      if (R.hasAttribute(N))
                        R = R.getAttribute(
                          N
                        ), He(
                          h,
                          N
                        ), h = R === "" + h ? h : R;
                      else {
                        switch (typeof h) {
                          case "function":
                          case "symbol":
                            break e;
                          case "boolean":
                            if (R = N.toLowerCase().slice(0, 5), R !== "data-" && R !== "aria-")
                              break e;
                        }
                        h = h === void 0 ? void 0 : null;
                      }
                    else h = void 0;
                    d || Ct(
                      p,
                      h,
                      m,
                      f
                    );
                  }
              }
          }
      return 0 < o.size && a.suppressHydrationWarning !== !0 && od(e, o, f), Object.keys(f).length === 0 ? null : f;
    }
    function N0(e, t) {
      switch (e.length) {
        case 0:
          return "";
        case 1:
          return e[0];
        case 2:
          return e[0] + " " + t + " " + e[1];
        default:
          return e.slice(0, -1).join(", ") + ", " + t + " " + e[e.length - 1];
      }
    }
    function hd(e) {
      return e.nodeType === 9 ? e : e.ownerDocument;
    }
    function G0(e) {
      switch (e) {
        case ma:
          return sh;
        case Ri:
          return Ov;
        default:
          return Lc;
      }
    }
    function et(e, t) {
      if (e === Lc)
        switch (t) {
          case "svg":
            return sh;
          case "math":
            return Ov;
          default:
            return Lc;
        }
      return e === sh && t === "foreignObject" ? Lc : e;
    }
    function Ge(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    function ge() {
      var e = window.event;
      return e && e.type === "popstate" ? e === tg ? !1 : (tg = e, !0) : (tg = null, !1);
    }
    function Ae(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function Le(e, t, a) {
      switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && e.focus();
          break;
        case "img":
          a.src ? e.src = a.src : a.srcSet && (e.srcset = a.srcSet);
      }
    }
    function sa(e, t, a, i) {
      q0(e, t, a, i), e[wl] = i;
    }
    function Un(e) {
      cn(e, "");
    }
    function qf(e, t, a) {
      e.nodeValue = a;
    }
    function Oy(e, t) {
      e.removeChild(t);
    }
    function Ru(e, t) {
      e.nodeType === 8 ? e.parentNode.removeChild(t) : e.removeChild(t);
    }
    function tt(e, t) {
      var a = t, i = 0;
      do {
        var f = a.nextSibling;
        if (e.removeChild(a), f && f.nodeType === 8)
          if (a = f.data, a === Mv) {
            if (i === 0) {
              e.removeChild(f), jf(t);
              return;
            }
            i--;
          } else
            a !== Rv && a !== Ks && a !== Js || i++;
        a = f;
      } while (a);
      jf(t);
    }
    function si(e) {
      e = e.style, typeof e.setProperty == "function" ? e.setProperty("display", "none", "important") : e.display = "none";
    }
    function Tc(e) {
      e.nodeValue = "";
    }
    function Uy(e, t) {
      t = t[ab], t = t != null && t.hasOwnProperty("display") ? t.display : null, e.style.display = t == null || typeof t == "boolean" ? "" : ("" + t).trim();
    }
    function Oa(e, t) {
      e.nodeValue = t;
    }
    function ri(e) {
      var t = e.firstChild;
      for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
        var a = t;
        switch (t = t.nextSibling, a.nodeName) {
          case "HTML":
          case "HEAD":
          case "BODY":
            ri(a), $n(a);
            continue;
          case "SCRIPT":
          case "STYLE":
            continue;
          case "LINK":
            if (a.rel.toLowerCase() === "stylesheet") continue;
        }
        e.removeChild(a);
      }
    }
    function ss(e, t, a, i) {
      for (; e.nodeType === 1; ) {
        var f = a;
        if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
          if (!i && (e.nodeName !== "INPUT" || e.type !== "hidden"))
            break;
        } else if (i) {
          if (!e[Ei])
            switch (t) {
              case "meta":
                if (!e.hasAttribute("itemprop")) break;
                return e;
              case "link":
                if (o = e.getAttribute("rel"), o === "stylesheet" && e.hasAttribute("data-precedence"))
                  break;
                if (o !== f.rel || e.getAttribute("href") !== (f.href == null ? null : f.href) || e.getAttribute("crossorigin") !== (f.crossOrigin == null ? null : f.crossOrigin) || e.getAttribute("title") !== (f.title == null ? null : f.title))
                  break;
                return e;
              case "style":
                if (e.hasAttribute("data-precedence")) break;
                return e;
              case "script":
                if (o = e.getAttribute("src"), (o !== (f.src == null ? null : f.src) || e.getAttribute("type") !== (f.type == null ? null : f.type) || e.getAttribute("crossorigin") !== (f.crossOrigin == null ? null : f.crossOrigin)) && o && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                  break;
                return e;
              default:
                return e;
            }
        } else if (t === "input" && e.type === "hidden") {
          He(f.name, "name");
          var o = f.name == null ? null : "" + f.name;
          if (f.type === "hidden" && e.getAttribute("name") === o)
            return e;
        } else return e;
        if (e = Zl(e.nextSibling), e === null) break;
      }
      return null;
    }
    function Hn(e, t, a) {
      if (t === "") return null;
      for (; e.nodeType !== 3; )
        if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !a || (e = Zl(e.nextSibling), e === null)) return null;
      return e;
    }
    function Zl(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
          if (t = e.data, t === Rv || t === Js || t === Ks || t === Ip || t === x1)
            break;
          if (t === Mv) return null;
        }
      }
      return e;
    }
    function yd(e) {
      if (e.nodeType === 1) {
        for (var t = e.nodeName.toLowerCase(), a = {}, i = e.attributes, f = 0; f < i.length; f++) {
          var o = i[f];
          a[rd(o.name)] = o.name.toLowerCase() === "style" ? fs(e) : o.value;
        }
        return { type: t, props: a };
      }
      return e.nodeType === 8 ? { type: "Suspense", props: {} } : e.nodeValue;
    }
    function rs(e, t, a) {
      return a === null || a[lb] !== !0 ? (e.nodeValue === t ? e = null : (t = xt(t), e = xt(e.nodeValue) === t ? null : e.nodeValue), e) : null;
    }
    function ds(e) {
      e = e.nextSibling;
      for (var t = 0; e; ) {
        if (e.nodeType === 8) {
          var a = e.data;
          if (a === Mv) {
            if (t === 0)
              return Zl(e.nextSibling);
            t--;
          } else
            a !== Rv && a !== Js && a !== Ks || t++;
        }
        e = e.nextSibling;
      }
      return null;
    }
    function Mu(e) {
      e = e.previousSibling;
      for (var t = 0; e; ) {
        if (e.nodeType === 8) {
          var a = e.data;
          if (a === Rv || a === Js || a === Ks) {
            if (t === 0) return e;
            t--;
          } else a === Mv && t++;
        }
        e = e.previousSibling;
      }
      return null;
    }
    function md(e) {
      jf(e);
    }
    function Ec(e) {
      jf(e);
    }
    function Yf(e, t, a, i, f) {
      switch (f && cr(e, i.ancestorInfo), t = hd(a), e) {
        case "html":
          if (e = t.documentElement, !e)
            throw Error(
              "React expected an <html> element (document.documentElement) to exist in the Document but one was not found. React never removes the documentElement for any Document it renders into so the cause is likely in some other script running on this page."
            );
          return e;
        case "head":
          if (e = t.head, !e)
            throw Error(
              "React expected a <head> element (document.head) to exist in the Document but one was not found. React never removes the head for any Document it renders into so the cause is likely in some other script running on this page."
            );
          return e;
        case "body":
          if (e = t.body, !e)
            throw Error(
              "React expected a <body> element (document.body) to exist in the Document but one was not found. React never removes the body for any Document it renders into so the cause is likely in some other script running on this page."
            );
          return e;
        default:
          throw Error(
            "resolveSingletonInstance was called with an element type that is not supported. This is a bug in React."
          );
      }
    }
    function Hy(e, t, a, i) {
      if (qa(a)) {
        var f = a.tagName.toLowerCase();
        console.error(
          "You are mounting a new %s component when a previous one has not first unmounted. It is an error to render more than one %s component at a time and attributes and children of these components will likely fail in unpredictable ways. Please only render a single instance of <%s> and if you need to mount a new one, ensure any previous ones have unmounted first.",
          f,
          f,
          f
        );
      }
      switch (e) {
        case "html":
        case "head":
        case "body":
          break;
        default:
          console.error(
            "acquireSingletonInstance was called with an element type that is not supported. This is a bug in React."
          );
      }
      for (f = a.attributes; f.length; )
        a.removeAttributeNode(f[0]);
      nt(a, e, t), a[al] = i, a[wl] = t;
    }
    function Nf(e) {
      return typeof e.getRootNode == "function" ? e.getRootNode() : e.ownerDocument;
    }
    function Gf(e, t, a) {
      var i = rh;
      if (i && typeof t == "string" && t) {
        var f = Ta(t);
        f = 'link[rel="' + e + '"][href="' + f + '"]', typeof a == "string" && (f += '[crossorigin="' + a + '"]'), V1.has(f) || (V1.add(f), e = { rel: e, crossOrigin: a, href: t }, i.querySelector(f) === null && (t = i.createElement("link"), nt(t, "link", e), Dt(t), i.head.appendChild(t)));
      }
    }
    function vd(e, t, a, i) {
      var f = (f = _t.current) ? Nf(f) : null;
      if (!f)
        throw Error(
          '"resourceRoot" was expected to exist. This is a bug in React.'
        );
      switch (e) {
        case "meta":
        case "title":
          return null;
        case "style":
          return typeof a.precedence == "string" && typeof a.href == "string" ? (a = zc(a.href), t = Gi(f).hoistableStyles, i = t.get(a), i || (i = {
            type: "style",
            instance: null,
            count: 0,
            state: null
          }, t.set(a, i)), i) : { type: "void", instance: null, count: 0, state: null };
        case "link":
          if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
            e = zc(a.href);
            var o = Gi(f).hoistableStyles, d = o.get(e);
            if (!d && (f = f.ownerDocument || f, d = {
              type: "stylesheet",
              instance: null,
              count: 0,
              state: { loading: ks, preload: null }
            }, o.set(e, d), (o = f.querySelector(
              Bt(e)
            )) && !o._p && (d.instance = o, d.state.loading = Gm | _n), !wn.has(e))) {
              var h = {
                rel: "preload",
                as: "style",
                href: a.href,
                crossOrigin: a.crossOrigin,
                integrity: a.integrity,
                media: a.media,
                hrefLang: a.hrefLang,
                referrerPolicy: a.referrerPolicy
              };
              wn.set(e, h), o || xy(
                f,
                e,
                h,
                d.state
              );
            }
            if (t && i === null)
              throw a = `

  - ` + hl(t) + `
  + ` + hl(a), Error(
                "Expected <link> not to update to be updated to a stylesheet with precedence. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + a
              );
            return d;
          }
          if (t && i !== null)
            throw a = `

  - ` + hl(t) + `
  + ` + hl(a), Error(
              "Expected stylesheet with precedence to not be updated to a different kind of <link>. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + a
            );
          return null;
        case "script":
          return t = a.async, a = a.src, typeof a == "string" && t && typeof t != "function" && typeof t != "symbol" ? (a = Ac(a), t = Gi(f).hoistableScripts, i = t.get(a), i || (i = {
            type: "script",
            instance: null,
            count: 0,
            state: null
          }, t.set(a, i)), i) : { type: "void", instance: null, count: 0, state: null };
        default:
          throw Error(
            'getResource encountered a type it did not expect: "' + e + '". this is a bug in React.'
          );
      }
    }
    function hl(e) {
      var t = 0, a = "<link";
      return typeof e.rel == "string" ? (t++, a += ' rel="' + e.rel + '"') : Bn.call(e, "rel") && (t++, a += ' rel="' + (e.rel === null ? "null" : "invalid type " + typeof e.rel) + '"'), typeof e.href == "string" ? (t++, a += ' href="' + e.href + '"') : Bn.call(e, "href") && (t++, a += ' href="' + (e.href === null ? "null" : "invalid type " + typeof e.href) + '"'), typeof e.precedence == "string" ? (t++, a += ' precedence="' + e.precedence + '"') : Bn.call(e, "precedence") && (t++, a += " precedence={" + (e.precedence === null ? "null" : "invalid type " + typeof e.precedence) + "}"), Object.getOwnPropertyNames(e).length > t && (a += " ..."), a + " />";
    }
    function zc(e) {
      return 'href="' + Ta(e) + '"';
    }
    function Bt(e) {
      return 'link[rel="stylesheet"][' + e + "]";
    }
    function Cy(e) {
      return se({}, e, {
        "data-precedence": e.precedence,
        precedence: null
      });
    }
    function xy(e, t, a, i) {
      e.querySelector(
        'link[rel="preload"][as="style"][' + t + "]"
      ) ? i.loading = Gm : (t = e.createElement("link"), i.preload = t, t.addEventListener("load", function() {
        return i.loading |= Gm;
      }), t.addEventListener("error", function() {
        return i.loading |= N1;
      }), nt(t, "link", a), Dt(t), e.head.appendChild(t));
    }
    function Ac(e) {
      return '[src="' + Ta(e) + '"]';
    }
    function hs(e) {
      return "script[async]" + e;
    }
    function Cn(e, t, a) {
      if (t.count++, t.instance === null)
        switch (t.type) {
          case "style":
            var i = e.querySelector(
              'style[data-href~="' + Ta(a.href) + '"]'
            );
            if (i)
              return t.instance = i, Dt(i), i;
            var f = se({}, a, {
              "data-href": a.href,
              "data-precedence": a.precedence,
              href: null,
              precedence: null
            });
            return i = (e.ownerDocument || e).createElement("style"), Dt(i), nt(i, "style", f), Dc(i, a.precedence, e), t.instance = i;
          case "stylesheet":
            f = zc(a.href);
            var o = e.querySelector(
              Bt(f)
            );
            if (o)
              return t.state.loading |= _n, t.instance = o, Dt(o), o;
            i = Cy(a), (f = wn.get(f)) && ys(i, f), o = (e.ownerDocument || e).createElement("link"), Dt(o);
            var d = o;
            return d._p = new Promise(function(h, m) {
              d.onload = h, d.onerror = m;
            }), nt(o, "link", i), t.state.loading |= _n, Dc(o, a.precedence, e), t.instance = o;
          case "script":
            return o = Ac(a.src), (f = e.querySelector(
              hs(o)
            )) ? (t.instance = f, Dt(f), f) : (i = a, (f = wn.get(o)) && (i = se({}, a), di(i, f)), e = e.ownerDocument || e, f = e.createElement("script"), Dt(f), nt(f, "link", i), e.head.appendChild(f), t.instance = f);
          case "void":
            return null;
          default:
            throw Error(
              'acquireResource encountered a resource type it did not expect: "' + t.type + '". this is a bug in React.'
            );
        }
      else
        t.type === "stylesheet" && (t.state.loading & _n) === ks && (i = t.instance, t.state.loading |= _n, Dc(i, a.precedence, e));
      return t.instance;
    }
    function Dc(e, t, a) {
      for (var i = a.querySelectorAll(
        'link[rel="stylesheet"][data-precedence],style[data-precedence]'
      ), f = i.length ? i[i.length - 1] : null, o = f, d = 0; d < i.length; d++) {
        var h = i[d];
        if (h.dataset.precedence === t) o = h;
        else if (o !== f) break;
      }
      o ? o.parentNode.insertBefore(e, o.nextSibling) : (t = a.nodeType === 9 ? a.head : a, t.insertBefore(e, t.firstChild));
    }
    function ys(e, t) {
      e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
    }
    function di(e, t) {
      e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
    }
    function By(e, t, a) {
      if (Uv === null) {
        var i = /* @__PURE__ */ new Map(), f = Uv = /* @__PURE__ */ new Map();
        f.set(a, i);
      } else
        f = Uv, i = f.get(a), i || (i = /* @__PURE__ */ new Map(), f.set(a, i));
      if (i.has(e)) return i;
      for (i.set(e, null), a = a.getElementsByTagName(e), f = 0; f < a.length; f++) {
        var o = a[f];
        if (!(o[Ei] || o[al] || e === "link" && o.getAttribute("rel") === "stylesheet") && o.namespaceURI !== ma) {
          var d = o.getAttribute(t) || "";
          d = e + d;
          var h = i.get(d);
          h ? h.push(o) : i.set(d, [o]);
        }
      }
      return i;
    }
    function qy(e, t, a) {
      e = e.ownerDocument || e, e.head.insertBefore(
        a,
        t === "title" ? e.querySelector("head > title") : null
      );
    }
    function V0(e, t, a) {
      var i = !a.ancestorInfo.containerTagInScope;
      if (a.context === sh || t.itemProp != null)
        return !i || t.itemProp == null || e !== "meta" && e !== "title" && e !== "style" && e !== "link" && e !== "script" || console.error(
          "Cannot render a <%s> outside the main document if it has an `itemProp` prop. `itemProp` suggests the tag belongs to an `itemScope` which can appear anywhere in the DOM. If you were intending for React to hoist this <%s> remove the `itemProp` prop. Otherwise, try moving this tag into the <head> or <body> of the Document.",
          e,
          e
        ), !1;
      switch (e) {
        case "meta":
        case "title":
          return !0;
        case "style":
          if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") {
            i && console.error(
              'Cannot render a <style> outside the main document without knowing its precedence and a unique href key. React can hoist and deduplicate <style> tags if you provide a `precedence` prop along with an `href` prop that does not conflic with the `href` values used in any other hoisted <style> or <link rel="stylesheet" ...> tags.  Note that hoisting <style> tags is considered an advanced feature that most will not use directly. Consider moving the <style> tag to the <head> or consider adding a `precedence="default"` and `href="some unique resource identifier"`, or move the <style> to the <style> tag.'
            );
            break;
          }
          return !0;
        case "link":
          if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) {
            if (t.rel === "stylesheet" && typeof t.precedence == "string") {
              e = t.href;
              var f = t.onError, o = t.disabled;
              a = [], t.onLoad && a.push("`onLoad`"), f && a.push("`onError`"), o != null && a.push("`disabled`"), f = N0(a, "and"), f += a.length === 1 ? " prop" : " props", o = a.length === 1 ? "an " + f : "the " + f, a.length && console.error(
                'React encountered a <link rel="stylesheet" href="%s" ... /> with a `precedence` prop that also included %s. The presence of loading and error handlers indicates an intent to manage the stylesheet loading state from your from your Component code and React will not hoist or deduplicate this stylesheet. If your intent was to have React hoist and deduplciate this stylesheet using the `precedence` prop remove the %s, otherwise remove the `precedence` prop.',
                e,
                o,
                f
              );
            }
            i && (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" ? console.error(
              "Cannot render a <link> outside the main document without a `rel` and `href` prop. Try adding a `rel` and/or `href` prop to this <link> or moving the link into the <head> tag"
            ) : (t.onError || t.onLoad) && console.error(
              "Cannot render a <link> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>."
            ));
            break;
          }
          switch (t.rel) {
            case "stylesheet":
              return e = t.precedence, t = t.disabled, typeof e != "string" && i && console.error(
                'Cannot render a <link rel="stylesheet" /> outside the main document without knowing its precedence. Consider adding precedence="default" or moving it into the root <head> tag.'
              ), typeof e == "string" && t == null;
            default:
              return !0;
          }
        case "script":
          if (e = t.async && typeof t.async != "function" && typeof t.async != "symbol", !e || t.onLoad || t.onError || !t.src || typeof t.src != "string") {
            i && (e ? t.onLoad || t.onError ? console.error(
              "Cannot render a <script> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>."
            ) : console.error(
              "Cannot render a <script> outside the main document without `async={true}` and a non-empty `src` prop. Ensure there is a valid `src` and either make the script async or move it into the root <head> tag or somewhere in the <body>."
            ) : console.error(
              'Cannot render a sync or defer <script> outside the main document without knowing its order. Try adding async="" or moving it into the root <head> tag.'
            ));
            break;
          }
          return !0;
        case "noscript":
        case "template":
          i && console.error(
            "Cannot render <%s> outside the main document. Try moving it into the root <head> tag.",
            e
          );
      }
      return !1;
    }
    function pd(e) {
      return !(e.type === "stylesheet" && (e.state.loading & G1) === ks);
    }
    function Yy() {
    }
    function Jv(e, t, a) {
      if (Vm === null)
        throw Error(
          "Internal React Error: suspendedState null when it was expected to exists. Please report this as a React bug."
        );
      var i = Vm;
      if (t.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (t.state.loading & _n) === ks) {
        if (t.instance === null) {
          var f = zc(a.href), o = e.querySelector(
            Bt(f)
          );
          if (o) {
            e = o._p, e !== null && typeof e == "object" && typeof e.then == "function" && (i.count++, i = gd.bind(i), e.then(i, i)), t.state.loading |= _n, t.instance = o, Dt(o);
            return;
          }
          o = e.ownerDocument || e, a = Cy(a), (f = wn.get(f)) && ys(a, f), o = o.createElement("link"), Dt(o);
          var d = o;
          d._p = new Promise(function(h, m) {
            d.onload = h, d.onerror = m;
          }), nt(o, "link", a), t.instance = o;
        }
        i.stylesheets === null && (i.stylesheets = /* @__PURE__ */ new Map()), i.stylesheets.set(t, e), (e = t.state.preload) && (t.state.loading & G1) === ks && (i.count++, t = gd.bind(i), e.addEventListener("load", t), e.addEventListener("error", t));
      }
    }
    function kv() {
      if (Vm === null)
        throw Error(
          "Internal React Error: suspendedState null when it was expected to exists. Please report this as a React bug."
        );
      var e = Vm;
      return e.stylesheets && e.count === 0 && Sd(e, e.stylesheets), 0 < e.count ? function(t) {
        var a = setTimeout(function() {
          if (e.stylesheets && Sd(e, e.stylesheets), e.unsuspend) {
            var i = e.unsuspend;
            e.unsuspend = null, i();
          }
        }, 6e4);
        return e.unsuspend = t, function() {
          e.unsuspend = null, clearTimeout(a);
        };
      } : null;
    }
    function gd() {
      if (this.count--, this.count === 0) {
        if (this.stylesheets)
          Sd(this, this.stylesheets);
        else if (this.unsuspend) {
          var e = this.unsuspend;
          this.unsuspend = null, e();
        }
      }
    }
    function Sd(e, t) {
      e.stylesheets = null, e.unsuspend !== null && (e.count++, Hv = /* @__PURE__ */ new Map(), t.forEach(X0, e), Hv = null, gd.call(e));
    }
    function X0(e, t) {
      if (!(t.state.loading & _n)) {
        var a = Hv.get(e);
        if (a) var i = a.get(ag);
        else {
          a = /* @__PURE__ */ new Map(), Hv.set(e, a);
          for (var f = e.querySelectorAll(
            "link[data-precedence],style[data-precedence]"
          ), o = 0; o < f.length; o++) {
            var d = f[o];
            (d.nodeName === "LINK" || d.getAttribute("media") !== "not all") && (a.set(d.dataset.precedence, d), i = d);
          }
          i && a.set(ag, i);
        }
        f = t.instance, d = f.getAttribute("data-precedence"), o = a.get(d) || i, o === i && a.set(ag, f), a.set(d, f), this.count++, i = gd.bind(this), f.addEventListener("load", i), f.addEventListener("error", i), o ? o.parentNode.insertBefore(f, o.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(f, e.firstChild)), t.state.loading |= _n;
      }
    }
    function Vf(e, t, a) {
      var i = 0;
      switch (e) {
        case "dir":
        case "dirxml":
        case "groupEnd":
        case "table":
          return L1.apply(console[e], [console].concat(t));
        case "assert":
          i = 1;
      }
      return t = t.slice(0), typeof t[i] == "string" ? t.splice(
        i,
        1,
        X1 + t[i],
        Q1,
        Cv + a + Cv,
        j1
      ) : t.splice(
        i,
        0,
        X1,
        Q1,
        Cv + a + Cv,
        j1
      ), t.unshift(console), L1.apply(console[e], t);
    }
    function bd(e, t, a, i, f, o, d, h) {
      for (this.tag = 1, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = lg, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ni(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.finishedLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ni(0), this.hiddenUpdates = Ni(null), this.identifierPrefix = i, this.onUncaughtError = f, this.onCaughtError = o, this.onRecoverableError = d, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = h, this.incompleteTransitions = /* @__PURE__ */ new Map(), this.passiveEffectDuration = this.effectDuration = -0, this.memoizedUpdaters = /* @__PURE__ */ new Set(), e = this.pendingUpdatersLaneMap = [], t = 0; 31 > t; t++) e.push(/* @__PURE__ */ new Set());
      this._debugRootType = a ? "hydrateRoot()" : "createRoot()";
    }
    function Ny(e, t, a, i, f, o, d, h, m, p, R, N) {
      return e = new bd(
        e,
        t,
        a,
        d,
        h,
        m,
        p,
        N
      ), t = NS, o === !0 && (t |= Jl | xu), Dl && (t |= Rl), o = we(3, null, null, t), e.current = o, o.stateNode = e, t = au(), Aa(t), e.pooledCache = t, Aa(t), o.memoizedState = {
        element: i,
        isDehydrated: a,
        cache: t
      }, Xr(o), e;
    }
    function Gy(e) {
      return e ? (e = If, e) : If;
    }
    function Q0(e, t, a, i) {
      return t.tag === 0 && Eu(), Vy(
        t.current,
        2,
        e,
        t,
        a,
        i
      ), 2;
    }
    function Vy(e, t, a, i, f, o) {
      if (vl && typeof vl.onScheduleFiberRoot == "function")
        try {
          vl.onScheduleFiberRoot(wf, i, a);
        } catch (d) {
          Al || (Al = !0, console.error(
            "React instrumentation encountered an error: %s",
            d
          ));
        }
      K !== null && typeof K.markRenderScheduled == "function" && K.markRenderScheduled(t), f = Gy(f), i.context === null ? i.context = f : i.pendingContext = f, ha && ml !== null && !Z1 && (Z1 = !0, console.error(
        `Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`,
        P(ml) || "Unknown"
      )), i = hu(t), i.payload = { element: a }, o = o === void 0 ? null : o, o !== null && (typeof o != "function" && console.error(
        "Expected the last optional `callback` argument to be a function. Instead received: %s.",
        o
      ), i.callback = o), a = yu(e, i, t), a !== null && (Qe(a, e, t), ko(a, e, t));
    }
    function Rc(e, t) {
      if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
        var a = e.retryLane;
        e.retryLane = a !== 0 && a < t ? a : t;
      }
    }
    function Td(e, t) {
      Rc(e, t), (e = e.alternate) && Rc(e, t);
    }
    function Ve(e) {
      if (e.tag === 13) {
        var t = It(e, 67108864);
        t !== null && Qe(t, e, 67108864), Td(e, 67108864);
      }
    }
    function Xy() {
      return ml;
    }
    function $v() {
      for (var e = /* @__PURE__ */ new Map(), t = 1, a = 0; 31 > a; a++) {
        var i = Km(t);
        e.set(t, i), t *= 2;
      }
      return e;
    }
    function j0(e, t, a, i) {
      var f = U.T;
      U.T = null;
      var o = Ze.p;
      try {
        Ze.p = ya, Qy(e, t, a, i);
      } finally {
        Ze.p = o, U.T = f;
      }
    }
    function Wv(e, t, a, i) {
      var f = U.T;
      U.T = null;
      var o = Ze.p;
      try {
        Ze.p = Ua, Qy(e, t, a, i);
      } finally {
        Ze.p = o, U.T = f;
      }
    }
    function Qy(e, t, a, i) {
      if (xv) {
        var f = jy(i);
        if (f === null)
          pc(
            e,
            t,
            i,
            Bv,
            a
          ), Ed(e, i);
        else if (Ly(
          f,
          e,
          t,
          a,
          i
        ))
          i.stopPropagation();
        else if (Ed(e, i), t & 4 && -1 < ib.indexOf(e)) {
          for (; f !== null; ) {
            var o = qa(f);
            if (o !== null)
              switch (o.tag) {
                case 3:
                  if (o = o.stateNode, o.current.memoizedState.isDehydrated) {
                    var d = Xu(o.pendingLanes);
                    if (d !== 0) {
                      var h = o;
                      for (h.pendingLanes |= 2, h.entangledLanes |= 2; d; ) {
                        var m = 1 << 31 - pl(d);
                        h.entanglements[1] |= m, d &= ~m;
                      }
                      Ja(o), (ut & (ba | Xc)) === Pa && (mv = qn() + A1, xf(0));
                    }
                  }
                  break;
                case 13:
                  h = It(o, 2), h !== null && Qe(h, o, 2), ua(), Td(o, 2);
              }
            if (o = jy(i), o === null && pc(
              e,
              t,
              i,
              Bv,
              a
            ), o === f) break;
            f = o;
          }
          f !== null && i.stopPropagation();
        } else
          pc(
            e,
            t,
            i,
            null,
            a
          );
      }
    }
    function jy(e) {
      return e = Lu(e), Xf(e);
    }
    function Xf(e) {
      if (Bv = null, e = nn(e), e !== null) {
        var t = Bl(e);
        if (t === null) e = null;
        else {
          var a = t.tag;
          if (a === 13) {
            if (e = C(t), e !== null) return e;
            e = null;
          } else if (a === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated)
              return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null;
          } else t !== e && (e = null);
        }
      }
      return Bv = e, null;
    }
    function Mc(e) {
      switch (e) {
        case "beforetoggle":
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "toggle":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return ya;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return Ua;
        case "message":
          switch (ep()) {
            case Si:
              return ya;
            case Cd:
              return Ua;
            case _f:
            case tp:
              return Fa;
            case Fy:
              return Hc;
            default:
              return Fa;
          }
        default:
          return Fa;
      }
    }
    function Ed(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          fo = null;
          break;
        case "dragenter":
        case "dragleave":
          oo = null;
          break;
        case "mouseover":
        case "mouseout":
          so = null;
          break;
        case "pointerover":
        case "pointerout":
          Qm.delete(t.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          jm.delete(t.pointerId);
      }
    }
    function hi(e, t, a, i, f, o) {
      return e === null || e.nativeEvent !== o ? (e = {
        blockedOn: t,
        domEventName: a,
        eventSystemFlags: i,
        nativeEvent: o,
        targetContainers: [f]
      }, t !== null && (t = qa(t), t !== null && Ve(t)), e) : (e.eventSystemFlags |= i, t = e.targetContainers, f !== null && t.indexOf(f) === -1 && t.push(f), e);
    }
    function Ly(e, t, a, i, f) {
      switch (t) {
        case "focusin":
          return fo = hi(
            fo,
            e,
            t,
            a,
            i,
            f
          ), !0;
        case "dragenter":
          return oo = hi(
            oo,
            e,
            t,
            a,
            i,
            f
          ), !0;
        case "mouseover":
          return so = hi(
            so,
            e,
            t,
            a,
            i,
            f
          ), !0;
        case "pointerover":
          var o = f.pointerId;
          return Qm.set(
            o,
            hi(
              Qm.get(o) || null,
              e,
              t,
              a,
              i,
              f
            )
          ), !0;
        case "gotpointercapture":
          return o = f.pointerId, jm.set(
            o,
            hi(
              jm.get(o) || null,
              e,
              t,
              a,
              i,
              f
            )
          ), !0;
      }
      return !1;
    }
    function yi(e) {
      var t = nn(e.target);
      if (t !== null) {
        var a = Bl(t);
        if (a !== null) {
          if (t = a.tag, t === 13) {
            if (t = C(a), t !== null) {
              e.blockedOn = t, Ps(e.priority, function() {
                if (a.tag === 13) {
                  var i = El(a), f = It(a, i);
                  f !== null && Qe(f, a, i), Td(a, i);
                }
              });
              return;
            }
          } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
            e.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
            return;
          }
        }
      }
      e.blockedOn = null;
    }
    function ra(e) {
      if (e.blockedOn !== null) return !1;
      for (var t = e.targetContainers; 0 < t.length; ) {
        var a = jy(e.nativeEvent);
        if (a === null) {
          a = e.nativeEvent;
          var i = new a.constructor(
            a.type,
            a
          ), f = i;
          g !== null && console.error(
            "Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."
          ), g = f, a.target.dispatchEvent(i), g === null && console.error(
            "Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."
          ), g = null;
        } else
          return t = qa(a), t !== null && Ve(t), e.blockedOn = a, !1;
        t.shift();
      }
      return !0;
    }
    function Qf(e, t, a) {
      ra(e) && a.delete(t);
    }
    function Fv() {
      ng = !1, fo !== null && ra(fo) && (fo = null), oo !== null && ra(oo) && (oo = null), so !== null && ra(so) && (so = null), Qm.forEach(Qf), jm.forEach(Qf);
    }
    function ms(e, t) {
      e.blockedOn === t && (e.blockedOn = null, ng || (ng = !0, gt.unstable_scheduleCallback(
        gt.unstable_NormalPriority,
        Fv
      )));
    }
    function Zy(e) {
      qv !== e && (qv = e, gt.unstable_scheduleCallback(
        gt.unstable_NormalPriority,
        function() {
          qv === e && (qv = null);
          for (var t = 0; t < e.length; t += 3) {
            var a = e[t], i = e[t + 1], f = e[t + 2];
            if (typeof i != "function") {
              if (Xf(i || a) === null)
                continue;
              break;
            }
            var o = qa(a);
            o !== null && (e.splice(t, 3), t -= 3, a = {
              pending: !0,
              data: f,
              method: a.method,
              action: i
            }, Object.freeze(a), vn(
              o,
              a,
              i,
              f
            ));
          }
        }
      ));
    }
    function jf(e) {
      function t(m) {
        return ms(m, e);
      }
      fo !== null && ms(fo, e), oo !== null && ms(oo, e), so !== null && ms(so, e), Qm.forEach(t), jm.forEach(t);
      for (var a = 0; a < ro.length; a++) {
        var i = ro[a];
        i.blockedOn === e && (i.blockedOn = null);
      }
      for (; 0 < ro.length && (a = ro[0], a.blockedOn === null); )
        yi(a), a.blockedOn === null && ro.shift();
      if (a = (e.ownerDocument || e).$$reactFormReplay, a != null)
        for (i = 0; i < a.length; i += 3) {
          var f = a[i], o = a[i + 1], d = f[wl] || null;
          if (typeof o == "function")
            d || Zy(a);
          else if (d) {
            var h = null;
            if (o && o.hasAttribute("formAction")) {
              if (f = o, d = o[wl] || null)
                h = d.formAction;
              else if (Xf(f) !== null) continue;
            } else h = d.action;
            typeof h == "function" ? a[i + 1] = h : (a.splice(i, 3), i -= 3), Zy(a);
          }
        }
    }
    function _y(e) {
      this._internalRoot = e;
    }
    function Lf(e) {
      this._internalRoot = e;
    }
    function wy(e) {
      e[Ti] && (e._reactRootContainer ? console.error(
        "You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported."
      ) : console.error(
        "You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."
      ));
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var gt = cS(), Ky = uS, Jy = iS, ky = Symbol.for("react.element"), mi = Symbol.for("react.transitional.element"), Zf = Symbol.for("react.portal"), xn = Symbol.for("react.fragment"), zd = Symbol.for("react.strict_mode"), Ad = Symbol.for("react.profiler"), ze = Symbol.for("react.provider"), vs = Symbol.for("react.consumer"), da = Symbol.for("react.context"), Oc = Symbol.for("react.forward_ref"), Dd = Symbol.for("react.suspense"), ps = Symbol.for("react.suspense_list"), vi = Symbol.for("react.memo"), yl = Symbol.for("react.lazy"), Uc = Symbol.for("react.offscreen"), L0 = Symbol.for("react.memo_cache_sentinel"), Z0 = Symbol.iterator, Iv = Symbol.for("react.client.reference"), U = Ky.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, se = Object.assign, pi = 0, qe, Rd, Zt, _0, Md, Od, gs;
    Ul.__reactDisabledLog = !0;
    var Ud, $y, Ss = !1, bs = new (typeof WeakMap == "function" ? WeakMap : Map)(), ml = null, ha = !1, ll = Array.isArray, Ze = Jy.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Pv = Object.freeze({
      pending: !1,
      data: null,
      method: null,
      action: null
    }), Wy = [], Ts = [], Wa = -1, gi = le(null), Es = le(null), _t = le(null), zs = le(null), Bn = Object.prototype.hasOwnProperty, _l = gt.unstable_scheduleCallback, w0 = gt.unstable_cancelCallback, Hd = gt.unstable_shouldYield, Ou = gt.unstable_requestPaint, qn = gt.unstable_now, ep = gt.unstable_getCurrentPriorityLevel, Si = gt.unstable_ImmediatePriority, Cd = gt.unstable_UserBlockingPriority, _f = gt.unstable_NormalPriority, tp = gt.unstable_LowPriority, Fy = gt.unstable_IdlePriority, lp = gt.log, ap = gt.unstable_setDisableYieldValue, wf = null, vl = null, K = null, Al = !1, Dl = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u", pl = Math.clz32 ? Math.clz32 : Nv, np = Math.log, Kf = Math.LN2, bi = 128, As = 4194304, ya = 2, Ua = 8, Fa = 32, Hc = 268435456, Uu = Math.random().toString(36).slice(2), al = "__reactFiber$" + Uu, wl = "__reactProps$" + Uu, Ti = "__reactContainer$" + Uu, Cc = "__reactEvents$" + Uu, up = "__reactListeners$" + Uu, ip = "__reactHandles$" + Uu, K0 = "__reactResources$" + Uu, Ei = "__reactMarker$" + Uu, Ds = /* @__PURE__ */ new Set(), Hu = {}, Iy = {}, Kl = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), cp = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    }, J0 = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), Py = {}, em = {}, k0 = /[\n"\\]/g, xd = !1, tm = !1, Rs = !1, $0 = !1, W0 = !1, Bd = !1, qd = ["value", "defaultValue"], Ms = !1, Yd = /["'&<>\n\t]|^\s|\s$/, F0 = "address applet area article aside base basefont bgsound blockquote body br button caption center col colgroup dd details dir div dl dt embed fieldset figcaption figure footer form frame frameset h1 h2 h3 h4 h5 h6 head header hgroup hr html iframe img input isindex li link listing main marquee menu menuitem meta nav noembed noframes noscript object ol p param plaintext pre script section select source style summary table tbody td template textarea tfoot th thead title tr track ul wbr xmp".split(
      " "
    ), Nd = "applet caption html table td th marquee object template foreignObject desc title".split(
      " "
    ), zi = Nd.concat(["button"]), Ai = "dd dt li option optgroup p rp rt".split(" "), Cu = {
      current: null,
      formTag: null,
      aTagInScope: null,
      buttonTagInScope: null,
      nobrTagInScope: null,
      pTagInButtonScope: null,
      listItemTagAutoclosing: null,
      dlItemTagAutoclosing: null,
      containerTagInScope: null
    }, Di = {}, Ri = "http://www.w3.org/1998/Math/MathML", ma = "http://www.w3.org/2000/svg", lm = {
      animation: "animationDelay animationDirection animationDuration animationFillMode animationIterationCount animationName animationPlayState animationTimingFunction".split(
        " "
      ),
      background: "backgroundAttachment backgroundClip backgroundColor backgroundImage backgroundOrigin backgroundPositionX backgroundPositionY backgroundRepeat backgroundSize".split(
        " "
      ),
      backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
      border: "borderBottomColor borderBottomStyle borderBottomWidth borderImageOutset borderImageRepeat borderImageSlice borderImageSource borderImageWidth borderLeftColor borderLeftStyle borderLeftWidth borderRightColor borderRightStyle borderRightWidth borderTopColor borderTopStyle borderTopWidth".split(
        " "
      ),
      borderBlockEnd: [
        "borderBlockEndColor",
        "borderBlockEndStyle",
        "borderBlockEndWidth"
      ],
      borderBlockStart: [
        "borderBlockStartColor",
        "borderBlockStartStyle",
        "borderBlockStartWidth"
      ],
      borderBottom: [
        "borderBottomColor",
        "borderBottomStyle",
        "borderBottomWidth"
      ],
      borderColor: [
        "borderBottomColor",
        "borderLeftColor",
        "borderRightColor",
        "borderTopColor"
      ],
      borderImage: [
        "borderImageOutset",
        "borderImageRepeat",
        "borderImageSlice",
        "borderImageSource",
        "borderImageWidth"
      ],
      borderInlineEnd: [
        "borderInlineEndColor",
        "borderInlineEndStyle",
        "borderInlineEndWidth"
      ],
      borderInlineStart: [
        "borderInlineStartColor",
        "borderInlineStartStyle",
        "borderInlineStartWidth"
      ],
      borderLeft: ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"],
      borderRadius: [
        "borderBottomLeftRadius",
        "borderBottomRightRadius",
        "borderTopLeftRadius",
        "borderTopRightRadius"
      ],
      borderRight: [
        "borderRightColor",
        "borderRightStyle",
        "borderRightWidth"
      ],
      borderStyle: [
        "borderBottomStyle",
        "borderLeftStyle",
        "borderRightStyle",
        "borderTopStyle"
      ],
      borderTop: ["borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderWidth: [
        "borderBottomWidth",
        "borderLeftWidth",
        "borderRightWidth",
        "borderTopWidth"
      ],
      columnRule: ["columnRuleColor", "columnRuleStyle", "columnRuleWidth"],
      columns: ["columnCount", "columnWidth"],
      flex: ["flexBasis", "flexGrow", "flexShrink"],
      flexFlow: ["flexDirection", "flexWrap"],
      font: "fontFamily fontFeatureSettings fontKerning fontLanguageOverride fontSize fontSizeAdjust fontStretch fontStyle fontVariant fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition fontWeight lineHeight".split(
        " "
      ),
      fontVariant: "fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition".split(
        " "
      ),
      gap: ["columnGap", "rowGap"],
      grid: "gridAutoColumns gridAutoFlow gridAutoRows gridTemplateAreas gridTemplateColumns gridTemplateRows".split(
        " "
      ),
      gridArea: [
        "gridColumnEnd",
        "gridColumnStart",
        "gridRowEnd",
        "gridRowStart"
      ],
      gridColumn: ["gridColumnEnd", "gridColumnStart"],
      gridColumnGap: ["columnGap"],
      gridGap: ["columnGap", "rowGap"],
      gridRow: ["gridRowEnd", "gridRowStart"],
      gridRowGap: ["rowGap"],
      gridTemplate: [
        "gridTemplateAreas",
        "gridTemplateColumns",
        "gridTemplateRows"
      ],
      listStyle: ["listStyleImage", "listStylePosition", "listStyleType"],
      margin: ["marginBottom", "marginLeft", "marginRight", "marginTop"],
      marker: ["markerEnd", "markerMid", "markerStart"],
      mask: "maskClip maskComposite maskImage maskMode maskOrigin maskPositionX maskPositionY maskRepeat maskSize".split(
        " "
      ),
      maskPosition: ["maskPositionX", "maskPositionY"],
      outline: ["outlineColor", "outlineStyle", "outlineWidth"],
      overflow: ["overflowX", "overflowY"],
      padding: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
      placeContent: ["alignContent", "justifyContent"],
      placeItems: ["alignItems", "justifyItems"],
      placeSelf: ["alignSelf", "justifySelf"],
      textDecoration: [
        "textDecorationColor",
        "textDecorationLine",
        "textDecorationStyle"
      ],
      textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
      transition: [
        "transitionDelay",
        "transitionDuration",
        "transitionProperty",
        "transitionTimingFunction"
      ],
      wordWrap: ["overflowWrap"]
    }, am = /([A-Z])/g, Jf = /^ms-/, fp = /^(?:webkit|moz|o)[A-Z]/, I0 = /^-ms-/, Gd = /-(.)/g, nm = /;\s*$/, kf = {}, $f = {}, Os = !1, um = !1, Wf = new Set(
      "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
        " "
      )
    ), im = /* @__PURE__ */ new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"]
    ]), xc = {
      accept: "accept",
      acceptcharset: "acceptCharset",
      "accept-charset": "acceptCharset",
      accesskey: "accessKey",
      action: "action",
      allowfullscreen: "allowFullScreen",
      alt: "alt",
      as: "as",
      async: "async",
      autocapitalize: "autoCapitalize",
      autocomplete: "autoComplete",
      autocorrect: "autoCorrect",
      autofocus: "autoFocus",
      autoplay: "autoPlay",
      autosave: "autoSave",
      capture: "capture",
      cellpadding: "cellPadding",
      cellspacing: "cellSpacing",
      challenge: "challenge",
      charset: "charSet",
      checked: "checked",
      children: "children",
      cite: "cite",
      class: "className",
      classid: "classID",
      classname: "className",
      cols: "cols",
      colspan: "colSpan",
      content: "content",
      contenteditable: "contentEditable",
      contextmenu: "contextMenu",
      controls: "controls",
      controlslist: "controlsList",
      coords: "coords",
      crossorigin: "crossOrigin",
      dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
      data: "data",
      datetime: "dateTime",
      default: "default",
      defaultchecked: "defaultChecked",
      defaultvalue: "defaultValue",
      defer: "defer",
      dir: "dir",
      disabled: "disabled",
      disablepictureinpicture: "disablePictureInPicture",
      disableremoteplayback: "disableRemotePlayback",
      download: "download",
      draggable: "draggable",
      enctype: "encType",
      enterkeyhint: "enterKeyHint",
      fetchpriority: "fetchPriority",
      for: "htmlFor",
      form: "form",
      formmethod: "formMethod",
      formaction: "formAction",
      formenctype: "formEncType",
      formnovalidate: "formNoValidate",
      formtarget: "formTarget",
      frameborder: "frameBorder",
      headers: "headers",
      height: "height",
      hidden: "hidden",
      high: "high",
      href: "href",
      hreflang: "hrefLang",
      htmlfor: "htmlFor",
      httpequiv: "httpEquiv",
      "http-equiv": "httpEquiv",
      icon: "icon",
      id: "id",
      imagesizes: "imageSizes",
      imagesrcset: "imageSrcSet",
      inert: "inert",
      innerhtml: "innerHTML",
      inputmode: "inputMode",
      integrity: "integrity",
      is: "is",
      itemid: "itemID",
      itemprop: "itemProp",
      itemref: "itemRef",
      itemscope: "itemScope",
      itemtype: "itemType",
      keyparams: "keyParams",
      keytype: "keyType",
      kind: "kind",
      label: "label",
      lang: "lang",
      list: "list",
      loop: "loop",
      low: "low",
      manifest: "manifest",
      marginwidth: "marginWidth",
      marginheight: "marginHeight",
      max: "max",
      maxlength: "maxLength",
      media: "media",
      mediagroup: "mediaGroup",
      method: "method",
      min: "min",
      minlength: "minLength",
      multiple: "multiple",
      muted: "muted",
      name: "name",
      nomodule: "noModule",
      nonce: "nonce",
      novalidate: "noValidate",
      open: "open",
      optimum: "optimum",
      pattern: "pattern",
      placeholder: "placeholder",
      playsinline: "playsInline",
      poster: "poster",
      preload: "preload",
      profile: "profile",
      radiogroup: "radioGroup",
      readonly: "readOnly",
      referrerpolicy: "referrerPolicy",
      rel: "rel",
      required: "required",
      reversed: "reversed",
      role: "role",
      rows: "rows",
      rowspan: "rowSpan",
      sandbox: "sandbox",
      scope: "scope",
      scoped: "scoped",
      scrolling: "scrolling",
      seamless: "seamless",
      selected: "selected",
      shape: "shape",
      size: "size",
      sizes: "sizes",
      span: "span",
      spellcheck: "spellCheck",
      src: "src",
      srcdoc: "srcDoc",
      srclang: "srcLang",
      srcset: "srcSet",
      start: "start",
      step: "step",
      style: "style",
      summary: "summary",
      tabindex: "tabIndex",
      target: "target",
      title: "title",
      type: "type",
      usemap: "useMap",
      value: "value",
      width: "width",
      wmode: "wmode",
      wrap: "wrap",
      about: "about",
      accentheight: "accentHeight",
      "accent-height": "accentHeight",
      accumulate: "accumulate",
      additive: "additive",
      alignmentbaseline: "alignmentBaseline",
      "alignment-baseline": "alignmentBaseline",
      allowreorder: "allowReorder",
      alphabetic: "alphabetic",
      amplitude: "amplitude",
      arabicform: "arabicForm",
      "arabic-form": "arabicForm",
      ascent: "ascent",
      attributename: "attributeName",
      attributetype: "attributeType",
      autoreverse: "autoReverse",
      azimuth: "azimuth",
      basefrequency: "baseFrequency",
      baselineshift: "baselineShift",
      "baseline-shift": "baselineShift",
      baseprofile: "baseProfile",
      bbox: "bbox",
      begin: "begin",
      bias: "bias",
      by: "by",
      calcmode: "calcMode",
      capheight: "capHeight",
      "cap-height": "capHeight",
      clip: "clip",
      clippath: "clipPath",
      "clip-path": "clipPath",
      clippathunits: "clipPathUnits",
      cliprule: "clipRule",
      "clip-rule": "clipRule",
      color: "color",
      colorinterpolation: "colorInterpolation",
      "color-interpolation": "colorInterpolation",
      colorinterpolationfilters: "colorInterpolationFilters",
      "color-interpolation-filters": "colorInterpolationFilters",
      colorprofile: "colorProfile",
      "color-profile": "colorProfile",
      colorrendering: "colorRendering",
      "color-rendering": "colorRendering",
      contentscripttype: "contentScriptType",
      contentstyletype: "contentStyleType",
      cursor: "cursor",
      cx: "cx",
      cy: "cy",
      d: "d",
      datatype: "datatype",
      decelerate: "decelerate",
      descent: "descent",
      diffuseconstant: "diffuseConstant",
      direction: "direction",
      display: "display",
      divisor: "divisor",
      dominantbaseline: "dominantBaseline",
      "dominant-baseline": "dominantBaseline",
      dur: "dur",
      dx: "dx",
      dy: "dy",
      edgemode: "edgeMode",
      elevation: "elevation",
      enablebackground: "enableBackground",
      "enable-background": "enableBackground",
      end: "end",
      exponent: "exponent",
      externalresourcesrequired: "externalResourcesRequired",
      fill: "fill",
      fillopacity: "fillOpacity",
      "fill-opacity": "fillOpacity",
      fillrule: "fillRule",
      "fill-rule": "fillRule",
      filter: "filter",
      filterres: "filterRes",
      filterunits: "filterUnits",
      floodopacity: "floodOpacity",
      "flood-opacity": "floodOpacity",
      floodcolor: "floodColor",
      "flood-color": "floodColor",
      focusable: "focusable",
      fontfamily: "fontFamily",
      "font-family": "fontFamily",
      fontsize: "fontSize",
      "font-size": "fontSize",
      fontsizeadjust: "fontSizeAdjust",
      "font-size-adjust": "fontSizeAdjust",
      fontstretch: "fontStretch",
      "font-stretch": "fontStretch",
      fontstyle: "fontStyle",
      "font-style": "fontStyle",
      fontvariant: "fontVariant",
      "font-variant": "fontVariant",
      fontweight: "fontWeight",
      "font-weight": "fontWeight",
      format: "format",
      from: "from",
      fx: "fx",
      fy: "fy",
      g1: "g1",
      g2: "g2",
      glyphname: "glyphName",
      "glyph-name": "glyphName",
      glyphorientationhorizontal: "glyphOrientationHorizontal",
      "glyph-orientation-horizontal": "glyphOrientationHorizontal",
      glyphorientationvertical: "glyphOrientationVertical",
      "glyph-orientation-vertical": "glyphOrientationVertical",
      glyphref: "glyphRef",
      gradienttransform: "gradientTransform",
      gradientunits: "gradientUnits",
      hanging: "hanging",
      horizadvx: "horizAdvX",
      "horiz-adv-x": "horizAdvX",
      horizoriginx: "horizOriginX",
      "horiz-origin-x": "horizOriginX",
      ideographic: "ideographic",
      imagerendering: "imageRendering",
      "image-rendering": "imageRendering",
      in2: "in2",
      in: "in",
      inlist: "inlist",
      intercept: "intercept",
      k1: "k1",
      k2: "k2",
      k3: "k3",
      k4: "k4",
      k: "k",
      kernelmatrix: "kernelMatrix",
      kernelunitlength: "kernelUnitLength",
      kerning: "kerning",
      keypoints: "keyPoints",
      keysplines: "keySplines",
      keytimes: "keyTimes",
      lengthadjust: "lengthAdjust",
      letterspacing: "letterSpacing",
      "letter-spacing": "letterSpacing",
      lightingcolor: "lightingColor",
      "lighting-color": "lightingColor",
      limitingconeangle: "limitingConeAngle",
      local: "local",
      markerend: "markerEnd",
      "marker-end": "markerEnd",
      markerheight: "markerHeight",
      markermid: "markerMid",
      "marker-mid": "markerMid",
      markerstart: "markerStart",
      "marker-start": "markerStart",
      markerunits: "markerUnits",
      markerwidth: "markerWidth",
      mask: "mask",
      maskcontentunits: "maskContentUnits",
      maskunits: "maskUnits",
      mathematical: "mathematical",
      mode: "mode",
      numoctaves: "numOctaves",
      offset: "offset",
      opacity: "opacity",
      operator: "operator",
      order: "order",
      orient: "orient",
      orientation: "orientation",
      origin: "origin",
      overflow: "overflow",
      overlineposition: "overlinePosition",
      "overline-position": "overlinePosition",
      overlinethickness: "overlineThickness",
      "overline-thickness": "overlineThickness",
      paintorder: "paintOrder",
      "paint-order": "paintOrder",
      panose1: "panose1",
      "panose-1": "panose1",
      pathlength: "pathLength",
      patterncontentunits: "patternContentUnits",
      patterntransform: "patternTransform",
      patternunits: "patternUnits",
      pointerevents: "pointerEvents",
      "pointer-events": "pointerEvents",
      points: "points",
      pointsatx: "pointsAtX",
      pointsaty: "pointsAtY",
      pointsatz: "pointsAtZ",
      popover: "popover",
      popovertarget: "popoverTarget",
      popovertargetaction: "popoverTargetAction",
      prefix: "prefix",
      preservealpha: "preserveAlpha",
      preserveaspectratio: "preserveAspectRatio",
      primitiveunits: "primitiveUnits",
      property: "property",
      r: "r",
      radius: "radius",
      refx: "refX",
      refy: "refY",
      renderingintent: "renderingIntent",
      "rendering-intent": "renderingIntent",
      repeatcount: "repeatCount",
      repeatdur: "repeatDur",
      requiredextensions: "requiredExtensions",
      requiredfeatures: "requiredFeatures",
      resource: "resource",
      restart: "restart",
      result: "result",
      results: "results",
      rotate: "rotate",
      rx: "rx",
      ry: "ry",
      scale: "scale",
      security: "security",
      seed: "seed",
      shaperendering: "shapeRendering",
      "shape-rendering": "shapeRendering",
      slope: "slope",
      spacing: "spacing",
      specularconstant: "specularConstant",
      specularexponent: "specularExponent",
      speed: "speed",
      spreadmethod: "spreadMethod",
      startoffset: "startOffset",
      stddeviation: "stdDeviation",
      stemh: "stemh",
      stemv: "stemv",
      stitchtiles: "stitchTiles",
      stopcolor: "stopColor",
      "stop-color": "stopColor",
      stopopacity: "stopOpacity",
      "stop-opacity": "stopOpacity",
      strikethroughposition: "strikethroughPosition",
      "strikethrough-position": "strikethroughPosition",
      strikethroughthickness: "strikethroughThickness",
      "strikethrough-thickness": "strikethroughThickness",
      string: "string",
      stroke: "stroke",
      strokedasharray: "strokeDasharray",
      "stroke-dasharray": "strokeDasharray",
      strokedashoffset: "strokeDashoffset",
      "stroke-dashoffset": "strokeDashoffset",
      strokelinecap: "strokeLinecap",
      "stroke-linecap": "strokeLinecap",
      strokelinejoin: "strokeLinejoin",
      "stroke-linejoin": "strokeLinejoin",
      strokemiterlimit: "strokeMiterlimit",
      "stroke-miterlimit": "strokeMiterlimit",
      strokewidth: "strokeWidth",
      "stroke-width": "strokeWidth",
      strokeopacity: "strokeOpacity",
      "stroke-opacity": "strokeOpacity",
      suppresscontenteditablewarning: "suppressContentEditableWarning",
      suppresshydrationwarning: "suppressHydrationWarning",
      surfacescale: "surfaceScale",
      systemlanguage: "systemLanguage",
      tablevalues: "tableValues",
      targetx: "targetX",
      targety: "targetY",
      textanchor: "textAnchor",
      "text-anchor": "textAnchor",
      textdecoration: "textDecoration",
      "text-decoration": "textDecoration",
      textlength: "textLength",
      textrendering: "textRendering",
      "text-rendering": "textRendering",
      to: "to",
      transform: "transform",
      transformorigin: "transformOrigin",
      "transform-origin": "transformOrigin",
      typeof: "typeof",
      u1: "u1",
      u2: "u2",
      underlineposition: "underlinePosition",
      "underline-position": "underlinePosition",
      underlinethickness: "underlineThickness",
      "underline-thickness": "underlineThickness",
      unicode: "unicode",
      unicodebidi: "unicodeBidi",
      "unicode-bidi": "unicodeBidi",
      unicoderange: "unicodeRange",
      "unicode-range": "unicodeRange",
      unitsperem: "unitsPerEm",
      "units-per-em": "unitsPerEm",
      unselectable: "unselectable",
      valphabetic: "vAlphabetic",
      "v-alphabetic": "vAlphabetic",
      values: "values",
      vectoreffect: "vectorEffect",
      "vector-effect": "vectorEffect",
      version: "version",
      vertadvy: "vertAdvY",
      "vert-adv-y": "vertAdvY",
      vertoriginx: "vertOriginX",
      "vert-origin-x": "vertOriginX",
      vertoriginy: "vertOriginY",
      "vert-origin-y": "vertOriginY",
      vhanging: "vHanging",
      "v-hanging": "vHanging",
      videographic: "vIdeographic",
      "v-ideographic": "vIdeographic",
      viewbox: "viewBox",
      viewtarget: "viewTarget",
      visibility: "visibility",
      vmathematical: "vMathematical",
      "v-mathematical": "vMathematical",
      vocab: "vocab",
      widths: "widths",
      wordspacing: "wordSpacing",
      "word-spacing": "wordSpacing",
      writingmode: "writingMode",
      "writing-mode": "writingMode",
      x1: "x1",
      x2: "x2",
      x: "x",
      xchannelselector: "xChannelSelector",
      xheight: "xHeight",
      "x-height": "xHeight",
      xlinkactuate: "xlinkActuate",
      "xlink:actuate": "xlinkActuate",
      xlinkarcrole: "xlinkArcrole",
      "xlink:arcrole": "xlinkArcrole",
      xlinkhref: "xlinkHref",
      "xlink:href": "xlinkHref",
      xlinkrole: "xlinkRole",
      "xlink:role": "xlinkRole",
      xlinkshow: "xlinkShow",
      "xlink:show": "xlinkShow",
      xlinktitle: "xlinkTitle",
      "xlink:title": "xlinkTitle",
      xlinktype: "xlinkType",
      "xlink:type": "xlinkType",
      xmlbase: "xmlBase",
      "xml:base": "xmlBase",
      xmllang: "xmlLang",
      "xml:lang": "xmlLang",
      xmlns: "xmlns",
      "xml:space": "xmlSpace",
      xmlnsxlink: "xmlnsXlink",
      "xmlns:xlink": "xmlnsXlink",
      xmlspace: "xmlSpace",
      y1: "y1",
      y2: "y2",
      y: "y",
      ychannelselector: "yChannelSelector",
      z: "z",
      zoomandpan: "zoomAndPan"
    }, cm = {
      "aria-current": 0,
      "aria-description": 0,
      "aria-details": 0,
      "aria-disabled": 0,
      "aria-hidden": 0,
      "aria-invalid": 0,
      "aria-keyshortcuts": 0,
      "aria-label": 0,
      "aria-roledescription": 0,
      "aria-autocomplete": 0,
      "aria-checked": 0,
      "aria-expanded": 0,
      "aria-haspopup": 0,
      "aria-level": 0,
      "aria-modal": 0,
      "aria-multiline": 0,
      "aria-multiselectable": 0,
      "aria-orientation": 0,
      "aria-placeholder": 0,
      "aria-pressed": 0,
      "aria-readonly": 0,
      "aria-required": 0,
      "aria-selected": 0,
      "aria-sort": 0,
      "aria-valuemax": 0,
      "aria-valuemin": 0,
      "aria-valuenow": 0,
      "aria-valuetext": 0,
      "aria-atomic": 0,
      "aria-busy": 0,
      "aria-live": 0,
      "aria-relevant": 0,
      "aria-dropeffect": 0,
      "aria-grabbed": 0,
      "aria-activedescendant": 0,
      "aria-colcount": 0,
      "aria-colindex": 0,
      "aria-colspan": 0,
      "aria-controls": 0,
      "aria-describedby": 0,
      "aria-errormessage": 0,
      "aria-flowto": 0,
      "aria-labelledby": 0,
      "aria-owns": 0,
      "aria-posinset": 0,
      "aria-rowcount": 0,
      "aria-rowindex": 0,
      "aria-rowspan": 0,
      "aria-setsize": 0
    }, Ff = {}, Vd = RegExp(
      "^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), l = RegExp(
      "^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), n = !1, u = {}, c = /^on./, s = /^on[^A-Z]/, r = RegExp(
      "^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), y = RegExp(
      "^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), v = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i, g = null, z = null, Y = null, X = !1, O = !1;
    if (Kl)
      try {
        var B = {};
        Object.defineProperty(B, "passive", {
          get: function() {
            O = !0;
          }
        }), window.addEventListener("test", B, B), window.removeEventListener("test", B, B);
      } catch {
        O = !1;
      }
    var J = null, ue = null, $e = null, A = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, E = fl(A), D = se({}, A, { view: 0, detail: 0 }), V = fl(D), k, de, I, ee = se({}, D, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: rr,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (e !== I && (I && e.type === "mousemove" ? (k = e.screenX - I.screenX, de = e.screenY - I.screenY) : de = k = 0, I = e), k);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : de;
      }
    }), qt = fl(ee), Oe = se({}, ee, { dataTransfer: 0 }), Mi = fl(Oe), op = se({}, D, { relatedTarget: 0 }), sp = fl(op), oS = se({}, A, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), sS = fl(oS), rS = se({}, A, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), dS = fl(rS), hS = se({}, A, { data: 0 }), fg = fl(
      hS
    ), yS = fg, mS = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified"
    }, vS = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    }, pS = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    }, gS = se({}, D, {
      key: function(e) {
        if (e.key) {
          var t = mS[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress" ? (e = Pc(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? vS[e.keyCode] || "Unidentified" : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: rr,
      charCode: function(e) {
        return e.type === "keypress" ? Pc(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? Pc(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), SS = fl(gS), bS = se({}, ee, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0
    }), og = fl(bS), TS = se({}, D, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: rr
    }), ES = fl(TS), zS = se({}, A, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), AS = fl(zS), DS = se({}, ee, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    }), RS = fl(DS), MS = se({}, A, {
      newState: 0,
      oldState: 0
    }), OS = fl(MS), US = [9, 13, 27, 32], sg = 229, rp = Kl && "CompositionEvent" in window, fm = null;
    Kl && "documentMode" in document && (fm = document.documentMode);
    var HS = Kl && "TextEvent" in window && !fm, rg = Kl && (!rp || fm && 8 < fm && 11 >= fm), dg = 32, hg = String.fromCharCode(dg), yg = !1, Xd = !1, CS = {
      color: !0,
      date: !0,
      datetime: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0
    }, om = null, sm = null, mg = !1;
    Kl && (mg = dr("input") && (!document.documentMode || 9 < document.documentMode));
    var va = typeof Object.is == "function" ? Object.is : Mh, xS = Kl && "documentMode" in document && 11 >= document.documentMode, Qd = null, dp = null, rm = null, hp = !1, jd = {
      animationend: _i("Animation", "AnimationEnd"),
      animationiteration: _i("Animation", "AnimationIteration"),
      animationstart: _i("Animation", "AnimationStart"),
      transitionrun: _i("Transition", "TransitionRun"),
      transitionstart: _i("Transition", "TransitionStart"),
      transitioncancel: _i("Transition", "TransitionCancel"),
      transitionend: _i("Transition", "TransitionEnd")
    }, yp = {}, vg = {};
    Kl && (vg = document.createElement("div").style, "AnimationEvent" in window || (delete jd.animationend.animation, delete jd.animationiteration.animation, delete jd.animationstart.animation), "TransitionEvent" in window || delete jd.transitionend.transition);
    var pg = wi("animationend"), gg = wi("animationiteration"), Sg = wi("animationstart"), BS = wi("transitionrun"), qS = wi("transitionstart"), YS = wi("transitioncancel"), bg = wi("transitionend"), Tg = /* @__PURE__ */ new Map(), Eg = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll scrollEnd toggle touchMove waiting wheel".split(
      " "
    ), P0 = 1, dm = 2, Us = 4, Yn = [], Ld = 0, mp = 0, If = {};
    Object.freeze(If);
    var Nn = null, Zd = null, lt = 0, NS = 1, Rl = 2, Jl = 8, xu = 16, zg = 64, _d = gt.unstable_now, vp = -0, ev = -0, Ha = -1.1, Hs = -0, tv = !1, lv = !1, Bu = {
      recordUnsafeLifecycleWarnings: function() {
      },
      flushPendingUnsafeLifecycleWarnings: function() {
      },
      recordLegacyContextWarning: function() {
      },
      flushLegacyContextWarning: function() {
      },
      discardPendingWarnings: function() {
      }
    }, hm = [], ym = [], mm = [], vm = [], pm = [], gm = [], Cs = /* @__PURE__ */ new Set();
    Bu.recordUnsafeLifecycleWarnings = function(e, t) {
      Cs.has(e.type) || (typeof t.componentWillMount == "function" && t.componentWillMount.__suppressDeprecationWarning !== !0 && hm.push(e), e.mode & Jl && typeof t.UNSAFE_componentWillMount == "function" && ym.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && mm.push(e), e.mode & Jl && typeof t.UNSAFE_componentWillReceiveProps == "function" && vm.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && pm.push(e), e.mode & Jl && typeof t.UNSAFE_componentWillUpdate == "function" && gm.push(e));
    }, Bu.flushPendingUnsafeLifecycleWarnings = function() {
      var e = /* @__PURE__ */ new Set();
      0 < hm.length && (hm.forEach(function(h) {
        e.add(
          P(h) || "Component"
        ), Cs.add(h.type);
      }), hm = []);
      var t = /* @__PURE__ */ new Set();
      0 < ym.length && (ym.forEach(function(h) {
        t.add(
          P(h) || "Component"
        ), Cs.add(h.type);
      }), ym = []);
      var a = /* @__PURE__ */ new Set();
      0 < mm.length && (mm.forEach(function(h) {
        a.add(
          P(h) || "Component"
        ), Cs.add(h.type);
      }), mm = []);
      var i = /* @__PURE__ */ new Set();
      0 < vm.length && (vm.forEach(
        function(h) {
          i.add(
            P(h) || "Component"
          ), Cs.add(h.type);
        }
      ), vm = []);
      var f = /* @__PURE__ */ new Set();
      0 < pm.length && (pm.forEach(function(h) {
        f.add(
          P(h) || "Component"
        ), Cs.add(h.type);
      }), pm = []);
      var o = /* @__PURE__ */ new Set();
      if (0 < gm.length && (gm.forEach(function(h) {
        o.add(
          P(h) || "Component"
        ), Cs.add(h.type);
      }), gm = []), 0 < t.size) {
        var d = Ne(
          t
        );
        console.error(
          `Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`,
          d
        );
      }
      0 < i.size && (d = Ne(
        i
      ), console.error(
        `Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state

Please update the following components: %s`,
        d
      )), 0 < o.size && (d = Ne(
        o
      ), console.error(
        `Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`,
        d
      )), 0 < e.size && (d = Ne(e), console.warn(
        `componentWillMount has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,
        d
      )), 0 < a.size && (d = Ne(
        a
      ), console.warn(
        `componentWillReceiveProps has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,
        d
      )), 0 < f.size && (d = Ne(f), console.warn(
        `componentWillUpdate has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,
        d
      ));
    };
    var av = /* @__PURE__ */ new Map(), Ag = /* @__PURE__ */ new Set();
    Bu.recordLegacyContextWarning = function(e, t) {
      for (var a = null, i = e; i !== null; )
        i.mode & Jl && (a = i), i = i.return;
      a === null ? console.error(
        "Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue."
      ) : !Ag.has(e.type) && (i = av.get(a), e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (i === void 0 && (i = [], av.set(a, i)), i.push(e));
    }, Bu.flushLegacyContextWarning = function() {
      av.forEach(function(e) {
        if (e.length !== 0) {
          var t = e[0], a = /* @__PURE__ */ new Set();
          e.forEach(function(f) {
            a.add(P(f) || "Component"), Ag.add(f.type);
          });
          var i = Ne(a);
          $(t, function() {
            console.error(
              `Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://react.dev/link/legacy-context`,
              i
            );
          });
        }
      });
    }, Bu.discardPendingWarnings = function() {
      hm = [], ym = [], mm = [], vm = [], pm = [], gm = [], av = /* @__PURE__ */ new Map();
    };
    var pp = /* @__PURE__ */ new WeakMap(), wd = [], Kd = 0, nv = null, uv = 0, Gn = [], Vn = 0, xs = null, Bc = 1, qc = "", pa = null, Ml = null, Re = !1, Yc = !1, Xn = null, qu = null, Oi = !1, gp = Error(
      "Hydration Mismatch Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."
    ), iv = Error(
      "Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`"
    ), Dg = Error(
      "Suspense Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."
    ), Sp = {
      then: function() {
        console.error(
          'Internal React error: A listener was unexpectedly attached to a "noop" thenable. This is a bug in React. Please file an issue.'
        );
      }
    }, Sm = null, cv = !1, Rg = {
      "react-stack-bottom-frame": function(e, t, a) {
        var i = ha;
        ha = !0;
        try {
          return e(t, a);
        } finally {
          ha = i;
        }
      }
    }, bp = Rg["react-stack-bottom-frame"].bind(Rg), Mg = {
      "react-stack-bottom-frame": function(e) {
        var t = ha;
        ha = !0;
        try {
          return e.render();
        } finally {
          ha = t;
        }
      }
    }, Og = Mg["react-stack-bottom-frame"].bind(Mg), Ug = {
      "react-stack-bottom-frame": function(e, t) {
        try {
          t.componentDidMount();
        } catch (a) {
          Ue(e, e.return, a);
        }
      }
    }, Tp = Ug["react-stack-bottom-frame"].bind(Ug), Hg = {
      "react-stack-bottom-frame": function(e, t, a, i, f) {
        try {
          t.componentDidUpdate(a, i, f);
        } catch (o) {
          Ue(e, e.return, o);
        }
      }
    }, Cg = Hg["react-stack-bottom-frame"].bind(Hg), xg = {
      "react-stack-bottom-frame": function(e, t) {
        var a = t.stack;
        e.componentDidCatch(t.value, {
          componentStack: a !== null ? a : ""
        });
      }
    }, GS = xg["react-stack-bottom-frame"].bind(xg), Bg = {
      "react-stack-bottom-frame": function(e, t, a) {
        try {
          a.componentWillUnmount();
        } catch (i) {
          Ue(e, t, i);
        }
      }
    }, qg = Bg["react-stack-bottom-frame"].bind(Bg), Yg = {
      "react-stack-bottom-frame": function(e) {
        var t = e.create;
        return e = e.inst, t = t(), e.destroy = t;
      }
    }, VS = Yg["react-stack-bottom-frame"].bind(Yg), Ng = {
      "react-stack-bottom-frame": function(e, t, a) {
        try {
          a();
        } catch (i) {
          Ue(e, t, i);
        }
      }
    }, XS = Ng["react-stack-bottom-frame"].bind(Ng), Gg = {
      "react-stack-bottom-frame": function(e) {
        var t = e._init;
        return t(e._payload);
      }
    }, Pf = Gg["react-stack-bottom-frame"].bind(Gg), Jd = null, bm = 0, me = null, Ep, Vg = Ep = !1, Xg = {}, Qg = {}, jg = {};
    kt = function(e, t, a) {
      if (a !== null && typeof a == "object" && a._store && (!a._store.validated && a.key == null || a._store.validated === 2)) {
        if (typeof a._store != "object")
          throw Error(
            "React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue."
          );
        a._store.validated = 1;
        var i = P(e), f = i || "null";
        if (!Xg[f]) {
          Xg[f] = !0, a = a._owner, e = e._debugOwner;
          var o = "";
          e && typeof e.tag == "number" && (f = P(e)) && (o = `

Check the render method of \`` + f + "`."), o || i && (o = `

Check the top-level render call using <` + i + ">.");
          var d = "";
          a != null && e !== a && (i = null, typeof a.tag == "number" ? i = P(a) : typeof a.name == "string" && (i = a.name), i && (d = " It was passed a child from " + i + ".")), $(t, function() {
            console.error(
              'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
              o,
              d
            );
          });
        }
      }
    };
    var Bs = Gh(!0), Lg = Gh(!1), kd = le(null), fv = le(0), Qn = le(null), Ui = null, $d = 1, Tm = 2, nl = le(0), jn = 0, Ln = 1, ga = 2, Ol = 4, ul = 8, QS = typeof AbortController < "u" ? AbortController : function() {
      var e = [], t = this.signal = {
        aborted: !1,
        addEventListener: function(a, i) {
          e.push(i);
        }
      };
      this.abort = function() {
        t.aborted = !0, e.forEach(function(a) {
          return a();
        });
      };
    }, jS = gt.unstable_scheduleCallback, LS = gt.unstable_NormalPriority, il = {
      $$typeof: da,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
      _currentRenderer: null,
      _currentRenderer2: null
    }, Em = null, zp = 0, qs = 0, Wd = null, Zg = U.S;
    U.S = function(e, t) {
      typeof t == "object" && t !== null && typeof t.then == "function" && m0(e, t), Zg !== null && Zg(e, t);
    };
    var Ys = le(null), Fd, _g = /* @__PURE__ */ new Set(), wg = /* @__PURE__ */ new Set(), Ap = /* @__PURE__ */ new Set(), Kg = /* @__PURE__ */ new Set(), eo = 0, ce = null, _e = null, wt = null, ov = !1, Id = !1, Ns = !1, sv = 0, zm = 0, Nc = null, ZS = 0, _S = 25, H = null, Zn = null, Gc = -1, Am = !1, Dp = function() {
      return { lastEffect: null, events: null, stores: null, memoCache: null };
    }, Hi = {
      readContext: Je,
      use: nu,
      useCallback: st,
      useContext: st,
      useEffect: st,
      useImperativeHandle: st,
      useLayoutEffect: st,
      useInsertionEffect: st,
      useMemo: st,
      useReducer: st,
      useRef: st,
      useState: st,
      useDebugValue: st,
      useDeferredValue: st,
      useTransition: st,
      useSyncExternalStore: st,
      useId: st
    };
    Hi.useCacheRefresh = st, Hi.useMemoCache = st, Hi.useHostTransitionStatus = st, Hi.useFormState = st, Hi.useActionState = st, Hi.useOptimistic = st;
    var to = null, Gs = null, lo = null, Vs = null, Ca = null, Sa = null, ao = null;
    to = {
      readContext: function(e) {
        return Je(e);
      },
      use: nu,
      useCallback: function(e, t) {
        return H = "useCallback", ve(), Ii(t), Mr(e, t);
      },
      useContext: function(e) {
        return H = "useContext", ve(), Je(e);
      },
      useEffect: function(e, t) {
        return H = "useEffect", ve(), Ii(t), Iu(e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return H = "useImperativeHandle", ve(), Ii(a), df(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        H = "useInsertionEffect", ve(), Ii(t), Fu(4, ga, e, t);
      },
      useLayoutEffect: function(e, t) {
        return H = "useLayoutEffect", ve(), Ii(t), sf(e, t);
      },
      useMemo: function(e, t) {
        H = "useMemo", ve(), Ii(t);
        var a = U.H;
        U.H = Ca;
        try {
          return Or(e, t);
        } finally {
          U.H = a;
        }
      },
      useReducer: function(e, t, a) {
        H = "useReducer", ve();
        var i = U.H;
        U.H = Ca;
        try {
          return ku(e, t, a);
        } finally {
          U.H = i;
        }
      },
      useRef: function(e) {
        return H = "useRef", ve(), ac(e);
      },
      useState: function(e) {
        H = "useState", ve();
        var t = U.H;
        U.H = Ca;
        try {
          return el(e);
        } finally {
          U.H = t;
        }
      },
      useDebugValue: function() {
        H = "useDebugValue", ve();
      },
      useDeferredValue: function(e, t) {
        return H = "useDeferredValue", ve(), hf(e, t);
      },
      useTransition: function() {
        return H = "useTransition", ve(), La();
      },
      useSyncExternalStore: function(e, t, a) {
        return H = "useSyncExternalStore", ve(), jl(
          e,
          t,
          a
        );
      },
      useId: function() {
        return H = "useId", ve(), Kh();
      },
      useCacheRefresh: function() {
        return H = "useCacheRefresh", ve(), Jh();
      }
    }, to.useMemoCache = Vt, to.useHostTransitionStatus = nc, to.useFormState = function(e, t) {
      return H = "useFormState", ve(), xo(), yn(e, t);
    }, to.useActionState = function(e, t) {
      return H = "useActionState", ve(), yn(e, t);
    }, to.useOptimistic = function(e) {
      return H = "useOptimistic", ve(), Ot(e);
    }, Gs = {
      readContext: function(e) {
        return Je(e);
      },
      use: nu,
      useCallback: function(e, t) {
        return H = "useCallback", Q(), Mr(e, t);
      },
      useContext: function(e) {
        return H = "useContext", Q(), Je(e);
      },
      useEffect: function(e, t) {
        return H = "useEffect", Q(), Iu(e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return H = "useImperativeHandle", Q(), df(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        H = "useInsertionEffect", Q(), Fu(4, ga, e, t);
      },
      useLayoutEffect: function(e, t) {
        return H = "useLayoutEffect", Q(), sf(e, t);
      },
      useMemo: function(e, t) {
        H = "useMemo", Q();
        var a = U.H;
        U.H = Ca;
        try {
          return Or(e, t);
        } finally {
          U.H = a;
        }
      },
      useReducer: function(e, t, a) {
        H = "useReducer", Q();
        var i = U.H;
        U.H = Ca;
        try {
          return ku(e, t, a);
        } finally {
          U.H = i;
        }
      },
      useRef: function(e) {
        return H = "useRef", Q(), ac(e);
      },
      useState: function(e) {
        H = "useState", Q();
        var t = U.H;
        U.H = Ca;
        try {
          return el(e);
        } finally {
          U.H = t;
        }
      },
      useDebugValue: function() {
        H = "useDebugValue", Q();
      },
      useDeferredValue: function(e, t) {
        return H = "useDeferredValue", Q(), hf(e, t);
      },
      useTransition: function() {
        return H = "useTransition", Q(), La();
      },
      useSyncExternalStore: function(e, t, a) {
        return H = "useSyncExternalStore", Q(), jl(
          e,
          t,
          a
        );
      },
      useId: function() {
        return H = "useId", Q(), Kh();
      },
      useCacheRefresh: function() {
        return H = "useCacheRefresh", Q(), Jh();
      }
    }, Gs.useMemoCache = Vt, Gs.useHostTransitionStatus = nc, Gs.useFormState = function(e, t) {
      return H = "useFormState", Q(), xo(), yn(e, t);
    }, Gs.useActionState = function(e, t) {
      return H = "useActionState", Q(), yn(e, t);
    }, Gs.useOptimistic = function(e) {
      return H = "useOptimistic", Q(), Ot(e);
    }, lo = {
      readContext: function(e) {
        return Je(e);
      },
      use: nu,
      useCallback: function(e, t) {
        return H = "useCallback", Q(), mn(e, t);
      },
      useContext: function(e) {
        return H = "useContext", Q(), Je(e);
      },
      useEffect: function(e, t) {
        H = "useEffect", Q(), Ut(2048, ul, e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return H = "useImperativeHandle", Q(), Go(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        return H = "useInsertionEffect", Q(), Ut(4, ga, e, t);
      },
      useLayoutEffect: function(e, t) {
        return H = "useLayoutEffect", Q(), Ut(4, Ol, e, t);
      },
      useMemo: function(e, t) {
        H = "useMemo", Q();
        var a = U.H;
        U.H = Sa;
        try {
          return iu(e, t);
        } finally {
          U.H = a;
        }
      },
      useReducer: function(e, t, a) {
        H = "useReducer", Q();
        var i = U.H;
        U.H = Sa;
        try {
          return uu(e, t, a);
        } finally {
          U.H = i;
        }
      },
      useRef: function() {
        return H = "useRef", Q(), Me().memoizedState;
      },
      useState: function() {
        H = "useState", Q();
        var e = U.H;
        U.H = Sa;
        try {
          return uu(sl);
        } finally {
          U.H = e;
        }
      },
      useDebugValue: function() {
        H = "useDebugValue", Q();
      },
      useDeferredValue: function(e, t) {
        return H = "useDeferredValue", Q(), _h(e, t);
      },
      useTransition: function() {
        return H = "useTransition", Q(), St();
      },
      useSyncExternalStore: function(e, t, a) {
        return H = "useSyncExternalStore", Q(), rn(
          e,
          t,
          a
        );
      },
      useId: function() {
        return H = "useId", Q(), Me().memoizedState;
      },
      useCacheRefresh: function() {
        return H = "useCacheRefresh", Q(), Me().memoizedState;
      }
    }, lo.useMemoCache = Vt, lo.useHostTransitionStatus = nc, lo.useFormState = function(e) {
      return H = "useFormState", Q(), xo(), No(e);
    }, lo.useActionState = function(e) {
      return H = "useActionState", Q(), No(e);
    }, lo.useOptimistic = function(e, t) {
      return H = "useOptimistic", Q(), De(e, t);
    }, Vs = {
      readContext: function(e) {
        return Je(e);
      },
      use: nu,
      useCallback: function(e, t) {
        return H = "useCallback", Q(), mn(e, t);
      },
      useContext: function(e) {
        return H = "useContext", Q(), Je(e);
      },
      useEffect: function(e, t) {
        H = "useEffect", Q(), Ut(2048, ul, e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return H = "useImperativeHandle", Q(), Go(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        return H = "useInsertionEffect", Q(), Ut(4, ga, e, t);
      },
      useLayoutEffect: function(e, t) {
        return H = "useLayoutEffect", Q(), Ut(4, Ol, e, t);
      },
      useMemo: function(e, t) {
        H = "useMemo", Q();
        var a = U.H;
        U.H = ao;
        try {
          return iu(e, t);
        } finally {
          U.H = a;
        }
      },
      useReducer: function(e, t, a) {
        H = "useReducer", Q();
        var i = U.H;
        U.H = ao;
        try {
          return rl(e, t, a);
        } finally {
          U.H = i;
        }
      },
      useRef: function() {
        return H = "useRef", Q(), Me().memoizedState;
      },
      useState: function() {
        H = "useState", Q();
        var e = U.H;
        U.H = ao;
        try {
          return rl(sl);
        } finally {
          U.H = e;
        }
      },
      useDebugValue: function() {
        H = "useDebugValue", Q();
      },
      useDeferredValue: function(e, t) {
        return H = "useDeferredValue", Q(), Ur(e, t);
      },
      useTransition: function() {
        return H = "useTransition", Q(), Xo();
      },
      useSyncExternalStore: function(e, t, a) {
        return H = "useSyncExternalStore", Q(), rn(
          e,
          t,
          a
        );
      },
      useId: function() {
        return H = "useId", Q(), Me().memoizedState;
      },
      useCacheRefresh: function() {
        return H = "useCacheRefresh", Q(), Me().memoizedState;
      }
    }, Vs.useMemoCache = Vt, Vs.useHostTransitionStatus = nc, Vs.useFormState = function(e) {
      return H = "useFormState", Q(), xo(), tc(e);
    }, Vs.useActionState = function(e) {
      return H = "useActionState", Q(), tc(e);
    }, Vs.useOptimistic = function(e, t) {
      return H = "useOptimistic", Q(), Qa(e, t);
    }, Ca = {
      readContext: function(e) {
        return Jt(), Je(e);
      },
      use: function(e) {
        return _(), nu(e);
      },
      useCallback: function(e, t) {
        return H = "useCallback", _(), ve(), Mr(e, t);
      },
      useContext: function(e) {
        return H = "useContext", _(), ve(), Je(e);
      },
      useEffect: function(e, t) {
        return H = "useEffect", _(), ve(), Iu(e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return H = "useImperativeHandle", _(), ve(), df(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        H = "useInsertionEffect", _(), ve(), Fu(4, ga, e, t);
      },
      useLayoutEffect: function(e, t) {
        return H = "useLayoutEffect", _(), ve(), sf(e, t);
      },
      useMemo: function(e, t) {
        H = "useMemo", _(), ve();
        var a = U.H;
        U.H = Ca;
        try {
          return Or(e, t);
        } finally {
          U.H = a;
        }
      },
      useReducer: function(e, t, a) {
        H = "useReducer", _(), ve();
        var i = U.H;
        U.H = Ca;
        try {
          return ku(e, t, a);
        } finally {
          U.H = i;
        }
      },
      useRef: function(e) {
        return H = "useRef", _(), ve(), ac(e);
      },
      useState: function(e) {
        H = "useState", _(), ve();
        var t = U.H;
        U.H = Ca;
        try {
          return el(e);
        } finally {
          U.H = t;
        }
      },
      useDebugValue: function() {
        H = "useDebugValue", _(), ve();
      },
      useDeferredValue: function(e, t) {
        return H = "useDeferredValue", _(), ve(), hf(e, t);
      },
      useTransition: function() {
        return H = "useTransition", _(), ve(), La();
      },
      useSyncExternalStore: function(e, t, a) {
        return H = "useSyncExternalStore", _(), ve(), jl(
          e,
          t,
          a
        );
      },
      useId: function() {
        return H = "useId", _(), ve(), Kh();
      },
      useCacheRefresh: function() {
        return H = "useCacheRefresh", ve(), Jh();
      },
      useMemoCache: function(e) {
        return _(), Vt(e);
      }
    }, Ca.useHostTransitionStatus = nc, Ca.useFormState = function(e, t) {
      return H = "useFormState", _(), ve(), yn(e, t);
    }, Ca.useActionState = function(e, t) {
      return H = "useActionState", _(), ve(), yn(e, t);
    }, Ca.useOptimistic = function(e) {
      return H = "useOptimistic", _(), ve(), Ot(e);
    }, Sa = {
      readContext: function(e) {
        return Jt(), Je(e);
      },
      use: function(e) {
        return _(), nu(e);
      },
      useCallback: function(e, t) {
        return H = "useCallback", _(), Q(), mn(e, t);
      },
      useContext: function(e) {
        return H = "useContext", _(), Q(), Je(e);
      },
      useEffect: function(e, t) {
        H = "useEffect", _(), Q(), Ut(2048, ul, e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return H = "useImperativeHandle", _(), Q(), Go(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        return H = "useInsertionEffect", _(), Q(), Ut(4, ga, e, t);
      },
      useLayoutEffect: function(e, t) {
        return H = "useLayoutEffect", _(), Q(), Ut(4, Ol, e, t);
      },
      useMemo: function(e, t) {
        H = "useMemo", _(), Q();
        var a = U.H;
        U.H = Sa;
        try {
          return iu(e, t);
        } finally {
          U.H = a;
        }
      },
      useReducer: function(e, t, a) {
        H = "useReducer", _(), Q();
        var i = U.H;
        U.H = Sa;
        try {
          return uu(e, t, a);
        } finally {
          U.H = i;
        }
      },
      useRef: function() {
        return H = "useRef", _(), Q(), Me().memoizedState;
      },
      useState: function() {
        H = "useState", _(), Q();
        var e = U.H;
        U.H = Sa;
        try {
          return uu(sl);
        } finally {
          U.H = e;
        }
      },
      useDebugValue: function() {
        H = "useDebugValue", _(), Q();
      },
      useDeferredValue: function(e, t) {
        return H = "useDeferredValue", _(), Q(), _h(e, t);
      },
      useTransition: function() {
        return H = "useTransition", _(), Q(), St();
      },
      useSyncExternalStore: function(e, t, a) {
        return H = "useSyncExternalStore", _(), Q(), rn(
          e,
          t,
          a
        );
      },
      useId: function() {
        return H = "useId", _(), Q(), Me().memoizedState;
      },
      useCacheRefresh: function() {
        return H = "useCacheRefresh", Q(), Me().memoizedState;
      },
      useMemoCache: function(e) {
        return _(), Vt(e);
      }
    }, Sa.useHostTransitionStatus = nc, Sa.useFormState = function(e) {
      return H = "useFormState", _(), Q(), No(e);
    }, Sa.useActionState = function(e) {
      return H = "useActionState", _(), Q(), No(e);
    }, Sa.useOptimistic = function(e, t) {
      return H = "useOptimistic", _(), Q(), De(e, t);
    }, ao = {
      readContext: function(e) {
        return Jt(), Je(e);
      },
      use: function(e) {
        return _(), nu(e);
      },
      useCallback: function(e, t) {
        return H = "useCallback", _(), Q(), mn(e, t);
      },
      useContext: function(e) {
        return H = "useContext", _(), Q(), Je(e);
      },
      useEffect: function(e, t) {
        H = "useEffect", _(), Q(), Ut(2048, ul, e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return H = "useImperativeHandle", _(), Q(), Go(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        return H = "useInsertionEffect", _(), Q(), Ut(4, ga, e, t);
      },
      useLayoutEffect: function(e, t) {
        return H = "useLayoutEffect", _(), Q(), Ut(4, Ol, e, t);
      },
      useMemo: function(e, t) {
        H = "useMemo", _(), Q();
        var a = U.H;
        U.H = Sa;
        try {
          return iu(e, t);
        } finally {
          U.H = a;
        }
      },
      useReducer: function(e, t, a) {
        H = "useReducer", _(), Q();
        var i = U.H;
        U.H = Sa;
        try {
          return rl(e, t, a);
        } finally {
          U.H = i;
        }
      },
      useRef: function() {
        return H = "useRef", _(), Q(), Me().memoizedState;
      },
      useState: function() {
        H = "useState", _(), Q();
        var e = U.H;
        U.H = Sa;
        try {
          return rl(sl);
        } finally {
          U.H = e;
        }
      },
      useDebugValue: function() {
        H = "useDebugValue", _(), Q();
      },
      useDeferredValue: function(e, t) {
        return H = "useDeferredValue", _(), Q(), Ur(e, t);
      },
      useTransition: function() {
        return H = "useTransition", _(), Q(), Xo();
      },
      useSyncExternalStore: function(e, t, a) {
        return H = "useSyncExternalStore", _(), Q(), rn(
          e,
          t,
          a
        );
      },
      useId: function() {
        return H = "useId", _(), Q(), Me().memoizedState;
      },
      useCacheRefresh: function() {
        return H = "useCacheRefresh", Q(), Me().memoizedState;
      },
      useMemoCache: function(e) {
        return _(), Vt(e);
      }
    }, ao.useHostTransitionStatus = nc, ao.useFormState = function(e) {
      return H = "useFormState", _(), Q(), tc(e);
    }, ao.useActionState = function(e) {
      return H = "useActionState", _(), Q(), tc(e);
    }, ao.useOptimistic = function(e, t) {
      return H = "useOptimistic", _(), Q(), Qa(e, t);
    };
    var Jg = {}, kg = /* @__PURE__ */ new Set(), $g = /* @__PURE__ */ new Set(), Wg = /* @__PURE__ */ new Set(), Fg = /* @__PURE__ */ new Set(), Ig = /* @__PURE__ */ new Set(), Pg = /* @__PURE__ */ new Set(), e1 = /* @__PURE__ */ new Set(), t1 = /* @__PURE__ */ new Set(), l1 = /* @__PURE__ */ new Set(), a1 = /* @__PURE__ */ new Set();
    Object.freeze(Jg);
    var Rp = {
      isMounted: function(e) {
        var t = ml;
        if (t !== null && ha && t.tag === 1) {
          var a = t.stateNode;
          a._warnedAboutRefsInRender || console.error(
            "%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.",
            P(t) || "A component"
          ), a._warnedAboutRefsInRender = !0;
        }
        return (e = e._reactInternals) ? Bl(e) === e : !1;
      },
      enqueueSetState: function(e, t, a) {
        e = e._reactInternals;
        var i = El(e), f = hu(i);
        f.payload = t, a != null && (Hr(a), f.callback = a), t = yu(e, f, i), t !== null && (Qe(t, e, i), ko(t, e, i)), Yl(e, i);
      },
      enqueueReplaceState: function(e, t, a) {
        e = e._reactInternals;
        var i = El(e), f = hu(i);
        f.tag = h1, f.payload = t, a != null && (Hr(a), f.callback = a), t = yu(e, f, i), t !== null && (Qe(t, e, i), ko(t, e, i)), Yl(e, i);
      },
      enqueueForceUpdate: function(e, t) {
        e = e._reactInternals;
        var a = El(e), i = hu(a);
        i.tag = y1, t != null && (Hr(t), i.callback = t), t = yu(e, i, a), t !== null && (Qe(t, e, a), ko(t, e, a)), K !== null && typeof K.markForceUpdateScheduled == "function" && K.markForceUpdateScheduled(e, a);
      }
    }, rv = typeof reportError == "function" ? reportError : function(e) {
      if (typeof window == "object" && typeof window.ErrorEvent == "function") {
        var t = new window.ErrorEvent("error", {
          bubbles: !0,
          cancelable: !0,
          message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
          error: e
        });
        if (!window.dispatchEvent(t)) return;
      } else if (typeof process == "object" && typeof process.emit == "function") {
        process.emit("uncaughtException", e);
        return;
      }
      console.error(e);
    }, Pd = null, Mp = null, n1 = Error(
      "This is not a real error. It's an implementation detail of React's selective hydration feature. If this leaks into userspace, it's a bug in React. Please file an issue."
    ), gl = !1, u1 = {}, i1 = {}, c1 = {}, f1 = {}, eh = !1, o1 = {}, Op = {}, Up = {
      dehydrated: null,
      treeContext: null,
      retryLane: 0
    }, s1 = !1, Hp = le(null), Cp = le(null), r1 = {}, dv = null, th = null, lh = !1, d1 = 0, h1 = 1, y1 = 2, xp = 3, no = !1, m1 = !1, Bp = null, qp = !1, v1 = null;
    v1 = /* @__PURE__ */ new Set();
    var Vc = !1, Tt = !1, Yp = !1, p1 = typeof WeakSet == "function" ? WeakSet : Set, Sl = null, ah = null, nh = null, g1 = !1, Kt = null, Ia = !1, Yu = null, Dm = 8192, S1 = !1;
    try {
      var b1 = Object.preventExtensions({});
    } catch {
      S1 = !0;
    }
    var wS = {
      getCacheForType: function(e) {
        var t = Je(il), a = t.data.get(e);
        return a === void 0 && (a = e(), t.data.set(e, a)), a;
      },
      getOwner: function() {
        return ml;
      }
    };
    if (typeof Symbol == "function" && Symbol.for) {
      var Rm = Symbol.for;
      Rm("selector.component"), Rm("selector.has_pseudo_class"), Rm("selector.role"), Rm("selector.test_id"), Rm("selector.text");
    }
    var KS = [], JS = typeof WeakMap == "function" ? WeakMap : Map, Pa = 0, ba = 2, Xc = 4, Qc = 0, Mm = 1, uh = 2, Np = 3, Xs = 4, T1 = 5, hv = 6, ut = Pa, We = null, Se = null, Te = 0, xa = 0, Om = 1, Qs = 2, Um = 3, E1 = 4, Gp = 5, ih = 6, Hm = 7, Vp = 8, Fe = xa, en = null, jc = !1, ch = !1, Xp = !1, Ci = 0, Et = Qc, uo = 0, io = 0, Qp = 0, tn = 0, js = 0, Cm = null, Nu = null, yv = !1, jp = 0, z1 = 300, mv = 1 / 0, A1 = 500, xm = null, co = null, vv = !1, Ls = null, Bm = 0, Lp = 0, Zp = null, kS = 50, qm = 0, _p = null, wp = !1, pv = !1, $S = 50, Zs = 0, Ym = null, fh = !1, D1 = 0, WS = 1, FS = 2, gv = null, R1 = !1, M1 = /* @__PURE__ */ new Set(), IS = {}, Sv = null, oh = null, Kp = !1, Jp = !1, bv = !1, kp = !1, _s = 0, $p = {};
    (function() {
      for (var e = 0; e < Eg.length; e++) {
        var t = Eg[e], a = t.toLowerCase();
        t = t[0].toUpperCase() + t.slice(1), ea(a, "on" + t);
      }
      ea(pg, "onAnimationEnd"), ea(gg, "onAnimationIteration"), ea(Sg, "onAnimationStart"), ea("dblclick", "onDoubleClick"), ea("focusin", "onFocus"), ea("focusout", "onBlur"), ea(BS, "onTransitionRun"), ea(qS, "onTransitionStart"), ea(YS, "onTransitionCancel"), ea(bg, "onTransitionEnd");
    })(), un("onMouseEnter", ["mouseout", "mouseover"]), un("onMouseLeave", ["mouseout", "mouseover"]), un("onPointerEnter", ["pointerout", "pointerover"]), un("onPointerLeave", ["pointerout", "pointerover"]), Wn(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " "
      )
    ), Wn(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    ), Wn("onBeforeInput", [
      "compositionend",
      "keypress",
      "textInput",
      "paste"
    ]), Wn(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    ), Wn(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    ), Wn(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    );
    var Nm = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ), Wp = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Nm)
    ), Tv = "_reactListening" + Math.random().toString(36).slice(2), O1 = !1, U1 = !1, Ev = !1, H1 = !1, zv = !1, Av = !1, C1 = !1, Dv = {}, PS = /\r\n?/g, eb = /\u0000|\uFFFD/g, ws = "http://www.w3.org/1999/xlink", Fp = "http://www.w3.org/XML/1998/namespace", tb = "javascript:throw new Error('React form unexpectedly submitted.')", lb = "suppressHydrationWarning", Rv = "$", Mv = "/$", Ks = "$?", Js = "$!", Ip = "F!", x1 = "F", ab = "style", Lc = 0, sh = 1, Ov = 2, Pp = null, eg = null, B1 = { dialog: !0, webview: !0 }, tg = null, q1 = typeof setTimeout == "function" ? setTimeout : void 0, nb = typeof clearTimeout == "function" ? clearTimeout : void 0, lg = -1, Y1 = typeof Promise == "function" ? Promise : void 0, ub = typeof queueMicrotask == "function" ? queueMicrotask : typeof Y1 < "u" ? function(e) {
      return Y1.resolve(null).then(e).catch(Ae);
    } : q1, ks = 0, Gm = 1, N1 = 2, G1 = 3, _n = 4, wn = /* @__PURE__ */ new Map(), V1 = /* @__PURE__ */ new Set(), Zc = Ze.d;
    Ze.d = {
      f: function() {
        var e = Zc.f(), t = ua();
        return e || t;
      },
      r: function(e) {
        var t = qa(e);
        t !== null && t.tag === 5 && t.type === "form" ? cu(t) : Zc.r(e);
      },
      D: function(e) {
        Zc.D(e), Gf("dns-prefetch", e, null);
      },
      C: function(e, t) {
        Zc.C(e, t), Gf("preconnect", e, t);
      },
      L: function(e, t, a) {
        Zc.L(e, t, a);
        var i = rh;
        if (i && e && t) {
          var f = 'link[rel="preload"][as="' + Ta(t) + '"]';
          t === "image" && a && a.imageSrcSet ? (f += '[imagesrcset="' + Ta(
            a.imageSrcSet
          ) + '"]', typeof a.imageSizes == "string" && (f += '[imagesizes="' + Ta(
            a.imageSizes
          ) + '"]')) : f += '[href="' + Ta(e) + '"]';
          var o = f;
          switch (t) {
            case "style":
              o = zc(e);
              break;
            case "script":
              o = Ac(e);
          }
          wn.has(o) || (e = se(
            {
              rel: "preload",
              href: t === "image" && a && a.imageSrcSet ? void 0 : e,
              as: t
            },
            a
          ), wn.set(o, e), i.querySelector(f) !== null || t === "style" && i.querySelector(
            Bt(o)
          ) || t === "script" && i.querySelector(hs(o)) || (t = i.createElement("link"), nt(t, "link", e), Dt(t), i.head.appendChild(t)));
        }
      },
      m: function(e, t) {
        Zc.m(e, t);
        var a = rh;
        if (a && e) {
          var i = t && typeof t.as == "string" ? t.as : "script", f = 'link[rel="modulepreload"][as="' + Ta(i) + '"][href="' + Ta(e) + '"]', o = f;
          switch (i) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script":
              o = Ac(e);
          }
          if (!wn.has(o) && (e = se({ rel: "modulepreload", href: e }, t), wn.set(o, e), a.querySelector(f) === null)) {
            switch (i) {
              case "audioworklet":
              case "paintworklet":
              case "serviceworker":
              case "sharedworker":
              case "worker":
              case "script":
                if (a.querySelector(hs(o)))
                  return;
            }
            i = a.createElement("link"), nt(i, "link", e), Dt(i), a.head.appendChild(i);
          }
        }
      },
      X: function(e, t) {
        Zc.X(e, t);
        var a = rh;
        if (a && e) {
          var i = Gi(a).hoistableScripts, f = Ac(e), o = i.get(f);
          o || (o = a.querySelector(
            hs(f)
          ), o || (e = se({ src: e, async: !0 }, t), (t = wn.get(f)) && di(e, t), o = a.createElement("script"), Dt(o), nt(o, "link", e), a.head.appendChild(o)), o = {
            type: "script",
            instance: o,
            count: 1,
            state: null
          }, i.set(f, o));
        }
      },
      S: function(e, t, a) {
        Zc.S(e, t, a);
        var i = rh;
        if (i && e) {
          var f = Gi(i).hoistableStyles, o = zc(e);
          t = t || "default";
          var d = f.get(o);
          if (!d) {
            var h = { loading: ks, preload: null };
            if (d = i.querySelector(
              Bt(o)
            ))
              h.loading = Gm | _n;
            else {
              e = se(
                {
                  rel: "stylesheet",
                  href: e,
                  "data-precedence": t
                },
                a
              ), (a = wn.get(o)) && ys(e, a);
              var m = d = i.createElement("link");
              Dt(m), nt(m, "link", e), m._p = new Promise(function(p, R) {
                m.onload = p, m.onerror = R;
              }), m.addEventListener("load", function() {
                h.loading |= Gm;
              }), m.addEventListener("error", function() {
                h.loading |= N1;
              }), h.loading |= _n, Dc(d, t, i);
            }
            d = {
              type: "stylesheet",
              instance: d,
              count: 1,
              state: h
            }, f.set(o, d);
          }
        }
      },
      M: function(e, t) {
        Zc.M(e, t);
        var a = rh;
        if (a && e) {
          var i = Gi(a).hoistableScripts, f = Ac(e), o = i.get(f);
          o || (o = a.querySelector(
            hs(f)
          ), o || (e = se({ src: e, async: !0, type: "module" }, t), (t = wn.get(f)) && di(e, t), o = a.createElement("script"), Dt(o), nt(o, "link", e), a.head.appendChild(o)), o = {
            type: "script",
            instance: o,
            count: 1,
            state: null
          }, i.set(f, o));
        }
      }
    };
    var rh = typeof document > "u" ? null : document, Uv = null, Vm = null, ag = null, Hv = null, $s = Pv, Xm = {
      $$typeof: da,
      Provider: null,
      Consumer: null,
      _currentValue: $s,
      _currentValue2: $s,
      _threadCount: 0
    }, X1 = "%c%s%c ", Q1 = "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px", j1 = "", Cv = " ", L1 = Function.prototype.bind, Z1 = !1, _1 = null, w1 = null, K1 = null, J1 = null, k1 = null, $1 = null, W1 = null, F1 = null, I1 = null;
    _1 = function(e, t, a, i) {
      t = j(e, t), t !== null && (a = yt(t.memoizedState, a, 0, i), t.memoizedState = a, t.baseState = a, e.memoizedProps = se({}, e.memoizedProps), a = It(e, 2), a !== null && Qe(a, e, 2));
    }, w1 = function(e, t, a) {
      t = j(e, t), t !== null && (a = zt(t.memoizedState, a, 0), t.memoizedState = a, t.baseState = a, e.memoizedProps = se({}, e.memoizedProps), a = It(e, 2), a !== null && Qe(a, e, 2));
    }, K1 = function(e, t, a, i) {
      t = j(e, t), t !== null && (a = ct(t.memoizedState, a, i), t.memoizedState = a, t.baseState = a, e.memoizedProps = se({}, e.memoizedProps), a = It(e, 2), a !== null && Qe(a, e, 2));
    }, J1 = function(e, t, a) {
      e.pendingProps = yt(e.memoizedProps, t, 0, a), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = It(e, 2), t !== null && Qe(t, e, 2);
    }, k1 = function(e, t) {
      e.pendingProps = zt(e.memoizedProps, t, 0), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = It(e, 2), t !== null && Qe(t, e, 2);
    }, $1 = function(e, t, a) {
      e.pendingProps = ct(
        e.memoizedProps,
        t,
        a
      ), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = It(e, 2), t !== null && Qe(t, e, 2);
    }, W1 = function(e) {
      var t = It(e, 2);
      t !== null && Qe(t, e, 2);
    }, F1 = function(e) {
      bl = e;
    }, I1 = function(e) {
      kl = e;
    };
    var xv = !0, Bv = null, ng = !1, fo = null, oo = null, so = null, Qm = /* @__PURE__ */ new Map(), jm = /* @__PURE__ */ new Map(), ro = [], ib = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
      " "
    ), qv = null;
    if (Lf.prototype.render = _y.prototype.render = function(e, t) {
      var a = this._internalRoot;
      if (a === null) throw Error("Cannot update an unmounted root.");
      typeof t == "function" ? console.error(
        "does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."
      ) : ln(t) ? console.error(
        "You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root."
      ) : typeof t < "u" && console.error(
        "You passed a second argument to root.render(...) but it only accepts one argument."
      ), t = a.current;
      var i = El(t);
      Vy(
        t,
        i,
        e,
        a,
        null,
        null
      );
    }, Lf.prototype.unmount = _y.prototype.unmount = function(e) {
      if (typeof e == "function" && console.error(
        "does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."
      ), e = this._internalRoot, e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        (ut & (ba | Xc)) !== Pa && console.error(
          "Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."
        ), Q0(
          null,
          e,
          null,
          null
        ), ua(), t[Ti] = null;
      }
    }, Lf.prototype.unstable_scheduleHydration = function(e) {
      if (e) {
        var t = yo();
        e = { blockedOn: null, target: e, priority: t };
        for (var a = 0; a < ro.length && t !== 0 && t < ro[a].priority; a++) ;
        ro.splice(a, 0, e), a === 0 && yi(e);
      }
    }, function() {
      var e = Ky.version;
      if (e !== "19.0.0")
        throw Error(
          `Incompatible React versions: The "react" and "react-dom" packages must have the exact same version. Instead got:
  - react:      ` + (e + `
  - react-dom:  19.0.0
Learn more: https://react.dev/warnings/version-mismatch`)
        );
    }(), typeof Map == "function" && Map.prototype != null && typeof Map.prototype.forEach == "function" && typeof Set == "function" && Set.prototype != null && typeof Set.prototype.clear == "function" && typeof Set.prototype.forEach == "function" || console.error(
      "React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://react.dev/link/react-polyfills"
    ), Ze.findDOMNode = function(e) {
      var t = e._reactInternals;
      if (t === void 0)
        throw typeof e.render == "function" ? Error("Unable to find node on an unmounted component.") : (e = Object.keys(e).join(","), Error(
          "Argument appears to not be a ReactComponent. Keys: " + e
        ));
      return e = L(t), e = e !== null ? ae(e) : null, e = e === null ? null : e.stateNode, e;
    }, !function() {
      var e = {
        bundleType: 1,
        version: "19.0.0",
        rendererPackageName: "react-dom",
        currentDispatcherRef: U,
        findFiberByHostInstance: nn,
        reconcilerVersion: "19.0.0"
      };
      return e.overrideHookState = _1, e.overrideHookStateDeletePath = w1, e.overrideHookStateRenamePath = K1, e.overrideProps = J1, e.overridePropsDeletePath = k1, e.overridePropsRenamePath = $1, e.scheduleUpdate = W1, e.setErrorHandler = F1, e.setSuspenseHandler = I1, e.scheduleRefresh = ft, e.scheduleRoot = cl, e.setRefreshHandler = Gt, e.getCurrentFiber = Xy, e.getLaneLabelMap = $v, e.injectProfilingHooks = Fs, Ws(e);
    }() && Kl && window.top === window.self && (-1 < navigator.userAgent.indexOf("Chrome") && navigator.userAgent.indexOf("Edge") === -1 || -1 < navigator.userAgent.indexOf("Firefox"))) {
      var P1 = window.location.protocol;
      /^(https?|file):$/.test(P1) && console.info(
        "%cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools" + (P1 === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://react.dev/link/react-devtools-faq` : ""),
        "font-weight:bold"
      );
    }
    Zm.createRoot = function(e, t) {
      if (!ln(e))
        throw Error("Target container is not a DOM element.");
      wy(e);
      var a = !1, i = "", f = jo, o = Fh, d = ru, h = null;
      return t != null && (t.hydrate ? console.warn(
        "hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead."
      ) : typeof t == "object" && t !== null && t.$$typeof === mi && console.error(
        `You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`
      ), t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onUncaughtError !== void 0 && (f = t.onUncaughtError), t.onCaughtError !== void 0 && (o = t.onCaughtError), t.onRecoverableError !== void 0 && (d = t.onRecoverableError), t.unstable_transitionCallbacks !== void 0 && (h = t.unstable_transitionCallbacks)), t = Ny(
        e,
        1,
        !1,
        null,
        null,
        a,
        i,
        f,
        o,
        d,
        h,
        null
      ), e[Ti] = t.current, fd(
        e.nodeType === 8 ? e.parentNode : e
      ), new _y(t);
    }, Zm.hydrateRoot = function(e, t, a) {
      if (!ln(e))
        throw Error("Target container is not a DOM element.");
      wy(e), t === void 0 && console.error(
        "Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)"
      );
      var i = !1, f = "", o = jo, d = Fh, h = ru, m = null, p = null;
      return a != null && (a.unstable_strictMode === !0 && (i = !0), a.identifierPrefix !== void 0 && (f = a.identifierPrefix), a.onUncaughtError !== void 0 && (o = a.onUncaughtError), a.onCaughtError !== void 0 && (d = a.onCaughtError), a.onRecoverableError !== void 0 && (h = a.onRecoverableError), a.unstable_transitionCallbacks !== void 0 && (m = a.unstable_transitionCallbacks), a.formState !== void 0 && (p = a.formState)), t = Ny(
        e,
        1,
        !0,
        t,
        a ?? null,
        i,
        f,
        o,
        d,
        h,
        m,
        p
      ), t.context = Gy(null), a = t.current, i = El(a), f = hu(i), f.callback = null, yu(a, f, i), t.current.lanes = i, $t(t, i), Ja(t), e[Ti] = t.current, fd(e), new Lf(t);
    }, Zm.version = "19.0.0", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  }()), Zm;
}
function fS() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
    if (process.env.NODE_ENV !== "production")
      throw new Error("^_^");
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(fS);
    } catch (j) {
      console.error(j);
    }
  }
}
process.env.NODE_ENV === "production" ? (fS(), cg.exports = Sb()) : cg.exports = bb();
var Tb = cg.exports;
const Eb = /* @__PURE__ */ vb(Tb), zb = sb(function(yt, ct) {
  const { buttonText: x = "OK" } = yt, [zt, kl] = rb(!yt.hidden), bl = ct || db();
  hb(bl, () => ({
    hide: () => kl(!1),
    show: () => kl(!0)
  }), []);
  const we = () => {
    yt.onClose && yt.onClose(), kl(!1);
  };
  return /* @__PURE__ */ dh(fb, { children: zt && /* @__PURE__ */ ob(
    yb,
    {
      className: "py-alert-dialog",
      opened: zt,
      onClose: we,
      title: yt.title,
      children: [
        /* @__PURE__ */ dh("div", { className: "py-alert-dialog-content", children: yt.content }),
        /* @__PURE__ */ dh("div", { className: "py-alert-dialog-action", children: /* @__PURE__ */ dh(
          mb,
          {
            onClick: we,
            className: "py-alert-dialog-button py-alert-dialog-button-ok",
            children: x
          }
        ) })
      ]
    }
  ) });
}), Ob = (j, yt) => {
  const ct = yt || zb, x = Eb.createRoot(document.getElementById("PalmyraDialogRoot")), zt = () => {
    x.unmount(), j.onClose && j.onClose();
  };
  x.render(
    /* @__PURE__ */ dh(ct, { ...j, onClose: zt })
  );
}, Ub = () => /* @__PURE__ */ dh("div", { id: "PalmyraDialogRoot" });
export {
  zb as AlertDialog,
  Ub as PyDialogRoot,
  Ob as showDialog
};
