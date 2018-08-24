import React from 'react';
import { fontSizeAuto } from 'utils/chartUtils';
import Line from '../BaseChart/line';
import { BarClass } from './_chartUtils';

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
      grid,
      legend: {
        ...this.tooltipInstance.legendStyle,
        data: [
          {
            name: `人均绩效`,
            icon: 'circle',
            textStyle: {
              color: '#999999',
              fontSize: fontSizeAuto(18),
            },
          },
        ],
      },
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
        name: '人均绩效',
        type: 'line',
        symbol: 'circle', // 拐点样式 圆
        symbolSize: fontSizeAuto(8), // 拐点大小
        itemStyle: {
          color: '#3389FF',
        },
        // 线段
        lineStyle: {
          color: '#3389FF',
          width: 1,
        },
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
        formatter: this.tooltipInstance.isPredictedStr,
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
    const seriesData = [];
    dataSource.forEach(item => {
      const opsXobj = {
        value: item.val,
        itemStyle: {
          color: '#3389FF',
          barBorderRadius: [2, 2, 0, 0], // 处理数据正副职圆角的问题
        },
      };
      seriesData.push(opsXobj);
    });
    this.tooltipInstance = new BarClass(dataSource);
    const xAxisData = this.setXAxis(dataSource);
    return this.setChartsOps({ seriesData, xAxisData });
  };

  render() {
    const dataSource = this.handleData();
    return dataSource ? <Line dataSource={dataSource} width="7.1rem" height="6.8rem" /> : null;
  }
}
