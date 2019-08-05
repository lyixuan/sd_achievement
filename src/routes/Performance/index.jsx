import React from 'react';
import { getCurrentAuthInfo } from 'utils/decorator';
import DatePanle from 'container/DatePanle';

@getCurrentAuthInfo
class Performance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: '2018-08',
    };
  }

  onDateChange = date => {
    if (this.props.onChange) {
      this.props.onChange(date);
    }
  };

  toHistoryPage = () => {
    const { month } = this.state;
    this.props.setRouteUrlParams('/history', { month });
  };

  render() {
    const { month } = this.state;
    return (
      <div>
        <div>
          <span>{11}</span>
          <span>
            <DatePanle
              defaultDate={month}
              toHideImg
              toHistoryPage={() => {
                this.toHistoryPage();
              }}
              isperformance
              onChange={date => {
                this.onDateChange(date);
              }}
            />
          </span>
        </div>
      </div>
    );
  }
}
export default Performance;
