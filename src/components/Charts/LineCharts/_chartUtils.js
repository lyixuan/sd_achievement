import { fontSizeAuto } from 'utils/chartUtils';
import { ChartBase } from '../BaseChart/_baseChart';

// 此类用于处理柱状图显示问题(一根柱子)
export class BarClass extends ChartBase {
  constructor(props) {
    super(props);
    this.tooltipStyle = {
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,0.6)',
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: '#DADADA',
        },
        label: {
          show: false,
        },
      },
      textStyle: {
        fontSize: fontSizeAuto(16),
        color: '#FFFFFF',
      },
    };
    this.legendStyle = {
      left: fontSizeAuto(279),
      top: fontSizeAuto(80),
      selectedMode: true, // 禁止点击图例
      itemWidth: fontSizeAuto(10),
      itemHeight: fontSizeAuto(10),
    };
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
      const numUnit = this.breakNumComma(value);
      str += `<span style="display: inline-block"><a style="width:0.08rem;height: 0.08rem;margin-right:0.1rem;color:${
        params[i].color
      }">●</a>${seriesName}:${' '}${numUnit}元</span><br /></div>`;
    }
    return str;
  };
  isPredictedStr = name => {
    const { isPredicted } = this.checkoutIsPredicted(name);
    return isPredicted ? `{a|${name}\n预测}` : `${name}\n实发`;
  };
  axisLabel = value => {
    return `${value}K`;
  };
}
