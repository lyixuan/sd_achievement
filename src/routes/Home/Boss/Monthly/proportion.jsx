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
  calculateNumber = (data = []) => {
    // 如果集团总绩效为0的话,不进行展示数据
    if (data.length > 0 && data[0].companyAchievement) {
      return data
        .map(item => {
          let val =
            item.companyAchievement && item.collegeAchievement
              ? Number(item.collegeAchievement) / Number(item.companyAchievement) * 100
              : 0;
          val = val.toFixed(2);
          return {
            ...item,
            val,
          };
        })
        .sort((a, b) => b.val - a.val);
    } else {
      return [];
    }
  };

  render() {
    const { chartData, toLevelPage } = this.props;
    let familyData = chartData.familyData || [];
    let groupData = chartData.groupData || [];
    familyData = this.calculateNumber(familyData);
    groupData = this.calculateNumber(groupData);
    return (
      <div>
        <MonthlyChart
          toLevelPage={() => {
            toLevelPage();
          }}
        >
          <RosePie dataSource={{ data: familyData, title: '学院占比（家族预测绩效）' }} />
        </MonthlyChart>
        <MonthlyChart
          toLevelPage={() => {
            toLevelPage();
          }}
        >
          <ProportionBar dataSource={{ data: groupData, title: '学院占比（小组预测绩效）' }} />
        </MonthlyChart>
      </div>
    );
  }
}
export default connect(({ loading }) => ({ loading }))(Boss);
