const r = (t, e) => typeof t == "string" ? t : e ? t[e] : t.grid || t.view || t.edit || t.new;
export {
  r as getTitle
};
