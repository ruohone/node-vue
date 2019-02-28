import {get, post} from '../client';

export const test = (params) => post('/test', params);
export const t1 = (params) => get('/t1', params);
