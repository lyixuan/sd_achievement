import React from 'react';
import styles from './index.less';
import multiple from '../../../assets/multiple.svg';
import FormulaButton from '../../../components/ButtonGroup/FormulaButton';
import { formatMoney } from '../../../utils/utils';

class ButtonFile extends React.Component {
  render() {
    const { tabFlag = 1, userFlag = 1, dataSource = null } = this.props;
    const { dailyCredit = null, baseKpi = null, manageScale = null, name = null } = !dataSource
      ? {}
      : dataSource;
    const { ratio = 0 } = !dailyCredit ? 0 : dailyCredit;
    const { value = 0 } = !baseKpi ? 0 : baseKpi;
    const manageNum = !manageScale ? 0 : !manageScale.value ? 0 : manageScale.value;
    return (
      <div className={styles.m_btnContainer}>
        <div className={styles.m_titile}>
          <span className={styles.u_spanTitle}>预测绩效计算 | </span>
          <span className={styles.u_spanTitle}>{name}</span>
        </div>

        <FormulaButton
          dataSource={{ id: 1, name: '日均学分排名系数', score: ratio }}
          dataReturnFun={item => {
            this.props.changeFlag(item);
          }}
          id={tabFlag}
        />
        <img className={styles.u_buttonLineStyle} src={multiple} alt="乘号" />
        <FormulaButton
          dataSource={{ id: 2, name: '绩效基数', score: formatMoney(value) }}
          dataReturnFun={item => {
            this.props.changeFlag(item);
          }}
          id={tabFlag}
        />
        <img className={styles.u_buttonLineStyle} src={multiple} alt="乘号" />
        <FormulaButton
          dataSource={{
            id: 3,
            name: userFlag === 1 ? '管理规模系数' : '绩效比例',
            score: userFlag === 1 ? manageNum : `${manageNum * 100}%`,
          }}
          dataReturnFun={item => {
            this.props.changeFlag(item);
          }}
          id={tabFlag}
        />
      </div>
    );
  }
}

export default ButtonFile;
