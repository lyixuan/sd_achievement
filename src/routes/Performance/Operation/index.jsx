import React from 'react';
import { connect } from 'dva';
import DatePanle from 'container/DatePanle';
import { getCurrentAuthInfo, getCurrentMonth } from 'utils/decorator';
import url from 'url';
import Table from '../component/table';
import styles from './index.less';

@getCurrentAuthInfo
@getCurrentMonth
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
  // 家族长
  getOperationData = () => {
    const { query } = url.parse(this.props.location.search, true);
    const currentAuthInfo = getCurrentAuthInfo();
    // const month = this.currentMonth();
    const { groupId = null, userId = null } = currentAuthInfo || query;
    // let { groupId = null, userId = null } = currentAuthInfo;
    // if (this.props.location.search) {
    //   groupId = query.groupId;
    //   userId = query.userId;
    // }
    const params = {
      reportMonth: '2019-05',
      groupId,
      userId,
    };

    // const params = {
    //   reportMonth: '2019-05',
    //   groupId: 188,
    //   userId: '307',
    // };
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
    return (
      <div className={styles.performanceConBg}>
        <div className={styles.performanceConBg1}>
          <div className={styles.dateWrapBg}>
            <DatePanle
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
            <Table
              history={this.props.history}
              columnsData={columnsData}
              rowData={groupHomePageData.incomeKpiItemList}
            />
            <div className={styles.teacher}>
              <p>班主任预测绩效</p>
              <Table
                history={this.props.history}
                columnsData={columnsData1}
                rowData={groupHomePageData.teacherKpiItemList}
              />
            </div>
          </div>
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
