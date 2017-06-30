import * as SchedulerServices from '../services/schedulers';
import request from '../utils/request';

export default {
  namespace: 'schedulers',
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
    *ListAllSchedulers({ payload: { page = 1 } }, { call, put }) {
      const {
        data,
        headers,
      } = yield call(SchedulerServices.ListAllSchedulers, {
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
    *CreateOneScheduler({ payload: values }, { call, put, select }) {
      console.log('models->schedulers.js->CreateOneScheduler->values', values);
      yield call(SchedulerServices.CreateOneScheduler, values);
      const page = yield select(state => state.schedulers.page);
      yield put({ type: 'ListAllSchedulers', payload: { page } });
    },
    *DeleteOneScheduler({ payload: id }, { call, put, select }) {
      console.log('models->schedulers.js->DeleteSchedulers->id', id);
      yield call(SchedulerServices.DeleteOneScheduler, id);
      const page = yield select(state => state.schedulers.page);
      yield put({ type: 'ListAllSchedulers', payload: { page } });
    },
    *UpdateOneScheduler({ payload: values }, { call, put, select }) {
      console.log('models->schedulers.js->UpdateOneScheduler->values:', values);
      yield call(SchedulerServices.UpdateOneScheduler, values);
      const page = yield select(state => state.schedulers.page);
      yield put({ type: 'ListAllSchedulers', payload: { page } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/schedulers') {
          dispatch({ type: 'ListAllSchedulers', payload: query });
        }
      });
    },
  },
};
