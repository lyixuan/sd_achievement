import React from 'react';
import { connect } from 'dva';
import { assignUrlParams } from 'utils/routerUtils';
import { getCurrentAuthInfo } from 'utils/localStorage';
import MonthlyChart from 'container/MonthlyChart';
import RosePie from 'components/Charts/PieCharts/RosePie';
import ProportionBar from 'components/Charts/BarCharts/ProportionBar';

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

  render() {
    const { chartData, barChartData, toLevelPage } = this.props;
    return (
      <div>
        <MonthlyChart
          toLevelPage={() => {
            toLevelPage();
          }}
        >
          <RosePie dataSource={{ data: chartData, title: '学院占比（家族预测绩效）' }} />
        </MonthlyChart>
        <MonthlyChart
          toLevelPage={() => {
            toLevelPage();
          }}
        >
          <ProportionBar dataSource={{ data: barChartData, title: '学院占比（小组预测绩效）' }} />
        </MonthlyChart>
      </div>
    );
  }
}
export default connect(({ loading }) => ({ loading }))(Boss);
