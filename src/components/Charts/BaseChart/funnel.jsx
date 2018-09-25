import React from 'react';
import echarts from 'echarts';
import styles from './common.less';
import noData from '../../../assets/nodata.png';

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
  checkoutHasData = () => {
    const { dataSource } = this.props;
    const series = dataSource.series || [];
    if (!Array.isArray(series)) {
      console.warn('数据类型错误');
    }
    return series.length;
  };
  render() {
    const { width, height, isLoading = false } = this.props;
    const len = this.checkoutHasData();
    return (
      <div className={styles.chartContainer}>
        <div ref={this.createRef} style={{ width, height }} />
        {len === 0 && !isLoading && <img src={noData} alt="nodata" className={styles.noData} />}
      </div>
    );
  }
}
