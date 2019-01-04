import React, { Component } from 'react';
import styles from './staticPage.less';
import Top from '../../assets/top.svg';
import formula1 from '../../assets/formula1.png';
import formula2 from '../../assets/formula2.png';
import formula3 from '../../assets/formula3.png';
import formula4 from '../../assets/formula4.png';
import formula5 from '../../assets/formula5.png';
import formula6 from '../../assets/formula6.png';
import formula7 from '../../assets/formula7.png';
import formula8 from '../../assets/formula8.png';
import formula9 from '../../assets/formula9.png';
import formula10 from '../../assets/formula10.png';
import formula11 from '../../assets/formula11.png';
import formula12 from '../../assets/formula12.png';
import formula14 from '../../assets/formula14.png';
import formula15 from '../../assets/formula15.png';

class AlgorithmDescription extends Component {
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }
  onScroll = () => {
    const t = document.documentElement.scrollTop || document.body.scrollTop; // 滚动条滚动时，到顶部的距离
    const backTop = document.getElementById('backTopBtn'); // 返回顶部模块

    if (backTop !== null) {
      backTop.style.display = t >= 200 ? 'block' : 'none';
    }
  };
  scrollToAnchor = anchorName => {
    if (anchorName) {
      // 找到锚点
      const anchorElement = document.getElementById(anchorName);
      // 如果对应id的锚点存在，就跳转到锚点
      if (anchorElement) {
        anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }
    }
  };
  render() {
    return (
      <div className={styles.usercourse}>
        <div
          className={`${styles.floatIcon} ${styles.goTopCls}`}
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          id="backTopBtn"
        >
          <img src={Top} className={styles.imgTop} alt="回到顶部" />
        </div>

        <div className={styles.u_button1} onClick={() => this.scrollToAnchor('test3')}>
          a
        </div>
        <div className={styles.u_button2} onClick={() => this.scrollToAnchor('test6')}>
          a
        </div>
        <div className={styles.u_button3} onClick={() => this.scrollToAnchor('test9')}>
          a
        </div>
        <div className={styles.u_button4} onClick={() => this.scrollToAnchor('test10')}>
          a
        </div>
        <div className={styles.u_button5} onClick={() => this.scrollToAnchor('test11')}>
          a
        </div>
        <div className={styles.u_button6} onClick={() => this.scrollToAnchor('test14')}>
          a
        </div>
        <div className={styles.u_button7} onClick={() => this.scrollToAnchor('test15')}>
          a
        </div>

        <img src={formula1} alt="formula1" />
        <img src={formula2} alt="formula2" />
        <img id="test3" src={formula3} alt="formula3" />
        <img src={formula4} alt="formula4" />
        <img src={formula5} alt="formula5" />
        <img id="test6" src={formula6} alt="formula6" />
        <img src={formula7} alt="formula7" />
        <img src={formula8} alt="formula8" />
        <img id="test9" src={formula9} alt="formula9" />
        <img id="test10" src={formula10} alt="formula10" />
        <img id="test11" src={formula11} alt="formula11" />
        <img src={formula12} alt="formula12" />
        <img id="test14" src={formula14} alt="formula14" />
        <img id="test15" src={formula15} alt="formula15" />
      </div>
    );
  }
}

export default AlgorithmDescription;
