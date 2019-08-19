import React from 'react';
import styles from './renderHeader.less';

class RenderItem extends React.Component {
  componentDidMount() {}

  render() {
    const { list } = this.props.rowData;
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
export default RenderItem;
