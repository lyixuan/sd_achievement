import React from 'react';
import { connect } from 'dva';
import { Redirect, Switch } from 'dva/router';
import { getRoutes, assignUrlParams } from 'utils/routerUtils';
import { getCurrentAuthInfo } from 'utils/decorator';
import { stringify } from 'qs';
import Authorized from 'utils/Authorized';

const { AuthorizedRoute } = Authorized;
@getCurrentAuthInfo
class HistoryIndex extends React.Component {
  constructor(props) {
    super(props);
    const { urlParams = {} } = props;
    const initState = {};
    this.state = assignUrlParams(initState, urlParams);
  }
  componentDidMount() {
    const { historyhome } = this.props;
    const { isRequestShowApi } = historyhome;
    if (!isRequestShowApi) {
      this.getShowDataState();
    }
  }
  getShowDataState = () => {
    const { month } = this.props.urlParams;
    this.props.dispatch({
      type: 'historyhome/findKpiEffectMonthByMonth',
      payload: { month },
    });
  };
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
    const { routerData, match, historyhome } = this.props;
    const { isRequestShowApi, isShowHistoryData } = historyhome;
    const redirectUrl = this.checkoutUserAuth();
    const { month } = this.props.urlParams;
    return !isRequestShowApi ? null : (
      <div>
        <Switch>
          {getRoutes(match.path, routerData).map(item => (
            <AuthorizedRoute
              key={item.key}
              path={item.path}
              component={item.component}
              exact={item.exact}
              authority={isShowHistoryData}
              redirectPath={`/counting/${month}`}
            />
          ))}
          <Redirect exact from="/history" to={redirectUrl} />
        </Switch>
      </div>
    );
  }
}
export default connect(({ historyhome, loading }) => ({
  loading: loading.models.historyhome,
  historyhome,
}))(HistoryIndex);
