import {get, post, put, del} from "../plugins/axios";

// get 请求
export const logout = () => get('/pub/logout');


// post 请求
export const login = loginInfo => post('/pub/login', loginInfo);