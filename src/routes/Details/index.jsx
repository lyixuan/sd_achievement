import React from 'react';
import PropTypes from 'prop-types';
import { assignUrlParams } from '../../utils/routerUtils';
import Switch from '../../components/Switch/Switch';
import MultipHeaderList from '../../components/ListView/listView';
import RenderHeader from './_renderHeader';
import RenderItem from './_renderItem';
import FloatIcon from '../../components/FloatIcon/_floatIcon';
import styles from './index.less';

class Details extends React.Component {
  static contextTypes = {
    setTitle: PropTypes.func,
  };
  constructor(props) {
    super(props);
    const { urlParams = {} } = props;
    const initState = {
      paramsObj: {
        dateTime: '2018年7月预测绩效',
        groupType: 1,
        familyType: 2,
      },
      collegeName: urlParams.collegeName,
    };

    this.state = assignUrlParams(initState, urlParams);
  }
  componentDidMount() {
    this.context.setTitle('hhehhhh');
  }
  onChange = val => {
    console.log(val);
  };
  changeCollegeName(v) {
    this.setState({
      collegeName: v,
    });
  }
  render() {
    const { paramsObj, collegeName } = this.state;
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
          <span>
            {paramsObj.dateTime} - {collegeName}
          </span>
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
                customRenderHeader={sectionData => <RenderHeader sectionData={sectionData} />}
                customRenderItem={rowData => <RenderItem paramsObj={paramsObj} rowData={rowData} />}
              />
            )
          );
        })}
        {/* *************** floatIcon *************** */}
        <FloatIcon changeCollegeName={val => this.changeCollegeName(val)} />
      </div>
    );
  }
}
export default Details;
// connect(({ Details, loading }) => ({
//   Details,
//   isloading: loading.models.Details,
// }))(Details);
