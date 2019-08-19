import React from 'react';
import { Icon } from 'antd-mobile';
import { getCurrentAuthInfo, getCurrentMonth } from 'utils/decorator';
import styles from './index.less';

@getCurrentAuthInfo
@getCurrentMonth
class President extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      id1: 0,
    };
  }

  toggle = id => {
    this.setState({ id });
  };
  toggle1 = id1 => {
    this.setState({ id1 });
  };

  renderIem2 = classKpiList => {
    if (!classKpiList) {
      return <li className={styles.hasnone}>暂无数据</li>;
    }
    return classKpiList.map(item => {
      return (
        <li key={item.itemName}>
          <div className={styles.items}>
            <span>{item.itemName}</span>
            <span>{item.totalKpi}</span>
            <span
              style={{
                alignItems: 'center',
                width: '10%',
                display: 'flex',
                cursor: 'pointer',
              }}
            >
              <Icon type="right" size="xs" color="#00ccc3" />
            </span>
          </div>
        </li>
      );
    });
  };
  renderIem1 = groupKpiList => {
    const { id1 } = this.state;
    return groupKpiList.map(item => {
      return (
        <li key={item.itemName}>
          <div className={styles.items}>
            <span>{item.itemName}</span>
            <span>{item.totalKpi}</span>
            <span
              onClick={() => this.toggle1(item.itemId)}
              style={{
                alignItems: 'center',
                width: '10%',
                display: 'flex',
                cursor: 'pointer',
              }}
            >
              <Icon type={id1 === item.itemId ? 'up' : 'down'} size="xs" color="#00ccc3" />
            </span>
          </div>
          {item.itemId === id1 && (
            <ul className={styles.list2}>{this.renderIem2(item.classKpiList)}</ul>
          )}
        </li>
      );
    });
  };
  render() {
    const { id } = this.state;
    const { listData = [] } = this.props;
    // 默认第一个展示
    const showFirstId = listData.length && this.props.listData[0].itemId;
    return (
      <div className={styles.presidentContent}>
        <p className={styles.meta}>
          <span>家族</span>
          <span>绩效总额</span>
          <span>操作</span>
        </p>
        <ul className={styles.list}>
          {listData.map(item => {
            return (
              <li key={item.itemName}>
                <div className={styles.items}>
                  <span>{item.itemName}</span>
                  <span>{item.totalKpi}</span>
                  <span
                    onClick={() => this.toggle(item.itemId)}
                    style={{
                      alignItems: 'center',
                      width: '10%',
                      display: 'flex',
                      cursor: 'pointer',
                    }}
                  >
                    <Icon
                      type={(id || showFirstId) === item.itemId ? 'up' : 'down'}
                      size="xs"
                      color="#00ccc3"
                    />
                  </span>
                </div>
                {(id || showFirstId) === item.itemId && (
                  <ul className={styles.list1}>{this.renderIem1(item.groupKpiList)}</ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
export default President;
