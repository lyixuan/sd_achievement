import React from 'react';
import styles from './renderItem.less';

class RenderItem extends React.Component {
  render() {
    const { rowData, columnsData } = this.props;
    if (!rowData) return <div>11</div>;
    return (
      <tbody className={styles.content}>
        {rowData.map((item, index) => {
          const key = index * Math.random();
          return (
            <tr style={{ display: 'flex' }} key={key}>
              {columnsData.map(item2 => {
                // columns 每一项的name dataIndex
                const name = item2.dataIndex;
                return <td key={name}>{item[name]}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    );
  }
}
export default RenderItem;
