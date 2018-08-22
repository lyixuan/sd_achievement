import React from 'react';
import Bar from './BaseChart/bar';
import { fontSizeAuto, Formatter } from './_chartUtils';

export default class SingleBar extends React.Component {
  setChartsOps = dataSource => {
    const { seriesData, xAxisData } = dataSource;
    const chartOps = {
      tooltip: {
        ...this.setTooltip(),
      },
      title: {
        top: fontSizeAuto(20),
        left: fontSizeAuto(20),
        text: '集团总绩效', // 变动数据
        textStyle: {
          fontWeight: 400,
          color: '#444348',
          fontSize: fontSizeAuto(26),
        },
      },
      legend: {
        left: fontSizeAuto(279),
        top: fontSizeAuto(80),
        selectedMode: true, // 禁止点击图例
        itemWidth: fontSizeAuto(10),
        itemHeight: fontSizeAuto(10),
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
      grid: {
        containLabel: true, // 此属性用于设置名字太长显示不全
        left: fontSizeAuto(20),
        top: fontSizeAuto(160),
        right: fontSizeAuto(20),
        bottom: fontSizeAuto(30),
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
        formatter: (value, index) => Formatter.isPredictedStr(value, index, dataSource),
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
  setTooltip = () => {
    return {
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,0.6)',
      formatter: Formatter.tooltipFormate,
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: '#DADADA',
        },
        label: {
          show: false,
        },
      },
      textStyle: {
        fontSize: fontSizeAuto(16),
        color: '#FFFFFF',
      },
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
    const xAxisData = this.setXAxis(dataSource);
    return this.setChartsOps({ seriesData, xAxisData });
  };

  render() {
    const dataSource = this.handleData();
    console.log(dataSource);
    return dataSource ? <Bar dataSource={dataSource} width="7.1rem" height="6rem" /> : null;
  }
}
