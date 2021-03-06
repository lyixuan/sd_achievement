import moment from 'moment';
import { getItem } from './localStorage';

const minDate = '2019-09'; // 配置最小日期

/*
* 用户进入时间组件处理
*
*
*/
export function timeArea() {
  const store = getItem('timeDate') || {};
  const { value = null } = store;
  const { dateRange = null } = value || {};
  // const { beginTime = null, endTime = null } = dateRange || {};
  const { endTime = null } = dateRange || {};
  const formate = 'YYYY-MM';
  // const minDate = moment(beginTime).format(formate);
  let maxDate = moment(endTime).format(formate);
  const currentDate = moment().format(formate);
  maxDate = !maxDate ? currentDate : currentDate < maxDate ? currentDate : maxDate;
  return { minDate, maxDate };
}

export function timeAreaPerformance() {
  const store = getItem('timeDatePerformance') || {};
  const { value = null } = store;
  const arr = [];
  value.map(item => {
    arr.push({ id: item.kpiMonth, name: item.kpiMonth });
    return arr;
  });
  return arr;
}
