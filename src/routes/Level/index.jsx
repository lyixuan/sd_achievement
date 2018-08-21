import React from 'react';
import arrowRight from '../../assets/right.svg';
import MultipHeaderList from '../../components/ListView/listView';
import RenderHeader from './_renderHeader';
import RenderItem from './_renderItem';
import styles from './index.less';

class Level extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  jumpDetail = param => {
    this.props.setRouteUrlParams('/details', { hh: 1 });
    console.log(param);
  };
  renderHeader = name => {
    return <div className={`${styles.m_list} ${styles.m_list_header}`}>{name}</div>;
  };
  renderFooter = () => {
    return <div className={`${styles.m_list} ${styles.m_list_footer}`}>查看详情</div>;
  };
  render() {
    const dataList = {
      selfExam: [
        {
          groupName: 'selfExam',
          arr: 'activeCS',
          familyNum: '0',
          key: '0',
        },
        {
          groupName: 'selfExam',
          arr: 'activeCS',
          familyNum: '2',
          key: '1',
        },
        {
          groupName: 'selfExam',
          arr: 'activeCS',
          familyNum: '2',
          key: '2',
        },
        {
          groupName: 'selfExam',
          arr: 'activeCS',
          familyNum: '2',
          key: '3',
        },
      ],
      barrier: [
        {
          groupName: 'barrier',
          arr: 'activeCS',
          familyNum: '0',
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
          familyNum: '-1',
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
          <div onClick={() => this.jumpDetail()}>
            绩效详情 <img src={arrowRight} alt="arrow" className={styles.arrowRight} />
          </div>
        </div>
        {/* *************** listview *************** */}
        {param.map(item => {
          const newDataList = Object.keys(dataList).filter(obj => obj === item.groupName);
          console.log(newDataList);
          return (
            newDataList.length > 0 && (
              <MultipHeaderList
                key={item.groupName}
                dataList={dataList}
                groupName={item.groupName}
                renderHeader={name => this.renderHeader(name)}
                renderFooter={() => this.renderFooter()}
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
export default Level;
// connect(({ Details, loading }) => ({
//   Details,
//   isloading: loading.models.Details,
// }))(Level);
