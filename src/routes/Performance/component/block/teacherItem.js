import React from 'react';
import { Icon } from 'antd-mobile';
import styles from '../renderHeader.less';

class TeacherItem extends React.Component {
  render() {
    const { list } = this.props.list;
    if (!list) return <div>11</div>;
    return (
      <tbody className={styles.content}>
        {list.length &&
          list.map(item => {
            return (
              <tr style={{ display: 'flex' }} key={item.itemKey}>
                <td>{item.itemKey}</td>
                <td>{item.itemValue}</td>
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
export default TeacherItem;
