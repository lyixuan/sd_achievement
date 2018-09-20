import { fontSizeAuto } from 'utils/chartUtils';
import { ChartBase } from '../BaseChart/_baseChart';

// 此类用于处理柱状图显示问题(一根柱子)
export class BarClass extends ChartBase {
  constructor(props) {
    super(props);
    this.legendStyle = {
      left: fontSizeAuto(279),
      top: fontSizeAuto(80),
      selectedMode: true, // 禁止点击图例
      itemWidth: fontSizeAuto(10),
      itemHeight: fontSizeAuto(10),
    };
  }
  tooltipFormate = params => {
    const { name, data = {} } = params;
    const { id } = data;
    const item = this.chartData.find(list => list.levelValue === id) || {};
    const str = `${name}\n`;
    const demation = `{a|${/家族/g.test(this.title) ? '家族数' : '小组数'}: ${item.levelCount ||
      0}个  占比:${item.val || 0}%}`;
    return str + demation;
  };
  setLabel = () => {
    return {
      fontSize: fontSizeAuto(18),
      formatter: this.tooltipFormate,
      lineHeight: fontSizeAuto(24),
      rich: {
        a: {
          color: '#151515',
          fontSize: fontSizeAuto(18),
        },
      },
    };
  };
}
