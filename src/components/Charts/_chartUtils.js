// 根据root节点的宽度进行动态设置字体的样式
export function fontSizeAuto(fontSize = null) {
  const rootWidth = parseFloat(document.documentElement.style.fontSize);
  const nodeFontsize = rootWidth * parseFloat(fontSize) / 100;
  return Number(nodeFontsize.toFixed(2));
}
class ChartBase {
  // 数据源 [{name:'2018.08',val:10,isPredicted:0}}],   // 基类不可直接使用
  constructor(props) {
    this.chartData = props;
    this.baseBunber = 100000; // 基础定义类
  }
  chartTitle = text => {
    return {
      top: fontSizeAuto(20),
      left: fontSizeAuto(20),
      text: `${text}`, // 变动数据
      textStyle: {
        fontWeight: 400,
        color: '#444348',
        fontSize: fontSizeAuto(26),
      },
    };
  };
  chartGrid = () => {
    return {
      // 设置网格
      containLabel: true,
      top: fontSizeAuto(115),
      right: fontSizeAuto(30),
      bottom: fontSizeAuto(50),
      left: 0,
    };
  };
  tooltipNumUnit = num => {
    // 处理数据展示,如果大于10万按完展示,小于10万按千展示
    const newNum = Number(num) || 0;
    return newNum >= this.baseBunber ? `${(newNum / 10000).toFixed(2)}万` : newNum;
  };
}
export class Formatter {
  static;
}
// 此类用于处理柱状图显示问题(一根柱子)
export class TooltipFormatter extends ChartBase {
  constructor(props) {
    super(props);
    this.chartData = props;
    console.log(this);
  }
  checkoutIsPredicted = dateTime => {
    return this.chartData.find(item => item.name === dateTime);
  };
  tooltipFormate = params => {
    const { name } = params[0];
    const { isPredicted } = this.checkoutIsPredicted(name);
    let str = `<div><span class="chart-tooltip-dateTime">${name}${
      isPredicted ? '预测' : '实发'
    }</span><br />`;
    for (let i = 0; i < params.length; i += 1) {
      // 图表title名称
      const { seriesName, value } = params[i];
      const numUnit = this.tooltipNumUnit(value);
      str += `<span style="display: inline-block"><a style="width:0.08rem;height: 0.08rem;margin-right:0.1rem;color:${
        params[i].color
      }">●</a>${seriesName}:${numUnit}</span><br /></div>`;
    }
    return str;
  };
}
