import React from 'react';
import { formatMoney } from '../../utils/utils';
import distribute from '../../assets/distribute.png';
import scale from '../../assets/scale.png';
import average from '../../assets/average.png';
import daily from '../../assets/daily.png';
import styles from './_render.less';

class RenderDetails extends React.Component {
  componentDidMount() {}

  renderFn = kpiDistribution => {
    if (kpiDistribution) {
      const { groupKpi = null, classKpi = null } = kpiDistribution;
      return (
        <dl className={`${styles.u_dlCls} ${styles.distribute}`}>
          <dt>
            <img className={styles.iconCls} src={distribute} alt="绩效分配" />
          </dt>
          <dd className={styles.u_ddCls}>
            <p className={styles.greyColor}>绩效分配</p>
            {!groupKpi ? null : (
              <div style={{ margin: '.07rem 0' }}>
                <span className={styles.blackColor}>运营长绩效 </span>
                <span className={styles.blackColor}> {formatMoney(groupKpi.total)}元 </span>
                <span className={styles.greyColor}> ({formatMoney(groupKpi.base)} </span>
                <span className={styles.blueColor}> | </span>
                <span className={styles.greyColor}> {formatMoney(groupKpi.mark)}) </span>
              </div>
            )}
            {!classKpi ? null : (
              <div>
                <span className={styles.blackColor}>每个班主任 </span>
                <span className={styles.blackColor}> {formatMoney(classKpi.total)}元 </span>
                <span className={styles.greyColor}> ({formatMoney(classKpi.base)} </span>
                <span className={styles.blueColor}> | </span>
                <span className={styles.greyColor}> {formatMoney(classKpi.mark)}) </span>
              </div>
            )}
          </dd>
        </dl>
      );
    } else {
      return null;
    }
  };
  render() {
    const { rowData } = this.props; // groupType===0(自考)有百分比，其他的不展示百分比
    const {
      dayAvgScore = {},
      managerScale = {},
      averageStuNum = {},
      kpiDistribution = {},
    } = rowData;
    // 日均学分排名比
    // 人均在服学员排名比rankPercent
    const dayAvg = (dayAvgScore.creditPercent * 100).toFixed(2); // 日均学分
    // const avg = (averageStuNum.rankPercent * 100).toFixed(2); // 人均服务学员数
    return (
      <div className={styles.m_detailRender}>
        {this.renderFn(kpiDistribution)}
        <dl className={`${styles.u_dlCls} ${styles.scale}`}>
          <dt>
            <img className={styles.iconCls} src={scale} alt="管理规模" />
          </dt>
          <dd className={styles.u_ddCls}>
            <div className={styles.blackColor}>
              <span className={styles.greyColor}>管理规模：</span> 在服学员
              <span> {managerScale.serviceCount} </span> 人
              <span className={styles.blueColor}> | </span> 老师人效
              <span> {managerScale.classNum} </span> 人
            </div>
          </dd>
        </dl>
        <dl className={`${styles.u_dlCls} ${styles.scale}`}>
          <dt>
            <img className={styles.iconCls} src={average} alt="人均服务学员数" />
          </dt>
          <dd className={styles.u_ddCls}>
            <div className={styles.blackColor}>
              <span className={styles.greyColor}>人均服务学员数：</span>
              <span> {averageStuNum.num} </span> 人
              {/* <span className={styles.blueColor}> | </span> */}
              {/* <span className={styles.greyColor}> 排名：</span> */}
              {/* <span> */}
              {/* {averageStuNum.index} / {averageStuNum.size} */}
              {/* {Number(avg) === 0 ? '（0）' : `（${avg}%）`} */}
              {/* </span> */}
            </div>
          </dd>
        </dl>
        <dl className={`${styles.u_dlCls} ${styles.scale}`}>
          <dt>
            <img className={styles.iconCls} src={daily} alt="日均学分" />
          </dt>
          <dd className={styles.u_ddCls}>
            <div className={styles.blackColor}>
              <span className={styles.greyColor}>日均学分：</span>
              <span> {dayAvgScore.score.toFixed(2)} </span> 分
              <span className={styles.blueColor}> | </span>
              <span className={styles.greyColor}> 排名：</span>
              <span>
                {dayAvgScore.index} / {dayAvgScore.size}
                {Number(dayAvg) === 0 ? '（0）' : `（${dayAvg}%）`}
              </span>
            </div>
          </dd>
        </dl>
      </div>
    );
  }
}
export default RenderDetails;
