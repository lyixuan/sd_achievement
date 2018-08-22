import React from 'react';
import Switch from '../../../components/Switch/Switch';
import MultipHeaderList from '../../../components/ListView/listView';
import RenderHeader from './_renderHeader';
import RenderItem from './_renderItem';
import styles from './index.less';

class HistoryDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  onChange = val => {
    console.log(val);
  };
  render() {
    const dataList = {
      selfExam: [
        {
          groupName: '大气层',
          arr: 'activeCS',
          familyNum: '103123',
          key: '0',
        },
        {
          groupName: 'selfExam',
          arr: 'activeCS',
          familyNum: '3232',
          key: '1',
        },
        {
          groupName: 'selfExam',
          arr: 'activeCS',
          familyNum: '233',
          key: '2',
        },
        {
          groupName: 'selfExam',
          arr: 'activeCS',
          familyNum: '112',
          key: '3',
        },
      ],
      barrier: [
        {
          groupName: 'barrier',
          arr: 'activeCS',
          familyNum: '1022',
          key: '0',
        },
        {
          groupName: 'barrier',
          arr: 'activeCS',
          familyNum: '2',
          key: '1',
        },
        {
          groupName: 'barrier',
          arr: 'activeCS',
          familyNum: '2',
          key: '2',
        },
        {
          groupName: 'barrier',
          arr: 'activeCS',
          familyNum: '2',
          key: '3',
        },
      ],
    };
    const param = [
      { groupName: 'selfExam', arr: 'activeCS' },
      { groupName: 'barrier', arr: 'activeCS' },
      { groupName: 'incubator', arr: 'activeCS' },
    ];

    return (
      <div className={styles.m_details}>
        <div className={styles.detailBtn}>
          <span>2018年7月预测绩效</span>
          <Switch onChange={val => this.onChange(val)} />
        </div>
        {/* *************** listview *************** */}
        {param.map(item => {
          const newDataList = Object.keys(dataList).filter(obj => obj === item.groupName);
          return (
            newDataList.length > 0 && (
              <MultipHeaderList
                key={item.groupName}
                dataList={dataList}
                groupName={item.groupName}
                customRenderHeader={() => <RenderHeader />}
                customRenderItem={rowData => <RenderItem rowData={rowData} />}
              />
            )
          );
        })}
      </div>
    );
  }
}
export default HistoryDetails;
// connect(({ Details, loading }) => ({
//   Details,
//   isloading: loading.models.Details,
// }))(Details);
