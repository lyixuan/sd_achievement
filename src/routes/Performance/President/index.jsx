import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd-mobile';
import Loading from 'components/Loading/Loading';
import url from 'url';
import { setItem } from 'utils/localStorage';
import { getCurrentAuthInfo, getPerformanceCurrentMonth } from 'utils/decorator';
import DatePanle from 'container/DatePanle';
import noData from '../../../assets/nodata.png';
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
      bflag1: false,
    };
  }

  componentDidMount() {
    this.getPresidentData();
  }
  // 院长
  onDateChange = month => {
    setItem('month', month);
    this.setState({ month });
    this.getPresidentData(month);
  };

  getPresidentData = data => {
    const { query } = url.parse(this.props.location.search, true);
    const currentAuthInfo = getCurrentAuthInfo();
    const params = {
      reportMonth: data || this.state.month, // '2019-05',
      collegeId: (query.collegeId !== 'null' && query.collegeId) || currentAuthInfo.collegeId,
      userId: (query.userId !== 'null' && query.userId) || currentAuthInfo.userId,
    };
    this.props.dispatch({
      type: 'performance/collegeHomePage',
      payload: params,
    });
  };

  toggle = (e, id, bol) => {
    e.stopPropagation();
    const { bflag } = this.state;
    this.setState({ id, bflag: bol ? !bflag : true });
  };
  toggle1 = (e, id1, bol) => {
    const { bflag1 } = this.state;
    e.stopPropagation();
    this.setState({ id1, bflag1: bol ? !bflag1 : true });
  };

  goto = (id, id2, itemType) => {
    switch (itemType) {
      case 21: // 21	人员-家族长
        this.props.history.push({
          pathname: '/performance/family',
          search: `?familyId=${id}&userId=${id2}&userType=${itemType}`,
        });
        break;
      case 22: // 22	人员-运营长
        this.props.history.push({
          pathname: '/performance/operation',
          search: `?groupId=${id}&userId=${id2}&userType=${itemType}`,
        });
        break;
      case 23: // 21	人员-班主任
        this.props.history.push({
          pathname: '/performance/teacher',
          search: `?groupId=${id}&userId=${id2}&userType=${itemType}`,
        });
        break;
      default:
        this.props.history.push({
          pathname: '/performance/teacher',
          search: `?groupId=${id}&userId=${id2}&userType=${itemType}`,
        });
        break;
    }
  };

  renderIem2 = (id, classKpiList) => {
    if (!classKpiList || !classKpiList.length) {
      return <li className={styles.hasnone}>暂无数据</li>;
    }
    return classKpiList.map(item => {
      return (
        <li key={item.itemName} onClick={() => this.goto(id, item.itemId, item.itemType)}>
          <div className={styles.items}>
            <span>{item.itemName}</span>
            <span>{item.totalKpi}元</span>
            <span
              style={{
                alignItems: 'center',
                width: '20%',
                justifyContent: 'center',
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
  renderIem1 = (id, groupKpiList) => {
    const { id1, bflag1 } = this.state;
    return groupKpiList.map(item => {
      return (
        <li
          key={item.itemName}
          onClick={e => {
            if (item.itemType !== 1) {
              this.goto(id, item.itemId, item.itemType);
            } else {
              this.toggle1(e, item.itemId, id1 === item.itemId);
            }
          }}
        >
          <div className={styles.items}>
            <span>{item.itemName}</span>
            <span>{item.totalKpi}元</span>
            <span
              style={{
                alignItems: 'center',
                width: '20%',
                justifyContent: 'center',
                display: 'flex',
                cursor: 'pointer',
              }}
            >
              {item.itemType !== 1 && (
                <Icon
                  // onClick={() => this.goto(id, item.itemId, item.itemType)}
                  type="right"
                  size="xs"
                  color="#00ccc3"
                />
              )}
              {item.itemType === 1 && (
                <Icon
                  // onClick={e => this.toggle1(e, item.itemId, id1 === item.itemId)}
                  type={id1 === item.itemId && bflag1 ? 'up' : 'down'}
                  size="xs"
                  color="#00ccc3"
                />
              )}
            </span>
          </div>
          <ul
            style={{
              display: item.itemId === id1 && bflag1 && item.itemType === 1 ? 'block' : 'none',
            }}
            className={styles.list2}
          >
            {this.renderIem2(item.itemId, item.classKpiList)}
          </ul>
        </li>
      );
    });
  };
  render() {
    const { collegeHomePageData } = this.props.performance;
    const { id, month, bflag } = this.state;
    const { loading } = this.props;
    // 默认第一个展示
    const showFirstId =
      collegeHomePageData && collegeHomePageData.length && collegeHomePageData[0].itemId;
    return (
      <div>
        {!loading && (
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
            {collegeHomePageData && (
              <div className={styles.presidentContent}>
                <p className={styles.meta}>
                  <span>家族</span>
                  <span>绩效总额</span>
                  <span>操作</span>
                </p>
                <ul className={styles.list}>
                  {collegeHomePageData.map(item => {
                    return (
                      <li
                        key={item.itemName}
                        onClick={e =>
                          this.toggle(e, item.itemId, (id || showFirstId) === item.itemId)
                        }
                      >
                        <div className={styles.items}>
                          <span>{item.itemName}</span>
                          <span>{item.totalKpi}元</span>
                          <span
                            style={{
                              alignItems: 'center',
                              width: '20%',
                              justifyContent: 'center',
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
                            display:
                              (id || showFirstId) === item.itemId && bflag ? 'block' : 'none',
                          }}
                        >
                          {this.renderIem1(item.itemId, item.groupKpiList)}
                        </ul>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        )}
        {!loading &&
          !collegeHomePageData && <img src={noData} alt="nodata" className={styles.noData} />}
        {loading && <Loading />}
      </div>
    );
  }
}

export default connect(({ performance, loading }) => ({
  performance,
  loading: loading.models.performance,
}))(President);
