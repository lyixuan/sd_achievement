/* ImgTitle组件参数介绍:一共2个参数，1个必传参数
*
* dataSource{必传 Obj}:数据源，对象结构:{imgSrc:'',numValue:'',titleValue:'',showDetail:''},里面为对象，numValue,titleValue，showDetail是专门为了运营长和班主任详情所用父组件需要处理好传入。
* spanFunction{非必传 Function}:传入该属性，则自组件显示numValue部分是由父组件去渲染dom返回回来的
*
* */

import React, { Component } from 'react';
// import classNames from 'classnames';
import styles from './ImgTitle.less';
import manageImg from '../../assets/manageImg.png';
import sortImg from '../../assets/sortImg.png';
import studentImg from '../../assets/studentImg.png';
import scoreImg from '../../assets/scoreImg.png';
import detaiPro from '../../assets/detaiPro.svg';

class ImgTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  spanFun = () => {
    const { spanFunction } = this.props;
    if (spanFunction && typeof spanFunction === 'function') {
      return this.props.spanFunction();
    } else {
      return <span className={styles.u_numSpan}>分数</span>;
    }
  };

  render() {
    const { dataSource = null } = this.props;
    const aa = dataSource.imgSrc;
    const imgContent = aa === 1 ? manageImg : aa === 2 ? studentImg : aa === 3 ? sortImg : scoreImg;
    return (
      <div className={styles.m_contener}>
        <img src={imgContent} alt="小图标" className={styles.u_leftImg} />
        <div className={styles.m_spanContener}>
          {this.spanFun(dataSource)}
          <br />
          <span className={styles.u_titleSpan}>
            <span>{dataSource.titleValue || '日均学分'}</span>
            <img
              src={detaiPro}
              alt="详情"
              className={styles.u_detailImg}
              style={{ display: dataSource.showDetail === 'show' ? 'inline' : 'none' }}
            />
          </span>
        </div>
      </div>
    );
  }
}

export default ImgTitle;
