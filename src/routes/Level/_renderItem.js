import React from 'react';
import redImg from '../../assets/redtriangle.png';
import greenImg from '../../assets/greentriangle.png';
import yellowImg from '../../assets/yellowtriangle.png';
import styles from './_render.less';

class RenderItem extends React.Component {
  componentDidMount() {}

  render() {
    const { rowData } = this.props;
    const bgColor = rowData.key % 2 === 0 ? styles.bgWhite : styles.bgGrey;
    const collegePer = (rowData.levelCount / rowData.total * 100).toFixed(2);
    const companyPer = (rowData.levelCompanyNum / rowData.companyNum * 100).toFixed(2);
    const num = Number(collegePer - companyPer).toFixed(2);
    const imgSrc = num === 0 ? yellowImg : num < 0 ? redImg : greenImg;
    return (
      <div className={`${styles.m_render} ${styles.m_itemRender} ${bgColor}`}>
        <span className={`${styles.u_span} ${styles.performance}`}>{rowData.levelName}</span>
        <span className={`${styles.u_span} ${styles.familyNum}`}>{rowData.levelCount}</span>
        <span className={`${styles.u_span} ${styles.familyRatio}`}>{collegePer}%</span>
        <span className={`${styles.u_span} ${styles.familyRatio}`}>{companyPer}%</span>
        <span className={`${styles.u_span} ${styles.collegeGroup}`}>
          {num}%<img className={styles.triangCls} src={imgSrc} alt="" />
        </span>
      </div>
    );
  }
}
export default RenderItem;
