import moment from 'moment';
import { getItem } from './localStorage';

/*
* 用户进入时间组件处理
*
*
*/
export function timeArea() {
  const store = getItem('timeDate') || {};

  // console.log(getItem('timeDate'))
  const { value = null } = store;
  const { dataRange = null } = value || {};
  const { beginTime = null, endTime = null } = dataRange || {};
  const formate = 'YYYY-MM';
  const minDate = moment(beginTime).format(formate);
  const maxDate = moment(endTime).format(formate);
  const currentDate = moment().format(formate);
  const valueDate = !maxDate ? currentDate : currentDate < maxDate ? currentDate : maxDate;
  // console.log(valueDate,beginTime,endTime)
  return { minDate, maxDate, valueDate };
}
