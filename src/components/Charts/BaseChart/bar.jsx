import React from 'react';
import echarts from 'echarts';
import noData from '../../../assets/nodata.png';
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
      const len = data.length;
      setTimeout(() => {
        this.myChart.dispatchAction({
          type: 'highlight',
          dataIndex: len - 1,
        });
        this.myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: len - 1,
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
  checkoutHasData = () => {
    const { dataSource } = this.props;
    const data = Array.isArray(dataSource.series)
      ? dataSource.series[0].data
      : dataSource.series.data;
    return data.length;
  };
  render() {
    const { width, height } = this.props;
    const len = this.checkoutHasData();
    return (
      <div className={styles.chartContainer}>
        <div ref={this.createRef} style={{ width, height }} />
        {len === 0 && <img src={noData} alt="nodata" className={styles.noData} />}
      </div>
    );
  }
}
