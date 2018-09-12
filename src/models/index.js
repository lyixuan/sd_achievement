import { routerRedux } from 'dva/router';
import { getAuthority } from 'utils/authority';
import { setItem } from 'utils/localStorage';
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
      // eslint-disable-line
      const { pathname } = history.location;
      const userId = getAuthority() || null;
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
      const response = yield call(getUserInfo, { ...payload });
      if (response.code === 2000) {
        yield call(setItem, 'performanceUser', response.data);
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
