// 占比柱状图
import React from 'react';
import { fontSizeAuto } from 'utils/chartUtils';
import Line from '../BaseChart/line';
import { Proportion } from './multi';

export default class SingleBar extends React.Component {
  constructor(props) {
    super(props);
    this.tooltipInstance = null;
  }
  setChartsOps = dataSource => {
    const { allMoney, xAxisData } = dataSource;
    const title = this.tooltipInstance.chartTitle();
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
      color: '#52C9C2', // 设置图例远点颜色,可跟数组
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
        name: '总绩效',
        type: 'line',
        symbol: 'circle', // 拐点样式 圆
        symbolSize: fontSizeAuto(8), // 拐点大小
        itemStyle: {
          color: '#52C9C2',
        },
        // 线段
        lineStyle: {
          color: '#52C9C2',
          width: 1,
        },
        data: allMoney,
      },
    };
    return chartOps;
  };
  setXAxis = () => {
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
      data: this.tooltipInstance.chartData.map(item => item.name),
    };
  };
  setServiesItem = data => {
    return data.map(item => ({
      value: item.val,
      itemStyle: {
        color: '#52C9C2',
        barBorderRadius: [2, 2, 0, 0], // 处理数据正副职圆角的问题
      },
    }));
  };
  //   setBaseMoney = data => {
  //     return data.map(item => ({
  //       value: item.baseMoney,
  //       itemStyle: {
  //         color: '#B68CFF',
  //         barBorderRadius: [2, 2, 0, 0], // 处理数据正副职圆角的问题
  //       },
  //     }));
  //   };
  //   setMarkMoney = data => {
  //     return data.map(item => ({
  //       value: item.markMoney,
  //       itemStyle: {
  //         color: '#FDBF41',
  //         barBorderRadius: [2, 2, 0, 0], // 处理数据正副职圆角的问题
  //       },
  //     }));
  //   };
  handleData = () => {
    const { dataSource } = this.props;
    if (!this.tooltipInstance) {
      this.tooltipInstance = new Proportion();
    }
    this.tooltipInstance.setData(dataSource);
    const { chartData } = this.tooltipInstance;

    const xAxisData = this.setXAxis(chartData);
    const allMoney = this.setServiesItem(chartData);
    // const baseMoney = this.setBaseMoney(dataSource);
    // const markMoney = this.setMarkMoney(dataSource);
    return this.setChartsOps({ allMoney, xAxisData });
  };

  render() {
    const dataSource = this.handleData();
    return dataSource ? (
      <Line dataSource={dataSource} showDefaultTip width="6.9rem" height="6.8rem" />
    ) : null;
  }
}
