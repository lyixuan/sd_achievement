import React from 'react';
import { connect } from 'dva';
import { getCurrentAuthInfo, getCurrentMonth } from 'utils/decorator';
import DatePanle from 'container/DatePanle';
import Table from '../component/table';
import styles from './index.less';

@getCurrentAuthInfo
@getCurrentMonth
class Teacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: this.currentMonth(),
      // collegeId,
      // userId,
    };
  }

  componentDidMount() {
    this.getTeacherData();
  }
  // 班主任
  getTeacherData = () => {
    // const { month, collegeId, userId } = this.state;
    // const params = {
    //   reportMonth: month,
    //   collegeId: 111,
    //   userId: userId,
    // };
    const params = {
      reportMonth: '2019-05',
      groupId: 99,
      userId: '417',
    };
    this.props.dispatch({
      type: 'performance/classHomePage',
      payload: params,
    });
  };

  render() {
    const { month } = this.state;
    const { classHomePageData } = this.props.performance;
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
            <p>好推净流水122873元 | 续报净流水 28773元</p>
            <p>足课单量 2 | 硕士续报单量 4 </p>
          </div>
          <Table columnsData={columnsData} rowData={classHomePageData.incomeKpiItemList} />
        </div>
      </div>
    );
  }
}

export default connect(({ performance, loading }) => ({
  performance,
  isloading: loading.models.performance,
}))(Teacher);
// export default Teacher;
