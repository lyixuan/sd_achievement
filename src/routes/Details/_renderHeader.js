import React from 'react';
import styles from './_render.less';

class RenderHeader extends React.Component {
  componentDidMount() {}

  render() {
    const { sectionData } = this.props;
    return (
      <div className={`${styles.m_render} ${styles.m_hdRender}`}>
        <span className={styles.familyName}>
          {sectionData[0].groupName}（{sectionData[0].arr}）
        </span>
        <span className={styles.performance}>总绩效=基本绩效+打分绩效</span>
      </div>
    );
  }
}
export default RenderHeader;
