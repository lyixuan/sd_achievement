import React from 'react';
import styles from './_render.less';

class RenderHeader extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className={`${styles.m_render} ${styles.m_hdRender}`}>
        <span className={styles.familyName}>小组（自考）</span>
        <span className={styles.performance}>总绩效=基本绩效+打分绩效</span>
      </div>
    );
  }
}
export default RenderHeader;
