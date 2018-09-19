import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { assignUrlParams } from 'utils/routerUtils';
import { getCurrentAuthInfo } from 'utils/decorator';
import MonthlyChart from 'container/MonthlyChart';
import Loading from 'components/Loading/Loading';
import Funnel from 'components/Charts/FunnelCharts/Funnel';
import styles from './index.less';
import common from '../index.less';
import { timeArea } from '../../../utils/timeArea';

@getCurrentAuthInfo
class HistoryBoss extends React.Component {
  constructor(props) {
    super(props);
    const { urlParams = {} } = props;
    const dateVal = timeArea();
    const { maxDate } = dateVal;
    const initState = {
      month: maxDate,
    };
    this.state = assignUrlParams(initState, urlParams);
  }
  componentDidMount() {
    this.getData();
  }
  getData = () => {
    const { userId, collegeId, groupType } = this.currentAuthInfo();
    const { month } = this.state;
    this.props.dispatch({
      type: 'historyhome/findHistoryKpiBracket',
      payload: { userId, collegeId, groupType, month },
    });
  };

  toLevelPage = type => {
    this.props.setRouteUrlParams('/history/details', { type });
  };
  formateDate = () => {
    const month = this.state.month || new Date();
    const year = moment(month).year();
    const newMonth = moment(month).month();
    return {
      year,
      month: newMonth + 1 >= 10 ? newMonth : `0${newMonth + 1}`,
    };
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
    const timeDateObj = this.formateDate();
    const { loading } = this.props;
    const historyhome = this.props.historyhome || {};
    const bossKpiBracketObj = historyhome.bossKpiBracketObj || {};
    let familyData = bossKpiBracketObj.familyData || [];
    familyData = this.calculateNumber(familyData);
    let groupData = bossKpiBracketObj.groupData || [];
    groupData = this.calculateNumber(groupData);
    return (
      <div>
        <div className={common.historyBanner} />
        <div>
          <p className={styles.u_pCls}>
            {timeDateObj.year}年{timeDateObj.month}月
          </p>
          <p className={styles.u_spanCls}>* 实发金额以财务部税后实发为准</p>
          <MonthlyChart
            toLevelPage={() => {
              this.toLevelPage(0);
            }}
          >
            <Funnel dataSource={{ data: familyData, title: '预测绩效分档（家族）' }} />
          </MonthlyChart>
          <MonthlyChart
            toLevelPage={() => {
              this.toLevelPage(1);
            }}
          >
            <Funnel dataSource={{ data: groupData, title: '预测绩效分档（小组）' }} />
          </MonthlyChart>
        </div>
        {loading && <Loading />}
      </div>
    );
  }
}
export default connect(({ loading, historyhome }) => ({
  loading: loading.models.historyhome,
  historyhome,
}))(HistoryBoss);
