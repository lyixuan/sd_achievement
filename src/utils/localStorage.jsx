/*
*此词典用于展示本地存储内容的key值,便于方便查找,后期工程在同域下会出现key值相同的情况
const itemKeyDict={
  userInfo:'userInfo',      用于储存用户信息,userId,groupId,groupType,等信息(不能随意改动  bi系统用户管理);
  admin_user:               用于储存admin用户信息
  performanceUser:         用于储存绩效管理系统用户信息,currentAuth{groupId,groupType,};
  performanceCurrentAuth;   用于储存绩效管理系统当前权限的用户信息;
}
*/

/*
* @params
* {key} String
* {value} any
* {day} Number
*/
export function setItem(key, value = null, days = null) {
  if (value === null || (days !== null && isNaN(days))) {
    const error = new Error('localStorage存储请输入正确参数');
    throw error;
  } else {
    const now = new Date();
    const expries = !days && days !== 0 ? null : Number(now) + 24 * 3600000 * Number(days);
    window.localStorage.removeItem(key);
    window.localStorage.setItem(key, JSON.stringify({ value, expries }));
  }
}
/*
  * params
  * {key} String
  * return Object{value,isExpire}
  *
  */
export function getItem(key) {
  let store = window.localStorage.getItem(key) || null;
  store = JSON.parse(store) || {};
  const { value = null, expries = null } = store;
  const isExpries = expries && Number(expries) > Number(new Date());
  return {
    value,
    isExpries,
  };
}
/*
  * params
  * {key} String
  * return Object{value,isExpire}
  *
  */
export function getCurrentAuthInfo() {
  const store = getItem('performanceUser') || null;
  const value = store.value || {};
  const { currentAuthInfo = null } = value;
  // const isExpries = expries && Number(expries) > Number(new Date());
  return currentAuthInfo;
}
