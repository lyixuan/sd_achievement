import React from 'react';
import { connect } from 'dva';
import { getCurrentAuthInfo, currentPathName } from 'utils/decorator';
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

@getCurrentAuthInfo
@currentPathName
class Teacher extends React.Component {
  constructor(props) {
    super(props);
    const { urlParams = {} } = props;
    const dateVal = timeArea();
    const { maxDate } = dateVal;
    const {
      groupType = 'family',
      collegeId = null,
      userId = null,
      familyId = null,
      groupId = null,
      familyType = null,
    } = this.currentAuthInfo();
    const userFlag = groupType === 'family' ? 1 : 2;
    const initState = {
      familyType, // 自考还是壁垒
      flag: userFlag, // 判断是家族长1,运营长2
      tabFlag: 1, // tab切换标记 0 日均学分排名系数 1绩效基数 2管理规模系数 3绩效比例
      dateTime: maxDate,
      groupType, // 用户角色：family/group/class
      collegeId,
      userId,
      familyId,
      groupId,
    };
    this.state = assignUrlParams(initState, urlParams);
  }

  componentDidMount() {
    const pathname = this.checkoutUserAuthPathName(); // 检测用户权限,如果该权限不能调转到该页面的话则跳转到指定页面
    if (pathname === '/indexPage/teacher') {
      const val =
        this.state.tabFlag === 3 ? (this.state.flag === 1 ? 2 : 3) : this.state.tabFlag - 1;
      this.getData({ type: val, interfaceFlag: 1 });
    } else {
      this.props.setRouteUrlParams(pathname, {});
    }
  }
  onDateChange = date => {
    if (this.state.dateTime !== date) {
      const val =
        this.state.tabFlag === 3 ? (this.state.flag === 1 ? 2 : 3) : this.state.tabFlag - 1;
      this.getData({ type: val, dateTime: date, interfaceFlag: 1 });
      this.saveParams({ dateTime: date });
    }
  };

  getData = (params = {}) => {
    const dateTime = params.dateTime || this.state.dateTime;
    const { type = 0, interfaceFlag = 1, levelVal = 0 } = params;
    const {
      groupType = 'family',
      collegeId = null,
      userId = null,
      familyId = null,
      groupId = null,
      familyType = null,
      flag = null,
    } = this.state;
    const detailKpiParams = {
      groupType,
      collegeId,
      familyId,
      groupId,
      familyType,
      userId,
      month: dateTime,
    };
    const kpiLevelParams = {
      groupType,
      collegeId,
      familyId,
      groupId,
      familyType,
      userId,
      month: dateTime,
      type,
      levelVal,
    };
    if (interfaceFlag === 1) {
      this.detailKpiFetch(detailKpiParams, flag, type, kpiLevelParams);
    } else {
      this.kpiLevelFetch(kpiLevelParams);
    }
  };

  // 请求model中的detailKpi方法
  detailKpiFetch(detailKpiParams, userFlag, flagVal, kpiLevelParams) {
    const sendParams = {
      detailKpiParams,
      flagVal,
      kpiLevelParams,
      userFlag,
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

  // 修改的数据进行state存储以及url参数的更新
  saveParams = (params = {}) => {
    this.setState(params);
    this.props.setCurrentUrlParams(params);
  };

  // 家族长角色跳到小组详情
  jumpDetail = () => {
    const { dateTime = null } = this.state;
    this.props.setRouteUrlParams('/details', {
      month: dateTime,
      type: 1,
    });
  };
  // button切换调用的档位接口
  buttonChange = (item, manageScale, baseKpi) => {
    if (this.state.tabFlag !== item.id) {
      const num1 = !manageScale
        ? 0
        : !manageScale.classNum && manageScale.classNum !== 0 ? 0 : manageScale.classNum;
      const num2 = !baseKpi ? 0 : !baseKpi.value && baseKpi.value !== 0 ? 0 : baseKpi.value;
      let aa = item.score;
      if (typeof aa === 'string' && aa.indexOf('%') !== -1) {
        aa = aa.replace('%', '');
      }
      const levelVal = item.id === 2 ? num2 : this.state.flag === 2 && item.id === 3 ? num1 : aa;
      const val = item.id === 3 ? (this.state.flag === 1 ? 2 : 3) : item.id - 1;
      this.getData({ type: val, levelVal, interfaceFlag: 2 });
      this.saveParams({ tabFlag: item.id });
    }
  };
  // 跳转到历史绩效
  toHistoryPage = () => {
    const { dateTime } = this.state;
    this.props.setRouteUrlParams('/history', { month: dateTime, type: 1 });
  };

  render() {
    const { flag, tabFlag, dateTime, groupType } = this.state;
    const detailKpiData = !this.props.teacherhome.detailKpiData
      ? []
      : !this.props.teacherhome.detailKpiData.data ? [] : this.props.teacherhome.detailKpiData.data;
    const kpiLevelData = !this.props.teacherhome.kpiLevelData
      ? []
      : !this.props.teacherhome.kpiLevelData.data ? [] : this.props.teacherhome.kpiLevelData.data;

    const { base = 0, mark = 0, total = 0, manageScale = null, baseKpi = null } = !detailKpiData
      ? {}
      : detailKpiData;

    const classNum = !manageScale
      ? 0
      : !manageScale.manageNum && manageScale.classNum !== 0 ? 0 : manageScale.classNum;

    const { isloading } = this.props;
    return (
      <div>
        <DatePanle
          defaultDate={dateTime}
          toHistoryPage={() => {
            this.toHistoryPage();
          }}
          onChange={date => {
            this.onDateChange(date);
          }}
        />
        {isloading && <Loading />}
        <div className={styles.m_performanceContener}>
          <span className={styles.u_totalNum}>
            {formatMoney(total || 0)}
            <span className={styles.u_selfWord}>元</span>
          </span>
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
          <p className={styles.u_pContent}>*预估绩效每天与小德学分同步更新</p>
        </div>

        <ButtonFile
          flag2={tabFlag}
          flag={flag}
          dataSource={detailKpiData}
          changeFlag={item => this.buttonChange(item, manageScale, baseKpi)}
        />
        <TableFile
          flag2={tabFlag}
          flag={flag}
          dataSource={kpiLevelData}
          titleData={detailKpiData}
        />

        <div style={{ display: flag === 2 && groupType === 'group' ? 'block' : 'none' }}>
          <TeacherPer dataSource={detailKpiData} />
          <div
            className={styles.m_warningP}
            style={{ display: Number(classNum) >= 6 ? 'block' : 'none' }}
          >
            <p className={styles.u_pContent}>
              本月在岗老师≥6人，随机取4人展示绩效，供参考。各班主任实发以最终调整后绩效为准
            </p>
          </div>
        </div>

        <div
          className={styles.m_familyGroup}
          style={{ display: flag === 1 ? 'block' : 'none' }}
          onClick={() => this.jumpDetail()}
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
export default connect(({ teacherhome, loading }) => ({
  teacherhome,
  isloading: loading.models.teacherhome,
}))(Teacher);
