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
import { getItem } from 'utils/localStorage';
import Dialog from '../../components/Dialog';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup';
import styles from './TimeSelect.less';
import dateImg from '../../assets/dateSelect.svg';
import dateImg1 from '../../assets/dateSelect1.svg';
// import { SesSsion } from 'inspector';

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
    const { onChange, defaultDate } = this.props;
    const { name = '' } = item;
    if (onChange && !moment(name).isSame(defaultDate)) {
      onChange(name);
    }
    this.dateFomate(name);
    this.showModel(false);
  };
  showModel = bol => {
    this.setState({ dialogVisible: bol });
  };
  timeArea = () => {
    const store = getItem('timeDate') || {};
    const { value = null } = store;
    const { dateRange = null } = value || {};
    const { endTime = new Date.valueOf() } = dateRange || {};
    return endTime;
  };

  dateFomate = (dateTime = '') => {
    const { isperformance } = this.props;
    const storEndTime = this.timeArea();
    const formate = 'YYYY-MM';
    const formateDate = dateTime.replace(/\./g, '-');
    const nowDate = moment().format(formate);
    let timeText = null;
    if (moment(formateDate).isSame(nowDate)) {
      const MaxDateTime = storEndTime >= new Date().valueOf() ? new Date().valueOf() : storEndTime;
      timeText = `${formateDate}.01 ~ ${moment(MaxDateTime).format('YYYY.MM.DD')}`;
    } else {
      timeText = formateDate;
    }
    timeText = timeText.replace(/-/g, '.');
    // 组件本身页面展示是2019-02这种样式，创收绩效需要展示区间，所以单独处理成 2019年4月29日~2019年5月28日 根据isperformance值判断
    if (isperformance) {
      timeText = this.formatPerformance();
    }
    this.setState({ timeText });
  };

  formatPerformance = () => {
    const { defaultDate } = this.props;
    const currMonth = getItem('month');
    const dateListMonth = getItem('timeDatePerformance').value;
    // eslint-disable-next-line
    return dateListMonth.map(item => {
      if ((currMonth.value || defaultDate) === item.kpiMonth) {
        const start = moment(item.startDate).format('YYYY-MM-DD');
        const end = moment(item.endDate).format('YYYY-MM-DD');
        return `时间: ${start} ~ ${end}`;
      }
    });
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
    const { isperformance, isColor } = this.props;
    return (
      <div>
        <div className={styles.m_timeContener}>
          {!isperformance && <span className={styles.timeName}>时间:</span>}
          <span className={isColor ? styles.timeDate1 : styles.timeDate}>{timeText}</span>
          <img
            onClick={this.showModel.bind(this, true)}
            className={isColor ? styles.timeImg1 : styles.timeImg}
            src={isColor ? dateImg1 : dateImg}
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
