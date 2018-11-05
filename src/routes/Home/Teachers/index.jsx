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
import count from '../../../assets/count.svg';

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
    const roleFlag = groupType === 'family' ? 1 : 2;
    const initState = {
      familyType, // 自考还是壁垒
      userFlag: roleFlag, // 判断是家族长1,运营长2
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
      const val = this.tabChangeValue();
      this.getData({ type: val, interfaceFlag: 1 });
    } else {
      this.props.setRouteUrlParams(pathname, {});
    }
  }

  // 时间切换时需要更新数据
  onDateChange = date => {
    if (this.state.dateTime !== date) {
      const val = this.tabChangeValue();
      this.getData({ type: val, dateTime: date, interfaceFlag: 1 });
      this.saveParams({ dateTime: date });
    }
  };

  // 请求接口的中间函数
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
      userFlag = null,
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
    const kpiLevelParams = { ...detailKpiParams, type, levelVal };
    if (interfaceFlag === 1) {
      this.detailKpiFetch(detailKpiParams, userFlag, type, kpiLevelParams);
    } else {
      this.kpiLevelFetch(kpiLevelParams);
    }
  };

  // tab切换时button下标数值和接口统一
  tabChangeValue = () => {
    return this.state.tabFlag === 3
      ? this.state.userFlag === 1 ? 2 : 3
      : Number(this.state.tabFlag) - 1;
  };

  // 请求model中的detailKpi方法
  detailKpiFetch(detailKpiParams, userFlag, flagVal, kpiLevelParams) {
    const sendParams = { detailKpiParams, flagVal, kpiLevelParams, userFlag };
    this.props.dispatch({
      type: 'teacherhome/detailKpi',
      payload: sendParams,
    });
  }

  // 请求model中的findKpiLevel方法
  kpiLevelFetch(kpiLevelParams) {
    this.props.dispatch({
      type: 'teacherhome/findKpiLevel',
      payload: { kpiLevelParams },
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
    this.props.setRouteUrlParams('/details', { month: dateTime, type: 1 });
  };

  // button切换调用的档位接口
  buttonChange = (item, classNum, baseKpi) => {
    if (this.state.tabFlag !== item.id) {
      // 放重复点击同一个button
      const baseKpiValue = !baseKpi ? 0 : !baseKpi.value && baseKpi.value !== 0 ? 0 : baseKpi.value;
      const levelVal =
        item.id === 2
          ? baseKpiValue
          : this.state.userFlag === 2 && item.id === 3 ? classNum : item.score;
      const val = item.id === 3 ? (this.state.userFlag === 1 ? 2 : 3) : item.id - 1;
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
    const { userFlag, tabFlag, dateTime, groupType } = this.state;
    const { teacherhome, isloading } = this.props;
    const detailData = !teacherhome.detailKpiData ? [] : teacherhome.detailKpiData;
    const kpiData = !teacherhome.kpiLevelData ? [] : teacherhome.kpiLevelData;
    const detailKpiData = !detailData ? [] : !detailData.data ? [] : detailData.data;
    const kpiLevelData = !kpiData ? [] : !kpiData.data ? [] : kpiData.data;
    const { base = 0, mark = 0, total = 0, manageScale = null, baseKpi = null } = !detailKpiData
      ? {}
      : detailKpiData;
    const classNum = !manageScale
      ? 0
      : !manageScale.manageNum && manageScale.classNum !== 0 ? 0 : manageScale.classNum;
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
          tabFlag={tabFlag}
          userFlag={userFlag}
          dataSource={detailKpiData}
          changeFlag={item => this.buttonChange(item, classNum, baseKpi)}
        />
        <TableFile
          tabFlag={tabFlag}
          userFlag={userFlag}
          dataSource={kpiLevelData}
          titleData={detailKpiData}
        />

        {userFlag === 2 && groupType === 'group' ? (
          <div>
            <TeacherPer dataSource={detailKpiData} />
            {Number(classNum) >= 6 ? (
              <div className={styles.m_warningP}>
                <p className={styles.u_pContent}>
                  本月在岗老师≥6人，随机取4人展示绩效，供参考。各班主任实发以最终调整后绩效为准
                </p>
              </div>
            ) : null}
          </div>
        ) : null}

        {userFlag === 1 ? (
          <div className={styles.m_familyGroup} onClick={() => this.jumpDetail()}>
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
        ) : null}

        <div
          className={styles.countCls}
          onClick={() => {
            this.props.setRouteUrlParams('/static/algorithmdescription');
          }}
        >
          <img src={count} className={styles.imgCount} alt="算法说明" />
        </div>
      </div>
    );
  }
}
export default connect(({ teacherhome, loading }) => ({
  teacherhome,
  isloading: loading.models.teacherhome,
}))(Teacher);
