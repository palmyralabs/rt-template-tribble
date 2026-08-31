const k = (c, l, a = { ctrl: !0 }) => (t) => {
  const r = !!a.ctrl == !!t.ctrlKey, s = !!a.alt == !!t.altKey, e = !!a.shift == !!t.shiftKey, o = !!a.meta == !!t.metaKey;
  r && s && e && o && t.key.toLowerCase() === l.toLowerCase() && (t.preventDefault(), c());
};
export {
  k as handlekeyPress
};
