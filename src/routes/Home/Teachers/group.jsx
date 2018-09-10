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
        key: 'tit11leOne111',
        clsName: 'one',
      },
      {
        title: '总绩效',
        dataIndex: 'titleTwo',
        key: 'titl11eTwo111',
        clsName: 'two',
      },
      {
        title: '=',
        dataIndex: 'titleThree',
        key: 'titl11eThree111',
        clsName: 'three',
      },
      {
        title: '基本绩效',
        dataIndex: 'titleFour',
        key: 'title11Four111',
        clsName: 'four',
      },
      {
        title: '+',
        dataIndex: 'titleFive',
        key: 'title11Five111',
        clsName: 'five',
      },
      {
        title: '打分绩效',
        dataIndex: 'titleSix',
        key: 'title11Six111',
        clsName: 'six',
      },
    ];

    const teacherItem = [
      {
        key: 111,
        data: [
          { value: '甘文斌', clsName: 'one', key: 't111' },
          { value: '10,000', clsName: 'two', key: 't211' },
          { value: ' ', clsName: 'three', key: 't311' },
          { value: '5,000', clsName: 'four', key: 't411' },
          { value: '', clsName: 'five', key: 't511' },
          { value: '5,000', clsName: 'six', key: 't611' },
        ],
      },
      {
        key: 211,
        data: [
          { value: '甘文斌', clsName: 'one', key: 't11' },
          { value: '10,000', clsName: 'two', key: 't12' },
          { value: ' ', clsName: 'three', key: 't13' },
          { value: '5,000', clsName: 'four', key: 't14' },
          { value: '', clsName: 'five', key: 't15' },
          { value: '5,000', clsName: 'six', key: 't16' },
        ],
      },
      {
        key: 311,
        data: [
          { value: '甘文斌', clsName: 'one', key: 't21' },
          { value: '10,000', clsName: 'two', key: 't22' },
          { value: ' ', clsName: 'three', key: 't23' },
          { value: '5,000', clsName: 'four', key: 't24' },
          { value: '', clsName: 'five', key: 't25' },
          { value: '5,000', clsName: 'six', key: 't26' },
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
