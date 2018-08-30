import React from 'react';
import styles from './index.less';
import arrow from '../../../assets/arrow.svg';
import ImgTitle from '../../../components/ImgTitle/ImgTitle';
import redtriangle from '../../../assets/redtriangle.png';
import greentriangle from '../../../assets/greentriangle.png';
import MultipHeaderList from '../../../components/ListView/listView';
import CustomRenderHeader from '../../../components/TableItem/TableHeader';
import CustomRenderItem from '../../../components/TableItem/TableItem';
import Modal from '../../../components/Modal/index';
import styles1 from './_tableFile.less';

class TableFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalflag: false,
    };
  }

  showModal = () => {
    if (this.props.flag === 2 && this.props.flag2 === 2) {
      this.setState({
        modalflag: true,
      });
    }
  };
  hideModal = () => {
    this.setState({
      modalflag: false,
    });
  };

  render() {
    const { flag = 1, flag2 = 1 } = this.props;

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
      {
        key: 5,
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

    const { modalflag } = this.state;

    return (
      <div className={styles.m_perTable}>
        <img
          style={{ left: flag2 === 1 ? '0.7rem' : flag2 === 2 ? '3.25rem' : '5.7rem' }}
          className={styles.u_arrowImg}
          src={arrow}
          alt="箭头"
        />
        <div className={styles.m_scoreContener}>
          <div onClick={this.showModal}>
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
          </div>

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
        <div className={styles.testList} style={{ marginTop: '0.2rem' }}>
          <MultipHeaderList
            dataList={flag === 1 && flag2 === 3 ? tableList3 : tableList}
            customRenderHeader={() => (
              <CustomRenderHeader
                columnsData={flag === 1 ? (flag2 === 3 ? columns3 : columns2) : columns}
              />
            )}
            customRenderItem={rowData => <CustomRenderItem rowData={rowData} />}
          />
          <div style={{ height: '0.3rem', width: '100%', borderRadius: '0.12rem' }} />
        </div>

        <div className={styles1.selfModal}>
          <Modal
            visible={modalflag}
            modelClass={styles1.m_dialogWrap}
            footer={[{ text: '确定', onPress: this.hideModal }]}
          >
            <p className={styles1.dialogTitle}>温馨提示</p>
            <div className={styles1.flexContainer}>
              <p className={styles1.WordCls}>人均在服学员数=在服学院员/老师数</p>
              <p className={styles1.WordCls}>学员从属判定规则和老师人效判定规则请参</p>
              <p className={styles1.WordCls}>考绩效算法说明</p>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}
export default TableFile;
