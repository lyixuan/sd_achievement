import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd-mobile';
import url from 'url';
import moment from 'moment';
import { getItem } from 'utils/localStorage';
import { getCurrentAuthInfo, getPerformanceCurrentMonth } from 'utils/decorator';
import Table from '../component/table';
import styles from './index.less';
import bg2 from '../../../assets/bg2.png';

@getCurrentAuthInfo
@getPerformanceCurrentMonth
class GoodPush extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      month: this.currentMonth(),
      // collegeId,
      // userId,
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
    // const params = {
    //   reportMonth: '2019-05',
    //   userType: 'group',
    //   userId: '537',
    // };
    // this.props.dispatch({
    //   type: 'performance/findGoodpushKpiDetail',
    //   payload: params,
    // });
  };

  toggle = index => {
    this.setState({ index });
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
    const { index } = this.state;
    const { findGoodpushKpiDetailData } = this.props.performance;
    const showFirstId = 0;
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
        title: '听课时长(分)',
        dataIndex: 'lecturesTime',
        key: 'lecturesTime',
      },
      {
        title: '净流水(元)',
        dataIndex: 'financeNetFlow',
        key: 'financeNetFlow',
      },
      {
        title: '好推净流水系数',
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
    return (
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
            <span className={styles.total}>18902</span>
            <span className={styles.price}>元</span>
          </div>
          <div className={styles.middle}>
            <p>好推绩效 = 好推净流水 x 好推净流水系数</p>
          </div>
          <div className={styles.presidentContent}>
            <p className={styles.meta}>
              {columnsDataMeta.map(item => {
                return <span key={item.title}>{item.title}</span>;
              })}
            </p>
            <ul className={styles.list}>
              {findGoodpushKpiDetailData.map(item => {
                return (
                  <li key={item.positionType}>
                    <div className={styles.items}>
                      <span>{item.positionType}</span>
                      <span>{item.positionDistribution}</span>
                      <span>{item.totalKpi}</span>
                      <span
                        onClick={() => this.toggle(item.itemId)}
                        style={{
                          alignItems: 'center',
                          width: '10%',
                          display: 'flex',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <Icon
                          type={(index || showFirstId) === item.index ? 'up' : 'down'}
                          size="xs"
                          color="#00ccc3"
                        />
                      </span>
                    </div>
                    {(index || showFirstId) === item.index && (
                      <Table
                        history={this.props.history}
                        columnsData={columnsData}
                        rowData={item.renewalOrderList}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ performance, loading }) => ({
  performance,
  isloading: loading.models.performance,
}))(GoodPush);
