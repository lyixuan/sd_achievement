import React from 'react';
import styles from './index.less';
import multiple from '../../../assets/multiple.svg';
import FormulaButton from '../../../components/ButtonGroup/FormulaButton';
import { formatMoney } from '../../../utils/utils';

class ButtonFile extends React.Component {
  render() {
    const { flag2 = 1, flag = 1, dataSource = null } = this.props;
    const { dailyCredit = null, baseKpi = null, manageScale = null, name = null } = !dataSource
      ? {}
      : dataSource;
    const ratio = !dailyCredit ? 0 : !dailyCredit.ratio ? 0 : dailyCredit.ratio;
    const personNumAvg = !baseKpi ? 0 : !baseKpi.personNumAvg ? 0 : baseKpi.personNumAvg;
    const manageNum = !manageScale ? 0 : !manageScale.value ? 0 : manageScale.value;
    return (
      <div className={styles.m_btnContainer}>
        <div className={styles.m_titile}>
          <span className={styles.u_spanTitle}>预测绩效计算 | </span>
          <span className={styles.u_spanTitle}>{name || '英语1组'}</span>
        </div>

        <FormulaButton
          dataSource={{ id: 1, name: '日均学分排名系数', score: ratio }}
          dataReturnFun={item => {
            this.props.changeFlag(item);
          }}
          id={flag2}
        />
        <img className={styles.u_buttonLineStyle} src={multiple} alt="乘号" />
        <FormulaButton
          dataSource={{ id: 2, name: '绩效基数', score: formatMoney(personNumAvg) }}
          dataReturnFun={item => {
            this.props.changeFlag(item);
          }}
          id={flag2}
        />
        <img className={styles.u_buttonLineStyle} src={multiple} alt="乘号" />
        <FormulaButton
          dataSource={{
            id: 3,
            name: flag === 1 ? '管理规模系数' : '绩效比例',
            score: `${manageNum}%`,
          }}
          dataReturnFun={item => {
            this.props.changeFlag(item);
          }}
          id={flag2}
        />
      </div>
    );
  }
}

export default ButtonFile;
