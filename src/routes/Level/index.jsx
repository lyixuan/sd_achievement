import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { getCurrentAuthInfo } from 'utils/decorator';
import { changeObj, formatDate } from 'utils/utils';
import MultipHeaderList from 'components/ListView/listView';
import Loading from 'components/Loading/Loading';
import NoData from 'components/NoData/NoData';
import arrowRight from '../../assets/right.svg';
import RenderHeader from './_renderHeader';
import RenderItem from './_renderItem';
import styles from './index.less';

@getCurrentAuthInfo
class Level extends React.Component {
  static contextTypes = {
    setTitle: PropTypes.func,
  };
  constructor(props) {
    super(props);
    const currentAuthInfo = this.currentAuthInfo() || {};
    const { collegeId = 0, groupType = '', userId = '' } = currentAuthInfo;
    const { urlParams = {} } = props;

    const initState = {
      paramsObj: {
        collegeId,
        groupType,
        month: urlParams.month,
        userId,
      },
      type: urlParams.type, // 0：家族，1：小组
    };
    this.state = Object.assign(initState, currentAuthInfo);
  }
  componentDidMount() {
    const { type } = this.state;
    this.context.setTitle(Number(type) === 0 ? '家族绩效分档' : '小组绩效分档');
    // 区分家族分档，小组分档
    const fetchUrl =
      Number(type) === 0 ? 'level/collgeKpiFamilyHomePage' : 'level/collgeKpiGroupHomePage';
    this.getListData(fetchUrl); //
  }
  getListData = url => {
    this.props.dispatch({
      type: url,
      payload: this.state.paramsObj,
    });
  };
  jumpDetail = (name, id, month) => {
    const { type } = this.state;
    this.props.setRouteUrlParams('/details', { month, collegeName: name, collegeId: id, type });
  };

  renderHeader = name => {
    return <div className={`${styles.m_list} ${styles.m_list_header}`}>{name}学院</div>;
  };
  renderFooter = (name, id, month) => {
    return (
      <div
        className={`${styles.m_list} ${styles.m_list_footer}`}
        onClick={() => this.jumpDetail(name, id, month)}
      >
        查看详情
      </div>
    );
  };
  render() {
    const { familyData = [] } = this.props.level;
    const dataList = changeObj(familyData);
    const { month, groupType } = this.state.paramsObj;
    return (
      <div className={styles.m_details}>
        <div className={styles.detailBtn}>
          <span>{formatDate(month)}预测绩效</span>
          {groupType === 'boss' ? (
            <div className={styles.greyFont} onClick={() => this.jumpDetail('全部学院', '', month)}>
              绩效详情 <img src={arrowRight} alt="arrow" className={styles.arrowRight} />
            </div>
          ) : null}
        </div>

        {this.props.loading && <Loading />}
        {/* *************** listview *************** */}
        {!dataList || Object.keys(dataList).length === 0 ? (
          <NoData showflag />
        ) : (
          familyData.map(item => {
            const newDataList = Object.keys(dataList).filter(obj => Number(obj) === item.id);
            return (
              newDataList.length > 0 && (
                <MultipHeaderList
                  key={item.id}
                  dataList={dataList}
                  groupName={item.id}
                  collegeName={item.name}
                  renderHeader={name => this.renderHeader(name)}
                  renderFooter={(name, id) => this.renderFooter(name, id, month)}
                  customRenderHeader={() => <RenderHeader type={this.state.type} />}
                  customRenderItem={rowData => <RenderItem rowData={rowData} />}
                />
              )
            );
          })
        )}
      </div>
    );
  }
}
export default connect(({ level, loading }) => ({
  level,
  loading: loading.models.level,
}))(Level);
