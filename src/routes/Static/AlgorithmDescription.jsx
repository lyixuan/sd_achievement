import React, { Component } from 'react';
import styles from './staticPage.less';
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
import formula13 from '../../assets/formula13.png';
import formula14 from '../../assets/formula14.png';
import formula15 from '../../assets/formula15.png';

class AlgorithmDescription extends Component {
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
        <img src={formula1} alt="formula1" />
        <a className={styles.aTest} onClick={() => this.scrollToAnchor('test')}>
          <img className="testclass" id="smootha" src={formula2} alt="formula2" />
        </a>
        <img src={formula3} alt="formula3" />
        <img src={formula4} alt="formula4" />
        <img id="test" src={formula5} alt="formula5" />
        <img src={formula6} alt="formula6" />
        <img src={formula7} alt="formula7" />
        <img src={formula8} alt="formula8" />
        <img src={formula9} alt="formula9" />
        <img src={formula10} alt="formula10" />
        <img src={formula11} alt="formula11" />
        <img src={formula12} alt="formula12" />
        <img src={formula13} alt="formula13" />
        <img src={formula14} alt="formula14" />
        <img src={formula15} alt="formula15" />
      </div>
    );
  }
}

export default AlgorithmDescription;
