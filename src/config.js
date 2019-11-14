export default {
  NODE_ENV: 'dev', // 测试环境
  // NODE_ENV: 'pro', // 线上环境
  DEBUGGER: true, // 调试环境
  performanceUser: {
    userId: 'weixiang',
  },

  SERVER_HOST: {
    production: 'http://test-api.bd.ministudy.com/apis',
    dev: 'http://172.16.117.65:8082',
    localhost: 'http://172.16.109.87:28082',
    localhost2: 'http://172.16.109.87:38082',
    development: 'http://172.16.109.87:28082',
    development2: 'http://172.16.109.87:38082',
  }[process.env.API_TYPE],

  WECHART_HOST: {
    production: 'http://bi-wechat.ministudy.com/authorizeKPI/RedirectToWechat?branch=pro',
    localhost: 'http://172.16.117.65:8087/authorizeKPI/RedirectToWechat?branch=dev',
    localhost2: 'http://172.16.117.65:8087/authorizeKPI/RedirectToWechat?branch=dev',
    development: 'http://172.16.117.65:8087/authorizeKPI/RedirectToWechat?branch=dev',
    development2: 'http://172.16.117.65:8087/authorizeKPI/RedirectToWechat?branch=dev',
  }[process.env.API_TYPE],
};
