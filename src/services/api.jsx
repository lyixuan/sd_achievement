/* eslint-disable import/no-named-as-default,import/no-named-as-default-member */
import { stringify } from 'qs';
import request from '../utils/request';
import config from '../config';

const HOST = config.SERVER_HOST;
alert(HOST);

// const proxyHost = {
//   dev: 'http://172.16.117.65:8082', // 'http://172.16.58.18:8082', // 'http://test.xd.admin.ministudy.com',
//   pro: 'http://api.bd.ministudy.com',
// };

// const HOST = proxyHost[NODE_ENV];

/*
*此接口为获取微信授权接口(微信企业号)
*/
export function getWeChart() {
  return config.WECHART_HOST;
}
export async function getOrgMap(params) {
  return request(`${HOST}/organization/findOrgMap?${stringify(params)}`, {
    method: 'GET',
    body: params,
  });
}
/*
*  此接口为获取用户登录信息的接口
*/
export async function getUserInfo(params) {
  return request(`${HOST}/wechatLogin/getUserInfoByUserId?${stringify(params)}`, {
    method: 'GET',
  });
}
/*
*  此接口为获取当前权限当前日期下的用户信息
*/
export async function getKpiUserInfoByMonth(params) {
  return request(`${HOST}/wechatLogin/getKpiUserInfoByMonth?${stringify(params)}`, {
    method: 'GET',
  });
}
/*
*此接口获取时间空间是指可选日期
*
*/
export async function getDisableTime(params) {
  return request(`${HOST}/timeManagement/list?${stringify(params)}`, {
    method: 'GET',
  });
}
/*
*此接口用于集团总绩效列表
*/
export async function findGroupTotalKpi(params) {
  return request(`${HOST}/totalKpi/findGroupTotalKpi`, {
    method: 'POST',
    body: params,
  });
}
/*
*此接口用于集团人均总绩效列表
*/
export async function findGroupAvgKpi(params) {
  return request(`${HOST}/totalKpi/findGroupAvgKpi`, {
    method: 'POST',
    body: params,
  });
}
/*
*此接口用于Boss/院长首页-绩效分档接口
*/
export async function getBossKpiBracket(params) {
  return request(`${HOST}/bossCollegeKpi/bossKpiBracket`, {
    method: 'POST',
    body: params,
  });
}
/*
*此接口用于Boss-绩效占比接口
*/
export async function getBossKpiPercent(params) {
  return request(`${HOST}/bossCollegeKpi/bossKpiPercent`, {
    method: 'POST',
    body: params,
  });
}
/*
* boss/院长家族首页
*/
export async function collgeKpiFamilyHomePage(params) {
  return request(`${HOST}/bossCollegeKpi/collgeKpiFamilyHomePage`, {
    method: 'POST',
    body: params,
  });
}
/*
* boss/院长小组首页
*/
export async function collgeKpiGroupHomePage(params) {
  return request(`${HOST}/bossCollegeKpi/collgeKpiGroupHomePage`, {
    method: 'POST',
    body: params,
  });
}
/*
* boss/院长-家族/小组详情页
*/
export async function collgeKpiFamilyDetail(params) {
  return request(`${HOST}/bossCollegeKpi/collgeKpiFamilyDetail`, {
    method: 'POST',
    body: params,
  });
}
/*
* 家族长 小组详情页
*/
export async function findGroupDetailByFamily(params) {
  return request(`${HOST}/familyKpi/findGroupDetailByFamily`, {
    method: 'POST',
    body: params,
  });
}
/*
* 历史绩效：查看当前月份是否可查看
*/
export async function findKpiEffectMonthByMonth(params) {
  return request(`${HOST}/historyKpi/findKpiEffectMonthByMonth?${stringify(params)}`, {
    method: 'GET',
  });
}
/*
* 历史绩效：boss/院长-绩效分档
*/
export async function findHistoryKpiBracket(params) {
  return request(`${HOST}/historyKpi/findHistoryKpiBracket`, {
    method: 'POST',
    body: params,
  });
}
/*
* 历史绩效：家族小组-绩效首页
*/
export async function findIndividualHistoryKPI(params) {
  return request(`${HOST}/historyKpi/findIndividualHistoryKPI`, {
    method: 'POST',
    body: params,
  });
}
/*
* 历史绩效：班主任历史绩效列表
*/
export async function findClassKpiList(params) {
  return request(`${HOST}/historyKpi/findClassKpiList`, {
    method: 'POST',
    body: params,
  });
}
/*
* 历史绩效：boss/院长-家族历史绩效
*/
export async function findFamilyHistoryKpi(params) {
  return request(`${HOST}/historyKpi/findFamilyHistoryKpi`, {
    method: 'POST',
    body: params,
  });
}
/*
* 历史绩效：boss/院长/家族长-小组历史绩效
*/
export async function findGroupHistoryKpi(params) {
  return request(`${HOST}/historyKpi/findGroupHistoryKpi`, {
    method: 'POST',
    body: params,
  });
}
/*
*家族长首页接口
post /familyKpi/findFamilyDetailKpi
*
*/
export async function findFamilyDetailKpi(params) {
  return request(`${HOST}/familyKpi/findFamilyDetailKpi `, {
    method: 'POST',
    body: params,
  });
}
/*
*运营长/班主任首页接口
*
*/
export async function findGroupDetailKpi(params) {
  return request(`${HOST}/familyKpi/findGroupDetailKpi `, {
    method: 'POST',
    body: params,
  });
}
// 获取teacher页面时间值
export async function getIncomeKpiDateRange(params) {
  return request(`${HOST}/familyKpi/getIncomeKpiDateRange `, {
    method: 'POST',
    body: params,
  });
}

/*
*家族长/运营长/班主任 kpi档位接口
*
*/
export async function findKpiLevel(params) {
  return request(`${HOST}/kpilevel/findNewKpiLevelByMonthAndType`, {
    method: 'POST',
    body: params,
  });
}
/*
* 记录用户登录学分的次数
 */
export async function operateLog(params) {
  const newParams = {
    site: HOST,
    operateType: 'AUTH',
  };
  return request(`${HOST}/operateLog/add`, {
    method: 'POST',
    body: { ...newParams, ...params },
  });
}

/*
* 创收绩效首页-院长首页
 */
export async function collegeHomePage(params) {
  return request(`${HOST}/incomeIndex/collegeHomePage`, {
    method: 'POST',
    body: params,
  });
}

// admin
export async function adminHomePage(params) {
  return request(`${HOST}/incomeIndex/adminHomePage`, {
    method: 'POST',
    body: params,
  });
}

// 班主任
export async function classHomePage(params) {
  return request(`${HOST}/incomeIndex/classHomePage`, {
    method: 'POST',
    body: params,
  });
}

// 家族长
export async function familyHomePage(params) {
  return request(`${HOST}/incomeIndex/familyHomePage`, {
    method: 'POST',
    body: params,
  });
}

// 运营长
export async function groupHomePage(params) {
  return request(`${HOST}/incomeIndex/groupHomePage`, {
    method: 'POST',
    body: params,
  });
}

// 小组
export async function groupRankList(params) {
  return request(`${HOST}/incomeIndex/groupRankList`, {
    method: 'POST',
    body: params,
  });
}

// 续报
export async function findRenewalKpiDetail(params) {
  return request(`${HOST}/incomeIndex/findRenewalKpiDetail`, {
    method: 'POST',
    body: params,
  });
}

// 好推
export async function findGoodpushKpiDetail(params) {
  return request(`${HOST}/incomeIndex/findGoodpushKpiDetail`, {
    method: 'POST',
    body: params,
  });
}

// 专套本
export async function findExamZbtKpiDetail(params) {
  return request(`${HOST}/incomeIndex/findExamZbtKpiDetail`, {
    method: 'POST',
    body: params,
  });
}
// 时间
export async function getDateRange() {
  return request(`${HOST}/incomeIndex/getDateRange`);
}
