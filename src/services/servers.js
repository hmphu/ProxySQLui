import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

export function ListAllServers({ page }) {
  return request(`/api/servers?_page=${page}&_limit=${PAGE_SIZE}`);
}

export function ListServerByHostgroup(hostgroupid) {
  return request(`/api/servers/${hostgroupid}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  });
}

export function ListOneServer(values) {
  return request('/api/servers', {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(values),
  });
}

export function CreateOneServer(values) {
  return request('/api/servers', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function UpdateOneServerStatus(values) {
  console.log('service->servers.js->UpdateOneServerStatus', values);
  return request('/api/servers/status', {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(values),
  });
}

export function UpdateOneServerWeight(values) {
  return request('/api/servers/weight', {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(values),
  });
}

export function UpdateOneServerMC(values) {
  return request('/api/servers/maxconnection', {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(values),
  });
}

export function DeleteOneServers(values) {
  return request('/api/servers', {
    headers: { 'Content-Type': 'application/json' },
    method: 'DELETE',
    body: JSON.stringify(values),
  });
}
