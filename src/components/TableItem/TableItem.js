import React from 'react';
import styles from './TableItem.less';

class RenderItem extends React.Component {
  render() {
    const { rowData } = this.props;
    return (
      <div className={styles.normal}>
        <div className={rowData.key % 2 === 0 ? styles.bgGrey : styles.bgWhite}>
          <div className={styles.dateCls}>{rowData.titleOne}</div>
          <div className={styles.stuCls}>{rowData.titleTwo}</div>
          <div className={styles.preValCls}>{rowData.titleThree}</div>
        </div>
      </div>
    );
  }
}
export default RenderItem;
