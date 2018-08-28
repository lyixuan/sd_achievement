/* TimeSelect组件参数介绍:3个必传参数
*
* showTime:父组件传来指示自组件显示的时间
* onChange:{必传 Function}:传入该属性，则子组件选择完日期之后Value部返回给父组件去请求接口使用
*
*
* */

import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import moment from 'moment';
import Dialog from '../../components/Dialog';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup';
import styles from './TimeSelect.less';
import dateImg from '../../assets/dateSelect.svg';

class TimeSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false,
      timeText: '',
    };
  }
  componentDidMount() {
    const { defaultDate } = this.props;
    this.dateFomate(defaultDate);
  }
  onGroupChange = item => {
    const { onChange } = this.props;
    const { name = '' } = item;
    if (onChange) {
      onChange(name);
    }
    this.dateFomate(name);
    this.showModel(false);
  };
  showModel = bol => {
    this.setState({ dialogVisible: bol });
  };

  dateFomate = (dateTime = '') => {
    const formate = 'YYYY-MM';
    const formateDate = dateTime.replace(/\./g, '-');
    const nowDate = moment().format(formate);
    let timeText = null;
    if (moment(formateDate).isSame(nowDate)) {
      timeText = `${formateDate}.01 ~ ${moment().format('YYYY.MM.DD')}`;
    } else {
      timeText = formateDate;
    }
    timeText = timeText.replace(/-/g, '.');
    this.setState({ timeText });
  };

  renderGroupList = () => {
    // 此方法用于render出groupList
    const { dateArea, defaultDate } = this.props;
    return (
      <ButtonGroup
        dataSource={{ data: dateArea }}
        id={defaultDate}
        btnClass={styles.timeBtnStyle}
        btnSelectedClass={styles.timeBtnSelected}
        dataReturnFun={item => {
          this.onGroupChange(item);
        }}
      />
    );
  };

  render() {
    const { dialogVisible, timeText } = this.state;
    return (
      <div>
        <div className={styles.m_timeContener}>
          <span className={styles.timeName}>时间:</span>
          <span className={styles.timeDate}>{timeText}</span>
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
