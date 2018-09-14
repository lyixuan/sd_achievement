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
      </div>
    );
  }
}
export default RenderHeader;
