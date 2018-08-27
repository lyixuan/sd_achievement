/* TimeSelect组件参数介绍:3个必传参数
*
* showTime:父组件传来指示自组件显示的时间
* onChange:{必传 Function}:传入该属性，则子组件选择完日期之后Value部返回给父组件去请求接口使用
* selectId:默认选中的时间
*
* */

import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import Dialog from '../../components/Dialog';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup';
import styles from './TimeSelect.less';
import dateImg from '../../assets/dateSelect.svg';

class TimeSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false,
      showTime: this.props.showTime || '2018.08.01 - 2018.08.22',
    };
  }

  showModel = bol => {
    if (bol) {
      this.choseDateArea();
      this.setState({ dialogVisible: bol });
    } else {
      this.setState({ dialogVisible: bol });
    }
  };

  choseDateArea = () => {
    const dateArr = [
      { id: '2018.08', name: '2018.08' },
      { id: '2018.07', name: '2018.07' },
      { id: '2018.06', name: '2018.06' },
      { id: '2018.05', name: '2018.05' },
    ];
    return dateArr;
  };

  renderGroupList = () => {
    // 此方法用于render出groupList
    const data = this.choseDateArea();
    return (
      <ButtonGroup
        dataSource={{ data }}
        // id={selectedTime}
        btnClass={styles.timeBtnStyle}
        btnSelectedClass={styles.timeBtnSelected}
        dataReturnFun={item => {
          const d = new Date();
          const first = d.getMonth() + 1;
          const aa = first < 10 ? `0${first}` : first;
          const testDate = `${d.getFullYear()}.${aa}`;
          console.log(item.id, testDate, item.id < testDate);

          const { onChange } = this.props;
          if (onChange && typeof onChange === 'function') {
            if (item.id < testDate) {
              this.setState({
                showTime: item.id,
                dialogVisible: false,
              });
              return this.props.onChange(item);
            } else {
              this.setState({
                showTime: '2018.08.01 - 2018.08.22',
                dialogVisible: false,
              });
              return this.props.onChange(item);
            }
          } else {
            console.warn('传入的onChange非函数或不合法，请检查！');
          }
        }}
      />
    );
  };

  render() {
    const { dialogVisible, showTime } = this.state;
    return (
      <div>
        <div className={styles.m_timeContener}>
          <span className={styles.timeName}>时间:</span>
          <span className={styles.timeDate}>{showTime}</span>
          <img
            onClick={this.showModel.bind(this, true)}
            className={styles.timeImg}
            src={dateImg}
            alt="时间图片"
          />
        </div>

        <div>
          {dialogVisible && (
            <Dialog
              visible={dialogVisible}
              showModel={bol => this.showModel(bol)}
              title={<p className={styles.dialogTitle}>请选择想要查看的月份</p>}
              modelClass={styles.modelClass}
              cotainerClass={styles.flexContainer}
            >
              <div className={styles.timeList}>{this.renderGroupList()}</div>
              <Button style={{ height: '0' }} />
            </Dialog>
          )}
        </div>
      </div>
    );
  }
}

export default TimeSelect;
