import React from 'react';
import styles from './TeacherItem.less';

class TeacherItem extends React.Component {
  render() {
    const { rowData } = this.props || [];
    console.log(rowData.clsName);
    const dataList = rowData.data || [];
    return (
      <div className={styles.normal}>
        <div className={rowData.key % 2 === 0 ? styles.bgGrey : styles.bgWhite}>
          {dataList.map((key, i) => {
            const { value, clsName } = dataList[i];
            return (
              <div key={key} className={styles[clsName]}>
                {value}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default TeacherItem;
