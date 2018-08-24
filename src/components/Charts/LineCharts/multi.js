import { BarClass } from './_chartUtils';

export class Proportion extends BarClass {
  tooltipFormate = params => {
    const that = this;
    const { name } = params[0];
    const { isPredicted, baseMoney, markMoney } = this.checkoutIsPredicted(name);
    const str = `<div><span class="chart-tooltip-dateTime">${name}${
      isPredicted ? '预测' : '实发'
    }</span><br />`;
    const row1 = rowItem(params[0]);
    const row2 = isPredicted
      ? `<span style="display: inline-block">基本绩效:${' '}${that.breakNumComma(
          baseMoney
        )}元</span><br />`
      : '';
    const row3 = isPredicted
      ? `<span style="display: inline-block">打分绩效:${' '}${that.breakNumComma(
          markMoney
        )}元</span><br />`
      : '';

    function rowItem(row) {
      const { seriesName, value } = row;
      const numUnit = that.breakNumComma(value);
      return `<span style="display: inline-block">${seriesName}:${' '}${numUnit}元</span><br />`;
    }
    return `${str}${row2}${row1}${row3}</div>`;
  };
}
