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
      let {
        username,
        password,
        active,
        use_ssl,
        default_hostgroup,
        default_schema,
        schema_locked,
        transaction_persistent,
        fast_forward,
        backend,
        frontend,
        max_connections,
      } = values;

      // 修改active值
      if (active) {
        active = 1;
      } else {
        active = 0;
      }

      // 修改use_ssl值
      if (use_ssl) {
        use_ssl = 1;
      } else {
        use_ssl = 0;
      }
      // 修改schema_locked值
      if (schema_locked) {
        schema_locked = 1;
      } else {
        schema_locked = 0;
      }
      // 修改transaction_persistent值
      if (transaction_persistent) {
        transaction_persistent = 1;
      } else {
        transaction_persistent = 0;
      }

      // 修改fast_forward值
      if (fast_forward) {
        fast_forward = 1;
      } else {
        fast_forward = 0;
      }

      // 修改backend值
      if (backend) {
        backend = 1;
      } else {
        backend = 0;
      }

      // 修改fronted值
      if (frontend) {
        frontend = 1;
      } else {
        frontend = 0;
      }

      const newValue = {
        username,
        password,
        active,
        use_ssl,
        default_hostgroup,
        default_schema,
        schema_locked,
        transaction_persistent,
        fast_forward,
        backend,
        frontend,
        max_connections,
      };
      console.log('values= ', newValue);

      yield call(usersService.put, newValue);
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
