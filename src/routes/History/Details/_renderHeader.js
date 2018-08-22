import React from 'react';
import styles from './_render.less';

class RenderHeader extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className={`${styles.m_render} ${styles.m_hdRender}`}>
        <span className={styles.familyName}>家组（自考）</span>
      </div>
    );
  }
}
export default RenderHeader;
