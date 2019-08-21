import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd-mobile';
import { getCurrentAuthInfo, getCurrentMonth } from 'utils/decorator';
import DatePanle from 'container/DatePanle';
import Table from '../component/table';
import styles from './index.less';

@getCurrentAuthInfo
@getCurrentMonth
class Renewal extends React.Component {
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
      type: 'performance/findRenewalKpiDetail',
      payload: params,
    });
  };

  render() {
    const { month, id } = this.state;
    const { findRenewalKpiDetailData } = this.props.performance;
    const showFirstId = findRenewalKpiDetailData.length && findRenewalKpiDetailData[0].itemId;
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
            <p>续报绩效 = 续报净流水 x 岗位提点</p>
          </div>
          <div className={styles.presidentContent}>
            <p className={styles.meta}>
              {columnsDataMeta.map(item => {
                return <span key={item.title}>{item.title}</span>;
              })}
            </p>
            <ul className={styles.list}>
              {findRenewalKpiDetailData.map(item => {
                return (
                  <li key={item.positionType}>
                    <div className={styles.items}>
                      <span>{item.positionType}</span>
                      <span>{item.positionPointKpi}</span>
                      <span>{item.totalFinanceNetFlow}</span>
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
                      // <ul className={styles.list1}>{this.renderIem1(item.renewalOrderList)}</ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          {/* {<Table columnsData={columnsData} rowData={findRenewalKpiDetailData} />} */}
        </div>
      </div>
    );
  }
}

export default connect(({ performance, loading }) => ({
  performance,
  isloading: loading.models.performance,
}))(Renewal);
