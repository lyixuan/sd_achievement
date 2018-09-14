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
        month: urlParams.month || '2018-08',
        groupType: urlParams.groupType || 'boss',
        type: urlParams.type, // 0：家族，1：小组
      },
      collegeName: urlParams.collegeName,
      collegeId: urlParams.collegeId,
      sort: 1,
      isShowSwitch: false, // 是否展示右侧切换按钮
      url:
        urlParams.groupType === 'family'
          ? 'details/findGroupDetailByFamily'
          : 'details/collgeKpiFamilyDetail', // 区分小组详情的身份
    };

    this.state = assignUrlParams(initState, urlParams);
  }

  componentDidMount() {
    const { paramsObj, url, sort, collegeId } = this.state;
    const { dataList } = this.props.details;
    this.context.setTitle(Number(paramsObj.type) === 0 ? '家族绩效页' : '小组绩效页');
    this.getDataListLen(dataList);
    this.getListData(url, { sort }, { collegeId });
  }
  onChange = val => {
    const { url, collegeId } = this.state;
    const sort = val ? 0 : 1; // 1: 高-低，0：低-高
    this.setState({
      sort,
    });
    this.getListData(url, { sort }, { collegeId });
  };
  getListData = (url, sort, collegeId) => {
    const param = Object.assign(this.state.paramsObj, sort, collegeId);
    this.props.dispatch({
      type: url,
      payload: param,
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
    const { url, sort } = this.state;
    this.setState({
      collegeName: v.name,
      collegeId: v.id,
    });
    this.getListData(url, { sort }, { collegeId: v.id });
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
                customRenderItem={rowData => (
                  <RenderItem paramsObj={paramsObj} rowData={rowData} groupType={item.id} />
                )}
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
