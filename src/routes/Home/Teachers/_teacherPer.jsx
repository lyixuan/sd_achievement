import React from 'react';
import styles from './index.less';
import MultipHeaderList from '../../../components/ListView/listView';
import TeacherHeader from '../../../components/TableItem/TeacherHeader';
import TeacherItem from '../../../components/TableItem/TeacherItem';
import NoData from '../../../components/NoData/NoData';
import { formatMoney } from '../../../utils/utils';

class TeacherPer extends React.Component {
  itemList = val => {
    const data = [];
    // console.log(val);
    val.map((item, index) =>
      data.push({
        key: index,
        data: [
          { value: item.name, clsName: 'one', key: 't21' },
          { value: formatMoney(item.total || 0), clsName: 'two', key: 't22' },
          { value: ' ', clsName: 'three', key: 't23' },
          { value: formatMoney(item.base || 0), clsName: 'four', key: 't24' },
          { value: '', clsName: 'five', key: 't25' },
          { value: formatMoney(item.mark || 0), clsName: 'six', key: 't26' },
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
    const dataSource = this.props.dataSource || {};
    const teacherItem = this.itemList(dataSource.classKpiList || []);
    return (
      <div>
        <div style={{ width: '6.9rem', margin: '0.3rem auto 0.2rem' }}>
          <span style={{ fontSize: '0.3rem', color: '#333' }}>班主任预测绩效</span>
        </div>
        <div className={styles.teacherList}>
          <div style={{ height: '0.1rem', width: '100%', borderRadius: '0.12rem' }} />
          <div style={{ margin: '0.1rem auto' }} className={styles.testList}>
            {teacherItem.length === 0 ? (
              <NoData showflag />
            ) : (
              <MultipHeaderList
                dataList={teacherItem}
                customRenderHeader={() => <TeacherHeader columnsData={teacher} />}
                customRenderItem={rowData => <TeacherItem rowData={rowData} />}
              />
            )}
          </div>
          <div style={{ height: '0.3rem', width: '100%', borderRadius: '0.12rem' }} />
        </div>
      </div>
    );
  }
}
export default TeacherPer;
// connect(({ loading }) => ({ loading }))(Boss);
