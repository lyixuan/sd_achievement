import React from 'react';
import { connect } from 'dva';
import { getCurrentAuthInfo } from 'utils/decorator';
import DatePanle from 'container/DatePanle';
import Loading from 'components/Loading/Loading';
import { assignUrlParams } from 'utils/routerUtils';
import styles from './index.less';
import ButtonFile from './_buttonFile';
import TableFile from './_tableFile';
import TeacherPer from './_teacherPer';
import Bitmap from '../../../assets/Bitmap.png';
import Right from '../../../assets/right.svg';
import { timeArea } from '../../../utils/timeArea';
import { formatMoney } from '../../../utils/utils';

@connect(({ teacherhome, loading }) => ({
  teacherhome,
  interfaceDetail: loading.effects['teacherhome/findFamilyDetailKpi'],
  interfaceKpi: loading.effects['teacherhome/findKpiLevel'],
}))
@getCurrentAuthInfo
class Teacher extends React.Component {
  constructor(props) {
    super(props);
    const { urlParams = {} } = props;
    const dateVal = timeArea();
    const { maxDate } = dateVal;
    // console.log('公共参数', this.currentAuthInfo);
    const {
      groupType = 'family',
      collegeId = null,
      userId = null,
      familyId = null,
      groupId = null,
      familyType = 1,
    } = this.currentAuthInfo;
    const userFlag = groupType === 'family' ? 1 : 2;
    const initState = {
      paramsObj: {
        startTime: null, // 过滤开始时间
      },
      flag: userFlag, // 判断是家族长1,运营长2
      tabFlag: 1, // tab切换标记 0 日均学分排名系数 1绩效基数 2管理规模系数 3绩效比例
      dateTime: maxDate,
      groupType, // 用户角色：family/group/class
      collegeId,
      userId,
      familyId,
      groupId,
      familyType,
    };
    this.state = assignUrlParams(initState, urlParams);
  }

  componentDidMount() {
    const {
      groupType = 'family',
      collegeId = null,
      userId = null,
      familyId = null,
      groupId = null,
      // familyType = 0,
      dateTime = null,
    } = this.state;
    const detailKpiParams = {
      groupType,
      collegeId,
      familyId,
      groupId,
      familyType: 0,
      userId,
      month: dateTime,
    };
    const kpiLevelParams = {
      groupType,
      collegeId,
      familyId,
      groupId,
      familyType: 0,
      userId,
      month: this.state.dateTime,
      type: 0,
    };
    this.detailKpiFetch(detailKpiParams, 0, kpiLevelParams);
  }

  onDateChange = date => {
    if (this.state.dateTime !== date) {
      const {
        groupType = 'family',
        collegeId = null,
        userId = null,
        familyId = null,
        groupId = null,
        // familyType = 0,
      } = this.state;
      const detailKpiParams = {
        groupType,
        collegeId,
        familyId,
        groupId,
        familyType: 0,
        userId,
        month: date,
      };
      const val =
        this.state.tabFlag === 3 ? (this.state.flag === 1 ? 2 : 3) : this.state.tabFlag - 1;
      const kpiLevelParams = {
        groupType,
        collegeId,
        familyId,
        groupId,
        familyType: 0,
        userId,
        month: date,
        type: val,
      };

      this.detailKpiFetch(detailKpiParams, val, kpiLevelParams);
      this.setState({ dateTime: date });
    }
  };
  // 请求model中的detailKpi方法
  detailKpiFetch(detailKpiParams, flagVal, kpiLevelParams) {
    const sendParams = {
      detailKpiParams,
      flagVal,
      kpiLevelParams,
    };
    this.props.dispatch({
      type: 'teacherhome/detailKpi',
      payload: sendParams,
    });
  }
  // 请求model中的findKpiLevel方法
  kpiLevelFetch(kpiLevelParams) {
    const sendParams = {
      kpiLevelParams,
    };
    this.props.dispatch({
      type: 'teacherhome/findKpiLevel',
      payload: sendParams,
    });
  }

  jumpDetail = name => {
    const { month = null, groupType = 'family' } = this.state;
    this.props.setRouteUrlParams('/details', {
      month,
      groupType,
      collegeName: name,
      type: 1,
    });
  };
  buttonChange = item => {
    let aa = item.score;
    if (typeof aa === 'string' && aa.indexOf('%') !== -1) {
      aa = aa.replace('%', '');
    }

    if (this.state.tabFlag !== item.id) {
      const val = item.id === 3 ? (this.state.flag === 1 ? 2 : 3) : item.id - 1;
      const {
        groupType = 'family',
        collegeId = null,
        userId = null,
        familyId = null,
        groupId = null,
        // familyType = 0,
        dateTime = null,
      } = this.state;
      const kpiLevelParams = {
        groupType,
        collegeId,
        familyId,
        groupId,
        familyType: 0,
        userId,
        month: dateTime,
        type: val,
        levelVal: Number(aa),
      };
      this.kpiLevelFetch(kpiLevelParams);
      this.setState({ tabFlag: item.id });
    }
  };

  render() {
    const { flag, tabFlag, dateTime, groupType } = this.state;
    const detailKpiData = !this.props.teacherhome.detailKpiData
      ? []
      : !this.props.teacherhome.detailKpiData.data ? [] : this.props.teacherhome.detailKpiData.data;
    const kpiLevelData = !this.props.teacherhome.kpiLevelData
      ? []
      : !this.props.teacherhome.kpiLevelData.data ? [] : this.props.teacherhome.kpiLevelData.data;

    const { base = 0, mark = 0, total = 0 } = !detailKpiData ? {} : detailKpiData;
    const { interfaceDetail, interfaceKpi } = this.props;

    const { name = null } = !detailKpiData ? {} : detailKpiData;
    return (
      <div>
        <DatePanle
          defaultDate={dateTime}
          onChange={date => {
            this.onDateChange(date);
          }}
        />
        {interfaceDetail && interfaceKpi && <Loading />}
        <div className={styles.m_performanceContener}>
          <span className={styles.u_totalNum}>{formatMoney(total || 0)}元</span>
          <div className={styles.m_performanceMoney}>
            <div className={styles.u_basicMoney}>
              <div className={styles.u_contentDiv}>
                <span className={styles.u_spanMoney}>{formatMoney(base || 0)}</span>
                <br />
                <span className={styles.u_spanBasic}>基本绩效</span>
              </div>
            </div>
            <div className={styles.u_splitLine} />
            <div className={styles.u_scoreMoney}>
              <div className={styles.u_contentDiv}>
                <span className={styles.u_spanMoney}>{formatMoney(mark || 0)}</span>
                <br />
                <span className={styles.u_spanBasic}>打分绩效</span>
              </div>
            </div>
          </div>
          <div style={{ height: '0.2rem', width: '100%' }} />
        </div>

        <div className={styles.m_warningP}>
          <p className={styles.u_pContent}>
            *预估绩效每天与小德学分同步更新；学院打分绩效为浮动绩效，月底根据本月工作表现确定实发绩效
          </p>
        </div>

        <ButtonFile
          flag2={tabFlag}
          flag={flag}
          dataSource={detailKpiData}
          changeFlag={item => this.buttonChange(item)}
        />
        <TableFile
          flag2={tabFlag}
          flag={flag}
          dataSource={kpiLevelData}
          titleData={detailKpiData}
        />

        <div style={{ display: flag === 2 && groupType === 'group' ? 'block' : 'none' }}>
          <TeacherPer dataSource={detailKpiData} />
        </div>

        <div
          className={styles.m_familyGroup}
          style={{ display: flag === 1 ? 'block' : 'none' }}
          onClick={() => this.jumpDetail(name)}
        >
          <div className={styles.u_pRight}>
            <img src={Bitmap} alt="logo" className={styles.u_imgLogo} />
          </div>
          <div className={styles.u_warpCls}>
            <span className={styles.u_pCls}>小组绩效</span>
          </div>
          <div className={styles.u_pLast}>
            <img src={Right} alt="rightArrow" className={styles.u_rightArrow} />
          </div>
        </div>
      </div>
    );
  }
}
export default Teacher;
