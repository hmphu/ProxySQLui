import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

export function ListAllSchedulers({ page }) {
  return request(`/api/schedulers?_page=${page}&_limit=${PAGE_SIZE}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  });
}

export function CreateOneScheduler(values) {
  console.log('services->schedulers.js->CreateScheduler->values:', values);
  return request('/api/schedulers', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function UpdateOneScheduler(values) {
  console.log('services->scheduler.js->UpdateOneScheduler->values: ', values);
  return request('/api/schedulers', {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(values),
  });
}

export function DeleteOneScheduler(id) {
  console.log('services->schedulers.js->DeleteOneScheduler-id ', id);
  return request(`/api/schedulers/${id}`, {
    method: 'DELETE',
  });
}
