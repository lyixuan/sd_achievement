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
