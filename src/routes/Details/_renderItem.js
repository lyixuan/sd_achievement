import React from 'react';
import arrowDown from '../../assets/down.svg';
import styles from './_render.less';

class RenderItem extends React.Component {
  componentDidMount() {}

  render() {
    const { rowData } = this.props;
    return (
      <div className={`${styles.m_render} ${styles.m_itemRender}`}>
        <span className={styles.familyName}>{rowData.groupName}</span>
        <div className={styles.performance}>
          <span>{rowData.familyNum}</span>
          <span className={styles.remark}>
            {' '}
            ({rowData.familyNum} | {rowData.familyNum})
          </span>
          <img src={arrowDown} alt="" className={styles.arrowCls} />
        </div>
      </div>
    );
  }
}
export default RenderItem;
