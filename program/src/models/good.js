import { queryGoods, queryGoodDetail, modifyGoodStatus, modifyGoodInfo, modifyGoodPrice, addGood, queryOperationLog, exportGood } from '../services/good';

export default {
  namespace: 'good',

  state: {
    list: [],
    detail: {},
    logs: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryGoods);
      // console.log('服务器目录列表', response);
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
    *fetchDetail({ goodId, callback }, { call, put }) {
      const response = yield call(queryGoodDetail, { goodId });
      if (response.rescode >> 0 === 10000) {
        if (callback) callback(response.data);
      }
      yield put({
        type: 'saveDetail',
        payload: response.data,
      });
    },
    *add({ data, success, error }, { call, put }) {
      const res = yield call(addGood, { data });
      if (res.rescode >> 0 === 10000) {
        if (success) { success(res); }
      } else if (error) { error(res); }
      const response = yield call(queryGoods);
      yield put({
        type: 'saveOne',
        payload: response.data,
      });
    },
    *modifyInfo({ goodId, data, callback }, { call, put }) {
      const res = yield call(modifyGoodInfo, { goodId, data });
      if (callback) callback(res);
      const response = yield call(queryGoods);
      yield put({
        type: 'modify',
        payload: response.data,
      });
    },
    *modifyGoodStatus({ goodId, goodStatus, publishType, desc, callback }, { call, put }) {
      const res = yield call(modifyGoodStatus, { goodId, goodStatus, publishType, desc });
      if (res.rescode >> 0 === 10000) {
        if (callback) callback(res);
      }
      const response = yield call(queryGoods);
      yield put({
        type: 'modify',
        payload: response.data,
      });
    },
    *modifyPrice({ goodId, data, callback }, { call, put }) {
        alert('21312312');
        const res = yield call(modifyGoodPrice, { goodId, data });
        if (res.rescode >> 0 === 10000) {
          if (callback) callback(res);
        }
        const response = yield call(queryGoods);
        yield put({
          type: 'modify',
          payload: response.data,
        });
    },
    *queryLogs({ module, goodId }, { call, put }) {
      const res = yield call(queryOperationLog, { module, goodId });
      console.log('操作日志', res);
      yield put({
        type: 'logs',
        payload: res.data,
      });
    },
    *queryExport({ fields, callback }, { call, put }) {
      const res = yield call(exportGood, { fields });
      console.log('导出数据服务器返回数据：', res);
      if (res.rescode >> 0 === 10000) {
        alert('导出成功');
        if (callback) callback(res.data);
      }
      yield put({
        type: 'export',
        payload: res.data,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveDetail(state, action) {
      return {
        ...state,
        detail: action.payload,
      };
    },
    saveOne(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    modify(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    remove(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    logs(state, action) {
      return {
        ...state,
        logs: action.payload,
      };
    },
    export(state, action) {
      return {
        ...state,
        export: action.payload,
      };
    },
  },
};
