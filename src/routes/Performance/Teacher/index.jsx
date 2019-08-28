import React from 'react';
import { connect } from 'dva';
import url from 'url';
import { setItem } from 'utils/localStorage';
import { getCurrentAuthInfo, getPerformanceCurrentMonth } from 'utils/decorator';
import DatePanle from 'container/DatePanle';
import Table from '../component/table';
import styles from './index.less';
import bg2 from '../../../assets/bg2.png';
import noData from '../../../assets/nodata.png';

@getCurrentAuthInfo
@getPerformanceCurrentMonth
class Teacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classHomePageDataNone: {
        totalKpi: '0',
        totalIncomeOrderCount: '0',
        goodpushFinanceNetFlow: '0',
        renewalFinanceNetFlow: '0',
      },
    };
  }

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
      groupId: query.groupId || currentAuthInfo.groupId,
      userId: query.userId || currentAuthInfo.userId,
    };

    this.props.dispatch({
      type: 'performance/classHomePage',
      payload: params,
    });
  };
  render() {
    const { classHomePageData } = this.props.performance;
    const { classHomePageDataNone } = this.state;
    let newParams = {};
    if (classHomePageData) {
      newParams = {
        userType: classHomePageData.userType,
        userId: classHomePageData.userId,
        orgId: classHomePageData.orgId,
      };
    }
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
    return (
      <div>
        <div className={styles.performanceConBg2}>
          <img
            src={bg2}
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
              <span>
                {classHomePageData ? classHomePageData.totalKpi : classHomePageDataNone.totalKpi}
              </span>
              <span>元</span>
            </div>
            <div className={styles.middle}>
              <p>
                创收单量{' '}
                {classHomePageData
                  ? classHomePageData.totalIncomeOrderCount
                  : classHomePageDataNone.totalIncomeOrderCount}
              </p>
              <p>
                好推净流水{' '}
                {classHomePageData
                  ? classHomePageData.goodpushFinanceNetFlow
                  : classHomePageDataNone.goodpushFinanceNetFlow}元 | 续报净流水{classHomePageData
                  ? classHomePageData.renewalFinanceNetFlow
                  : classHomePageDataNone.renewalFinanceNetFlow}{' '}
                元
              </p>
            </div>
            {classHomePageData &&
              classHomePageData.incomeKpiItemList.length !== 0 && (
                <Table
                  history={this.props.history}
                  columnsData={columnsData}
                  rowData={classHomePageData.incomeKpiItemList}
                  newParams={newParams}
                />
              )}
          </div>
        </div>
        {!classHomePageData && <img src={noData} alt="nodata" className={styles.noData} />}
      </div>
    );
  }
}

export default connect(({ performance, loading }) => ({
  performance,
  isloading: loading.models.performance,
}))(Teacher);
// export default Teacher;
