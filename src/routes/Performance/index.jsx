import React from 'react';
import { connect } from 'dva';
import { Redirect, Switch } from 'dva/router';
import { getCurrentAuthInfo, getCurrentMonth } from 'utils/decorator';
import Authorized from 'utils/Authorized';
import SwitchDialog from '../../container/IDSwitchDialog/index';
import { getRoutes, assignUrlParams, checkoutAuthUrlPerformance } from '../../utils/routerUtils';

const { AuthorizedRoute } = Authorized;
@getCurrentAuthInfo
@getCurrentMonth
class Performance extends React.Component {
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

  componentDidMount() {
    this.getDateRangeData();
  }
  getDateRangeData = () => {
    this.props.dispatch({
      type: 'performance/getDateRangeData',
    });
  };
  checkLoginSuccess = () => {
    // 判断是否登录成功;
    const currentAuthInfo = getCurrentAuthInfo();
    const { groupType = null } = currentAuthInfo;
    if (groupType) {
      return true;
    } else {
      return false;
    }
  };
  // 切换身份，点击确定，调取接口
  toIndexPage = (selectedAuth = {}) => {
    const month = this.currentMonth();
    this.props.dispatch({
      type: 'index/fetchKpiUserInfoPerformance',
      payload: { currentAuthInfo: selectedAuth, month },
    });
  };
  render() {
    const { routerData, match } = this.props;
    const redirectUrl = checkoutAuthUrlPerformance();
    const isLoginSuccess = this.checkLoginSuccess();
    return !isLoginSuccess ? null : (
      <div>
        <Switch>
          {getRoutes(match.path, routerData).map(item => (
            <AuthorizedRoute
              key={item.key}
              path={item.path}
              component={item.component}
              exact={item.exact}
              authority={item.authority}
              redirectPath="/exception/403"
            />
          ))}
          <Redirect exact from="/performance" to={redirectUrl} />
        </Switch>
        {/* boss - 切换身份 */}
        {<SwitchDialog toIndexPage={this.toIndexPage} />}
      </div>
    );
  }
}
export default connect(({ performance, loading }) => ({
  performance,
  isloading: loading.models.performance,
}))(Performance);
