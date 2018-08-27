import React from 'react';
import { connect } from 'dva';
import { Redirect, Switch, Route, Link } from 'dva/router';
import { getRoutes, assignUrlParams } from '../../../utils/routerUtils';
import styles from './boss.less';

class Boss extends React.Component {
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

  render() {
    const { routerData, match } = this.props;
    //  待优化应使用正则进行匹配
    // const {pathname}=this.props.location
    // const isPandectPath=pathname==='/indexPage/boss/pandect';
    // const isMonthoyPath=pathname==='/indexPage/boss/monthly/proportion'||pathname==='/indexPage/boss/monthly/step'

    return (
      <div>
        <div className={styles.tabCOntainer}>
          <Link to="/indexPage/boss/pandect">绩效总览</Link>
          <Link to="/indexPage/boss/monthly">每月绩效</Link>
        </div>
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
            <Redirect exact from="/indexPage/boss" to="/indexPage/boss/pandect" />
          </Switch>
        </div>
      </div>
    );
  }
}
export default connect(({ loading }) => ({ loading }))(Boss);
