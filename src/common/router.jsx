import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import {
  getUrlParams,
  getLastUrlParams,
  setRouteUrlParams,
  setCurrentUrlParams,
} from './routerParams';

let routerDataCache;
const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });
// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach(model => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });

    return props => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () =>
      models.filter(model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      const urlParams = getUrlParams(app);
      const lastUrlParams = getLastUrlParams(app);

      return component().then(raw => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache,
            urlParams,
            lastUrlParams,
            setRouteUrlParams,
            setCurrentUrlParams,
          });
      });
    },
  });
};

// function getFlatMenuData(menus) {
//   let keys = {};
//   menus.forEach(item => {
//     if (item.children) {
//       keys[item.path] = { ...item };
//       keys = { ...keys, ...getFlatMenuData(item.children) };
//     } else {
//       keys[item.path] = { ...item };
//     }
//   });
//   return keys;
// }

export const getRouterData = app => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['global', 'index'], () => import('../layout/BaseLayout')),
    },
    '/indexPage': {
      component: dynamicWrapper(app, [], () => import('../routes/Home/IndexPage')),
      title: '首页',
      showTitle: false,
    },
    '/indexPage/boss': {
      component: dynamicWrapper(app, [], () => import('../routes/Home/Boss/index')),
      title: 'boss学院长首页',
      showTitle: false,
    },
    '/indexPage/boss/pandect': {
      component: dynamicWrapper(app, [], () => import('../routes/Home/Boss/Pandect/pandect')),
      title: '绩效总览',
      showTitle: false,
    },
    '/indexPage/boss/monthly': {
      component: dynamicWrapper(app, [], () => import('../routes/Home/Boss/Monthly/index')),
      title: '每月绩效',
      showTitle: false,
    },
    '/indexPage/teacher': {
      component: dynamicWrapper(app, [], () => import('../routes/Home/Teachers/index')),
      title: '运行长家族长首页',
      showTitle: false,
    },
    '/indexPage/teacher/class': {
      component: dynamicWrapper(app, [], () => import('../routes/Home/Teachers/group')),
      title: '班主任首页',
      showTitle: false,
    },
    '/indexPage/teacher/family': {
      component: dynamicWrapper(app, [], () => import('../routes/Home/Teachers/family')),
      title: '家族长首页',
      showTitle: false,
    },
    '/level': {
      component: dynamicWrapper(app, [], () => import('../routes/Level/index')),
      title: '分档详情',
      showTitle: false,
    },
    '/details': {
      component: dynamicWrapper(app, [], () => import('../routes/Details/index')),
      title: '小组绩效',
      showTitle: true,
    },
    '/history': {
      component: dynamicWrapper(app, [], () => import('../routes/History')),
      title: '历史绩效',
      showTitle: true,
    },
    '/history/boss': {
      component: dynamicWrapper(app, [], () => import('../routes/History')),
      title: 'boss院长确认绩效',
      showTitle: true,
    },
    '/history/teacher': {
      component: dynamicWrapper(app, [], () => import('../routes/History/Teachers/index')),
      title: '运营确认绩效',
      showTitle: true,
    },
    '/history/teacher/class': {
      component: dynamicWrapper(app, [], () => import('../routes/History/Teachers/class')),
      title: '班主任确认绩效',
      showTitle: true,
    },
    '/history/teacher/family': {
      component: dynamicWrapper(app, [], () => import('../routes/History/Teachers/family')),
      title: '家族长确认绩效',
      showTitle: true,
    },
    '/history/teacher/group': {
      component: dynamicWrapper(app, [], () => import('../routes/History/Teachers/group')),
      title: '运营长确认绩效',
      showTitle: true,
    },
    '/history/details': {
      component: dynamicWrapper(app, [], () => import('../routes/History/Details/index')),
      title: '确认绩效详情',
      showTitle: true,
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layout/UserLayout')),
    },
    '/user/wechart': {
      component: dynamicWrapper(app, ['user'], () => import('../routes/Login/WeChartLogin')),
    },
    '/static': {
      component: dynamicWrapper(app, ['user'], () => import('../layout/StaticLayout')),
    },
    '/exception': {
      component: dynamicWrapper(app, [], () => import('../layout/Exception')),
    },
    '/exception/403': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/Error403')),
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/Error404')),
    },
    '/exception/500': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/Error500')),
    },
  };

  return routerConfig;
};
