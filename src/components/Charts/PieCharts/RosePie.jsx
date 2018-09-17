import React from 'react';
// import { fontSizeAuto } from 'utils/chartUtils';
import Bar from '../BaseChart/bar';
import { BarClass } from './_chartUtils';

export default class SingleBar extends React.Component {
  constructor(props) {
    super(props);
    this.tooltipInstance = null;
  }
  setChartsOps = dataSource => {
    const { chartData } = dataSource;
    const title = this.tooltipInstance.chartTitle('预测绩效分档(小组)');
    // const grid = this.tooltipInstance.chartGrid();
    const label = this.tooltipInstance.setLabel();
    const chartOps = {
      title,
      calculable: true,
      series: {
        name: '访问来源',
        type: 'pie',
        roseType: 'radius',
        label,
        labelLine: {
          length: 15,
          length2: 7,
          lineStyle: {
            width: 1,
          },
        },
        radius: ['10%', '55%'],
        center: ['50%', '57%'],
        data: chartData,
      },
    };
    return chartOps;
  };
  handlePieStyle = dataSource => {
    const colorArr = ['#52C9C2', '#FDBF41', '#3389FF', '#B68CFF', '#FF9F7F', '#8378EA', '#FFDB5C'];
    const chartData = dataSource.map((item, index) => ({
      value: item.val,
      name: item.name,
      id: item.id,
      itemStyle: {
        color: colorArr[index],
      },
    }));
    return chartData;
  };
  handleData = () => {
    const { dataSource } = this.props;
    if (!this.tooltipInstance) {
      this.tooltipInstance = new BarClass();
    }
    this.tooltipInstance.setData(dataSource);
    let { chartData } = this.tooltipInstance;
    chartData = this.handlePieStyle(chartData);
    return this.setChartsOps({ chartData });
  };

  render() {
    const { dataSource = {} } = this.props;
    const data = dataSource.data || [];
    const chartData = data.length > 0 ? this.handleData() : {};
    return data.length > 0 ? <Bar dataSource={chartData} width="6.9rem" height="6.5rem" /> : null;
  }
}
