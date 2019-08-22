import React from 'react';
import { connect } from 'dva';
import url from 'url';
import { setItem } from 'utils/localStorage';
import DatePanle from 'container/DatePanle';
import { getCurrentAuthInfo, getPerformanceCurrentMonth } from 'utils/decorator';
import Table from '../component/table';
import styles from './index.less';
import bg3 from '../../../assets/bg3.png';

@getCurrentAuthInfo
@getPerformanceCurrentMonth
class Operation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: this.currentMonth(),
      // collegeId,
      // userId,
    };
  }

  componentDidMount() {
    this.getOperationData();
  }

  onDateChange = month => {
    setItem('month', month);
    this.setState({ month });
    this.props.dispatch({
      type: 'performance/getDateRangeData',
      payload: { month },
    });
    this.getOperationData();
    // const currentAuthInfo = this.currentAuthInfo();
    // const userId = currentAuthInfo.loginUserId;
    // const { id } = currentAuthInfo;
  };

  // 家族长
  getOperationData = () => {
    const { query } = url.parse(this.props.location.search, true);
    const currentAuthInfo = getCurrentAuthInfo();
    // const month = this.currentMonth();
    // const { groupId, userId } = query || currentAuthInfo;
    const params = {
      reportMonth: this.currentMonth(),
      groupId: query.groupId || currentAuthInfo.currentAuthInfo,
      userId: query.userId || currentAuthInfo.userId,
    };
    this.props.dispatch({
      type: 'performance/groupHomePage',
      payload: params,
    });
  };
  render() {
    // const { listData } = this.props;
    const { month } = this.state;
    const { groupHomePageData } = this.props.performance;
    const columnsData = [
      {
        title: '绩效子项',
        dataIndex: 'itemKey',
        key: 'itemKey',
      },
      {
        title: '金额',
        dataIndex: 'itemValue',
        key: 'itemValue',
      },
      {
        title: '操作',
        dataIndex: '操作',
        key: '操作',
      },
    ];

    const columnsData1 = [
      {
        title: '老师名称',
        dataIndex: 'itemName',
        key: 'itemName',
      },
      {
        title: '绩效',
        dataIndex: 'totalKpi',
        key: 'totalKpi',
      },
      {
        title: '操作',
        dataIndex: '操作',
        key: '操作',
      },
    ];
    let newParams = {};
    let newParams1 = {};
    if (groupHomePageData) {
      newParams = {
        userType: groupHomePageData.userType,
        userId: groupHomePageData.userId,
        orgId: groupHomePageData.orgId,
      };
      newParams1 = {
        orgId: groupHomePageData.orgId,
        teacher: '/performance/teacher',
      };
    }

    return (
      <div className={styles.performanceConBg}>
        <div className={styles.performanceConBg3}>
          <img
            src={bg3}
            alt="运营长"
            style={{ position: 'absolute', zIndex: '-1', width: '100%' }}
          />
          <div className={styles.dateWrapBg}>
            <DatePanle
              dateAreaResult
              isColor
              defaultDate={month}
              toHideImg
              toHistoryPage={() => {
                this.toHistoryPage();
              }}
              isperformance
              onChange={date => {
                this.onDateChange(date);
              }}
            />
          </div>
          {groupHomePageData && (
            <div className={styles.familyContent}>
              <div className={styles.meta}>
                <span>{groupHomePageData.totalKpi}</span>
                <span>元</span>
              </div>
              <div className={styles.middle}>
                <ul>
                  <li>
                    <p>管理规模</p>
                    <p>
                      在服学员 {groupHomePageData.serviceStuCount} | 老师{' '}
                      {groupHomePageData.teacherCount}
                    </p>
                  </li>
                  <li>
                    <p>
                      创收单量 {groupHomePageData.totalIncomeOrderCount} | 足课单量{' '}
                      {groupHomePageData.registrationAbove60minCount} | 足课占比{' '}
                      {groupHomePageData.registrationAbove60minPercent}
                    </p>
                  </li>
                  <li>
                    <p>
                      好推净流水 {groupHomePageData.goodpushFinanceNetFlow} 元 | 续报净流水{' '}
                      {groupHomePageData.renewalFinanceNewFlow}元
                    </p>
                  </li>
                </ul>
              </div>
              {groupHomePageData.incomeKpiItemList && (
                <Table
                  history={this.props.history}
                  columnsData={columnsData}
                  rowData={groupHomePageData.incomeKpiItemList}
                  newParams={newParams}
                />
              )}
              {!groupHomePageData.incomeKpiItemList && <li className={styles.hasnone}>暂无数据</li>}
              <div className={styles.teacher}>
                <p>班主任预测绩效</p>
                {groupHomePageData.teacherKpiItemList && (
                  <Table
                    history={this.props.history}
                    columnsData={columnsData1}
                    rowData={groupHomePageData.teacherKpiItemList}
                    newParams={newParams1}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(({ performance, loading }) => ({
  performance,
  isloading: loading.models.performance,
}))(Operation);

// export default Operation;
