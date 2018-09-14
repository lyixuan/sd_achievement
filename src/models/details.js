import { collgeKpiFamilyDetail } from '../services/api';
import Message from '../components/Message';

export default {
  namespace: 'details',

  state: {
    dataList: [],
  },

  subscriptions: {
    // setup({ dispatch, history }) {
    //   // eslint-disable-line
    // },
  },

  effects: {
    *collgeKpiFamilyDetail({ payload }, { call, put }) {
      const response = yield call(collgeKpiFamilyDetail, { ...payload });
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
