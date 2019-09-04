import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd-mobile';
import url from 'url';
import moment from 'moment';
import Loading from 'components/Loading/Loading';
import { getItem } from 'utils/localStorage';
import { getCurrentAuthInfo, getPerformanceCurrentMonth } from 'utils/decorator';
import Table from '../component/table';
import styles from './index.less';
import bg2 from '../../../assets/bg2.png';
import { plus } from '../../../utils/utils';

@getCurrentAuthInfo
@getPerformanceCurrentMonth
class GoodPush extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      month: this.currentMonth(),
      bflag: true,
    };
  }

  componentDidMount() {
    this.getRenewalData();
  }

  // 班主任
  getRenewalData = () => {
    const { query } = url.parse(this.props.location.search, true);
    const { familyId = null, userId = null, userType = null, groupId = null } = query;
    const { month } = this.state;
    const params = {
      reportMonth: month,
      userId,
    };
    if (userType === '21') {
      params.userType = 'family';
      params.familyId = familyId;
    }

    if (userType === '22') {
      params.userType = 'group';
      params.groupId = groupId;
    }

    if (userType === '23') {
      params.userType = 'class';
      params.groupId = groupId;
    }
    this.props.dispatch({
      type: 'performance/findGoodpushKpiDetail',
      payload: params,
    });
  };

  // toggle = index => {
  //   this.setState({ index });
  // };

  toggle = (e, index, bol) => {
    e.stopPropagation();
    const { bflag } = this.state;
    this.setState({ index, bflag: bol ? !bflag : true });
  };

  formate = () => {
    const currMonth = getItem('month');
    const dateListMonth = getItem('timeDatePerformance').value;
    return dateListMonth.map(item => {
      if (currMonth.value === item.kpiMonth) {
        const start = moment(item.startDate).format('YYYY-MM-DD');
        const end = moment(item.endDate).format('YYYY-MM-DD');
        return `时间: ${start} ~ ${end}`;
      }
      return '';
    });
  };

  render() {
    const { index, bflag } = this.state;
    const { loading } = this.props;
    const { findGoodpushKpiDetailData } = this.props.performance;
    let totalkpi = 0;
    const totalArr = [];
    let showFirstId = 0;
    if (findGoodpushKpiDetailData) {
      findGoodpushKpiDetailData.map(item => {
        // eslint-disable-next-line
        showFirstId = item.goodpushOrderList.length === 0 ? -1 : 0;
        // eslint-disable-next-line
        return showFirstId;
      });
    }
    if (totalArr.length) {
      totalkpi = totalArr.reduce((total, curent) => {
        return plus(total, curent);
      });
    }

    const columnsData = [
      {
        title: '报名日期',
        dataIndex: 'registrationDate',
        key: 'registrationDate',
      },
      {
        title: '子订单ID',
        dataIndex: 'subOrderId',
        key: 'subOrderId',
      },
      {
        title: '重播听课',
        dataIndex: 'replayLecturesTime',
        key: 'replayLecturesTime',
      },
      {
        title: '直播听课',
        dataIndex: 'liveLecturesTime',
        key: 'liveLecturesTime',
      },
      {
        title: '绩效流水',
        dataIndex: 'financeNetFlow',
        key: 'financeNetFlow',
      },
      {
        title: '系数',
        dataIndex: 'goodpushValue',
        key: 'goodpushValue',
      },
    ];

    const columnsDataMeta = [
      {
        title: '岗位',
        dataIndex: 'positionType',
        key: 'positionType',
      },
      {
        title: '岗位分配比',
        dataIndex: 'positionDistribution',
        key: 'positionDistribution',
      },
      {
        title: '绩效',
        dataIndex: 'totalKpi',
        key: 'totalKpi',
      },
      {
        title: '操作',
        dataIndex: '操作',
        key: '操作',
      },
    ];

    const params = {
      fontSize: '0.2rem',
    };
    return (
      <div>
        {!loading && (
          <div className={styles.performanceConBg2}>
            <img
              src={bg2}
              alt="好推绩效"
              style={{ position: 'absolute', zIndex: '-1', width: '100%' }}
            />
            <div className={styles.dateWrapBg}>
              <div className={styles.time}>{this.formate()}</div>
            </div>
            <div className={styles.teacherContent}>
              <div className={styles.meta}>
                <span className={styles.total}>{totalkpi}</span>
                <span className={styles.price}>元</span>
              </div>
              <div className={styles.middle}>
                <p>好推绩效 = 好推净流水 x 好推净流水系数 </p>
                <p>x 好推岗位分配比</p>
              </div>
              {findGoodpushKpiDetailData && (
                <div className={styles.presidentContent}>
                  <p className={styles.meta}>
                    {columnsDataMeta.map(item => {
                      return <span key={item.title}>{item.title}</span>;
                    })}
                  </p>
                  <ul className={styles.list}>
                    {findGoodpushKpiDetailData.map(item => {
                      return (
                        <li
                          onClick={e =>
                            this.toggle(e, item.index, (index || showFirstId) === item.index)
                          }
                          key={item.positionType}
                        >
                          <div className={styles.items}>
                            <span>{item.positionType}</span>
                            <span>{item.positionDistribution}%</span>
                            <span>{item.totalKpi}</span>
                            <span
                              style={{
                                alignItems: 'center',
                                width: '10%',
                                display: 'flex',
                                justifyContent: 'center',
                                cursor: 'pointer',
                              }}
                            >
                              <Icon
                                type={
                                  (index || showFirstId) === item.index && bflag ? 'up' : 'down'
                                }
                                size="xs"
                                color={item.goodpushOrderList.length === 0 ? '#ccc' : '#00ccc3'}
                              />
                            </span>
                          </div>
                          <div
                            style={{
                              display:
                                (index || showFirstId) === item.index && bflag ? 'block' : 'none',
                            }}
                          >
                            {item.goodpushOrderList.length !== 0 && (
                              <Table
                                params={params}
                                history={this.props.history}
                                columnsData={columnsData}
                                rowData={item.goodpushOrderList}
                              />
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
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
}))(GoodPush);
