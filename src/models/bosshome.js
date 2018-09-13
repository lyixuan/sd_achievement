import { findGroupTotalKpi } from 'services/api';
import Message from '../components/Message';

export default {
  namespace: 'bosshome',

  state: {
    goupTotalKpiList: [],
  },

  subscriptions: {
    // setup({ dispatch, history }) {
    //   // eslint-disable-line
    // },
  },

  effects: {
    *findGroupTotalKpi({ payload }, { call, put }) {
      const response = yield call(findGroupTotalKpi, payload);
      if (response.code === 2000) {
        const goupTotalKpiList = response.data || [];
        yield put({
          type: 'saveGroupTotalKpiList',
          payload: { goupTotalKpiList },
        });
      } else {
        Message.fail(response.msg);
      }
    },
  },

  reducers: {
    saveGroupTotalKpiList(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
