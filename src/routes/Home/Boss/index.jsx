import React from 'react';
import { connect } from 'dva';
import { Redirect, Switch, Route } from 'dva/router';
import SelfTab from 'components/SelfTab/SelfTab';
import { timeArea } from 'utils/timeArea';
import { getCurrentAuthInfo, currentPathName } from 'utils/decorator';
import { getRoutes, assignUrlParams } from '../../../utils/routerUtils';
import styles from './index.less';

@getCurrentAuthInfo
@currentPathName
class Boss extends React.Component {
  constructor(props) {
    super(props);
    const { maxDate } = timeArea();
    const { urlParams = {} } = props;
    const initState = {
      month: maxDate,
    };
    this.state = assignUrlParams(initState, urlParams);
  }
  componentDidMount() {
    const pathname = this.checkoutUserAuthPathName(); // 检测用户权限,如果该权限不能调转到该页面的话则跳转到指定页面
    if (pathname !== '/indexPage/boss') {
      this.props.setRouteUrlParams(pathname, {});
    }
  }
  changePage(id) {
    const { pathname } = this.props.location;
    const urlParams = this.props.getUrlParams();
    const pathnameObj = {
      1: '/indexPage/boss/pandect',
      2: '/indexPage/boss/monthly',
    };
    if (pathname !== pathnameObj[id]) {
      this.props.setRouteUrlParams(pathnameObj[id], urlParams);
    }
  }
  checkSelectedTab = () => {
    const { pathname } = this.props.location;
    return pathname === '/indexPage/boss/pandect' ? 1 : 2;
  };

  render() {
    const { month } = this.state;
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
            <Redirect exact from="/indexPage/boss" to={`/indexPage/boss/pandect?month=${month}`} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default connect(({ loading }) => ({ loading }))(Boss);
