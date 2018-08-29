import React from 'react';
// import { connect } from 'dva';
import styles from './index.less';
import MultipHeaderList from '../../../components/ListView/listView';
import TeacherHeader from '../../../components/TableItem/TeacherHeader';
import TeacherItem from '../../../components/TableItem/TeacherItem';

class Group extends React.Component {
  render() {
    // 用户为运营长前tab切换时，table列头数据
    const teacher = [
      {
        title: '老师名称',
        dataIndex: 'titleOne',
        key: 'titleOne',
        clsName: 'one',
      },
      {
        title: '总绩效',
        dataIndex: 'titleTwo',
        key: 'titleTwo',
        clsName: 'two',
      },
      {
        title: '=',
        dataIndex: 'titleThree',
        key: 'titleThree',
        clsName: 'three',
      },
      {
        title: '基本绩效',
        dataIndex: 'titleFour',
        key: 'titleFour',
        clsName: 'four',
      },
      {
        title: '+',
        dataIndex: 'titleFive',
        key: 'titleFive',
        clsName: 'five',
      },
      {
        title: '打分绩效',
        dataIndex: 'titleSix',
        key: 'titleSix',
        clsName: 'six',
      },
    ];

    const teacherItem = [
      {
        key: 1,
        data: [
          { value: '甘文斌', clsName: 'one' },
          { value: '10,000', clsName: 'two' },
          { value: ' ', clsName: 'three' },
          { value: '5,000', clsName: 'four' },
          { value: '', clsName: 'five' },
          { value: '5,000', clsName: 'six' },
        ],
      },
      {
        key: 2,
        data: [
          { value: '甘文斌', clsName: 'one' },
          { value: '10,000', clsName: 'two' },
          { value: ' ', clsName: 'three' },
          { value: '5,000', clsName: 'four' },
          { value: '', clsName: 'five' },
          { value: '5,000', clsName: 'six' },
        ],
      },
      {
        key: 3,
        data: [
          { value: '甘文斌', clsName: 'one' },
          { value: '10,000', clsName: 'two' },
          { value: ' ', clsName: 'three' },
          { value: '5,000', clsName: 'four' },
          { value: '', clsName: 'five' },
          { value: '5,000', clsName: 'six' },
        ],
      },
      {
        key: 4,
        data: [
          { value: '甘文斌', clsName: 'one' },
          { value: '10,000', clsName: 'two' },
          { value: ' ', clsName: 'three' },
          { value: '5,000', clsName: 'four' },
          { value: '', clsName: 'five' },
          { value: '5,000', clsName: 'six' },
        ],
      },
      {
        key: 5,
        data: [
          { value: '甘文斌', clsName: 'one' },
          { value: '0', clsName: 'two' },
          { value: ' ', clsName: 'three' },
          { value: '0', clsName: 'four' },
          { value: '', clsName: 'five' },
          { value: '0', clsName: 'six' },
        ],
      },
      {
        key: 6,
        data: [
          { value: '甘文斌', clsName: 'one' },
          { value: '0', clsName: 'two' },
          { value: ' ', clsName: 'three' },
          { value: '0', clsName: 'four' },
          { value: '', clsName: 'five' },
          { value: '0', clsName: 'six' },
        ],
      },
      {
        key: 7,
        data: [
          { value: '甘文斌', clsName: 'one' },
          { value: '0', clsName: 'two' },
          { value: ' ', clsName: 'three' },
          { value: '0', clsName: 'four' },
          { value: '', clsName: 'five' },
          { value: '0', clsName: 'six' },
        ],
      },
    ];

    return (
      <div>
        <div style={{ width: '6.9rem', margin: '0.3rem auto 0.2rem' }}>
          <span style={{ fontSize: '0.3rem', color: '#333' }}>班主任预测绩效</span>
        </div>
        <div className={styles.teacherList}>
          <div style={{ height: '0.3rem', width: '100%', borderRadius: '0.12rem' }} />
          <div className={styles.testList}>
            <MultipHeaderList
              dataList={teacherItem}
              customRenderHeader={() => <TeacherHeader columnsData={teacher} />}
              customRenderItem={rowData => <TeacherItem rowData={rowData} />}
            />
          </div>

          <div style={{ height: '0.3rem', width: '100%', borderRadius: '0.12rem' }} />
        </div>
      </div>
    );
  }
}
export default Group;
// connect(({ loading }) => ({ loading }))(Boss);
