
export function removeLineBreaks(value: string) {
  return value.replace(/(\r\n|\n|\r)/gm, "");
}

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

export function safeHtmlString(value: string) {
  return escapeHtml(removeLineBreaks(value));
}
