import {
  collegeHomePage,
  adminHomePage,
  classHomePage,
  familyHomePage,
  groupHomePage,
  groupRankList,
  findRenewalKpiDetail,
  findGoodpushKpiDetail,
} from '../services/api';
import Message from '../components/Message';

export default {
  namespace: 'performance',

  state: {
    collegeHomePageData: [],
    adminHomePageData: [],
    classHomePageData: [],
    familyHomePageData: [],
    groupHomePageData: [],
    groupRankListData: [],
    findRenewalKpiDetailData: [],
    findGoodpushKpiDetailData: [],
  },

  subscriptions: {
    // setup({ dispatch, history }) {
    //   // eslint-disable-line
    // },
  },

  effects: {
    // 创收绩效首页-院长首页
    *collegeHomePage({ payload }, { call, put }) {
      const response = yield call(collegeHomePage, { ...payload });
      if (response.code === 2000) {
        yield put({
          type: 'save',
          payload: { collegeHomePageData: response.data },
        });
      } else {
        Message.fail(response.msg);
      }
      yield put({
        type: 'save',
        payload: response,
      });
    },

    // 创收绩效首页-admin
    *adminHomePage({ payload }, { call, put }) {
      const response = yield call(adminHomePage, { ...payload });
      if (response.code === 2000) {
        yield put({
          type: 'save',
          payload: { adminHomePageData: response.data },
        });
      } else {
        Message.fail(response.msg);
      }
      yield put({
        type: 'save',
        payload: response,
      });
    },

    // 创收绩效首页-班主任
    *classHomePage({ payload }, { call, put }) {
      const response = yield call(classHomePage, { ...payload });
      if (response.code === 2000) {
        yield put({
          type: 'save',
          payload: { classHomePageData: response.data },
        });
      } else {
        Message.fail(response.msg);
      }
      yield put({
        type: 'save',
        payload: response,
      });
    },

    // 创收绩效首页-家族长
    *familyHomePage({ payload }, { call, put }) {
      const response = yield call(familyHomePage, { ...payload });
      if (response.code === 2000) {
        yield put({
          type: 'save',
          payload: { familyHomePageData: response.data },
        });
      } else {
        Message.fail(response.msg);
      }
      yield put({
        type: 'save',
        payload: response,
      });
    },

    // 创收绩效首页-运营长
    *groupHomePage({ payload }, { call, put }) {
      const response = yield call(groupHomePage, { ...payload });
      if (response.code === 2000) {
        yield put({
          type: 'save',
          payload: { groupHomePageData: response.data },
        });
      } else {
        Message.fail(response.msg);
      }
      yield put({
        type: 'save',
        payload: response,
      });
    },

    // 创收绩效-小组
    *groupRankList({ payload }, { call, put }) {
      const response = yield call(groupRankList, { ...payload });
      if (response.code === 2000) {
        yield put({
          type: 'save',
          payload: { groupRankListData: response.data },
        });
      } else {
        Message.fail(response.msg);
      }
      yield put({
        type: 'save',
        payload: response,
      });
    },

    // 创收绩效-续报
    *findRenewalKpiDetail({ payload }, { call, put }) {
      const response = yield call(findRenewalKpiDetail, { ...payload });
      if (response.code === 2000) {
        yield put({
          type: 'save',
          payload: { findRenewalKpiDetailData: response.data },
        });
      } else {
        Message.fail(response.msg);
      }
      yield put({
        type: 'save',
        payload: response,
      });
    },

    // 创收绩效-好推
    *findGoodpushKpiDetail({ payload }, { call, put }) {
      const response = yield call(findGoodpushKpiDetail, { ...payload });
      if (response.code === 2000) {
        yield put({
          type: 'save',
          payload: { findGoodpushKpiDetailData: response.data },
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
