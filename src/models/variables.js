import * as variableService from '../services/variables';
import request from '../utils/request';

export default {
  namespace: 'variables',
  state: {
    list: [],
    total: null,
    page: null,
  },
  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      console.log(list, total, page);
      return { ...state, list, total, page };
    },
  },
  effects: {
    *fetch({ payload: { page = 1 } }, { call, put }) {
      console.log('models->effects->fetch-> page: ', page);
      const { data, headers } = yield call(variableService.fetch, { page });
      yield put({
        type: 'save',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10),
          page: parseInt(page, 10),
        },
      });
    },
    *UpdateOneVariable({ payload: values }, { call, put, select }) {
      console.log('models->effects->UpdateOneVariables->values', values);
      yield call(variableService.UpdateOnePsVariable, values);
      const page = yield select(state => state.variables.page);
      yield put({ type: 'fetch', payload: { page } });
    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/variables') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
