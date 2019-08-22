import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd-mobile';
import { setItem } from 'utils/localStorage';
import DatePanle from 'container/DatePanle';
import { getCurrentAuthInfo, getPerformanceCurrentMonth } from 'utils/decorator';
import SwitchDialog from '../../../container/IDSwitchDialog/index';
import styles from './index.less';

@getCurrentAuthInfo
@getPerformanceCurrentMonth
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // month: this.currentMonth(),
      // id: 0,
    };
  }

  componentDidMount() {
    this.getAdminData();
  }

  onDateChange = month => {
    setItem('month', month);
    // this.setState({ month });
    this.props.dispatch({
      type: 'performance/getDateRangeData',
      payload: { month },
    });
    this.getAdminData();
    // const currentAuthInfo = this.currentAuthInfo();
    // const userId = currentAuthInfo.loginUserId;
    // const { id } = currentAuthInfo;
  };

  getAdminData = () => {
    const currentAuthInfo = getCurrentAuthInfo();
    const { userId = null } = currentAuthInfo;
    // const params = {
    //   reportMonth: month,
    //   collegeId: 111,
    //   userId: userId,
    // };
    const params = {
      reportMonth: this.currentMonth(),
      userId,
    };

    this.props.dispatch({
      type: 'performance/adminHomePage',
      payload: params,
    });
  };

  toggle = id => {
    const currentAuthInfo = getCurrentAuthInfo();
    const { userId = null } = currentAuthInfo;
    this.props.history.push({
      pathname: '/performance/president',
      search: `?collegeId=${id}&userId=${userId}`,
    });
  };

  render() {
    const { adminHomePageData } = this.props.performance;
    return (
      <div className={styles.performanceCon}>
        <div className={styles.dateWrap}>
          <DatePanle
            dateAreaResult
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
        <div className={styles.presidentContent}>
          <p className={styles.meta}>
            <span>组织</span>
            <span>绩效</span>
            <span>操作</span>
          </p>
          <ul className={styles.list}>
            {adminHomePageData &&
              adminHomePageData.map(item => {
                return (
                  <li key={item.itemName}>
                    <div className={styles.items}>
                      <span>{item.itemName}</span>
                      <span>{item.totalKpi}</span>
                      <span
                        onClick={() => this.toggle(item.itemId)}
                        style={{
                          alignItems: 'center',
                          width: '10%',
                          display: 'flex',
                          cursor: 'pointer',
                        }}
                      >
                        <Icon type="right" size="xs" color="#00ccc3" />
                      </span>
                    </div>
                  </li>
                );
              })}
            {!adminHomePageData && <li className={styles.hasnone}>暂无数据</li>}
          </ul>
        </div>
        {/* boss - 切换身份 */}
        {<SwitchDialog toIndexPage={this.toIndexPage} />}
      </div>
    );
  }
}

export default connect(({ performance, loading }) => ({
  performance,
  isloading: loading.models.performance,
}))(Admin);
