import { routerRedux } from 'dva/router';
import { setItem } from 'utils/localStorage';
import { getUserId } from 'utils/authority';
import Message from '../components/Message';

import { getUserInfo, getDisableTime } from '../services/api';

export default {
  namespace: 'index',

  state: {
    isLogin: false,
    userInfo: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      console.log(dispatch, history);
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
        const { data = [], userId = null } = response.data || {};
        const CurrentAuthInfo = { ...data[0], userId };
        yield call(setItem, 'performanceUser', response.data);
        yield call(setItem, 'performanceCurrentAuth', CurrentAuthInfo);
        const timeResponse = yield call(getDisableTime);
        if (timeResponse.code === 2000) {
          setItem('timeDate', timeResponse.data);
          yield put(routerRedux.push('/indexPage'));
        } else {
          Message.fail(timeResponse.msg);
        }
      } else {
        Message.fail(response.msg);
        yield put(routerRedux.push('/exception/403'));
      }
      yield put({
        type: 'saveUser',
        payload: response,
      });
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
