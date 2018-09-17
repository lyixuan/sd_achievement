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
      const { detailKpiParams, userFlag, flagVal, kpiLevelParams } = payload;
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
        const dailyCredit = !dataList ? null : !dataList.dailyCredit ? null : dataList.dailyCredit;
        const baseKpi = !dataList ? null : !dataList.baseKpi ? null : dataList.baseKpi;
        const manageScale = !dataList ? null : !dataList.manageScale ? null : dataList.manageScale;
        const selfNum = !manageScale
          ? 0
          : !manageScale.classNum && manageScale.classNum !== 0 ? 0 : manageScale.classNum;
        let levelVal = 1;
        if (flagVal === 0) {
          levelVal = !dailyCredit.ratio ? 1 : dailyCredit.ratio;
        } else if (flagVal === 1) {
          levelVal = !baseKpi.personNumAvg ? 1 : baseKpi.personNumAvg;
        } else {
          levelVal = userFlag === 2 ? selfNum : !manageScale.value ? 1 : manageScale.value;
        }
        // console.log('同时请求两个接口时候档位上送的参数',{ ...kpiLevelParams, levelVal })
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
      // console.log('只请求档位上送的参数',kpiLevelParams)
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
