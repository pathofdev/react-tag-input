
export function removeLineBreaks(value: string) {
  return value.replace(/(\r\n|\n|\r)/gm, "");
}
