import React from 'react';
import { Icon } from 'antd-mobile';
import { connect } from 'dva';
import DatePanle from 'container/DatePanle';
import { getCurrentAuthInfo, getCurrentMonth } from 'utils/decorator';
import Bitmap from '../../../assets/Bitmap.png';
import Table from '../component/table';
import styles from './index.less';

@getCurrentAuthInfo
@getCurrentMonth
class Family extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: this.currentMonth(),
      // collegeId,
      // userId,
    };
  }

  componentDidMount() {
    this.getFamilyData();
  }
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

  render() {
    const { month } = this.state;
    const { familyHomePageData } = this.props.performance;

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
    return (
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
          <Table columnsData={columnsData} rowData={familyHomePageData.incomeKpiItemList} />

          <div className={styles.group}>
            <div>
              <img src={Bitmap} alt="logo" className={styles.logo} />
              <span>小组绩效</span>
            </div>
            <Icon type="right" size="xs" color="#00ccc3" />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ performance, loading }) => ({
  performance,
  isloading: loading.models.performance,
}))(Family);
