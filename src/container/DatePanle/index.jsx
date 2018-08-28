import React from 'react';
import TimeSelect from 'components/TimeSelect/TimeSelect';

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

  render() {
    const { dateArea } = this.state;
    const { defaultDate } = this.props;
    return (
      <div>
        <TimeSelect
          defaultDate={defaultDate}
          dateArea={dateArea}
          onChange={date => {
            this.onChange(date);
          }}
        />
      </div>
    );
  }
}
