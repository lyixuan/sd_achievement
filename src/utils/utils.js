// 金钱格式化成三个一逗号
export function formatMoney(val) {
  const newValue = parseFloat(parseFloat(val || 0).toFixed(2));
  return newValue.toLocaleString();
}
// 数组转成对象格式
export function changeObj(res) {
  const obj = {};
  res.forEach(e => {
    obj[e.id] = e.detailResult;
  });
  return obj;
}
// 日期格式化-年月
export function formatDate(val) {
  const dateArr = val.split('-');
  return `${dateArr[0]}年${dateArr[1]}月`;
}
