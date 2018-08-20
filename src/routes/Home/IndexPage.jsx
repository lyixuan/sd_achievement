import React from 'react';
import { connect } from 'dva';
import { Redirect, Switch, Route } from 'dva/router';
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
  componentDidMount() {}
  toDementionPage = () => {
    const { dateType, startTime, endTime } = this.state.paramsObj;
    this.props.setRouteUrlParams('/demention', { dateType, startTime, endTime });
  };
  render() {
    const { routerData, match } = this.props;
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
          <Redirect exact from="/" to="/indexPage" />
        </Switch>
      </div>
    );
  }
}
export default connect(({ loading }) => ({ loading }))(indexPage);
