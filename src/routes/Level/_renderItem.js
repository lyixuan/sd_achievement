import React from 'react';
import styles from './_render.less';

class RenderItem extends React.Component {
  componentDidMount() {}

  render() {
    const { rowData } = this.props;
    const bgColor = rowData.key % 2 === 0 ? styles.bgWhite : styles.bgGrey;
    return (
      <div className={`${styles.m_render} ${styles.m_itemRender} ${bgColor}`}>
        <span className={`${styles.u_span} ${styles.performance}`}>{rowData.groupName}</span>
        <span className={`${styles.u_span} ${styles.familyNum}`}>{rowData.familyNum}</span>
        <span className={`${styles.u_span} ${styles.familyRatio}`}>{rowData.arr} </span>
        <span className={`${styles.u_span} ${styles.familyRatio}`}>{rowData.arr} </span>
        <span className={`${styles.u_span} ${styles.collegeGroup}`}>{rowData.arr} </span>
      </div>
    );
  }
}
export default RenderItem;
