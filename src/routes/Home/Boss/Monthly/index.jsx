import React from 'react';
import { connect } from 'dva';
import { assignUrlParams } from 'utils/routerUtils';
import DatePanle from 'container/DatePanle';
import PerformanceTab from 'components/SelfTab/PerformanceTab';
import Loading from 'components/Loading/Loading';
import { getCurrentAuthInfo, currentPathName, getCurrentMonth } from 'utils/decorator';
import Proportion from './proportion';
import Step from './step';
import styles from './index.less';

@getCurrentAuthInfo
@currentPathName
@getCurrentMonth
class BossMothly extends React.Component {
  constructor(props) {
    super(props);
    const { groupType = null } = this.currentAuthInfo();
    // const { maxDate } = timeArea();
    const { urlParams = {} } = props;
    const initState = {
      // dateTime: maxDate,
      month: this.currentMonth(),
      monthlyType: 'step', // 默认绩效分档
      isShowTab: groupType === 'boss', // 是否显示切换分档和占比按钮
    };
    this.state = assignUrlParams(initState, urlParams);
  }
  componentDidMount() {
    const pathname = this.checkoutUserAuthPathName(); // 检测用户权限,如果该权限不能调转到该页面的话则跳转到指定页面

    if (pathname === '/indexPage/boss') {
      this.getData();
    } else {
      this.props.setRouteUrlParams(pathname, {});
    }
  }
  onChangeTab = id => {
    const typeObj = {
      1: 'step',
      2: 'proportion',
    };
    const monthlyType = typeObj[id];
    this.saveParams({ monthlyType });
    this.getData({ monthlyType });
  };
  onDateChange = month => {
    const currentAuthInfo = this.currentAuthInfo();
    const userId = currentAuthInfo.loginUserId;
    const { id } = currentAuthInfo;
    this.props.dispatch({
      type: 'index/getUserInfo',
      payload: { userId, month, id },
    });
  };
  getData = (params = {}) => {
    const monthlyType = params.monthlyType || this.state.monthlyType;
    let { month } = this.state;
    month = params.month || month;
    const { userId, collegeId, groupType } = this.currentAuthInfo();
    const sendParams = {
      month,
      userId,
      collegeId,
      groupType,
    };

    if (monthlyType === 'step') {
      this.getBossKpiBracket(sendParams);
    } else {
      this.getBossKpiPercent(sendParams);
    }
  };
  getBossKpiBracket = (params = {}) => {
    this.props.dispatch({
      type: 'bosshome/getBossKpiBracket',
      payload: params,
    });
  };
  getBossKpiPercent = (params = {}) => {
    const { month, groupType } = params;
    this.props.dispatch({
      type: 'bosshome/getBossKpiPercent',
      payload: { month, groupType },
    });
  };
  saveParams = (params = {}) => {
    this.setState(params);
    this.props.setCurrentUrlParams(params);
  };
  toLevelPage = type => {
    const { month } = this.state;
    this.props.setRouteUrlParams('/level', { month, type });
  };
  toHistoryPage = () => {
    const { month } = this.state;
    this.props.setRouteUrlParams('/history', { month });
  };

  render() {
    const { bosshome = {}, loading } = this.props;
    const bossKpiBracketObj = bosshome.bossKpiBracketObj || {};
    const bossKpiPercentObj = bosshome.bossKpiPercentObj || {};
    const { monthlyType, isShowTab, month } = this.state;

    return (
      <div>
        <DatePanle
          defaultDate={month}
          toHistoryPage={() => {
            this.toHistoryPage();
          }}
          onChange={date => {
            this.onDateChange(date);
          }}
        />
        <p className={styles.descriptionText}>*预估绩效每天与小德学分同步更新</p>
        {!isShowTab ? null : (
          <PerformanceTab
            firstId={monthlyType === 'step' ? 1 : 2}
            callBackFun={id => {
              this.onChangeTab(id);
            }}
          />
        )}

        <div className={styles.chartContent}>
          {monthlyType === 'step' && (
            <Step
              chartData={bossKpiBracketObj}
              toLevelPage={type => {
                this.toLevelPage(type);
              }}
            />
          )}
          {monthlyType === 'proportion' && (
            <Proportion
              chartData={bossKpiPercentObj}
              // barChartData={chartZhanbi}
              toLevelPage={type => {
                this.toLevelPage(type);
              }}
            />
          )}
        </div>
        {loading && <Loading />}
      </div>
    );
  }
}
export default connect(({ loading, bosshome }) => ({ loading: loading.models.bosshome, bosshome }))(
  BossMothly
);
