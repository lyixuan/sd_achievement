import React from 'react';
import echarts from 'echarts';
import styles from './common.less';

export default class Bar extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.initChart();
    }, 100);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.dataSource) !== JSON.stringify(this.props.dataSource)) {
      // 接口出来后应该按照data进行判断
      this.drawChart(nextProps);
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.drawChart);
  }
  createRef = id => {
    this.ID = id;
  };
  initChart = () => {
    this.myChart = echarts.init(this.ID);
    window.addEventListener('resize', this.resize);
    this.clientWidth = document.documentElement.clientWidth;
    this.drawChart();
  };
  drawChart(nextProps = this.props) {
    const { dataSource } = nextProps;
    if (!this.myChart) {
      this.initChart();
    }
    this.myChart.clear();

    const data = Array.isArray(dataSource.series)
      ? dataSource.series[0].data
      : dataSource.series.data;
    if (this.props.showDefaultTip && data && data.length > 0) {
      setTimeout(() => {
        this.myChart.dispatchAction({
          type: 'highlight',
          dataIndex: 0,
        });
        this.myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: 0,
        });
      }, 10);
    }
    this.myChart.setOption(dataSource);
    this.myChart.resize();
  }
  resize = () => {
    if (this.clientWidth !== document.documentElement.clientWidth) {
      setTimeout(() => {
        this.drawChart();
      }, 10);
      this.clientWidth = document.documentElement.clientWidth;
    }
  };
  render() {
    const { width, height } = this.props;
    return <div ref={this.createRef} style={{ width, height }} className={styles.chartContainer} />;
  }
}
