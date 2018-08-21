/* GroupCollegeTab组件是专门针对首页的集团院内tab进行封装，因为其独特性，暂时只有一个地方使用，后期开发新需求的时候，有和该组件类似的，会再提取封装优化组件
*
* callBackFun{必传 Funciton}:父组件需要传入点击对应tab返回时触发接受数据的function，返回数据为（item,index）
* firstId{非必传 Number}:传入默认选中第几个tab,若不传入默认选中第一个tab
*
* */

import React, { Component } from 'react';
import styles from './Tab.less';
import lineChart from '../../assets/lineChart.svg';
import lineChart2 from '../../assets/lineChart2.svg';
import barGraph from '../../assets/barGraph.svg';
import barGraph2 from '../../assets/barGraph2.svg';

class LineChartTab extends Component {
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
      <div className={styles.newContenter}>
        <div className={styles.newsegmentCls}>
          <span
            onClick={() => this.selectTab(1)}
            className={firstId === 1 ? styles.newselectSpan1 : styles.span1}
          >
            <img
              className={styles.newiconImg}
              src={firstId === 1 ? lineChart2 : lineChart}
              alt=""
            />
          </span>
          <span
            onClick={() => this.selectTab(2)}
            className={firstId === 2 ? styles.newselectSpan2 : styles.span2}
          >
            <img className={styles.newiconImg2} src={firstId === 2 ? barGraph2 : barGraph} alt="" />
          </span>
        </div>
      </div>
    );
  }
}
export default LineChartTab;
