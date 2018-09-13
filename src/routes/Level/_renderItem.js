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
    const num = Number(rowData.familyNum);
    const imgSrc = num === 0 ? yellowImg : num < 0 ? redImg : greenImg;
    return (
      <div className={`${styles.m_render} ${styles.m_itemRender} ${bgColor}`}>
        <span className={`${styles.u_span} ${styles.performance}`}>{rowData.levelValue}</span>
        <span className={`${styles.u_span} ${styles.familyNum}`}>{rowData.levelCount}</span>
        <span className={`${styles.u_span} ${styles.familyRatio}`}>
          {rowData.levelCount / rowData.collegeNum}{' '}
        </span>
        <span className={`${styles.u_span} ${styles.familyRatio}`}>
          {rowData.levelCompanyNum / rowData.companyNum}{' '}
        </span>
        <span className={`${styles.u_span} ${styles.collegeGroup}`}>
          {rowData.familyNum}
          <img className={styles.triangCls} src={imgSrc} alt="" />
        </span>
      </div>
    );
  }
}
export default RenderItem;
