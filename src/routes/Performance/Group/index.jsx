import React from 'react';
import { connect } from 'dva';
import url from 'url';
import { Icon } from 'antd-mobile';
import DatePanle from 'container/DatePanle';
import { getCurrentAuthInfo, getCurrentMonth } from 'utils/decorator';
import styles from './index.less';

@getCurrentAuthInfo
@getCurrentMonth
// 院长
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
    this.getGroupData();
  }
  // 小组绩效
  getGroupData = () => {
    const { query } = url.parse(this.props.location.search, true);
    const currentAuthInfo = getCurrentAuthInfo();
    // const month = this.currentMonth();
    const { familyId, userId } = query || currentAuthInfo;
    const params = {
      reportMonth: '2019-05',
      familyId,
      userId,
    };

    // const params = {
    //   reportMonth: '2019-05',
    //   familyId: 184,
    //   userId: '123',
    // };

    this.props.dispatch({
      type: 'performance/groupRankList',
      payload: params,
    });
  };

  toggle = id => {
    this.setState({ id });
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
    const { id, month } = this.state;
    if (!groupRankListData.length) return <div>11</div>;
    // 默认第一个展示
    const showFirstId = groupRankListData.length && groupRankListData[0].itemId;
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
            {groupRankListData.map(item => {
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
                    <ul className={styles.list1}>
                      {this.renderIem1(item.itemId, item.classKpiList)}
                    </ul>
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
