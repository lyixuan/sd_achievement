import { BarClass } from './_chartUtils';

export class Proportion extends BarClass {
  seriesLaber = params => {
    const { value } = params;
    return `${value}%`;
  };
  axisLabel = value => {
    return `${value}%`;
  };
  tooltipFormate = params => {
    const { name, value, data = [] } = params[0];
    const { id } = data;
    const selectedObj = this.chartData.find(item => item.id === id) || {};
    const str = `<div><span style="display: inline-block"><a style="width:0.08rem;height: 0.08rem;margin-right:0.1rem;color:${
      params[0].color
    }">●</a>${name}: ${value}%</span><br />`;
    const secondRow = `小组数 ${selectedObj.num || 0}  小组绩效: ${this.breakNumComma(
      selectedObj.collegeAchievement
    ) || 0}元`;
    return str + secondRow;
  };
}
