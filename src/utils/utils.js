export function formatMoney(val) {
  return parseFloat(val).toLocaleString();
}
// 数组转成对象格式
export function changeObj(res) {
  const obj = {};
  res.forEach(e => {
    obj[e.name] = e.detailResult;
  });
  return obj;
}
