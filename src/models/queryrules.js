import * as QueryRulesServices from '../services/queryrules';
import request from '../utils/request';

export default {
  namespace: 'queryrules',
  state: {
    list: [],
    total: null,
    page: null,
  },
  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
  },
  effects: {
    *ListAllQueryRules({ payload: { page = 1 } }, { call, put }) {
      const {
        data,
        headers,
      } = yield call(QueryRulesServices.ListAllQueryRules, {
        page,
      });
      yield put({
        type: 'save',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10),
          page: parseInt(page, 10),
        },
      });
    },
    *CreateQueryRules({ payload: values }, { call, put, select }) {
      console.log('models->queryrules.js->CreateQueryRules->values', values);
      yield call(QueryRulesServices.CreateQueryRules, values);
      const page = yield select(state => state.queryrules.page);
      yield put({ type: 'ListAllQueryRules', payload: { page } });
    },
    *DeleteOneQueryRules({ payload: id }, { call, put, select }) {
      console.log('models->queryrules.js->DeleteOneQueryRules->id', id);
      yield call(QueryRulesServices.DeleteOneQueryRules, id);
      const page = yield select(state => state.queryrules.page);
      yield put({ type: 'ListAllQueryRules', payload: { page } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/queryrules') {
          dispatch({ type: 'ListAllQueryRules', payload: query });
        }
      });
    },
  },
};
