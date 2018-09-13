import { findFamilyDetailKpi, findGroupDetailKpi, findKpiLevel } from '../services/api';
import Message from '../components/Message';

export default {
  namespace: 'teacherhome',

  state: {
    count: 0,
    detailKpiParams: {
      collegeId: 0,
      entUserId: null,
      familyId: 0,
      familyType: 0,
      groupId: 0,
      groupType: null,
      month: null,
      sort: 0,
      type: 0,
      userId: 0,
    },
    detailKpiData: null,

    kpiLevelParams: {
      collegeId: 0,
      entUserId: null,
      familyId: 0,
      familyType: 0,
      groupId: 0,
      groupType: null,
      month: null,
      sort: 0,
      type: 0,
      userId: 0,
    },
    kpiLevelData: null,
  },

  subscriptions: {
    // setup({ dispatch, history }) {
    //   // eslint-disable-line
    // },
  },

  effects: {
    *detailKpi({ payload }, { call, put }) {
      const { detailKpiParams } = payload;
      const { groupType } = detailKpiParams;
      let detailKpiData = null;
      if (groupType === 'family') {
        // console.log('进入family接口请求', detailKpiParams);
        detailKpiData = yield call(findFamilyDetailKpi, { ...detailKpiParams });
      } else {
        // console.log('进入运营长/班主任接口请求', detailKpiParams);
        detailKpiData = yield call(findGroupDetailKpi, { ...detailKpiParams });
      }
      if (detailKpiData.code === 2000) {
        yield put({ type: 'familysave', payload: { detailKpiData, detailKpiParams } });
      } else {
        Message.error(detailKpiData.msg);
      }
    },
    *findKpiLevel({ payload }, { call, put }) {
      const { kpiLevelParams } = payload;
      // console.log('进入档位接口请求', kpiLevelParams);
      const kpiLevelData = yield call(findKpiLevel, { ...kpiLevelParams });
      if (kpiLevelData.code === 2000) {
        yield put({ type: 'kpisave', payload: { kpiLevelData, kpiLevelParams } });
      } else {
        Message.error(kpiLevelData.msg);
      }
    },
  },

  reducers: {
    familysave(state, action) {
      return { ...state, ...action.payload };
    },
    kpisave(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
