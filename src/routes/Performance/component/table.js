import React from 'react';
import RenderHeader from './renderHeader';
import RenderItem from './renderItem';
import styles from './renderHeader.less';

class RenderTabel extends React.Component {
  render() {
    const { columnsData, rowData, newParams } = this.props;
    if (!rowData) return <div>暂无数据</div>;
    return (
      <table border="0" className={styles.newTable} style={{ width: '100%' }}>
        <RenderHeader columnsData={columnsData} />
        <RenderItem
          rowData={rowData}
          columnsData={columnsData}
          newParams={newParams}
          history={this.props.history}
        />
      </table>
    );
  }
}
export default RenderTabel;
