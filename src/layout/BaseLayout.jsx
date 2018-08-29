import React from 'react';
import { Redirect, Switch, Route } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import DocumentTitle from 'components/DocumentTitle';
import { getRoutes } from '../utils/routerUtils';

class BaseLayout extends React.Component {
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
    const { routerData, match } = this.props;
    return (
      <DocumentTitle title={this.getPageTitle()}>
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
          <Redirect exact from="/" to="/indexPage" />
        </Switch>
      </DocumentTitle>
    );
  }
}

export default BaseLayout;
