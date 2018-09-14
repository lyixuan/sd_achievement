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
    const { groupType = 'family' } = this.currentAuthInfo;
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
    const { minDate, maxDate } = dateVal;
    const nowDate = new Date(Date.parse(maxDate.replace(/-/g, '/')));
    const result = [];
    const num = this.state.flag === 1 ? 13 : 4;
    for (let i = 0; i < num; i += 1) {
      nowDate.setMonth(nowDate.getMonth() - 1);
      let m = nowDate.getMonth() + 2;
      m = m < 10 ? `0${m}` : m;
      // const insertDate = `${nowDate.getFullYear()}-${m}`;
      console.log(minDate);
      // if (!minDate ? true : insertDate >= minDate) {
      //   result.push({ id: `${nowDate.getFullYear()}-${m}`, name: `${nowDate.getFullYear()}-${m}` });
      // }
      result.push({ id: `${nowDate.getFullYear()}-${m}`, name: `${nowDate.getFullYear()}-${m}` });
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
