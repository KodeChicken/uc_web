"use strict";

import Vue from 'vue';
import axios from "axios";
import {Message, Loading} from 'element-ui'
import router from '../router'
import Qs from 'qs';


let _this = Vue.prototype
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
    config => {
        if (localStorage.getItem('Authorization')) {
            config.headers.Authorization = localStorage.getItem('Authorization');
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    // function(response) {
    //     debugger
    //     // Do something with response data
    //     return response;
    // },
    // function(error) {
    //     debugger
    //     // Do something with response error
    //     return Promise.reject(error);
    // }
    response => {
        debugger
        if (response.data.code === 200) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    },
    error => {
        debugger
        if (error.response.data.code) {
            switch (error.response.data.code) {
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。
                case 401:
                    this.$router.replace({
                        path: '/login',
                        query: {redirect: this.$router.currentRoute.fullPath}
                    })
                    break;
                // 403 token过期
                // 登录过期对用户进行提示
                // 清除本地token和清空vuex中token对象
                // 跳转登录页面
                case 603:
                    _this.$message.error('登录过期，请重新登录')
                    // 清除token
                    localStorage.removeItem('Authorization')
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                    setTimeout(() => {
                        this.$router.replace({
                            path: '/login',
                            query: {
                                redirect: this.$router.currentRoute.fullPath
                            }
                        })
                    }, 1000)
                    break;
                // 404请求不存在
                case 404:
                    _this.$message.error('网络请求不存在')
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    _this.$message.error(error.response.data.msg)
            }
            return Promise.reject(error.response)
        }
    }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get (url, params) {
    return new Promise((resolve, reject) => {
        _axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post (url, param) {
    return new Promise((resolve, reject) => {
        _axios.post(url, param)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post2 (url) {
    return new Promise((resolve, reject) => {
        _axios.post(url)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}

/**
 * delete方法，对应delete请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function del (url, params) {
    return new Promise((resolve, reject) => {
        _axios.post(url, params)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}



Plugin.install = function (Vue, options) {
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
