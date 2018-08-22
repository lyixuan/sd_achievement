import React from 'react';
import { connect } from 'dva';
import { assignUrlParams } from 'utils/routerUtils';
import { getCurrentAuthInfo } from 'utils/localStorage';
import SingleBar from 'components/Charts/SingleBar';
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
    };
    this.state = assignUrlParams(initState, urlParams);
  }
  checkoutUserAuth = () => {
    const currentAuthInfo = getCurrentAuthInfo() || {};
    const { groupType = null } = currentAuthInfo;
    return groupType;
  };

  render() {
    const { chartData } = this.state;
    return (
      <div>
        绩效总览页面,权限是:{this.checkoutUserAuth()}
        <div className={styles.chart}>
          <SingleBar dataSource={chartData} />
        </div>
      </div>
    );
  }
}
export default connect(({ loading }) => ({ loading }))(Boss);
