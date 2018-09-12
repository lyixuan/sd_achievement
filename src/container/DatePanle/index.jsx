import React from 'react';
import moment from 'moment';
import TimeSelect from 'components/TimeSelect/TimeSelect';
import styles from './index.less';
import history from '../../assets/history.png';
import { timeArea } from '../../utils/timeArea';

const formate = 'YYYY-MM';

export default class DatePanle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: 1,
    };
  }

  onChange = date => {
    if (this.props.onChange) {
      this.props.onChange(date);
    }
  };
  isShowHistoryImage = () => {
    const { defaultDate = '' } = this.props;

    const formateDate = defaultDate.replace(/\./g, '-');
    const nowDate = moment().format(formate);
    return !moment(formateDate).isSame(nowDate);
  };
  toHistoryPage = () => {
    if (this.props.toHistoryPage) {
      this.props.toHistoryPage();
    }
  };

  dataFun = () => {
    console.log(timeArea);
    const minDate = '2018-03';
    const valueDate = moment().format(formate);
    const nowDate = new Date(Date.parse(valueDate.replace(/-/g, '/')));
    const result = [];
    const num = this.state.flag === 1 ? 12 : 3;
    for (let i = 0; i < num; i += 1) {
      nowDate.setMonth(nowDate.getMonth() - 1);
      let m = nowDate.getMonth() + 2;
      m = m < 10 ? `0${m}` : m;
      const insertDate = `${nowDate.getFullYear()}-${m}`;
      if (!minDate ? true : insertDate >= minDate) {
        result.push({ id: `${nowDate.getFullYear()}.${m}`, name: `${nowDate.getFullYear()}.${m}` });
      }
    }
    return result;
  };

  render() {
    const dateArea = this.dataFun();
    console.log(dateArea);
    const { defaultDate } = this.props;
    const isShowHistoryImage = this.isShowHistoryImage();
    console.log(moment().format(formate));
    return (
      <div>
        <TimeSelect
          defaultDate={defaultDate}
          dateArea={dateArea}
          onChange={date => {
            this.onChange(date);
          }}
        />
        {isShowHistoryImage && (
          <img
            onClick={this.toHistoryPage}
            src={history}
            className={styles.fixedCotainer}
            alt="查看历史"
          />
        )}
      </div>
    );
  }
}
