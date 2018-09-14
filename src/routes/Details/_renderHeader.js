import React from 'react';
import styles from './_render.less';

class RenderHeader extends React.Component {
  componentDidMount() {}

  render() {
    const { type, groupName } = this.props;
    const groupType = Number(type) === 0 ? '家族' : '小组';
    return (
      <div className={`${styles.m_render} ${styles.m_hdRender}`}>
        <span className={styles.familyName}>
          {groupType}
          {groupName}
        </span>
        <span className={styles.performance}>总绩效=基本绩效+打分绩效</span>
      </div>
    );
  }
}
export default RenderHeader;
