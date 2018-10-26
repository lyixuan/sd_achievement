import React from 'react';
import styles from './_tableFile.less';
import arrow from '../../../assets/arrow.svg';
import ImgTitle from '../../../components/ImgTitle/ImgTitle';
import NoData from '../../../components/NoData/NoData';
import { formatMoney } from '../../../utils/utils';
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

  // 信息弹框提示
  showModal = () => {
    if (this.props.userFlag === 2 && this.props.tabFlag === 2) {
      this.setState({
        modalflag: true,
      });
    }
  };

  // 弹框隐藏
  hideModal = () => {
    this.setState({
      modalflag: false,
    });
  };

  // 处理table行数据
  itemList = val => {
    const data = [];
    val.map((item, index) =>
      data.push({
        key: index,
        flag: item.flag,
        data: [
          { value: item.range, clsName: 'familyCls', key: 1 },
          { value: formatMoney(item.value || 0), clsName: 'familyCls', key: 2 },
        ],
      })
    );
    return data;
  };

  // 针对运营长和班主任button选择3的时候，每行3列数据处理
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
    const { userFlag = 1, tabFlag = 1, dataSource = [], titleData = null } = this.props;
    const { modalflag } = this.state;
    const tableList =
      userFlag === 2 && tabFlag === 3
        ? this.itemList2(!dataSource ? [] : dataSource)
        : this.itemList(!dataSource ? [] : dataSource);

    // 用户tab切换时table列头数据
    const columns = [
      {
        title:
          userFlag === 2 ? '小组排名' : (tabFlag === 1 ? '家族排名比' : (tabFlag === 2 ? '家族排名' : '区间')),
        dataIndex: 'titleOne',
        key: 'columns3One',
        clsName: 'halfDatacls',
      },
      {
        title: tabFlag === 2 ? '绩效基数' : '系数',
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
    const {dailyCredit=null,baseKpi=null,manageScale=null}=!buttonData ? null : buttonData
    const dailyValue = !dailyCredit ? 0 : !dailyCredit.value && dailyCredit.value !== 0 ? 0 : dailyCredit.value.toFixed(2)
    const baseValue = !baseKpi ? 0 : !baseKpi.personNumAvg && baseKpi.personNumAvg !== 0 ? 0 : `${formatMoney(baseKpi.personNumAvg || 0)}人`;
    const manageValue = !manageScale ? 0 : !manageScale.manageNum && manageScale.classNum !== 0 ? 0 : `${formatMoney(manageScale.classNum || 0)}人`
    const scoreLeftValue = tabFlag === 1 ? dailyValue: (tabFlag === 2?baseValue:manageValue)
    const scoreLeft = () => (
      <span className={styles.u_numSpan}>{scoreLeftValue}</span>
    );
    const {manageNum=0}=!manageScale?0:manageScale
    const {index=0,size=1} = tabFlag === 1?(!dailyCredit ? 0:dailyCredit):(!baseKpi ? 0 : baseKpi);
    const {creditPercent=0} = !dailyCredit ? 0:dailyCredit
    const {rankPercent=0} = !baseKpi ? 0 : baseKpi
    const rankVal = tabFlag === 1?creditPercent:rankPercent
    const perSize = (rankVal * 100).toFixed(2);
    const scoreRight = () => (
      <span className={styles.u_numSpan}>
        {tabFlag === 3 ? (`${formatMoney(manageNum || 0)}人`) : (
          <span>
            {index}/{size} ({`${perSize}%`})
          </span>
        )}
      </span>
    );
    return (
      <div className={styles.m_perTable}>
        <img
          style={{ left: tabFlag === 1 ? '0.7rem' : tabFlag === 2 ? '3.25rem' : '5.7rem' }}
          className={styles.u_arrowImg}
          src={arrow}
          alt="箭头"
        />
        <div className={styles.m_scoreContener}>
          <div onClick={this.showModal}>
            <ImgTitle
              dataSource={{
                imgSrc: tabFlag === 1 ? 4 : tabFlag === 2 ? 2 : 1,
                titleValue:
                  tabFlag === 1 ? '日均学分' : tabFlag === 2 ? '人均在服学员' : userFlag === 1 ? '管理规模' : '组内老师',
                showDetail: userFlag === 2 && tabFlag === 2 ? 'show' : 'hidden',
              }}
              spanFunction={() => scoreLeft()}
            />
          </div>

          <div className={styles.u_ySplitLine} />
          <ImgTitle
            dataSource={{
              imgSrc: tabFlag === 1 ? 3 : tabFlag === 2 ? 3 : 2,
              titleValue: tabFlag === 3 ? '在服学员' : '排名',
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
                <CustomRenderHeader columnsData={tabFlag === 3&&userFlag===2? columns3 : columns} />
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
