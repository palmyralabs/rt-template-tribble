const e = (r, t) => {
  if (r)
    return typeof r == "string" ? r : t ? r[t] : r.grid || r.view || r.edit || r.new;
};
export {
  e as getTitle
};
