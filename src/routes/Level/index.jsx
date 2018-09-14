import React from 'react';
import { connect } from 'dva';
import { getCurrentAuthInfo } from 'utils/decorator';
import { changeObj, formatDate } from '../../utils/utils';
import arrowRight from '../../assets/right.svg';
import MultipHeaderList from '../../components/ListView/listView';
import RenderHeader from './_renderHeader';
import RenderItem from './_renderItem';
import styles from './index.less';

@getCurrentAuthInfo
class Level extends React.Component {
  constructor(props) {
    super(props);
    const currentAuthInfo = this.currentAuthInfo || {};
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
  jumpDetail = (name, id) => {
    const { type } = this.state;
    this.props.setRouteUrlParams('/details', { collegeName: name, collegeId: id, type });
  };

  renderHeader = name => {
    return <div className={`${styles.m_list} ${styles.m_list_header}`}>{name}学院</div>;
  };
  renderFooter = (name, id) => {
    return (
      <div
        className={`${styles.m_list} ${styles.m_list_footer}`}
        onClick={() => this.jumpDetail(name, id)}
      >
        查看详情
      </div>
    );
  };
  render() {
    const { familyData = [] } = this.props.level;
    const dataList = changeObj(familyData);
    const { month } = this.state.paramsObj;
    return (
      <div className={styles.m_details}>
        <div className={styles.detailBtn}>
          <span>{formatDate(month)}预测绩效</span>
          <div className={styles.greyFont} onClick={() => this.jumpDetail('全部学院', '')}>
            绩效详情 <img src={arrowRight} alt="arrow" className={styles.arrowRight} />
          </div>
        </div>
        {/* *************** listview *************** */}
        {familyData.map(item => {
          const newDataList = Object.keys(dataList).filter(obj => obj === item.name);
          return (
            newDataList.length > 0 && (
              <MultipHeaderList
                key={item.id}
                dataList={dataList}
                groupName={item.name}
                id={item.id}
                renderHeader={name => this.renderHeader(name)}
                renderFooter={(name, id) => this.renderFooter(name, id)}
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
export default connect(({ level, loading }) => ({
  level,
  loading: loading.models.level,
}))(Level);
