import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { assignUrlParams } from 'utils/routerUtils';
import AllGroupPandect from 'container/AllGroupPandect';
import PerGroupPandect from 'container/PerGroupPandect';
import ButtonGroup from 'components/ButtonGroup/ButtonGroup';
import { getCurrentAuthInfo } from 'utils/decorator';
import Loading from 'components/Loading/Loading';

import styles from './pandect.less';

@getCurrentAuthInfo
class Boss extends React.Component {
  static contextTypes = {
    setTitle: PropTypes.func,
  };

  constructor(props) {
    super(props);
    const { urlParams = {} } = props;
    const initState = {
      TotalKpigroupType: 'all', // 集团总绩效类型;
      groupAvgKpiGroupType: 'all', // 人均总绩效类型;
      groupList: [
        { id: 'all', name: '全体总绩效' },
        { id: 'family', name: '家族长绩效' },
        { id: 'group', name: '运营长绩效' },
        { id: 'class', name: '班主任绩效' },
      ],
    };
    this.state = assignUrlParams(initState, urlParams);
  }
  componentDidMount() {
    this.getGroupTotalKpiData();
    this.getGroupAvgKpiData();
  }

  onChangeGroupAvgKpi = groupAvgKpiGroupType => {
    this.getGroupAvgKpiData({ groupAvgKpiGroupType });
    this.setState({ groupAvgKpiGroupType });
  };
  onChangeGroupTotalKpi = TotalKpigroupType => {
    this.getGroupTotalKpiData({ TotalKpigroupType });
    this.setState({ TotalKpigroupType });
  };
  getGroupTotalKpiData = (params = {}) => {
    const { TotalKpigroupType } = this.state;
    const { userId } = this.currentAuthInfo;
    const groupType = params.TotalKpigroupType || TotalKpigroupType;
    const newParams = { userId, groupType };
    this.props.dispatch({
      type: 'bosshome/findGroupTotalKpi',
      payload: newParams,
    });
  };
  getGroupAvgKpiData = (params = {}) => {
    const { groupAvgKpiGroupType } = this.state;
    const { userId } = this.currentAuthInfo;
    const groupType = params.groupAvgKpiGroupType || groupAvgKpiGroupType;
    const newParams = { userId, groupType };
    this.props.dispatch({
      type: 'bosshome/findGroupAvgKpi',
      payload: newParams,
    });
  };
  checkoutUserAuth = () => {
    const { groupType = null } = this.currentAuthInfo;
    return groupType;
  };

  render() {
    const { TotalKpigroupType, groupAvgKpiGroupType, groupList } = this.state;
    const { bosshome = {}, loading } = this.props;
    const groupTotalKpiList = bosshome.groupTotalKpiList || [];
    const groupAvgKpiList = bosshome.groupAvgKpiList || [];
    const groupType = this.checkoutUserAuth();
    return (
      <div>
        <AllGroupPandect
          dataSource={{
            data: groupTotalKpiList || [],
            title: `${groupType === 'boss' ? '集团总绩效' : '学院总绩效'}`,
          }}
        >
          <div className={styles.buttonContainer}>
            <ButtonGroup
              id={TotalKpigroupType}
              dataSource={{ data: groupList }}
              dataReturnFun={params => {
                this.onChangeGroupTotalKpi(params.id);
              }}
              btnClass={styles.btnClass}
              btnSelectedClass={styles.btnSelectedClass}
            />
          </div>
        </AllGroupPandect>
        <PerGroupPandect
          dataSource={{
            data: groupAvgKpiList,
            title: `${groupType === 'boss' ? '集团人均绩效' : '学院人均绩效'}`,
          }}
        >
          <div className={styles.buttonContainer}>
            <ButtonGroup
              id={groupAvgKpiGroupType}
              dataSource={{ data: groupList }}
              dataReturnFun={params => {
                this.onChangeGroupAvgKpi(params.id);
              }}
              btnClass={styles.btnClass}
              btnSelectedClass={styles.btnSelectedClass}
            />
          </div>
        </PerGroupPandect>
        {loading && <Loading />}
      </div>
    );
  }
}
export default connect(({ loading, bosshome }) => ({ loading: loading.models.bosshome, bosshome }))(
  Boss
);
