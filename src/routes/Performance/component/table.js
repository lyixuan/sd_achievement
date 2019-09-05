import React from 'react';
import RenderHeader from './renderHeader';
import RenderItem from './renderItem';
import styles from './renderHeader.less';

class RenderTabel extends React.Component {
  render() {
    const { columnsData, rowData, newParams, params = {} } = this.props;
    if (!rowData) return <div>暂无数据</div>;
    return (
      <table border="0" cellSpacing="0" className={styles.newTable} style={{ width: '100%' }}>
        <RenderHeader columnsData={columnsData} params={params} />
        <RenderItem
          rowData={rowData}
          columnsData={columnsData}
          newParams={newParams}
          params={params}
          history={this.props.history}
        />
      </table>
    );
  }
}
export default RenderTabel;
