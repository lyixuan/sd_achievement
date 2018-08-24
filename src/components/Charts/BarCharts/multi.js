import { BarClass } from './_chartUtils';

export class Proportion extends BarClass {
  tooltipFormate = params => {
    const that = this;
    const { name } = params[0];
    const { isPredicted } = this.checkoutIsPredicted(name);
    const str = `<div><span class="chart-tooltip-dateTime">${name}${
      isPredicted ? '预测' : '实发'
    }</span><br />`;
    const row1 = isPredicted ? rowItem(params[0]) : '';
    const row2 = rowItem(params[1]);
    const row3 = isPredicted ? rowItem(params[2]) : '';

    function rowItem(row) {
      const { seriesName, value } = row;
      const numUnit = that.breakNumComma(value);
      return `<span style="display: inline-block"><a style="width:0.08rem;height: 0.08rem;margin-right:0.1rem;color:${
        row.color
      }">●</a>${seriesName}:${' '}${numUnit}元</span><br />`;
    }
    return `${str}${row2}${row1}${row3}</div>`;
  };
}
