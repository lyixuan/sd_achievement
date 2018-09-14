import { findFamilyHistoryKpi, findGroupHistoryKpi } from '../services/api';
import Message from '../components/Message';

export default {
  namespace: 'historyDetails',

  state: {
    dataList: [],
  },

  subscriptions: {
    // setup({ dispatch, history }) {
    //   // eslint-disable-line
    // },
  },

  effects: {
    // boss/院长-家族历史绩效
    *findFamilyHistoryKpi({ payload }, { call, put }) {
      const response = yield call(findFamilyHistoryKpi, { ...payload });
      if (response.code === 2000) {
        yield put({
          type: 'save',
          payload: { dataList: response.data },
        });
      } else {
        Message.fail(response.msg);
      }
      yield put({
        type: 'save',
        payload: response,
      });
    },
    // boss/院长-小组历史绩效
    *findGroupHistoryKpi({ payload }, { call, put }) {
      const response = yield call(findGroupHistoryKpi, { ...payload });
      if (response.code === 2000) {
        yield put({
          type: 'save',
          payload: { dataList: response.data },
        });
      } else {
        Message.fail(response.msg);
      }
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
