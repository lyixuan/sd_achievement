import { routerRedux } from 'dva/router';
import { setItem } from 'utils/localStorage';
import { getUserId } from 'utils/authority';
import Message from '../components/Message';

import { getUserInfo, getDisableTime } from '../services/api';

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
        responseData.data = authList.map(item => ({
          ...item,
          userId: item.id,
          loginUserId: responseData.userId,
          groupNameArr: splitDepartment(item.department) || [],
          currentGroupName: (splitDepartment(item.department) || []).slice(-1)[0] || null,
        }));
        const CurrentAuthInfo = { ...responseData.data[0] };
        yield call(setItem, 'performanceUser', responseData);
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
