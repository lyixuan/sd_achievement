import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd-mobile';
import { setItem, getItem } from 'utils/localStorage';
import Loading from 'components/Loading/Loading';
import DatePanle from 'container/DatePanle';
import { getCurrentAuthInfo, getPerformanceCurrentMonth } from 'utils/decorator';
import styles from './index.less';
import noData from '../../../assets/nodata.png';

@getCurrentAuthInfo
@getPerformanceCurrentMonth
class Admin extends React.Component {
  componentDidMount() {
    this.getAdminData();
  }

  onDateChange = month => {
    setItem('month', month);
    this.props.dispatch({
      type: 'performance/getDateRangeData',
      payload: { month },
    });
    this.getAdminData();
  };

  getAdminData = () => {
    const currentAuthInfo = getCurrentAuthInfo();
    const { userId = null } = currentAuthInfo;
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
    const { loading } = this.props;
    return (
      <div>
        <div className={styles.performanceCon}>
          <div className={styles.dateWrap}>
            {getItem('timeDatePerformance').value && (
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
            )}
          </div>
          {adminHomePageData && (
            <div className={styles.presidentContent}>
              <p className={styles.meta}>
                <span>组织</span>
                <span>绩效</span>
                <span>操作</span>
              </p>
              <ul className={styles.list}>
                {adminHomePageData.map(item => {
                  return (
                    <li key={item.itemName} onClick={() => this.toggle(item.itemId)}>
                      <div className={styles.items}>
                        <span>{item.itemName}</span>
                        <span>{item.totalKpi}</span>
                        <span
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
              </ul>
            </div>
          )}
        </div>
        {!loading &&
          !adminHomePageData && <img src={noData} alt="nodata" className={styles.noData} />}
        {loading && <Loading />}
      </div>
    );
  }
}

export default connect(({ performance, loading }) => ({
  performance,
  loading: loading.models.performance,
}))(Admin);
