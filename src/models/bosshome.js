import { findGroupTotalKpi, findGroupAvgKpi, getBossKpiBracket } from 'services/api';
import Message from '../components/Message';

export default {
  namespace: 'bosshome',

  state: {
    groupTotalKpiList: [],
    groupAvgKpiList: [],
    bossKpiBracketList: [],
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
        const groupTotalKpiList = response.data || [];
        yield put({
          type: 'saveGroupTotalKpiList',
          payload: { groupTotalKpiList },
        });
      } else {
        Message.fail(response.msg);
      }
    },
    *findGroupAvgKpi({ payload }, { call, put }) {
      const response = yield call(findGroupAvgKpi, payload);
      if (response.code === 2000) {
        const groupAvgKpiList = response.data || [];
        yield put({
          type: 'saveGroupTotalKpiList',
          payload: { groupAvgKpiList },
        });
      } else {
        Message.fail(response.msg);
      }
    },
    *getBossKpiBracket({ payload }, { call, put }) {
      const response = yield call(getBossKpiBracket, payload);
      if (response.code === 2000) {
        const bossKpiBracketList = response.data || [];
        yield put({
          type: 'saveBossKpiBracket',
          payload: { bossKpiBracketList },
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
  saveBossKpiBracket(state, { payload }) {
    return { ...state, ...payload };
  },
};
