import {get, post, put, del} from "../plugins/axios";

// get 请求
export const findAllUser = (pageNum, pageSize) => get('/user/findAll/' + pageNum + '/' + pageSize);
export const findUserById = id => get('/user/findUser/', id);
// put 请求
export const updateUser = userForm => put('/user/update', userForm);
export const updateUserStatus = (id, status) => put('/user/updateStatus/' + '/' +id + '/' + status);
// post 请求
// delete 请求
export const deleteUserById = id => del('/user/delete/' + id);