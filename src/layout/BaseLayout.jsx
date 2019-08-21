import React from 'react';
import { connect } from 'dva';
import { Redirect, Switch } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import DocumentTitle from 'components/DocumentTitle';
import Loading from 'components/Loading/Loading';
import Authorized from 'utils/Authorized';
import { getUserId, getAuthority } from 'utils/authority';
import { getRoutes } from '../utils/routerUtils';
import styles from './common.less';

const { AuthorizedRoute } = Authorized;
class BaseLayout extends React.Component {
  constructor(props) {
    super(props);
    const { entrance } = this.props.urlParams;
    this.state = {
      entrance,
    };
  }
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
    if (currRouterData && currRouterData.showTitle) {
      title = currRouterData.title || '';
    }
    return title;
  };
  render() {
    const { loading } = this.props;
    const { routerData, match } = this.props;
    const { entrance } = this.state;
    return !loading ? (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
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
            {entrance && entrance === '1' ? (
              <Redirect exact from="/" to="/indexPage" />
            ) : (
              <Redirect exact from="/" to="/indexPage" />
            )}
          </Switch>
        </div>
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
