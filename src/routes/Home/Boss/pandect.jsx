import React from 'react';
import { connect } from 'dva';
import { assignUrlParams } from 'utils/routerUtils';
import { getCurrentAuthInfo } from 'utils/localStorage';
import ProportionBar from 'components/Charts/BarCharts/ProportionBar';
import Funnel from 'components/Charts/FunnelCharts/Funnel';
import RosePie from 'components/Charts/PieCharts/RosePie';
import AllGroupPandect from 'container/AllGroupPandect';
import PerGroupPandect from 'container/PerGroupPandect';
import ButtonGroup from 'components/ButtonGroup/ButtonGroup';

import styles from './pandect.less';

class Boss extends React.Component {
  constructor(props) {
    super(props);
    const { urlParams = {} } = props;
    const initState = {
      paramsObj: {
        startTime: null, // 过滤开始时间
      },
      chartData: [
        { val: 3, name: '2018.03', isPredicted: 0 },
        { val: 5, name: '2018.04', isPredicted: 0 },
        { val: 7, name: '2018.05', isPredicted: 0 },
        { val: 10, name: '2018.06', isPredicted: 1 },
        { val: 1, name: '2018.07', isPredicted: 1 },
      ],
      chartZhanbi: [
        { val: 30, name: '拍学院' },
        { val: 50, name: '自变量' },
        { val: 70, name: '好波' },
        { val: 10, name: '芝士' },
        { val: 30, name: '葫芦' },
      ],
      chartMulti: [
        { val: 10, name: '2018.03', isPredicted: 0, baseMoney: 0, markMoney: 0 },
        { val: 14, name: '2018.04', isPredicted: 0, baseMoney: 0, markMoney: 0 },
        { val: 15, name: '2018.05', isPredicted: 0, baseMoney: 0, markMoney: 0 },
        { val: 16, name: '2018.06', isPredicted: 1, baseMoney: 9, markMoney: 7 },
        { val: 17, name: '2018.07', isPredicted: 1, baseMoney: 10, markMoney: 7 },
      ],
      FunnelChartData: [
        { val: 30, type: 1 },
        { val: 10, type: 2 },
        { val: 10, type: 3 },
        { val: 70, type: 4 },
      ],
      pieChartData: [
        { val: 70, name: '睿博' },
        { val: 60, name: '芝士' },
        { val: 50, name: '自变量' },
        { val: 40, name: 'π学院' },
        { val: 30, name: '狐罗' },
        { val: 20, name: '泰罗' },
        { val: 10, name: '浩博' },
      ],
    };
    this.state = assignUrlParams(initState, urlParams);
  }

  onChangeAllGroup = id => {
    console.log(id);
  };
  checkoutUserAuth = () => {
    const currentAuthInfo = getCurrentAuthInfo() || {};
    const { groupType = null } = currentAuthInfo;
    return groupType;
  };

  render() {
    const { chartData, chartZhanbi, chartMulti, FunnelChartData, pieChartData } = this.state;
    const groupList = [
      { id: 1, name: '全体总绩效' },
      { id: 2, name: '家族长绩效' },
      { id: 3, name: '运营长绩效' },
      { id: 4, name: '班主任绩效' },
    ];
    return (
      <div>
        绩效总览页面,权限是:{this.checkoutUserAuth()}
        <AllGroupPandect dataSource={{ data: chartMulti, title: '集团总绩效' }}>
          <div className={styles.buttonContainer}>
            <ButtonGroup
              dataSource={{ data: groupList }}
              dataReturnFun={id => {
                this.onChangeAllGroup(id);
              }}
              btnClass={styles.btnClass}
              btnSelectedClass={styles.btnSelectedClass}
            />
          </div>
        </AllGroupPandect>
        <PerGroupPandect dataSource={{ data: chartData, title: '集团人均绩效' }}>
          <div className={styles.buttonContainer}>
            <ButtonGroup
              dataSource={{ data: groupList }}
              dataReturnFun={id => {
                this.onChangeAllGroup(id);
              }}
              btnClass={styles.btnClass}
              btnSelectedClass={styles.btnSelectedClass}
            />
          </div>
        </PerGroupPandect>
        <div className={styles.chart}>
          <ProportionBar dataSource={{ data: chartZhanbi, title: '集团人均绩效' }} />
        </div>
        <div className={styles.chart}>
          <Funnel dataSource={{ data: FunnelChartData, title: '集团人均绩效' }} />
        </div>
        <div className={styles.chart}>
          <RosePie dataSource={{ data: pieChartData, title: '集团人均绩效' }} />
        </div>
      </div>
    );
  }
}
export default connect(({ loading }) => ({ loading }))(Boss);
