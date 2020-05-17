import {get, post, put, del} from "../plugins/axios";

// get 请求
export const findAllRole = (pageNum, pageSize) => get('/role/findAllRole/' + pageNum + '/' + pageSize);


// post 请求