import React from 'react';
import { connect } from 'dva';
import { Redirect, Switch, Route } from 'dva/router';
import { getRoutes, assignUrlParams } from 'utils/routerUtils';
import { getCurrentAuthInfo } from 'utils/decorator';
import { stringify } from 'qs';

@getCurrentAuthInfo
class HistoryIndex extends React.Component {
  constructor(props) {
    super(props);
    const { urlParams = {} } = props;
    const initState = {};
    this.state = assignUrlParams(initState, urlParams);
  }
  checkoutUserAuth = () => {
    const { groupType = null } = this.currentAuthInfo;
    const { urlParams } = this.props;
    if (groupType === 'boss' || groupType === 'college') {
      return `/history/boss?${stringify(urlParams)}`;
    } else if (groupType === 'family' || groupType === 'group' || groupType === 'class') {
      return `/history/teacher?${stringify(urlParams)}`;
    } else {
      this.props.history.push('/exception/403');
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
          <Redirect exact from="/history" to={redirectUrl} />
        </Switch>
      </div>
    );
  }
}
export default connect(({ loading }) => ({ loading }))(HistoryIndex);
