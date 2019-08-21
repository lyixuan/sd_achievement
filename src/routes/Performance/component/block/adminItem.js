import React from 'react';
import styles from '../renderHeader.less';

class AdminItem extends React.Component {
  render() {
    const { list } = this.props.list.listData;
    if (!list) return <div>11</div>;
    return (
      <tbody className={styles.content}>
        {list.length &&
          list.map(item => {
            return (
              <tr key={item.itemId} style={{ display: 'flex' }}>
                <td>{item.itemId}</td>
                <td>{item.itemName}</td>
                <td>{item.itemType}</td>
                <td>{item.totalKpi}</td>
              </tr>
            );
          })}
      </tbody>
    );
  }
}
export default AdminItem;
