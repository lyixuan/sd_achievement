import React from 'react';
import { connect } from 'dva';
import { assignUrlParams } from '../../../utils/routerUtils';
import { getCurrentAuthInfo } from '../../../utils/localStorage';
import LineChartTab from '../../../components/SelfTab/LineChartTab';
import PerformanceTab from '../../../components/SelfTab/PerformanceTab';

class Boss extends React.Component {
  constructor(props) {
    super(props);
    const { urlParams = {} } = props;
    const initState = {
      paramsObj: {
        startTime: null, // 过滤开始时间
      },
      flag: 1,
      flag2: 1,
    };
    this.state = assignUrlParams(initState, urlParams);
  }
  checkoutUserAuth = () => {
    const currentAuthInfo = getCurrentAuthInfo() || {};
    const { groupType = null } = currentAuthInfo;
    return groupType;
  };

  render() {
    return (
      <div>
        <span>家族长首页,权限是:{this.checkoutUserAuth()}</span>
        <div style={{ marginTop: '1rem' }}>
          <LineChartTab
            firstId={this.state.flag}
            callBackFun={id => {
              this.setState({ flag: id });
            }}
          />
        </div>
        <div style={{ marginTop: '2rem' }}>
          <PerformanceTab
            firstId={this.state.flag2}
            callBackFun={id => {
              this.setState({ flag2: id });
            }}
          />
        </div>
      </div>
    );
  }
}
export default connect(({ loading }) => ({ loading }))(Boss);
