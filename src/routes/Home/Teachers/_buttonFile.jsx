import React from 'react';
import { connect } from 'dva';
import styles from './index.less';
import multiple from '../../../assets/multiple.svg';
import FormulaButton from '../../../components/ButtonGroup/FormulaButton';

class Boss extends React.Component {
  render() {
    const { flag2 = 1, flag = 1 } = this.props;
    return (
      <div className={styles.m_btnContainer}>
        <FormulaButton
          dataSource={{ id: 1, name: '日均学分排名系数', score: '1000' }}
          dataReturnFun={item => {
            this.props.changeFlag(item);
          }}
          id={flag2}
        />
        <img className={styles.u_buttonLineStyle} src={multiple} alt="乘号" />
        <FormulaButton
          dataSource={{ id: 2, name: '绩效基数', score: '900000' }}
          dataReturnFun={item => {
            this.props.changeFlag(item);
          }}
          id={flag2}
        />
        <img className={styles.u_buttonLineStyle} src={multiple} alt="乘号" />
        <FormulaButton
          dataSource={{ id: 3, name: flag === 1 ? '管理规模系数' : '绩效比例', score: '70%' }}
          dataReturnFun={item => {
            this.props.changeFlag(item);
          }}
          id={flag2}
        />
      </div>
    );
  }
}
export default connect(({ loading }) => ({ loading }))(Boss);
