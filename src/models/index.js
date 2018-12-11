import { routerRedux } from 'dva/router';
import { setItem } from 'utils/localStorage';
import { getUserId } from 'utils/authority';
import { assignUrlParams } from 'utils/routerUtils';
import Message from '../components/Message';

import { getUserInfo, getDisableTime, getKpiUserInfoByMonth, operateLog } from '../services/api';

function splitDepartment(str = '') {
  const newStr = str || '';
  return newStr.split('-') || [];
}
function handleOriginData(responseData = {}) {
  const authList = responseData.data || [];
  return authList
    .filter(item => item.isKpi && item.groupType !== 'others' && item.groupType !== 'admin')
    .map(item => ({
      ...item,
      userId: item.id,
      loginUserId: responseData.userId,
      groupNameArr: splitDepartment(item.department) || [],
      currentGroupName: (splitDepartment(item.department) || []).slice(-1)[0] || null,
    }));
}
function sliceCurrentAuth(arr = [], id = null) {
  const findCurrentAuth = arr.find(item => item.id === id);
  return findCurrentAuth || { ...arr[0] };
}

export default {
  namespace: 'index',

  state: {
    isLogin: false,
    userInfo: null,
    month: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
      const { pathname } = history.location;
      const userId = getUserId() || null;
      if (pathname === '/') {
        if (userId) {
          dispatch({
            type: 'getUserInfo',
            payload: { userId },
          });
        } else {
          dispatch(routerRedux.push('/exception/403'));
        }
      }
    },
  },
  effects: {
    *getUserInfo({ payload }, { call, put }) {
      // eslint-disable-line
      const entUserId = payload.userId;
      // 切换月份中使用
      const { month = '', id = null } = payload;
      const response = yield call(getUserInfo, { entUserId, month });
      if (response.code !== 2000) {
        Message.fail(response.msg);
        yield put(routerRedux.push('/exception/403'));
        return;
      }
      const responseData = response.data || {};
      responseData.data = handleOriginData(responseData);
      if (!responseData.isLogin || !responseData.data || responseData.data.length === 0) {
        // 返回结果异常,或返回结果有且仅有一条无权限数据,或返回结果islogin为false时
        yield put(routerRedux.push('/exception/403'));
        return;
      }
      const currentAuthInfo = sliceCurrentAuth(responseData.data, id);
      yield call(setItem, 'performanceUser', responseData);
      if (!month) {
        yield put({ type: 'getDateTime' }); //  当非初次请求时时不进行请求时间接口
        yield put({
          //  登录时进行log记录
          type: 'saveLoginLog',
          payload: {
            operator: currentAuthInfo.id,
          },
        });
      }
      yield put({
        type: 'fetchKpiUserInfoByMonth',
        payload: { currentAuthInfo, month: responseData.month },
      });
      yield put({
        type: 'saveUser',
        payload: response,
      });
    },
    *fetchKpiUserInfoByMonth({ payload }, { call, put }) {
      const { currentAuthInfo = {}, month = '' } = payload;
      const userId = currentAuthInfo.userId || '';
      const response = yield call(getKpiUserInfoByMonth, { userId, month });
      if (response.code === 2000) {
        const data = response.data || {};
        if (data.id) {
          data.userId = data.id;
        }
        const newData = assignUrlParams(currentAuthInfo, data);
        yield call(setItem, 'performanceCurrentAuth', newData);
        // const redirtUrl = yield call(checkoutAuthUrl);
        yield put(routerRedux.push('/indexPage'));
        // yield put(routerRedux.push({ path: redirtUrl, search: stringify({ month }) }));
      } else {
        Message.fail(response.msg);
      }
    },
    *saveLoginLog({ payload }, { call }) {
      const response = yield call(operateLog, {
        url: '/user/wechart',
        operateCode: '0002',
        ...payload,
      });
      if (response.code !== 2000) {
        Message.fail(response.msg);
      }
    },
    *getDateTime(_, { call }) {
      const timeResponse = yield call(getDisableTime);
      if (timeResponse.code === 2000) {
        setItem('timeDate', timeResponse.data);
      } else {
        Message.fail(timeResponse.msg);
      }
    },
  },

  reducers: {
    saveUser(state, { payload }) {
      const isLogin = payload && payload.code === 2000;
      const userInfo = isLogin ? payload.data : null;
      const { month = '' } = userInfo;
      return { ...state, isLogin, userInfo, month };
    },
  },
};
