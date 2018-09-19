import React, { Component } from 'react';
import styles from './staticPage.less';
import UseCourse1 from '../../assets/cours1.png';
import UseCourse2 from '../../assets/cours2.png';
import UseCourse3 from '../../assets/cours3.png';
import UseCourse4 from '../../assets/cours4.png';
import UseCourse5 from '../../assets/cours5.png';
import UseCourse6 from '../../assets/cours6.png';
import UseCourse7 from '../../assets/cours7.png';

class UserCourse extends Component {
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
        <img src={UseCourse1} alt="UseCourse1" />
        <a className={styles.aTest} onClick={() => this.scrollToAnchor('test')}>
          <img className="testclass" id="smootha" src={UseCourse2} alt="UseCourse2" />
        </a>
        <img src={UseCourse3} alt="UseCourse3" />
        <img src={UseCourse4} alt="UseCourse4" />
        <img id="test" src={UseCourse5} alt="UseCourse5" />
        <img src={UseCourse6} alt="UseCourse6" />
        <img src={UseCourse7} alt="UseCourse7" />
      </div>
    );
  }
}

export default UserCourse;
