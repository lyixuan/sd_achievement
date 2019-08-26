import React from 'react';
import { connect } from 'dva';
import url from 'url';
import { Icon } from 'antd-mobile';
import { setItem } from 'utils/localStorage';
import DatePanle from 'container/DatePanle';
import { getCurrentAuthInfo, getPerformanceCurrentMonth } from 'utils/decorator';
import styles from './index.less';

@getCurrentAuthInfo
@getPerformanceCurrentMonth
// 院长
class President extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: this.currentMonth(),
      id: 0,
      id1: 0,
      bflag: true,
    };
  }

  componentDidMount() {
    this.getGroupData();
  }
  onDateChange = month => {
    setItem('month', month);
    this.setState({ month });
    this.props.dispatch({
      type: 'performance/getDateRangeData',
      payload: { month },
    });
    this.getGroupData();
    // const currentAuthInfo = this.currentAuthInfo();
    // const userId = currentAuthInfo.loginUserId;
    // const { id } = currentAuthInfo;
  };
  // 小组绩效
  getGroupData = () => {
    const { query } = url.parse(this.props.location.search, true);
    const currentAuthInfo = getCurrentAuthInfo();
    const params = {
      reportMonth: this.currentMonth(),
      familyId: query.familyId || currentAuthInfo.familyId,
      userId: query.userId || currentAuthInfo.userId,
    };

    this.props.dispatch({
      type: 'performance/groupRankList',
      payload: params,
    });
  };

  toggle = (e, id, bol) => {
    e.stopPropagation();
    const { bflag } = this.state;
    this.setState({ id, bflag: bol ? !bflag : true });
  };
  toggle1 = id1 => {
    this.setState({ id1 });
  };

  goto = (id, id2, itemType) => {
    switch (itemType) {
      case 21: // 21	人员-家族长
        this.props.history.push({
          pathname: '/performance/family',
          search: `?familyId=${id}&userId=${id2}`,
        });
        break;
      case 22: // 22	人员-运营长
        this.props.history.push({
          pathname: '/performance/operation',
          search: `?groupId=${id}&userId=${id2}`,
        });
        break;
      case 23: // 21	人员-班主任
        this.props.history.push({
          pathname: '/performance/teacher',
          search: `?groupId=${id}&userId=${id2}`,
        });
        break;
      default:
        this.props.history.push({
          pathname: '/performance/teacher',
          search: `?groupId=${id}&userId=${id2}`,
        });
        break;
    }
  };

  renderIem1 = (id, classKpiList) => {
    const { id1 } = this.state;
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
              {item.itemType !== 1 && (
                <Icon
                  onClick={() => this.goto(id, item.itemId, item.itemType)}
                  type="right"
                  size="xs"
                  color="#00ccc3"
                />
              )}
              {item.itemType === 1 && (
                <Icon
                  onClick={() => this.toggle1(item.itemId)}
                  type={id1 === item.itemId ? 'up' : 'down'}
                  size="xs"
                  color="#00ccc3"
                />
              )}
            </span>
          </div>
        </li>
      );
    });
  };
  render() {
    const { groupRankListData = [] } = this.props.performance;
    const { id, month, bflag } = this.state;
    // 默认第一个展示
    let showFirstId = 0;
    if (groupRankListData) {
      showFirstId = groupRankListData.length && groupRankListData[0].itemId;
    }
    return (
      <div className={styles.performanceCon}>
        <div className={styles.dateWrap}>
          <DatePanle
            dateAreaResult
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
            {groupRankListData &&
              groupRankListData.map(item => {
                return (
                  <li
                    key={item.itemName}
                    onClick={e => this.toggle(e, item.itemId, (id || showFirstId) === item.itemId)}
                  >
                    <div className={styles.items}>
                      <span>{item.itemName}</span>
                      <span>{item.totalKpi}</span>
                      <span
                        // onClick={() => this.toggle(item.itemId)}
                        style={{
                          alignItems: 'center',
                          width: '10%',
                          display: 'flex',
                          cursor: 'pointer',
                        }}
                      >
                        <Icon
                          type={
                            (id || showFirstId) === item.itemId && item.itemType === 1 && bflag
                              ? 'up'
                              : 'down'
                          }
                          size="xs"
                          color="#00ccc3"
                        />
                      </span>
                    </div>
                    <ul
                      className={styles.list1}
                      style={{
                        display: (id || showFirstId) === item.itemId && bflag ? 'block' : 'none',
                      }}
                    >
                      {this.renderIem1(item.itemId, item.classKpiList)}
                    </ul>
                  </li>
                );
              })}
            {!groupRankListData && <li className={styles.hasnone}>暂无数据</li>}
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
