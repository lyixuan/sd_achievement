import React from 'react';
import MonthlyChart from 'container/MonthlyChart';
import Funnel from 'components/Charts/FunnelCharts/Funnel';
import styles from './index.less';
import SurePer from '../../../assets/surePer.png';

class HistoryBoss extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeVal: '2018.07',
      flag: 1,
    };
  }

  toLevelPage = () => {
    this.props.setRouteUrlParams('/level');
  };

  render() {
    const { timeVal, flag } = this.state;
    const aa = timeVal.split('.');
    const FunnelChartData = [
      { val: 30, type: 1 },
      { val: 10, type: 2 },
      { val: 10, type: 3 },
      { val: 70, type: 4 },
    ];
    return (
      <div>
        {flag === 1 ? (
          <div>
            <p className={styles.u_pCls}>
              {aa[0]}年{aa[1]}月
            </p>
            <p className={styles.u_spanCls}>* 实发金额以财务部税后实发为准</p>
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
        ) : (
          <div>
            <div className={styles.m_wrapcontener}>
              <div className={styles.m_imgDiv}>
                <img src={SurePer} alt="logo" className={styles.u_imgCls} />
              </div>
              <div className={styles.m_wordContent}>
                <p className={styles.u_timeCls}>
                  {aa[0]}年{aa[1] < 10 ? aa[1].slice(1) : aa[1]}月份确定绩效为
                </p>
                <p className={styles.u_resultlCls}>核算中...</p>
              </div>
            </div>
            <div className={styles.m_innercontener}>
              <span className={styles.u_spanWorld}>* 实发金额以财务部税后实发为准</span>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default HistoryBoss;
