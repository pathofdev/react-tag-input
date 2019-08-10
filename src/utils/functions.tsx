
export function generateUniqueKey() {
  return Math.random().toString(36).substr(2, 9);
}

export function removeLineBreaks(value: string) {
  return value.replace(/(\r\n|\n|\r)/gm, "");
}
