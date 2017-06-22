import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

export function ListAllQueryRules({ page }) {
  return request(`/api/queryrules?_page=${page}&_limit=${PAGE_SIZE}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  });
}

export function ListOneQueryRule(id) {
  return request(`/api/queryrules/${id}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  });
}

export function CreateQueryRules(values) {
  console.log('services->queryrules.js->CreateQueryrules->values:', values);
  return request('/api/queryrules', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function UpdateOneQueryRulesStatus(values) {
  return request('/api/queryrules/status', {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(values),
  });
}

export function UpdateOneQueryRulesUser(values) {
  return request('/api/queryrules/username', {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(values),
  });
}

export function UpdateOneQueryRulesSchema(values) {
  return request('/api/queryrules/schemaname', {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(values),
  });
}

export function UpdateOneQueryRulesClient(values) {
  return request('/api/queryrules/clientaddr', {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(values),
  });
}

export function UpdateOneQueryRulesMatchDigest(values) {
  return request('/api/queryrules/matchdigest', {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(values),
  });
}

export function UpdateOneQueryRulesMatchPattern(values) {
  return request('/api/queryrules/matchpattern', {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(values),
  });
}

export function UpdateOneQueryRulesReplacePattern(values) {
  return request('/api/queryrules/replacepattern', {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(values),
  });
}

export function UpdateOneQueryRulesDestHostgroup(values) {
  return request('/api/queryrules/desthostgroup', {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(values),
  });
}

export function UpdateOneQueryRulesErrmsg(values) {
  return request('/api/queryrules/errmsg', {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(values),
  });
}

export function DeleteOneQueryRules(id) {
  console.log('service->CreateQueryRules.js->DeleteOneQueryRules->id ', id);
  return request(`/api/queryrules/${id}`, {
    method: 'DELETE',
  });
}
