import * as ServersServices from '../services/servers';
import request from '../utils/request';

export default {
  namespace: 'servers',
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
    *ListAllServers({ payload: { page = 1 } }, { call, put }) {
      const { data, headers } = yield call(ServersServices.ListAllServers, {
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
    *CreateOneServer({ payload: values }, { call, put, select }) {
      console.log('CreateOneServer:', values);
      yield call(ServersServices.CreateOneServer, values);
      const page = yield select(state => state.servers.page);
      yield put({ type: 'ListAllServers', payload: { page } });
    },
    *DeleteOneServer(
      { payload: { hostgroup_id, hostname, port } },
      { call, put, select },
    ) {
      console.log('DeleteOneServer:', hostgroup_id, hostname, port);
      yield call(ServersServices.DeleteOneServers, {
        hostgroup_id,
        hostname,
        port,
      });
      const page = yield select(state => state.servers.page);
      yield put({ type: 'ListAllServers', payload: { page } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/servers') {
          dispatch({ type: 'ListAllServers', payload: query });
        }
      });
    },
  },
};
