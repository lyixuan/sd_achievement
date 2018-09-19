import React from 'react';
import moment from 'moment';
import { getCurrentAuthInfo } from 'utils/decorator';
import SurePer from '../../assets/surePer.png';
import styles from './index.less';

@getCurrentAuthInfo
class Counting extends React.Component {
  formateDate = () => {
    const month = this.props.match.params.month || new Date();
    const year = moment(month).year();
    const newMonth = moment(month).month();
    return {
      year,
      month: newMonth + 1 >= 10 ? newMonth : `0${newMonth + 1}`,
    };
  };

  render() {
    const timeDateObj = this.formateDate();
    return (
      <div>
        <div className={styles.historyBanner} />
        <div className={styles.m_wrapcontener}>
          <div className={styles.m_imgDiv}>
            <img src={SurePer} alt="logo" className={styles.u_imgCls} />
          </div>
          <div className={styles.m_wordContent}>
            <p className={styles.u_timeCls}>
              {timeDateObj.year}年{timeDateObj.month}月份确定绩效为
            </p>
            <p className={styles.u_resultlCls}>核算中...</p>
          </div>
        </div>

        <div className={styles.m_innercontener}>
          <div style={{ height: '0.12rem' }} />
          <p className={styles.u_spanWorld}>* 确定绩效为本月整月的总绩效</p>
          <p className={styles.u_spanWorld}>
            * 满足税额后，总部人力会进行预扣税再发放，实发金额请以实际到账为准
          </p>
        </div>
      </div>
    );
  }
}
export default Counting;
