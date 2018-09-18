import React from 'react';
import Exception from 'components/Exception';
import styles from './Exception.css';

class Error403 extends React.Component {
  render() {
    const desc = (
      <ul className={styles.desc}>
        <li className={styles.authInfo}>没有查到你的访问权限</li>
        <li className={styles.authItem}>如有疑问请联系：后端运营中心-产研一部</li>
        <li className={styles.authItem}>ganwenbin@sunlands.com</li>
      </ul>
    );
    return (
      <div className={styles.container}>
        <div className={styles.conter}>
          <Exception type="403" style={styles.ceshi} desc={desc} />
        </div>
      </div>
    );
  }
}

export default Error403;
