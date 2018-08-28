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

  render() {
    const { FunnelChartData, toLevelPage } = this.props;
    return (
      <div>
        <MonthlyChart
          toLevelPage={() => {
            toLevelPage();
          }}
        >
          <Funnel dataSource={{ data: FunnelChartData, title: '预测绩效分档（家族）' }} />
        </MonthlyChart>
        <MonthlyChart
          toLevelPage={() => {
            toLevelPage();
          }}
        >
          <Funnel dataSource={{ data: FunnelChartData, title: '预测绩效分档（小组）' }} />
        </MonthlyChart>
      </div>
    );
  }
}
export default connect(({ loading }) => ({ loading }))(Boss);
