import React from 'react';
import { Icon } from 'antd-mobile';
import styles from '../renderHeader.less';

class OperationItem extends React.Component {
  render() {
    const { list } = this.props;
    if (!list) return <div>11</div>;
    return (
      <tbody className={styles.content}>
        {list.length &&
          list.map(item => {
            const id = item;
            return (
              <tr style={{ display: 'flex' }} key={id}>
                <td>{item.itemName}</td>
                <td>{item.totalKpi}</td>
                <td>
                  <Icon type="right" size="xs" color="#00ccc3" />
                </td>
              </tr>
            );
          })}
      </tbody>
    );
  }
}
export default OperationItem;
