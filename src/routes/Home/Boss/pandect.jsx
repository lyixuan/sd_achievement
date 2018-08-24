import React from 'react';
import { connect } from 'dva';
import { assignUrlParams } from 'utils/routerUtils';
import { getCurrentAuthInfo } from 'utils/localStorage';
import SingleBar from 'components/Charts/BarCharts/SingleBar';
import ProportionBar from 'components/Charts/BarCharts/ProportionBar';
import MultiBar from 'components/Charts/BarCharts/MultiBar';
import SingleLine from 'components/Charts/LineCharts/SingleLine';
import MultLine from 'components/Charts/LineCharts/MultLine';
import Funnel from 'components/Charts/FunnelCharts/Funnel';
import RosePie from 'components/Charts/PieCharts/RosePie';

import styles from './boss.less';

class Boss extends React.Component {
  constructor(props) {
    super(props);
    const { urlParams = {} } = props;
    const initState = {
      paramsObj: {
        startTime: null, // 过滤开始时间
      },
      chartData: [
        { val: 3, name: '2018.03', isPredicted: 0 },
        { val: 5, name: '2018.04', isPredicted: 0 },
        { val: 7, name: '2018.05', isPredicted: 0 },
        { val: 10, name: '2018.06', isPredicted: 1 },
        { val: 1, name: '2018.07', isPredicted: 1 },
      ],
      chartZhanbi: [
        { val: 30, name: '拍学院' },
        { val: 50, name: '自变量' },
        { val: 70, name: '好波' },
        { val: 10, name: '芝士' },
        { val: 30, name: '葫芦' },
      ],
      chartMulti: [
        { val: 10, name: '2018.03', isPredicted: 0, baseMoney: 0, markMoney: 0 },
        { val: 14, name: '2018.04', isPredicted: 0, baseMoney: 0, markMoney: 0 },
        { val: 15, name: '2018.05', isPredicted: 0, baseMoney: 0, markMoney: 0 },
        { val: 16, name: '2018.06', isPredicted: 1, baseMoney: 9, markMoney: 7 },
        { val: 17, name: '2018.07', isPredicted: 1, baseMoney: 10, markMoney: 7 },
      ],
      FunnelChartData: [
        { val: 30, type: 1 },
        { val: 10, type: 2 },
        { val: 10, type: 3 },
        { val: 70, type: 4 },
      ],
      pieChartData: [
        { val: 70, name: '睿博' },
        { val: 60, name: '芝士' },
        { val: 50, name: '自变量' },
        { val: 40, name: 'π学院' },
        { val: 30, name: '狐罗' },
        { val: 20, name: '泰罗' },
        { val: 10, name: '浩博' },
      ],
    };
    this.state = assignUrlParams(initState, urlParams);
  }
  checkoutUserAuth = () => {
    const currentAuthInfo = getCurrentAuthInfo() || {};
    const { groupType = null } = currentAuthInfo;
    return groupType;
  };

  render() {
    const { chartData, chartZhanbi, chartMulti, FunnelChartData, pieChartData } = this.state;
    return (
      <div>
        绩效总览页面,权限是:{this.checkoutUserAuth()}
        <div className={styles.chart}>
          <SingleBar dataSource={chartData} />
        </div>
        <div className={styles.chart}>
          <ProportionBar dataSource={chartZhanbi} />
        </div>
        <div className={styles.chart}>
          <MultiBar dataSource={chartMulti} />
        </div>
        <div className={styles.chart}>
          <SingleLine dataSource={chartMulti} />
        </div>
        <div className={styles.chart}>
          <MultLine dataSource={chartMulti} />
        </div>
        <div className={styles.chart}>
          <Funnel dataSource={FunnelChartData} />
        </div>
        <div className={styles.chart}>
          <RosePie dataSource={pieChartData} />
        </div>
      </div>
    );
  }
}
export default connect(({ loading }) => ({ loading }))(Boss);
