// 根据root节点的宽度进行动态设置字体的样式
export function fontSizeAuto(fontSize = null) {
  const rootWidth = parseFloat(document.documentElement.style.fontSize);
  const nodeFontsize = rootWidth * parseFloat(fontSize) / 100;
  return Number(nodeFontsize.toFixed(2));
}
export class Formatter {
  static isPredictedStr = (value, index, dataSource) => {
    // 此方法用于处理横坐标预测与label的显示,根据数据源进行处理
    const { isPredicted } = dataSource[index];
    return isPredicted ? `{a|${value}\n预测}` : `${value}\n实发`;
  };
  static tooltipFormate = params => {
    // x轴名称
    const { name } = params[0];
    let str = `${name}<br />`;
    for (let i = 0; i < params.length; i += 1) {
      // 图表title名称
      const { seriesName, value } = params[i];
      str += `<span style="display: inline-block;margin-top: 0.08rem"><a style="width:0.09rem;height: 0.09rem;margin-right:0.1rem;color:${
        params[i].color
      }">●</a>${seriesName}:${' '}${value || 0}</span><br />`;
    }
    return str;
  };
}
