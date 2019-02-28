'use strict';

import axios from 'axios';
import storeUser from '../store/user';

const client = axios.create({
  // baseURL: `http://demo.cms.api.chongdingdahui.com/api`,
  timeout: 10000,
  withCredentials: false
});

/**
 * 请求拦截器
 * 处理发送请求之前 header 插入 token 鉴权
 */
client.interceptors.request.use(requestConfig => {
  let configs = requestConfig;
  if (storeUser.getUser()) {
    configs.headers['X-Live-Session-Token'] = storeUser.getUser().sessionToken;
  }
  // config.cancelToken = new axios.CancelToken(cancel => {
  //   window.__axiosCancelTokenArr.push({cancel});
  // });
  // alert(JSON.stringify(configs));
  return configs;
}, err => {
  return Promise.reject(err);
});

/**
 * 响应拦截器
 * 响应回调错误处理、数据处理等逻辑
 */
client.interceptors.response.use(response => {
  let result = response.data;
  if (result.code === 7) {
    storeUser.removeUser();
    location.href = '/';
  } else if (result.code === 0) {
    return Promise.resolve(result.data);
  } else {
    // vue.$message.error(result.msg);
    return Promise.reject(result);
  }
}, error => {
  return Promise.reject(error.response.data);// 返回接口返回的错误信息
});

const get = (...params) => {
  return client.get(...params)
};

const post = (...params) => {
  return client.post(...params);
};

// export default {
//   get (...params) {
//     return axios.get(params)
//   },
//   post (...params) {
//     alert('hh');
//     return axios.post(params)
//   }
// }

export {
  get,
  post
}
