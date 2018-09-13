import moment from 'moment';
import { getItem } from './localStorage';

/*
* 用户进入时间组件处理
*
*
*/
export function timeArea() {
  const store = getItem('timeDate') || {};
  const { value = null } = store;
  const { dateRange = null } = value || {};
  const { beginTime = null, endTime = null } = dateRange || {};
  const formate = 'YYYY-MM';
  const minDate = moment(beginTime).format(formate);
  let maxDate = moment(endTime).format(formate);
  const currentDate = moment().format(formate);
  maxDate = !maxDate ? currentDate : currentDate < maxDate ? currentDate : maxDate;
  return { minDate, maxDate };
}
