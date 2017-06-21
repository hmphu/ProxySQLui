import * as usersService from '../services/users';
import request from '../utils/request';

export default {
  namespace: 'users',
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
    *fetch({ payload: { page = 1 } }, { call, put }) {
      const { data, headers } = yield call(usersService.fetch, { page });
      yield put({
        type: 'save',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10),
          page: parseInt(page, 10),
        },
      });
    },
    *CreateUser({ payload: values }, { call, put, select }) {
      yield call(usersService.CreateUser, values);
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
    *remove({ payload: id }, { call, put, select }) {
      yield call(usersService.remove, id);
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
    *put({ payload: { values } }, { call, put, select }) {
      yield call(usersService.put, values);
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },

    *putStatus({ payload: { values } }, { call, put, select }) {
      yield call(usersService.putStatus, values);
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
    *putDHG({ payload: { values } }, { call, put, select }) {
      yield call(usersService.putDHG, values);
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
    *putPass({ payload: { values } }, { call, put, select }) {
      yield call(usersService.putPass, values);
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
    *putDS({ payload: { values } }, { call, put, select }) {
      yield call(usersService.putDS, values);
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
    *putMC({ payload: { values } }, { call, put, select }) {
      yield call(usersService.putMC, values);
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
    *deleteOneUser({ payload: username }, { call, put, select }) {
      yield call(usersService.deleteOneUser, username);
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
