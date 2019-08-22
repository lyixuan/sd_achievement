import React from 'react';
import { Icon } from 'antd-mobile';
import { connect } from 'dva';
import url from 'url';
import { setItem } from 'utils/localStorage';
import DatePanle from 'container/DatePanle';
import { getCurrentAuthInfo, getPerformanceCurrentMonth } from 'utils/decorator';
import Bitmap from '../../../assets/Bitmap.png';
import Table from '../component/table';
import styles from './index.less';

@getCurrentAuthInfo
@getPerformanceCurrentMonth
class Family extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // month: this.currentMonth(),
      // collegeId,
      // userId,
    };
  }

  componentDidMount() {
    this.getFamilyData();
  }

  onDateChange = month => {
    setItem('month', month);
    // this.setState({ month });
    this.props.dispatch({
      type: 'performance/getDateRangeData',
      payload: { month },
    });
    this.getFamilyData();
  };
  // 家族长
  getFamilyData = () => {
    const { query } = url.parse(this.props.location.search, true);
    const currentAuthInfo = getCurrentAuthInfo();
    const params = {
      reportMonth: this.currentMonth(),
      familyId: query.familyId || currentAuthInfo.familyId,
      userId: query.userId || currentAuthInfo.userId,
    };
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
        dataIndex: '操作',
        key: '操作',
      },
    ];
    let newParams = {};
    if (familyHomePageData) {
      newParams = {
        userType: familyHomePageData.userType,
        userId: familyHomePageData.userId,
        orgId: familyHomePageData.orgId,
      };
    }

    return (
      <div className={styles.performanceConBg}>
        <div className={styles.performanceConBg3}>
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
          {familyHomePageData && (
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
          )}
          {!familyHomePageData && <div />}
        </div>
      </div>
    );
  }
}

export default connect(({ performance, loading }) => ({
  performance,
  isloading: loading.models.performance,
}))(Family);
