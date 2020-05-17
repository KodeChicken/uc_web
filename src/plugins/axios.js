"use strict";

import Vue from 'vue';
import axios from "axios";
import {Message, Loading, MessageBox} from 'element-ui'
import router from '../router'
import Qs from 'qs';
import ca from "element-ui/src/locale/lang/ca";

let _this = Vue.prototype

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
axios.defaults.baseURL = 'http://localhost:8080/api';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

let config = {
    // baseURL: process.env.baseURL || process.env.apiUrl || ""
    // 我们的客户端和服务端交互的时候使用的是 token，通过 Authorization头发送到服务端，
    // 并没有使用到 cookie，所以客户端没有必要设置 withCredentials: true
    withCredentials: false, // Check cross-site Access-Control
    timeout: 60 * 1000,

};

const _axios = axios.create(config);

_axios.interceptors.request.use(
    config => {
        if (sessionStorage.getItem('Authorization')) {
            config.headers.Authorization = sessionStorage.getItem('Authorization');
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function (response) {
        let code = response.data.code;
        if (code === 200) {
            return response;
        }
        // 未登录，获取token失效
        if (code === 603) {
            // 清除token
            if (sessionStorage.getItem('Authorization')) {
                sessionStorage.removeItem('Authorization');
                MessageBox.alert('登录过期，请重新登录', {
                    confirmButtonText: '跳转登录页面',
                    callback: action => {
                        router.replace({
                            path: '/login',
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        })
                    }
                });
            }
            return Promise.reject(response)
        }
        // 密码错误
        if (code === 607) {
            _this.$utils.messageTips(1000, '用户名或者密码不正确', 'error')
            return Promise.reject(response)
        }
        if (code === 611) {
            _this.$utils.messageTips(1000, '没有权限', 'error')
            return Promise.reject(response)
        }

        return response;
    },
    function (error) {
        // Do something with response error
        return Promise.reject(error);
    }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
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
export function post(url, param) {
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
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function put(url, params) {
    return new Promise((resolve, reject) => {
        _axios.put(url, params)
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
export function del(url, params) {
    return new Promise((resolve, reject) => {
        _axios.delete(url, params)
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
