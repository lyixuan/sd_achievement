export default {
  namespace: 'bosshome',

  state: {
    count: 0,
  },

  subscriptions: {
    // setup({ dispatch, history }) {
    //   // eslint-disable-line
    // },
  },

  effects: {
    // *fetch({ payload }, { call, put }) {
    //   // eslint-disable-line
    // },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
