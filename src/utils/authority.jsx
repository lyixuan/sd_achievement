import { getItem } from './localStorage';
/*
* 权限判断 1  
*  获取用户userId,如果没有则表示无权限
*         
*/
export function getAuthority() {
  const store = getItem('performanceUser') || {};
  const { value = null, expries = null } = store;
  const { userId = null } = value || {};
  const isExpries = expries && Number(expries) > Number(new Date());
  if (userId && !isExpries) {
    return userId;
  } else {
    return false;
  }
}
