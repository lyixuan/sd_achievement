import React from 'react';
import { connect } from 'dva';
import { getCurrentAuthInfo, getCurrentMonth } from 'utils/decorator';
import DatePanle from 'container/DatePanle';
import Table from '../component/table';
import styles from './index.less';

@getCurrentAuthInfo
@getCurrentMonth
class GoodPush extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: this.currentMonth(),
      // collegeId,
      // userId,
    };
  }

  componentDidMount() {
    this.getRenewalData();
  }
  // 班主任
  getRenewalData = () => {
    // const { month, collegeId, userId } = this.state;
    // const params = {
    //   reportMonth: month,
    //   collegeId: 111,
    //   userId: userId,
    // };
    const params = {
      reportMonth: '2019-05',
      userType: 'group',
      userId: '537',
    };
    this.props.dispatch({
      type: 'performance/findGoodpushKpiDetail',
      payload: params,
    });
  };

  render() {
    const { month } = this.state;
    const { findGoodpushKpiDetailData } = this.props.performance;
    const columnsData = [
      {
        title: '岗位',
        dataIndex: 'positionType',
        key: 'positionType',
      },
      {
        title: '岗位分配比',
        dataIndex: 'positionDistribution',
        key: 'positionDistribution',
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
      <div className={styles.performanceConBg2}>
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
        <div className={styles.teacherContent}>
          <div className={styles.meta}>
            <span>18902</span>
            <span>元</span>
          </div>
          <div className={styles.middle}>
            <p>好推绩效 = 好推净流水 x 好推净流水系数</p>
          </div>
          {<Table columnsData={columnsData} rowData={findGoodpushKpiDetailData} />}
        </div>
      </div>
    );
  }
}

export default connect(({ performance, loading }) => ({
  performance,
  isloading: loading.models.performance,
}))(GoodPush);
