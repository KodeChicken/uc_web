"use strict";

import Vue from 'vue';
import axios from "axios";
import Qs from 'qs';

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
axios.defaults.baseURL = 'http://localhost:8080/api';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

let config = {
    // baseURL: process.env.baseURL || process.env.apiUrl || ""
    // timeout: 60 * 1000, // Timeout
    // 我们的客户端和服务端交互的时候使用的是 token，通过 Authorization头发送到服务端，
    // 并没有使用到 cookie，所以客户端没有必要设置 withCredentials: true
    withCredentials: false, // Check cross-site Access-Control
    timeout: 60 * 1000,
    // headers: {
    //
    // },
    // transformRequest: [function (data) {
    //       // Do whatever you want to transform the data
    //       return Qs.stringify({
    //           ...data
    //       });
    // }]
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    let token = window.localStorage.getItem("Authorization");
    console.log('requestInterceptors==>Authorization ',token);
    if (token) {
      //将token放到请求头发送给服务器,将tokenkey放在请求头中
      // config.headers.Authorization = token;
      //也可以这种写法
      config.headers['Authorization'] = token;
    }
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
