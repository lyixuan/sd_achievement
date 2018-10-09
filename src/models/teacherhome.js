import { findFamilyDetailKpi, findGroupDetailKpi, findKpiLevel } from '../services/api';
import Message from '../components/Message';

export default {
  namespace: 'teacherhome',

  state: {
    detailKpiData: null,
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
      detailKpiData = detailKpiData || {};
      if (detailKpiData.code === 2000) {
        yield put({ type: 'familysave', payload: { detailKpiData, detailKpiParams } });
        if (detailKpiData.data) {
          const { dailyCredit = {}, baseKpi = {}, manageScale = {} } = detailKpiData.data || {};
          const selfNum = manageScale.classNum || 0;
          let levelVal = null;
          if (flagVal === 0) {
            levelVal = dailyCredit.ratio || 1;
          } else if (flagVal === 1) {
            levelVal = baseKpi.value || 1;
          } else {
            levelVal = userFlag === 2 ? selfNum : manageScale.value || 1;
          }
          const kpiLevelData = yield call(findKpiLevel, { ...kpiLevelParams, levelVal });
          if (kpiLevelData.code === 2000) {
            yield put({ type: 'kpisave', payload: { kpiLevelData, kpiLevelParams } });
          } else {
            Message.error(kpiLevelData.msg);
          }
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
