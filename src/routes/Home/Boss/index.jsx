import React from 'react';
import { connect } from 'dva';
import { Redirect, Switch, Route } from 'dva/router';
import SelfTab from 'components/SelfTab/SelfTab';
import { getRoutes, assignUrlParams } from '../../../utils/routerUtils';
import styles from './index.less';

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
  changePage(id) {
    const { pathname } = this.props.location;
    const pathnameObj = {
      1: '/indexPage/boss/pandect',
      2: '/indexPage/boss/monthly',
    };
    if (pathname !== pathnameObj[id]) {
      this.props.setRouteUrlParams(pathnameObj[id]);
    }
  }
  checkSelectedTab = () => {
    const { pathname } = this.props.location;
    return pathname === '/indexPage/boss/pandect' ? 1 : 2;
  };

  render() {
    const { routerData, match } = this.props;
    return (
      <div>
        <div className={styles.tabContainer}>
          <SelfTab
            firstId={this.checkSelectedTab()}
            dataSource={{ data: [{ id: 1, title: '绩效总览' }, { id: 2, title: '每月绩效' }] }}
            callBackFun={obj => {
              this.changePage(obj.id);
            }}
            commonClass={styles.pandectTab}
            tabClass={styles.pandectSelectedTab}
          />
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
