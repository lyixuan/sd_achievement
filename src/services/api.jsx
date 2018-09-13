import { stringify } from 'qs';
import request from '../utils/request';
import config from '../config';

const { NODE_ENV = 'pro' } = config;
const hostObj = {
  pro: 'http://bi-admin.ministudy.com',
  dev: 'http://172.16.117.65:8082',
};
const HOST = hostObj[NODE_ENV];

/*
*此接口为获取微信授权接口(微信企业号)
*/
export function getWeChart() {
  const weChartUrlObj = {
    dev: 'http://172.16.117.65:8087/authorizeKPI/RedirectToWechat?branch=dev',
    pro: 'http://bi-wechat.ministudy.com/authorize/RedirectToWechat?branch=pro',
  };
  return weChartUrlObj[NODE_ENV];
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
  return request(`${HOST}/organization/findOrgMap`, {
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

/*
*家族长/运营长/班主任 kpi档位接口
*
*/
export async function findKpiLevel(params) {
  return request(`${HOST}/kpilevel/findKpiLevel`, {
    method: 'POST',
    body: params,
  });
}
