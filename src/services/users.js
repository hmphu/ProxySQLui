import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

export function fetch({ page }) {
  return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
}

export function remove(id) {
  return request(`/api/users/${id}`, {
    method: 'DELETE',
  });
}

/*
export function patch(id, values) {
  return request(`/api/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}
*/

export function put(values) {
  console.log('services/users.js/put--->', values);
  return request('/api/users/status', {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(values),
  });
}

export function putStatus(values) {
  console.log('services/users.js/putStatus--->', values);
  return request('/api/users/status', {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(values),
  });
}

export function putDHG(values) {
  console.log('services/users.js/putDHG--->', values);
  return request('/api/users/hostgroup', {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(values),
  });
}

export function putPass(values) {
  console.log('services/users.js/putPass--->', values);
  return request('/api/users/passwd', {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(values),
  });
}

export function putDS(values) {
  console.log('services/users.js/putDS--->', values);
  return request('/api/users/schema', {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(values),
  });
}

export function putMC(values) {
  console.log('services/users.js/putMC--->', values);
  return request('/api/users/maxconnection', {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(values),
  });
}
