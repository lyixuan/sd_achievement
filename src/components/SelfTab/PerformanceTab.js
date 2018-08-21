/* PerformanceTab组件是专门针对首页的家族分档，绩效占比tab进行封装，因为其独特性，暂时只有一个地方使用，后期开发新需求的时候，有和该组件类似的，会再提取封装优化组件
*
* callBackFun{必传 Funciton}:父组件需要传入点击对应tab返回时触发接受数据的function，返回数据为（item,index）
* firstId{非必传 Number}:传入默认选中第几个tab,若不传入默认选中第一个tab
*
* */

import React, { Component } from 'react';
import styles from './Tab.less';
import path2 from '../../assets/path2.svg';
import path from '../../assets/path.svg';
import bracket from '../../assets/bracket.svg';
import bracket2 from '../../assets/bracket2.svg';

class PerformanceTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  selectTab(id) {
    if (!this.props.callBackFun || typeof this.props.callBackFun !== 'function') {
      console.warn('未传入callBackFun方法或传入的非function');
    } else {
      this.props.callBackFun(id);
    }
  }

  render() {
    const { firstId = 1 } = this.props;
    return (
      <div className={styles.segmentCls}>
        <span onClick={() => this.selectTab(1)} className={firstId === 1 ? styles.selectSpan1 : ''}>
          <i className={styles.text}>家族分档</i>
          <img className={styles.iconImg} src={firstId === 1 ? path2 : path} alt="" />
        </span>
        <span onClick={() => this.selectTab(2)} className={firstId === 2 ? styles.selectSpan2 : ''}>
          <i className={styles.text}>绩效占比</i>
          <img className={styles.iconImg} src={firstId === 2 ? bracket2 : bracket} alt="" />
        </span>
      </div>
    );
  }
}
export default PerformanceTab;
