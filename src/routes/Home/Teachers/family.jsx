import React from 'react';
import { connect } from 'dva';
import { assignUrlParams } from '../../../utils/routerUtils';
import { getCurrentAuthInfo } from '../../../utils/localStorage';

class Boss extends React.Component {
  constructor(props) {
    super(props);
    const { urlParams = {} } = props;
    const initState = {
      paramsObj: {
        startTime: null, // 过滤开始时间
      },
    };
    this.state = assignUrlParams(initState, urlParams);
  }
  checkoutUserAuth = () => {
    const currentAuthInfo = getCurrentAuthInfo() || {};
    const { groupType = null } = currentAuthInfo;
    return groupType;
  };

  render() {
    return <div>家族长首页,权限是:{this.checkoutUserAuth()}</div>;
  }
}
export default connect(({ loading }) => ({ loading }))(Boss);
