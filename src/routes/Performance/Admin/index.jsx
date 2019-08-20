import React from 'react';
import { connect } from 'dva';
import DatePanle from 'container/DatePanle';
import { getCurrentAuthInfo, getCurrentMonth } from 'utils/decorator';
import Table from '../component/table';
import styles from './index.less';

@getCurrentAuthInfo
@getCurrentMonth
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: this.currentMonth(),
      // collegeId,
      // userId,
    };
  }

  componentDidMount() {
    this.getAdminData();
  }

  getAdminData = () => {
    // const { month, userId } = this.state;
    // const params = {
    //   reportMonth: month,
    //   collegeId: 111,
    //   userId: userId,
    // };
    const params = {
      reportMonth: '2019-05',
      userId: '123',
    };

    this.props.dispatch({
      type: 'performance/adminHomePage',
      payload: params,
    });
  };

  render() {
    const { month } = this.state;
    const { adminHomePageData } = this.props.performance;
    const columnsData = [
      {
        title: '学院ID',
        dataIndex: 'itemId',
        key: 'itemId',
      },
      {
        title: '学院名称',
        dataIndex: 'itemName',
        key: 'itemName',
      },
      {
        title: '数据类型',
        dataIndex: 'itemType',
        key: 'itemType',
      },
      {
        title: '绩效',
        dataIndex: 'totalKpi',
        key: 'totalKpi',
      },
    ];
    return (
      <div className={styles.performanceCon}>
        <div className={styles.dateWrap}>
          <DatePanle
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
        <div className={styles.adminContent}>
          <Table columnsData={columnsData} rowData={adminHomePageData} />
        </div>
      </div>
    );
  }
}

export default connect(({ performance, loading }) => ({
  performance,
  isloading: loading.models.performance,
}))(Admin);
