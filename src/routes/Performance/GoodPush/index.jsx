import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd-mobile';
import { getCurrentAuthInfo, getCurrentMonth } from 'utils/decorator';
import DatePanle from 'container/DatePanle';
import Table from '../component/table';
import styles from './index.less';

@getCurrentAuthInfo
@getCurrentMonth
class GoodPush extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
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
    // const { month, collegeId, userId } = this.state;
    // const params = {
    //   reportMonth: month,
    //   collegeId: 111,
    //   userId: userId,
    // };
    const params = {
      reportMonth: '2019-05',
      userType: 'group',
      userId: '537',
    };
    this.props.dispatch({
      type: 'performance/findGoodpushKpiDetail',
      payload: params,
    });
  };

  render() {
    const { month, id } = this.state;
    const { findGoodpushKpiDetailData } = this.props.performance;
    const showFirstId = findGoodpushKpiDetailData.length && findGoodpushKpiDetailData[0].itemId;
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
        <div className={styles.dateWrapBg}>
          <DatePanle
            isColor
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
                          type={(id || showFirstId) === item.itemId ? 'up' : 'down'}
                          size="xs"
                          color="#00ccc3"
                        />
                      </span>
                    </div>
                    {(id || showFirstId) === item.itemId && (
                      <Table columnsData={columnsData} rowData={item.renewalOrderList} />
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
