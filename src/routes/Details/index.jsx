import React from 'react';
import { connect } from 'dva';
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
        month: '2018-08',
        groupType: 'boss',
        type: urlParams.type, // 0：家族，1：小组
        collegeId: urlParams.collegeId,
      },
      collegeName: urlParams.collegeName,
      isShowSwitch: false, // 是否展示右侧切换按钮
    };

    this.state = assignUrlParams(initState, urlParams);
  }

  componentDidMount() {
    const { paramsObj } = this.state;
    const { dataList } = this.props.details;
    this.context.setTitle(Number(paramsObj.type) === 0 ? '家族绩效页' : '小组绩效页');
    this.getDataListLen(dataList);
    this.getListData();
  }
  onChange = val => {
    console.log(val);
  };
  getListData = () => {
    this.props.dispatch({
      type: 'details/collgeKpiFamilyDetail',
      payload: this.state.paramsObj,
    });
  };
  // 列表展示条数大于2则展示switch按钮
  getDataListLen = data => {
    Object.keys(data).map(item => {
      if (data[item].length > 2) {
        this.setState({
          isShowSwitch: true,
        });
      }
      return '';
    });
  };
  changeCollegeName(v) {
    this.setState({
      collegeName: v,
    });
  }

  render() {
    const { paramsObj, collegeName, isShowSwitch } = this.state;
    const { dataList } = this.props.details;

    const param = [
      { groupName: '（自考）', id: 0 },
      { groupName: '（壁垒）', id: 1 },
      { groupName: '（孵化器）', id: 2 },
    ];
    return (
      <div className={styles.m_details}>
        <div className={styles.detailBtn}>
          <span>
            {paramsObj.month}预测绩效 - {collegeName}
          </span>
          {!isShowSwitch ? null : <Switch onChange={val => this.onChange(val)} />}
        </div>
        {/* *************** listview *************** */}
        {param.map(item => {
          const newDataList = Object.keys(dataList).filter(obj => Number(obj) === item.id);

          return (
            newDataList.length > 0 && (
              <MultipHeaderList
                key={item.id}
                dataList={dataList}
                groupName={item.id}
                customRenderHeader={sectionData => (
                  <RenderHeader
                    sectionData={sectionData}
                    type={paramsObj.type}
                    groupName={item.groupName}
                  />
                )}
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
export default connect(({ details, loading }) => ({
  details,
  loading: loading.models.details,
}))(Details);
