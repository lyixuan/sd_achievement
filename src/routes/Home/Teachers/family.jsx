import React from 'react';
import styles from './index.less';
import Bitmap from '../../../assets/Bitmap.png';
import Right from '../../../assets/right.svg';

class Family extends React.Component {
  jumpDetail = param => {
    this.props.setRouteUrlParams('/details', { collegeName: param });
  };
  render() {
    return (
      <div className={styles.m_familyGroup} onClick={() => this.jumpDetail(1)}>
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
    );
  }
}
export default Family;
// connect(({ loading }) => ({ loading }))(Boss);
