import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { assignUrlParams } from 'utils/routerUtils';
import AllGroupPandect from 'container/AllGroupPandect';
import PerGroupPandect from 'container/PerGroupPandect';
import ButtonGroup from 'components/ButtonGroup/ButtonGroup';
import { getCurrentAuthInfo } from 'utils/decorator';

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
      paramsObj: {
        startTime: null, // 过滤开始时间
      },
      chartData: [
        { val: 3, name: '2018.03', isPredicted: 0 },
        { val: 5, name: '2018.04', isPredicted: 0 },
        { val: 7, name: '2018.05', isPredicted: 0 },
        { val: 10, name: '2018.06', isPredicted: 1 },
        { val: 1, name: '2018.07', isPredicted: 1 },
      ],
      chartZhanbi: [
        { val: 30, name: '拍学院' },
        { val: 50, name: '自变量' },
        { val: 70, name: '好波' },
        { val: 10, name: '芝士' },
        { val: 30, name: '葫芦' },
      ],
      chartMulti: [
        { val: 10, name: '2018.03', isPredicted: 0, baseMoney: 0, markMoney: 0 },
        { val: 14, name: '2018.04', isPredicted: 0, baseMoney: 0, markMoney: 0 },
        { val: 15, name: '2018.05', isPredicted: 0, baseMoney: 0, markMoney: 0 },
        { val: 16, name: '2018.06', isPredicted: 1, baseMoney: 9, markMoney: 7 },
        { val: 17, name: '2018.07', isPredicted: 1, baseMoney: 10, markMoney: 7 },
      ],
    };
    this.state = assignUrlParams(initState, urlParams);
  }
  componentDidMount() {
    this.getData();
  }

  onChangeAllGroup = id => {
    console.log(id);
  };
  getData = (params = {}) => {
    const userId = this.currentAuthInfo.id;
    const { groupType } = this.currentAuthInfo;
    const newParams = { userId, groupType, ...params };
    this.props.dispatch({
      type: 'bosshome/findGroupTotalKpi',
      payload: newParams,
    });
  };
  checkoutUserAuth = () => {
    const { groupType = null } = this.currentAuthInfo;
    return groupType;
  };

  render() {
    const { chartData, chartMulti } = this.state;
    const groupList = [
      { id: 1, name: '全体总绩效' },
      { id: 2, name: '家族长绩效' },
      { id: 3, name: '运营长绩效' },
      { id: 4, name: '班主任绩效' },
    ];
    return (
      <div>
        <AllGroupPandect dataSource={{ data: chartMulti, title: '集团总绩效' }}>
          <div className={styles.buttonContainer}>
            <ButtonGroup
              dataSource={{ data: groupList }}
              dataReturnFun={id => {
                this.onChangeAllGroup(id);
              }}
              btnClass={styles.btnClass}
              btnSelectedClass={styles.btnSelectedClass}
            />
          </div>
        </AllGroupPandect>
        <PerGroupPandect dataSource={{ data: chartData, title: '集团人均绩效' }}>
          <div className={styles.buttonContainer}>
            <ButtonGroup
              dataSource={{ data: groupList }}
              dataReturnFun={id => {
                this.onChangeAllGroup(id);
              }}
              btnClass={styles.btnClass}
              btnSelectedClass={styles.btnSelectedClass}
            />
          </div>
        </PerGroupPandect>
      </div>
    );
  }
}
export default connect(({ loading, bosshome }) => ({ loading, bosshome }))(Boss);
