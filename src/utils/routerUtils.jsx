import { getCurrentAuthInfo } from 'utils/decorator';

function getRenderArr(routes) {
  let renderArr = [];
  renderArr.push(routes[0]);
  for (let i = 1; i < routes.length; i += 1) {
    // 去重
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
    // 是否包含
    const isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
    if (isAdd) {
      renderArr.push(routes[i]);
    }
  }
  return renderArr;
}
function getRelation(str1, str2) {
  if (str1 === str2) {
    console.warn('Two path are equal!'); // eslint-disable-line
  }
  const arr1 = str1.split('/');
  const arr2 = str2.split('/');
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  } else if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }
  return 3;
}
export function getRoutes(path, routerData) {
  let routes = Object.keys(routerData).filter(
    routePath => routePath.indexOf(path) === 0 && routePath !== path
  );
  // Replace path to '' eg. path='user' /user/name => name
  routes = routes.map(item => item.replace(path, ''));
  // Get the route to be rendered to remove the deep rendering
  const renderArr = getRenderArr(routes);
  // Conversion and stitching parameters
  const renderRoutes = renderArr.map(item => {
    const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
    return {
      exact,
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
    };
  });
  return renderRoutes;
}
/*
 * 此方法用于过滤掉使用路由传递参数,过滤掉用不到的参数,并记录原始值
 * @params{paramsObj} Object  需要合并的参数集合
 *        {urlParams} Object  从url中获取的参数集合
 * return Object
 */
export function assignUrlParams(paramsObj = {}, urlParams = {}) {
  // 过滤掉不需要的参数
  const returnParams = {};
  Object.keys(paramsObj).forEach(key => {
    const item = paramsObj[key];
    // 判断是否还有下一级对象
    if (item !== null && typeof item === 'object' && isNaN(item.length)) {
      returnParams[key] = assignUrlParams(item, urlParams);
    } else {
      const value =
        urlParams[key] === undefined
          ? paramsObj[key] === undefined ? '' : paramsObj[key]
          : urlParams[key];
      if (typeof value !== 'object' && !isNaN(Number(value))) {
        returnParams[key] = typeof paramsObj[key] === 'number' && value ? Number(value) : value;
      } else {
        returnParams[key] = value;
      }
    }
  });
  return returnParams;
}
/*
 *根据权限匹配出不同的路径
 */
export function checkoutAuthUrl() {
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
}

/*
*创收绩效---根据权限匹配出不同的路径
  COLLEGE("college"),院长
  FAMILY("family"),家族长
  GROUP("group"),运营长
  CLASS("class"),班主任
  ADMIN("admin"),admin
  BOSS("boss"),boss`
*/
export function checkoutAuthUrlPerformance() {
  const { groupType = null, isKpi } = getCurrentAuthInfo();
  const IDENTIFY = {
    college: 'college', // 院长
    family: 'family', // 家族长
    group: 'group', // 运营长
    class: 'class', // 班主任
    admin: 'admin', // 家族长
    boss: 'boss',
  };

  if (!isKpi) {
    return '/exception/403';
  }
  console.log(groupType, 'groupType');
  switch (groupType) {
    case IDENTIFY.admin:
    case IDENTIFY.boss:
      return '/performance/admin';
    case IDENTIFY.family:
      console.log('coming');
      return '/performance/family';
    case IDENTIFY.group:
      return '/performance/operation';
    case IDENTIFY.class:
      return '/performance/teacher';
    case IDENTIFY.college:
      return '/performance/president';
    default:
      return '/exception/403';
  }
}
