import React from 'react';
import MonthlyChart from 'container/MonthlyChart';
import Funnel from 'components/Charts/FunnelCharts/Funnel';
import styles from './index.less';

class HistoryBoss extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeVal: '2018.07',
    };
  }

  toLevelPage = () => {
    this.props.setRouteUrlParams('/level');
  };

  render() {
    const { timeVal } = this.state;
    const aa = timeVal.split('.');
    const FunnelChartData = [
      { val: 30, type: 1 },
      { val: 10, type: 2 },
      { val: 10, type: 3 },
      { val: 70, type: 4 },
    ];
    return (
      <div>
        <p className={styles.u_pCls}>
          {aa[0]}年{aa[1]}月
        </p>
        <p className={styles.u_spanWorld}>* 实发金额以财务部税后实发为准</p>
        <MonthlyChart
          toLevelPage={() => {
            this.toLevelPage();
          }}
        >
          <Funnel dataSource={{ data: FunnelChartData, title: '预测绩效分档（家族）' }} />
        </MonthlyChart>
        <MonthlyChart
          toLevelPage={() => {
            this.toLevelPage();
          }}
        >
          <Funnel dataSource={{ data: FunnelChartData, title: '预测绩效分档（小组）' }} />
        </MonthlyChart>
      </div>
    );
  }
}
export default HistoryBoss;
