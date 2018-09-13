import { collgeKpiFamilyHomePage, collgeKpiGroupHomePage } from '../services/api';
import Message from '../components/Message';

export default {
  namespace: 'level',

  state: {
    familyData: [],
    groupData: [],
  },

  subscriptions: {
    // setup({ dispatch, history }) {
    //   // eslint-disable-line
    // },
  },

  effects: {
    *collgeKpiFamilyHomePage({ payload }, { call, put }) {
      const response = yield call(collgeKpiFamilyHomePage, { ...payload });
      if (response.code === 2000) {
        yield put({
          type: 'save',
          payload: { familyData: response.data },
        });
      } else {
        Message.fail(response.msg);
      }
    },
    *collgeKpiGroupHomePage({ payload }, { call, put }) {
      const response = yield call(collgeKpiGroupHomePage, { ...payload });
      if (response.code === 2000) {
        yield put({
          type: 'save',
          payload: { familyData: response.data },
        });
      } else {
        Message.fail(response.msg);
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
