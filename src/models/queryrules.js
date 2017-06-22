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
    *UpdateOneQrUser({ payload: values }, { call, put, select }) {
      console.log('models->queryrules.js->UpdateOneQrUser->values:', values);
      yield call(QueryRulesServices.UpdateOneQueryRulesUser, values);
      const page = yield select(state => state.queryrules.page);
      yield put({ type: 'ListAllQueryRules', payload: { page } });
    },
    *UpdateOneQrSchema({ payload: values }, { call, put, select }) {
      console.log('models->queryrules.js->UpdateOneQrSchema->values: ', values);
      yield call(QueryRulesServices.UpdateOneQueryRulesSchema, values);
      const page = yield select(state => state.queryrules.page);
      yield put({ type: 'ListAllQueryRules', payload: { page } });
    },
    *UpdateOneQrClient({ payload: values }, { call, put, select }) {
      console.log('models->queryrules.js->UpdateOneQrClient->values: ', values);
      yield call(QueryRulesServices.UpdateOneQueryRulesClient, values);
      const page = yield select(state => state.queryrules.page);
      yield put({ type: 'ListAllQueryRules', payload: { page } });
    },
    *UpdateOneQrMatchDigest({ payload: values }, { call, put, select }) {
      console.log(
        'models->queryrules.js->UpdateOneQrMatchDigest->values',
        values,
      );
      yield call(QueryRulesServices.UpdateOneQueryRulesMatchDigest, values);
      const page = yield select(state => state.queryrules.page);
      yield put({ type: 'ListAllQueryRules', payload: { page } });
    },
    *UpdateOneQrMatchPattern({ payload: values }, { call, put, select }) {
      console.log(
        'models->queryrules.js->UpdateOneQrMatchPattern->values: ',
        values,
      );
      yield call(QueryRulesServices.UpdateOneQueryRulesMatchPattern, values);
      const page = yield select(state => state.queryrules.page);
      yield put({ type: 'ListAllQueryRules', payload: { page } });
    },
    *UpdateOneQrReplacePattern({ payload: values }, { call, put, select }) {
      console.log(
        'models->queryrules.js->UpdateOneQrReplacePattern->values: ',
        values,
      );
      yield call(QueryRulesServices.UpdateOneQueryRulesReplacePattern, values);
      const page = yield select(state => state.queryrules.page);
      yield put({ type: 'ListAllQueryRules', payload: { page } });
    },
    *UpdateOneQrHostGroup({ payload: values }, { call, put, select }) {
      console.log(
        'models->queryrules.js->UpdateOneQrHostGroup->values: ',
        values,
      );
      yield call(QueryRulesServices.UpdateOneQueryRulesDestHostgroup, values);
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
