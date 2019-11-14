import React from 'react';
import styles from './Exception.css';

class ClearSession extends React.Component {
  componentDidMount() {
    localStorage.clear();
  }
  render() {
    return (
      <div
        className={styles.container}
        style={{ textAlign: 'center', color: '#ccc', paddingTop: '50px' }}
      >
        清除缓存成功
      </div>
    );
  }
}

export default ClearSession;
