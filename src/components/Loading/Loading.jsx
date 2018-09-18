import React from 'react';
import { ActivityIndicator } from 'antd-mobile';
import styles from './loading.css';

class Loading extends React.Component {
  render() {
    return (
      <ActivityIndicator
        toast
        className={styles}
        text="数据加载中..."
        size="small"
        color="white"
        animating
      />
    );
  }
}
export default Loading;
