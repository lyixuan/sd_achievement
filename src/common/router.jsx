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
            getUrlParams,
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
      title: '',
      showTitle: false,
    },
    '/indexPage/boss': {
      component: dynamicWrapper(app, ['bosshome'], () => import('../routes/Home/Boss/index')),
      title: '',
      showTitle: false,
    },
    '/indexPage/boss/pandect': {
      component: dynamicWrapper(app, ['bosshome'], () =>
        import('../routes/Home/Boss/Pandect/pandect')
      ),
      title: '',
      showTitle: false,
    },
    '/indexPage/boss/monthly': {
      component: dynamicWrapper(app, ['bosshome'], () =>
        import('../routes/Home/Boss/Monthly/index')
      ),
      title: '',
      showTitle: false,
    },
    '/indexPage/teacher': {
      component: dynamicWrapper(app, ['teacherhome'], () =>
        import('../routes/Home/Teachers/index')
      ),
      title: '我的绩效',
      showTitle: true,
    },
    '/level': {
      component: dynamicWrapper(app, ['level'], () => import('../routes/Level/index')),
      title: '',
      showTitle: false,
    },
    '/details': {
      component: dynamicWrapper(app, ['details'], () => import('../routes/Details/index')),
      title: '',
      showTitle: false,
    },
    '/history': {
      component: dynamicWrapper(app, ['historyhome'], () => import('../routes/History')),
      title: '',
      showTitle: false,
    },
    '/history/boss': {
      component: dynamicWrapper(app, ['historyhome'], () => import('../routes/History/Boss/index')),
      title: '',
      showTitle: false,
    },
    '/history/teacher': {
      component: dynamicWrapper(app, ['historyhome'], () =>
        import('../routes/History/Teachers/index')
      ),
      title: '',
      showTitle: false,
    },
    '/history/details': {
      component: dynamicWrapper(app, ['historyDetails'], () =>
        import('../routes/History/Details/index')
      ),
      title: '',
      showTitle: false,
    },
    '/counting/:month': {
      component: dynamicWrapper(app, [], () => import('../routes/Counting/index')),
      title: '',
      showTitle: false,
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layout/UserLayout')),
    },
    '/user/wechart': {
      component: dynamicWrapper(app, [], () => import('../routes/Login/WeChartLogin')),
    },
    '/static': {
      component: dynamicWrapper(app, [], () => import('../layout/StaticLayout')),
    },
    '/static/usercourse': {
      component: dynamicWrapper(app, [], () => import('../routes/Static/UserCourse')),
      isAuth: true, //  静态页面需要权限
    },
    '/static/algorithmdescription': {
      component: dynamicWrapper(app, [], () => import('../routes/Static/AlgorithmDescription')),
      isAuth: true,
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
