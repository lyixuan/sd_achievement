import React from 'react';
import { connect } from 'dva';
import { assignUrlParams } from 'utils/routerUtils';
import DatePanle from 'container/DatePanle';
import PerformanceTab from 'components/SelfTab/PerformanceTab';
import { getCurrentAuthInfo } from 'utils/decorator';
import Proportion from './proportion';
import Step from './step';
import styles from './index.less';

@getCurrentAuthInfo
class Boss extends React.Component {
  constructor(props) {
    super(props);
    const { groupType = null } = this.currentAuthInfo;
    const { urlParams = {} } = props;
    const initState = {
      dateTime: '2018-08',
      monthlyType: 'step', // 默认绩效分档
      isShowTab: groupType === 'boss', // 是否显示切换分档和占比按钮
      FunnelChartData: [
        { val: 10, type: 1 },
        { val: 20, type: 2 },
        { val: 40, type: 3 },
        { val: 30, type: 4 },
      ],
      pieChartData: [
        { val: 70, name: '睿博' },
        { val: 60, name: '芝士' },
        { val: 50, name: '自变量' },
        { val: 40, name: 'π学院' },
        { val: 30, name: '狐罗' },
        { val: 20, name: '泰罗' },
        { val: 10, name: '浩博' },
      ],
      chartZhanbi: [
        { val: 30, name: '拍学院' },
        { val: 50, name: '自变量' },
        { val: 70, name: '好波' },
        { val: 10, name: '芝士' },
        { val: 30, name: '葫芦' },
      ],
    };
    this.state = assignUrlParams(initState, urlParams);
  }
  componentDidMount() {
    this.getBossKpiBracket();
  }
  onChangeTab = id => {
    const typeObj = {
      1: 'step',
      2: 'proportion',
    };
    const monthlyType = typeObj[id];
    this.props.setCurrentUrlParams({ monthlyType });
    this.saveParams({ monthlyType });
  };
  onDateChange = dateTime => {
    this.saveParams({ dateTime });
  };
  getBossKpiBracket = (params = {}) => {
    const { dateTime } = this.state;
    const month = params.dateTime || dateTime;
    const { userId, collegeId, groupType } = this.currentAuthInfo;
    const sendParams = {
      month,
      userId,
      collegeId,
      groupType,
    };
    this.props.dispatch({
      type: 'bosshome/getBossKpiBracket',
      payload: sendParams,
    });
  };
  saveParams = params => {
    this.setState({ ...params });
    this.props.setCurrentUrlParams(params);
  };
  toLevelPage = () => {
    this.props.setRouteUrlParams('/level');
  };
  toHistoryPage = () => {
    this.props.setRouteUrlParams('/history');
  };

  render() {
    // const { routerData, match } = this.props;
    const {
      FunnelChartData,
      pieChartData,
      chartZhanbi,
      monthlyType,
      isShowTab,
      dateTime,
    } = this.state;
    return (
      <div>
        <DatePanle
          defaultDate={dateTime}
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
              FunnelChartData={FunnelChartData}
              toLevelPage={() => {
                this.toLevelPage();
              }}
            />
          )}
          {monthlyType === 'proportion' && (
            <Proportion
              chartData={pieChartData}
              barChartData={chartZhanbi}
              toLevelPage={() => {
                this.toLevelPage();
              }}
            />
          )}
        </div>
      </div>
    );
  }
}
export default connect(({ loading, bosshome }) => ({ loading: loading.models.bosshome, bosshome }))(
  Boss
);
