import React from 'react';
import moment from 'moment';
import TimeSelect from 'components/TimeSelect/TimeSelect';
import styles from './index.less';
import history from '../../assets/history.png';

export default class DatePanle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateArea: [
        { id: '2018.08', name: '2018.08' },
        { id: '2018.07', name: '2018.07' },
        { id: '2018.06', name: '2018.06' },
        { id: '2018.05', name: '2018.05' },
      ],
    };
  }

  onChange = date => {
    if (this.props.onChange) {
      this.props.onChange(date);
    }
  };
  isShowHistoryImage = () => {
    const { defaultDate = '' } = this.props;
    const formate = 'YYYY-MM';
    const formateDate = defaultDate.replace(/\./g, '-');
    const nowDate = moment().format(formate);
    return !moment(formateDate).isSame(nowDate);
  };
  toHistoryPage = () => {
    if (this.props.toHistoryPage) {
      this.props.toHistoryPage();
    }
  };
  render() {
    const { dateArea } = this.state;
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
