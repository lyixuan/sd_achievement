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
import multiple from '../../../assets/multiple.svg';
import Dialog from '../../../components/Dialog';
import ButtonGroup from '../../../components/ButtonGroup/ButtonGroup';
import FormulaButton from '../../../components/ButtonGroup/FormulaButton';
import ImgTitle from '../../../components/ImgTitle/ImgTitle';
import redtriangle from '../../../assets/redtriangle.png';
import greentriangle from '../../../assets/greentriangle.png';

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

    const scoreLeft = () => (
      <span className={styles.u_numSpan}>
        {flag2 === 1 ? '9.5分' : flag2 === 2 ? '1000人' : '10人'}
      </span>
    );
    const scoreRight = () => (
      <span className={styles.u_numSpan}>
        {flag2 === 3 ? (
          '1000人'
        ) : (
          <span>
            {2}
            <img
              src={flag2 === 1 ? redtriangle : greentriangle}
              alt="均分图标"
              className={styles.u_triangleImg}
            />
            /{50} ({'20%'})
          </span>
        )}
      </span>
    );

    return (
      <div>
        <div className={styles.m_timeContener}>
          <span className={styles.timeName}>时间:</span>
          <span className={styles.timeDate}>{showTime}</span>
          <img
            onClick={this.showModel.bind(this, true)}
            className={styles.timeImg}
            src={dateImg}
            alt="时间图片"
          />
        </div>

        <div className={styles.m_btnContainer}>
          <FormulaButton
            dataSource={{ id: 1, name: '日均学分排名系数', score: '1000' }}
            dataReturnFun={item => {
              this.setState({ flag2: item.id });
            }}
            id={flag2}
          />
          <img className={styles.u_buttonLineStyle} src={multiple} alt="乘号" />
          <FormulaButton
            dataSource={{ id: 2, name: '绩效基数', score: '900000' }}
            dataReturnFun={item => {
              this.setState({ flag2: item.id });
            }}
            id={flag2}
          />
          <img className={styles.u_buttonLineStyle} src={multiple} alt="乘号" />
          <FormulaButton
            dataSource={{ id: 3, name: flag === 1 ? '管理规模系数' : '绩效比例', score: '70%' }}
            dataReturnFun={item => {
              this.setState({ flag2: item.id });
            }}
            id={flag2}
          />
        </div>

        <div className={styles.m_perTable}>
          <img
            style={{ left: flag2 === 1 ? '0.7rem' : flag2 === 2 ? '3.25rem' : '5.7rem' }}
            className={styles.u_arrowImg}
            src={arrow}
            alt="箭头"
          />
          <div className={styles.m_scoreContener}>
            <ImgTitle
              dataSource={{
                imgSrc: flag2 === 1 ? 4 : flag2 === 2 ? 2 : 1,
                titleValue:
                  flag2 === 1
                    ? '日均学分'
                    : flag2 === 2 ? '人均在服学员' : flag === 1 ? '管理规模' : '组内老师',
                showDetail: flag === 2 && flag2 === 2 ? 'show' : 'hidden',
              }}
              spanFunction={() => scoreLeft()}
            />
            <div className={styles.u_ySplitLine} />
            <ImgTitle
              dataSource={{
                imgSrc: flag2 === 1 ? 3 : flag2 === 2 ? 3 : 2,
                titleValue: flag2 === 3 ? '在服学员' : '排名',
              }}
              spanFunction={() => scoreRight()}
            />
          </div>
          <div className={styles.u_xSplitLine} />
        </div>

        <div>
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
