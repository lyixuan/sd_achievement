import React from 'react';
import { getCurrentAuthInfo, getCurrentMonth } from 'utils/decorator';
import Table from '../component/table';
import styles from './index.less';

@getCurrentAuthInfo
@getCurrentMonth
class Admin extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const listData = this.props;
    const columnsData = [
      {
        title: '学院ID',
        dataIndex: 'itemId',
        key: 'itemId',
      },
      {
        title: '学院名称',
        dataIndex: 'itemName',
        key: 'itemName',
      },
      {
        title: '数据类型',
        dataIndex: 'itemType',
        key: 'itemType',
      },
      {
        title: '绩效',
        dataIndex: 'totalKpi',
        key: 'totalKpi',
      },
    ];
    return (
      <div className={styles.adminContent}>
        <Table columnsData={columnsData} rowData={listData.listData} />
      </div>
    );
  }
}
export default Admin;
