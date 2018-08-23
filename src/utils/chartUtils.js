export function fontSizeAuto(fontSize = null) {
  const rootWidth = parseFloat(document.documentElement.style.fontSize);
  const nodeFontsize = rootWidth * parseFloat(fontSize) / 100;
  return Number(nodeFontsize.toFixed(2));
}
