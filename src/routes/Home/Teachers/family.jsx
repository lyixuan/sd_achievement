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

import TeacherHeader from '../../../components/TableItem/TeacherHeader';
import TeacherItem from '../../../components/TableItem/TeacherItem';
import TimeSelect from '../../../components/TimeSelect/TimeSelect';

class Boss extends React.Component {
  constructor(props) {
    super(props);
    const { urlParams = {} } = props;
    const initState = {
      paramsObj: {
        startTime: null, // 过滤开始时间
      },
      flag: 1,
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

    // 用户为运营长前tab切换时，table列头数据
    const columns = [
      {
        title: flag2 === 1 ? '小组排名' : flag2 === 2 ? '小组排名' : '组内老师',
        dataIndex: 'titleOne',
        key: 'titleOne',
        clsName: flag2 === 3 ? 'otherDataCls' : 'dateCls',
      },
      {
        title: flag2 === 1 ? '档位内最低分' : flag2 === 2 ? '档位内最低人均' : '运营长分批比例',
        dataIndex: 'titleTwo',
        key: 'titleTwo',
        clsName: flag2 === 3 ? 'otherStuCls' : 'stuCls',
      },
      {
        title: flag2 === 1 ? '系数' : flag2 === 2 ? '绩效基数' : '班主任分配比例',
        dataIndex: 'titleThree',
        key: 'titleThree',
        clsName: flag2 === 3 ? 'otherPreValCls' : 'preValCls',
      },
    ];

    // 用户为家族长前两个tab切换时，table列头数据
    const columns2 = [
      {
        title: flag2 === 1 ? '家族排名比' : '家族排名',
        dataIndex: 'titleOne',
        key: 'titleOne',
        clsName: 'dateCls',
      },
      {
        title: flag2 === 1 ? '档位内最低分' : '档位内最低人均',
        dataIndex: 'titleTwo',
        key: 'titleTwo',
        clsName: 'stuCls',
      },
      {
        title: flag2 === 1 ? '系数' : '绩效基数',
        dataIndex: 'titleThree',
        key: 'titleThree',
        clsName: 'preValCls',
      },
    ];
    // 用户为家族长最后一个tab切换时table列头数据
    const columns3 = [
      {
        title: '区间',
        dataIndex: 'titleOne',
        key: 'titleOne',
        clsName: 'halfDatacls',
      },
      {
        title: '系数',
        dataIndex: 'titleTwo',
        key: 'titleTwo',
        clsName: 'halfStuCls',
      },
    ];

    // 用户为家族长最后一个tab切换，table行数据
    const tableList3 = [
      {
        key: 1,
        data: [{ value: '30及以上', clsName: 'familyCls' }, { value: '1.8', clsName: 'familyCls' }],
      },
      {
        key: 2,
        data: [{ value: '25 ～ 30', clsName: 'familyCls' }, { value: '1.6', clsName: 'familyCls' }],
      },
      {
        key: 3,
        data: [{ value: '20 ～ 25', clsName: 'familyCls' }, { value: '1.4', clsName: 'familyCls' }],
      },
      {
        key: 4,
        data: [{ value: '15 ～ 20', clsName: 'familyCls' }, { value: '1.2', clsName: 'familyCls' }],
      },
    ];

    // 用户为运营长全部tab切换和家族长前两个tab切换，table行数据
    const tableList = [
      {
        key: 1,
        data: [
          {
            value: flag2 === 1 ? '0% ～ 5%' : flag2 === 2 ? '0% ～ 10%' : 1,
            clsName: flag2 === 3 ? 'otherDateCls' : 'dateCls',
          },
          {
            value: flag2 === 1 ? '11' : flag2 === 2 ? '1,200人' : '30%',
            clsName: flag2 === 3 ? 'otherStuCls' : 'stuCls',
          },
          {
            value: flag2 === 1 ? '2.5' : flag2 === 2 ? '10,000' : '20% 20% 40%',
            clsName: flag2 === 3 ? 'otherPreValCls' : 'preValCls',
          },
        ],
      },
      {
        key: 2,
        data: [
          {
            value: flag2 === 1 ? '5% ～ 15%' : flag2 === 2 ? '10% ～ 40%' : 2,
            clsName: flag2 === 3 ? 'otherDateCls' : 'dateCls',
          },
          {
            value: flag2 === 1 ? '9.9' : flag2 === 2 ? '1,000人' : '40%',
            clsName: flag2 === 3 ? 'otherStuCls' : 'stuCls',
          },
          {
            value: flag2 === 1 ? '2' : flag2 === 2 ? '8,000' : '40%',
            clsName: flag2 === 3 ? 'otherPreValCls' : 'preValCls',
          },
        ],
      },
      {
        key: 3,
        data: [
          {
            value: flag2 === 1 ? '15% ～ 60%' : flag2 === 2 ? '40% ～ 70%' : 3,
            clsName: flag2 === 3 ? 'otherDateCls' : 'dateCls',
          },
          {
            value: flag2 === 1 ? '8.5' : flag2 === 2 ? '800人' : '30%',
            clsName: flag2 === 3 ? 'otherStuCls' : 'stuCls',
          },
          {
            value: flag2 === 1 ? '1.5' : flag2 === 2 ? '6,000' : '25% 40%',
            clsName: flag2 === 3 ? 'otherPreValCls' : 'preValCls',
          },
        ],
      },
      {
        key: 4,
        data: [
          {
            value: flag2 === 1 ? '60% ～ 100%' : flag2 === 2 ? '70% ～ 90%' : 4,
            clsName: flag2 === 3 ? 'otherDateCls' : 'dateCls',
          },
          {
            value: flag2 === 1 ? '7.7' : flag2 === 2 ? '500人' : '40%',
            clsName: flag2 === 3 ? 'otherStuCls' : 'stuCls',
          },
          {
            value: flag2 === 1 ? '0.8' : flag2 === 2 ? '4,000' : '20% 20% 40% 20% 20%',
            clsName: flag2 === 3 ? 'otherPreValCls' : 'preValCls',
          },
        ],
      },
    ];

    // 用户为运营长前tab切换时，table列头数据
    const teacher = [
      {
        title: '老师名称',
        dataIndex: 'titleOne',
        key: 'titleOne',
        clsName: 'one',
      },
      {
        title: '总绩效',
        dataIndex: 'titleTwo',
        key: 'titleTwo',
        clsName: 'two',
      },
      {
        title: '=',
        dataIndex: 'titleThree',
        key: 'titleThree',
        clsName: 'three',
      },
      {
        title: '基本绩效',
        dataIndex: 'titleFour',
        key: 'titleFour',
        clsName: 'four',
      },
      {
        title: '+',
        dataIndex: 'titleFive',
        key: 'titleFive',
        clsName: 'five',
      },
      {
        title: '打分绩效',
        dataIndex: 'titleSix',
        key: 'titleSix',
        clsName: 'six',
      },
    ];

    const teacherItem = [
      {
        key: 1,
        data: [
          { value: '甘文斌', clsName: 'one' },
          { value: '10，000', clsName: 'two' },
          { value: ' ', clsName: 'three' },
          { value: '5，000', clsName: 'four' },
          { value: '', clsName: 'five' },
          { value: '5,000', clsName: 'six' },
        ],
      },
      {
        key: 2,
        data: [
          { value: '甘文斌', clsName: 'one' },
          { value: '10，000', clsName: 'two' },
          { value: ' ', clsName: 'three' },
          { value: '5，000', clsName: 'four' },
          { value: '', clsName: 'five' },
          { value: '5,000', clsName: 'six' },
        ],
      },
      {
        key: 3,
        data: [
          { value: '甘文斌', clsName: 'one' },
          { value: '10，000', clsName: 'two' },
          { value: ' ', clsName: 'three' },
          { value: '5，000', clsName: 'four' },
          { value: '', clsName: 'five' },
          { value: '5,000', clsName: 'six' },
        ],
      },
      {
        key: 4,
        data: [
          { value: '甘文斌', clsName: 'one' },
          { value: '0', clsName: 'two' },
          { value: ' ', clsName: 'three' },
          { value: '0', clsName: 'four' },
          { value: '', clsName: 'five' },
          { value: '0', clsName: 'six' },
        ],
      },
      {
        key: 5,
        data: [
          { value: '甘文斌', clsName: 'one' },
          { value: '0', clsName: 'two' },
          { value: ' ', clsName: 'three' },
          { value: '0', clsName: 'four' },
          { value: '', clsName: 'five' },
          { value: '0', clsName: 'six' },
        ],
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
              dataList={flag === 1 && flag2 === 3 ? tableList3 : tableList}
              customRenderHeader={() => (
                <CustomRenderHeader
                  columnsData={flag === 1 ? (flag2 === 3 ? columns3 : columns2) : columns}
                />
              )}
              customRenderItem={rowData => <CustomRenderItem rowData={rowData} />}
            />
          </div>
        </div>

        <div style={{ width: '6.9rem', margin: '0.2rem auto' }}>
          <span style={{ fontSize: '0.3rem', color: '#333' }}>班主任预测绩效</span>
        </div>
        <div className={styles.teacherList}>
          <div style={{ height: '0.3rem', width: '100%', borderRadius: '0.12rem' }} />
          <MultipHeaderList
            dataList={teacherItem}
            customRenderHeader={() => <TeacherHeader columnsData={teacher} />}
            customRenderItem={rowData => <TeacherItem rowData={rowData} />}
          />
        </div>
      </div>
    );
  }
}
export default connect(({ loading }) => ({ loading }))(Boss);
