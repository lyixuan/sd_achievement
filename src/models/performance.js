import moment from 'moment';
import { setItem, getItem } from 'utils/localStorage';
import {
  collegeHomePage,
  adminHomePage,
  classHomePage,
  familyHomePage,
  groupHomePage,
  groupRankList,
  findRenewalKpiDetail,
  findGoodpushKpiDetail,
  getDateRange,
} from '../services/api';
import Message from '../components/Message';

const name = {
  key1: '续报绩效',
  key2: '好推绩效',
};

const groupName = {
  admin: '管理员',
  college: '院长',
  family: '家族长',
  group: '运营长',
  class: '班主任',
};
export default {
  namespace: 'performance',

  state: {
    collegeHomePageData: null,
    adminHomePageData: null,
    classHomePageData: null,
    familyHomePageData: null,
    groupHomePageData: null,
    groupRankListData: null,
    findRenewalKpiDetailData: null,
    findGoodpushKpiDetailData: null,
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
        // eslint-disable-line
        if (response.data && response.data.incomeKpiItemList.length) {
          response.data.incomeKpiItemList.map(item => {
            const newItem = item;
            // eslint-disable-line
            if (newItem.itemKey === 1) {
              newItem.itemKey = name.key1;
            }
            if (newItem.itemKey === 2) {
              newItem.itemKey = name.key2;
            }
            return newItem;
          });
        }
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
        // eslint-disable-line
        if (response.data && response.data.incomeKpiItemList.length) {
          response.data.incomeKpiItemList.map(item => {
            const newItem = item;
            // eslint-disable-line
            if (newItem.itemKey === 1) {
              newItem.itemKey = name.key1;
            }
            if (newItem.itemKey === 2) {
              newItem.itemKey = name.key2;
            }
            return newItem;
          });
        }
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
        // eslint-disable-line
        if (response.data && response.data.incomeKpiItemList.length) {
          response.data.incomeKpiItemList.map(item => {
            const newItem = item;
            // eslint-disable-line
            if (newItem.itemKey === 1) {
              newItem.itemKey = name.key1;
            }
            if (newItem.itemKey === 2) {
              newItem.itemKey = name.key2;
            }
            return newItem;
          });
        }
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
        if (response.data === null) {
          yield put({
            type: 'save',
            payload: { findRenewalKpiDetailData: null },
          });
        } else {
          response.data.map((item, idx) => {
            // eslint-disable-next-line
            item.index = idx;
            // eslint-disable-next-line
            item.positionType = groupName[item.positionType];
            if (item.renewalOrderList.length) {
              return item.renewalOrderList.map(list => {
                // eslint-disable-next-line
                list.registrationDate = moment(list.registrationDate).format('YYYY.MM.DD');
                return item;
              });
            } else {
              return item;
            }
          });
          yield put({
            type: 'save',
            payload: { findRenewalKpiDetailData: response.data },
          });
        }
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
        if (response.data === null) {
          yield put({
            type: 'save',
            payload: { findGoodpushKpiDetailData: null },
          });
        } else {
          response.data.map((item, idx) => {
            // eslint-disable-next-line
            item.index = idx;
            // eslint-disable-next-line
            item.positionType = groupName[item.positionType];
            if (item.goodpushOrderList.length) {
              return item.goodpushOrderList.map(list => {
                // eslint-disable-next-line
                list.goodpushValue = `${list.goodpushValue}%`;
                // eslint-disable-next-line
                list.registrationDate = moment(list.registrationDate).format('YYYY.MM.DD');
                return item;
              });
            } else {
              return item;
            }
          });
          yield put({
            type: 'save',
            payload: { findGoodpushKpiDetailData: response.data },
          });
        }
      } else {
        Message.fail(response.msg);
      }
      yield put({
        type: 'save',
        payload: response,
      });
    },

    // 绩效时间
    *getDateRangeData({ payload }, { call }) {
      const timeResponse = yield call(getDateRange);
      if (timeResponse.code === 2000) {
        setItem('timeDatePerformance', timeResponse.data);
        if (payload) {
          setItem('month', payload.month || timeResponse.data[0].kpiMonth);
        } else {
          // eslint-disable-next-line
          getItem('month').value
            ? setItem('month', getItem('month').value)
            : setItem('month', timeResponse.data[0].kpiMonth);
        }
      } else {
        Message.fail(timeResponse.msg);
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
