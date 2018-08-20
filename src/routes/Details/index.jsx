import React from 'react';
import { connect } from 'dva';

import { assignUrlParams } from 'utils/routerUtils';

class Details extends React.Component {
  constructor(props) {
    super(props);
    const { urlParams = {} } = props;
    const initState = {
      paramsObj: {
        groupType: 1,
      },
    };
    this.state = assignUrlParams(initState, urlParams);
  }
  componentDidMount() {}
  render() {
    const { paramsObj } = this.state;
    return <div>{JSON.stringify(paramsObj)}</div>;
  }
}
export default connect(({ loading }) => ({ loading }))(Details);
