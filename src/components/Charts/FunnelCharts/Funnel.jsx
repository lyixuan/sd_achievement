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
    return {
      level1: {
        value: data[0].val,
        name: '20K以上',
        itemStyle: { color: '#B68CFF' },
      },
      level2: {
        value: data[1].val,
        name: '10k ~ 20k',
        itemStyle: { color: '#FDBF41' },
      },
      level3: {
        value: data[2].val,
        name: '5k ~ 10k',
        itemStyle: { color: '#52C9C2' },
      },
      level4: {
        value: data[3].val,
        name: '5k一下',
        itemStyle: { color: '#3389FF' },
      },
    };
  };
  handleChartStyle = seriesData => {
    const width = parseInt(fontSizeAuto(251), 10); // 设置图标的宽度
    const height = parseInt(fontSizeAuto(146), 10);
    const left = parseInt(fontSizeAuto(115), 10);

    const maxNum = Math.max.apply(null, seriesData.map(item => item.val));
    const topMax = Math.max.apply(null, seriesData.map((item, index) => index < 2 && item.val));
    const bottomMax = Math.max.apply(null, seriesData.map((item, index) => index >= 2 && item.val));
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
    this.tooltipInstance = new BarClass({ dataSource });
    const { chartData } = this.tooltipInstance;
    const seriesData = this.handleLayout(chartData);
    const chartStyle = this.handleChartStyle(chartData);
    return this.setChartsOps({ seriesData, chartStyle });
  };

  render() {
    const dataSource = this.handleData();
    return dataSource ? <Bar dataSource={dataSource} width="6.9rem" height="4.5rem" /> : null;
  }
}
