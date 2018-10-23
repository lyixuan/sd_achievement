import React from 'react';
import moment from 'moment';
import { getCurrentAuthInfo } from 'utils/decorator';
import TimeSelect from 'components/TimeSelect/TimeSelect';
import styles from './index.less';
import history from '../../assets/history.png';
import { timeArea } from '../../utils/timeArea';

const formate = 'YYYY-MM';
@getCurrentAuthInfo
export default class DatePanle extends React.Component {
  constructor(props) {
    super(props);
    const { groupType = 'family' } = this.currentAuthInfo();
    const val = groupType === 'boss' || groupType === 'college' ? 1 : 2;
    this.state = {
      flag: val,
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
    const dateVal = timeArea();
    const { maxDate, minDate } = dateVal;
    const maxDateVal = !maxDate?null:maxDate.replace(/\s/g, 'T').replace(/\//g, '-');
    const minDateVal = !minDate?null:minDate.replace(/\s/g, 'T').replace(/\//g, '-');
    const nowMaxDate = new Date(maxDateVal);
    const nowMinDate = !minDateVal?null:new Date(minDateVal);
    const result = [];
    const num = this.state.flag === 1 ? 12 : 3;
    result.push({ id: maxDate, name: maxDate });
    for (let i = 0; i < num; i += 1) {
      nowMaxDate.setMonth(nowMaxDate.getMonth() - 1);
      let m = nowMaxDate.getMonth() + 1;
      m = m < 10 ? `0${m}` : m;
      if (!minDate ? true : nowMaxDate.getTime() >= nowMinDate.getTime()) {
        result.push({ id: `${nowMaxDate.getFullYear()}-${m}`, name: `${nowMaxDate.getFullYear()}-${m}` });
      }
    }
    return result;
  };

  render() {
    const dateArea = this.dataFun();
    const { defaultDate } = this.props;
    const isShowHistoryImage = this.isShowHistoryImage();
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
