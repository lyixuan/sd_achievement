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

  subscriptions: {},

  effects: {
    *detailKpi({ payload }, { call, put }) {
      const { detailKpiParams, flagVal, kpiLevelParams } = payload;
      const { groupType } = detailKpiParams;
      let detailKpiData = null;
      if (groupType === 'family') {
        detailKpiData = yield call(findFamilyDetailKpi, { ...detailKpiParams });
      } else {
        detailKpiData = yield call(findGroupDetailKpi, { ...detailKpiParams });
      }
      if (detailKpiData.code === 2000) {
        yield put({ type: 'familysave', payload: { detailKpiData, detailKpiParams } });
        let kpiLevelData = null;
        const dataList = !detailKpiData ? null : !detailKpiData.data ? null : detailKpiData.data;
        let levelVal = 1;
        if (flagVal === 0) {
          levelVal = !dataList
            ? 1
            : !dataList.dailyCredit
              ? 1
              : !dataList.dailyCredit.ratio ? 1 : dataList.dailyCredit.ratio;
        } else if (flagVal === 1) {
          levelVal = !dataList
            ? 1
            : !dataList.baseKpi
              ? 1
              : !dataList.baseKpi.personNumAvg ? 1 : dataList.baseKpi.personNumAvg;
        } else {
          levelVal = !dataList
            ? 1
            : !dataList.manageScale
              ? 1
              : !dataList.manageScale.manageNum ? 1 : detailKpiData.data.manageScale.manageNum;
        }
        kpiLevelData = yield call(findKpiLevel, { ...kpiLevelParams, levelVal });
        if (kpiLevelData.code === 2000) {
          yield put({ type: 'kpisave', payload: { kpiLevelData, kpiLevelParams } });
        } else {
          Message.error(kpiLevelData.msg);
        }
      } else {
        Message.error(detailKpiData.msg);
      }
    },
    *findKpiLevel({ payload }, { call, put }) {
      const { kpiLevelParams } = payload;
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
