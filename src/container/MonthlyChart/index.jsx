import React from 'react';
import { Icon } from 'antd-mobile';
import styles from './index.less';

export default class ChartCotainer extends React.Component {
  toCreateInfo = () => {
    if (this.props.toLevelPage) {
      this.props.toLevelPage();
    }
  };
  render() {
    const { children = [] } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <a className={styles.clickBtn} onClick={this.toCreateInfo.bind(this)}>
            <span className={styles.echartMore}>查看详情</span>
            <Icon type="right" className={styles.echartsIcon} size="lg" />
          </a>
          {Array.isArray(children) ? [...children] : { ...children }}
        </div>
      </div>
    );
  }
}
