import React from 'react';
import { connect } from 'dva';
import { getCurrentAuthInfo, getCurrentMonth } from 'utils/decorator';
import DatePanle from 'container/DatePanle';
import styles from './index.less';
// eslint-disable-next-line
import Admin from './Admin/index';
// eslint-disable-next-line
import President from './President/index';
// eslint-disable-next-line
import Teacher from './Teacher/index';
// eslint-disable-next-line
import Family from './Family/index';
// eslint-disable-next-line
import Operation from './Operation/index';

@getCurrentAuthInfo
@getCurrentMonth
class Performance extends React.Component {
  constructor(props) {
    super(props);
    // const currentAuthInfo = this.currentAuthInfo() || {};
    // const { collegeId, userId } = currentAuthInfo;
    this.state = {
      month: this.currentMonth(),
      // collegeId,
      // userId,
    };
  }

  componentDidMount() {
    this.getPresidentData();
    // this.getAdminData();
    // this.getTeacherData();
    // this.getFamilyData();
    // this.getOperationData();
  }

  onDateChange = month => {
    this.setState({ month });
    this.getPresidentData();
  };

  // 院长
  getPresidentData = () => {
    // const { month, collegeId, userId } = this.state;
    // const params = {
    //   reportMonth: month,
    //   collegeId: 111,
    //   userId: userId,
    // };
    const params = {
      reportMonth: '2019-05',
      collegeId: 112,
      userId: '123',
    };

    this.props.dispatch({
      type: 'performance/collegeHomePage',
      payload: params,
    });
  };

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

  // 家族长
  getFamilyData = () => {
    // const { month, collegeId, userId } = this.state;
    // const params = {
    //   reportMonth: month,
    //   collegeId: 111,
    //   userId: userId,
    // };
    const params = {
      reportMonth: '2019-05',
      familyId: 181,
      userId: '493',
    };
    this.props.dispatch({
      type: 'performance/familyHomePage',
      payload: params,
    });
  };

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

  toHistoryPage = () => {
    const { month } = this.state;
    this.props.setRouteUrlParams('/history', { month });
  };

  render() {
    const { month } = this.state;
    const {
      // eslint-disable-next-line
      collegeHomePageData,
      // eslint-disable-next-line
      adminHomePageData,
      // eslint-disable-next-line
      classHomePageData,
      // eslint-disable-next-line
      familyHomePageData,
      // eslint-disable-next-line
      groupHomePageData,
    } = this.props.performance;
    // html1 针对没有背景图的样式Ï
    // eslint-disable-next-line
    const html = (
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
        {/* {adminHomePageData.length && <Admin listData={adminHomePageData} />} */}
        <President listData={collegeHomePageData} />
      </div>
    );
    // html1 针对有背景图的样式Ï
    // eslint-disable-next-line
    const html1 = (
      // performanceConBg3 2 1
      <div className={styles.performanceConBg3}>
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
        {/* <Operation listData={groupHomePageData} /> */}
        <Family listData={familyHomePageData} />
        {/* <Teacher listData={classHomePageData} /> */}
        {/* {adminHomePageData.length && <Admin listData={adminHomePageData} />} */}
        {/* <President listData={collegeHomePageData} /> */}
      </div>
    );
    return <div>{html}</div>;
  }
}
export default connect(({ performance, loading }) => ({
  performance,
  isloading: loading.models.performance,
}))(Performance);
