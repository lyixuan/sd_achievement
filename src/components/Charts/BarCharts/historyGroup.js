import { BarClass } from './_chartUtils';

export class Proportion extends BarClass {
  seriesLaber = params => {
    const { value } = params;
    return `${value}元`;
  };
  axisLabel = value => {
    return `${value}元`;
  };
}
