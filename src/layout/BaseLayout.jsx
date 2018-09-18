import React from 'react';
import { connect } from 'dva';
import { Redirect, Switch } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import DocumentTitle from 'components/DocumentTitle';
import Loading from 'components/Loading/Loading';
import Authorized from 'utils/Authorized';
import { getUserId, getAuthority } from 'utils/authority';
import { getRoutes } from '../utils/routerUtils';

const { AuthorizedRoute } = Authorized;
class BaseLayout extends React.Component {
  componentDidMount() {
    const { loading } = this.props;

    if (!loading) {
      // 当用户进入之后多次返回页面造成的bug
      // this.getUserInfo();
    }
  }
  getUserInfo = () => {
    const userId = getUserId() || null;
    this.props.dispatch({
      type: 'index/getUserInfo',
      payload: { userId },
    });
  };
  getPageTitle = () => {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let currRouterData = null;
    let title = null;
    Object.keys(routerData).forEach(key => {
      if (pathToRegexp(key).test(pathname)) {
        currRouterData = routerData[key];
      }
    });
    if (currRouterData && currRouterData.title) {
      title = `${currRouterData.title}`;
    }
    return title;
  };
  render() {
    const { loading } = this.props;
    const { routerData, match } = this.props;
    return !loading ? (
      <DocumentTitle title={this.getPageTitle()}>
        <Switch>
          {getRoutes(match.path, routerData).map(item => (
            <AuthorizedRoute
              key={item.key}
              path={item.path}
              component={item.component}
              exact={item.exact}
              authority={getAuthority}
              redirectPath="/exception/403"
            />
          ))}
          <Redirect exact from="/" to="/indexPage" />
        </Switch>
      </DocumentTitle>
    ) : (
      <Loading />
    );
  }
}

export default connect(({ index, loading }) => ({
  index,
  loading: loading.models.index,
}))(BaseLayout);
