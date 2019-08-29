import React from 'react';
import { Icon } from 'antd-mobile';
import { connect } from 'dva';
import url from 'url';
import { setItem } from 'utils/localStorage';
import Loading from 'components/Loading/Loading';
import DatePanle from 'container/DatePanle';
import { getCurrentAuthInfo, getPerformanceCurrentMonth } from 'utils/decorator';
import Bitmap from '../../../assets/Bitmap.png';
import Table from '../component/table';
import styles from './index.less';
import bg3 from '../../../assets/bg3.png';

@getCurrentAuthInfo
@getPerformanceCurrentMonth
class Family extends React.Component {
  componentDidMount() {
    this.getFamilyData();
  }

  onDateChange = month => {
    setItem('month', month);
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
      familyId: (query.familyId !== 'null' && query.familyId) || currentAuthInfo.familyId,
      userId: (query.userId !== 'null' && query.userId) || currentAuthInfo.userId,
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
    const { familyHomePageData = {} } = this.props.performance;
    const { loading } = this.props;
    const totalKpi = familyHomePageData.totalKpi || 0;
    const serviceStuCount = familyHomePageData.serviceStuCount || 0;
    const teacherCount = familyHomePageData.teacherCount || 0;
    const goodpushOrderCount = familyHomePageData.goodpushOrderCount || 0;
    const renewalOrderCount = familyHomePageData.renewalOrderCount || 0;
    const examZbtOrderCount = familyHomePageData.examZbtOrderCount || 0;
    const goodpushFinanceNetFlow = familyHomePageData.goodpushFinanceNetFlow || 0;
    const renewalFinanceNetFlow = familyHomePageData.renewalFinanceNetFlow || 0;
    const examZbtFinanceNetFlow = familyHomePageData.examZbtFinanceNetFlow || 0;
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
      userType: familyHomePageData.userType || '',
      userId: familyHomePageData.userId || '',
      orgId: familyHomePageData.orgId || '',
    };

    return (
      <div className={styles.performanceConBg}>
        {!loading && (
          <div className={styles.performanceConBg3}>
            <img
              src={bg3}
              alt="家族长"
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
            <div className={styles.familyContent}>
              <div className={styles.meta}>
                <span>{totalKpi}</span>
                <span>元</span>
              </div>
              <div className={styles.middle}>
                <ul>
                  <li>
                    <p>管理规模</p>
                    <p>
                      在服学员 {serviceStuCount} | 老师 {teacherCount}{' '}
                    </p>
                  </li>
                  <li>
                    <p>
                      好推单量 {goodpushOrderCount} | 续报单量 {renewalOrderCount} | 成考专套本单量
                      {examZbtOrderCount}
                    </p>
                  </li>
                  <li>
                    <p>
                      好推净流水 {goodpushFinanceNetFlow} 元 | 续报净流水{renewalFinanceNetFlow}元{' '}
                      <br />
                      成考转本套绩效流水 {examZbtFinanceNetFlow}元
                    </p>
                  </li>
                </ul>
              </div>
              {familyHomePageData.incomeKpiItemList && (
                <Table
                  history={this.props.history}
                  columnsData={columnsData}
                  color="#F7F9FD"
                  rowData={familyHomePageData.incomeKpiItemList}
                  newParams={newParams}
                />
              )}
              <div className={styles.group} onClick={() => this.gotoGroup()}>
                <div>
                  <img src={Bitmap} alt="logo" className={styles.logo} />
                  <span>小组绩效</span>
                </div>
                <Icon type="right" size="xs" color="#00ccc3" />
              </div>
            </div>
          </div>
        )}
        {loading && <Loading />}
      </div>
    );
  }
}

export default connect(({ performance, loading }) => ({
  performance,
  loading: loading.models.performance,
}))(Family);
