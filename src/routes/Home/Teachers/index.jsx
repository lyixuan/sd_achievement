import React from 'react';
import { connect } from 'dva';
import { Redirect, Switch, Route } from 'dva/router';
import { getRoutes, assignUrlParams } from 'utils/routerUtils';
import { getCurrentAuthInfo } from 'utils/localStorage';
import styles from './index.less';
import TimeSelect from '../../../components/TimeSelect/TimeSelect';
import ButtonFile from './_buttonFile';
import TableFile from './_tableFile';

class Boss extends React.Component {
  constructor(props) {
    super(props);
    const { urlParams = {} } = props;
    const initState = {
      paramsObj: {
        startTime: null, // 过滤开始时间
      },
      flag: 2,
      flag2: 2,
      defaultDate: '2018.09',
    };
    this.state = assignUrlParams(initState, urlParams);
  }
  checkoutUserAuth = () => {
    const currentAuthInfo = getCurrentAuthInfo() || {};
    const { groupType = null } = currentAuthInfo;
    return groupType;
  };
  render() {
    const { routerData, match } = this.props;
    // const groupType=this.checkoutUserAuth();
    //  待优化应使用正则进行匹配
    // const {pathname}=this.props.location
    // const isPandectPath=pathname==='/indexPage/boss/pandect';
    // const isMonthoyPath=pathname==='/indexPage/boss/monthly/proportion'||pathname==='/indexPage/boss/monthly/step'
    const { flag, flag2, defaultDate } = this.state;
    return (
      <div>
        <TimeSelect
          style={{ marginBottom: '0.22rem' }}
          defaultDate={defaultDate}
          onChange={item => {
            this.setState({ defaultDate: item.id });
          }}
        />

        <div className={styles.m_performanceContener}>
          <span className={styles.u_totalNum}>1,500,000元</span>
          <div className={styles.m_performanceMoney}>
            <div className={styles.u_basicMoney}>
              <div className={styles.u_contentDiv}>
                <span className={styles.u_spanMoney}>1,000,000</span>
                <br />
                <span className={styles.u_spanBasic}>基本绩效</span>
              </div>
            </div>
            <div className={styles.u_splitLine} />
            <div className={styles.u_scoreMoney}>
              <div className={styles.u_contentDiv}>
                <span className={styles.u_spanMoney}>500,000</span>
                <br />
                <span className={styles.u_spanBasic}>打分绩效</span>
              </div>
            </div>
          </div>
          <div style={{ height: '0.2rem', width: '100%' }} />
        </div>

        <div className={styles.m_warningP}>
          <p className={styles.u_pContent}>
            *预估绩效每天与小德学分同步更新；学院打分绩效为浮动绩效，月底根据本月工作表现确定实发绩效
          </p>
        </div>

        <div className={styles.m_titile}>
          <span className={styles.u_spanTitle}>预测绩效计算 | </span>
          <span className={styles.u_spanTitle}>英语1组</span>
        </div>
        <ButtonFile
          flag2={flag2}
          flag={flag}
          changeFlag={item => {
            this.setState({ flag2: item.id });
          }}
        />
        <TableFile flag2={flag2} flag={flag} />
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
            <Redirect exact from="/indexPage/teacher" to="/indexPage/teacher/group" />
          </Switch>
        </div>
      </div>
    );
  }
}
export default connect(({ loading }) => ({ loading }))(Boss);
