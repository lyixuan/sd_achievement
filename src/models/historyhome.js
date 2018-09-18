import {
  findHistoryKpiBracket,
  findIndividualHistoryKPI,
  findClassKpiList,
  findKpiEffectMonthByMonth,
} from 'services/api';
import Message from '../components/Message';

export default {
  namespace: 'historyhome',

  state: {
    bossKpiBracketObj: {},
    teacherKpiObj: {},
    classKpiList: [],
    isRequestShowApi: false,
    isShowHistoryData: null, // 是否可查看数据
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
    *findClassKpiList({ payload }, { call, put }) {
      const response = yield call(findClassKpiList, payload);
      if (response.code === 2000) {
        const classKpiList = response.data || [];
        yield put({
          type: 'saveClassKpiList',
          payload: { classKpiList },
        });
      } else {
        Message.fail(response.msg);
      }
    },
    *findKpiEffectMonthByMonth({ payload }, { call, put }) {
      const response = yield call(findKpiEffectMonthByMonth, payload);
      if (response.code === 2000) {
        const data = response.data || {};
        const isShowHistoryData = data.isShow === 0;
        const isRequestShowApi = true;
        yield put({
          type: 'saveShowHistoryState',
          payload: { isShowHistoryData, isRequestShowApi },
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
    saveClassKpiList(state, { payload }) {
      return { ...state, ...payload };
    },
    saveShowHistoryState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
