import { findHistoryKpiBracket, findIndividualHistoryKPI } from 'services/api';
import Message from '../components/Message';

export default {
  namespace: 'historyhome',

  state: {
    bossKpiBracketObj: {},
    teacherKpiObj: {},
  },
  effects: {
    *findHistoryKpiBracket({ payload }, { call, put }) {
      // eslint-disable-line
      const response = yield call(findHistoryKpiBracket, payload);
      if (response.code === 2000) {
        const bossKpiBracketObj = response.data || [];
        yield put({
          type: 'saveHistoryKpiBracket',
          payload: { bossKpiBracketObj },
        });
      } else {
        Message.fail(response.msg);
      }
    },
    *findIndividualHistoryKPI({ payload }, { call, put }) {
      const response = yield call(findIndividualHistoryKPI, payload);
      if (response.code === 2000) {
        const teacherKpiObj = response.data || [];
        yield put({
          type: 'saveHistoryKpiBracket',
          payload: { teacherKpiObj },
        });
      } else {
        Message.fail(response.msg);
      }
    },
  },

  reducers: {
    saveHistoryKpiBracket(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
