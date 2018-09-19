import React from 'react';
import styles from './_render.less';

class RenderHeader extends React.Component {
  componentDidMount() {}

  render() {
    const type = Number(this.props.type);
    return (
      <div className={`${styles.m_render} ${styles.m_hdRender}`}>
        <span className={`${styles.u_span} ${styles.performance}`}>绩效档位</span>
        <span className={`${styles.u_span} ${styles.familyNum}`}>
          {type === 0 ? '家族数' : '小组数'}
        </span>
        <span className={`${styles.u_span} ${styles.familyRatio}`}>
          (学院){type === 0 ? '家族' : '小组'}占比{' '}
        </span>
        <span className={`${styles.u_span} ${styles.familyRatio}`}>
          (集团){type === 0 ? '家族' : '小组'}占比{' '}
        </span>
        <span className={`${styles.u_span} ${styles.collegeGroup}`}>学院-集团 </span>
      </div>
    );
  }
}
export default RenderHeader;
