import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd-mobile';
import DatePanle from 'container/DatePanle';
import { getCurrentAuthInfo, getCurrentMonth } from 'utils/decorator';
import styles from './index.less';

@getCurrentAuthInfo
@getCurrentMonth
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: this.currentMonth(),
      // id: 0,
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

  // toggle = id => {
  //   this.setState({ id });
  // };

  render() {
    const { adminHomePageData } = this.props.performance;
    if (!adminHomePageData.length) return <div>暂无数据</div>;
    const { month } = this.state;
    // 默认第一个展示
    // const showFirstId = adminHomePageData.length && adminHomePageData[0].itemId;
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
        <div className={styles.presidentContent}>
          <p className={styles.meta}>
            <span>组织</span>
            <span>绩效</span>
            <span>操作</span>
          </p>
          <ul className={styles.list}>
            {adminHomePageData.map(item => {
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
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(({ performance, loading }) => ({
  performance,
  isloading: loading.models.performance,
}))(Admin);
