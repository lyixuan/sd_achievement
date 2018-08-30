import React from 'react';
import styles from './index.less';
import SurePer from '../../../assets/surePer.png';

class HistoryTeacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeVal: '2018.07',
      permenMoney: null, // || '2,000',
      flag: 2,
    };
  }
  componentDidMount() {}
  render() {
    const { timeVal, permenMoney, flag } = this.state;
    const aa = timeVal.split('.');
    return (
      <div>
        {flag === 1 ? (
          <div className={styles.m_wrapcontener}>
            <div className={styles.m_imgDiv}>
              <img src={SurePer} alt="logo" className={styles.u_imgCls} />
            </div>
            <div className={styles.m_wordContent}>
              <p>亲爱的甘文斌</p>
              <p>辛苦啦，感谢您在{aa[1] < 10 ? aa[1].slice(1) : aa[1]}月份努力的付出！</p>
              <p className={styles.u_timeCls}>
                您{aa[0]}年{aa[1] < 10 ? aa[1].slice(1) : aa[1]}月份确定绩效为
              </p>
              <p className={styles.u_resultlCls}>核算中...</p>
            </div>
          </div>
        ) : (
          <div className={styles.m_wrapcontener}>
            <div className={styles.m_imgDiv}>
              <img src={SurePer} alt="logo" className={styles.u_imgCls} />
            </div>
            <div className={styles.m_wordContent}>
              <p>亲爱的甘文斌</p>
              <p>辛苦啦，感谢您在{aa[1] < 10 ? aa[1].slice(1) : aa[1]}月份努力的付出！</p>
              <p className={styles.u_timeCls}>
                您{aa[0]}年{aa[1] < 10 ? aa[1].slice(1) : aa[1]}月份确定绩效为
              </p>
              <p className={styles.u_resultlCls}>{!permenMoney ? '1,000' : permenMoney}</p>
            </div>
          </div>
        )}

        <div className={styles.m_innercontener}>
          <span className={styles.u_spanWorld}>* 实发金额以财务部税后实发为准</span>
        </div>
      </div>
    );
  }
}
export default HistoryTeacher;
