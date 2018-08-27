import React from 'react';
import { connect } from 'dva';
import { assignUrlParams } from '../../../utils/routerUtils';
import { getCurrentAuthInfo } from '../../../utils/localStorage';
import styles from './index.less';
import arrow from '../../../assets/arrow.svg';
import multiple from '../../../assets/multiple.svg';
import FormulaButton from '../../../components/ButtonGroup/FormulaButton';
import ImgTitle from '../../../components/ImgTitle/ImgTitle';
import redtriangle from '../../../assets/redtriangle.png';
import greentriangle from '../../../assets/greentriangle.png';
import MultipHeaderList from '../../../components/ListView/listView';
import CustomRenderHeader from '../../../components/TableItem/TableHeader';
import CustomRenderItem from '../../../components/TableItem/TableItem';
import TimeSelect from '../../../components/TimeSelect/TimeSelect';

class Boss extends React.Component {
  constructor(props) {
    super(props);
    const { urlParams = {} } = props;
    const initState = {
      paramsObj: {
        startTime: null, // 过滤开始时间
      },
      flag: 2,
      flag2: 2,
      showTime: '2018.09',
    };
    this.state = assignUrlParams(initState, urlParams);
  }
  checkoutUserAuth = () => {
    const currentAuthInfo = getCurrentAuthInfo() || {};
    const { groupType = null } = currentAuthInfo;
    return groupType;
  };

  render() {
    const { flag, flag2, showTime } = this.state;

    const columnsData = {
      titleOne: '小组排名',
      titleTwo: '档位内最低分',
      titleThree: '系数',
    };
    const tableList = [
      {
        key: 1,
        titleOne: '0% ～ 5%',
        titleTwo: 11,
        titleThree: 2.5,
      },
      {
        key: 2,
        titleOne: '5% ～ 15%',
        titleTwo: 9.9,
        titleThree: 2,
      },
      {
        key: 3,
        titleOne: '15% ～ 60%',
        titleTwo: 8.5,
        titleThree: 1.5,
      },
      {
        key: 4,
        titleOne: '60% ～ 100%',
        titleTwo: 7.7,
        titleThree: 0.8,
      },
    ];

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
          <TimeSelect
            showTime={showTime}
            onChange={item => {
              this.setState({ showTime: item.id });
            }}
          />
        </div>
        <div className={styles.m_performanceContener}>
          <span className={styles.u_totalNum}>1,500,000元</span>
          <div className={styles.m_performanceMoney}>
            <div className={styles.u_basicMoney}>
              <span className={styles.u_spanMoney}>1,000,000</span>
              <br />
              <span className={styles.u_spanBasic}>基本绩效</span>
            </div>
            <div className={styles.u_splitLine} />
            <div className={styles.u_scoreMoney}>
              <span className={styles.u_spanMoney}>500,000</span>
              <br />
              <span className={styles.u_spanBasic}>打分绩效</span>
            </div>
          </div>
        </div>

        <div className={styles.m_warningP}>
          <p className={styles.u_pContent}>
            *预估绩效每天与小德学分同步更新；学院打分绩效为浮动绩效，月底根据本月工作表现确定实发绩效
          </p>
        </div>

        <div className={styles.m_titile}>
          <span className={styles.u_spanTitle}>预测绩效计算 | </span>
          <span className={styles.u_spanTitle}>英语1组</span>
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
          <div className={styles.testList}>
            <MultipHeaderList
              dataList={tableList}
              customRenderHeader={() => <CustomRenderHeader columnsData={columnsData} />}
              customRenderItem={rowData => <CustomRenderItem rowData={rowData} />}
            />
          </div>
        </div>

        <div className={styles.testList}>
          <MultipHeaderList
            dataList={tableList}
            customRenderHeader={() => <CustomRenderHeader columnsData={columnsData} />}
            customRenderItem={rowData => <CustomRenderItem rowData={rowData} />}
          />
        </div>
      </div>
    );
  }
}
export default connect(({ loading }) => ({ loading }))(Boss);
