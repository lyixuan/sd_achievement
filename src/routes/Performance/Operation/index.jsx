import React from 'react';
import { getCurrentAuthInfo, getCurrentMonth } from 'utils/decorator';
// eslint-disable-next-line
import Bitmap from '../../../assets/Bitmap.png';
import Table from '../component/table';
import styles from './index.less';
// import { Icon } from 'antd-mobile';

@getCurrentAuthInfo
@getCurrentMonth
class Operation extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { listData } = this.props;
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
        dataIndex: 'itemType',
        key: 'itemType',
      },
    ];

    const columnsData1 = [
      {
        title: '老师名称',
        dataIndex: 'itemName',
        key: 'itemName',
      },
      {
        title: '绩效',
        dataIndex: 'totalKpi',
        key: 'totalKpi',
      },
      {
        title: '操作',
        dataIndex: 'itemType',
        key: 'itemType',
      },
    ];
    return (
      <div className={styles.familyContent}>
        <div className={styles.meta}>
          <span>18902</span>
          <span>元</span>
        </div>
        <div className={styles.middle}>
          <ul>
            <li>
              <p>管理规模</p>
              <p>在服学员 19098 | 老师 26</p>
            </li>
            <li>
              <p>ko运营规模</p>
              <p>应出勤学员 29808</p>
            </li>
            <li>
              <p>足课单量 23 | 足课转化单数12 | 续报单数 11</p>
              <p>好推净流水122,873元 | 续报净流水 28,773元</p>
            </li>
          </ul>
        </div>
        <Table columnsData={columnsData} rowData={listData.incomeKpiItemList} />

        <div className={styles.teacher}>
          <p>班主任预测绩效</p>
          <Table columnsData={columnsData1} rowData={listData.teacherKpiItemList} />
        </div>
      </div>
    );
  }
}
export default Operation;
