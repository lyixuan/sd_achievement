// 占比柱状图
import React from 'react';
import { fontSizeAuto } from 'utils/chartUtils';
import Bar from '../BaseChart/bar';
import { Proportion } from './proportion';

export default class SingleBar extends React.Component {
  constructor(props) {
    super(props);
    this.tooltipInstance = null;
  }
  setChartsOps = dataSource => {
    const { seriesData, xAxisData } = dataSource;
    const title = this.tooltipInstance.chartTitle('集团总绩效');
    const grid = this.tooltipInstance.chartGrid();
    const chartOps = {
      tooltip: {
        ...this.tooltipInstance.tooltipStyle,
        formatter: this.tooltipInstance.tooltipFormate,
      },
      title,
      grid: {
        ...grid,
        top: fontSizeAuto(115),
      },
      // legend: {
      //   left: fontSizeAuto(279),
      //   top: fontSizeAuto(80),
      //   selectedMode: true, // 禁止点击图例
      //   itemWidth: fontSizeAuto(10),
      //   itemHeight: fontSizeAuto(10),
      //   data: [
      //     {
      //       name: `人均绩效`,
      //       icon: 'circle',
      //       textStyle: {
      //         color: '#999999',
      //         fontSize: fontSizeAuto(18),
      //       },
      //     },
      //   ],
      // },
      color: '#4A90E2', // 设置图例远点颜色,可跟数组
      xAxis: {
        ...xAxisData,
      },
      yAxis: {
        type: 'value',
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#8C8C8C',
          fontSize: fontSizeAuto(16),
          formatter: this.tooltipInstance.axisLabel,
        },
        axisLine: {
          show: false,
        },
        splitLine: {
          // 分割线
          show: true,
          lineStyle: {
            color: '#EEEEEE',
            width: 1,
          },
        },
      },
      series: {
        lineStyle: {
          color: '#4A90E2',
        },
        name: '人均绩效',
        type: 'bar',
        barWidth: fontSizeAuto(20),
        data: seriesData,
      },
    };
    return chartOps;
  };
  setXAxis = dataSource => {
    return {
      type: 'category',
      axisTick: {
        show: false,
      },
      z: 2,
      axisLabel: {
        interval: 0,
        color: '#999999',
        rotate: 45,
        // formatter: this.tooltipInstance.isPredictedStr,
        rich: {
          a: {
            color: '#50E3C2',
            fontSize: fontSizeAuto(18),
          },
        },
        fontSize: fontSizeAuto(18),
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#52C9C2',
        },
      },
      data: dataSource.map(item => item.name),
    };
  };
  handleData = () => {
    const { dataSource } = this.props;
    this.tooltipInstance = new Proportion(dataSource);
    const seriesData = [];
    dataSource.forEach(item => {
      const opsXobj = {
        value: item.val,
        itemStyle: {
          color: '#52C9C2',
          barBorderRadius: [2, 2, 0, 0], // 处理数据正副职圆角的问题
        },
        label: {
          show: true,
          color: '#333333',
          position: 'top',
          fontSize: fontSizeAuto(16),
          formatter: this.tooltipInstance.seriesLaber,
        },
      };
      seriesData.push(opsXobj);
    });
    const xAxisData = this.setXAxis(dataSource);
    return this.setChartsOps({ seriesData, xAxisData });
  };

  render() {
    const dataSource = this.handleData();
    return dataSource ? <Bar dataSource={dataSource} width="7.1rem" height="6.8rem" /> : null;
  }
}
