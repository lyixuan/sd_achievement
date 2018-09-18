import React from 'react';
import { connect } from 'dva';
import { Redirect, Switch } from 'dva/router';
import { getRoutes, assignUrlParams } from 'utils/routerUtils';
import { getCurrentAuthInfo } from 'utils/decorator';
import { stringify } from 'qs';
import Authorized from 'utils/Authorized';
import Loading from 'components/Loading/Loading';

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
    this.getShowDataState();
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
    const { routerData, match, loading, historyhome } = this.props;
    const { isShowHistoryData } = historyhome;
    const redirectUrl = this.checkoutUserAuth();
    const { month } = this.props.urlParams;
    return (
      <div>
        {!loading ? (
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
        ) : null}
        {loading && <Loading />}
      </div>
    );
  }
}
export default connect(({ historyhome, loading }) => ({
  loading: loading.effects['historyhome/findKpiEffectMonthByMonth'],
  historyhome,
}))(HistoryIndex);
