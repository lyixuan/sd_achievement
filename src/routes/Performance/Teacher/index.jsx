import React from 'react';
import { getCurrentAuthInfo, getCurrentMonth } from 'utils/decorator';
import Table from '../component/table';
import styles from './index.less';

@getCurrentAuthInfo
@getCurrentMonth
class Teacher extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { listData } = this.props;
    console.log(listData, 'listData');
    const columnsData = [
      {
        title: '绩效子项',
        dataIndex: 'itemKey',
        key: 'itemKey',
      },
      {
        title: '金额',
        dataIndex: 'itemValue',
        key: 'itemValue',
      },
      {
        title: '操作',
        dataIndex: '操作',
        key: '操作',
      },
    ];
    return (
      <div className={styles.teacherContent}>
        <div className={styles.meta}>
          <span>18902</span>
          <span>元</span>
        </div>
        <div className={styles.middle}>
          <p>好推净流水122873元 | 续报净流水 28773元</p>
          <p>足课单量 2 | 硕士续报单量 4 </p>
        </div>
        <Table columnsData={columnsData} rowData={listData && listData.incomeKpiItemList} />
      </div>
    );
  }
}
export default Teacher;
