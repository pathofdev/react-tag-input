
// TAKEN FROM - https://github.com/janl/mustache.js/blob/master/mustache.js#L55
const htmlEntityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;",
  "`": "&#x60;",
  "=": "&#x3D;",
};
export function escapeHtml(value: string) {
  return String(value).replace(/[&<>"'`=\/]/g, (s) => {
    // @ts-ignore
    return htmlEntityMap[s];
  });
}

export function generateUniqueKey() {
  return Math.random().toString(36).substr(2, 9);
}

export function removeLineBreaks(value: string) {
  return value.replace(/(\r\n|\n|\r)/gm, "");
}

export function safeInputText(value: string) {
  value = escapeHtml(value);
  return removeLineBreaks(value);
}
