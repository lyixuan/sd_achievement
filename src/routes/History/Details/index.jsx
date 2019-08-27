import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { formatDate } from 'utils/utils';
import { getCurrentAuthInfo } from 'utils/decorator';
import { assignUrlParams } from 'utils/routerUtils';
import Switch from 'components/Switch/Switch';
import MultipHeaderList from 'components/ListView/listView';
import Loading from 'components/Loading/Loading';
import NoData from 'components/NoData/NoData';
import FloatIcon from 'components/FloatIcon/_floatIcon';
import RenderHeader from './_renderHeader';
import RenderItem from './_renderItem';
import styles from './index.less';

@getCurrentAuthInfo
class HistoryDetails extends React.Component {
  static contextTypes = {
    setTitle: PropTypes.func,
  };
  constructor(props) {
    super(props);
    const { urlParams = {} } = props;
    const currentAuthInfo = this.currentAuthInfo() || {};
    const {
      collegeId = '',
      groupType = '',
      userId = '',
      currentGroupName = null,
    } = currentAuthInfo;
    const initState = {
      paramsObj: {
        month: urlParams.month || '2018-08',
        groupType,
        type: urlParams.type, // 0：家族，1：小组
        userId,
      },
      collegeName: groupType === 'boss' ? '全部学院' : currentGroupName,
      collegeId,
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
    const { url, collegeId, paramsObj } = this.state;
    const { dataList } = this.props.historyDetails;
    this.getDataListLen(dataList);
    this.getListData(url, { sort: 1 }, { collegeId });
    this.context.setTitle(Number(paramsObj.type) === 0 ? '家族确定绩效' : '小组确定绩效');
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.historyDetails.dataList !== this.props.historyDetails.dataList) {
      this.getDataListLen(nextProps.historyDetails.dataList);
    }
  }
  onChange = val => {
    const { collegeId, url } = this.state;
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
  // 列表展示条数大于3则展示switch按钮
  getDataListLen = data => {
    let len = 0;
    if (data) {
      Object.keys(data).map(item => {
        if (data[item]) len += data[item].length;
        if (len > 3) {
          this.setState({
            isShowSwitch: true,
          });
        } else {
          this.setState({
            isShowSwitch: false,
          });
        }
        return '';
      });
    } else {
      this.setState({
        isShowSwitch: false,
      });
    }
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

    const { paramsObj, collegeName, isShowSwitch } = this.state;
    return (
      <div className={styles.m_details}>
        <div className={styles.detailBtn}>
          <span>
            {formatDate(paramsObj.month)}实发绩效 - {collegeName}
          </span>
          {!isShowSwitch ? null : <Switch onChange={val => this.onChange(val)} />}
        </div>
        {this.props.loading && <Loading />}
        {/* *************** listview *************** */}
        {!dataList || Object.keys(dataList).length === 0 ? (
          <NoData showflag />
        ) : (
          param.map(item => {
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
          })
        )}
        {/* *************** floatIcon *************** */}
        <FloatIcon
          changeCollegeName={val => this.changeCollegeName(val)}
          groupType={paramsObj.groupType}
        />
      </div>
    );
  }
}
export default connect(({ historyDetails, loading }) => ({
  historyDetails,
  loading: loading.models.historyDetails,
}))(HistoryDetails);
