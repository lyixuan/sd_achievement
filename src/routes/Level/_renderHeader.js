import React from 'react';
import styles from './_render.less';

class RenderHeader extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className={`${styles.m_render} ${styles.m_hdRender}`}>
        <span className={`${styles.u_span} ${styles.performance}`}>绩效档位</span>
        <span className={`${styles.u_span} ${styles.familyNum}`}>家族数</span>
        <span className={`${styles.u_span} ${styles.familyRatio}`}>(学院)家族占比 </span>
        <span className={`${styles.u_span} ${styles.familyRatio}`}>(集团)家族占比 </span>
        <span className={`${styles.u_span} ${styles.collegeGroup}`}>学院-集团 </span>
      </div>
    );
  }
}
export default RenderHeader;
