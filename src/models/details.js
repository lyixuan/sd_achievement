import { collgeKpiFamilyDetail, findGroupDetailByFamily } from '../services/api';
import Message from '../components/Message';

export default {
  namespace: 'details',

  state: {
    dataList: [],
    sort: null,
    collegeId: null,
  },

  effects: {
    // boss/院长-家族/小组详情
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
    // 家族长-小组详情
    *findGroupDetailByFamily({ payload }, { call, put }) {
      const response = yield call(findGroupDetailByFamily, { ...payload });
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
    saveStatus(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
