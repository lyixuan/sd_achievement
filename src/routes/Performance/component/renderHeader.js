import React from 'react';
import styles from './renderHeader.less';

class RenderHeader extends React.Component {
  render() {
    const columnsData = this.props;
    const { params } = this.props;
    const name = params.className;
    return (
      <tbody style={{ width: '6.5rem' }} className={styles[name]}>
        <tr className={styles.header}>
          {columnsData.columnsData.length &&
            columnsData.columnsData.map(item => {
              return <th key={item.key}>{item.title}</th>;
            })}
        </tr>
      </tbody>
    );
  }
}
export default RenderHeader;
