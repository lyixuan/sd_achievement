import React from 'react';
import { fontSizeAuto } from 'utils/chartUtils';
import Bar from '../BaseChart/bar';
import { BarClass } from './_chartUtils';

export default class SingleBar extends React.Component {
  constructor(props) {
    super(props);
    this.tooltipInstance = null;
  }
  setChartsOps = dataSource => {
    const { seriesData, chartStyle } = dataSource;
    const title = this.tooltipInstance.chartTitle('预测绩效分档(小组)');
    const label = this.tooltipInstance.setLabel();
    const chartOps = {
      title,
      calculable: true,
      series: [
        {
          name: 'top',
          type: 'funnel',
          ...chartStyle.top,
          sort: seriesData.level1.value >= seriesData.level2.value ? 'descending' : 'ascending',
          label,
          data: [seriesData.level1, seriesData.level2],
        },
        {
          name: 'bottom',
          type: 'funnel',
          sort: seriesData.level3.value >= seriesData.level4.value ? 'descending' : 'ascending',
          ...chartStyle.bottom,
          label,
          data: [seriesData.level3, seriesData.level4],
        },
      ],
    };
    return chartOps;
  };
  handleLayout = data => {
    const item1 = this.findData(data, '20k以上');
    const item2 = this.findData(data, '10k~20k');
    const item3 = this.findData(data, '5k~10k');
    const item4 = this.findData(data, '5k以下');
    return {
      level1: {
        value: item1 ? item1.val : 0,
        name: '20K以上',
        selfLabel: item1 ? item1.name : '20k以上',
        itemStyle: { color: '#B68CFF' },
      },
      level2: {
        value: item2 ? item2.val : 0,
        name: '10k ~ 20k',
        selfLabel: item2 ? item2.name : '10k~20k',
        itemStyle: { color: '#FDBF41' },
      },
      level3: {
        value: item3 ? item3.val : 0,
        name: '5k ~ 10k',
        selfLabel: item3 ? item3.name : '5k~10k',
        itemStyle: { color: '#52C9C2' },
      },
      level4: {
        value: item4 ? item4.val : 0,
        name: '5k一下',
        selfLabel: item4 ? item4.name : '5k以下',
        itemStyle: { color: '#3389FF' },
      },
    };
  };
  findData = (data, val) => {
    return data.find(item => item.name === val);
  };
  handleChartStyle = seriesData => {
    const newSeriesData = this.handleLayout(seriesData);
    const width = parseInt(fontSizeAuto(251), 10); // 设置图标的宽度
    const height = parseInt(fontSizeAuto(146), 10);
    const left = parseInt(fontSizeAuto(115), 10);

    const maxNum = Math.max.apply(null, seriesData.map(item => item.val));
    const topMax = Math.max(newSeriesData.level1.value, newSeriesData.level2.value);
    const bottomMax = Math.max(newSeriesData.level3.value, newSeriesData.level4.value);
    return {
      top: {
        height,
        left: left + (width - parseInt(topMax / maxNum * width, 10)) / 2,
        top: fontSizeAuto(109),
        width: parseInt(topMax / maxNum * width, 10),
      },
      bottom: {
        height,
        left: left + (width - parseInt(bottomMax / maxNum * width, 10)) / 2,
        top: fontSizeAuto(255),
        width: parseInt(bottomMax / maxNum * width, 10),
      },
    };
  };
  handleData = () => {
    const { dataSource } = this.props;
    if (!this.tooltipInstance) {
      this.tooltipInstance = new BarClass();
    }
    this.tooltipInstance.setData(dataSource);
    const { chartData } = this.tooltipInstance;
    const seriesData = this.handleLayout(chartData);
    const chartStyle = this.handleChartStyle(chartData);
    return this.setChartsOps({ seriesData, chartStyle });
  };

  render() {
    const { dataSource = {} } = this.props;
    const data = dataSource.data || [];
    const chartData = data.length > 0 ? this.handleData() : {};

    return data.length > 0 ? <Bar dataSource={chartData} width="6.9rem" height="4.5rem" /> : null;
  }
}
