import { useRef as f, useState as d } from "react";
const v = (t, c) => {
  const s = c || f(), [n, l] = d(!1), o = () => {
    if (!n)
      return;
    s.current.saveData().then((a) => {
      t.onComplete(a);
    }).catch(r);
  }, u = () => {
    if (!n)
      return;
    s.current.saveData().then((a) => {
      t.onSave(a), s.current.setData({});
    }).catch(r);
  }, r = (e) => {
    t.onFailure(e);
  };
  return { doCancel: () => {
    t.onCancel();
  }, doSaveNew: u, doSaveClose: o, handleKeyPress: (e) => {
    e.ctrlKey && e.key === "s" && (e.preventDefault(), o());
  }, setValid: l, isValid: n, formRef: s };
};
export {
  v as useSaveForm
};
