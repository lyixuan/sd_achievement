import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd-mobile';
import url from 'url';
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
  // 21	人员-家族长
  // 22	人员-运营长
  // 23	人员-班主任

  getRenewalData = () => {
    const { query } = url.parse(this.props.location.search, true);
    const { familyId = null, userId = null, userType = null, groupId = null } = query;
    const params = {
      reportMonth: '2019-05',
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

  toggle = index => {
    this.setState({ index });
  };

  render() {
    const { month, index } = this.state;
    const { findRenewalKpiDetailData } = this.props.performance;
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
                        onClick={() => this.toggle(item.index)}
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
