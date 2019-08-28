import React from 'react';
import { connect } from 'dva';
import url from 'url';
import { setItem } from 'utils/localStorage';
import DatePanle from 'container/DatePanle';
import { getCurrentAuthInfo, getPerformanceCurrentMonth } from 'utils/decorator';
import Table from '../component/table';
import styles from './index.less';
import bg3 from '../../../assets/bg3.png';
import noData from '../../../assets/nodata.png';

@getCurrentAuthInfo
@getPerformanceCurrentMonth
class Operation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: this.currentMonth(),
      groupHomePageDataNone: {
        totalKpi: ' - ',
        serviceStuCount: '-',
        teacherCount: '-',
        totalIncomeOrderCount: '-',
        registrationAbove60minCount: '-',
        registrationAbove60minPercent: '-',
        goodpushFinanceNetFlow: '-',
        renewalFinanceNetFlow: '-',
      },
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
    const { groupHomePageDataNone } = this.state;
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
      <div>
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
            <div className={styles.familyContent}>
              <div className={styles.meta}>
                <span>
                  {groupHomePageData ? groupHomePageData.totalKpi : groupHomePageDataNone.totalKpi}
                </span>
                <span>元</span>
              </div>
              <div className={styles.middle}>
                <ul>
                  <li>
                    <p>管理规模</p>
                    <p>
                      在服学员{' '}
                      {groupHomePageData
                        ? groupHomePageData.serviceStuCount
                        : groupHomePageDataNone.serviceStuCount}{' '}
                      | 老师{' '}
                      {groupHomePageData
                        ? groupHomePageData.teacherCount
                        : groupHomePageDataNone.teacherCount}
                    </p>
                  </li>
                  <li>
                    <p>
                      创收单量{' '}
                      {groupHomePageData
                        ? groupHomePageData.totalIncomeOrderCount
                        : groupHomePageDataNone.totalIncomeOrderCount}{' '}
                      | 足课单量{' '}
                      {groupHomePageData
                        ? groupHomePageData.registrationAbove60minCount
                        : groupHomePageDataNone.registrationAbove60minCount}{' '}
                      | 足课占比{' '}
                      {groupHomePageData
                        ? `${groupHomePageData.registrationAbove60minPercent}%`
                        : groupHomePageDataNone.registrationAbove60minPercent}
                    </p>
                  </li>
                  <li>
                    <p>
                      好推净流水{' '}
                      {groupHomePageData
                        ? groupHomePageData.goodpushFinanceNetFlow
                        : groupHomePageDataNone.goodpushFinanceNetFlow}{' '}
                      元 | 续报净流水{' '}
                      {groupHomePageData
                        ? groupHomePageData.renewalFinanceNetFlow
                        : groupHomePageDataNone.renewalFinanceNetFlow}元
                    </p>
                  </li>
                </ul>
              </div>
              {groupHomePageData &&
                groupHomePageData.incomeKpiItemList && (
                  <Table
                    history={this.props.history}
                    columnsData={columnsData}
                    rowData={groupHomePageData.incomeKpiItemList}
                    newParams={newParams}
                  />
                )}
              {groupHomePageData &&
                groupHomePageData.teacherKpiItemList.length !== 0 && (
                  <div className={styles.teacher}>
                    <p>班主任预测绩效</p>
                    <Table
                      history={this.props.history}
                      columnsData={columnsData1}
                      rowData={groupHomePageData.teacherKpiItemList}
                      newParams={newParams1}
                    />
                  </div>
                )}
            </div>
          </div>
        </div>
        {!groupHomePageData && <img src={noData} alt="nodata" className={styles.noData} />}
      </div>
    );
  }
}

export default connect(({ performance, loading }) => ({
  performance,
  isloading: loading.models.performance,
}))(Operation);

// export default Operation;
