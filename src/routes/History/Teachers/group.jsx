import React from 'react';
import HistoryGroupBar from 'components/Charts/BarCharts/HistoryGroupBar';

class HistoryGroup extends React.Component {
  render() {
    let { dataSource = [] } = this.props;
    dataSource = dataSource.map(item => ({ ...item, name: item.key }));
    return (
      <div>
        <HistoryGroupBar dataSource={{ data: dataSource, title: '班主任确认绩效' }} />
      </div>
    );
  }
}
export default HistoryGroup;
