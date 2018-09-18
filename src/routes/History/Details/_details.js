import React from 'react';
import { formatMoney } from '../../../utils/utils';
import distribute from '../../../assets/distribute.png';
import scale from '../../../assets/scale.png';
import styles from './_render.less';

class RenderDetails extends React.Component {
  componentDidMount() {}

  renderFn = isShow => {
    const { rowData } = this.props;
    let index = 0;
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
                {rowData.map(item => {
                  index += 1;
                  if (item.groupType === 'group') {
                    return (
                      <p key={index} className={styles.width_50}>
                        <span className={styles.marRight}>{item.name}</span>
                        <span>{formatMoney(item.achievement)}元</span>
                      </p>
                    );
                  } else {
                    return null;
                  }
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
                {rowData.map(item => {
                  index += 1;
                  if (item.groupType === 'class') {
                    return (
                      <p key={index} className={styles.width_50}>
                        <span className={styles.marRight}>{item.name}</span>
                        <span>{formatMoney(item.achievement)}元</span>
                      </p>
                    );
                  } else {
                    return null;
                  }
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
              {rowData.map(item => {
                return (
                  <p key={item.name} className={styles.width_50}>
                    <span className={styles.marRight}>{item.name}</span>
                    <span>{formatMoney(item.achievement)}元</span>
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
    return <div className={styles.m_detailRender}>{this.renderFn(true)}</div>;
  }
}
export default RenderDetails;
