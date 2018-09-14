import React from 'react';
import { connect } from 'dva';
import Switch from '../../../components/Switch/Switch';
import MultipHeaderList from '../../../components/ListView/listView';
import RenderHeader from './_renderHeader';
import RenderItem from './_renderItem';
import FloatIcon from '../../../components/FloatIcon/_floatIcon';
import styles from './index.less';
import { assignUrlParams } from '../../../utils/routerUtils';

class HistoryDetails extends React.Component {
  constructor(props) {
    super(props);
    const { urlParams = {} } = props;
    const initState = {
      paramsObj: {
        month: urlParams.month || '2018-07',
        groupType: urlParams.groupType || 'all',
        type: urlParams.type || '1', // 0：家族，1：小组
      },
      collegeName: urlParams.collegeName || '全部学院',
      collegeId: urlParams.collegeId || 103,
      sort: '1',
      isShowSwitch: false, // 是否展示右侧切换按钮
      url:
        urlParams.groupType === 'family'
          ? 'historyDetails/findFamilyHistoryKpi'
          : 'historyDetails/findGroupHistoryKpi', // 区分小组详情的身份
    };

    this.state = assignUrlParams(initState, urlParams);
  }
  componentDidMount() {
    const { url, collegeId } = this.state;

    this.getListData(url, { sort: 1 }, { collegeId });
  }
  onChange = val => {
    const sort = val ? 0 : 1; // 1: 高-低，0：低-高
    this.setState({
      sort,
    });
    this.getListData(this.state.url, { sort });
  };
  getListData = (url, sort, collegeId) => {
    const param = Object.assign(this.state.paramsObj, sort, collegeId);
    this.props.dispatch({
      type: url,
      payload: param,
    });
  };
  changeCollegeName = v => {
    const { sort, url } = this.state;
    this.setState({
      collegeName: v.name,
      collegeId: v.id,
    });
    this.getListData(url, { sort }, { collegeId: v.id });
  };
  render() {
    const { dataList } = this.props.historyDetails;
    const param = [
      { groupName: '（自考）', id: 0 },
      { groupName: '（壁垒）', id: 1 },
      { groupName: '（孵化器）', id: 2 },
    ];

    const { paramsObj, collegeName } = this.state;
    return (
      <div className={styles.m_details}>
        <div className={styles.detailBtn}>
          <span>
            {paramsObj.month}实发绩效 - {collegeName}
          </span>
          <Switch onChange={val => this.onChange(val)} />
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
                customRenderItem={rowData => (
                  <RenderItem paramsObj={paramsObj} rowData={rowData} groupType={item.id} />
                )}
                // customRenderHeader={() => <RenderHeader />}
                // customRenderItem={rowData => <RenderItem rowData={rowData} />}
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
export default connect(({ historyDetails, loading }) => ({
  historyDetails,
  isloading: loading.models.historyDetails,
}))(HistoryDetails);
