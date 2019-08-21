import React from 'react';
import Loading from 'components/Loading/Loading';
import { setItem } from 'utils/localStorage';
import { getUserId } from 'utils/authority';
import { getWeChart } from 'services/api';
import config from '../../config';

const { DEBUGGER = false, performanceUser } = config;
class WeChartLogin extends React.Component {
  constructor(props) {
    super(props);
    const { match={} } = this.props;
    const { params } = match||{};
    this.entrance =params.entrance;
  }
  componentDidMount() {
    if (DEBUGGER) {
      setItem('performanceUser', performanceUser);
      this.props.setRouteUrlParams('/',{entrance:this.entrance});
      // setTimeout(()=>{
      //   this.checkoutHasAuth();
      // },100);
    } else {
      this.checkoutHasAuth();
    }
  }
  checkoutHasAuth = () => {
    // 获取微信授权信息,如果获取失败,则需要跳转微信授权
    const isHasUserId = getUserId();
    if (isHasUserId) {
      this.props.setRouteUrlParams('/',{entrance:this.entrance});
    } else {
      const url = getWeChart();
      window.location.href = url;
    }
  };
  render() {
    return (
      <div>
        <Loading />
      </div>
    );
  }
}
export default WeChartLogin;
