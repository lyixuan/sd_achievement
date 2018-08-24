import React from 'react';
import MultiBar from 'components/Charts/BarCharts/MultiBar';
import MultLine from 'components/Charts/LineCharts/MultLine';
import LineChartTab from 'components/SelfTab/LineChartTab';
import styles from './index.less';

/**
 * 此容器用于处理首页绩效总览页面集团总绩效的柱状图与折线图的容器,
 */
export default class PandectChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartState: 1, // 1为折现图,2是柱状图
    };
  }
  changeChartType = chartState => {
    this.setState({
      chartState,
    });
  };
  render() {
    const { dataSource = {}, children = [] } = this.props;
    const { chartState } = this.state;
    const hasData = Array.isArray(dataSource.data) && dataSource.data.length > 0;
    return !hasData ? null : (
      <div className={styles.container}>
        <span className={styles.chartTab}>
          <LineChartTab
            callBackFun={id => {
              this.changeChartType(id);
            }}
            firstId={chartState}
          />
        </span>
        {chartState === 1 && <MultLine dataSource={dataSource} />}
        {chartState === 2 && <MultiBar dataSource={dataSource} />}
        <div className={styles.content}>
          {Array.isArray(children) ? [...children] : { ...children }}
        </div>
      </div>
    );
  }
}
