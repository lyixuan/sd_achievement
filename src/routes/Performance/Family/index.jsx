import React from 'react';
import { Icon } from 'antd-mobile';
import { connect } from 'dva';
import url from 'url';
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
    const { query } = url.parse(this.props.location.search, true);
    const currentAuthInfo = getCurrentAuthInfo();
    // const month = this.currentMonth();
    const { familyId = null, userId = null } = query || currentAuthInfo;
    // if (this.props.location.search) {
    //   familyId = query.familyId;
    //   userId = query.userId;
    // }
    const params = {
      reportMonth: '2019-05',
      familyId: familyId || 181,
      userId,
    };

    // const params = {
    //   reportMonth: '2019-05',
    //   familyId: 181,
    //   userId: '493',
    // };
    this.props.dispatch({
      type: 'performance/familyHomePage',
      payload: params,
    });
  };

  gotoGroup = () => {
    const { query } = url.parse(this.props.location.search, true);
    const currentAuthInfo = getCurrentAuthInfo();
    // const month = this.currentMonth();
    const { familyId = null, userId = null } = query || currentAuthInfo;
    this.props.history.push({
      pathname: '/performance/group',
      search: `?familyId=${familyId}&userId=${userId}`,
    });
  };

  render() {
    const { month } = this.state;
    const { familyHomePageData } = this.props.performance;
    if (!familyHomePageData) {
      return <div>暂无数据</div>;
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
    const newParams = {
      userType: familyHomePageData.userType,
      userId: familyHomePageData.userId,
      orgId: familyHomePageData.orgId,
    };
    return (
      <div className={styles.performanceConBg}>
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
              <span>{familyHomePageData.totalKpi}</span>
              <span>元</span>
            </div>
            <div className={styles.middle}>
              <ul>
                <li>
                  <p>管理规模</p>
                  <p>
                    在服学员 {familyHomePageData.serviceStuCount} | 老师{' '}
                    {familyHomePageData.teacherCount}
                  </p>
                </li>
                <li>
                  <p>
                    创收单量 {familyHomePageData.totalIncomeOrderCount} | 足课单量{' '}
                    {familyHomePageData.registrationAbove60minCount} | 足课占比{' '}
                    {familyHomePageData.registrationAbove60minPercent}
                  </p>
                </li>
                <li>
                  <p>
                    好推净流水 {familyHomePageData.goodpushFinanceNetFlow} 元 | 续报净流水{' '}
                    {familyHomePageData.renewalFinanceNewFlow}元
                  </p>
                </li>
              </ul>
            </div>
            <Table
              history={this.props.history}
              columnsData={columnsData}
              rowData={familyHomePageData.incomeKpiItemList}
              newParams={newParams}
            />

            <div className={styles.group} onClick={() => this.gotoGroup()}>
              <div>
                <img src={Bitmap} alt="logo" className={styles.logo} />
                <span>小组绩效</span>
              </div>
              <Icon type="right" size="xs" color="#00ccc3" />
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
}))(Family);
