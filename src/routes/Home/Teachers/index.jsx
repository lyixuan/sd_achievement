import React from 'react';
// import { connect } from 'dva';
import DatePanle from 'container/DatePanle';
import { assignUrlParams } from 'utils/routerUtils';
import styles from './index.less';
import ButtonFile from './_buttonFile';
import TableFile from './_tableFile';
import TeacherPer from './_teacherPer';
import Bitmap from '../../../assets/Bitmap.png';
import Right from '../../../assets/right.svg';
import { timeArea } from '../../../utils/timeArea';
import { formatMoney } from '../../../utils/utils';

class Teacher extends React.Component {
  constructor(props) {
    super(props);
    const { urlParams = {} } = props;
    const dateVal = timeArea();
    const { valueDate } = dateVal;
    const initState = {
      paramsObj: {
        startTime: null, // 过滤开始时间
      },
      flag: 2, // 判断是家族长1,运营长2
      flag2: 1, // tab切换标记
      dateTime: valueDate,
      userType: 'class', // 用户角色：family/group/class
    };
    this.state = assignUrlParams(initState, urlParams);
  }
  onDateChange = date => {
    this.setState({
      dateTime: date,
    });
  };
  render() {
    const { flag, flag2, dateTime, userType } = this.state;
    return (
      <div>
        <DatePanle
          defaultDate={dateTime}
          onChange={date => {
            this.onDateChange(date);
          }}
        />
        <div className={styles.m_performanceContener}>
          <span className={styles.u_totalNum}>{formatMoney(1500000)}元</span>
          <div className={styles.m_performanceMoney}>
            <div className={styles.u_basicMoney}>
              <div className={styles.u_contentDiv}>
                <span className={styles.u_spanMoney}>{formatMoney(1000000)}</span>
                <br />
                <span className={styles.u_spanBasic}>基本绩效</span>
              </div>
            </div>
            <div className={styles.u_splitLine} />
            <div className={styles.u_scoreMoney}>
              <div className={styles.u_contentDiv}>
                <span className={styles.u_spanMoney}>{formatMoney(50000)}</span>
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

        <div className={styles.m_titile}>
          <span className={styles.u_spanTitle}>预测绩效计算 | </span>
          <span className={styles.u_spanTitle}>英语1组</span>
        </div>

        <ButtonFile
          flag2={flag2}
          flag={flag}
          changeFlag={item => {
            this.setState({ flag2: item.id });
          }}
        />
        <TableFile flag2={flag2} flag={flag} />

        <div style={{ display: flag === 2 && userType === 'group' ? 'block' : 'none' }}>
          <TeacherPer />
        </div>

        <div
          className={styles.m_familyGroup}
          style={{ display: flag === 1 ? 'block' : 'none' }}
          onClick={() => this.jumpDetail(1)}
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
// connect(({ loading }) => ({ loading }))(Boss);
