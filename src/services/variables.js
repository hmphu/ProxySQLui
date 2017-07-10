import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

export function fetch({ page }) {
  return request('/api/variables', {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  });
}

export function UpdateOnePsVariable(values) {
  console.log('services->variables.js->UpdateOnePSVariable->values:', values);
  return request('/api/variables', {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(values),
  });
}
