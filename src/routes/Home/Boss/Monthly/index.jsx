import React from 'react';
import { connect } from 'dva';
import { assignUrlParams } from 'utils/routerUtils';
import DatePanle from 'container/DatePanle';
import PerformanceTab from 'components/SelfTab/PerformanceTab';
import Loading from 'components/Loading/Loading';
import { getCurrentAuthInfo } from 'utils/decorator';
import { timeArea } from 'utils/timeArea';
import Proportion from './proportion';
import Step from './step';
import styles from './index.less';

@getCurrentAuthInfo
class BossMothly extends React.Component {
  constructor(props) {
    super(props);
    const { groupType = null } = this.currentAuthInfo;
    const { maxDate } = timeArea();
    const { urlParams = {} } = props;
    const initState = {
      // dateTime: maxDate,
      month: maxDate,
      monthlyType: 'step', // 默认绩效分档
      isShowTab: groupType === 'boss', // 是否显示切换分档和占比按钮
    };
    this.state = assignUrlParams(initState, urlParams);
  }
  componentDidMount() {
    this.getData();
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
    this.saveParams({ month });
    this.getData({ month });
  };
  getData = (params = {}) => {
    const monthlyType = params.monthlyType || this.state.monthlyType;
    let { month } = this.state;
    month = params.month || month;
    const { userId, collegeId, groupType } = this.currentAuthInfo;
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
  toLevelPage = () => {
    const { month } = this.state;
    this.props.setRouteUrlParams('/level', { month });
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
        <p className={styles.descriptionText}>
          *预估绩效每天与小德学分同步更新;学院打分绩效为浮动绩效,月底 根据本月工作表现确定实发绩效
        </p>
        {isShowTab && (
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
              toLevelPage={() => {
                this.toLevelPage();
              }}
            />
          )}
          {monthlyType === 'proportion' && (
            <Proportion
              chartData={bossKpiPercentObj}
              // barChartData={chartZhanbi}
              toLevelPage={() => {
                this.toLevelPage();
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
