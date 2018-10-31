import { routerRedux } from 'dva/router';
import { setItem } from 'utils/localStorage';
import { getUserId } from 'utils/authority';
import { assignUrlParams, checkoutAuthUrl } from 'utils/routerUtils';
import { stringify } from 'qs';
import Message from '../components/Message';

import { getUserInfo, getDisableTime, getKpiUserInfoByMonth } from '../services/api';

function splitDepartment(str = '') {
  const newStr = str || '';
  return newStr.split('-') || [];
}
export default {
  namespace: 'index',

  state: {
    isLogin: false,
    userInfo: null,
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
      const response = yield call(getUserInfo, { entUserId });
      if (response.code === 2000) {
        const responseData = response.data || {};
        const authList = responseData.data || [];
        responseData.data = authList.filter(item => item.isKpi).map(item => ({
          ...item,
          userId: item.id,
          loginUserId: responseData.userId,
          groupNameArr: splitDepartment(item.department) || [],
          currentGroupName: (splitDepartment(item.department) || []).slice(-1)[0] || null,
        }));
        if (!responseData.isLogin || !responseData.data || responseData.data.length === 0) {
          // 返回结果异常,或返回结果有且仅有一条无权限数据,或返回结果islogin为false时
          yield put(routerRedux.push('/exception/403'));
          return;
        }
        const currentAuthInfo = { ...responseData.data[0] };
        yield call(setItem, 'performanceUser', responseData);
        yield put({ type: 'getDateTime' });
        yield put({ type: 'fetchKpiUserInfoByMonth', payload: { currentAuthInfo } });
      } else {
        Message.fail(response.msg);
        yield put(routerRedux.push('/exception/403'));
      }
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
        const redirtUrl = yield call(checkoutAuthUrl);
        yield put(routerRedux.push({ path: redirtUrl, search: stringify({ month }) }));
      } else {
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
      return { ...state, isLogin, userInfo };
    },
  },
};
