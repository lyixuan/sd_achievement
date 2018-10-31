import React from 'react';
import { connect } from 'dva';
import { Redirect, Switch } from 'dva/router';
import { getCurrentAuthInfo } from 'utils/decorator';
import Authorized from 'utils/Authorized';
import { getRoutes, assignUrlParams, checkoutAuthUrl } from '../../utils/routerUtils';
import SwitchDialog from '../../container/IDSwitchDialog/index';

const { AuthorizedRoute } = Authorized;
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
  // checkoutUserAuth = () => {
  //   const { groupType = null, isKpi } = this.currentAuthInfo();
  //   if (!isKpi) {
  //     return '/exception/403';
  //   }
  //   if (groupType === 'boss' || groupType === 'college') {
  //     return '/indexPage/boss';
  //   } else if (groupType === 'family' || groupType === 'group' || groupType === 'class') {
  //     return '/indexPage/teacher';
  //   } else {
  //     return '/exception/403';
  //   }
  // };
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
    const urlParams = this.props.getUrlParams();
    const { month = '' } = urlParams;
    this.props.dispatch({
      type: 'index/fetchKpiUserInfoByMonth',
      payload: { currentAuthInfo: selectedAuth, month },
    });
  };
  render() {
    const { routerData, match } = this.props;
    const redirectUrl = checkoutAuthUrl();
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
          <Redirect exact from="/indexPage" to={redirectUrl} />
        </Switch>
        {/* boss - 切换身份 */}
        {<SwitchDialog toIndexPage={this.toIndexPage} />}
      </div>
    );
  }
}
export default connect(({ loading }) => ({ loading }))(indexPage);
