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
    const { name, value } = params[0];
    const str = `<div><span style="display: inline-block"><a style="width:0.08rem;height: 0.08rem;margin-right:0.1rem;color:${
      params[0].color
    }">●</a>${name}: ${value}%</span><br />`;
    const secondRow = '小组数 5  小组绩效: 10000元';
    return str + secondRow;
  };
}
