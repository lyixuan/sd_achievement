import React from 'react';
// import { connect } from 'dva';
import { Redirect, Switch, Route } from 'dva/router';
import DatePanle from 'container/DatePanle';
import { getRoutes, assignUrlParams } from 'utils/routerUtils';
import styles from './index.less';
import ButtonFile from './_buttonFile';
import TableFile from './_tableFile';

class Teacher extends React.Component {
  constructor(props) {
    super(props);
    const { urlParams = {} } = props;
    const initState = {
      paramsObj: {
        startTime: null, // 过滤开始时间
      },
      flag: 2, // 判断是运营长还是家族长
      flag2: 1, // tab切换标记
      dateTime: '2018.08',
    };
    this.state = assignUrlParams(initState, urlParams);
  }
  onDateChange = date => {
    this.setState({
      dateTime: date,
    });
  };
  render() {
    const { routerData, match } = this.props;
    const { flag, flag2, dateTime } = this.state;
    return (
      <div>
        <DatePanle
          defaultDate={dateTime}
          onChange={date => {
            this.onDateChange(date);
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
export default Teacher;
// connect(({ loading }) => ({ loading }))(Boss);
