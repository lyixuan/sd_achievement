import React from 'react';
import { connect } from 'dva';
import url from 'url';
import { setItem } from 'utils/localStorage';
import Loading from 'components/Loading/Loading';
import { getCurrentAuthInfo, getPerformanceCurrentMonth } from 'utils/decorator';
import DatePanle from 'container/DatePanle';
import Table from '../component/table';
import styles from './index.less';
import bg3 from '../../../assets/bg3.png';
import noData from '../../../assets/nodata.png';

@getCurrentAuthInfo
@getPerformanceCurrentMonth
class Teacher extends React.Component {
  componentDidMount() {
    this.getTeacherData();
  }
  onDateChange = month => {
    setItem('month', month);
    // this.setState({ month });
    this.props.dispatch({
      type: 'performance/getDateRangeData',
      payload: { month },
    });
    this.getTeacherData();
  };
  // 班主任
  getTeacherData = () => {
    const { query } = url.parse(this.props.location.search, true);
    const currentAuthInfo = getCurrentAuthInfo();
    const params = {
      reportMonth: this.currentMonth(),
      groupId: (query.groupId !== 'null' && query.groupId) || currentAuthInfo.groupId,
      userId: (query.userId !== 'null' && query.userId) || currentAuthInfo.userId,
    };

    this.props.dispatch({
      type: 'performance/classHomePage',
      payload: params,
    });
  };
  render() {
    const { classHomePageData } = this.props.performance;

    const { loading } = this.props;
    const totalKpi = classHomePageData.totalKpi || 0;
    const serviceStuCount = classHomePageData.serviceStuCount || 0;
    const teacherCount = classHomePageData.teacherCount || 0;
    const goodpushOrderCount = classHomePageData.goodpushOrderCount || 0;
    const renewalOrderCount = classHomePageData.renewalOrderCount || 0;
    const examZbtOrderCount = classHomePageData.examZbtOrderCount || 0;
    const goodpushFinanceNetFlow = classHomePageData.goodpushFinanceNetFlow || 0;
    const renewalFinanceNetFlow = classHomePageData.renewalFinanceNetFlow || 0;
    const examZbtFinanceNetFlow = classHomePageData.examZbtFinanceNetFlow || 0;
    const incomeKpiItemList = classHomePageData.incomeKpiItemList || [];

    const newParams = {
      userType: classHomePageData.userType || '',
      userId: classHomePageData.userId || '',
      orgId: classHomePageData.orgId || '',
    };

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
    const params = {
      color: '#55595E',
      background: '#F7F9FD',
    };
    return (
      <div>
        {!loading && (
          <div className={styles.performanceConBg2}>
            <img
              src={bg3}
              alt="班主任"
              style={{ position: 'absolute', zIndex: '-1', width: '100%' }}
            />
            <div className={styles.dateWrapBg}>
              <DatePanle
                dateAreaResult
                isColor
                defaultDate={this.currentMonth()}
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
            <div className={styles.teacherContent}>
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
                      好推单量 {goodpushOrderCount} | 续报单量 {renewalOrderCount} | 成考专套本单量
                      {examZbtOrderCount}
                    </p>
                  </li>
                  <li>
                    <p>
                      好推净流水 {goodpushFinanceNetFlow} 元 | 续报净流水 {renewalFinanceNetFlow}元
                      <br />
                      成考转本套绩效流水
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
            </div>
          </div>
        )}
        {!loading &&
          !classHomePageData && <img src={noData} alt="nodata" className={styles.noData} />}
        {loading && <Loading />}
      </div>
    );
  }
}

export default connect(({ performance, loading }) => ({
  performance,
  loading: loading.models.performance,
}))(Teacher);
// export default Teacher;
