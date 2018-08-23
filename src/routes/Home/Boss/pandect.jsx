import React from 'react';
import { connect } from 'dva';
import { assignUrlParams } from 'utils/routerUtils';
import { getCurrentAuthInfo } from 'utils/localStorage';
import SingleBar from 'components/Charts/BarCharts/SingleBar';
import ProportionBar from 'components/Charts/BarCharts/ProportionBar';
import MultiBar from 'components/Charts/BarCharts/MultiBar';
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
    };
    this.state = assignUrlParams(initState, urlParams);
  }
  checkoutUserAuth = () => {
    const currentAuthInfo = getCurrentAuthInfo() || {};
    const { groupType = null } = currentAuthInfo;
    return groupType;
  };

  render() {
    const { chartData, chartZhanbi, chartMulti } = this.state;
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
      </div>
    );
  }
}
export default connect(({ loading }) => ({ loading }))(Boss);
