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
    const { seriesData } = dataSource;
    const title = this.tooltipInstance.chartTitle('预测绩效分档(小组)');
    const label = this.tooltipInstance.setLabel();
    const chartOps = {
      title,
      calculable: true,
      series: [
        {
          name: 'top',
          type: 'funnel',
          width: fontSizeAuto(251),
          height: fontSizeAuto(146),
          left: fontSizeAuto(82),
          top: fontSizeAuto(109),
          sort: 'ascending',
          label,
          data: [seriesData.level1, seriesData.level2],
        },
        {
          name: 'bottom',
          type: 'funnel',
          width: fontSizeAuto(251),
          height: fontSizeAuto(146),
          left: fontSizeAuto(82),
          top: fontSizeAuto(255),
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
  handleData = () => {
    const { dataSource } = this.props;
    const seriesData = this.handleLayout(dataSource);
    this.tooltipInstance = new BarClass(dataSource);
    return this.setChartsOps({ seriesData });
  };

  render() {
    const dataSource = this.handleData();
    return dataSource ? <Bar dataSource={dataSource} width="7.1rem" height="4.5rem" /> : null;
  }
}
