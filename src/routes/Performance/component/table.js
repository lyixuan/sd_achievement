import React from 'react';
import RenderHeader from './renderHeader';
import RenderItem from './renderItem';
import styles from './renderHeader.less';

class RenderTabel extends React.Component {
  render() {
    const { columnsData, rowData } = this.props;
    if (!rowData) return <div>11</div>;
    return (
      <table border="0" className={styles.newTable} style={{ width: '100%' }}>
        <RenderHeader columnsData={columnsData} />
        <RenderItem rowData={rowData} />
      </table>
    );
  }
}
export default RenderTabel;
