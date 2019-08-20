import React from 'react';
import { connect } from 'dva';
import DatePanle from 'container/DatePanle';
import { getCurrentAuthInfo, getCurrentMonth } from 'utils/decorator';
import Table from '../component/table';
import styles from './index.less';
// import { Icon } from 'antd-mobile';

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
    // const { month, collegeId, userId } = this.state;
    // const params = {
    //   reportMonth: month,
    //   collegeId: 111,
    //   userId: userId,
    // };
    const params = {
      reportMonth: '2019-05',
      groupId: 188,
      userId: '307',
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
        dataIndex: 'itemType',
        key: 'itemType',
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
        dataIndex: 'itemType',
        key: 'itemType',
      },
    ];
    return (
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
            <span>18902</span>
            <span>元</span>
          </div>
          <div className={styles.middle}>
            <ul>
              <li>
                <p>管理规模</p>
                <p>在服学员 19098 | 老师 26</p>
              </li>
              <li>
                <p>ko运营规模</p>
                <p>应出勤学员 29808</p>
              </li>
              <li>
                <p>足课单量 23 | 足课转化单数12 | 续报单数 11</p>
                <p>好推净流水122,873元 | 续报净流水 28,773元</p>
              </li>
            </ul>
          </div>
          <Table columnsData={columnsData} rowData={groupHomePageData.incomeKpiItemList} />

          <div className={styles.teacher}>
            <p>班主任预测绩效</p>
            <Table columnsData={columnsData1} rowData={groupHomePageData.teacherKpiItemList} />
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
