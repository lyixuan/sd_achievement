import React from 'react';
import styles from './index.less';
import MultipHeaderList from '../../../components/ListView/listView';
import TeacherHeader from '../../../components/TableItem/TeacherHeader';
import TeacherItem from '../../../components/TableItem/TeacherItem';

class TeacherPer extends React.Component {
  itemList = val => {
    const data = [];
    console.log(val);
    val.map((item, index) =>
      data.push({
        key: index,
        data: [
          { value: item.name, clsName: 'one', key: 't21' },
          { value: item.total, clsName: 'two', key: 't22' },
          { value: ' ', clsName: 'three', key: 't23' },
          { value: item.base, clsName: 'four', key: 't24' },
          { value: '', clsName: 'five', key: 't25' },
          { value: item.mark, clsName: 'six', key: 't26' },
        ],
      })
    );
    return data;
  };

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

    const { dataSource = [] } = this.props;
    const teacherItem = this.itemList(
      !dataSource ? [] : !dataSource.classKpiList ? [] : dataSource.classKpiList
    );

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
export default TeacherPer;
// connect(({ loading }) => ({ loading }))(Boss);
