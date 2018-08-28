import React from 'react';
import { connect } from 'dva';

class Boss extends React.Component {
  render() {
    return <div>test</div>;
  }
}
export default connect(({ loading }) => ({ loading }))(Boss);
