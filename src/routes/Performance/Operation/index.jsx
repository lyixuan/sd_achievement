import React from 'react';
import { connect } from 'dva';
import url from 'url';
import { setItem } from 'utils/localStorage';
import Loading from 'components/Loading/Loading';
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
    };
  }
  componentWillMount() {
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
    const params = {
      reportMonth: this.currentMonth(),
      groupId: (query.groupId !== 'null' && query.groupId) || currentAuthInfo.groupId,
      userId: (query.userId !== 'null' && query.userId) || currentAuthInfo.userId,
    };
    this.props.dispatch({
      type: 'performance/groupHomePage',
      payload: params,
    });
  };
  render() {
    const { month } = this.state;
    const { groupHomePageData = {} } = this.props.performance;

    const { loading } = this.props;
    const totalKpi = groupHomePageData.totalKpi || 0;
    const serviceStuCount = groupHomePageData.serviceStuCount || 0;
    const teacherCount = groupHomePageData.teacherCount || 0;
    const goodpushOrderCount = groupHomePageData.goodpushOrderCount || 0;
    const renewalOrderCount = groupHomePageData.renewalOrderCount || 0;
    const examZbtOrderCount = groupHomePageData.examZbtOrderCount || 0;
    const goodpushFinanceNetFlow = groupHomePageData.goodpushFinanceNetFlow || 0;
    const renewalFinanceNetFlow = groupHomePageData.renewalFinanceNetFlow || 0;
    const examZbtFinanceNetFlow = groupHomePageData.examZbtFinanceNetFlow || 0;
    const incomeKpiItemList = groupHomePageData.incomeKpiItemList || [];
    const teacherKpiItemList = groupHomePageData.teacherKpiItemList || [];

    const newParams = {
      userType: groupHomePageData.userType || '',
      userId: groupHomePageData.userId || '',
      orgId: groupHomePageData.orgId || '',
    };
    const newParams1 = {
      orgId: groupHomePageData.orgId || '',
      teacher: '/performance/teacher',
    };

    const columnsData = [
      {
        title: '绩效子项',
        dataIndex: 'itemKey',
        key: 'itemKey',
      },
      {
        title: '绩效',
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

    const params = {
      className: 'tableOperation',
      color: '#55595E',
      backgroundHeader: '#F7F9FD',
      isContentBorder: false,
    };

    return (
      <div>
        {!loading && (
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
                  <span>{totalKpi}</span>
                  <span>元</span>
                </div>
                <div className={styles.middle}>
                  <ul>
                    <li>
                      <p>管理规模</p>
                      <p>
                        在服学员 {serviceStuCount}
                        | 老师 {teacherCount}
                      </p>
                    </li>
                    <li>
                      <p>
                        好推单量 {goodpushOrderCount} | 续报单量 {renewalOrderCount} |
                        成考专套本单量
                        {examZbtOrderCount}
                      </p>
                    </li>
                    <li>
                      <p>
                        好推绩效流水 {goodpushFinanceNetFlow} 元 | 续报绩效流水{' '}
                        {renewalFinanceNetFlow}元
                        <br />
                        成考专本套绩效流水
                        {examZbtFinanceNetFlow}元
                      </p>
                    </li>
                  </ul>
                </div>
                {incomeKpiItemList.length !== 0 && (
                  <Table
                    params={params}
                    history={this.props.history}
                    columnsData={columnsData}
                    rowData={incomeKpiItemList}
                    newParams={newParams}
                  />
                )}
                {teacherKpiItemList.length !== 0 && (
                  <div className={styles.teacher}>
                    <p>班主任预测绩效</p>
                    <Table
                      params={params}
                      history={this.props.history}
                      columnsData={columnsData1}
                      rowData={teacherKpiItemList}
                      newParams={newParams1}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {!loading &&
          !groupHomePageData && <img src={noData} alt="nodata" className={styles.noData} />}
        {loading && <Loading />}
      </div>
    );
  }
}

export default connect(({ performance, loading }) => ({
  performance,
  loading: loading.models.performance,
}))(Operation);

// export default Operation;
