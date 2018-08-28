import React from 'react';
import { connect } from 'dva';
import { Redirect, Switch, Route } from 'dva/router';
import { getCurrentAuthInfo } from 'utils/localStorage';
import { getRoutes, assignUrlParams } from '../../utils/routerUtils';

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
  checkoutUserAuth = () => {
    const currentAuthInfo = getCurrentAuthInfo() || {};
    const { groupType = null } = currentAuthInfo;
    if (groupType === 'boss' || groupType === 'college') {
      return '/indexPage/boss';
    } else if (groupType === 'family' || groupType === 'group' || groupType === 'class') {
      return '/indexPage/teacher';
    }
  };
  render() {
    const { routerData, match } = this.props;
    const redirectUrl = this.checkoutUserAuth();
    return (
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
      </div>
    );
  }
}
export default connect(({ loading }) => ({ loading }))(indexPage);
