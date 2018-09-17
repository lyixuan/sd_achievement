import React from 'react';
import { connect } from 'dva';
import { assignUrlParams } from 'utils/routerUtils';
import { getCurrentAuthInfo } from 'utils/localStorage';
import MonthlyChart from 'container/MonthlyChart';
import Funnel from 'components/Charts/FunnelCharts/Funnel';

class Boss extends React.Component {
  constructor(props) {
    super(props);
    const { urlParams = {} } = props;
    const initState = {
      paramsObj: {
        startTime: null, // 过滤开始时间
      },
    };
    this.state = assignUrlParams(initState, urlParams);
  }
  checkoutUserAuth = () => {
    const currentAuthInfo = getCurrentAuthInfo() || {};
    const { groupType = null } = currentAuthInfo;
    return groupType;
  };
  calculateNumber = (data = []) => {
    // 如果集团总绩效为0的话,不进行展示数据
    return data
      .map(item => {
        let val =
          item.levelCount && item.total ? Number(item.levelCount) / Number(item.total) * 100 : 0;
        val = val.toFixed(2);
        return {
          ...item,
          val,
          name: item.levelValue || '',
        };
      })
      .sort((a, b) => b.val - a.val);
  };

  render() {
    const { chartData, toLevelPage } = this.props;
    let familyData = chartData.familyData || [];
    familyData = this.calculateNumber(familyData);
    let groupData = chartData.groupData || [];
    groupData = this.calculateNumber(groupData);
    return (
      <div>
        <MonthlyChart
          toLevelPage={() => {
            toLevelPage(0);
          }}
        >
          <Funnel dataSource={{ data: familyData, title: '预测绩效分档（家族）' }} />
        </MonthlyChart>
        <MonthlyChart
          toLevelPage={() => {
            toLevelPage(1);
          }}
        >
          <Funnel dataSource={{ data: groupData, title: '预测绩效分档（小组）' }} />
        </MonthlyChart>
      </div>
    );
  }
}
export default connect(({ loading }) => ({ loading }))(Boss);
