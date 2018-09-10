import React from 'react';
import styles from './TableItem.less';

class RenderItem extends React.Component {
  render() {
    const { rowData } = this.props || [];
    const dataList = rowData.data || [];
    return (
      <div className={styles.normal}>
        <div className={rowData.key % 2 === 0 ? styles.bgGrey : styles.bgWhite} key={333}>
          {dataList.map((key, i) => {
            const { value, clsName } = dataList[i];
            const keyNum = dataList[i].key;
            return (
              <div key={keyNum} className={styles[clsName]}>
                {value}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default RenderItem;
