import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd-mobile';
import DatePanle from 'container/DatePanle';
import { getCurrentAuthInfo, getCurrentMonth } from 'utils/decorator';
import styles from './index.less';

@getCurrentAuthInfo
@getCurrentMonth
class President extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: this.currentMonth(),
      id: 0,
      id1: 0,
    };
  }

  componentDidMount() {
    this.getPresidentData();
  }
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

  toggle = id => {
    this.setState({ id });
  };
  toggle1 = id1 => {
    this.setState({ id1 });
  };

  renderIem2 = classKpiList => {
    if (!classKpiList) {
      return <li className={styles.hasnone}>暂无数据</li>;
    }
    return classKpiList.map(item => {
      return (
        <li key={item.itemName}>
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
    });
  };
  renderIem1 = groupKpiList => {
    const { id1 } = this.state;
    return groupKpiList.map(item => {
      return (
        <li key={item.itemName}>
          <div className={styles.items}>
            <span>{item.itemName}</span>
            <span>{item.totalKpi}</span>
            <span
              onClick={() => this.toggle1(item.itemId)}
              style={{
                alignItems: 'center',
                width: '10%',
                display: 'flex',
                cursor: 'pointer',
              }}
            >
              <Icon type={id1 === item.itemId ? 'up' : 'down'} size="xs" color="#00ccc3" />
            </span>
          </div>
          {item.itemId === id1 && (
            <ul className={styles.list2}>{this.renderIem2(item.classKpiList)}</ul>
          )}
        </li>
      );
    });
  };
  render() {
    const { collegeHomePageData } = this.props.performance;
    if (!collegeHomePageData.length) return <div>11</div>;
    const { id, month } = this.state;
    // 默认第一个展示
    const showFirstId = collegeHomePageData.length && collegeHomePageData[0].itemId;
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
            <span>家族</span>
            <span>绩效总额</span>
            <span>操作</span>
          </p>
          <ul className={styles.list}>
            {collegeHomePageData.map(item => {
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
                      <Icon
                        type={(id || showFirstId) === item.itemId ? 'up' : 'down'}
                        size="xs"
                        color="#00ccc3"
                      />
                    </span>
                  </div>
                  {(id || showFirstId) === item.itemId && (
                    <ul className={styles.list1}>{this.renderIem1(item.groupKpiList)}</ul>
                  )}
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
}))(President);
