//  改文件使用修饰器对类以及对实力方法进行修改
import { getItem } from './localStorage';

export function getCurrentAuthInfo(target) {
  const store = getItem('performanceCurrentAuth') || null;
  const value = store.value || {};
  const currentAuthInfo = () => {
    return getItem('performanceCurrentAuth').value || {};
  };
  if (target && typeof target === 'function') {
    Object.assign(target.prototype, { currentAuthInfo });
  } else {
    return value || {};
  }
}
export function getCurrentMonth(target) {
  const currentMonth = () => {
    const store = getItem('performanceUser') || null;
    const value = store.value || {};
    return value.month || '';
  };
  if (target && typeof target === 'function') {
    Object.assign(target.prototype, { currentMonth });
  } else {
    return currentMonth() || '';
  }
}
export function currentPathName(target) {
  const checkoutUserAuthPathName = () => {
    const { groupType = null, isKpi } = getCurrentAuthInfo();
    if (!isKpi) {
      return '/exception/403';
    }
    if (groupType === 'boss' || groupType === 'college') {
      return '/indexPage/boss';
    } else if (groupType === 'family' || groupType === 'group' || groupType === 'class') {
      return '/indexPage/teacher';
    } else {
      return '/exception/403';
    }
  };
  if (target && typeof target === 'function') {
    Object.assign(target.prototype, { checkoutUserAuthPathName });
  }
}
