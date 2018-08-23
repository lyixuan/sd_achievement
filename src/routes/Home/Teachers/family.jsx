import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd-mobile';
import { assignUrlParams } from '../../../utils/routerUtils';
import { getCurrentAuthInfo } from '../../../utils/localStorage';
import styles from './index.less';
import LineChartTab from '../../../components/SelfTab/LineChartTab';
import PerformanceTab from '../../../components/SelfTab/PerformanceTab';
import dateImg from '../../../assets/dateSelect.svg';
import arrow from '../../../assets/arrow.svg';
import Dialog from '../../../components/Dialog';
import ButtonGroup from '../../../components/ButtonGroup/ButtonGroup';
import FormulaButton from '../../../components/ButtonGroup/FormulaButton';

class Boss extends React.Component {
  constructor(props) {
    super(props);
    const { urlParams = {} } = props;
    const initState = {
      paramsObj: {
        startTime: null, // 过滤开始时间
      },
      flag: 1,
      flag2: 1,
      dialogVisible: false,
      showTime: '2018.08.01 - 2018.08.22',
    };
    this.state = assignUrlParams(initState, urlParams);
  }
  checkoutUserAuth = () => {
    const currentAuthInfo = getCurrentAuthInfo() || {};
    const { groupType = null } = currentAuthInfo;
    return groupType;
  };

  showModel = bol => {
    if (bol) {
      this.choseDateArea();
      this.setState({ dialogVisible: bol });
    } else {
      this.setState({ dialogVisible: bol });
    }
  };

  choseDateArea = () => {
    const dateArr = [
      { id: '2018.08', name: '2018.08' },
      { id: '2018.07', name: '2018.07' },
      { id: '2018.06', name: '2018.06' },
      { id: '2018.05', name: '2018.05' },
    ];
    return dateArr;
  };

  renderGroupList = () => {
    // 此方法用于render出groupList
    const data = this.choseDateArea();
    return (
      <ButtonGroup
        dataSource={{ data }}
        // id={selectedTime}
        btnClass={styles.timeBtnStyle}
        btnSelectedClass={styles.timeBtnSelected}
        dataReturnFun={item => {
          const d = new Date();
          const first = d.getMonth() + 1;
          const aa = first < 10 ? `0${first}` : first;
          const testDate = `${d.getFullYear()}.${aa}`;
          console.log(item.id, testDate, item.id < testDate);
          if (item.id < testDate) {
            this.setState({
              dialogVisible: false,
              showTime: item.id,
            });
          } else {
            this.setState({
              showTime: '2018.08.01 - 2018.08.22',
              dialogVisible: false,
            });
          }
        }}
      />
    );
  };

  render() {
    const { dialogVisible, flag, flag2, showTime } = this.state;
    return (
      <div>
        <span>家族长首页,权限是:{this.checkoutUserAuth()}</span>
        <div style={{ marginTop: '1rem', position: 'relative', marginLeft: '0.3rem' }}>
          <span className={styles.timeName}>时间:</span>
          <span style={{ marginLeft: '0.1rem' }} className={styles.timeDate}>
            {showTime}
          </span>
          <img
            onClick={this.showModel.bind(this, true)}
            className={styles.timeImg}
            src={dateImg}
            alt="时间图片"
          />
        </div>

        <div className={styles.download}>
          {dialogVisible && (
            <Dialog
              visible={dialogVisible}
              showModel={bol => this.showModel(bol)}
              title={<p className={styles.dialogTitle}>请选择想要查看的月份</p>}
              modelClass={styles.modelClass}
              cotainerClass={styles.flexContainer}
            >
              <div className={styles.timeList}>{this.renderGroupList()}</div>
              <Button style={{ height: '0' }} />
            </Dialog>
          )}
        </div>

        <div className={styles.btnContainer} style={{ marginTop: '0.4rem', position: 'relative' }}>
          <FormulaButton
            dataSource={{ id: 1, name: '日均学分排名系数', score: '1000' }}
            dataReturnFun={item => {
              this.setState({ flag2: item.id });
            }}
            id={flag2}
          />
          <span className={styles.buttonLineStyle}>×️️</span>
          <FormulaButton
            dataSource={{ id: 2, name: '绩效基数', score: '900000' }}
            dataReturnFun={item => {
              this.setState({ flag2: item.id });
            }}
            id={flag2}
          />
          <span className={styles.buttonLineStyle}>×️️</span>
          <FormulaButton
            dataSource={{ id: 3, name: '管理规模系数', score: '70%' }}
            dataReturnFun={item => {
              this.setState({ flag2: item.id });
            }}
            id={flag2}
          />
        </div>

        <div
          style={{
            marginTop: '0.4rem',
            height: '6.68rem',
            width: '6.9rem',
            background: '#fff',
            marginLeft: '0.3rem',
            position: 'relative',
            borderRadius: '0.12rem',
          }}
        >
          <img
            style={{ left: flag2 === 1 ? '0.6rem' : flag2 === 2 ? '3.2rem' : '5.6rem' }}
            className={styles.u_arrowImg}
            src={arrow}
            alt="箭头"
          />
        </div>

        <div style={{ marginTop: '0.4rem' }}>
          <PerformanceTab
            firstId={flag2}
            callBackFun={id => {
              this.setState({ flag2: id });
            }}
          />
        </div>

        <div style={{ marginTop: '0.4rem' }}>
          <LineChartTab
            firstId={flag}
            callBackFun={id => {
              this.setState({ flag: id });
            }}
          />
        </div>
      </div>
    );
  }
}
export default connect(({ loading }) => ({ loading }))(Boss);
