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
    const { name, data = [] } = params;
    const { id } = data;
    const item = this.chartData.find(list => list.id === id) || {};

    const str = `{b|${name} : ${item.val}%\n}`;
    const demation = `{a|${item.num}个家族\n${this.breakNumComma(item.companyAchievement)}元}\n`;
    return str + demation;
  };
  setLabel = () => {
    return {
      fontSize: fontSizeAuto(18),
      formatter: this.tooltipFormate,
      color: '#333',
      rich: {
        a: {
          color: '#6D6D75',
          fontSize: fontSizeAuto(18),
        },
        b: {
          color: '#333',
          fontSize: fontSizeAuto(18),
        },
      },
    };
  };
}
