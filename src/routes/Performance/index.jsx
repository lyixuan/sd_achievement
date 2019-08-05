import React from 'react';
import { getCurrentAuthInfo, getCurrentMonth } from 'utils/decorator';
import DatePanle from 'container/DatePanle';

@getCurrentAuthInfo
@getCurrentMonth
class Performance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: this.currentMonth(),
    };
  }

  onDateChange = month => {
    this.setState({ month });
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
