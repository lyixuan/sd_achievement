import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { getCurrentAuthInfo } from 'utils/decorator';
import { assignUrlParams } from 'utils/routerUtils';
import Loading from 'components/Loading/Loading';
import HistoryFamily from './family';
import HistoryGroup from './group';
import styles from './index.less';
import common from '../index.less';
import SurePer from '../../../assets/surePer.png';
import { timeArea } from '../../../utils/timeArea';
import { formatMoney } from '../../../utils/utils';

@getCurrentAuthInfo
class HistoryTeacher extends React.Component {
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
    const { loginUserId, groupType } = this.currentAuthInfo();
    const { month } = this.state;
    this.props.dispatch({
      type: 'historyhome/findIndividualHistoryKPI',
      payload: { entUserId: loginUserId, month },
    });
    if (groupType === 'group') {
      this.getGroupHistoryBarData();
    }
  };
  getGroupHistoryBarData = () => {
    const {
      loginUserId,
      groupType,
      collegeId,
      familyId,
      groupId,
      userId,
      familyType,
    } = this.currentAuthInfo();
    const { month } = this.state;
    this.props.dispatch({
      type: 'historyhome/findClassKpiList',
      payload: {
        entUserId: loginUserId,
        month,
        groupType,
        collegeId,
        familyId,
        groupId,
        userId,
        familyType,
      },
    });
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
  toDetailsPage = () => {
    const month = this.state.month || new Date();
    const year = moment(month).year();
    const newMonth = moment(month).month();
    const monthData = `${year}-${newMonth}`;
    this.props.setRouteUrlParams('/history/details', { type: 1, month: monthData });
  };
  render() {
    const { loading } = this.props;
    const historyhome = this.props.historyhome || {};
    const { teacherKpiObj = {}, classKpiList = [] } = historyhome;
    const timeDateObj = this.formateDate();
    const { groupType = null } = this.currentAuthInfo();
    return (
      <div style={{ background: '#EDF0F3' }}>
        <div className={common.historyBanner} />
        <div className={styles.m_wrapcontener}>
          <div className={styles.m_imgDiv}>
            <img src={SurePer} alt="logo" className={styles.u_imgCls} />
          </div>
          <div className={styles.m_wordContent}>
            <p>亲爱的甘文斌</p>
            <p>辛苦啦，感谢您在{timeDateObj.month}月份努力的付出！</p>
            <p className={styles.u_timeCls}>您{timeDateObj.month}月份确定绩效为</p>
            <p className={styles.u_resultlCls}>{formatMoney(teacherKpiObj.actual_kpi || 0)}元</p>
            <div style={{ height: '0.54rem' }} />
            <div
              style={{
                width: '6.5rem',
                margin: 'auto',
                background: ' #F8FAFB',
                borderRadius: '0.08rem',
              }}
            >
              <p
                style={{
                  textAlign: 'left',
                  fontSize: '0.26rem',
                  color: '#333',
                  margin: ' auto 0.3rem',
                  paddingTop: '0.25rem',
                  paddingBottom: '0.25rem',
                }}
              >
                实发合计中包含以下数据
              </p>

              <div
                style={{ height: '0.02rem', width: '6rem', background: '#eee', margin: 'auto' }}
              />
              <p
                style={{
                  textAlign: 'left',
                  fontSize: '0.26rem',
                  color: '#6D6D75',
                  margin: '0.1rem 0.3rem',
                }}
              >
                <span style={{ textAlign: 'left', width: '2.9rem', display: 'inline-block' }}>
                  虚报绩效考核金额
                </span>
                <span style={{ textAlign: 'right', width: '2.8rem', display: 'inline-block' }}>
                  {formatMoney(teacherKpiObj.keep_kpi || 0)}元
                </span>
              </p>
              <p
                style={{
                  textAlign: 'left',
                  fontSize: '0.26rem',
                  color: '#6D6D75',
                  margin: '0.1rem  0.3rem',
                }}
              >
                <span style={{ textAlign: 'left', width: '2.9rem', display: 'inline-block' }}>
                  免费学绩效金额
                </span>
                <span style={{ textAlign: 'right', width: '2.8rem', display: 'inline-block' }}>
                  {formatMoney(teacherKpiObj.free_kpi || 0)}元
                </span>
              </p>
              <p
                style={{
                  textAlign: 'left',
                  fontSize: '0.26rem',
                  color: '#6D6D75',
                  margin: '0.1rem 0.3rem',
                }}
              >
                <span style={{ textAlign: 'left', width: '2.9rem', display: 'inline-block' }}>
                  其他绩效
                </span>
                <span style={{ textAlign: 'right', width: '2.8rem', display: 'inline-block' }}>
                  {formatMoney(teacherKpiObj.other_kpi || 0)}元
                </span>
              </p>
              <div style={{ height: '0.3rem' }} />
            </div>
            <div style={{ height: '0.4rem' }} />
          </div>
        </div>

        <div className={styles.m_innercontener}>
          <div style={{ height: '0.12rem' }} />
          <p className={styles.u_spanWorld}>* 确定绩效为本月整月的总绩效</p>
          <p className={styles.u_spanWorld}>
            * 满足税额后，总部人力会进行预扣税再发放，实发金额请以实际到账为准
          </p>
        </div>
        <div>
          {groupType === 'family' && <HistoryFamily toDetailsPage={this.toDetailsPage} />}
          {groupType === 'group' && <HistoryGroup dataSource={classKpiList} />}
        </div>
        {loading && <Loading />}
      </div>
    );
  }
}
export default connect(({ loading, historyhome }) => ({
  loading: loading.models.historyhome,
  historyhome,
}))(HistoryTeacher);
