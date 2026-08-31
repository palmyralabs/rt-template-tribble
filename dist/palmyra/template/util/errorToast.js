import { topic as m } from "@palmyralabs/ts-utils";
const y = "palmyra/api-error", d = (t) => t ? typeof t == "string" ? t : t.body?.message ? String(t.body.message) : t.message && typeof t.message == "string" ? t.message : t.status ? `Request failed (HTTP ${t.status})` : "Request failed" : "Unknown error", h = (t = {}) => {
  const {
    notify: c,
    publishTopic: f = !0,
    ignoreStatuses: l = [],
    dedupeMs: g = 3e3,
    formatMessage: p = d
  } = t, n = /* @__PURE__ */ new Map();
  return (R) => (e) => {
    const s = e?.status ?? e?.response?.status;
    if (s != null && l.includes(s)) return !1;
    const r = p(e), o = Date.now(), u = `${s ?? "-"}::${r}`, a = n.get(u);
    if (a && o - a < g) return !1;
    n.set(u, o);
    const i = { status: s, message: r, raw: e };
    try {
      c?.(i);
    } catch {
    }
    if (f)
      try {
        m.publish(y, i);
      } catch {
      }
    return !1;
  };
};
export {
  y as API_ERROR_TOPIC,
  h as createErrorHandlerFactory
};
