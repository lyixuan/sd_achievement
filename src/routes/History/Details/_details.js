import React from 'react';
import distribute from '../../../assets/distribute.png';
import scale from '../../../assets/scale.png';
import average from '../../../assets/average.png';
import daily from '../../../assets/daily.png';
import styles from './_render.less';

class RenderDetails extends React.Component {
  componentDidMount() {}

  renderFn = isShow => {
    if (isShow) {
      return (
        <dl className={`${styles.u_dlCls} ${styles.distribute}`}>
          <dt>
            <img className={styles.iconCls} src={distribute} alt="绩效分配" />
          </dt>
          <dd className={styles.u_ddCls}>
            <p className={styles.greyColor}>绩效分配</p>
            <div style={{ margin: '.07rem 0' }}>
              <span className={styles.blackColor}>运营长绩效 </span>
              <span className={styles.blackColor}> 3600元 </span>
              <span className={styles.greyColor}> (3600 </span>
              <span className={styles.blueColor}> | </span>
              <span className={styles.greyColor}> 3600) </span>
            </div>
            <div>
              <span className={styles.blackColor}>运营长绩效 </span>
              <span className={styles.blackColor}> 3600元 </span>
              <span className={styles.greyColor}> (3600 </span>
              <span className={styles.blueColor}> | </span>
              <span className={styles.greyColor}> 3600) </span>
            </div>
          </dd>
        </dl>
      );
    } else {
      return null;
    }
  };
  render() {
    return (
      <div className={styles.m_detailRender}>
        {this.renderFn(true)}
        <dl className={`${styles.u_dlCls} ${styles.scale}`}>
          <dt>
            <img className={styles.iconCls} src={scale} alt="管理规模" />
          </dt>
          <dd className={styles.u_ddCls}>
            <div className={styles.blackColor}>
              <span className={styles.greyColor}>管理规模：</span> 在服学员
              <span> 10000 </span> 人
              <span className={styles.blueColor}> | </span> 老师
              <span> 5 </span> 人
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
              <span> 20000 </span> 人
              <span className={styles.blueColor}> | </span>
              <span className={styles.greyColor}> 排名：</span>
              <span> 1/5 (20%) </span>
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
              <span> 5 </span> 分
              <span className={styles.blueColor}> | </span>
              <span className={styles.greyColor}> 排名：</span>
              <span> 1/5 (20%) </span>
            </div>
          </dd>
        </dl>
      </div>
    );
  }
}
export default RenderDetails;
