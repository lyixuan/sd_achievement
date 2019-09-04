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
class Renewal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      bflag: true,
    };
  }

  componentDidMount() {
    this.getRenewalData();
  }

  // 班主任
  // 21	人员-家族长
  // 22	人员-运营长
  // 23	人员-班主任

  getRenewalData = () => {
    const { query } = url.parse(this.props.location.search, true);
    const { familyId = null, userId = null, userType = null, groupId = null } = query;
    const params = {
      reportMonth: this.currentMonth(),
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
      type: 'performance/findRenewalKpiDetail',
      payload: params,
    });
  };

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
    const { findRenewalKpiDetailData } = this.props.performance;
    let totalkpi = 0;
    const totalArr = [];
    let showFirstId = 0;
    if (findRenewalKpiDetailData) {
      findRenewalKpiDetailData.map(item => {
        // eslint-disable-next-line
        showFirstId = item.renewalOrderList.length === 0 ? -1 : 0; //是否要展示第一个
        // eslint-disable-next-line
        totalArr.push(item.totalKpi);
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
        title: '净流水(元)',
        dataIndex: 'financeNetFlow',
        key: 'financeNetFlow',
      },
    ];

    const columnsDataMeta = [
      {
        title: '岗位',
        dataIndex: 'positionType',
        key: 'positionType',
      },
      {
        title: '岗位提点',
        dataIndex: 'positionPointKpi',
        key: 'positionPointKpi',
      },
      {
        title: '净流水总额',
        dataIndex: 'totalFinanceNetFlow',
        key: 'totalFinanceNetFlow',
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
    return (
      <div>
        {!loading && (
          <div className={styles.performanceConBg2}>
            <img
              src={bg2}
              alt="续报"
              style={{ position: 'absolute', zIndex: '-1', width: '100%' }}
            />
            <div className={styles.dateWrapBg}>
              <div className={styles.time}>{this.formate()}</div>
            </div>
            <div className={styles.teacherContent}>
              <div className={styles.meta}>
                <span className={styles.total}>{findRenewalKpiDetailData ? totalkpi : '0'}</span>
                <span className={styles.price}>元</span>
              </div>
              <div className={styles.middle}>
                <p>续报绩效 = 续报净流水 x 岗位提点</p>
              </div>
              {findRenewalKpiDetailData && (
                <div className={styles.presidentContent}>
                  <p className={styles.meta}>
                    {columnsDataMeta.map(item => {
                      return <span key={item.title}>{item.title}</span>;
                    })}
                  </p>
                  <ul className={styles.list}>
                    {findRenewalKpiDetailData.map(item => {
                      return (
                        <li
                          onClick={e =>
                            this.toggle(e, item.index, (index || showFirstId) === item.index)
                          }
                          key={item.positionType}
                        >
                          <div className={styles.items}>
                            <span>{item.positionType}</span>
                            <span>{item.positionPointKpi}%</span>
                            <span>{item.totalFinanceNetFlow}</span>
                            <span>{item.totalKpi}</span>
                            <span
                              // onClick={() => this.toggle(item.index)}
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
                                color={item.renewalOrderList.length === 0 ? '#ccc' : '#00ccc3'}
                              />
                            </span>
                          </div>

                          <div
                            style={{
                              display:
                                (index || showFirstId) === item.index && bflag ? 'block' : 'none',
                            }}
                          >
                            {item.renewalOrderList.length !== 0 && (
                              <Table
                                history={this.props.history}
                                columnsData={columnsData}
                                rowData={item.renewalOrderList}
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
}))(Renewal);
