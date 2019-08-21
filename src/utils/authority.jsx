import { getItem } from './localStorage';
/*
* 权限判断 1
*  获取用户userId,如果没有则表示无权限
*
*/
export function getAuthority() {
  const store = getItem('performanceUser') || {};
  const { value = null, expries = null } = store;
  const { userId = null, isLogin } = value || {};
  const isExpries = expries && Number(expries) > Number(new Date());
  if (userId && !isExpries && isLogin) {
    return userId;
  } else {
    return null;
  }
}
export function getUserId() {
  const store = getItem('performanceUser') || {};
  const { value = null, expries = null } = store;
  const { userId = null } = value || {};
  const isExpries = expries && Number(expries) > Number(new Date());
  if (userId && !isExpries) {
    return userId;
  } else {
    return null;
  }
}
