import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { formatDate } from 'utils/utils';
import { getCurrentAuthInfo } from 'utils/decorator';
import { assignUrlParams } from 'utils/routerUtils';
import NoData from 'components/NoData/NoData';
import Loading from 'components/Loading/Loading';
import Switch from 'components/Switch/Switch';
import MultipHeaderList from 'components/ListView/listView';
import FloatIcon from 'components/FloatIcon/_floatIcon';
import RenderHeader from './_renderHeader';
import RenderItem from './_renderItem';
import styles from './index.less';

@getCurrentAuthInfo
class Details extends React.Component {
  static contextTypes = {
    setTitle: PropTypes.func,
  };
  constructor(props) {
    super(props);
    const { urlParams = {} } = props;
    console.log(this.currentAuthInfo());
    const {
      groupType = '',
      familyId = '',
      userId = '',
      department = null,
    } = this.currentAuthInfo();
    const initState = {
      paramsObj: {
        month: urlParams.month,
        groupType,
        familyId,
        type: urlParams.type, // 0：家族，1：小组
        userId,
      },
      collegeName: urlParams.collegeName ? urlParams.collegeName : department,
      collegeId: urlParams.collegeId,
      sort: 1,
      isShowSwitch: false, // 是否展示右侧切换按钮
      url:
        groupType === 'family'
          ? 'details/findGroupDetailByFamily' // 家族长-小组详情
          : 'details/collgeKpiFamilyDetail', // boss/院长-小组详情
    };

    this.state = assignUrlParams(initState, urlParams);
  }

  componentDidMount() {
    const { paramsObj, url, sort, collegeId } = this.state;
    const { dataList } = this.props.details;
    this.context.setTitle(Number(paramsObj.type) === 0 ? '家族绩效' : '小组绩效');
    this.getDataListLen(dataList);
    this.getListData(url, { sort }, { collegeId });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.details.dataList !== this.props.details.dataList) {
      this.getDataListLen(nextProps.details.dataList);
    }
    if (nextProps.details && this.props.details) {
      this.paramCom = {
        collegeId: this.props.details.collegeId,
        sort: this.props.details.sort,
        nextCollegeId: nextProps.details.collegeId,
        nextSort: nextProps.details.sort,
      };
    }
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
    this.props.dispatch({
      type: 'details/saveStatus',
      payload: { collegeId, sort },
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
  paramCom = {}; // 存储过滤器参数
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
    const { dataList = {} } = this.props.details;

    const param = [
      { groupName: '（自考）', id: 0 },
      { groupName: '（壁垒）', id: 1 },
      { groupName: '（孵化器）', id: 2 },
    ];
    return (
      <div className={styles.m_details}>
        <div className={styles.detailBtn}>
          <span>
            {formatDate(paramsObj.month)}预测绩效 - {collegeName}
          </span>
          {!isShowSwitch ? null : <Switch onChange={val => this.onChange(val)} />}
        </div>
        {this.props.loading && <Loading />}
        {/* *************** listview *************** */}
        {!dataList ? (
          <NoData showflag />
        ) : (
          param.map(item => {
            const newDataList = Object.keys(dataList).filter(obj => {
              if (dataList[obj]) {
                return Number(obj) === item.id;
              } else {
                return '';
              }
            });

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
                    <RenderItem
                      paramsObj={paramsObj}
                      rowData={rowData}
                      groupType={item.id}
                      paramCom={this.paramCom}
                    />
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
        <div style={{ paddingBottom: '.63rem', fontSize: 0 }}> 0</div>
      </div>
    );
  }
}
export default connect(({ details, loading }) => ({
  details,
  loading: loading.models.details,
}))(Details);
