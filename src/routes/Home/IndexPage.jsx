import React from 'react';
import { connect } from 'dva';
import { Redirect, Switch, Route } from 'dva/router';
import { getCurrentAuthInfo } from 'utils/decorator';
import { getRoutes, assignUrlParams } from '../../utils/routerUtils';
import SwitchDialog from '../../container/IDSwitchDialog/index';

@getCurrentAuthInfo
class indexPage extends React.Component {
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
  // componentDidMount(){
  //   this.getAuthList();
  // }
  checkoutUserAuth = () => {
    const { groupType = null, isKpi } = this.currentAuthInfo;
    if (isKpi) {
      this.props.history.push('/exception/403');
    }
    if (groupType === 'boss' || groupType === 'college') {
      return '/indexPage/boss';
    } else if (groupType === 'family' || groupType === 'group' || groupType === 'class') {
      return '/indexPage/teacher';
    } else {
      this.props.history.push('/exception/403');
    }
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
  toIndexPage = () => {
    this.props.setRouteUrlParams('/', {});
  };
  render() {
    const { routerData, match } = this.props;
    const redirectUrl = this.checkoutUserAuth();
    const isLoginSuccess = this.checkLoginSuccess();
    return !isLoginSuccess ? null : (
      <div>
        <Switch>
          {getRoutes(match.path, routerData).map(item => (
            <Route
              key={item.key}
              path={item.path}
              component={item.component}
              exact={item.exact}
              authority={item.authority}
              redirectPath="/exception/403"
            />
          ))}
          <Redirect exact from="/indexPage" to={redirectUrl} />
        </Switch>
        {/* boss - 切换身份 */}
        {<SwitchDialog toIndexPage={this.toIndexPage} />}
      </div>
    );
  }
}
export default connect(({ loading }) => ({ loading }))(indexPage);
