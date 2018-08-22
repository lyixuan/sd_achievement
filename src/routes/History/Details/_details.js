import React from 'react';
import distribute from '../../../assets/distribute.png';
import scale from '../../../assets/scale.png';
import styles from './_render.less';

class RenderDetails extends React.Component {
  componentDidMount() {}

  renderFn = isShow => {
    if (isShow) {
      return (
        <div>
          <dl className={`${styles.u_dlCls} ${styles.distribute}`}>
            <dt>
              <img className={styles.iconCls} src={distribute} alt="绩效分配" />
            </dt>
            <dd className={styles.u_ddCls}>
              <p className={styles.greyColor}>运营长确定绩效</p>
              <div className={styles.blackColor}>
                {[1].map(item => {
                  return (
                    <p key={item} className={styles.width_50}>
                      <span className={styles.marRight}>黄蓉</span>
                      <span>30,000元</span>
                    </p>
                  );
                })}
              </div>
            </dd>
          </dl>
          <dl className={`${styles.u_dlCls} ${styles.scale}`}>
            <dt>
              <img className={styles.iconCls} src={scale} alt="管理规模" />
            </dt>
            <dd className={styles.u_ddCls}>
              <p className={styles.greyColor}>班主任确定绩效</p>
              <div className={styles.blackColor}>
                {[1, 2, 3, 4, 5].map(item => {
                  return (
                    <p key={item} className={styles.width_50}>
                      <span className={styles.marRight}>黄蓉</span>
                      <span>30,000元</span>
                    </p>
                  );
                })}
              </div>
            </dd>
          </dl>
        </div>
      );
    } else {
      return (
        <dl className={`${styles.u_dlCls} ${styles.distribute}`}>
          <dt>
            <img className={styles.iconCls} src={distribute} alt="绩效分配" />
          </dt>
          <dd className={styles.u_ddCls}>
            <p className={styles.greyColor}>家族长确定绩效</p>
            <div className={styles.blackColor}>
              {[1, 3].map(item => {
                return (
                  <p key={item} className={styles.width_50}>
                    <span className={styles.marRight}>黄蓉</span>
                    <span>30,000元</span>
                  </p>
                );
              })}
            </div>
          </dd>
        </dl>
      );
    }
  };
  render() {
    return <div className={styles.m_detailRender}>{this.renderFn(false)}</div>;
  }
}
export default RenderDetails;
