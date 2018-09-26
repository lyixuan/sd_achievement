import React from 'react';
import styles from './_tableFile.less';
import arrow from '../../../assets/arrow.svg';
import ImgTitle from '../../../components/ImgTitle/ImgTitle';
import NoData from '../../../components/NoData/NoData';
import { formatMoney } from '../../../utils/utils';
// import redtriangle from '../../../assets/redtriangle.png';
// import greentriangle from '../../../assets/greentriangle.png';
import MultipHeaderList from '../../../components/ListView/listView';
import CustomRenderHeader from '../../../components/TableItem/TableHeader';
import CustomRenderItem from '../../../components/TableItem/TableItem';
import Modal from '../../../components/Modal/index';

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

  itemList = val => {
    const data = [];
    val.map((item, index) =>
      data.push({
        key: index,
        flag: item.flag,
        data: [
          {
            value: item.range,
            clsName: 'familyCls',
            key: 1,
          },
          {
            value: formatMoney(item.value || 0),
            clsName: 'familyCls',
            key: 2,
          },
        ],
      })
    );
    return data;
  };

  itemList2 = val => {
    const data = [];
    val.map((item, index) =>
      data.push({
        key: index,
        flag: item.flag,
        data: [
          { value: item.value, clsName: 'otherDateCls', key: 1 },
          { value: `${item.minVal * 100}%`, clsName: 'otherStuCls', key: 2 },
          { value: item.range, clsName: 'otherPreValCls', key: 3 },
        ],
      })
    );

    return data;
  };

  render() {
    const { flag = 1, flag2 = 1, dataSource = [], titleData = null } = this.props;
    const { modalflag } = this.state;
    const tableList =
      flag === 2 && flag2 === 3
        ? this.itemList2(!dataSource ? [] : dataSource)
        : this.itemList(!dataSource ? [] : dataSource);

    // 用户为运营长前2个tab切换时，table列头数据
    const columns = [
      {
        title: '小组排名',
        dataIndex: 'titleOne',
        key: 'columnsOne',
        clsName: 'halfDatacls',
      },
      {
        title: flag2 === 1 ? '系数' : '绩效基数',
        dataIndex: 'titleThree',
        key: 'columnsThree',
        clsName: 'halfStuCls',
      },
    ];

    // 用户为家族长tab切换时table列头数据
    const columns2 = [
      {
        title: flag2 === 1 ? '家族排名比' : flag2 === 2 ? '家族排名' : '区间',
        dataIndex: 'titleOne',
        key: 'columns3One',
        clsName: 'halfDatacls',
      },
      {
        title: flag2 === 2 ? '绩效基数' : '系数',
        dataIndex: 'titleTwo',
        key: 'columns3Two',
        clsName: 'halfStuCls',
      },
    ];
    // 用户为运营长最后一个tab切换时，table列头数据
    const columns3 = [
      {
        title: '组内老师',
        dataIndex: 'titleOne',
        key: 'columns3One',
        clsName: 'otherDataCls',
      },
      {
        title: '运营长分配比例',
        dataIndex: 'titleTwo',
        key: 'columns3Two',
        clsName: 'otherStuCls',
      },
      {
        title: '班主任分配比例',
        dataIndex: 'titleTwo',
        key: 'columns3Three',
        clsName: 'otherPreValCls',
      },
    ];

    const buttonData = !titleData ? null : titleData;
    const dailyCredit = !buttonData
      ? null
      : !buttonData.dailyCredit ? null : buttonData.dailyCredit;
    const baseKpi = !buttonData ? null : !buttonData.baseKpi ? null : buttonData.baseKpi;
    const manageScale = !buttonData
      ? null
      : !buttonData.manageScale ? null : buttonData.manageScale;
    const scoreLeft = () => (
      <span className={styles.u_numSpan}>
        {flag2 === 1
          ? !dailyCredit
            ? 0
            : !dailyCredit.value && dailyCredit.value !== 0 ? 0 : dailyCredit.value.toFixed(2)
          : flag2 === 2
            ? !baseKpi
              ? 0
              : !baseKpi.personNumAvg && baseKpi.personNumAvg !== 0
                ? 0
                : `${formatMoney(baseKpi.personNumAvg || 0)}人`
            : !manageScale
              ? 0
              : !manageScale.manageNum && manageScale.classNum !== 0
                ? 0
                : `${formatMoney(manageScale.classNum || 0)}人`}
      </span>
    );
    const classNum = !manageScale
      ? 1
      : !manageScale.manageNum && manageScale.manageNum !== 0 ? 1 : manageScale.manageNum || 1;
    const index =
      flag2 === 1
        ? !dailyCredit
          ? 1
          : !dailyCredit.index && dailyCredit.index !== 0 ? 2 : dailyCredit.index || 1
        : !baseKpi ? 2 : !baseKpi.index && baseKpi.index !== 0 ? 2 : baseKpi.index || 1;
    const size =
      flag2 === 1
        ? !dailyCredit ? 3 : !dailyCredit.size && dailyCredit.size !== 0 ? 3 : dailyCredit.size
        : (!baseKpi ? 3 : !baseKpi.size && baseKpi.size !== 0 ? 3 : baseKpi.size) || 1;
    const perSize = (index / size * 100).toFixed(2);
    const scoreRight = () => (
      <span className={styles.u_numSpan}>
        {flag2 === 3 ? (
          `${formatMoney(classNum || 0)}人`
        ) : (
          <span>
            {index}/{size} ({`${perSize}%`})
          </span>
        )}
      </span>
    );
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
          {tableList.length === 0 ? (
            <NoData showflag />
          ) : (
            <MultipHeaderList
              dataList={tableList}
              customRenderHeader={() => (
                <CustomRenderHeader
                  columnsData={flag === 1 ? columns2 : flag2 === 3 ? columns3 : columns}
                />
              )}
              customRenderItem={rowData => <CustomRenderItem rowData={rowData} />}
            />
          )}
          <div style={{ height: '0.3rem', width: '100%', borderRadius: '0.12rem' }} />
        </div>

        <div className={styles.selfModal}>
          <Modal
            visible={modalflag}
            modelClass={styles.m_dialogWrap}
            footer={[{ text: '确定', onPress: this.hideModal }]}
          >
            <p className={styles.dialogTitle}>温馨提示</p>
            <div className={styles.flexContainer}>
              <p className={styles.WordCls}>人均在服学员数=在服学员数/老师数</p>
              <p className={styles.WordCls}>学员从属判定规则和老师人效判定规则请参</p>
              <p className={styles.WordCls}>考{`"绩效算法说明"`}</p>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}
export default TableFile;
